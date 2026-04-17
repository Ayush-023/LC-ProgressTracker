import React from 'react';

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
        <div
          className="bg-green-500 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ 
            width: `${percentage}%`,
            boxShadow: `0 0 8px rgba(34, 197, 94, 0.4)`
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;