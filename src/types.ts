import { LucideIcon } from 'lucide-react';

export enum PageId {
  HOME = 'home',
  PROFILE = 'profile',
  ANIME_SERIES = 'anime_series',
  ANIME_MOVIES = 'anime_movies',
  MANGA = 'manga',
  MANHWA = 'manhwa',
  MANHUA = 'manhua',
  COMIC = 'comic',
  BOOKS = 'books',
  LIGHT_NOVEL = 'light_novel',
  GAMES = 'games',
  MOVIES = 'movies',
  TV_SERIES = 'tv_series',
  DRAMA = 'drama',
  MUSIC = 'music',
  TRACKERS = 'trackers',
}

export interface ThemeConfig {
  id: PageId;
  title: string;
  fontFamily: string;
  accentColorDark: string;
  accentColorLight: string;
  icon: LucideIcon;
  genres: string[];
}

export interface MediaEntry {
  id: string;
  title: string;
  coverUrl: string;
  backdropUrl?: string; // High-res backdrop for Hero sections
  myRating: number; // 1-10, personal rating
  imdbRating?: number; // IMDb style rating
  year?: number; // Release year
  runtime?: string; // e.g. "2h 15m" (for movies)
  seasonCount?: number; // e.g. 3 (for TV series)
  review: string;
  genre: string;
  author?: string; // used as Director/Creator for Movies/TV
  synopsis?: string;
  customFont?: string; // Optional custom font for the title
}

export interface HexGridRow {
  rowId: number;
  items: (PageId | null)[];
  offset?: boolean;
}

export type LandingDesign = 'hex-grid' | 'bento' | 'orbital' | 'terminal' | 'floating-cards' | 'archive' | 'atelier' | 'frequency';

export const LANDING_DESIGNS: { id: LandingDesign; label: string; icon: string }[] = [
  { id: 'hex-grid', label: 'Hex Grid', icon: '⬡' },
  { id: 'bento', label: 'Bento', icon: '▣' },
  { id: 'orbital', label: 'Orbital', icon: '◯' },
  { id: 'terminal', label: 'Terminal', icon: '⌨' },
  { id: 'floating-cards', label: 'Cards', icon: '🃏' },
  { id: 'archive', label: 'Archive', icon: '⚖' },
  { id: 'atelier', label: 'Atelier', icon: '🎨' },
  { id: 'frequency', label: 'Freq', icon: '📻' },
];