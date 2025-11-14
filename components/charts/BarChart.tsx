"use client";

import { motion } from "framer-motion";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface BarChartProps {
  data: Array<{ [key: string]: any }>;
  dataKey: string;
  color?: string;
  height?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
  animate?: boolean;
  className?: string;
  horizontal?: boolean;
}

export default function BarChart({
  data,
  dataKey,
  color = "#3b82f6",
  height = 200,
  showGrid = true,
  showTooltip = true,
  animate = true,
  className = "",
  horizontal = false,
}: BarChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className={`flex items-center justify-center h-${height} ${className}`}>
        <div className="text-center text-gray-500 dark:text-gray-400">
          <div className="text-4xl mb-2">📊</div>
          <p>No data available</p>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d[dataKey] || 0));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {label}
          </p>
          <p className="text-sm" style={{ color: payload[0].color }}>
            {payload[0].value} {payload[0].name || dataKey}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`w-full ${className}`}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
          data={data}
          layout={horizontal ? "horizontal" : "vertical"}
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
            type={horizontal ? "number" : "category"}
            dataKey={horizontal ? dataKey : "name"}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            axisLine={false}
            tickLine={false}
            domain={horizontal ? [0, 'dataMax'] : undefined}
          />
          <YAxis 
            type={horizontal ? "category" : "number"}
            dataKey={horizontal ? "name" : dataKey}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            axisLine={false}
            tickLine={false}
            domain={horizontal ? undefined : [0, maxValue + 1]}
          />
          {showTooltip && <Tooltip content={<CustomTooltip />} />}
          <Bar
            dataKey={dataKey}
            fill={color}
            radius={[4, 4, 0, 0]}
            animationDuration={animate ? 1000 : 0}
            animationBegin={0}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
