import { MediaEntry, PageId } from '../types';

/** 
 * Drama data organized by genre
 * TODO: Populate with real data
 */
export const dramaData: Record<string, MediaEntry[]> = {
  'K-Drama': [],
  'J-Drama': [],
  Historical: [],
};

export const dramaGenres = Object.keys(dramaData);

export function getDramaData(genre: string): MediaEntry[] {
  return dramaData[genre] || [];
}

export const dramaPageIds = [PageId.DRAMA];
