import React, { useState, useEffect, useMemo } from 'react';

const WORD_LADDERS = [
  { start: "CAT", end: "DOG", dict: ["CAT", "COT", "COG", "DOG"] },
  { start: "PIG", end: "STY", dict: ["PIG", "PIGS", "PIT", "PAT", "PAY", "SAY", "STY"] },
  { start: "COLD", end: "WARM", dict: ["COLD", "CORD", "WORD", "WARD", "WARM"] },
  { start: "HEAD", end: "TAIL", dict: ["HEAD", "HEAL", "TEAL", "TELL", "TALL", "TAIL"] },
];

interface WordLadderGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const WordLadderGame: React.FC<WordLadderGameProps> = ({ level, onGameComplete }) => {
  const { start, end, dict } = useMemo(() => WORD_LADDERS[level % WORD_LADDERS.length], [level]);
  
  const [path, setPath] = useState<string[]>([start]);
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState('');

  const isOneLetterApart = (word1: string, word2: string) => {
    if (word1.length !== word2.length) return false;
    let diffs = 0;
    for (let i = 0; i < word1.length; i++) {
      if (word1[i] !== word2[i]) diffs++;
    }
    return diffs === 1;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newWord = userInput.toUpperCase();
      const lastWord = path[path.length - 1];

      if (!isOneLetterApart(lastWord, newWord)) {
          setError("Must be one letter different.");
          return;
      }
      // In a real game, you'd check a full dictionary. Here, we use the provided one.
      if (dict && !dict.includes(newWord)) {
          setError("Not a valid word in this puzzle.");
          return;
      }
      
      const newPath = [...path, newWord];
      setPath(newPath);
      setUserInput('');
      setError('');

      if (newWord === end) {
          const score = Math.max(0, (10 - newPath.length) * 100 * level);
          onGameComplete(score);
      }
  };

  return (
    <div className="flex flex-col items-center justify-start h-full text-white text-center">
      <h3 className="text-2xl font-bold mb-2">Word Ladder</h3>
      <p className="text-slate-400 mb-4">Change one letter at a time to get from START to END.</p>

      <div className="flex justify-between w-full max-w-sm mb-4 text-xl">
        <div className="text-left">
            <p className="text-sm text-slate-500">START</p>
            <p className="font-bold text-sky-300">{start}</p>
        </div>
        <div className="text-right">
            <p className="text-sm text-slate-500">END</p>
            <p className="font-bold text-violet-300">{end}</p>
        </div>
      </div>
      
      <div className="w-full max-w-sm bg-slate-900/50 p-4 rounded-lg mb-4 h-48 overflow-y-auto">
          {path.map((word, index) => (
              <p key={index} className="text-2xl font-mono tracking-widest">{word}</p>
          ))}
      </div>
      
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          maxLength={start.length}
          autoFocus
          className="w-full text-center uppercase font-mono tracking-widest text-2xl p-3 bg-slate-700 border-2 border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        {error && <p className="text-red-400 mt-2">{error}</p>}
        <button type="submit" className="mt-4 px-8 py-3 bg-green-600 rounded-full font-bold text-lg hover:bg-green-500 transition-colors">
          Add Word
        </button>
      </form>
    </div>
  );
};

export default WordLadderGame;
