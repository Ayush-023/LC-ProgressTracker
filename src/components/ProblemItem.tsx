import React from 'react';
import type { Problem } from '../types/Problem';

interface ProblemItemProps {
  problem: Problem;
  isSolved: boolean;
  onToggle: (id: string) => void;
}

const ProblemItem: React.FC<ProblemItemProps> = ({ problem, isSolved, onToggle }) => {
  return (
    <div className={`card p-3 flex items-center justify-between gap-3 cursor-pointer transition-all duration-150 ${
      isSolved ? 'opacity-50 hover:opacity-60' : 'hover:bg-zinc-800/60 hover:border-zinc-700 hover:scale-[1.01]'
    } active:scale-[0.99]`}>
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <input
          type="checkbox"
          checked={isSolved}
          onChange={() => onToggle(problem.id)}
          className="w-5 h-5 flex-shrink-0 rounded border border-zinc-700 bg-zinc-900 cursor-pointer transition-transform duration-150 hover:scale-110 active:scale-90 appearance-none checked:bg-green-500 checked:border-green-500"
        />
        <div className="flex-1 min-w-0">
          <h3 className={`text-[13px] font-medium transition-all duration-150 ${
            isSolved ? 'line-through text-zinc-500' : 'text-zinc-100'
          }`}>
            {problem.title}
          </h3>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className={`text-[11px] font-semibold ${
              problem.difficulty === 'Easy' ? 'text-green-400' :
              problem.difficulty === 'Medium' ? 'text-yellow-400' :
              'text-red-400'
            }`}>
              {problem.difficulty}
            </span>
            <div className="flex flex-wrap gap-1">
              {problem.topics.map((topic, idx) => (
                <span key={`${problem.id}-${topic}-${idx}`} className="text-[11px] text-zinc-400 bg-zinc-800/30 px-2 py-0.5 rounded-md">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <a
        href={problem.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-zinc-500 hover:text-zinc-300 text-sm px-2 py-1 rounded-lg hover:bg-zinc-800/30 transition-all duration-150 flex-shrink-0"
        title="Open on LeetCode"
      >
        ↗
      </a>
    </div>
  );
};

export default ProblemItem;