import React from 'react';
import type { Problem } from '../types/Problem';

interface ProblemItemProps {
  problem: Problem;
  isSolved: boolean;
  onToggle: (id: string) => void;
}

const ProblemItem: React.FC<ProblemItemProps> = React.memo(({ problem, isSolved, onToggle }) => {
  const handleDoubleClick = () => {
    onToggle(problem.id);
  };

  return (
    <div 
      className={`flex items-center justify-between gap-3 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/50 transition-all duration-150 cursor-pointer ${
        isSolved 
          ? 'opacity-50 hover:opacity-60' 
          : 'hover:bg-zinc-800/60 hover:border-zinc-700 hover:scale-[1.01] active:scale-[0.99]'
      }`}
      onDoubleClick={handleDoubleClick}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <input
          type="checkbox"
          checked={isSolved}
          onChange={() => onToggle(problem.id)}
          className="w-5 h-5 flex-shrink-0"
          aria-label={`Mark ${problem.title} as ${isSolved ? 'unsolved' : 'solved'}`}
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
                <span key={`${problem.id}-${topic}-${idx}`} className="text-[11px] text-zinc-400">
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
        className="text-zinc-500 hover:text-zinc-300 text-sm px-2 py-1 rounded-lg transition-all duration-150 flex-shrink-0"
        title="Open on LeetCode"
        onClick={(e) => e.stopPropagation()}
      >
        ↗
      </a>
    </div>
  );
});

ProblemItem.displayName = 'ProblemItem';

export default ProblemItem;