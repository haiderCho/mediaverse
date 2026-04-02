import React from 'react';
import { PageId, ThemeConfig } from '../../types';
import { CATEGORY_LANDING_DATA } from '../../config/categoryLandingData';
import { Star, ArrowRight } from 'lucide-react';

interface CategoryOverviewProps {
  pageId: PageId;
  theme: ThemeConfig;
}

const MangaCategoryOverview: React.FC<CategoryOverviewProps> = ({ pageId, theme }) => {
  const data = CATEGORY_LANDING_DATA[pageId] || {
    title: `${theme.title} Overview`,
    description: `Welcome to my ${theme.title} collection. Exploring my favorite entries and specific tastes in this category.`,
    preferences: ["Quality storytelling", "Exceptional art direction", "Emotional resonance"],
    signatureDetail: "STATUS: INITIALIZED // DATA_SOURCE: LOCAL"
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-10 px-6 animate-in fade-in duration-700 bg-transparent relative manga-font-jp text-[#111111] my-4">
      <div className="max-w-5xl w-full">
        {/* Hero Panel */}
        <div className="relative mb-20 group">
          <div className="manga-panel p-12 flex flex-col md:flex-row items-center gap-12 bg-white border-[6px] border-[#111111] manga-pop shadow-2xl">
            <div className="absolute inset-0 manga-screentone opacity-[0.03] pointer-events-none" />
            
            <div className="w-24 h-24 flex flex-col items-center justify-center shrink-0 manga-panel bg-white text-[#111111] border-[6px] border-[#111111] transform -rotate-1 shadow-[5px_5px_0px_#bc002d] leading-none">
              <span className="font-black text-2xl manga-lettering">漫</span>
              <span className="font-black text-2xl manga-lettering">画</span>
            </div>
            
            <div className="space-y-8 text-center md:text-left relative z-10 flex-1">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-[#bc002d] transform rotate-1 translate-x-2 translate-y-2 translate-z-[-1]" />
                <div className="relative bg-[#111111] px-10 py-4 border-[3px] border-[#111111] transform -rotate-1">
                  <h2 className="text-6xl md:text-8xl font-black manga-lettering tracking-tight text-[#fbfaf5]">
                    {data.title.toUpperCase()}
                  </h2>
                </div>
              </div>
              <p className="text-2xl md:text-3xl leading-tight font-bold bg-[#fbfaf5] p-6 border-l-[12px] border-[#bc002d] manga-font-jp italic">
                "{data.description}"
              </p>
            </div>
          </div>
        </div>

        {/* Preferences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          {data.preferences.map((pref, idx) => (
            <div 
              key={idx}
              className={`manga-panel p-10 group flex items-center gap-8 bg-white border-[4px] border-[#111111] hover:bg-[#fbfaf5] transition-all`}
            >
              <div className="absolute inset-0 manga-screentone opacity-0 group-hover:opacity-[0.05] transition-opacity" />
              <div className="w-4 h-16 bg-[#bc002d] shrink-0" />
              <p className="font-black text-3xl manga-lettering tracking-tight leading-none">
                {pref.toUpperCase()}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Info / "Data Inscription" */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 pt-12 border-t-[6px] border-[#111111] bg-white/40 p-10 manga-panel">
          <div className="flex items-center gap-6">
             <div className="flex flex-col manga-lettering-alt">
               <span className="text-xs opacity-50 font-black tracking-widest">REGISTRY // DATA SCALE: 1.0</span>
               <span className="text-xl font-bold tracking-widest text-[#111111]">
                 {data.signatureDetail.toUpperCase()}
               </span>
             </div>
          </div>
          
          <div className="flex items-center gap-8 font-black manga-lettering text-2xl text-[#111111] group cursor-pointer">
            <span className="border-b-[4px] border-[#bc002d] group-hover:px-6 transition-all duration-300 italic">GO TO ARCHIVES</span>
            <div className="w-12 h-12 border-[4px] border-[#111111] flex items-center justify-center group-hover:bg-[#111111] group-hover:text-[#fbfaf5] transition-colors">
              <ArrowRight size={24} strokeWidth={3} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MangaCategoryOverview;
