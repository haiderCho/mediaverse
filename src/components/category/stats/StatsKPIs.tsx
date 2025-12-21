import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, PlayCircle, TrendingUp } from 'lucide-react';
import { ThemeConfig } from '../../../types';
import { MalStat, DataSource } from './types';

interface StatsKPIsProps {
    stats: MalStat;
    theme: ThemeConfig;
    dataSource: DataSource;
}

export const StatsKPIs: React.FC<StatsKPIsProps> = ({ stats, theme, dataSource }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-slate-700 transition-colors">
                <div className="p-3 rounded-full bg-slate-800 text-slate-400 mb-2"><BookOpen size={24} /></div>
                <span className="text-4xl font-black text-white font-mono">{stats.total}</span>
                <span className="text-xs text-slate-500 uppercase font-bold">Total Entries</span>
            </div>
            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-slate-700 transition-colors">
                <div className="p-3 rounded-full bg-slate-800 text-slate-400 mb-2 text-green-400"><CheckCircle size={24} /></div>
                 <span className="text-4xl font-black text-white font-mono">{stats.completed}</span>
                <span className="text-xs text-slate-500 uppercase font-bold">Completed</span>
            </div>
             <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-slate-700 transition-colors">
                <div className="p-3 rounded-full bg-slate-800 text-slate-400 mb-2 text-blue-400"><PlayCircle size={24} /></div>
                 <span className="text-3xl font-black text-white font-mono">{stats.statExtra.value}</span>
                <span className="text-xs text-slate-500 uppercase font-bold">{stats.statExtra.label}</span>
            </div>
            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-slate-700 transition-colors">
                <div className="p-3 rounded-full bg-slate-800 text-slate-400 mb-2 text-amber-400"><TrendingUp size={24} /></div>
                 <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black font-mono" style={{ color: theme.accentColorLight }}>{stats.meanScore}</span>
                    <span className="text-xs font-bold text-slate-600">/{dataSource === 'ANILIST' ? '100' : '10'}</span>
                 </div>
                <span className="text-xs text-slate-500 uppercase font-bold">Mean Score</span>
            </div>
        </motion.div>
    );
};
