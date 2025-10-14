"use client";

import { motion } from "framer-motion";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface LineChartProps {
  data: Array<{ date: string; count: number; [key: string]: any }>;
  color?: string;
  height?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
  animate?: boolean;
  className?: string;
}

export default function LineChart({
  data,
  color = "#3b82f6",
  height = 200,
  showGrid = true,
  showTooltip = true,
  animate = true,
  className = "",
}: LineChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className={`flex items-center justify-center h-${height} ${className}`}>
        <div className="text-center text-gray-500 dark:text-gray-400">
          <div className="text-4xl mb-2">📈</div>
          <p>No data available</p>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.count));
  const minValue = Math.min(...data.map(d => d.count));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {new Date(label).toLocaleDateString('en-US', { 
              weekday: 'short',
              month: 'short', 
              day: 'numeric' 
            })}
          </p>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            {payload[0].value} {payload[0].name || 'items'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`w-full ${className}`}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart
          data={data}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        >
          {showGrid && (
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#e5e7eb" 
              strokeOpacity={0.3}
            />
          )}
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#6b7280' }}
            axisLine={false}
            tickLine={false}
            domain={[Math.max(0, minValue - 1), maxValue + 1]}
          />
          {showTooltip && <Tooltip content={<CustomTooltip />} />}
          <Line
            type="monotone"
            dataKey="count"
            stroke={color}
            strokeWidth={2}
            dot={false}
            activeDot={{ 
              r: 4, 
              stroke: color, 
              strokeWidth: 2, 
              fill: '#fff' 
            }}
            animationDuration={animate ? 1000 : 0}
            animationBegin={0}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
