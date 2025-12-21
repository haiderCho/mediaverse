import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { env } from 'process';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * MyAnimeList Stats Fetcher
 * Fetches user's Anime and Manga lists and aggregates statistics by category.
 */

const MAL_CLIENT_ID = process.env.MAL_CLIENT_ID;
const USERNAME = process.env.MAL_USERNAME || 'NafizHC';
const OUTPUT_FILE = path.join(__dirname, '../public/data/mal-stats.json');

// Categories to aggregate
// Anime Series: tv, ova, ona, special, music
// Anime Movie: movie
// Manga: manga, novel, oneshots, doujin, oel
// Manhwa: manhwa
// Manhua: manhua

if (!MAL_CLIENT_ID) {
  console.warn('⚠️  MAL_CLIENT_ID not set. Skipping MyAnimeList data fetch.');
  console.warn('   Set MAL_CLIENT_ID environment variable to enable MyAnimeList integration.');
  process.exit(0);
}

/**
 * Make Request to MAL API
 */
function makeRequest(endpoint, params = {}) {
  return new Promise((resolve, reject) => {
    const queryParams = new URLSearchParams(params);
    const url = `https://api.myanimelist.net/v2/${endpoint}?${queryParams.toString()}`;
    
    const options = {
      headers: {
        'X-MAL-CLIENT-ID': MAL_CLIENT_ID,
        'User-Agent': 'MediaVerse/1.0'
      }
    };

    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error(`Failed to parse JSON: ${e.message}`));
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    }).on('error', (err) => reject(err));
  });
}

async function fetchFullList(type) {
  let allItems = [];
  let offset = 0;
  const limit = 1000;
  
  console.log(`📥 Fetching ${type} list for ${USERNAME}...`);
  
  while (true) {
    try {
      // average_episode_duration is in seconds
      const fields = 'list_status,media_type,num_episodes,average_episode_duration,num_chapters,genres,studios,authors{first_name,last_name}';
      const response = await makeRequest(`users/${USERNAME}/${type}list`, {
        fields,
        limit,
        offset,
        nsfw: true // Include NSFW to ensure stats are accurate
      });
      
      if (!response.data || response.data.length === 0) break;
      
      allItems = [...allItems, ...response.data];
      
      if (!response.paging || !response.paging.next) break;
      offset += limit;
      
      // Respect rate limits lightly
      await new Promise(r => setTimeout(r, 500));
      process.stdout.write(`.`);
      
    } catch (error) {
      console.error(`❌ Error fetching ${type} list:`, error.message);
      break;
    }
  }
  console.log(`\n✅ Fetched ${allItems.length} ${type} entries.`);
  return allItems;
}

