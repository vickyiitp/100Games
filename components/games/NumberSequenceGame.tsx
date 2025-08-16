import React, { useState, useEffect, useMemo } from 'react';

type SequenceType = 'arithmetic' | 'geometric' | 'fibonacci';

interface SequenceProblem {
  sequence: number[];
  answer: number;
}

const generateSequence = (level: number): SequenceProblem => {
  const type: SequenceType = ['arithmetic', 'geometric', 'fibonacci'][Math.floor(Math.random() * 3)] as SequenceType;
  let sequence: number[] = [];
  let answer = 0;
  
  const start = Math.floor(Math.random() * 5) + level;
  const diff = Math.floor(Math.random() * 3) + 1;

  switch(type) {
    case 'arithmetic':
      for (let i = 0; i < 4; i++) sequence.push(start + i * diff);
      answer = start + 4 * diff;
      break;
    case 'geometric':
       for (let i = 0; i < 4; i++) sequence.push(start * Math.pow(diff, i));
       answer = start * Math.pow(diff, 4);
       break;
    case 'fibonacci':
      sequence = [start, start + diff];
      for (let i = 2; i < 4; i++) sequence.push(sequence[i-1] + sequence[i-2]);
      answer = sequence[2] + sequence[3];
      break;
  }
  return { sequence, answer };
}

interface NumberSequenceGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const NumberSequenceGame: React.FC<NumberSequenceGameProps> = ({ level, onGameComplete }) => {
  const [problem, setProblem] = useState<SequenceProblem>({ sequence: [], answer: 0 });
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(20);
  
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setProblem(generateSequence(level));
    setTimeLeft(20 - Math.min(10, level)); // Time decreases with level
  }, [level]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onGameComplete(0); // Fail if time runs out
      return;
    }
    timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [timeLeft, onGameComplete]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (timerRef.current) clearTimeout(timerRef.current);
    
    const score = parseInt(userInput) === problem.answer ? timeLeft * 10 * level : 0;
    onGameComplete(score);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-white text-center">
      <div className="absolute top-4 right-4 text-2xl font-bold text-violet-300">{timeLeft}s</div>
      <h3 className="text-xl text-slate-400 mb-4">Find the next number in the sequence:</h3>
      <div className="flex gap-4 md:gap-8 text-5xl md:text-6xl font-extrabold text-sky-300 mb-8 p-4">
        {problem.sequence.map((num, i) => <span key={i}>{num}</span>)}
        <span>?</span>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
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

export default NumberSequenceGame;
