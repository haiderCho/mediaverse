import { MediaEntry, PageId } from '../types';

/** 
 * TV Series data organized by genre
 * TODO: Populate with real data
 */
export const tvSeriesData: Record<string, MediaEntry[]> = {
  Crime: [],
  Fantasy: [],
  Sitcom: [],
  Documentary: [],
};

export const tvSeriesGenres = Object.keys(tvSeriesData);

export function getTvSeriesData(genre: string): MediaEntry[] {
  return tvSeriesData[genre] || [];
}

export const tvSeriesPageIds = [PageId.TV_SERIES];
