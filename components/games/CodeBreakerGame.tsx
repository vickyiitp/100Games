import React, { useState, useEffect, useMemo } from 'react';

const COLORS = ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500', 'bg-orange-500'];

interface Guess {
  pegs: string[];
  feedback: { correctPosition: number; correctColor: number };
}

interface CodeBreakerGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const CodeBreakerGame: React.FC<CodeBreakerGameProps> = ({ level, onGameComplete }) => {
  const codeLength = useMemo(() => Math.min(6, 3 + Math.floor(level / 2)), [level]);
  const maxAttempts = 10;
  
  const [secretCode, setSecretCode] = useState<string[]>([]);
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string[]>([]);
  const [isWinner, setIsWinner] = useState(false);

  useEffect(() => {
    const newCode = Array.from({ length: codeLength }, () => COLORS[Math.floor(Math.random() * COLORS.length)]);
    setSecretCode(newCode);
    setGuesses([]);
    setCurrentGuess(Array(codeLength).fill(''));
    setIsWinner(false);
  }, [level, codeLength]);

  const handlePegClick = (color: string) => {
    const newGuess = [...currentGuess];
    const firstEmptyIndex = newGuess.findIndex(peg => peg === '');
    if (firstEmptyIndex !== -1) {
      newGuess[firstEmptyIndex] = color;
      setCurrentGuess(newGuess);
    }
  };
  
  const handleSubmitGuess = () => {
    if (currentGuess.includes('')) return;

    let correctPosition = 0;
    let correctColor = 0;
    const codeCheck = [...secretCode];
    const guessCheck = [...currentGuess];

    // Check for correct position
    for (let i = 0; i < codeLength; i++) {
      if (guessCheck[i] === codeCheck[i]) {
        correctPosition++;
        codeCheck[i] = '';
        guessCheck[i] = '';
      }
    }
    
    // Check for correct color in wrong position
    for (let i = 0; i < codeLength; i++) {
      if (guessCheck[i] !== '') {
        const colorIndex = codeCheck.indexOf(guessCheck[i]);
        if (colorIndex !== -1) {
          correctColor++;
          codeCheck[colorIndex] = '';
        }
      }
    }

    const newGuesses = [...guesses, { pegs: currentGuess, feedback: { correctPosition, correctColor } }];
    setGuesses(newGuesses);
    setCurrentGuess(Array(codeLength).fill(''));
    
    if (correctPosition === codeLength) {
      setIsWinner(true);
      const score = (maxAttempts - newGuesses.length + 1) * 100 * level;
      onGameComplete(score);
    } else if (newGuesses.length >= maxAttempts) {
      onGameComplete(0);
    }
  };

  return (
    <div className="flex flex-col items-center justify-around h-full text-white">
      <div>
        <h3 className="text-2xl font-bold">Break the Code!</h3>
        <p className="text-slate-400">Attempts left: {maxAttempts - guesses.length}</p>
      </div>
      
      <div className="w-full flex flex-col items-center gap-2">
        {guesses.map((guess, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="flex gap-2">
              {guess.pegs.map((peg, j) => <div key={j} className={`w-8 h-8 rounded-full ${peg}`}></div>)}
            </div>
            <div className="flex flex-col">
              <p className="text-xs">Correct Position: {guess.feedback.correctPosition}</p>
              <p className="text-xs">Correct Color: {guess.feedback.correctColor}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 p-2 bg-slate-700/50 rounded-lg">
          {currentGuess.map((peg, i) => (
            <div key={i} className={`w-10 h-10 rounded-full border-2 border-slate-500 ${peg}`}></div>
          ))}
        </div>
        <div className="flex gap-2">
          {COLORS.slice(0, codeLength + 1).map(color => (
            <button key={color} onClick={() => handlePegClick(color)} className={`w-10 h-10 rounded-full ${color} hover:scale-110 transition-transform`}></button>
          ))}
        </div>
        <button onClick={handleSubmitGuess} className="px-6 py-2 bg-sky-500 rounded-full font-bold">Submit Guess</button>
      </div>
    </div>
  );
};

export default CodeBreakerGame;
