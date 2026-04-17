import React from 'react';
import type { Problem } from '../types/Problem';
import ProblemItem from './ProblemItem';

interface ProblemListProps {
  problems: Problem[];
  progress: Record<string, boolean>;
  onToggle: (id: string) => void;
}

const ProblemList: React.FC<ProblemListProps> = ({ problems, progress, onToggle }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-12 space-y-2">
      {problems.length === 0 ? (
        <div className="text-center py-8 card">
          <p className="text-sm text-zinc-400">No problems found</p>
        </div>
      ) : (
        problems.map((problem) => (
          <ProblemItem
            key={problem.id}
            problem={problem}
            isSolved={progress[problem.id] || false}
            onToggle={onToggle}
          />
        ))
      )}
    </div>
  );
};

export default ProblemList;