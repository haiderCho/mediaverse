import React, { useState, useEffect } from 'react';
import LandingPage from './views/LandingPage';
import CategoryPage from './views/CategoryPage';
import ProfilePage from './views/ProfilePage';
import { PageId } from './types';
import { PAGE_THEMES } from './constants';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { 
  SiMyanimelist, 
  SiImdb, 
  SiLastdotfm, 
  SiGoodreads, 
  SiLetterboxd, 
  SiAnilist, 
  // SiBackloggd, // Not available
  // SiLeagueoflegends, 
  // SiSonyliv 
} from 'react-icons/si';
import { FaBookOpen, FaTv, FaGamepad } from 'react-icons/fa'; // Fallbacks
import MusicPage from './views/categories/MusicPage';
import ComicPage from './views/categories/ComicPage';
import BookPage from './views/categories/BookPage';
import LightNovelPage from './views/categories/LightNovelPage';

/**
 * Get the page ID from the URL hash
 */
const getPageFromHash = (): PageId => {
  const hash = window.location.hash.slice(1); // Remove the '#'
  // Check if the hash matches a valid PageId
  if (Object.values(PageId).includes(hash as PageId)) {
    return hash as PageId;
  }
  return PageId.HOME;
};

/**
 * Main application component that manages navigation between different pages
 * Implements hash-based routing that persists across page refreshes
 */
function App() {
  const [activePage, setActivePage] = useState<PageId>(getPageFromHash());

  /**
   * Sync state with URL hash on browser navigation (back/forward buttons)
   */
  useEffect(() => {
    const handleHashChange = () => {
      setActivePage(getPageFromHash());
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  /**
   * Navigate to a specific page and scroll to top
   */
  const handleNavigate = (id: PageId) => {
    window.location.hash = id;
    setActivePage(id);
    window.scrollTo(0, 0);
  };

  /**
   * Return to the home page
   */
  const handleBack = () => {
    window.location.hash = PageId.HOME;
    setActivePage(PageId.HOME);
  };

  // --- SPECIFIC PAGE ROUTING ---

  if (activePage === PageId.HOME) return <LandingPage onNavigate={handleNavigate} />;
  if (activePage === PageId.PROFILE) return <ProfilePage onBack={handleBack} />;
  
  if (activePage === PageId.MUSIC) return <MusicPage onBack={handleBack} onNavigate={handleNavigate} />;
  
  if (activePage === PageId.COMIC) return <ComicPage onBack={handleBack} />;
  if (activePage === PageId.BOOKS) return <BookPage onBack={handleBack} />;
  if (activePage === PageId.LIGHT_NOVEL) return <LightNovelPage onBack={handleBack} />;

  /**
   * Render the Trackers page with external links
   */
  if (activePage === PageId.TRACKERS) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white fade-in">
        <button onClick={handleBack} className="absolute top-8 left-8 p-2 bg-slate-800 rounded-full hover:bg-slate-700">
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
              { name: 'Backloggd', url: 'https://backloggd.com/u/NafizHC/', icon: <FaGamepad size={24} className="text-white" /> }, // Backloggd often white/dark
              { name: 'Comic Geeks', url: 'https://leagueofcomicgeeks.com/profile/nafizhc/read-list', icon: <FaBookOpen size={24} className="text-green-500" /> }, // Generic book for Comic Geeks
              { name: 'Serializd', url: 'https://www.serializd.com/user/NafizHC', icon: <FaTv size={24} className="text-purple-500" /> } // Generic TV for Serializd
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
  }

  // Fallback for other categories to generic page
  return (
    <CategoryPage 
      pageId={activePage} 
      onBack={handleBack} 
    />
  );
}
console.log("MediaVerse Version: Music Update 1.1");
export default App;