function calculateStats(items, itemType) {
  const stats = {
    totalEntries: 0,
    completed: 0,
    watching: 0, // or reading
    onHold: 0,
    dropped: 0,
    planTo: 0,
    meanScore: 0,
    totalEpisodes: 0, // or chapters
    totalTimeSeconds: 0,
    scoreSum: 0,
    scoreCount: 0,
    genres: {},
    studios: {},
    authors: {},
    formats: {}
  };
  
  items.forEach(item => {
    const node = item.node;
    const status = item.list_status;
    
    // Aggregate Formats (Media Type)
    if (node.media_type) {
        const fmt = node.media_type.toUpperCase();
        stats.formats[fmt] = (stats.formats[fmt] || 0) + 1;
    }
    
    stats.totalEntries++;
    
    if (status.status === 'completed') stats.completed++;
    else if (status.status === 'watching' || status.status === 'reading') stats.watching++;
    else if (status.status === 'on_hold') stats.onHold++;
    else if (status.status === 'dropped') stats.dropped++;
    else if (status.status === 'plan_to_watch' || status.status === 'plan_to_read') stats.planTo++;
    
    if (status.score > 0) {
      stats.scoreSum += status.score;
      stats.scoreCount++;
    }
    
    if (itemType === 'anime') {
      const watched = status.num_episodes_watched || 0;
      stats.totalEpisodes += watched;
      const duration = node.average_episode_duration || 0;
      stats.totalTimeSeconds += (watched * duration);

      // Aggregate Studios
      if (node.studios && Array.isArray(node.studios)) {
        node.studios.forEach(studio => {
          stats.studios[studio.name] = (stats.studios[studio.name] || 0) + 1;
        });
      }
    } else {
      // Manga
      stats.totalEpisodes += (status.num_chapters_read || 0); // Reuse totalEpisodes for chapters

      // Aggregate Authors
      if (node.authors && Array.isArray(node.authors)) {
        node.authors.forEach(author => {
          const name = `${author.node.first_name} ${author.node.last_name}`.trim();
          stats.authors[name] = (stats.authors[name] || 0) + 1;
        });
      }
    }

    // Aggregate Genres (Common to both)
    if (node.genres && Array.isArray(node.genres)) {
      node.genres.forEach(genre => {
        stats.genres[genre.name] = (stats.genres[genre.name] || 0) + 1;
      });
    }
  });
  
  if (stats.scoreCount > 0) {
    stats.meanScore = (stats.scoreSum / stats.scoreCount).toFixed(2);
  }
  
  return stats;
}

function getTopKeys(obj, limit = 5) {
  return Object.entries(obj)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([name, count]) => ({ name, count }));
}

async function main() {
  console.log(`📊 Starting MAL Stats Fetch for ${USERNAME}...`);
  
  const animeList = await fetchFullList('anime');
  const mangaList = await fetchFullList('manga');
  
  // Filter lists by category
  const categories = {
    anime_series: animeList.filter(i => ['tv', 'ova', 'ona', 'special', 'music'].includes(i.node.media_type)),
    anime_movies: animeList.filter(i => i.node.media_type === 'movie'),
    manga: mangaList.filter(i => ['manga', 'novel', 'oneshot', 'doujin', 'oel'].includes(i.node.media_type)),
    manhwa: mangaList.filter(i => i.node.media_type === 'manhwa'),
    manhua: mangaList.filter(i => i.node.media_type === 'manhua')
  };
  
  const outputStats = {};
  
  for (const [key, items] of Object.entries(categories)) {
    const type = key.includes('anime') ? 'anime' : 'manga';
    const rawStats = calculateStats(items, type);
    
    // Format for frontend
    outputStats[key] = {
      total: rawStats.totalEntries,
      completed: rawStats.completed,
      meanScore: rawStats.meanScore,
      // For anime: days watched. For manga: chapters read
      statExtra: type === 'anime' 
        ? { label: 'Days Watched', value: (rawStats.totalTimeSeconds / 86400).toFixed(1) }
        : { label: 'Chapters Read', value: rawStats.totalEpisodes.toLocaleString() }, // totalEpisodes is chapters here
      
      // Top Lists
      topGenres: getTopKeys(rawStats.genres, 5),
      topStudios: type === 'anime' ? getTopKeys(rawStats.studios, 5) : [],
      topAuthors: type === 'manga' ? getTopKeys(rawStats.authors, 5) : [],
      
      formats: getTopKeys(rawStats.formats, 10), // Save all formats

      // Detailed status breakdown if needed later
      details: {
        watching: rawStats.watching,
        onHold: rawStats.onHold,
        dropped: rawStats.dropped,
        planTo: rawStats.planTo
      }
    };
    
    console.log(`   ${key}: ${rawStats.totalEntries} entries, ${rawStats.meanScore} mean`);
  }
  
  const finalOutput = {
    stats: outputStats,
    username: USERNAME,
    fetchedAt: new Date().toISOString()
  };
  
  // Ensure output directory
  const dir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(finalOutput, null, 2));
  console.log(`✨ Stats saved to ${OUTPUT_FILE}`);
}

main();
