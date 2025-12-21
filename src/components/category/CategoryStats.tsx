import React from 'react';
import { PageId, ThemeConfig } from '../../types';
import { BarChart3 } from 'lucide-react';

// Modules
import { useStatsData } from './stats/useStatsData';
import { StatsKPIs } from './stats/StatsKPIs';
import { StatusChart } from './stats/StatusChart';
import { ChartsRow, TimeAndFavorites } from './stats/DetailedCharts';

interface CategoryStatsProps {
  pageId: PageId;
  theme: ThemeConfig;
}

const CategoryStats: React.FC<CategoryStatsProps> = ({ pageId, theme }) => {
  const { stats, dataSource, setDataSource, loading, currentData } = useStatsData(pageId);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 animate-pulse">
        <div className="text-slate-500 font-mono text-sm">LOADING STATS DATA...</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <BarChart3 size={48} className="text-slate-700 mb-4" />
        <h3 className="text-xl font-bold text-slate-400 mb-2">No Statistics Available</h3>
        <p className="text-slate-500 max-w-md mb-6">
          Stats data hasn't been generated for this category yet or could not be loaded.
        </p>
        <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-full">
            <button key="ani" onClick={() => setDataSource('ANILIST')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${dataSource === 'ANILIST' ? 'bg-blue-500 text-white' : 'text-slate-500'}`}>AniList</button>
            <button key="mal" onClick={() => setDataSource('MAL')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${dataSource === 'MAL' ? 'bg-[#2e51a2] text-white' : 'text-slate-500'}`}>MyAnimeList</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-10 px-4 animate-in fade-in duration-700">
      <div className="max-w-7xl w-full">
        {/* Header */}
        <div className="mb-10 text-center relative">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4" style={{ fontFamily: theme.fontFamily, color: theme.accentColorDark }}>
              Collection Analysis
            </h2>
            
            {/* Toggle Controls */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
                <div className="flex bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-1 rounded-full shadow-xl">
                    <button
                        onClick={() => setDataSource('ANILIST')}
                        className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all ${dataSource === 'ANILIST' ? 'bg-blue-600 text-white shadow-lg scale-105' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        AniList
                    </button>
                    <button
                        onClick={() => setDataSource('MAL')}
                        className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all ${dataSource === 'MAL' ? 'bg-[#2e51a2] text-white shadow-lg scale-105' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        MyAnimeList
                    </button>
                </div>
            </div>

            {/* User Meta */}
            <div className="flex items-center justify-center gap-3 text-slate-500 font-mono text-xs uppercase tracking-widest">
                <span className="flex items-center gap-2">
                    {currentData?.avatar && <img src={currentData.avatar} alt="Avatar" className="w-5 h-5 rounded-full" />}
                    User: {currentData?.username}
                </span>
                <span>•</span>
                 <span>Updated: {currentData?.fetchedAt ? new Date(currentData.fetchedAt).toLocaleDateString() : 'Unknown'}</span>
            </div>
        </div>

        {/* 1. Key Performance Indicators */}
        <StatsKPIs stats={stats} theme={theme} dataSource={dataSource} />

        {/* 2. Charts Row: Status vs Time Investment */}
        <div className="grid grid-cols-1 gap-8 mb-8 lg:grid-cols-2">
            <StatusChart stats={stats} />
            <TimeAndFavorites stats={stats} theme={theme} />
        </div>

        {/* 3. Detailed Breakdown: Genres & Formats */}
        <ChartsRow stats={stats} theme={theme} pageId={pageId} />
      </div>
    </div>
  );
};

export default CategoryStats;
