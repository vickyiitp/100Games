import React, { useState, useMemo } from 'react';
import { CircleIcon, SquareIcon, TriangleIcon, StarIcon } from '../Icons';

const ICONS = [
    (props: any) => <CircleIcon {...props} />,
    (props: any) => <SquareIcon {...props} />,
    (props: any) => <TriangleIcon {...props} />,
    (props: any) => <StarIcon {...props} />,
];

// Simplified: each tile is just one icon for this version
interface LogicalDominoesGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const LogicalDominoesGame: React.FC<LogicalDominoesGameProps> = ({ level, onGameComplete }) => {
    const gridSize = 3;
    const [board, setBoard] = useState<(number | null)[]>(Array(gridSize * gridSize).fill(null));
    const [hand, setHand] = useState<number[]>([]);
    const [selectedTile, setSelectedTile] = useState<number | null>(null);

    useMemo(() => {
        const newHand: number[] = [];
        for (let i = 0; i < 5 + level; i++) {
            newHand.push(Math.floor(Math.random() * ICONS.length));
        }
        setHand(newHand);
        const newBoard = Array(gridSize * gridSize).fill(null);
        newBoard[4] = Math.floor(Math.random() * ICONS.length); // Start tile
        setBoard(newBoard);
    }, [level]);

    const handleHandClick = (tile: number, index: number) => {
        setSelectedTile(tile);
    };

    const handleBoardClick = (index: number) => {
        if (selectedTile === null || board[index] !== null) return;

        const x = index % gridSize;
        const y = Math.floor(index / gridSize);
        let isValid = false;
        // Check neighbors
        if (x > 0 && board[index - 1] === selectedTile) isValid = true;
        if (x < gridSize - 1 && board[index + 1] === selectedTile) isValid = true;
        if (y > 0 && board[index - gridSize] === selectedTile) isValid = true;
        if (y < gridSize - 1 && board[index + gridSize] === selectedTile) isValid = true;

        if (isValid) {
            const newBoard = [...board];
            newBoard[index] = selectedTile;
            setBoard(newBoard);
            setHand(h => h.filter((_, i) => h[i] !== selectedTile)); // Simple removal
            setSelectedTile(null);
        }
        
        if(hand.length <=1 && isValid){
             onGameComplete(100*level);
        } else if (hand.length <=1 && !isValid) {
             onGameComplete(0);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-2">Logical Dominoes</h3>
            <p className="text-slate-400 mb-6">Place tiles so they match their neighbors.</p>
            
            <div className="grid grid-cols-3 gap-2 p-2 bg-slate-900/50 rounded-lg mb-8">
                {board.map((tile, i) => {
                    const Icon = tile !== null ? ICONS[tile] : null;
                    return (
                        <div key={i} onClick={() => handleBoardClick(i)} className="w-20 h-20 flex items-center justify-center bg-slate-700 rounded-md cursor-pointer">
                           {Icon && <Icon className="w-12 h-12" />}
                        </div>
                    );
                })}
            </div>
            
            <div className="flex gap-4 p-4 bg-slate-700/50 rounded-lg">
                 {hand.map((tile, i) => {
                    const Icon = ICONS[tile];
                    return (
                        <div key={i} onClick={() => handleHandClick(tile, i)} className={`w-16 h-16 p-2 rounded-md cursor-pointer ${selectedTile === tile ? 'bg-sky-500' : 'bg-slate-600'}`}>
                           <Icon className="w-full h-full" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LogicalDominoesGame;