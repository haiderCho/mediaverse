import React, { useState, useEffect } from 'react';
import { PageId, MediaEntry } from '../../types';
import { generateMockData, PAGE_THEMES } from '../../constants';
import { Home, Star } from 'lucide-react';
import Top10Card from '../../components/Top10Card';
import { dataService } from '../../services/dataService';
import CategoryOverview from '../../components/category/CategoryOverview';

interface DramaPageProps {
  onBack: () => void;
}

const DramaPage: React.FC<DramaPageProps> = ({ onBack }) => {
  const pageId = PageId.DRAMA;
  const theme = PAGE_THEMES[pageId];

  // State for content
  const [activeGenre, setActiveGenre] = useState<string>('OVERVIEW');
  const [entries, setEntries] = useState<MediaEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load data when genre changes
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      if (activeGenre === 'OVERVIEW') {
        setEntries([]);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const realData = await dataService.getGenreData(pageId, activeGenre);

        if (isMounted) {
          if (realData && realData.length > 0) {
            setEntries(realData);
          } else {
            // Fallback
            const fallback = generateMockData(pageId, activeGenre);
            setEntries(fallback.slice(0, 10));
          }
        }
      } catch (error) {
        console.error('Failed to load data', error);
        if (isMounted) {
          const fallback = generateMockData(pageId, activeGenre);
          setEntries(fallback.slice(0, 10));
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [pageId, activeGenre]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pb-10 fade-in flex flex-col">
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-sm h-16 shrink-0">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-1.5 rounded-full hover:bg-slate-800 transition-colors group"
            >
              <Home className="text-slate-400 group-hover:text-white" size={20} />
            </button>
            <div className="flex items-baseline gap-2">
              <h1
                className="text-xl md:text-2xl font-bold uppercase tracking-wider truncate"
                style={{ fontFamily: theme.fontFamily, color: theme.accentColorDark }}
              >
                {theme.title}
              </h1>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest hidden sm:block">
                Drama
              </span>
            </div>
          </div>

          <nav className="flex-1 ml-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center justify-end gap-2 min-w-max px-2">
              <button
                onClick={() => setActiveGenre('OVERVIEW')}
                className={`
                  flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition-all duration-300 border
                  ${activeGenre === 'OVERVIEW' ? 'text-black' : 'bg-transparent text-slate-500 border-transparent hover:text-slate-300 hover:bg-slate-800/50'}
                `}
                style={activeGenre === 'OVERVIEW' ? { backgroundColor: theme.accentColorDark, color: '#000', borderColor: theme.accentColorDark } : {}}
              >
                <Star size={14} fill={activeGenre === 'OVERVIEW' ? 'currentColor' : 'none'} />
                Overview
              </button>
              <div className="h-4 w-[1px] bg-slate-800 mx-1" />
              {theme.genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setActiveGenre(genre)}
                  className={`
                    px-3 py-1 rounded text-xs font-semibold transition-all duration-300 border
                    ${
                      activeGenre === genre
                        ? `bg-[${theme.accentColorDark}] text-black border-[${theme.accentColorDark}]`
                        : 'bg-transparent text-slate-500 border-transparent hover:text-slate-300'
                    }
                  `}
                  style={
                    activeGenre === genre
                      ? { backgroundColor: theme.accentColorDark, color: '#000' }
                      : {}
                  }
                >
                  {genre}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {activeGenre !== 'OVERVIEW' && (
      <div
        className="w-full h-64 md:h-80 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${theme.accentColorDark}15 0%, ${theme.accentColorLight}10 100%)`,
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, ${theme.accentColorDark} 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="absolute inset-0 z-0">
          <img
            src={`${import.meta.env.BASE_URL}assets/hero_drama.jpg`}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
            alt="Drama Hero"
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
        </div>

        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center relative z-10">
          <div
            className="mb-4 px-6 py-2 rounded-full border-2 inline-block"
            style={{
              borderColor: theme.accentColorDark,
              backgroundColor: `${theme.accentColorDark}20`,
            }}
          >
            <span
              className="text-sm font-bold uppercase tracking-wider"
              style={{ color: theme.accentColorDark }}
            >
              {activeGenre}
            </span>
          </div>

          <h2
            className="text-4xl md:text-6xl font-black mb-3 drop-shadow-lg"
            style={{
              fontFamily: theme.fontFamily,
              background: `linear-gradient(135deg, ${theme.accentColorDark}, ${theme.accentColorLight})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Top 10
          </h2>
        </div>
      </div>
      )}

      <main className={`container mx-auto px-4 relative z-20 flex-1 flex flex-col ${activeGenre !== 'OVERVIEW' ? '-mt-8' : 'pt-8'}`}>
        {activeGenre === 'OVERVIEW' ? (
          <CategoryOverview pageId={pageId} theme={theme} />
        ) : entries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {entries.map((entry, index) => (
              <Top10Card 
                key={entry.id} 
                entry={entry} 
                rank={index + 1} 
                pageId={pageId} 
              />
            ))}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-500 py-20">
            No entries found for this genre.
          </div>
        )}
      </main>
    </div>
  );
};

export default DramaPage;
