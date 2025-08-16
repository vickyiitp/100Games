import React, { useState, useEffect, useCallback } from 'react';

interface SequenceGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const GRID_SIZE = 9; // 3x3 grid

const SequenceGame: React.FC<SequenceGameProps> = ({ level, onGameComplete }) => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [gameState, setGameState] = useState<'watching' | 'playing' | 'gameover'>('watching');
  const [litTile, setLitTile] = useState<number | null>(null);

  const sequenceLength = 3 + level;

  const generateSequence = useCallback(() => {
    const newSequence = Array.from({ length: sequenceLength }, () => Math.floor(Math.random() * GRID_SIZE));
    setSequence(newSequence);
    setPlayerSequence([]);
    setGameState('watching');
  }, [sequenceLength]);

  useEffect(() => {
    generateSequence();
  }, [level, generateSequence]);

  useEffect(() => {
    if (gameState === 'watching' && sequence.length > 0) {
      let i = 0;
      const interval = setInterval(() => {
        setLitTile(sequence[i]);
        setTimeout(() => setLitTile(null), 400); // How long the tile stays lit
        i++;
        if (i >= sequence.length) {
          clearInterval(interval);
          setGameState('playing');
        }
      }, 700); // Time between lit tiles
    }
  }, [gameState, sequence]);
  
  useEffect(() => {
    if (gameState !== 'playing' || playerSequence.length === 0) return;

    const isCorrect = sequence.every((val, index) => playerSequence[index] === undefined || val === playerSequence[index]);
    
    if (!isCorrect) {
        setGameState('gameover');
        // Simple scoring: 0 for failure
        setTimeout(() => onGameComplete(0), 1000); 
    } else if (playerSequence.length === sequence.length) {
        // Success!
        const score = level * 100 + sequence.length * 10;
        setTimeout(() => onGameComplete(score), 500);
    }
    
  }, [playerSequence, sequence, gameState, level, onGameComplete]);

  const handleTileClick = (index: number) => {
    if (gameState !== 'playing') return;
    setPlayerSequence(prev => [...prev, index]);
  };

  const getTileClasses = (index: number) => {
    let baseClass = 'w-24 h-24 md:w-28 md:h-28 rounded-lg transition-all duration-200';
    if (litTile === index) {
      return `${baseClass} bg-sky-400 scale-105 shadow-lg shadow-sky-400/50`;
    }
    if (gameState === 'playing') {
      return `${baseClass} bg-slate-700 hover:bg-slate-600 cursor-pointer`;
    }
    if (gameState === 'gameover' && playerSequence.includes(index) && sequence[playerSequence.indexOf(index)] !== index) {
        return `${baseClass} bg-red-500`; // Show incorrect tile
    }
    return `${baseClass} bg-slate-700`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold text-white">
          {gameState === 'watching' && 'Watch the sequence...'}
          {gameState === 'playing' && 'Repeat the sequence...'}
          {gameState === 'gameover' && 'Incorrect Sequence!'}
        </h3>
        <p className="text-slate-400">Sequence Length: {sequenceLength}</p>
      </div>
      <div className="grid grid-cols-3 gap-4 p-4 bg-slate-900/50 rounded-lg">
        {Array.from({ length: GRID_SIZE }).map((_, index) => (
          <div
            key={index}
            className={getTileClasses(index)}
            onClick={() => handleTileClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default SequenceGame;