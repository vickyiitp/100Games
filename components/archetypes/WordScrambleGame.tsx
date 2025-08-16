
import React, { useState, useEffect } from 'react';
import { Game } from '../../types';

const WORDS_BY_DIFFICULTY = [
  ['mind', 'game', 'play', 'hub'],
  ['spark', 'logic', 'focus', 'level'],
  ['brain', 'memory', 'boost', 'swift'],
  ['timing', 'puzzle', 'visual', 'solve'],
  ['neuron', 'reflex', 'growth', 'nimble'],
  ['pattern', 'creativ', 'imagine', 'synapse'],
  ['strategy', 'decision', 'intellect', 'complex'],
  ['emotional', 'intelligence', 'cognitive', 'challenge'],
];

interface WordScrambleGameProps {
  level: number;
  onGameComplete: (score: number) => void;
  game: Game;
}

const WordScrambleGame: React.FC<WordScrambleGameProps> = ({ level, onGameComplete }) => {
  const [word, setWord] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(15);
  
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const wordList = WORDS_BY_DIFFICULTY[Math.min(level - 1, WORDS_BY_DIFFICULTY.length - 1)];
    const newWord = wordList[Math.floor(Math.random() * wordList.length)];
    setWord(newWord);
    
    let scrambled = newWord.split('').sort(() => Math.random() - 0.5).join('');
    while (scrambled === newWord) {
      scrambled = newWord.split('').sort(() => Math.random() - 0.5).join('');
    }
    setScrambledWord(scrambled);
    setUserInput('');
    setTimeLeft(15 + Math.floor(level/2) * 5);
  }, [level]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onGameComplete(0);
      return;
    }
    timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [timeLeft, onGameComplete]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.toLowerCase() === word) {
      if(timerRef.current) clearTimeout(timerRef.current);
      const score = timeLeft * 10 * level;
      onGameComplete(score);
    } else {
      setUserInput('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-white text-center">
      <div className="absolute top-4 right-4 text-2xl font-bold text-violet-300">{timeLeft}s</div>
      <h3 className="text-xl text-slate-400 mb-4">Unscramble the word:</h3>
      <p className="text-5xl md:text-6xl font-extrabold tracking-widest text-sky-300 mb-8 p-4 bg-slate-700/50 rounded-lg">
        {scrambledWord.toUpperCase()}
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          autoFocus
          className="w-80 text-center text-2xl p-4 bg-slate-900 border-2 border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-300"
        />
        <button type="submit" className="mt-6 px-8 py-3 bg-green-600 rounded-full font-bold text-lg hover:bg-green-500 transition-colors">
          Submit
        </button>
      </form>
    </div>
  );
};

export default WordScrambleGame;
