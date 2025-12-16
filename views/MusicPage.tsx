import React, { useState, useEffect } from 'react';
import { Home, Mic2, Disc, ListMusic, Radio } from 'lucide-react';
import { PageId } from '../types';

interface MusicArtist {
  rank: number;
  name: string;
  imageUrl: string;
}

interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  imageUrl: string;
}

interface Playlist {
  id: string;
  name: string;
  description: string;
  platform: 'Spotify' | 'YouTube Music' | 'Other';
  url: string;
  imageUrl: string;
}

interface LastFmTrack {
  name: string;
  artist: string;
  album: string;
  playcount: number;
  imageUrl: string;
}

interface LastFmArtist {
  name: string;
  playcount: number;
  imageUrl: string;
}

interface LastFmData {
  tracks: LastFmTrack[];
  artists: LastFmArtist[];
  fetchedAt: string;
  username: string;
}

interface MusicData {
  topArtists: MusicArtist[];
  tracks: {
    english: MusicTrack[];
    bangla: MusicTrack[];
    japanese: MusicTrack[];
    hindiUrdu: MusicTrack[];
    other: MusicTrack[];
  };
  playlists: Playlist[];
}

interface MusicPageProps {
  onBack: () => void;
  onNavigate: (id: PageId) => void; 
}

type Tab = 'artists' | 'tracks' | 'playlists' | 'lastfm';

