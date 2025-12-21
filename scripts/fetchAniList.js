import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USERNAME = 'NafizHC';
const OUTPUT_FILE = path.join(__dirname, '../public/data/anilist-stats.json');

// Query 1: User Statistics (for overall anime/manga overview)
const statsQuery = `
query ($name: String) {
  User(name: $name) {
    name
    avatar { large }
    statistics {
      anime {
        count
        meanScore
        minutesWatched
        episodesWatched
        statuses { status count }
        formats { format count }
        genres(limit: 5, sort: COUNT_DESC) { genre count }
        studios(limit: 5, sort: COUNT_DESC) { studio { name } count }
      }
      manga {
        count
        meanScore
        chaptersRead
        volumesRead
        statuses { status count }
        formats { format count }
        genres(limit: 5, sort: COUNT_DESC) { genre count }
        staff(limit: 5, sort: COUNT_DESC) { staff { name { full } } count }
      }
    }
  }
}
`;

// Query 2: User's Manga List with Country of Origin (for filtering)
const mangaListQuery = `
query ($name: String) {
  MediaListCollection(userName: $name, type: MANGA) {
    lists {
      name
      status
      entries {
        status
        score
        progress
        media {
          id
          countryOfOrigin
          chapters
          format
          genres
          staff(perPage: 5, sort: RELEVANCE) {
            nodes { name { full } }
          }
        }
      }
    }
  }
}
`;

function makeRequest(query, variables) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'graphql.anilist.co',
      path: '/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error('Failed to parse JSON: ' + e.message));
          }
        } else {
          reject(new Error(`API Error: ${res.statusCode}`));
        }
      });
    });

    req.on('error', reject);
    req.write(JSON.stringify({ query, variables }));
    req.end();
  });
}

async function fetchAniListStats() {
  console.log(`📊 Fetching AniList stats for ${USERNAME}...`);

  try {
    // Fetch both queries in parallel
    const [statsRes, mangaListRes] = await Promise.all([
      makeRequest(statsQuery, { name: USERNAME }),
      makeRequest(mangaListQuery, { name: USERNAME })
    ]);

    const user = statsRes.data.User;
    const mangaLists = mangaListRes.data.MediaListCollection.lists;

    if (!user) {
      console.error("❌ User not found!");
      return;
    }

    processData(user, mangaLists);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
}

function processData(user, mangaLists) {
  const { anime, manga } = user.statistics;

  // Helper to find specific status count
  const getStatusCount = (list, statusName) => {
    const found = list.find(s => s.status === statusName);
    return found ? found.count : 0;
  };

  // --- Process Manga List by Country ---
  const allMangaEntries = mangaLists.flatMap(list => list.entries);

  const filterByCountry = (entries, countryCodes) => {
    return entries.filter(e => countryCodes.includes(e.media.countryOfOrigin));
  };

  const calculateStats = (entries, label) => {
    const total = entries.length;
    const completed = entries.filter(e => e.status === 'COMPLETED').length;
    const watching = entries.filter(e => e.status === 'CURRENT').length;
    const onHold = entries.filter(e => e.status === 'PAUSED').length;
    const dropped = entries.filter(e => e.status === 'DROPPED').length;
    const planTo = entries.filter(e => e.status === 'PLANNING').length;
    
    const scores = entries.map(e => e.score).filter(s => s > 0);
    const meanScore = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : 0;

    const chaptersRead = entries.reduce((sum, e) => sum + (e.progress || 0), 0);

    // Genre counts
    const genreCounts = {};
    entries.forEach(e => {
      (e.media.genres || []).forEach(g => {
        genreCounts[g] = (genreCounts[g] || 0) + 1;
      });
    });
    const topGenres = Object.entries(genreCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    // Format counts
    const formatCounts = {};
    entries.forEach(e => {
      const fmt = e.media.format || 'UNKNOWN';
      formatCounts[fmt] = (formatCounts[fmt] || 0) + 1;
    });
    const formats = Object.entries(formatCounts)
      .filter(([, count]) => count > 0)
      .map(([name, count]) => ({ name, count }));

    // Top Authors
    const authorCounts = {};
    entries.forEach(e => {
      (e.media.staff?.nodes || []).forEach(staff => {
        const name = staff.name.full;
        authorCounts[name] = (authorCounts[name] || 0) + 1;
      });
    });
    const topAuthors = Object.entries(authorCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    return {
      total,
      completed,
      meanScore: parseFloat(meanScore),
      statExtra: { label: "Chapters Read", value: chaptersRead.toLocaleString() },
      topGenres,
      topAuthors,
      formats,
      details: { watching, onHold, dropped, planTo }
    };
  };

  // JP = Manga, KR = Manhwa, CN/TW = Manhua
  const mangaEntries = filterByCountry(allMangaEntries, ['JP']);
  const manhwaEntries = filterByCountry(allMangaEntries, ['KR']);
  const manhuaEntries = filterByCountry(allMangaEntries, ['CN', 'TW']);

  // --- Build Final Stats Object ---
  const stats = {
    anime_series: {
      total: anime.count,
      completed: getStatusCount(anime.statuses, 'COMPLETED'),
      meanScore: anime.meanScore,
      statExtra: { label: "Episodes Watched", value: anime.episodesWatched.toLocaleString() },
      timeWatched: {
        days: (anime.minutesWatched / 1440).toFixed(1),
        hours: (anime.minutesWatched / 60).toFixed(0)
      },
      formats: anime.formats.map(f => ({ name: f.format, count: f.count })).filter(f => f.count > 0),
      topGenres: anime.genres.map(g => ({ name: g.genre, count: g.count })),
      topStudios: anime.studios.map(s => ({ name: s.studio.name, count: s.count })),
      details: {
        watching: getStatusCount(anime.statuses, 'CURRENT'),
        onHold: getStatusCount(anime.statuses, 'PAUSED'),
        dropped: getStatusCount(anime.statuses, 'DROPPED'),
        planTo: getStatusCount(anime.statuses, 'PLANNING')
      }
    },
    anime_movies: {
      total: anime.formats.find(f => f.format === 'MOVIE')?.count || 0,
      completed: anime.formats.find(f => f.format === 'MOVIE')?.count || 0,
      meanScore: anime.meanScore,
      statExtra: { label: "Movies Watched", value: (anime.formats.find(f => f.format === 'MOVIE')?.count || 0).toString() },
      topGenres: anime.genres.slice(0, 5).map(g => ({ name: g.genre, count: g.count })),
      details: { watching: 0, onHold: 0, dropped: 0, planTo: 0 }
    },
    manga: calculateStats(mangaEntries, 'Manga'),
    manhwa: calculateStats(manhwaEntries, 'Manhwa'),
    manhua: calculateStats(manhuaEntries, 'Manhua')
  };

  const output = {
    stats,
    username: user.name,
    avatar: user.avatar.large,
    fetchedAt: new Date().toISOString()
  };

  // Ensure output directory
  const dir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
  console.log(`✅ Stats saved to ${OUTPUT_FILE}`);
  console.log(`   - Manga (JP): ${mangaEntries.length} entries`);
  console.log(`   - Manhwa (KR): ${manhwaEntries.length} entries`);
  console.log(`   - Manhua (CN/TW): ${manhuaEntries.length} entries`);
}

fetchAniListStats();
