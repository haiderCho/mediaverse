import {
  User,
  Tv,
  Film,
  BookOpen,
  Scroll,
  Book,
  Gamepad2,
  Music,
  Link,
  Library,
  Clapperboard,
} from 'lucide-react';
import { PageId, ThemeConfig, MediaEntry, HexGridRow } from './types';

// --- THEME CONFIGURATION ---

export const PAGE_THEMES: Record<PageId, ThemeConfig> = {
  [PageId.HOME]: {
    id: PageId.HOME,
    title: 'Home',
    fontFamily: 'Poppins, sans-serif',
    accentColorDark: '#E50914',
    accentColorLight: '#E50914',
    icon: User,
    genres: [],
  },
  [PageId.PROFILE]: {
    id: PageId.PROFILE,
    title: 'Profile',
    fontFamily: 'Poppins, sans-serif',
    accentColorDark: '#E50914',
    accentColorLight: '#E50914',
    icon: User,
    genres: [],
  },
  [PageId.TRACKERS]: {
    id: PageId.TRACKERS,
    title: 'Trackers',
    fontFamily: 'Poppins, sans-serif',
    accentColorDark: '#E50914',
    accentColorLight: '#E50914',
    icon: Link,
    genres: [],
  },
  [PageId.COMIC]: {
    id: PageId.COMIC,
    title: 'Comics',
    fontFamily: '"Permanent Marker", cursive',
    accentColorDark: '#FCD40F',
    accentColorLight: '#D93636',
    icon: BookOpen,
    genres: GENRE_MAP[PageId.COMIC],
  },
  [PageId.MANGA]: {
    id: PageId.MANGA,
    title: 'Manga',
    fontFamily: '"Noto Serif JP", serif',
    accentColorDark: '#4A90E2',
    accentColorLight: '#1A2B5B',
    icon: Book,
    genres: GENRE_MAP[PageId.MANGA],
  },
  [PageId.MANHWA]: {
    id: PageId.MANHWA,
    title: 'Manhwa',
    fontFamily: '"Noto Serif KR", serif',
    accentColorDark: '#4A90E2',
    accentColorLight: '#1A2B5B',
    icon: Scroll,
    genres: GENRE_MAP[PageId.MANHWA],
  },
  [PageId.MANHUA]: {
    id: PageId.MANHUA,
    title: 'Manhua',
    fontFamily: '"Noto Serif SC", serif',
    accentColorDark: '#4A90E2',
    accentColorLight: '#1A2B5B',
    icon: Scroll,
    genres: GENRE_MAP[PageId.MANHUA],
  },
  [PageId.ANIME_SERIES]: {
    id: PageId.ANIME_SERIES,
    title: 'Anime Series',
    fontFamily: 'Montserrat, sans-serif',
    accentColorDark: '#FF579F',
    accentColorLight: '#E81C6E',
    icon: Tv,
    genres: GENRE_MAP[PageId.ANIME_SERIES],
  },
  [PageId.ANIME_MOVIES]: {
    id: PageId.ANIME_MOVIES,
    title: 'Anime Movies',
    fontFamily: 'Montserrat, sans-serif',
    accentColorDark: '#FF579F',
    accentColorLight: '#E81C6E',
    icon: Film,
    genres: GENRE_MAP[PageId.ANIME_MOVIES],
  },
  [PageId.MOVIES]: {
    id: PageId.MOVIES,
    title: 'Movies',
    fontFamily: 'Cinzel, serif',
    accentColorDark: '#FFAB00',
    accentColorLight: '#B38800',
    icon: Film,
    genres: GENRE_MAP[PageId.MOVIES],
  },
  [PageId.TV_SERIES]: {
    id: PageId.TV_SERIES,
    title: 'TV Series',
    fontFamily: 'Cinzel, serif',
    accentColorDark: '#FFAB00',
    accentColorLight: '#B38800',
    icon: Tv,
    genres: GENRE_MAP[PageId.TV_SERIES],
  },
  [PageId.MUSIC]: {
    id: PageId.MUSIC,
    title: 'Music',
    fontFamily: '"VT323", monospace',
    accentColorDark: '#00FFE0',
    accentColorLight: '#00BFA5',
    icon: Music,
    genres: GENRE_MAP[PageId.MUSIC],
  },
  [PageId.BOOKS]: {
    id: PageId.BOOKS,
    title: 'Books',
    fontFamily: 'Lora, serif',
    accentColorDark: '#996633',
    accentColorLight: '#663300',
    icon: Library,
    genres: GENRE_MAP[PageId.BOOKS],
  },
  [PageId.LIGHT_NOVEL]: {
    id: PageId.LIGHT_NOVEL,
    title: 'Light Novels',
    fontFamily: 'Lora, serif',
    accentColorDark: '#996633',
    accentColorLight: '#663300',
    icon: Book,
    genres: GENRE_MAP[PageId.LIGHT_NOVEL],
  },
  [PageId.GAMES]: {
    id: PageId.GAMES,
    title: 'Games',
    fontFamily: 'Orbitron, sans-serif',
    accentColorDark: '#7C4DFF',
    accentColorLight: '#5E35B1',
    icon: Gamepad2,
    genres: GENRE_MAP[PageId.GAMES],
  },
  [PageId.DRAMA]: {
    id: PageId.DRAMA,
    title: 'Drama',
    fontFamily: '"Cormorant Garamond", serif',
    accentColorDark: '#D32F2F',
    accentColorLight: '#A31515',
    icon: Clapperboard,
    genres: GENRE_MAP[PageId.DRAMA],
  },
};

