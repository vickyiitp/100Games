
import React, { useState, useEffect } from 'react';
import { Game } from '../types';
import { generateGameDescription } from '../services/geminiService';
import { LevelIcon, TimeIcon, PlayIcon } from './Icons';

interface GameCardProps {
  game: Game;
  onPlay: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onPlay }) => {
  const [description, setDescription] = useState<string>('Loading description...');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDescription = async () => {
      setIsLoading(true);
      const desc = await generateGameDescription(game.name);
      setDescription(desc);
      setIsLoading(false);
    };
    fetchDescription();
  }, [game.name]);

  const imageUrl = `https://picsum.photos/seed/${game.id}/400/300`;

  return (
    <div className="group perspective-1000">
      <div className="relative w-full h-80 rounded-2xl shadow-lg transform-style-3d group-hover:rotate-y-5 transition-transform duration-500 ease-in-out bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 overflow-hidden">
        
        {/* Front Face */}
        <div className="absolute w-full h-full backface-hidden flex flex-col">
          <img src={imageUrl} alt={game.name} className="w-full h-1/2 object-cover" />
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-sky-300">{game.name}</h3>
            {isLoading ? (
              <div className="mt-2 h-4 w-full bg-slate-700 rounded animate-pulse"></div>
            ) : (
              <p className="text-slate-300 text-sm mt-2 flex-grow">{description}</p>
            )}
            <div className="flex items-center justify-between text-xs text-slate-400 mt-4">
                <div className="flex items-center gap-1">
                    <LevelIcon className="w-4 h-4 text-violet-400" />
                    <span>{game.levelCount}+ Levels</span>
                </div>
                 <div className="flex items-center gap-1">
                    <TimeIcon className="w-4 h-4 text-violet-400" />
                    <span>{game.timeRequired}</span>
                </div>
            </div>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out p-4">
           <h3 className="text-2xl font-bold text-sky-300">{game.name}</h3>
           <div className="flex flex-wrap justify-center gap-2 my-4">
                {game.categories.map(cat => (
                    <span key={cat} className="px-2 py-1 bg-sky-500/20 text-sky-300 text-xs font-semibold rounded-full">{cat}</span>
                ))}
            </div>
            <p className="text-center text-slate-200 mb-6">{description}</p>
            <button 
                onClick={() => onPlay(game)}
                className="flex items-center gap-2 px-8 py-4 bg-sky-500 text-white font-bold rounded-full shadow-lg shadow-sky-500/30 transform hover:scale-105 hover:bg-sky-400 transition-all duration-300">
                <PlayIcon className="w-6 h-6" />
                Play Now
            </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
