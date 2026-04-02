import React, { useState, useEffect } from 'react';
import { PageId, ThemeConfig } from '../../types';
import { BookOpen, CheckCircle, PlayCircle, TrendingUp } from 'lucide-react';

interface CategoryStatsProps {
  pageId: PageId;
  theme: ThemeConfig;
}

const ComicCategoryStats: React.FC<CategoryStatsProps> = ({ theme }) => {
  const [loading, setLoading] = useState(true);

  // Simulate loading to keep the feel
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 bg-[#fbb013] border-[4px] border-black my-8 relative shadow-[10px_10px_0_0_#000]">
        <div className="text-black font-black uppercase text-2xl italic">LOADING LEAGUE OF COMIC GEEKS DATA...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-10 px-4 animate-in fade-in duration-700 bg-white border-[4px] border-black my-8 relative shadow-[10px_10px_0_0_#000]">
      <div className="max-w-7xl w-full">
        {/* Header */}
        <div className="mb-12 text-center relative border-b-[4px] border-black pb-8">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 italic" style={{ fontFamily: `'Impact', sans-serif`, color: 'black' }}>
              Collection Analysis
            </h2>
            
            {/* Toggle Controls */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
                <div className="flex border-[3px] border-black p-1 bg-white shadow-[4px_4px_0_0_#000]">
                    <button className="px-6 py-2 text-sm font-black uppercase transition-all bg-[#0256a1] text-white">
                        League of Comic Geeks
                    </button>
                </div>
            </div>

            {/* User Meta */}
            <div className="flex items-center justify-center gap-4 text-black font-black text-xs uppercase tracking-widest bg-[#fff200] border-[2px] border-black p-2 shadow-[2px_2px_0_0_#000] inline-flex">
                <span className="flex items-center gap-2">
                    User: nafizhc
                </span>
                <span className="text-[#f00000] font-bold">///</span>
                 <span>Updated: {new Date().toLocaleDateString()}</span>
            </div>
        </div>

        {/* 1. Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Issues Read */}
            <div className="p-6 bg-[#f00000] text-white border-[4px] border-black flex flex-col items-center justify-center gap-2 shadow-[6px_6px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-y-1 hover:translate-x-1 transition-all">
                <div className="p-3 bg-[#fff200] text-black border-2 border-black mb-2 transform rotate-3"><BookOpen size={28} /></div>
                <span className="text-5xl font-black" style={{ fontFamily: `'Impact', sans-serif` }}>9,293</span>
                <span className="text-sm uppercase font-black tracking-widest border-t-[3px] border-black pt-2 w-full text-center">Issues Read</span>
            </div>

            {/* Collected */}
            <div className="p-6 bg-[#0256a1] text-white border-[4px] border-black flex flex-col items-center justify-center gap-2 shadow-[6px_6px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-y-1 hover:translate-x-1 transition-all">
                <div className="p-3 bg-[#fbb013] text-black border-2 border-black mb-2 transform -rotate-3"><CheckCircle size={28} /></div>
                 <span className="text-5xl font-black" style={{ fontFamily: `'Impact', sans-serif` }}>1</span>
                <span className="text-sm uppercase font-black tracking-widest border-t-[3px] border-black pt-2 w-full text-center">Collected</span>
            </div>

            {/* Batman Issues */}
             <div className="p-6 bg-[#fff200] text-black border-[4px] border-black flex flex-col items-center justify-center gap-2 shadow-[6px_6px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-y-1 hover:translate-x-1 transition-all">
                <div className="p-3 bg-black text-white border-2 border-black mb-2 transform rotate-6"><PlayCircle size={28} /></div>
                 <span className="text-5xl font-black" style={{ fontFamily: `'Impact', sans-serif` }}>744</span>
                <span className="text-sm uppercase font-black tracking-widest border-t-[3px] border-black pt-2 w-full text-center">Batman Issues</span>
            </div>

            {/* Action Comics */}
            <div className="p-6 bg-[#fbb013] text-black border-[4px] border-black flex flex-col items-center justify-center gap-2 shadow-[6px_6px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-y-1 hover:translate-x-1 transition-all">
                <div className="p-3 bg-[#f00000] text-white border-2 border-black mb-2 transform -rotate-6"><TrendingUp size={28} /></div>
                 <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black" style={{ fontFamily: `'Impact', sans-serif` }}>919</span>
                 </div>
                <span className="text-sm uppercase font-black tracking-widest border-t-[3px] border-black pt-2 w-full text-center">Action Comics</span>
            </div>
        </div>

        <div className="p-6 bg-black text-white border-[4px] border-black shadow-[6px_6px_0_0_#000] transform -rotate-1 italic mt-8 font-black uppercase text-center tracking-widest text-xl cursor-default">
           TO BE CONTINUED...
        </div>

      </div>
    </div>
  );
};

export default ComicCategoryStats;
