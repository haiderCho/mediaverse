import { MediaEntry, PageId } from '../types';

/**
 * Anime Movies data organized by genre
 * Separate from Anime Series
 */
export const animeMoviesData: Record<string, MediaEntry[]> = {
  // TODO: Populate with anime movie data
  // For now, using empty arrays - genres can be customized
  Shonen: [],
  Seinen: [],
  Action: [],
  Fantasy: [],
  'Slice of Life': [],
};

/**
 * Automatically extract available genres from the data
 */
export const animeMoviesGenres = Object.keys(animeMoviesData);

/**
 * Get anime movies data for a specific genre
 */
export function getAnimeMoviesData(genre: string): MediaEntry[] {
  return animeMoviesData[genre] || [];
}

/**
 * PageIds that use anime movies data
 */
export const animeMoviesPageIds = [PageId.ANIME_MOVIES];
