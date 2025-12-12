import { MediaEntry, PageId } from '../types';

/** 
 * Comics data organized by genre
 * TODO: Populate with real data
 */
export const comicsData: Record<string, MediaEntry[]> = {
  Superhero: [],
  Indie: [],
  Horror: [],
  'Sci-Fi': [],
};

export const comicsGenres = Object.keys(comicsData);

export function getComicsData(genre: string): MediaEntry[] {
  return comicsData[genre] || [];
}

export const comicsPageIds = [PageId.COMIC];
