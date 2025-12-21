import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, BookOpen, Hourglass, Trophy } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell 
} from 'recharts';
import { ThemeConfig, PageId } from '../../../types';
import { MalStat } from './types';

interface ChartsRowProps {
    stats: MalStat;
    theme: ThemeConfig;
    pageId: PageId;
}

export const ChartsRow: React.FC<ChartsRowProps> = ({ stats, theme, pageId }) => {
    const genreData = stats.topGenres ? stats.topGenres.slice(0, 5) : [];
  
    const formatData = stats.formats ? stats.formats
    .filter(fmt => {
        const name = fmt.name.toUpperCase().replace('_', ' ');
        if (pageId === PageId.ANIME_SERIES) return name !== 'MOVIE';
        if (pageId === PageId.ANIME_MOVIES) return name === 'MOVIE';
        return true;
    })
    .map(fmt => ({ ...fmt, name: fmt.name.replace('_', ' ') })) 
    : [];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             {/* Top Genres - Horizontal Bar */}
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               className="p-8 bg-slate-900/30 border border-slate-800/50 rounded-3xl min-h-[400px]"
            >
                <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                    <BarChart3 size={20} className="text-slate-400" />
                    Top 5 Genres
                </h3>
                <div className="w-full h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            layout="vertical"
                            data={genreData}
                            margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                            <XAxis type="number" stroke="#64748b" fontSize={12} />
                            <YAxis dataKey="name" type="category" width={100} stroke="#94a3b8" fontSize={12} tickLine={false} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9' }}
                                cursor={{fill: '#1e293b', opacity: 0.4}}
                            />
                            <Bar dataKey="count" fill={theme.accentColorDark} radius={[0, 4, 4, 0]} barSize={32}>
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Formats - Vertical Bar */}
            {formatData.length > 0 && (
                <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.4 }}
                   className="p-8 bg-slate-900/30 border border-slate-800/50 rounded-3xl min-h-[400px]"
                >
                    <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                        <BookOpen size={20} className="text-slate-400" />
                        Format Breakdown
                    </h3>
                    <div className="w-full h-[350px]">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={formatData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
                                <YAxis stroke="#64748b" fontSize={12} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9' }}
                                    cursor={{fill: '#1e293b', opacity: 0.4}}
                                />
                                <Bar dataKey="count" fill="#475569" radius={[4, 4, 0, 0]} barSize={40}>
                                    {formatData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? theme.accentColorDark : '#475569'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

interface TimeAndFavoritesProps {
    stats: MalStat;
    theme: ThemeConfig;
}

export const TimeAndFavorites: React.FC<TimeAndFavoritesProps> = ({ stats, theme }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-6"
        >
             {/* Time Card */}
             <div className="flex-1 p-8 bg-slate-900/30 border border-slate-800/50 rounded-3xl flex flex-col justify-center items-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none"><Hourglass size={150} /></div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6 text-center w-full justify-center z-10">
                    <Hourglass size={20} className="text-slate-400" />
                    Time Investment
                </h3>
                {stats.timeWatched ? (
                    <div className="z-10 text-center">
                        <div className="text-7xl font-black text-white tracking-tighter" style={{ color: theme.accentColorLight }}>
                            {stats.timeWatched.days}
                        </div>
                        <div className="text-xl text-slate-500 uppercase tracking-widest font-bold mt-2">Days Watched</div>
                        <div className="mt-4 p-2 bg-slate-800/50 rounded-lg inline-block">
                            <span className="text-slate-300 font-mono">{stats.timeWatched.hours} Hours</span>
                        </div>
                    </div>
                ) : (
                    <div className="text-center z-10">
                            <div className="text-6xl font-black text-slate-700">N/A</div>
                            <p className="text-slate-500 mt-2">Time stats unavailable in MAL source</p>
                    </div>
                )}
            </div>

            {/* Quick Top Studio/Author List */}
            <div className="flex-1 p-8 bg-slate-900/30 border border-slate-800/50 rounded-3xl relative">
                <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                    <Trophy size={20} className="text-yellow-500" />
                    Top {stats.topStudios?.length ? 'Studios' : 'Authors'}
                </h3>
                <div className="space-y-3">
                        {(stats.topStudios || stats.topAuthors || []).slice(0, 3).map((item, i) => (
                            <div key={item.name} className="flex justify-between items-center p-3 bg-slate-800/20 rounded-lg border border-slate-800/50">
                                <span className="font-bold text-slate-200">{i+1}. {item.name}</span>
                                <span className="font-mono text-slate-400 text-sm">{item.count}</span>
                            </div>
                        ))}
                </div>
            </div>
        </motion.div>
    );
};
