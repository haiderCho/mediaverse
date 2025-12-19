import React from 'react';
import { PageId, ThemeConfig } from '../../types';
import { CATEGORY_LANDING_DATA } from '../../config/categoryLandingData';
import { Star, ArrowRight } from 'lucide-react';

interface CategoryOverviewProps {
  pageId: PageId;
  theme: ThemeConfig;
}

const CategoryOverview: React.FC<CategoryOverviewProps> = ({ pageId, theme }) => {
  const data = CATEGORY_LANDING_DATA[pageId] || {
    title: `${theme.title} Overview`,
    description: `Welcome to my ${theme.title} collection. Exploring my favorite entries and specific tastes in this category.`,
    preferences: ["Quality storytelling", "Exceptional art direction", "Emotional resonance"],
    signatureDetail: "STATUS: INITIALIZED // DATA_SOURCE: LOCAL"
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-10 px-4 animate-in fade-in duration-700">
      <div className="max-w-4xl w-full">
        {/* Hero Section */}
        <div className="relative mb-12 group">
          <div 
            className="absolute -inset-1 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"
            style={{ backgroundColor: theme.accentColorDark }}
          ></div>
          <div className="relative px-8 py-10 bg-slate-900 ring-1 ring-slate-800 rounded-2xl leading-none flex flex-col md:flex-row items-center gap-8">
            <div 
              className="p-4 rounded-xl bg-slate-800/50 flex items-center justify-center shrink-0 shadow-2xl"
              style={{ border: `1px solid ${theme.accentColorDark}40` }}
            >
              <theme.icon size={48} style={{ color: theme.accentColorDark }} />
            </div>
            <div className="space-y-4 text-center md:text-left">
              <h2 
                className="text-3xl md:text-5xl font-black uppercase tracking-tighter"
                style={{ fontFamily: theme.fontFamily, color: theme.accentColorDark }}
              >
                {data.title}
              </h2>
              <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl">
                {data.description}
              </p>
            </div>
          </div>
        </div>

        {/* Preferences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {data.preferences.map((pref, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-800/60 transition-all group flex items-start gap-4"
            >
              <div 
                className="mt-1 p-1 rounded-full shrink-0 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `${theme.accentColorDark}20`, color: theme.accentColorDark }}
              >
                <Star size={14} fill={theme.accentColorDark} />
              </div>
              <p className="text-slate-300 font-medium">
                {pref}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-800/50 pt-8 mt-4">
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: theme.accentColorDark }} />
             <span className="text-[10px] font-mono font-bold text-slate-500 tracking-[0.2em] uppercase">
               {data.signatureDetail}
             </span>
          </div>
          
          <div className="flex items-center gap-2 text-slate-500 font-mono text-xs uppercase tracking-widest italic opacity-50">
            Select a genre to explore the archives
            <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryOverview;
