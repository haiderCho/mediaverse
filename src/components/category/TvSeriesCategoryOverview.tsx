import React from 'react';
import { PageId, ThemeConfig } from '../../types';
import { CATEGORY_LANDING_DATA } from '../../config/categoryLandingData';
import { Star, Tv, Award, TrendingUp, Zap } from 'lucide-react';

interface CategoryOverviewProps {
  pageId: PageId;
  theme: ThemeConfig;
}

const TvSeriesCategoryOverview: React.FC<CategoryOverviewProps> = ({ pageId, theme }) => {
  const data = CATEGORY_LANDING_DATA[pageId] || {
    title: `Television Saga`,
    description: `From episodic adventures to complex serialised narratives, this is a record of the shows that defined seasons of my life.`,
    preferences: ["Character Arcs", "World Building", "Pacing & Payoff"],
    signatureDetail: "INDEX: SEASONAL // SOURCE: TVDB_SYNC"
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-10 px-4 animate-in fade-in duration-700">
      <div className="max-w-5xl w-full">
        {/* Netflix Styled Premium Header */}
        <div className="relative mb-16 rounded-3xl overflow-hidden border border-white/5 shadow-2xl group bg-slate-900">
           {/* Backdrop Glow */}
           <div 
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[120px] opacity-10 animate-pulse"
            style={{ backgroundColor: theme.accentColorDark }}
          />

          <div className="relative z-10 px-8 py-16 md:px-16 flex flex-col md:flex-row items-center gap-12 bg-slate-950/60 backdrop-blur-3xl">
            {/* Visual Anchor */}
            <div className="relative shrink-0">
               <div className="w-40 h-40 bg-black rounded-2xl border border-red-500/30 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group-hover:border-red-500/60 transition-colors">
                  <div className="absolute top-0 left-0 w-full h-1 bg-red-600" />
                  <Tv size={60} className="text-red-600 mb-2" />
                  <span className="text-white font-black text-2xl tracking-tighter" style={{ fontFamily: theme.fontFamily }}>STREAM</span>
               </div>
               <div className="absolute -bottom-4 right-0 bg-red-600 text-white px-3 py-1 font-black text-xs rounded shadow-lg transform -rotate-3">
                  TOP RATED
               </div>
            </div>

            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <span className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] border border-red-500/30 text-red-500 bg-red-500/10">
                  <Award size={10} className="inline mr-1 -mt-0.5" /> Golden Globe Std
                </span>
                <span className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] border border-slate-800 text-slate-400 bg-slate-900/50">
                  Top 10 Lists
                </span>
              </div>

              <div className="space-y-2">
                <h2 
                    className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase"
                    style={{ fontFamily: theme.fontFamily }}
                >
                    {data.title}
                </h2>
                <div className="h-1.5 w-32 bg-red-600 rounded-full md:mx-0 mx-auto" />
              </div>
              
              <p className="text-slate-300 text-lg md:text-2xl leading-relaxed max-w-2xl font-medium opacity-80">
                "{data.description}"
              </p>
            </div>
          </div>
        </div>

        {/* Info Modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {data.preferences.map((pref, idx) => (
            <div 
              key={idx}
              className="p-8 rounded-2xl border border-slate-800/50 bg-slate-900/40 hover:bg-slate-800/60 transition-all group flex flex-col items-center text-center gap-4"
            >
               <div className="p-3 rounded-full bg-slate-800 text-red-500 group-hover:scale-110 transition-transform">
                  <Star size={24} fill="currentColor" />
               </div>
               <h4 className="text-white font-bold text-lg">{pref}</h4>
               <p className="text-slate-500 text-sm">Vital metric for the serialization of this archive.</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-800/50 pt-10">
          <div className="flex items-center gap-4 text-slate-500 font-mono text-xs uppercase tracking-[0.3em]">
             <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
             {data.signatureDetail}
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-sm font-bold uppercase tracking-widest italic opacity-50">
             Explore Genres for Top 10 Picks <Zap size={14} fill="currentColor" className="text-yellow-500 ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TvSeriesCategoryOverview;
