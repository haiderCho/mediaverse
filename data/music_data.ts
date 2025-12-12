export interface MusicArtist {
  rank: number;
  name: string;
  imageUrl: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  imageUrl: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  platform: 'Spotify' | 'YouTube Music' | 'Other';
  url: string;
  imageUrl: string;
}

// Top 25 Artists (User Provided)
export const topArtists: MusicArtist[] = [
  { rank: 1, name: 'Aurthohin', imageUrl: `${import.meta.env.BASE_URL}assets/music/aurthohin.jpeg` },
  { rank: 2, name: 'Five Finger Death Punch', imageUrl: `${import.meta.env.BASE_URL}assets/music/five_finger_death_punch.jpeg` },
  { rank: 3, name: 'Godsmack', imageUrl: `${import.meta.env.BASE_URL}assets/music/godsmack.jpeg` },
  { rank: 4, name: 'Disturbed', imageUrl: `${import.meta.env.BASE_URL}assets/music/disturbed.jpeg` },
  { rank: 5, name: 'Avenged Sevenfold', imageUrl: `${import.meta.env.BASE_URL}assets/music/avenged_sevenfold.jpeg` },
  { rank: 6, name: 'Sabaton', imageUrl: 'https://ui-avatars.com/api/?name=Sabaton&background=4A148C&color=fff&size=300' }, // Missing image
  { rank: 7, name: 'Three Days Grace', imageUrl: `${import.meta.env.BASE_URL}assets/music/three_days_grace.jpeg` },
  { rank: 8, name: 'Linkin Park', imageUrl: 'https://ui-avatars.com/api/?name=Linkin+Park&background=212121&color=fff&size=300' }, // Missing image
  { rank: 9, name: 'Metallica', imageUrl: `${import.meta.env.BASE_URL}assets/music/metallica.jpeg` },
  { rank: 10, name: 'Eminem', imageUrl: `${import.meta.env.BASE_URL}assets/music/eminem.jpeg` },
  { rank: 11, name: 'Popeye Bangladesh', imageUrl: `${import.meta.env.BASE_URL}assets/music/popeye_bangladesh.jpeg` },
  { rank: 12, name: 'System of a Down', imageUrl: `${import.meta.env.BASE_URL}assets/music/system_of_a_down.jpeg` },
  { rank: 13, name: 'Billy Talent', imageUrl: `${import.meta.env.BASE_URL}assets/music/billy_talent.jpeg` },
  { rank: 14, name: 'Breaking Benjamin', imageUrl: `${import.meta.env.BASE_URL}assets/music/breaking_benjamin.jpeg` },
  { rank: 15, name: 'Warfaze', imageUrl: 'https://ui-avatars.com/api/?name=Warfaze&background=263238&color=fff&size=300' }, // Missing image
  { rank: 16, name: 'Shironamhin', imageUrl: `${import.meta.env.BASE_URL}assets/music/shironamhin.jpeg` },
  { rank: 17, name: 'Shinedown', imageUrl: `${import.meta.env.BASE_URL}assets/music/shinedown.jpeg` },
  { rank: 18, name: 'Shunno', imageUrl: `${import.meta.env.BASE_URL}assets/music/shunno.jpeg` },
  { rank: 19, name: 'Alec Benjamin', imageUrl: `${import.meta.env.BASE_URL}assets/music/alec_benjamin.jpeg` },
  { rank: 20, name: 'Korn', imageUrl: `${import.meta.env.BASE_URL}assets/music/korn.jpeg` },
  { rank: 21, name: 'Powerwolf', imageUrl: `${import.meta.env.BASE_URL}assets/music/powerwolf.jpeg` },
  { rank: 22, name: 'Thousand Foot Krutch', imageUrl: `${import.meta.env.BASE_URL}assets/music/thousand_foot_krutch.jpeg` },
  { rank: 23, name: 'Guns N\' Roses', imageUrl: `${import.meta.env.BASE_URL}assets/music/guns_n_roses.jpeg` },
  { rank: 24, name: 'Conclusion', imageUrl: `${import.meta.env.BASE_URL}assets/music/conclusion.jpeg` },
  { rank: 25, name: 'Starset', imageUrl: `${import.meta.env.BASE_URL}assets/music/Starset.jpeg` },
];

// Helper to generate 50 tracks
const generateTracks = (category: string): MusicTrack[] => 
  Array.from({ length: 50 }).map((_, i) => ({
    id: `${category}-${i}`,
    title: `${category} Song ${i + 1}`,
    artist: `${category} Artist ${i + 1}`,
    album: `${category} Album ${i + 1}`,
    imageUrl: `https://picsum.photos/300/300?random=${i + 1000}`,
  }));

export const englishTracks = generateTracks('English');
export const banglaTracks = generateTracks('Bangla');
export const japaneseTracks = generateTracks('Japanese');
export const hindiUrduTracks = generateTracks('Hindi/Urdu');
export const otherTracks = generateTracks('Other');

// Placeholder Data - Playlists
export const playlists: Playlist[] = [
  {
    id: 'p1',
    name: 'My Top Favorites',
    description: 'The absolute best tracks of all time.',
    platform: 'Spotify',
    url: '#',
    imageUrl: 'https://picsum.photos/300/300?random=2001',
  },
  {
    id: 'p2',
    name: 'Chill Vibes',
    description: 'Relaxing beats for coding.',
    platform: 'YouTube Music',
    url: '#',
    imageUrl: 'https://picsum.photos/300/300?random=2002',
  },
  {
    id: 'p3',
    name: 'Heavy Rotation',
    description: 'What I am listening to right now.',
    platform: 'Spotify',
    url: '#',
    imageUrl: 'https://picsum.photos/300/300?random=2003',
  }
];
