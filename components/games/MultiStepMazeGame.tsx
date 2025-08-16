import React, { useState, useMemo } from 'react';

// Using a predefined maze for simplicity
const MAZE_LAYOUT = [
    "S.W.",
    ".W..",
    ".W.W",
    "...E",
];
const MAZE_SIZE = 4;

interface MultiStepMazeGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const MultiStepMazeGame: React.FC<MultiStepMazeGameProps> = ({ level, onGameComplete }) => {
    const [moves, setMoves] = useState<string[]>([]);
    const [feedback, setFeedback] = useState('');

    const addMove = (move: string) => setMoves(m => [...m, move]);
    const clearMoves = () => setMoves([]);

    const executeMoves = () => {
        let x = 0, y = 0; // Start at S(0,0)
        let hasWon = false;

        for (const move of moves) {
            if (move === 'U' && y > 0) y--;
            if (move === 'D' && y < MAZE_SIZE - 1) y++;
            if (move === 'L' && x > 0) x--;
            if (move === 'R' && x < MAZE_SIZE - 1) x++;

            const cell = MAZE_LAYOUT[y][x];
            if (cell === 'W') {
                setFeedback('You hit a wall!');
                onGameComplete(0);
                return;
            }
            if (cell === 'E') {
                hasWon = true;
                break;
            }
        }
        
        if (hasWon) {
            setFeedback('You reached the end!');
            onGameComplete(100 * level);
        } else {
            setFeedback("You didn't reach the end.");
            onGameComplete(0);
        }
    };

    return (
        <div className="flex flex-col items-center justify-start h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-2">Multi-Step Maze</h3>
            <p className="text-slate-400 mb-4">Plan your moves in advance to get from S to E.</p>
            
            <div className="grid grid-cols-4 gap-1 p-2 bg-slate-900/50 rounded-lg mb-4">
                {MAZE_LAYOUT.join('').split('').map((cell, i) => (
                    <div key={i} className={`w-12 h-12 flex items-center justify-center font-bold text-xl ${cell === 'W' ? 'bg-slate-800' : 'bg-slate-600'}`}>
                        {cell !== '.' && cell}
                    </div>
                ))}
            </div>

            <div className="w-full max-w-sm h-12 p-2 bg-slate-700 rounded-md mb-4 font-mono text-2xl">
                {moves.join(' ')}
            </div>

            <div className="flex gap-4 mb-4">
                <button onClick={() => addMove('U')} className="w-12 h-12 bg-slate-600 rounded-md font-bold">U</button>
                <button onClick={() => addMove('D')} className="w-12 h-12 bg-slate-600 rounded-md font-bold">D</button>
                <button onClick={() => addMove('L')} className="w-12 h-12 bg-slate-600 rounded-md font-bold">L</button>
                <button onClick={() => addMove('R')} className="w-12 h-12 bg-slate-600 rounded-md font-bold">R</button>
                <button onClick={clearMoves} className="p-3 bg-red-600 rounded-md font-bold">Clear</button>
            </div>
            
            <button onClick={executeMoves} className="px-8 py-3 bg-green-600 rounded-full font-bold">Execute</button>
            {feedback && <p className="mt-4 text-lg">{feedback}</p>}
        </div>
    );
};

export default MultiStepMazeGame;