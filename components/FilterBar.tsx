
import React from 'react';
import { GameCategory, Difficulty } from '../types';
import { CATEGORIES } from '../constants';

interface FilterBarProps {
  selectedCategory: GameCategory;
  setSelectedCategory: (category: GameCategory) => void;
  selectedDifficulty: Difficulty | 'All';
  setSelectedDifficulty: (difficulty: Difficulty | 'All') => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedDifficulty,
  setSelectedDifficulty,
}) => {
  const difficultyLevels: (Difficulty | 'All')[] = ['All', Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD, Difficulty.MASTER];

  return (
    <nav className="p-4 md:px-8 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-800/30 rounded-2xl backdrop-blur-sm border border-slate-700/50">
      <div className="flex-wrap flex items-center gap-2">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
         <span className="text-sm font-medium text-slate-400">Difficulty:</span>
         <div className="relative">
            <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value as Difficulty | 'All')}
                className="appearance-none bg-slate-700/50 border border-slate-600 text-white text-sm rounded-full py-2 pl-4 pr-8 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
            >
                {difficultyLevels.map(level => <option key={level} value={level}>{level}</option>)}
            </select>
         </div>
      </div>
    </nav>
  );
};

export default FilterBar;
