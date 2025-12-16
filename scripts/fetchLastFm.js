import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Last.fm Data Fetcher with Rich Metadata
 * Fetches top tracks and artists from Last.fm API with detailed information
 * Designed to run at build time to keep API key secure
 */

const API_KEY = process.env.LASTFM_API_KEY;
const USERNAME = process.env.LASTFM_USERNAME || 'NafizHC';
const BASE_URL = 'ws.audioscrobbler.com';
const OUTPUT_FILE = path.join(__dirname, '../public/data/lastfm.json');
const ARTIST_OVERRIDES_FILE = path.join(__dirname, '../public/data/artist-images.json');

// Load manual artist image overrides (persists across updates)
let artistImageOverrides = {};
try {
  if (fs.existsSync(ARTIST_OVERRIDES_FILE)) {
    const overridesContent = fs.readFileSync(ARTIST_OVERRIDES_FILE, 'utf8');
    artistImageOverrides = JSON.parse(overridesContent);
    console.log(`📸 Loaded ${Object.keys(artistImageOverrides).length} manual artist image overrides`);
  }
} catch (error) {
  console.warn('⚠️  Could not load artist image overrides:', error.message);
}

// Ensure the API key is set
if (!API_KEY) {
  console.warn('⚠️  LASTFM_API_KEY not set. Skipping Last.fm data fetch.');
  console.warn('   Set LASTFM_API_KEY environment variable to enable Last.fm integration.');
  process.exit(0); // Exit gracefully without error
}

/**
 * Make HTTPS request to Last.fm API with rate limiting
 */
function makeRequest(method, params) {
  return new Promise((resolve, reject) => {
    const queryParams = new URLSearchParams({
      method,
      api_key: API_KEY,
      format: 'json',
      ...params
    });

    const options = {
      hostname: BASE_URL,
      path: `/2.0/?${queryParams.toString()}`,
      method: 'GET',
      headers: {
        'User-Agent': 'MediaVerse/1.0'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

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
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

/**
 * Delay helper for rate limiting
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Get detailed track info including album art
 */
async function getTrackInfo(trackName, artistName) {
  try {
    const response = await makeRequest('track.getInfo', {
      track: trackName,
      artist: artistName,
      username: USERNAME
    });

    if (response.track) {
      const track = response.track;
      const album = track.album || {};
      
      return {
        album: album.title || 'Unknown Album',
        imageUrl: getImageUrl(album.image) || getImageUrl(track.image)
      };
    }
  } catch (error) {
    // Silently fail for individual tracks
  }
  
  return {
    album: 'Unknown Album',
    imageUrl: 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png'
  };
}

/**
 * Get detailed artist info including photo
 */
async function getArtistInfo(artistName) {
  try {
    const response = await makeRequest('artist.getInfo', {
      artist: artistName
    });

    if (response.artist && response.artist.image) {
      const imageUrl = getImageUrl(response.artist.image);
      return {
        imageUrl: imageUrl || 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png'
      };
    }
  } catch (error) {
    // Silently fail for individual artists
    console.warn(`Failed to fetch info for artist: ${artistName}`);
  }
  
  return {
    imageUrl: 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png'
  };
}

/**
 * Fetch top tracks from Last.fm with rich metadata
 */
async function fetchTopTracks() {
  console.log('📀 Fetching top 250 tracks...');
  
  try {
    const response = await makeRequest('user.getTopTracks', {
      user: USERNAME,
      limit: 250,
      period: 'overall'
    });

    if (!response.toptracks || !response.toptracks.track) {
      throw new Error('Invalid response from Last.fm API');
    }

    const tracks = [];
    const totalTracks = response.toptracks.track.length;

    console.log(`   Enriching ${totalTracks} tracks with album metadata...`);
    
    for (let i = 0; i < totalTracks; i++) {
      const track = response.toptracks.track[i];
      
      // Get detailed info for each track
      const details = await getTrackInfo(track.name, track.artist.name);
      
      tracks.push({
        name: track.name,
        artist: track.artist.name,
        album: details.album,
        playcount: parseInt(track.playcount, 10),
        imageUrl: details.imageUrl
      });
      
      // Progress indicator
      if ((i + 1) % 50 === 0) {
        console.log(`   Progress: ${i + 1}/${totalTracks} tracks`);
      }
      
      // Rate limiting - wait 100ms between requests
      await delay(100);
    }

    console.log(`✅ Fetched ${tracks.length} tracks with metadata`);
    return tracks;
  } catch (error) {
    console.error('❌ Error fetching top tracks:', error.message);
    throw error;
  }
}

/**
 * Fetch top artists from Last.fm with photos
 */
async function fetchTopArtists() {
  console.log('🎤 Fetching top 50 artists...');
  
  try {
    const response = await makeRequest('user.getTopArtists', {
      user: USERNAME,
      limit: 50,
      period: 'overall'
    });

    if (!response.topartists || !response.topartists.artist) {
      throw new Error('Invalid response from Last.fm API');
    }

    const artists = response.topartists.artist.map(artist => {
      // Check for manual override first
      let imageUrl;
      if (artistImageOverrides[artist.name]) {
        // Use manual override - path will be relative to public directory
        imageUrl = artistImageOverrides[artist.name];
        console.log(`   ✓ Using manual image for: ${artist.name}`);
      } else {
        // Fall back to Last.fm image
        imageUrl = getImageUrl(artist.image) || 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';
      }
      
      return {
        name: artist.name,
        playcount: parseInt(artist.playcount, 10),
        imageUrl: imageUrl
      };
    });

    console.log(`✅ Fetched ${artists.length} artists (${Object.keys(artistImageOverrides).length} with manual images)`);
    return artists;
  } catch (error) {
    console.error('❌ Error fetching top artists:', error.message);
    throw error;
  }
}

/**
 * Extract best quality image URL from Last.fm image array
 */
function getImageUrl(images) {
  if (!images || !Array.isArray(images)) {
    return null;
  }

  // Prefer extralarge, then large, then medium, then small
  const extralarge = images.find(img => img.size === 'extralarge');
  const large = images.find(img => img.size === 'large');
  const medium = images.find(img => img.size === 'medium');
  const small = images.find(img => img.size === 'small');

  const imageUrl = extralarge?.['#text'] || large?.['#text'] || medium?.['#text'] || small?.['#text'];
  
  // Return URL only if it's not empty
  return imageUrl && imageUrl.trim() !== '' ? imageUrl : null;
}

/**
 * Main execution
 */
async function main() {
  console.log('🎵 Starting Last.fm data fetch with rich metadata...');
  console.log(`👤 Username: ${USERNAME}`);
  console.log('⏱  This may take a few minutes due to API rate limiting...\n');

  try {
    // Fetch data with enrichment
    const tracks = await fetchTopTracks();
    const artists = await fetchTopArtists();

    // Prepare output
    const output = {
      tracks,
      artists,
      fetchedAt: new Date().toISOString(),
      username: USERNAME
    };

    // Ensure output directory exists
    const dir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Write to file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
    
    console.log(`\n✨ Success! Data saved to ${OUTPUT_FILE}`);
    console.log(`📊 Total tracks: ${tracks.length}`);
    console.log(`📊 Total artists: ${artists.length}`);
    console.log(`🕐 Fetched at: ${output.fetchedAt}`);
  } catch (error) {
    console.error('\n❌ Failed to fetch Last.fm data:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
