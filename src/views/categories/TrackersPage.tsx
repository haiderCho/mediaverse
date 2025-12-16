import React from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { 
  SiMyanimelist, 
  SiImdb, 
  SiLastdotfm, 
  SiGoodreads, 
  SiLetterboxd, 
  SiAnilist
} from 'react-icons/si';
import { FaBookOpen, FaTv, FaGamepad } from 'react-icons/fa';

interface TrackersPageProps {
  onBack: () => void;
}

const TrackersPage: React.FC<TrackersPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white fade-in">
      <button onClick={onBack} className="absolute top-8 left-8 p-2 bg-slate-800 rounded-full hover:bg-slate-700">
        <ArrowLeft />
      </button>
      <h1 className="text-4xl font-bold mb-12 text-red-600" style={{fontFamily: 'Poppins'}}>EXTERNAL TRACKERS</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { name: 'MyAnimeList', url: 'https://myanimelist.net/profile/NafizHC', icon: <SiMyanimelist size={24} color="#2E51A2" /> },
            { name: 'IMDb', url: 'https://www.imdb.com/user/ur41966547/', icon: <SiImdb size={24} color="#F5C518" /> },
            { name: 'Last.fm', url: 'https://www.last.fm/user/NafizHC', icon: <SiLastdotfm size={24} color="#D51007" /> },
            { name: 'GoodReads', url: 'http://goodreads.com/nafizhc', icon: <SiGoodreads size={24} color="#372213" /> },
            { name: 'Letterboxd', url: 'https://letterboxd.com/NafizHC/', icon: <SiLetterboxd size={24} color="#20BC79" /> },
            { name: 'AniList', url: 'https://anilist.co/user/NafizHC/', icon: <SiAnilist size={24} color="#02A9FF" /> },
            { name: 'Backloggd', url: 'https://backloggd.com/u/NafizHC/', icon: <FaGamepad size={24} className="text-white" /> },
            { name: 'Comic Geeks', url: 'https://leagueofcomicgeeks.com/profile/nafizhc/read-list', icon: <FaBookOpen size={24} className="text-green-500" /> },
            { name: 'Serializd', url: 'https://www.serializd.com/user/NafizHC', icon: <FaTv size={24} className="text-purple-500" /> }
          ].map(tracker => (
              <a 
                href={tracker.url} 
                key={tracker.name} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-64 p-4 bg-slate-900 border border-slate-700 rounded hover:border-red-600 hover:text-red-500 transition-all group"
              >
                  <div className="flex items-center gap-3">
                    {tracker.icon}
                    <span className="font-bold">{tracker.name}</span>
                  </div>
                  <ExternalLink size={16} />
              </a>
          ))}
      </div>
    </div>
  );
};

export default TrackersPage;
