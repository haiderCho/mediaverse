import { MediaEntry, PageId } from '../types';

/** 
 * Manhwa data organized by genre
 * TODO: Populate with real data
 */
export const manhwaData: Record<string, MediaEntry[]> = {
  Action: [],
  Romance: [],
  Fantasy: [],
  'Martial Arts': [],
};

export const manhwaGenres = Object.keys(manhwaData);

export function getManhwaData(genre: string): MediaEntry[] {
  return manhwaData[genre] || [];
}

export const manhwaPageIds = [PageId.MANHWA];
