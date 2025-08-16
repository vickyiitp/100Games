import React, { useState, useMemo } from 'react';

const WORDS = ["MIND", "SPARK", "LOGIC", "FOCUS", "MEMORY", "BRAIN"];
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

interface HangmanGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const HangmanGame: React.FC<HangmanGameProps> = ({ level, onGameComplete }) => {
    const word = useMemo(() => WORDS[level % WORDS.length], [level]);
    const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
    const [wrongGuesses, setWrongGuesses] = useState(0);
    const maxWrongGuesses = 6;
    
    const handleGuess = (letter: string) => {
        if (guessedLetters.has(letter)) return;
        
        const newGuessed = new Set(guessedLetters).add(letter);
        setGuessedLetters(newGuessed);

        if (!word.includes(letter)) {
            setWrongGuesses(w => w + 1);
        }
    };

    const isWin = word.split('').every(letter => guessedLetters.has(letter));
    const isLoss = wrongGuesses >= maxWrongGuesses;

    if (isWin) {
        onGameComplete((maxWrongGuesses - wrongGuesses) * 50 * level);
    } else if (isLoss) {
        onGameComplete(0);
    }

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Hangman</h3>
            <p className="text-slate-400 mb-4">Wrong Guesses: {wrongGuesses} / {maxWrongGuesses}</p>

            <div className="flex gap-4 text-4xl font-mono tracking-widest mb-8">
                {word.split('').map((letter, i) => (
                    <span key={i} className="w-10 border-b-4">{guessedLetters.has(letter) ? letter : ''}</span>
                ))}
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 max-w-md">
                {!isWin && !isLoss && ALPHABET.map(letter => (
                    <button 
                        key={letter}
                        onClick={() => handleGuess(letter)}
                        disabled={guessedLetters.has(letter)}
                        className="w-10 h-10 bg-slate-700 rounded-md font-bold disabled:bg-slate-800 disabled:text-slate-500"
                    >
                        {letter}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default HangmanGame;