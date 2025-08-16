
import React from 'react';
import { SearchIcon } from './Icons';

interface HeaderProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <header className="py-6 px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-extrabold text-white tracking-wider">
          Mind<span className="text-sky-400">Spark</span> Hub
        </h1>
        <p className="text-slate-400 mt-1">Grow Your Mind. One Game at a Time.</p>
      </div>
      <div className="relative w-full md:w-auto">
        <input
          type="text"
          placeholder="Search games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-72 pl-10 pr-4 py-2 bg-slate-800/70 border border-slate-700 rounded-full text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-300"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
          <SearchIcon className="w-5 h-5" />
        </div>
      </div>
    </header>
  );
};

export default Header;
