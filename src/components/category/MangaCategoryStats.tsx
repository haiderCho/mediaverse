import React from 'react';
import { PageId, ThemeConfig } from '../../types';
import { useStatsData } from './stats/useStatsData';
import { BookOpen, CheckCircle, PlayCircle, TrendingUp, ArrowRight } from 'lucide-react';

interface CategoryStatsProps {
  pageId: PageId;
  theme: ThemeConfig;
}

const MangaCategoryStats: React.FC<CategoryStatsProps> = ({ pageId, theme }) => {
  const { stats, dataSource, setDataSource, loading, currentData } = useStatsData(pageId);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center py-40 manga-font-jp text-[#111111]">
        <div className="font-black manga-lettering text-5xl animate-pulse italic">LOADING SCROLLS...</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-32 px-6 text-center manga-font-jp text-[#111111]">
        <div className="manga-panel bg-white border-[6px] border-[#111111] p-12 max-w-2xl w-full shadow-2xl manga-pop">
            <h3 className="text-5xl font-black mb-8 manga-lettering text-[#bc002d]">NO SCROLLS FOUND</h3>
            <p className="font-bold text-xl mb-12 border-l-[12px] border-[#111111] pl-8 py-4 bg-[#fbfaf5] text-left italic">
              Statistical data has not been inscribed for this path. The records appear to be blank.
            </p>
            
            <div className="flex flex-col gap-6">
                <span className="text-xs font-black tracking-widest manga-lettering-alt opacity-40">CHOOSE SOURCE //</span>
                <div className="flex gap-4 p-2 bg-white border-[3px] border-[#111111] manga-panel self-center">
                    <button 
                        onClick={() => setDataSource('ANILIST')} 
                        className={`px-10 py-3 manga-lettering-alt font-black text-xl transition-all ${dataSource === 'ANILIST' ? 'bg-[#111111] text-[#fbfaf5]' : 'text-[#111111] hover:bg-[#111111]/10'}`}
                    >
                        ANILIST
                    </button>
                    <button 
                        onClick={() => setDataSource('MAL')} 
                        className={`px-10 py-3 manga-lettering-alt font-black text-xl transition-all ${dataSource === 'MAL' ? 'bg-[#111111] text-[#fbfaf5]' : 'text-[#111111] hover:bg-[#111111]/10'}`}
                    >
                        MAL
                    </button>
                </div>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-10 px-6 animate-in fade-in duration-700 bg-transparent relative manga-font-jp text-[#111111] my-4">
      <div className="max-w-6xl w-full">
        {/* Header Panel - Compact */}
        <div className="mb-12 text-center relative border-b-[6px] border-[#111111] pb-10 bg-white p-8 manga-panel shadow-xl">
            <div className="relative inline-block mb-10">
              <div className="absolute inset-0 bg-[#bc002d] transform rotate-1 translate-x-1 translate-y-1" />
              <div className="relative bg-[#111111] px-10 py-4 border-[3px] border-[#111111] transform -rotate-1">
                <h2 className="text-4xl md:text-6xl font-black manga-lettering tracking-tight text-[#fbfaf5]">
                  STATISTICAL LOGS
                </h2>
              </div>
            </div>
            
            {/* Toggle Controls - Compact */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8 relative z-10">
                <div className="flex bg-white border-[3px] border-[#111111] p-1 manga-panel">
                    <button
                        onClick={() => setDataSource('ANILIST')}
                        className={`px-8 py-2 manga-lettering-alt text-lg font-bold transition-all ${
                          dataSource === 'ANILIST' ? 'bg-[#111111] text-[#fbfaf5]' : 'text-[#111111] hover:bg-[#111111]/10'
                        }`}
                    >
                        ANILIST
                    </button>
                    <button
                        onClick={() => setDataSource('MAL')}
                        className={`px-8 py-2 manga-lettering-alt text-lg font-bold transition-all ${
                          dataSource === 'MAL' ? 'bg-[#111111] text-[#fbfaf5]' : 'text-[#111111] hover:bg-[#111111]/10'
                        }`}
                    >
                        MAL
                    </button>
                </div>
            </div>

            {/* User Meta - Compact */}
            <div className="flex items-center justify-center gap-6">
                <div className="flex items-center gap-4 bg-[#fbfaf5] border-[3px] border-[#111111] px-6 py-2 shadow-md">
                    {currentData?.avatar && <img src={currentData.avatar} alt="Avatar" className="w-10 h-10 border-2 border-[#111111] grayscale" />}
                    <div className="flex flex-col items-start leading-none manga-lettering-alt">
                      <span className="text-[10px] opacity-90 font-black tracking-widest uppercase mb-1">AUTHOR //</span>
                      <span className="text-xl font-black text-[#111111]">{currentData?.username?.toUpperCase() || 'UNKNOWN'}</span>
                    </div>
                </div>
                
                <div className="w-12 h-12 flex items-center justify-center text-white bg-[#bc002d] border-[3px] border-[#111111] transform -rotate-3 shadow-lg">
                    <span className="font-black text-xl manga-title">印</span>
                </div>

                 <div className="bg-[#fbfaf5] border-[3px] border-[#111111] px-6 py-2 shadow-md">
                    <div className="flex flex-col items-start leading-none manga-lettering-alt">
                      <span className="text-[10px] opacity-90 font-black tracking-widest uppercase mb-1">DATE INSCR. //</span>
                      <span className="text-xl font-black text-[#111111]">{currentData?.fetchedAt ? new Date(currentData.fetchedAt).toLocaleDateString() : 'UNKNOWN'}</span>
                    </div>
                 </div>
            </div>
        </div>

        {/* Stats Grid - Compact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="manga-panel p-8 bg-white flex flex-col items-center justify-center gap-4 group manga-pop border-[3px] border-[#111111]">
                <div className="p-3 bg-[#111111] text-[#fbfaf5] border-2 border-[#111111]"><BookOpen size={32} /></div>
                <div className="relative text-center">
                  <span className="text-6xl font-black text-[#111111] manga-title">
                      {stats.total ?? 0}
                  </span>
                </div>
                <span className="manga-lettering-alt text-xs font-black opacity-80 tracking-[0.2em] mt-1 text-[#111111]">TOTAL ENTRIES</span>
            </div>
            
            <div className="manga-panel p-8 bg-white flex flex-col items-center justify-center gap-4 group manga-pop border-[3px] border-[#111111]">
                <div className="p-3 bg-[#bc002d] text-white border-2 border-[#111111]"><CheckCircle size={32} /></div>
                 <div className="relative text-center">
                  <span className="text-6xl font-black text-[#111111] manga-title">
                      {stats.completed ?? 0}
                  </span>
                 </div>
                <span className="manga-lettering-alt text-xs font-black opacity-80 tracking-[0.2em] mt-1 text-[#111111]">COMPLETED</span>
            </div>
            
             <div className="manga-panel p-8 bg-white flex flex-col items-center justify-center gap-4 group manga-pop border-[3px] border-[#111111]">
                <div className="p-3 bg-[#111111] text-[#fbfaf5] border-2 border-[#111111]"><PlayCircle size={32} /></div>
                 <div className="relative text-center">
                  <span className="text-5xl font-black text-[#111111] manga-title leading-none">
                      {stats.statExtra?.value ?? '---'}
                  </span>
                 </div>
                <span className="manga-lettering-alt text-xs font-black opacity-80 tracking-[0.2em] mt-1 text-[#111111]">{stats.statExtra?.label?.toUpperCase() || 'DATA'}</span>
            </div>
            
            <div className="manga-panel p-8 bg-[#bc002d] flex flex-col items-center justify-center gap-4 group manga-pop border-[3px] border-[#111111] text-white">
                <div className="p-3 bg-white text-[#bc002d] border-2 border-[#111111]"><TrendingUp size={32} /></div>
                 <div className="flex items-baseline gap-1 relative text-white">
                    <span className="text-6xl font-black manga-title">{stats.meanScore ?? '0.0'}</span>
                    <span className="text-lg font-black opacity-80">/{dataSource === 'ANILIST' ? '100' : '10'}</span>
                 </div>
                <span className="manga-lettering-alt text-xs font-black opacity-100 tracking-[0.2em] mt-1 text-white">MEAN SCORE</span>
            </div>
        </div>

        {/* Footer Area - Compact */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-10 mt-10 border-t-[4px] border-[#111111] relative bg-white/40 p-8 manga-panel">
          <div className="flex items-center gap-6">
             <div className="w-14 h-14 flex flex-col items-center justify-center text-[#fbfaf5] bg-[#111111] border-[3px] border-[#111111] transform rotate-2 shadow-[3px_3px_0px_#bc002d] leading-none shrink-0">
                <span className="font-black text-lg manga-title">漫</span>
                <span className="font-black text-lg manga-title">画</span>
             </div>
             <div className="flex flex-col manga-lettering-alt">
               <span className="text-[10px] opacity-50 font-black tracking-widest">REGISTRY // INTEGRITY CHECK</span>
               <span className="text-lg font-bold tracking-widest text-[#111111]">
                 DATA INSCRIBED AND VERIFIED
               </span>
             </div>
          </div>
          
          <div className="flex items-center gap-6 font-black manga-title text-xl text-[#111111] group cursor-pointer transition-all">
            <span className="border-b-[3px] border-[#bc002d] group-hover:px-6 transition-all duration-300 italic uppercase">Archives</span>
            <div className="w-10 h-10 border-[3px] border-[#111111] flex items-center justify-center group-hover:bg-[#111111] group-hover:text-[#fbfaf5] transition-colors">
              <ArrowRight size={20} strokeWidth={3} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MangaCategoryStats;
