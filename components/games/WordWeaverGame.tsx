import React, { useState, useEffect } from 'react';

// A very small dictionary for demonstration
const DICTIONARY = ["ART", "RAT", "TAR", "CAR", "ARC", "CAT", "ARM", "RAM", "MAP", "MAR", "PAT", "TAP", "TRAM", "CART", "TRAP", "PART", "CAMP", "CRAM"];

interface WordWeaverGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const WordWeaverGame: React.FC<WordWeaverGameProps> = ({ level, onGameComplete }) => {
    const [grid, setGrid] = useState<string[]>([]);
    const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
    const [currentInput, setCurrentInput] = useState('');
    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(() => {
        const alphabet = "ABCDEFGHIJKLMNOPRSTUVWXYZ"; // Common letters
        const newGrid = Array.from({ length: 16 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]);
        setGrid(newGrid);
        setFoundWords(new Set());
    }, [level]);

    useEffect(() => {
        if (timeLeft <= 0) {
            const score = Array.from(foundWords).reduce((sum, word) => sum + word.length * 10, 0);
            onGameComplete(score * level);
            return;
        }
        const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
        return () => clearTimeout(timer);
    }, [timeLeft, onGameComplete, foundWords, level]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const word = currentInput.toUpperCase();
        if (word.length > 2 && DICTIONARY.includes(word) && !foundWords.has(word)) {
            // A real version would also check if the word can be formed on the grid
            setFoundWords(new Set(foundWords).add(word));
        }
        setCurrentInput('');
    };

    return (
        <div className="flex flex-col items-center justify-start h-full text-white">
            <div className="w-full grid grid-cols-3 gap-4 text-center p-2 bg-slate-700/50 rounded-lg mb-4">
                <div><p className="text-sm">Time</p><p className="font-bold">{timeLeft}</p></div>
                <div><p className="text-sm">Words</p><p className="font-bold">{foundWords.size}</p></div>
                <div><p className="text-sm">Score</p><p className="font-bold">{Array.from(foundWords).reduce((sum, word) => sum + word.length * 10, 0)}</p></div>
            </div>
            <div className="flex gap-8">
                <div className="grid grid-cols-4 gap-2 p-2 bg-slate-900/50 rounded-lg">
                    {grid.map((char, i) => (
                        <div key={i} className="w-12 h-12 flex items-center justify-center bg-slate-700 text-2xl font-bold rounded-md">{char}</div>
                    ))}
                </div>
                <div className="w-48">
                    <h4 className="font-bold mb-2">Found Words:</h4>
                    <div className="h-48 bg-slate-800/50 p-2 rounded-md overflow-y-auto">
                        {Array.from(foundWords).sort().map(word => <p key={word}>{word}</p>)}
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="mt-4">
                <input
                    type="text"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    className="w-48 p-2 bg-slate-700 rounded-md text-center uppercase"
                />
                <button type="submit" className="ml-2 px-4 py-2 bg-sky-600 rounded-md">Add</button>
            </form>
        </div>
    );
};

export default WordWeaverGame;