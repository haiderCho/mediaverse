import React from 'react';
import { PageId, ThemeConfig } from '../../types';
import { CATEGORY_LANDING_DATA } from '../../config/categoryLandingData';
import { Star, ArrowRight } from 'lucide-react';

interface CategoryOverviewProps {
  pageId: PageId;
  theme: ThemeConfig;
}

const ComicCategoryOverview: React.FC<CategoryOverviewProps> = ({ pageId, theme }) => {
  const data = CATEGORY_LANDING_DATA[pageId] || {
    title: `${theme.title} Overview`,
    description: `Welcome to my ${theme.title} collection. Exploring my favorite entries and specific tastes in this category.`,
    preferences: ["Quality storytelling", "Exceptional art direction", "Emotional resonance"],
    signatureDetail: "STATUS: INITIALIZED // DATA_SOURCE: LOCAL"
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-10 px-4 animate-in fade-in duration-700 bg-white border-[4px] border-black my-8 relative shadow-[10px_10px_0_0_#000]">
      {/* Halftone texture inside overview panel */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1.5px, transparent 2px)',
          backgroundSize: '12px 12px'
        }}
      />
      <div className="max-w-4xl w-full relative z-10 text-black">
        {/* Hero Section */}
        <div className="relative mb-12">
          <div className="relative px-8 py-10 border-[4px] border-black bg-[#fff200] shadow-[8px_8px_0_0_#000] flex flex-col md:flex-row items-center gap-8 transform rotate-1">
            <div 
              className="p-6 bg-[#0256a1] flex items-center justify-center shrink-0 border-[4px] border-black shadow-[6px_6px_0_0_#f00000] transform -rotate-3 hover:scale-110 transition-transform cursor-default"
            >
              <theme.icon size={56} className="text-white" />
            </div>
            <div className="space-y-4 text-center md:text-left font-black">
              <h2 
                className="text-4xl md:text-6xl uppercase tracking-tighter italic leading-none"
                style={{ fontFamily: `'Impact', sans-serif`, color: 'black', WebkitTextStroke: '1px white' }}
              >
                {data.title}
              </h2>
              <div className="h-2 w-24 bg-[#f00000] border-2 border-black mb-2" />
              <p className="text-xl md:text-2xl leading-relaxed max-w-2xl font-black uppercase italic">
                {data.description}
              </p>
            </div>
          </div>
        </div>

        {/* Preferences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {data.preferences.map((pref, idx) => (
            <div 
              key={idx}
              className={`p-6 border-[4px] border-black shadow-[6px_6px_0_0_#000] hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#000] transition-all group flex items-start gap-4 transform ${idx % 2 === 0 ? '-rotate-1' : 'rotate-1'} ${idx === 0 ? 'bg-[#f00000] text-white' : idx === 1 ? 'bg-[#0256a1] text-white' : 'bg-[#fff200] text-black'}`}
            >
              <div 
                className="mt-1 p-1 bg-white border-2 border-black group-hover:scale-110 transition-transform flex items-center justify-center shrink-0 shadow-[2px_2px_0_0_#000]"
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', width: '32px', height: '32px' }}
              >
                <Star size={16} fill="black" className="text-black" />
              </div>
              <p className="font-black text-xl uppercase tracking-tight italic">
                "{pref}"
              </p>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t-[4px] border-black pt-8 mt-4">
          <div className="flex items-center gap-3">
             <div className="w-4 h-4 bg-[#f00000] border-[2px] border-black animate-pulse shadow-[2px_2px_0_0_#000]" />
             <span className="text-sm font-black tracking-widest uppercase italic bg-black text-white px-2 py-0.5">
               {data.signatureDetail}
             </span>
          </div>
          
          <div className="flex items-center gap-2 font-black text-base uppercase tracking-widest bg-[#fff200] text-black px-6 py-3 border-[4px] border-black shadow-[4px_4px_0_0_#000] cursor-pointer hover:bg-black hover:text-white hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
            Select a genre
            <ArrowRight size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComicCategoryOverview;