const MusicPage: React.FC<MusicPageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<Tab>('lastfm');
  const [data, setData] = useState<MusicData | null>(null);
  const [lastfmData, setLastfmData] = useState<LastFmData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load regular music data
    const loadMusicData = fetch(`${import.meta.env.BASE_URL}data/music.json`)
      .then(res => res.json())
      .then(json => {
        const processUrl = (url: string) => url.startsWith('http') ? url : `${import.meta.env.BASE_URL}${url}`;
        
        const processedData: MusicData = {
            ...json,
            topArtists: json.topArtists.map((a: MusicArtist) => ({ ...a, imageUrl: processUrl(a.imageUrl) })),
        };
        
        setData(processedData);
      })
      .catch(err => {
        console.error("Failed to load music data", err);
      });

    // Load Last.fm data
    const loadLastfmData = fetch(`${import.meta.env.BASE_URL}data/lastfm.json`)
      .then(res => res.json())
      .then(json => {
        // Process artist image URLs - add base path for relative URLs
        const processUrl = (url: string) => url.startsWith('http') ? url : `${import.meta.env.BASE_URL}${url}`;
        const processedData = {
          ...json,
          artists: json.artists.map((artist: any) => ({
            ...artist,
            imageUrl: processUrl(artist.imageUrl)
          }))
        };
        setLastfmData(processedData);
      })
      .catch(err => {
        console.warn("Last.fm data not available yet. Run 'npm run fetch:lastfm' to fetch it.", err);
      });

    Promise.all([loadMusicData, loadLastfmData]).finally(() => {
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">Loading Music Archive...</div>;
  }

  const { topArtists, tracks, playlists } = data;

  const englishTracks = tracks.english || [];
  const banglaTracks = tracks.bangla || [];
  const japaneseTracks = tracks.japanese || [];
  const hindiUrduTracks = tracks.hindiUrdu || [];
  const otherTracks = tracks.other || [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pb-10 fade-in flex flex-col">
      {/* 1. Header */}
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-sm h-16 shrink-0">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="p-1.5 rounded-full hover:bg-slate-800 transition-colors group"
            >
              <Home className="text-slate-400 group-hover:text-white" size={20} />
            </button>
            <h1 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-cyan-400" style={{ fontFamily: '"VT323", monospace' }}>
              MUSIC ARCHIVE
            </h1>
          </div>

          {/* Tab Navigation */}
          <nav className="flex gap-1 bg-slate-900 p-1 rounded-lg">
            {[
              { id: 'lastfm', label: 'Last.fm Stats', icon: Radio },
              { id: 'artists', label: 'Top Artists', icon: Mic2 },
              { id: 'tracks', label: 'Top Tracks', icon: Disc },
              { id: 'playlists', label: 'Playlists', icon: ListMusic },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-bold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-cyan-500 text-black shadow-lg' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <tab.icon size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* 2. Content Area */}
      <main className="container mx-auto px-4 py-8">
        
        {/* LAST.FM TAB */}
        {activeTab === 'lastfm' && (
          <div className="space-y-12">
            {!lastfmData ? (
              <div className="text-center py-20">
                <Radio className="mx-auto mb-4 text-slate-600" size={64} />
                <h3 className="text-2xl font-bold text-slate-400 mb-2">Last.fm Data Not Available</h3>
                <p className="text-slate-500 mb-4">
                  Run <code className="bg-slate-800 px-2 py-1 rounded text-cyan-400">npm run fetch:lastfm</code> to fetch your scrobble data.
                </p>
                <p className="text-xs text-slate-600">
                  You'll need to set up your LASTFM_API_KEY in a .env file first.
                </p>
              </div>
            ) : (
              <>
                {/* Last.fm Header */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-cyan-400 mb-2">Last.fm Stats</h2>
                  <p className="text-slate-400">
                    @{lastfmData.username} • Last updated: {new Date(lastfmData.fetchedAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Top Artists Section */}
                <section>
                  <h3 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                    <Mic2 size={24} />
                    Top 50 Artists
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {lastfmData.artists.map((artist, idx) => (
                      <div key={`${artist.name}-${idx}`} className="group relative bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-red-500/50 transition-all hover:-translate-y-1">
                        <div className="aspect-square relative overflow-hidden">
                          <img 
                            src={artist.imageUrl} 
                            alt={artist.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                          />
                          <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-red-500 text-white font-bold flex items-center justify-center text-sm shadow-lg">
                            #{idx + 1}
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold text-white truncate text-sm" title={artist.name}>
                            {artist.name}
                          </h4>
                          <p className="text-xs text-slate-400 mt-1">
                            {artist.playcount.toLocaleString()} scrobbles
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Top Tracks Section */}
                <section>
                  <h3 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                    <Disc size={24} />
                    Top 250 Tracks
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {lastfmData.tracks.map((track, idx) => (
                      <div key={`${track.name}-${track.artist}-${idx}`} className="group bg-slate-900 rounded-lg overflow-hidden border border-slate-800 hover:border-red-500/50 transition-all hover:-translate-y-1">
                        <div className="flex gap-3 p-3">
                          <div className="relative shrink-0">
                            <img 
                              src={track.imageUrl} 
                              alt={`${track.name} by ${track.artist}`} 
                              className="w-20 h-20 rounded object-cover group-hover:scale-105 transition-transform" 
                            />
                            <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-red-500 text-white font-bold flex items-center justify-center text-xs shadow-lg">
                              {idx + 1}
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-bold text-white text-sm truncate leading-tight group-hover:text-cyan-400 transition-colors" title={track.name}>
                              {track.name}
                            </h4>
                            <p className="text-xs text-slate-400 truncate mt-0.5" title={track.artist}>
                              {track.artist}
                            </p>
                            <p className="text-[10px] text-slate-500 uppercase tracking-wider truncate mt-1" title={track.album}>
                              <span className="text-slate-600">Album: </span>
                              {track.album}
                            </p>
                            <div className="mt-2 flex items-center gap-1 text-xs">
                              <Radio size={12} className="text-red-400" />
                              <span className="text-red-400 font-bold">{track.playcount.toLocaleString()}</span>
                              <span className="text-slate-500">plays</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}
          </div>
        )}
        
        {/* ARTISTS TAB */}
        {activeTab === 'artists' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {topArtists.map((artist) => (
              <div key={artist.rank} className="group relative bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-cyan-500/50 transition-all hover:-translate-y-1">
                <div className="aspect-square relative overflow-hidden">
                  <img src={artist.imageUrl} alt={artist.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-cyan-500 text-black font-bold flex items-center justify-center text-sm shadow-lg">
                    #{artist.rank}
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-white truncate" title={artist.name}>{artist.name}</h3>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TRACKS TAB - 5 Columns */}
        {activeTab === 'tracks' && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
            {[
               { title: 'English', data: englishTracks },
               { title: 'Bangla', data: banglaTracks },
               { title: 'Japanese', data: japaneseTracks },
               { title: 'Hindi/Urdu', data: hindiUrduTracks },
               { title: 'Other', data: otherTracks },
            ].map((col) => (
              <div key={col.title} className="min-w-[200px]">
                <h3 className="text-lg font-bold text-cyan-400 mb-2 border-b border-slate-800 pb-2">
                  {col.title}
                </h3>
                <div className="space-y-1">
                  {col.data.map((track, idx) => (
                    <div key={track.id} className="bg-slate-900/50 p-2 rounded-lg border border-slate-800 hover:border-cyan-500/30 transition-all group">
                      <div className="flex gap-2 mb-1">
                         <img src={track.imageUrl} alt={track.title} className="w-14 h-14 rounded object-cover shrink-0" />
                         <div className="min-w-0 flex flex-col justify-center">
                           <h4 className="font-bold text-white text-sm truncate leading-tight group-hover:text-cyan-400">{track.title}</h4>
                           <p className="text-xs text-slate-400 truncate">{track.artist}</p>
                         </div>
                      </div>
                      <div className="border-t border-slate-800 pt-1 mt-1">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider truncate">
                          <span className="text-slate-600 mr-1">ALBUM:</span> 
                          {track.album}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PLAYLISTS TAB */}
        {activeTab === 'playlists' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
             {playlists.map((playlist) => (
               <a 
                 key={playlist.id} 
                 href={playlist.url}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="group block relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500 transition-all hover:-translate-y-1"
               >
                 <div className="aspect-video relative overflow-hidden">
                   <img src={playlist.imageUrl} alt={playlist.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors" />
                   <div className="absolute bottom-3 left-3 bg-black/70 px-2 py-1 rounded text-xs text-cyan-400 font-bold uppercase tracking-wider">
                     {playlist.platform}
                   </div>
                 </div>
                 <div className="p-4">
                   <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{playlist.name}</h3>
                   <p className="text-sm text-slate-400 line-clamp-2">{playlist.description}</p>
                 </div>
               </a>
             ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MusicPage;
