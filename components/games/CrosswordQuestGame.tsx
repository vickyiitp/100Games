import React, { useState, useMemo } from 'react';

const PUZZLES = [
    {
        grid: ["C A T", " R  ", "E G G"],
        solution: ["C A T", "A R M", "E G G"],
        clues: { across: ["1. Feline pet", "3. Farm animal product"], down: ["1. Appendage with a hand", "2. A vehicle"] }
    }
];

interface CrosswordQuestGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const CrosswordQuestGame: React.FC<CrosswordQuestGameProps> = ({ level, onGameComplete }) => {
    const puzzle = useMemo(() => PUZZLES[level % PUZZLES.length], [level]);
    const [grid, setGrid] = useState(() => puzzle.grid.join("").replace(/\s/g, '').split(''));

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newGrid = [...grid];
        newGrid[index] = e.target.value.toUpperCase();
        setGrid(newGrid);
    };
    
    const checkSolution = () => {
        const solutionString = puzzle.solution.join("").replace(/\s/g, '');
        if (grid.join('') === solutionString) {
            onGameComplete(100 * level);
        } else {
            onGameComplete(0);
        }
    };

    return (
        <div className="flex flex-col items-center justify-start h-full text-white">
            <h3 className="text-2xl font-bold mb-4">Crossword Quest</h3>
            <div className="flex gap-8">
                <div className="grid grid-cols-3 gap-1 bg-slate-900 p-2 rounded-lg">
                    {puzzle.grid.join("").replace(/\s/g, '').split('').map((char, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={grid[index] || ''}
                            onChange={(e) => handleInputChange(e, index)}
                            disabled={char !== ' '}
                            className="w-16 h-16 bg-slate-700 text-white text-3xl text-center font-bold uppercase rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:bg-slate-800 disabled:text-slate-400"
                        />
                    ))}
                </div>
                <div className="text-left">
                    <div className="mb-4">
                        <h4 className="font-bold text-sky-300">Across</h4>
                        {Object.values(puzzle.clues.across).map(clue => <p key={clue}>{clue}</p>)}
                    </div>
                    <div>
                        <h4 className="font-bold text-violet-300">Down</h4>
                        {Object.values(puzzle.clues.down).map(clue => <p key={clue}>{clue}</p>)}
                    </div>
                </div>
            </div>
             <button onClick={checkSolution} className="mt-6 px-8 py-3 bg-green-600 rounded-full font-bold text-lg hover:bg-green-500 transition-colors">
                Check Puzzle
            </button>
        </div>
    );
};

export default CrosswordQuestGame;