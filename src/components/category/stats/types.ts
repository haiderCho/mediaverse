
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

export interface CinematicStat {
  totalTitles: number;
  averageRating: number;
  totalRuntime?: string;
  ratingsDistribution: {
    score: number;
    count: number;
  }[];
  decades: {
    decade: string;
    count: number;
  }[];
  topGenres: TopItem[];
  recentMilestones?: {
    label: string;
    value: string;
  }[];
}

export type DataSource = 'ANILIST' | 'MAL' | 'IMDB' | 'LETTERBOXD' | 'SERIALIZD';
