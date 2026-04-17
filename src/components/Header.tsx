import React from 'react';

interface HeaderProps {
  totalProblems: number;
  solvedCount: number;
  onResetProgress: () => void;
}

const Header: React.FC<HeaderProps> = React.memo(({ totalProblems, solvedCount, onResetProgress }) => {
  const percentage = totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0;

  const handleResetClick = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      onResetProgress();
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm bg-zinc-950/70 border-b border-zinc-800">
      <div className="max-w-4xl mx-auto px-4 py-5">
        <div className="flex items-baseline justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-zinc-100">LeetCode Progress</h1>
            <p className="text-xs text-zinc-400 mt-2">
              <span className="text-zinc-200">{solvedCount}</span>
              <span className="text-zinc-500"> / </span>
              <span className="text-zinc-200">{totalProblems}</span>
              <span className="text-zinc-500"> problems</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-semibold text-zinc-100">{percentage}%</div>
              <div className="text-[11px] text-zinc-500 font-medium">complete</div>
            </div>
            <button
              onClick={handleResetClick}
              className="btn-reset text-xs"
              title="Reset all progress"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;