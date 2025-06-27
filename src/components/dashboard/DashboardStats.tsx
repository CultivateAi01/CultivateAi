import React from 'react';
import { motion } from 'framer-motion';
import { FolderOpen, Zap, TrendingUp, Clock } from 'lucide-react';
import { Card } from '../ui/Card';

const stats = [
  {
    icon: FolderOpen,
    label: 'Active Projects',
    value: '5',
    change: '+2 this week',
    color: 'text-blue-400'
  },
  {
    icon: Zap,
    label: 'AI Actions Used',
    value: '23',
    change: '+8 this month',
    color: 'text-purple-400'
  },
  {
    icon: TrendingUp,
    label: 'Success Rate',
    value: '94%',
    change: '+5% improvement',
    color: 'text-green-400'
  },
  {
    icon: Clock,
    label: 'Time Saved',
    value: '47h',
    change: 'vs manual work',
    color: 'text-orange-400'
  }
];

export const DashboardStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover className="text-center">
              <div className={`inline-flex p-3 rounded-xl ${stat.color} bg-current/10 mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
              <p className="text-xs text-gray-500">{stat.change}</p>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};