import { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import ProgressBar from './components/ProgressBar';
import StatsPanel from './components/StatsPanel';
import Filters from './components/Filters';
import ProblemList from './components/ProblemList';
import type { Problem } from './types/Problem';
import useLocalStorage from './hooks/useLocalStorage';
import { PROGRESS_KEY } from './utils/constants';

function App() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [progress, setProgress] = useLocalStorage<Record<string, boolean>>(PROGRESS_KEY, {});

  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [topicFilter, setTopicFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/problems.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load problems');
        return res.json();
      })
      .then((data) => setProblems(data))
      .catch((err) => console.error('Error loading problems:', err));
  }, []);

  const allTopics = useMemo(() => {
    const topics = new Set<string>();
    problems.forEach((problem) => {
      topics.add(problem.topic);
    });
    return Array.from(topics).sort();
  }, [problems]);

  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => {
      if (difficultyFilter && problem.difficulty !== difficultyFilter) return false;
      if (topicFilter && problem.topic !== topicFilter) return false;
      if (statusFilter) {
        const isSolved = progress[problem.id.toString()] || false;
        if (statusFilter === 'solved' && !isSolved) return false;
        if (statusFilter === 'unsolved' && isSolved) return false;
      }
      if (searchQuery && !problem.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [problems, difficultyFilter, topicFilter, statusFilter, searchQuery, progress]);

  const solvedCount = useMemo(() => {
    return Object.values(progress).filter(Boolean).length;
  }, [progress]);

  const percentage = problems.length > 0 ? Math.round((solvedCount / problems.length) * 100) : 0;

  const toggleProblem = (id: number) => {
    const key = id.toString();
    setProgress((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const resetProgress = () => {
    setProgress({});
  };

  const clearFilters = () => {
    setDifficultyFilter('');
    setTopicFilter('');
    setStatusFilter('');
    setSearchQuery('');
  };

  if (problems.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-zinc-800 border-t-zinc-100 mx-auto mb-4"></div>
          <p className="text-sm text-zinc-400">Loading problems...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header totalProblems={problems.length} solvedCount={solvedCount} onResetProgress={resetProgress} />
      <ProgressBar percentage={percentage} />
      <StatsPanel problems={problems} progress={progress} />
      <Filters
        difficultyFilter={difficultyFilter}
        setDifficultyFilter={setDifficultyFilter}
        topicFilter={topicFilter}
        setTopicFilter={setTopicFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        topics={allTopics}
        onClearFilters={clearFilters}
      />
      <ProblemList problems={filteredProblems} progress={progress} onToggle={toggleProblem} />
    </div>
  );
}

export default App;
