"use client";

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface RepositoryData {
  name: string;
  stars: number;
  forks: number;
  language: string;
  size: number;
  created: string;
  updated: string;
}

interface RepositoryStatsChartProps {
  data: RepositoryData[];
  className?: string;
}

export default function RepositoryStatsChart({ data, className = "" }: RepositoryStatsChartProps) {
  const [activeTab, setActiveTab] = useState<'stars' | 'forks' | 'size'>('stars');
  const [hoveredRepo, setHoveredRepo] = useState<RepositoryData | null>(null);

  // Process data for chart
  const { maxStars, maxForks, maxSize, chartData } = useMemo(() => {
    const maxStars = Math.max(...data.map(repo => repo.stars));
    const maxForks = Math.max(...data.map(repo => repo.forks));
    const maxSize = Math.max(...data.map(repo => repo.size));
    
    const chartData = data.map(repo => ({
      ...repo,
      starsPercentage: maxStars > 0 ? (repo.stars / maxStars) * 100 : 0,
      forksPercentage: maxForks > 0 ? (repo.forks / maxForks) * 100 : 0,
      sizePercentage: maxSize > 0 ? (repo.size / maxSize) * 100 : 0
    }));

    return { maxStars, maxForks, maxSize, chartData };
  }, [data]);

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  // Get language color
  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      'JavaScript': '#f7df1e',
      'TypeScript': '#3178c6',
      'Python': '#3776ab',
      'Java': '#ed8b00',
      'C++': '#00599c',
      'C': '#a8b9cc',
      'C#': '#239120',
      'Go': '#00add8',
      'Rust': '#000000',
      'PHP': '#777bb4',
      'Ruby': '#cc342d',
      'Swift': '#fa7343',
      'Kotlin': '#7f52ff',
      'HTML': '#e34c26',
      'CSS': '#1572b6',
      'SCSS': '#cf649a',
      'Vue': '#4fc08d',
      'React': '#61dafb',
      'Angular': '#dd0031',
      'Node.js': '#339933'
    };
    return colors[language] || '#6c757d';
  };

  const getCurrentValue = (repo: RepositoryData) => {
    switch (activeTab) {
      case 'stars': return repo.stars;
      case 'forks': return repo.forks;
      case 'size': return formatFileSize(repo.size);
      default: return repo.stars;
    }
  };

  const getCurrentPercentage = (repo: any) => {
    switch (activeTab) {
      case 'stars': return repo.starsPercentage;
      case 'forks': return repo.forksPercentage;
      case 'size': return repo.sizePercentage;
      default: return repo.starsPercentage;
    }
  };

  const getMaxValue = () => {
    switch (activeTab) {
      case 'stars': return maxStars;
      case 'forks': return maxForks;
      case 'size': return formatFileSize(maxSize);
      default: return maxStars;
    }
  };

  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Top Repositories</h3>
        <div className="flex gap-2">
          {(['stars', 'forks', 'size'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="space-y-3">
        {chartData.slice(0, 10).map((repo, index) => {
          const percentage = getCurrentPercentage(repo);
          const value = getCurrentValue(repo);
          
          return (
            <motion.div
              key={repo.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="relative"
              onMouseEnter={() => setHoveredRepo(repo)}
              onMouseLeave={() => setHoveredRepo(null)}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getLanguageColor(repo.language) }}
                  />
                  <span className="text-sm font-medium text-white truncate max-w-[200px]">
                    {repo.name}
                  </span>
                </div>
                <span className="text-sm font-semibold text-white">
                  {typeof value === 'number' ? value.toLocaleString() : value}
                </span>
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Stats Summary */}
      <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-gray-700">
        <div className="text-center">
          <div className="text-lg font-bold text-white">{maxStars}</div>
          <div className="text-xs text-gray-400">Max Stars</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-white">{maxForks}</div>
          <div className="text-xs text-gray-400">Max Forks</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-white">{formatFileSize(maxSize)}</div>
          <div className="text-xs text-gray-400">Max Size</div>
        </div>
      </div>

      {/* Detailed Tooltip */}
      {hoveredRepo && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute z-50 bg-gray-900 text-white text-sm rounded-lg px-4 py-3 shadow-xl border border-gray-700"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: getLanguageColor(hoveredRepo.language) }}
            />
            <span className="font-semibold">{hoveredRepo.name}</span>
          </div>
          <div className="text-gray-300 space-y-1">
            <div>⭐ {hoveredRepo.stars.toLocaleString()} stars</div>
            <div>🍴 {hoveredRepo.forks.toLocaleString()} forks</div>
            <div>📦 {formatFileSize(hoveredRepo.size)}</div>
            <div>🕒 Updated {new Date(hoveredRepo.updated).toLocaleDateString()}</div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
