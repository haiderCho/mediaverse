import React from 'react';
import { PageId, ThemeConfig } from '../../types';
import { CATEGORY_LANDING_DATA } from '../../config/categoryLandingData';
import { Star, Shield, Zap, Sparkles, Database } from 'lucide-react';

interface CategoryOverviewProps {
  pageId: PageId;
  theme: ThemeConfig;
}

const ManhuaCategoryOverview: React.FC<CategoryOverviewProps> = ({ pageId, theme }) => {
  const data = CATEGORY_LANDING_DATA[pageId] || {
    title: `${theme.title} Overview`,
    description: `Welcome to my ${theme.title} collection. Exploring my favorite entries and specific tastes in this category.`,
    preferences: ["Quality storytelling", "Exceptional art direction", "Emotional resonance"],
    signatureDetail: "STATUS: INITIALIZED // DATA_SOURCE: LOCAL"
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-10 px-4 animate-in fade-in duration-700">
      <div className="max-w-5xl w-full">
        {/* Manhua Archive Header */}
        <div className="relative mb-16 group">
          {/* Cyber-Trad background */}
          <div className="absolute inset-0 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
             <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(${theme.accentColorDark} 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />
          </div>

          <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 bg-slate-950/20 backdrop-blur-sm">
            {/* Architectural Anchor */}
            <div className="relative shrink-0 hidden lg:block">
              <div 
                className="w-44 h-44 border-2 flex items-center justify-center relative transition-transform duration-700 group-hover:rotate-45"
                style={{ borderColor: theme.accentColorDark, backgroundColor: `${theme.accentColorDark}05` }}
              >
                 <div className="absolute inset-2 border border-dashed opacity-20" style={{ borderColor: theme.accentColorDark }} />
                 <Database size={72} style={{ color: theme.accentColorDark }} className="transition-transform duration-700 group-hover:-rotate-45" />
              </div>
            </div>

            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-black/40 border border-slate-800 rounded">
                    <Shield size={12} className="text-yellow-500" />
                    <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">Archive Secure</span>
                </div>
                <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">Registry: {pageId.toUpperCase()}</span>
              </div>

              <div className="space-y-1">
                <h2 
                    className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.9]"
                    style={{ fontFamily: theme.fontFamily, color: theme.accentColorDark }}
                >
                    {data.title}
                </h2>
                <div className="h-0.5 w-full bg-slate-800 relative">
                    <div className="absolute inset-0 bg-yellow-400 w-1/4" />
                </div>
              </div>
              
              <div className="relative">
                <p className="text-slate-400 text-lg md:text-2xl leading-relaxed max-w-2xl font-medium">
                  "{data.description}"
                </p>
              </div>

              <div className="pt-4 flex flex-wrap gap-6 items-center justify-center md:justify-start">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-600 tracking-widest font-mono">
                    SYS_LOAD: CALIBRATED // SPIRITUAL_DATA: STABLE
                  </div>
              </div>
            </div>
          </div>
        </div>

        {/* Knowledge Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {data.preferences.map((pref, idx) => (
            <div 
              key={idx}
              className="p-8 border border-slate-800 bg-slate-900/40 shadow-xl hover:border-yellow-500/30 transition-all group overflow-hidden relative rounded-xl"
            >
               <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Sparkles size={80} style={{ color: theme.accentColorDark }} />
               </div>

               <div className="flex items-start gap-6 relative z-10">
                  <div className="mt-1 w-5 h-5 border rotate-45 flex items-center justify-center shrink-0" style={{ borderColor: theme.accentColorDark }}>
                    <div className="w-1.5 h-1.5 bg-yellow-400" />
                  </div>
                  <p className="text-slate-300 font-bold text-xl tracking-tight leading-none uppercase group-hover:text-white transition-colors">
                    {pref}
                  </p>
               </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-800/50 pt-12 px-6">
          <div className="flex items-center gap-4">
             <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-500 tracking-[0.4em] uppercase">Archive Integrity</span>
                <span className="text-sm font-mono font-bold text-yellow-500/80">
                    {data.signatureDetail}
                </span>
             </div>
          </div>
          
          <div className="text-[10px] font-mono tracking-tighter text-slate-700 italic">
            &lt;personal_curation_matrix&gt;
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManhuaCategoryOverview;