// --- LANDING PAGE GRID LAYOUT ---

export const HEX_GRID_LAYOUT: HexGridRow[] = [
  // 1 Item (Center)
  { rowId: 1, items: [PageId.PROFILE], offset: false },
  
  // 4 Items - Books, Light Novels, Comics, Music (Swapped Music here)
  { rowId: 2, items: [PageId.BOOKS, PageId.LIGHT_NOVEL, PageId.COMIC, PageId.MUSIC], offset: false },
  
  // 5 Items - Anime Series, Anime Movies, Manga, Manhwa, Manhua
  { rowId: 3, items: [PageId.ANIME_SERIES, PageId.ANIME_MOVIES, PageId.MANGA, PageId.MANHWA, PageId.MANHUA], offset: false },
  
  // 4 Items - Movies, TV Series, Drama, Games (Swapped Games here)
  { rowId: 4, items: [PageId.MOVIES, PageId.TV_SERIES, PageId.DRAMA, PageId.GAMES], offset: false },
  
  // 1 Item (Center)
  { rowId: 5, items: [PageId.TRACKERS], offset: false },
];

// --- DATA LOADER ---

import { GENRE_MAP, getData } from './data/index';

export const generateMockData = (pageId: PageId, genre: string): MediaEntry[] => {
  // Try to get real data first from the new data structure
  const realData = getData(pageId, genre);
  if (realData.length > 0) return realData;
  
  // Fallback to generated data for categories without data
  const images = [
    'https://picsum.photos/800/600',
    'https://picsum.photos/800/800',
    'https://picsum.photos/600/800',
    'https://picsum.photos/900/600',
    'https://picsum.photos/600/900',
  ];
  
  return Array.from({ length: 10 }).map((_, i) => ({
    id: `${pageId}-${genre}-${i}`,
    title: `${PAGE_THEMES[pageId].title} Title ${i + 1}`,
    genre: genre,
    myRating: Math.floor(Math.random() * 4) + 6, // Random myRating 6-10
    review: "This is a masterpiece of storytelling. The visual fidelity combined with the narrative depth makes for an unforgettable experience. Highly recommended for fans of the genre.",
    coverUrl: images[i % images.length] + `?random=${Math.random()}`,
  }));
};