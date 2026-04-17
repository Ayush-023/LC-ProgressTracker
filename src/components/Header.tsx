import React from 'react';

interface HeaderProps {
  totalProblems: number;
  solvedCount: number;
  onResetProgress: () => void;
}

const Header: React.FC<HeaderProps> = ({ totalProblems, solvedCount, onResetProgress }) => {
  const percentage = totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0;

  const handleResetClick = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      onResetProgress();
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-zinc-950/70 border-b border-zinc-800">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold text-zinc-100">LeetCode Progress</h1>
            <p className="text-xs text-zinc-400 mt-1">
              <span className="text-zinc-300">{solvedCount}</span> / {totalProblems} problems solved
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-semibold text-zinc-100">{percentage}%</div>
              <div className="text-xs text-zinc-500">complete</div>
            </div>
            <button
              onClick={handleResetClick}
              className="btn-secondary text-xs"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;