import { MediaEntry, PageId } from '../types';

/** 
 * Books data organized by genre
 * TODO: Populate with real data
 */
export const booksData: Record<string, MediaEntry[]> = {
  Fiction: [],
  'Non-Fiction': [],
  History: [],
  Philosophy: [],
};

export const booksGenres = Object.keys(booksData);

export function getBooksData(genre: string): MediaEntry[] {
  return booksData[genre] || [];
}

export const booksPageIds = [PageId.BOOKS];
