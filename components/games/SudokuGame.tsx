import React, { useState, useMemo } from 'react';

// Simplified: Using a single, fixed 9x9 puzzle for demonstration.
const PUZZLE_STRING = "53__7____6__195____98____6_8___6___34__8_3__17___2___6_6____28____419__5____8__79";
const SOLUTION_STRING = "534678912672195348198342567859761423426853791713924856961537284287419635345286179";

interface SudokuGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const SudokuGame: React.FC<SudokuGameProps> = ({ level, onGameComplete }) => {
    const [board, setBoard] = useState<(number | null)[]>([]);
    
    useMemo(() => {
        const puzzleArray = PUZZLE_STRING.split('').map(c => c === '_' ? null : parseInt(c));
        setBoard(puzzleArray);
    }, [level]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newBoard = [...board];
        const val = parseInt(e.target.value);
        newBoard[index] = isNaN(val) ? null : val % 10;
        setBoard(newBoard);
    };

    const checkSolution = () => {
        const isCorrect = board.join('') === SOLUTION_STRING;
        onGameComplete(isCorrect ? 500 * level : 0);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Sudoku</h3>
            <div className="grid grid-cols-9 gap-px bg-slate-600 p-1 rounded-lg">
                {board.map((cell, i) => {
                    const isInitial = PUZZLE_STRING[i] !== '_';
                    const borderStyle = "border-slate-600";
                    const rightBorder = (i % 9 === 2 || i % 9 === 5) ? "border-r-2" : "border-r";
                    const bottomBorder = (Math.floor(i / 9) === 2 || Math.floor(i / 9) === 5) ? "border-b-2" : "border-b";

                    return (
                        <input
                            key={i}
                            type="number"
                            min="1" max="9"
                            value={cell || ''}
                            onChange={(e) => handleInputChange(e, i)}
                            disabled={isInitial}
                            className={`w-10 h-10 bg-slate-800 text-white text-2xl text-center font-bold
                                ${rightBorder} ${bottomBorder} ${borderStyle}
                                disabled:bg-slate-700 disabled:text-sky-300 focus:outline-none focus:bg-slate-600`}
                        />
                    );
                })}
            </div>
            <button onClick={checkSolution} className="mt-6 px-8 py-3 bg-green-600 rounded-full font-bold">Check</button>
        </div>
    );
};

export default SudokuGame;