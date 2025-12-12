import { MediaEntry, PageId } from '../types';

/** 
 * Manhua data organized by genre
 * TODO: Populate with real data
 */
export const manhuaData: Record<string, MediaEntry[]> = {
  Cultivation: [],
  Wuxia: [],
  Comedy: [],
};

export const manhuaGenres = Object.keys(manhuaData);

export function getManhuaData(genre: string): MediaEntry[] {
  return manhuaData[genre] || [];
}

export const manhuaPageIds = [PageId.MANHUA];
