import { MediaEntry, PageId } from '../types';

/** 
 * Games data organized by genre
 * TODO: Populate with real data
 */
export const gamesData: Record<string, MediaEntry[]> = {
  RPG: [],
  FPS: [],
  Strategy: [],
  Indie: [],
};

export const gamesGenres = Object.keys(gamesData);

export function getGamesData(genre: string): MediaEntry[] {
  return gamesData[genre] || [];
}

export const gamesPageIds = [PageId.GAMES];
