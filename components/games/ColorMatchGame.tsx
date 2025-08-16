import React, { useState, useEffect, useMemo } from 'react';

const COLORS = {
    'red': 'text-red-500',
    'blue': 'text-blue-500',
    'green': 'text-green-500',
    'yellow': 'text-yellow-500',
    'purple': 'text-purple-500',
};
const COLOR_NAMES = Object.keys(COLORS);

interface ColorMatchGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const ColorMatchGame: React.FC<ColorMatchGameProps> = ({ level, onGameComplete }) => {
  const [word, setWord] = useState('');
  const [colorClass, setColorClass] = useState('');
  const [isMatch, setIsMatch] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const generateNewChallenge = () => {
    const randomWord = COLOR_NAMES[Math.floor(Math.random() * COLOR_NAMES.length)];
    const randomColorName = COLOR_NAMES[Math.floor(Math.random() * COLOR_NAMES.length)];
    
    setWord(randomWord);
    setColorClass(COLORS[randomColorName as keyof typeof COLORS]);
    setIsMatch(randomWord === randomColorName);
  };
  
  useEffect(() => {
    generateNewChallenge();
  }, [level]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onGameComplete(score);
      return;
    }
    timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [timeLeft, score, onGameComplete]);

  const handleAnswer = (userThinksItMatches: boolean) => {
    if (userThinksItMatches === isMatch) {
      setScore(s => s + 10 * level);
    } else {
      setScore(s => Math.max(0, s - 5 * level));
    }
    generateNewChallenge();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-white text-center">
        <div className="w-full flex justify-between items-center p-4 bg-slate-700/50 rounded-lg mb-8">
            <div className="text-left">
                <p className="text-sm text-slate-400">Score</p>
                <p className="text-3xl font-bold text-sky-300">{score}</p>
            </div>
            <div className="text-right">
                <p className="text-sm text-slate-400">Time Left</p>
                <p className="text-3xl font-bold text-violet-300">{timeLeft}s</p>
            </div>
        </div>

        <h3 className="text-2xl text-slate-300 mb-4">Does the word match the color?</h3>
        <p className={`text-7xl font-extrabold tracking-widest ${colorClass} mb-12`}>
            {word.toUpperCase()}
        </p>

        <div className="flex gap-8">
            <button 
                onClick={() => handleAnswer(true)}
                className="px-10 py-4 bg-green-600 rounded-full font-bold text-2xl hover:bg-green-500 transition-colors transform hover:scale-105">
                Match
            </button>
            <button 
                onClick={() => handleAnswer(false)}
                className="px-10 py-4 bg-red-600 rounded-full font-bold text-2xl hover:bg-red-500 transition-colors transform hover:scale-105">
                Mismatch
            </button>
        </div>
    </div>
  );
};

export default ColorMatchGame;
