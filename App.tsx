import React, { useState } from 'react';
import LandingPage from './views/LandingPage';
import CategoryPage from './views/CategoryPage';
import ProfilePage from './views/ProfilePage';
import { PageId } from './types';
import { PAGE_THEMES } from './constants';
import { ArrowLeft, ExternalLink } from 'lucide-react';

/**
 * Main application component that manages navigation between different pages
 * Implements a simple routing system using React state
 */
function App() {
  const [activePage, setActivePage] = useState<PageId>(PageId.HOME);

  /**
   * Navigate to a specific page and scroll to top
   */
  const handleNavigate = (id: PageId) => {
    setActivePage(id);
    window.scrollTo(0, 0);
  };

  /**
   * Return to the home page
   */
  const handleBack = () => {
    setActivePage(PageId.HOME);
  };

  /**
   * Render the home page
   */
  
  if (activePage === PageId.HOME) {
    return <LandingPage onNavigate={handleNavigate} />;
  }

  /**
   * Render the Profile page with user information
   */
  if (activePage === PageId.PROFILE) {
    return <ProfilePage onBack={handleBack} />;
  }

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
            {['MyAnimeList', 'IMDb', 'GoodReads', 'Steam', 'VNDB', 'AniList'].map(tracker => (
                <a href="#" key={tracker} className="flex items-center justify-between w-64 p-4 bg-slate-900 border border-slate-700 rounded hover:border-red-600 hover:text-red-500 transition-all group">
                    <span className="font-bold">{tracker}</span>
                    <ExternalLink size={16} />
                </a>
            ))}
        </div>
      </div>
    );
  }

  /**
   * Render generic category pages for all media types
   */
  return (
    <CategoryPage 
      pageId={activePage} 
      onBack={handleBack} 
    />
  );
}

export default App;
