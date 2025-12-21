
export interface TopItem {
  name: string;
  count: number;
}

export interface FormatItem {
  name: string;
  count: number;
}

export interface MalStat {
  total: number;
  completed: number;
  meanScore: number | string;
  statExtra: {
    label: string;
    value: string;
  };
  timeWatched?: {
      days: string;
      hours: string;
  };
  topGenres?: TopItem[];
  topStudios?: TopItem[];
  topAuthors?: TopItem[];
  formats?: FormatItem[];
  details?: {
      watching: number;
      onHold: number;
      dropped: number;
      planTo: number;
  };
}

export interface MalData {
  stats: Record<string, MalStat>;
  username: string;
  avatar?: string;
  fetchedAt: string;
}

export type DataSource = 'ANILIST' | 'MAL';
