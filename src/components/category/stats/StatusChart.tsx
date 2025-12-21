import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { MalStat } from './types';

interface StatusChartProps {
    stats: MalStat;
}

const COLORS = {
  watching: '#22c55e', // Green
  completed: '#2563eb', // Blue
  onHold: '#fbbf24',    // Amber
  dropped: '#ef4444',   // Red
  planTo: '#475569',    // Slate
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-700 p-2 rounded shadow-xl text-xs">
        <p className="text-slate-200 font-bold">{`${payload[0].name} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export const StatusChart: React.FC<StatusChartProps> = ({ stats }) => {
    // Prepare Chart Data
    const statusData = stats.details ? [
        { name: 'Watching', value: stats.details.watching, color: COLORS.watching },
        { name: 'Completed', value: stats.completed, color: COLORS.completed },
        { name: 'On Hold', value: stats.details.onHold, color: COLORS.onHold },
        { name: 'Dropped', value: stats.details.dropped, color: COLORS.dropped },
        { name: 'Plan to Watch', value: stats.details.planTo, color: COLORS.planTo },
      ].filter(d => d.value > 0) : [];

    return (
        <motion.div 
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.1 }}
           className="p-8 bg-slate-900/30 border border-slate-800/50 rounded-3xl min-h-[400px] flex flex-col"
        >
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
                <PlayCircle size={20} className="text-slate-400" />
                Status Distribution
            </h3>
            <div className="flex-1 w-full h-full min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={statusData}
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={120}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {statusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};
