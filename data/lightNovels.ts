import { MediaEntry, PageId } from '../types';

/** 
 * Light Novels data organized by genre
 * TODO: Populate with real data
 */
export const lightNovelsData: Record<string, MediaEntry[]> = {
  Fantasy: [],
  RomCom: [],
  'Sci-Fi': [],
};

export const lightNovelsGenres = Object.keys(lightNovelsData);

export function getLightNovelsData(genre: string): MediaEntry[] {
  return lightNovelsData[genre] || [];
}

export const lightNovelsPageIds = [PageId.LIGHT_NOVEL];
