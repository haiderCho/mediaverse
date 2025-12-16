import React, { useState, useEffect } from 'react';
import LandingPage from './views/LandingPage';
import CategoryPage from './views/CategoryPage';
import ProfilePage from './views/ProfilePage';
import { PageId } from './types';
import { PAGE_THEMES } from './constants';
import { ArrowLeft } from 'lucide-react';

// Specific Category Pages
import MusicPage from './views/categories/MusicPage';
import ComicPage from './views/categories/ComicPage';
import BookPage from './views/categories/BookPage';
import LightNovelPage from './views/categories/LightNovelPage';
import AnimeSeriesPage from './views/categories/AnimeSeriesPage';
import AnimeMoviesPage from './views/categories/AnimeMoviesPage';
import MangaPage from './views/categories/MangaPage';
import ManhwaPage from './views/categories/ManhwaPage';
import ManhuaPage from './views/categories/ManhuaPage';
import GamesPage from './views/categories/GamesPage';
import MoviesPage from './views/categories/MoviesPage';
import TvSeriesPage from './views/categories/TvSeriesPage';
import DramaPage from './views/categories/DramaPage';
import TrackersPage from './views/categories/TrackersPage';

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

  if (activePage === PageId.ANIME_SERIES) return <AnimeSeriesPage onBack={handleBack} />;
  if (activePage === PageId.ANIME_MOVIES) return <AnimeMoviesPage onBack={handleBack} />;
  if (activePage === PageId.MANGA) return <MangaPage onBack={handleBack} />;
  if (activePage === PageId.MANHWA) return <ManhwaPage onBack={handleBack} />;
  if (activePage === PageId.MANHUA) return <ManhuaPage onBack={handleBack} />;
  if (activePage === PageId.GAMES) return <GamesPage onBack={handleBack} />;
  if (activePage === PageId.MOVIES) return <MoviesPage onBack={handleBack} />;
  if (activePage === PageId.TV_SERIES) return <TvSeriesPage onBack={handleBack} />;
  if (activePage === PageId.DRAMA) return <DramaPage onBack={handleBack} />;

  /**
   * Render the Trackers page with external links
   */
  if (activePage === PageId.TRACKERS) {
    return <TrackersPage onBack={handleBack} />;
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
