import React, { useState, useEffect, useMemo } from 'react';

const EMOJI_SETS = [
  { normal: '😀', odd: '😁' },
  { normal: '🤖', odd: '👾' },
  { normal: '🧠', odd: '💡' },
  { normal: '❤️', odd: '💔' },
  { normal: '⭐️', odd: '🌟' },
  { normal: '☀️', odd: '🌙' },
  { normal: '⬆️', odd: '⬇️' },
  { normal: '⬅️', odd: '➡️' },
];

interface OddOneOutGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const OddOneOutGame: React.FC<OddOneOutGameProps> = ({ level, onGameComplete }) => {
  const { gridSize, emojiSet, oddIndex } = useMemo(() => {
    const size = Math.min(6, 2 + Math.floor(level / 2)); // Grid size from 2x2 up to 6x6
    return {
      gridSize: size,
      emojiSet: EMOJI_SETS[level % EMOJI_SETS.length],
      oddIndex: Math.floor(Math.random() * size * size),
    };
  }, [level]);

  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    setStartTime(Date.now());
  }, [level]);

  const handleItemClick = (index: number) => {
    if (index === oddIndex) {
      const timeTaken = (Date.now() - startTime) / 1000; // time in seconds
      const score = Math.max(10, Math.floor((1000 * level) / timeTaken));
      onGameComplete(score);
    } else {
      // Incorrect click, maybe add a penalty
      onGameComplete(0);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h3 className="text-2xl font-bold text-white mb-6">Find the odd one out!</h3>
      <div 
        className="grid gap-4 p-4 bg-slate-900/50 rounded-lg"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {Array.from({ length: gridSize * gridSize }).map((_, index) => (
          <button
            key={index}
            onClick={() => handleItemClick(index)}
            className="w-20 h-20 md:w-24 md:h-24 bg-slate-700 rounded-lg flex items-center justify-center text-4xl md:text-5xl hover:bg-slate-600 transition-colors"
          >
            {index === oddIndex ? emojiSet.odd : emojiSet.normal}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OddOneOutGame;
