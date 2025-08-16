
import React, { useState, useEffect, useCallback } from 'react';
import { Game } from '../types';
import { PlayIcon } from './Icons';

interface FeaturedCarouselProps {
  games: Game[];
  onPlay: (game: Game) => void;
}

const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ games, onPlay }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === games.length - 1 ? 0 : prevIndex + 1));
  }, [games.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  if (games.length === 0) {
    return null;
  }

  const currentGame = games[currentIndex];

  return (
    <div className="relative w-full h-[50vh] max-h-[400px] rounded-2xl overflow-hidden shadow-2xl mb-12">
      {games.map((game, index) => (
        <div
          key={game.id}
          className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <img
            src={`https://picsum.photos/seed/${game.id}/1200/600`}
            alt={game.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
            <span className="px-3 py-1 text-sm font-semibold rounded-full bg-violet-500/50 text-violet-200 backdrop-blur-sm">
              Featured Game
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-4 drop-shadow-lg">{game.name}</h2>
            <p className="mt-2 text-lg text-slate-300 max-w-lg drop-shadow-md">
              A new challenge in our {game.categories[0]} collection to test your limits.
            </p>
            <button 
              onClick={() => onPlay(game)}
              className="mt-6 flex items-center gap-2 px-6 py-3 bg-sky-500 text-white font-bold rounded-full shadow-lg shadow-sky-500/30 transform hover:scale-105 hover:bg-sky-400 transition-all duration-300">
              <PlayIcon className="w-5 h-5" />
              Start Now
            </button>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {games.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? 'bg-sky-400' : 'bg-slate-500'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCarousel;
