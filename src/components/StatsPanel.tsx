import React from 'react';
import type { Problem } from '../types/Problem';

interface StatsPanelProps {
  problems: Problem[];
  progress: Record<string, boolean>;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ problems, progress }) => {
  const stats = problems.reduce(
    (acc, problem) => {
      acc[problem.difficulty].total++;
      if (progress[problem.id]) {
        acc[problem.difficulty].solved++;
      }
      return acc;
    },
    {
      Easy: { total: 0, solved: 0 },
      Medium: { total: 0, solved: 0 },
      Hard: { total: 0, solved: 0 },
    }
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
      <h2 className="text-md font-medium text-zinc-100">By Difficulty</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {Object.entries(stats).map(([difficulty, { total, solved }]) => {
          const percent = total > 0 ? Math.round((solved / total) * 100) : 0;
          const borderColor = difficulty === 'Easy' ? 'border-green-500/30' :
                             difficulty === 'Medium' ? 'border-yellow-500/30' :
                             'border-red-500/30';
          const textColor = difficulty === 'Easy' ? 'text-green-400' :
                           difficulty === 'Medium' ? 'text-yellow-400' :
                           'text-red-400';
          const barColor = difficulty === 'Easy' ? 'bg-green-500' :
                          difficulty === 'Medium' ? 'bg-yellow-500' :
                          'bg-red-500';
          return (
            <div key={difficulty} className={`card p-4 border-2 ${borderColor}`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-zinc-100">{difficulty}</h3>
                <span className={`text-xs font-semibold ${textColor}`}>{solved}/{total}</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ease-out ${barColor}`}
                  style={{ width: `${percent}%` }}
                />
              </div>
              <p className="text-xs text-zinc-400 mt-2">{percent}% complete</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsPanel;