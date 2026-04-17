import React from 'react';

interface FiltersProps {
  difficultyFilter: string;
  setDifficultyFilter: (filter: string) => void;
  topicFilter: string;
  setTopicFilter: (filter: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  topics: string[];
  onClearFilters: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  difficultyFilter,
  setDifficultyFilter,
  topicFilter,
  setTopicFilter,
  statusFilter,
  setStatusFilter,
  searchQuery,
  setSearchQuery,
  topics,
  onClearFilters,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 flex-1 w-full">
          <div className="flex flex-col">
            <label className="text-xs text-zinc-400 mb-2">Search</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter..."
              className="h-9 px-3 text-sm bg-zinc-900/50 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-500 transition-all duration-150 hover:border-zinc-700 focus:border-zinc-600 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-zinc-400 mb-2">Difficulty</label>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="h-9 px-3 text-sm bg-zinc-900/50 border border-zinc-800 rounded-lg text-zinc-100 cursor-pointer transition-all duration-150 hover:border-zinc-700 focus:border-zinc-600 focus:outline-none"
            >
              <option value="">All</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-zinc-400 mb-2">Topic</label>
            <select
              value={topicFilter}
              onChange={(e) => setTopicFilter(e.target.value)}
              className="h-9 px-3 text-sm bg-zinc-900/50 border border-zinc-800 rounded-lg text-zinc-100 cursor-pointer transition-all duration-150 hover:border-zinc-700 focus:border-zinc-600 focus:outline-none"
            >
              <option value="">All</option>
              {topics.map((topic) => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-zinc-400 mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-9 px-3 text-sm bg-zinc-900/50 border border-zinc-800 rounded-lg text-zinc-100 cursor-pointer transition-all duration-150 hover:border-zinc-700 focus:border-zinc-600 focus:outline-none"
            >
              <option value="">All</option>
              <option value="solved">Solved</option>
              <option value="unsolved">Unsolved</option>
            </select>
          </div>
        </div>
        <div className="flex">
          <button
            onClick={onClearFilters}
            className="btn-secondary text-xs self-end h-9"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;