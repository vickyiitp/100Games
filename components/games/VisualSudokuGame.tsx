import React, { useState, useEffect } from 'react';
import { CircleIcon, SquareIcon, TriangleIcon, StarIcon } from '../Icons';

const ICONS = [
    (props: any) => <CircleIcon {...props} className="w-8 h-8 text-red-400" />,
    (props: any) => <SquareIcon {...props} className="w-8 h-8 text-blue-400" />,
    (props: any) => <TriangleIcon {...props} className="w-8 h-8 text-green-400" />,
    (props: any) => <StarIcon {...props} className="w-8 h-8 text-yellow-400" />,
];

// This is a very simplified Sudoku. A real one would need a proper generator and solver.
const PUZZLE = [
    [0, 1, null, null],
    [null, null, 0, 1],
    [null, null, 3, 2],
    [3, 2, null, null],
];
const SOLUTION = [
    [0, 1, 2, 3],
    [2, 3, 0, 1],
    [1, 0, 3, 2],
    [3, 2, 1, 0],
];

interface VisualSudokuGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const VisualSudokuGame: React.FC<VisualSudokuGameProps> = ({ level, onGameComplete }) => {
    const [board, setBoard] = useState<(number | null)[]>([]);
    const [initialBoard, setInitialBoard] = useState<(number | null)[]>([]);

    useEffect(() => {
        // Using a fixed puzzle for simplicity
        const flatPuzzle = PUZZLE.flat();
        setBoard(flatPuzzle);
        setInitialBoard(flatPuzzle);
    }, [level]);

    const handleTileClick = (index: number) => {
        if (initialBoard[index] !== null) return; // Don't change initial tiles

        const newBoard = [...board];
        const currentValue = newBoard[index];
        newBoard[index] = currentValue === null ? 0 : (currentValue + 1) % ICONS.length;
        setBoard(newBoard);
    };

    const checkSolution = () => {
        const isCorrect = board.toString() === SOLUTION.flat().toString();
        onGameComplete(isCorrect ? 200 * level : 0);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-2">Visual Sudoku</h3>
            <p className="text-slate-400 mb-6 max-w-sm">Fill the grid so each icon appears once per row, column, and 2x2 box.</p>

            <div className="grid grid-cols-4 gap-1 p-2 bg-slate-900/50 rounded-lg">
                {board.map((value, index) => {
                    const Icon = value !== null ? ICONS[value] : null;
                    const isInitial = initialBoard[index] !== null;
                    const row = Math.floor(index / 4);
                    const col = index % 4;
                    const isDarker = (Math.floor(row / 2) + Math.floor(col / 2)) % 2 === 0;

                    return (
                        <button
                            key={index}
                            onClick={() => handleTileClick(index)}
                            className={`w-16 h-16 flex items-center justify-center rounded-md 
                                ${isDarker ? 'bg-slate-800' : 'bg-slate-700'}
                                ${!isInitial ? 'cursor-pointer hover:bg-slate-600' : ''}
                            `}
                        >
                            {Icon && <Icon />}
                        </button>
                    );
                })}
            </div>
             <button onClick={checkSolution} className="mt-6 px-8 py-3 bg-green-600 rounded-full font-bold text-lg hover:bg-green-500 transition-colors">
                Check Solution
            </button>
        </div>
    );
};

export default VisualSudokuGame;