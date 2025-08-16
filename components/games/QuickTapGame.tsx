import React, { useState, useEffect, useRef } from 'react';

interface QuickTapGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const QuickTapGame: React.FC<QuickTapGameProps> = ({ level, onGameComplete }) => {
  const gameDuration = Math.max(5, 15 - level); // Game gets faster, minimum 5 seconds
  const targetSize = Math.max(20, 50 - level * 2); // Target gets smaller, minimum 20px

  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(gameDuration);
  const [targetPosition, setTargetPosition] = useState({ top: '50%', left: '50%' });
  const gameAreaRef = useRef<HTMLDivElement>(null);
  
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      if (timerRef.current) clearTimeout(timerRef.current);
      onGameComplete(score * level); // Score multiplied by level
      return;
    }

    timerRef.current = setTimeout(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => {
      if(timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, score, level, onGameComplete]);
  
  const moveTarget = () => {
      if (gameAreaRef.current) {
          const areaWidth = gameAreaRef.current.offsetWidth;
          const areaHeight = gameAreaRef.current.offsetHeight;
          
          const newLeft = Math.random() * (areaWidth - targetSize);
          const newTop = Math.random() * (areaHeight - targetSize);

          setTargetPosition({ top: `${newTop}px`, left: `${newLeft}px` });
      }
  }

  // Initial target position
  useEffect(() => {
    const timeoutId = setTimeout(moveTarget, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleTargetClick = () => {
    setScore(prevScore => prevScore + 10);
    moveTarget();
  };

  const timePercentage = (timeLeft / gameDuration) * 100;

  return (
    <div className="flex flex-col items-center justify-between h-full text-white">
      <div className="w-full flex justify-between items-center p-4 bg-slate-700/50 rounded-lg">
        <div className="text-left">
          <p className="text-sm text-slate-400">Score</p>
          <p className="text-3xl font-bold text-sky-300">{score}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-400">Time Left</p>
          <p className="text-3xl font-bold text-violet-300">{timeLeft}s</p>
        </div>
      </div>
      
       <div className="w-full bg-slate-600 rounded-full h-2.5 my-4">
          <div className="bg-gradient-to-r from-sky-400 to-violet-500 h-2.5 rounded-full" style={{ width: `${timePercentage}%`, transition: 'width 0.2s linear' }}></div>
      </div>

      <div ref={gameAreaRef} className="relative w-full flex-grow bg-slate-900/50 rounded-lg overflow-hidden cursor-crosshair">
        <button
          onClick={handleTargetClick}
          className="absolute bg-green-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-green-400/50 transition-all duration-100 ease-in-out hover:scale-110 animate-pulse"
          style={{ 
            top: targetPosition.top, 
            left: targetPosition.left,
            width: `${targetSize}px`,
            height: `${targetSize}px`,
          }}
        >
        </button>
      </div>
    </div>
  );
};

export default QuickTapGame;