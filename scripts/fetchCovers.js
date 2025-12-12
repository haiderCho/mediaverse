/**
 * AniList API Cover Fetcher
 * Fetches cover images for anime and manga from AniList GraphQL API
 * 
 * Usage: node scripts/fetchCovers.js
 */

const ANILIST_API = 'https://graphql.anilist.co';

/**
 * GraphQL query to search for anime/manga and get cover images
 */
const query = `
query ($search: String, $type: MediaType) {
  Media(search: $search, type: $type) {
    id
    title {
      romaji
      english
      native
    }
    coverImage {
      extraLarge
      large
      medium
    }
  }
}
`;

/**
 * Fetch cover image from AniList
 */
async function fetchCover(title, type = 'MANGA') {
  const variables = {
    search: title,
    type: type // 'ANIME' or 'MANGA'
  };

  try {
    const response = await fetch(ANILIST_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables
      })
    });

    const data = await response.json();
    
    if (data.errors) {
      console.error(`Error fetching ${title}:`, data.errors);
      return null;
    }

    const coverUrl = data.data.Media.coverImage.extraLarge || data.data.Media.coverImage.large;
    return {
      title: title,
      anilistId: data.data.Media.id,
      coverUrl: coverUrl,
      alternativeTitles: data.data.Media.title
    };
  } catch (error) {
    console.error(`Failed to fetch ${title}:`, error.message);
    return null;
  }
}

/**
 * Wait for a delay (to respect rate limits)
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Fetch covers for all titles
 */
async function fetchAllCovers() {
  // Manga titles from manga.ts
  const mangaTitles = [
    'Berserk',
    'Toriko',
    'Vagabond',
    'Homunculus',
    'Akumetsu',
    'Oyasumi Punpun',
    'Holyland',
    'Monster',
    'Nijigahara Holograph',
    'Annarasumanara'
  ];

  // Anime titles from anime.ts (sample - you can add all)
  const animeTitles = [
    'One Piece',
    'Dragon Ball',
    'Hunter x Hunter',
    'Naruto',
    'Bleach',
    'Fullmetal Alchemist: Brotherhood',
    'Attack on Titan',
    'Demon Slayer',
    // Add more as needed...
  ];

  console.log('Fetching manga covers...\n');
  const mangaCovers = [];
  for (const title of mangaTitles) {
    console.log(`Fetching: ${title}`);
    const result = await fetchCover(title, 'MANGA');
    if (result) {
      mangaCovers.push(result);
      console.log(`  ✓ ${result.coverUrl}`);
    }
    await delay(1000); // 1 second delay between requests
  }

  console.log('\n\nFetching anime covers...\n');
  const animeCovers = [];
  for (const title of animeTitles) {
    console.log(`Fetching: ${title}`);
    const result = await fetchCover(title, 'ANIME');
    if (result) {
      animeCovers.push(result);
      console.log(`  ✓ ${result.coverUrl}`);
    }
    await delay(1000); // 1 second delay between requests
  }

  // Output results
  console.log('\n\n=== MANGA COVERS ===\n');
  mangaCovers.forEach(item => {
    console.log(`${item.title}: '${item.coverUrl}',`);
  });

  console.log('\n\n=== ANIME COVERS ===\n');
  animeCovers.forEach(item => {
    console.log(`${item.title}: '${item.coverUrl}',`);
  });

  // Save to file
  const fs = require('fs');
  const output = {
    manga: mangaCovers,
    anime: animeCovers,
    generatedAt: new Date().toISOString()
  };
  
  fs.writeFileSync(
    'scripts/anilist-covers.json',
    JSON.stringify(output, null, 2)
  );
  
  console.log('\n\n✓ Results saved to scripts/anilist-covers.json');
}

// Run the script
fetchAllCovers().catch(console.error);
