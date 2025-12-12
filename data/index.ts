import { PageId, MediaEntry } from '../types';

// Import all category data
import { animeData, animeGenres, animePageIds } from './anime';
import { animeMoviesData, animeMoviesGenres, animeMoviesPageIds } from './animeMovies';
import { mangaData, mangaGenres, mangaPageIds } from './manga';
import { manhwaData, manhwaGenres, manhwaPageIds } from './manhwa';
import { manhuaData, manhuaGenres, manhuaPageIds } from './manhua';
import { moviesData, moviesGenres, moviesPageIds } from './movies';
import { tvSeriesData, tvSeriesGenres, tvSeriesPageIds } from './tvSeries';
import { booksData, booksGenres, booksPageIds } from './books';
import { lightNovelsData, lightNovelsGenres, lightNovelsPageIds } from './lightNovels';
import { comicsData, comicsGenres, comicsPageIds } from './comics';
import { gamesData, gamesGenres, gamesPageIds } from './games';
import { musicData, musicGenres, musicPageIds } from './music';
import { dramaData, dramaGenres, dramaPageIds } from './drama';

/**
 * Automatic genre mapping by PageId
 * This ensures genres in the topbar automatically sync with the data files
 */
export const GENRE_MAP: Record<PageId, string[]> = {
  // Pages without genres
  [PageId.HOME]: [],
  [PageId.PROFILE]: [],
  [PageId.TRACKERS]: [],
  
  // Anime pages (separate data for series vs movies)
  [PageId.ANIME_SERIES]: animeGenres,
  [PageId.ANIME_MOVIES]: animeMoviesGenres,
  
  // Manga-related pages
  [PageId.MANGA]: mangaGenres,
  [PageId.MANHWA]: manhwaGenres,
  [PageId.MANHUA]: manhuaGenres,
  
  // Media pages
  [PageId.MOVIES]: moviesGenres,
  [PageId.TV_SERIES]: tvSeriesGenres,
  [PageId.MUSIC]: musicGenres,
  [PageId.DRAMA]: dramaGenres,
  
  // Reading pages
  [PageId.BOOKS]: booksGenres,
  [PageId.LIGHT_NOVEL]: lightNovelsGenres,
  [PageId.COMIC]: comicsGenres,
  
  // Games
  [PageId.GAMES]: gamesGenres,
};

/**
 * Get data for a specific page and genre
 * Automatically routes to the correct data source based on PageId
 */
export function getData(pageId: PageId, genre: string): MediaEntry[] {
  // Anime Series
  if (animePageIds.includes(pageId)) {
    return animeData[genre] || [];
  }
  
  // Anime Movies (separate data)
  if (animeMoviesPageIds.includes(pageId)) {
    return animeMoviesData[genre] || [];
  }
  
  // Manga
  if (mangaPageIds.includes(pageId)) {
    return mangaData[genre] || [];
  }
  
  // Manhwa
  if (manhwaPageIds.includes(pageId)) {
    return manhwaData[genre] || [];
  }
  
  // Manhua
  if (manhuaPageIds.includes(pageId)) {
    return manhuaData[genre] || [];
  }
  
  // Movies
  if (moviesPageIds.includes(pageId)) {
    return moviesData[genre] || [];
  }
  
  // TV Series
  if (tvSeriesPageIds.includes(pageId)) {
    return tvSeriesData[genre] || [];
  }
  
  // Books
  if (booksPageIds.includes(pageId)) {
    return booksData[genre] || [];
  }
  
  // Light Novels
  if (lightNovelsPageIds.includes(pageId)) {
    return lightNovelsData[genre] || [];
  }
  
  // Comics
  if (comicsPageIds.includes(pageId)) {
    return comicsData[genre] || [];
  }
  
  // Games
  if (gamesPageIds.includes(pageId)) {
    return gamesData[genre] || [];
  }
  
  // Music
  if (musicPageIds.includes(pageId)) {
    return musicData[genre] || [];
  }
  
  // Drama
  if (dramaPageIds.includes(pageId)) {
    return dramaData[genre] || [];
  }
  
  return [];
}

// Re-export specific data accessors for backwards compatibility
export { getAnimeData } from './anime';
export { getAnimeMoviesData } from './animeMovies';
export { getMangaData } from './manga';
