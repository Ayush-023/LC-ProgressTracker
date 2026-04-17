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
    <div className="max-w-4xl mx-auto px-4 py-2">
      <div className="flex flex-col md:flex-row gap-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 flex-1 w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="h-8 px-2.5 text-sm bg-zinc-900/50 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-500 transition-all duration-150 hover:border-zinc-700 focus:border-zinc-600 focus:outline-none"
          />
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="h-8 px-2.5 text-sm bg-zinc-900/50 border border-zinc-800 rounded-lg text-zinc-100 cursor-pointer transition-all duration-150 hover:border-zinc-700 focus:border-zinc-600 focus:outline-none"
          >
            <option value="">All Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <select
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value)}
            className="h-8 px-2.5 text-sm bg-zinc-900/50 border border-zinc-800 rounded-lg text-zinc-100 cursor-pointer transition-all duration-150 hover:border-zinc-700 focus:border-zinc-600 focus:outline-none"
          >
            <option value="">All Topics</option>
            {topics.map((topic) => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-8 px-2.5 text-sm bg-zinc-900/50 border border-zinc-800 rounded-lg text-zinc-100 cursor-pointer transition-all duration-150 hover:border-zinc-700 focus:border-zinc-600 focus:outline-none"
          >
            <option value="">All Status</option>
            <option value="solved">Solved</option>
            <option value="unsolved">Unsolved</option>
          </select>
        </div>
        <button
          onClick={onClearFilters}
          className="btn-secondary text-xs h-8 px-3 whitespace-nowrap"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Filters;