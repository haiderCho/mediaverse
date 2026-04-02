import React from 'react';
import { PageId, ThemeConfig } from '../../types';
import { CATEGORY_LANDING_DATA } from '../../config/categoryLandingData';
import { Star, Scroll, Zap, Heart, List } from 'lucide-react';

interface CategoryOverviewProps {
  pageId: PageId;
  theme: ThemeConfig;
}

const ManhwaCategoryOverview: React.FC<CategoryOverviewProps> = ({ pageId, theme }) => {
  const data = CATEGORY_LANDING_DATA[pageId] || {
    title: `${theme.title} Overview`,
    description: `Welcome to my ${theme.title} collection. Exploring my favorite entries and specific tastes in this category.`,
    preferences: ["Quality storytelling", "Exceptional art direction", "Emotional resonance"],
    signatureDetail: "STATUS: INITIALIZED // DATA_SOURCE: LOCAL"
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-10 px-4 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="max-w-5xl w-full">
        {/* Webtoon Archive Header */}
        <div className="relative mb-16 rounded-3xl overflow-hidden border border-white/5 shadow-2xl group">
          <div className="absolute inset-0 bg-slate-900 z-0" />
          
          {/* Animated Gradient Background */}
          <div 
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[120px] opacity-10 animate-pulse"
            style={{ backgroundColor: theme.accentColorDark }}
          />
          <div 
            className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full blur-[120px] opacity-10 animate-pulse"
            style={{ backgroundColor: theme.accentColorLight }}
          />

          <div className="relative z-10 px-8 py-16 md:px-16 flex flex-col md:flex-row items-center gap-12 bg-slate-950/40 backdrop-blur-3xl">
            {/* Visual Anchor - Floating Scroll/Rank */}
            <div className="relative shrink-0 hidden lg:block">
              <div 
                className="w-40 h-40 bg-slate-900 rounded-3xl border border-white/10 shadow-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-500 overflow-hidden"
                style={{ borderColor: `${theme.accentColorDark}40` }}
              >
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(${theme.accentColorDark} 1px, transparent 1px)`, backgroundSize: '10px 10px' }} />
                <Scroll size={80} style={{ color: theme.accentColorDark }} className="relative z-10" />
              </div>
              <div 
                className="absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center font-black text-xs border border-white/20 shadow-lg text-white"
                style={{ backgroundColor: theme.accentColorDark }}
              >
                10
              </div>
            </div>

            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <span 
                    className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] border"
                    style={{ borderColor: `${theme.accentColorDark}30`, color: theme.accentColorDark, backgroundColor: `${theme.accentColorDark}05` }}
                >
                  <List size={10} className="inline mr-1 -mt-0.5" /> Curated Archive
                </span>
                <span 
                    className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] border border-slate-800 text-slate-400 bg-slate-900/50"
                >
                  <Heart size={10} className="inline mr-1 -mt-0.5" fill="currentColor" /> Top 10 Picks
                </span>
              </div>

              <div className="space-y-2">
                <h2 
                    className="text-5xl md:text-8xl font-black tracking-tighter transition-all duration-300 group-hover:tracking-tight"
                    style={{ fontFamily: theme.fontFamily, color: '#f8fafc' }}
                >
                    {data.title.split(' ')[0]} 
                    <span style={{ color: theme.accentColorDark }}> {data.title.split(' ')[1] || ''}</span>
                </h2>
                <div className="h-1 w-20 bg-slate-800 rounded-full md:mx-0 mx-auto" style={{ backgroundColor: `${theme.accentColorDark}40` }} />
              </div>
              
              <p className="text-slate-400 text-lg md:text-2xl leading-relaxed max-w-2xl font-medium italic">
                "{data.description}"
              </p>

              <div className="pt-4 flex flex-wrap gap-4 items-center justify-center md:justify-start">
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold border-l-2 border-slate-800 pl-4 py-1">
                    INDEXED BY PERSONAL TASTE // STABLE_BUILD
                  </div>
              </div>
            </div>
          </div>
        </div>

        {/* List Preference Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {data.preferences.map((pref, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl border border-slate-800/50 bg-slate-900/30 hover:bg-slate-800/50 transition-all group flex flex-col gap-4"
            >
               <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${theme.accentColorDark}15`, color: theme.accentColorDark }}
              >
                <Zap size={16} fill={theme.accentColorDark} />
              </div>

              <p className="text-slate-300 font-bold text-sm tracking-tight leading-snug group-hover:text-white transition-colors">
                {pref}
              </p>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-800/50 pt-10 px-4">
          <div className="flex items-center gap-4">
             <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: theme.accentColorDark }} />
             <span className="text-[9px] font-mono font-bold text-slate-500 tracking-[0.3em] uppercase">
                {data.signatureDetail}
             </span>
          </div>
          
          <div className="text-[10px] font-mono tracking-tighter text-slate-600 italic">
            &lt;scrolling_vertical_archive_module&gt;
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManhwaCategoryOverview;
