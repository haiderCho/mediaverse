import React from 'react';
import { PageId, ThemeConfig } from '../../../types';
import { CinematicStat } from './types';
import { Star, Clock, Film, Tv, BarChart, Calendar } from 'lucide-react';

interface CinematicStatsViewProps {
  stats: CinematicStat;
  pageId: PageId;
  theme: ThemeConfig;
}

const CinematicStatsView: React.FC<CinematicStatsViewProps> = ({ stats, pageId, theme }) => {
  const isTv = pageId === PageId.TV_SERIES;
  const accentColor = isTv ? '#E50914' : '#f5c518';
  const label = isTv ? 'SERIALIZD' : 'LETTERBOXD';

  // Sort decades descending
  const sortedDecades = [...stats.decades].sort((a, b) => b.decade.localeCompare(a.decade));
  const maxDecadeCount = Math.max(...stats.decades.map(d => d.count));
  const maxRatingCount = Math.max(...stats.ratingsDistribution.map(r => r.count));

  return (
    <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. KPI Row (Combined IMDb/Letterboxd Style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#1a1a1a] border border-slate-800 p-6 flex flex-col items-center justify-center text-center shadow-lg">
           <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-4 text-slate-400">
              {isTv ? <Tv size={24} /> : <Film size={24} />}
           </div>
           <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1">TOTAL {isTv ? 'SHOWS' : 'FILMS'}</span>
           <span className="text-4xl font-black text-white tracking-tighter">{stats.totalTitles.toLocaleString()}</span>
        </div>

        <div className="bg-[#1a1a1a] border border-slate-800 p-6 flex flex-col items-center justify-center text-center shadow-lg scale-105 z-10 border-t-4" style={{ borderColor: accentColor }}>
           <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-4" style={{ color: accentColor }}>
              <Star size={24} fill="currentColor" />
           </div>
           <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1">CUMULATIVE RATING</span>
           <span className="text-4xl font-black text-white tracking-tighter">{stats.averageRating.toFixed(2)}</span>
           <span className="text-[10px] font-bold text-slate-600 mt-1 uppercase">OUT OF 10.0</span>
        </div>

        <div className="bg-[#1a1a1a] border border-slate-800 p-6 flex flex-col items-center justify-center text-center shadow-lg">
           <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-4 text-slate-400">
              <Clock size={24} />
           </div>
           <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1">TIME INVESTED</span>
           <span className="text-4xl font-black text-white tracking-tighter">{stats.totalRuntime || 'Unknown'}</span>
        </div>
      </div>

      {/* 2. Main Distribution Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* IMDb Star Distribution (1-10) */}
        <div className="bg-[#141414] border border-slate-800 p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Star size={120} strokeWidth={1} />
            </div>
            
            <div className="flex items-center gap-3 mb-8">
               <div className="w-10 h-10 bg-[#f5c518] flex items-center justify-center text-black font-black italic">IMDb</div>
               <div>
                  <h3 className="text-xl font-black uppercase tracking-tighter text-white">Ratings Distribution</h3>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Global 10-Star Accuracy</p>
               </div>
            </div>

            <div className="flex flex-col gap-2 relative z-10">
                {[...stats.ratingsDistribution].reverse().map((r) => (
                    <div key={r.score} className="flex items-center gap-4 group">
                        <span className="w-4 text-[10px] font-black text-slate-500">{r.score}</span>
                        <div className="flex-1 h-3 bg-slate-900 rounded-sm overflow-hidden border border-slate-800/50">
                            <div 
                                className="h-full bg-[#f5c518] transition-all duration-1000 ease-out group-hover:brightness-125" 
                                style={{ width: `${(r.count / maxRatingCount) * 100}%` }} 
                            />
                        </div>
                        <span className="w-8 text-[10px] font-bold text-slate-400 text-right">{r.count}</span>
                    </div>
                ))}
            </div>
            <div className="mt-6 flex justify-between items-end border-t border-slate-800 pt-4">
               <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest">DISTRIBUTION BIAS: POSITIVE</div>
               <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest">N=10</div>
            </div>
        </div>

        {/* Letterboxd/Serializd Decade Breakdown */}
        <div className="bg-[#141414] border border-slate-800 p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Calendar size={120} strokeWidth={1} />
            </div>

            <div className="flex items-center gap-3 mb-8">
               <div className="w-10 h-10 bg-slate-800 flex items-center justify-center text-white" style={{ backgroundColor: accentColor }}>
                  {isTv ? <Tv size={20} /> : <Film size={20} />}
               </div>
               <div>
                  <h3 className="text-xl font-black uppercase tracking-tighter text-white">{label} Insights</h3>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Release Era Coverage</p>
               </div>
            </div>

            <div className="flex flex-col gap-3 relative z-10">
                {sortedDecades.map((d) => (
                    <div key={d.decade} className="flex items-center gap-4 group">
                        <span className="w-12 text-[10px] font-black text-slate-400 whitespace-nowrap">{d.decade}s</span>
                        <div className="flex-1 h-2 bg-slate-900 rounded-full overflow-hidden">
                             <div 
                                className="h-full transition-all duration-1000 ease-out group-hover:brightness-125" 
                                style={{ 
                                    width: `${(d.count / maxDecadeCount) * 100}%`,
                                    backgroundColor: accentColor 
                                }} 
                            />
                        </div>
                        <span className="w-8 text-[10px] font-bold text-slate-500 text-right">{d.count}</span>
                    </div>
                ))}
            </div>
            
            <div className="mt-8 flex items-center gap-4 opacity-30 grayscale hover:grayscale-0 transition-all cursor-default">
               <span className="text-[9px] font-black uppercase tracking-widest">Personal Archives</span>
               <div className="h-[1px] flex-1 bg-slate-800" />
               <span className="text-[9px] font-black uppercase tracking-widest">Verified Collector</span>
            </div>
        </div>
      </div>

      {/* 3. Genre Heatmap & Milestones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#1a1a1a] border border-slate-800 p-6 flex flex-col">
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6 border-b border-slate-800 pb-2">TOP GENRE AFFINITY</h4>
              <div className="flex flex-wrap gap-2">
                  {stats.topGenres.map((g, i) => (
                      <div key={g.name} className="flex items-center border border-slate-800 bg-black px-4 py-2 hover:border-slate-500 transition-colors cursor-default">
                          <span className="text-[9px] font-black text-slate-600 mr-2">#{i+1}</span>
                          <span className="text-xs font-black text-white uppercase tracking-tighter">{g.name}</span>
                          <span className="ml-3 text-[10px] font-bold text-slate-500">{g.count}</span>
                      </div>
                  ))}
              </div>
          </div>

          <div className="bg-[#1a1a1a] border border-slate-800 p-6 flex flex-col">
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6 border-b border-slate-800 pb-2">COLLECTION MILESTONES</h4>
              <div className="space-y-4">
                  {stats.recentMilestones?.map((m) => (
                      <div key={m.label} className="flex justify-between items-center group">
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-300 transition-colors">{m.label}</span>
                          <span className="text-sm font-black text-white tracking-tight border-b-2" style={{ borderColor: accentColor }}>{m.value}</span>
                      </div>
                  ))}
              </div>
          </div>
      </div>

    </div>
  );
};

export default CinematicStatsView;
