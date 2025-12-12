import { MediaEntry, PageId } from '../types';

/** 
 * Movies data organized by genre
 * TODO: Populate with real data
 */
export const moviesData: Record<string, MediaEntry[]> = {
  Action: [],
  Thriller: [],
  Drama: [],
  'Sci-Fi': [],
};

export const moviesGenres = Object.keys(moviesData);

export function getMoviesData(genre: string): MediaEntry[] {
  return moviesData[genre] || [];
}

export const moviesPageIds = [PageId.MOVIES];
