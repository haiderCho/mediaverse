import { MediaEntry, PageId } from '../types';

/** 
 * Music data organized by genre
 * TODO: Populate with real data
 */
export const musicData: Record<string, MediaEntry[]> = {
  Rock: [],
  Electronic: [],
  Pop: [],
  Jazz: [],
};

export const musicGenres = Object.keys(musicData);

export function getMusicData(genre: string): MediaEntry[] {
  return musicData[genre] || [];
}

export const musicPageIds = [PageId.MUSIC];
