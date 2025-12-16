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
    accentColorDark: '#00F0FF', // Cyan
    accentColorLight: '#4DEEEA',
    icon: User,
    genres: [],
  },
  [PageId.PROFILE]: {
    id: PageId.PROFILE,
    title: 'Profile',
    fontFamily: 'Poppins, sans-serif',
    accentColorDark: '#00F0FF', // Cyber Cyan
    accentColorLight: '#7DF9FF',
    icon: User,
    genres: [],
  },
  [PageId.TRACKERS]: {
    id: PageId.TRACKERS,
    title: 'Trackers',
    fontFamily: 'Poppins, sans-serif',
    accentColorDark: '#7000FF', // Electric Violet
    accentColorLight: '#B266FF',
    icon: Link,
    genres: [],
  },
  [PageId.COMIC]: {
    id: PageId.COMIC,
    title: 'Comics',
    fontFamily: '"Comic Neue", cursive',
    accentColorDark: '#FF003C', // Neon Red
    accentColorLight: '#FF4D73',
    icon: BookOpen,
    genres: GENRE_MAP[PageId.COMIC],
  },
  [PageId.MANGA]: {
    id: PageId.MANGA,
    title: 'Manga',
    fontFamily: '"Permanent Marker", cursive',
    accentColorDark: '#FF9900', // Neon Orange
    accentColorLight: '#FFC266',
    icon: Book,
    genres: GENRE_MAP[PageId.MANGA],
  },
  [PageId.MANHWA]: {
    id: PageId.MANHWA,
    title: 'Manhwa',
    fontFamily: '"East Sea Dokdo", cursive',
    accentColorDark: '#00FF9F', // Neon Green
    accentColorLight: '#66FFC8',
    icon: Scroll,
    genres: GENRE_MAP[PageId.MANHWA],
  },
  [PageId.MANHUA]: {
    id: PageId.MANHUA,
    title: 'Manhua',
    fontFamily: '"Ma Shan Zheng", cursive',
    accentColorDark: '#FCEE0A', // Cyber Yellow
    accentColorLight: '#FDF566',
    icon: Scroll,
    genres: GENRE_MAP[PageId.MANHUA],
  },
  [PageId.ANIME_SERIES]: {
    id: PageId.ANIME_SERIES,
    title: 'Anime Series',
    fontFamily: '"RocknRoll One", sans-serif',
    accentColorDark: '#FF00FF', // Magenta
    accentColorLight: '#FF66FF',
    icon: Tv,
    genres: GENRE_MAP[PageId.ANIME_SERIES],
  },
  [PageId.ANIME_MOVIES]: {
    id: PageId.ANIME_MOVIES,
    title: 'Anime Movies',
    fontFamily: '"RocknRoll One", sans-serif',
    accentColorDark: '#D400FF', // Purple
    accentColorLight: '#E566FF',
    icon: Film,
    genres: GENRE_MAP[PageId.ANIME_MOVIES],
  },
  [PageId.MOVIES]: {
    id: PageId.MOVIES,
    title: 'Movies',
    fontFamily: '"Bebas Neue", sans-serif',
    accentColorDark: '#FF2A2A', // Bright Red
    accentColorLight: '#FF6666',
    icon: Film,
    genres: GENRE_MAP[PageId.MOVIES],
  },
  [PageId.TV_SERIES]: {
    id: PageId.TV_SERIES,
    title: 'TV Series',
    fontFamily: '"Bebas Neue", sans-serif',
    accentColorDark: '#FFD700', // Gold
    accentColorLight: '#FFE44D',
    icon: Tv,
    genres: GENRE_MAP[PageId.TV_SERIES],
  },
  [PageId.MUSIC]: {
    id: PageId.MUSIC,
    title: 'Music',
    fontFamily: '"VT323", monospace',
    accentColorDark: '#00E5FF', // Bright Cyan
    accentColorLight: '#66EFFF',
    icon: Music,
    genres: GENRE_MAP[PageId.MUSIC],
  },
  [PageId.BOOKS]: {
    id: PageId.BOOKS,
    title: 'Books',
    fontFamily: '"Goudy Bookletter 1911", serif',
    accentColorDark: '#E2A065', // Polished Wood (Lighter for visibility)
    accentColorLight: '#F0D5B7', // Parchment
    icon: Library,
    genres: GENRE_MAP[PageId.BOOKS],
  },
  [PageId.LIGHT_NOVEL]: {
    id: PageId.LIGHT_NOVEL,
    title: 'Light Novels',
    fontFamily: '"Goudy Bookletter 1911", serif',
    accentColorDark: '#F5F5F5', // E-Ink White
    accentColorLight: '#E5E5E5', // Digital Paper Highlight
    icon: Book,
    genres: GENRE_MAP[PageId.LIGHT_NOVEL],
  },
  [PageId.GAMES]: {
    id: PageId.GAMES,
    title: 'Games',
    fontFamily: 'Orbitron, sans-serif',
    accentColorDark: '#50FA7B', // Matrix Green
    accentColorLight: '#8AFFAA',
    icon: Gamepad2,
    genres: GENRE_MAP[PageId.GAMES],
  },
  [PageId.DRAMA]: {
    id: PageId.DRAMA,
    title: 'Drama',
    fontFamily: '"Sansita Swashed", cursive',
    accentColorDark: '#FF5555', // Soft Red
    accentColorLight: '#FF8888',
    icon: Clapperboard,
    genres: GENRE_MAP[PageId.DRAMA],
  },
};

// --- LANDING PAGE GRID LAYOUT ---

export const HEX_GRID_LAYOUT: HexGridRow[] = [
  // Row 1: Profile (Center)
  { rowId: 1, items: [PageId.PROFILE], offset: false },

  // Row 2: Manga, Manhwa, Manhua, Comics (4 items)
  {
    rowId: 2,
    items: [PageId.MANGA, PageId.MANHWA, PageId.MANHUA, PageId.COMIC],
    offset: false,
  },

  // Row 3: Anime Series, Anime Movies, Movies, TV Series, Drama (5 items)
  {
    rowId: 3,
    items: [PageId.ANIME_SERIES, PageId.ANIME_MOVIES, PageId.MOVIES, PageId.TV_SERIES, PageId.DRAMA],
    offset: false,
  },

  // Row 4: Books, Light Novels, Games, Music (4 items)
  {
    rowId: 4,
    items: [PageId.BOOKS, PageId.LIGHT_NOVEL, PageId.GAMES, PageId.MUSIC],
    offset: false,
  },

  // Row 5: Trackers (Center)
  { rowId: 5, items: [PageId.TRACKERS], offset: false },
];

// --- DATA LOADER ---

// --- DATA LOADER ---

import { GENRE_MAP } from './config/genres';

export const generateMockData = (pageId: PageId, genre: string): MediaEntry[] => {
  // Purely fallback data generation

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
    review:
      'This is a masterpiece of storytelling. The visual fidelity combined with the narrative depth makes for an unforgettable experience. Highly recommended for fans of the genre.',
    coverUrl: images[i % images.length] + `?random=${Math.random()}`,
  }));
};
