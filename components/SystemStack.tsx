'use client';

import React from 'react';

interface SystemStackProps {
  stack: string[];
}

const SystemStack = ({ stack }: SystemStackProps) => {
  return (
    <div className="relative w-full">
      <div className="border-t border-gray-200 pt-6 mt-6">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            <div className="text-xs font-mono text-black/40 uppercase tracking-wider">
              Stack
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 text-sm font-mono text-gray-900">
              {stack.map((item, index) => (
                <React.Fragment key={index}>
                  <span className="px-3 py-1.5 bg-black/5 rounded border border-gray-200/50">
                    {item}
                  </span>
                  {index < stack.length - 1 && (
                    <span className="text-gray-400">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStack;
