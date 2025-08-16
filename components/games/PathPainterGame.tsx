import React, { useState, useEffect, useCallback } from 'react';

interface PathPainterGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const GRID_SIZE = 5;

const PathPainterGame: React.FC<PathPainterGameProps> = ({ level, onGameComplete }) => {
    const [path, setPath] = useState<number[]>([]);
    const [playerPath, setPlayerPath] = useState<number[]>([0]);
    const [gameState, setGameState] = useState<'watching' | 'playing'>('watching');
    const [litTile, setLitTile] = useState<number | null>(null);

    const pathLength = 4 + level;

    const generatePath = useCallback(() => {
        const newPath: number[] = [0];
        let currentPos = 0;
        const visited = new Set([0]);

        while (newPath.length < pathLength) {
            const x = currentPos % GRID_SIZE;
            const y = Math.floor(currentPos / GRID_SIZE);
            const moves: number[] = [];
            if (x > 0 && !visited.has(currentPos - 1)) moves.push(currentPos - 1);
            if (x < GRID_SIZE - 1 && !visited.has(currentPos + 1)) moves.push(currentPos + 1);
            if (y > 0 && !visited.has(currentPos - GRID_SIZE)) moves.push(currentPos - GRID_SIZE);
            if (y < GRID_SIZE - 1 && !visited.has(currentPos + GRID_SIZE)) moves.push(currentPos + GRID_SIZE);

            if (moves.length === 0) break; // Trapped, rare case

            const nextPos = moves[Math.floor(Math.random() * moves.length)];
            newPath.push(nextPos);
            visited.add(nextPos);
            currentPos = nextPos;
        }
        setPath(newPath);
        setPlayerPath([0]);
        setGameState('watching');
    }, [pathLength]);

    useEffect(() => {
        generatePath();
    }, [level, generatePath]);
    
    useEffect(() => {
        if (gameState === 'watching' && path.length > 0) {
            let i = 0;
            const interval = setInterval(() => {
                setLitTile(path[i]);
                i++;
                if (i >= path.length) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setLitTile(null);
                        setGameState('playing');
                    }, 500);
                }
            }, 500);
        }
    }, [gameState, path]);

    const handleTileClick = (index: number) => {
        if (gameState !== 'playing') return;
        const lastPlayerPos = playerPath[playerPath.length-1];
        if (path[playerPath.length] === index) {
            const newPlayerPath = [...playerPath, index];
            setPlayerPath(newPlayerPath);
            if (newPlayerPath.length === path.length) {
                onGameComplete(path.length * 10 * level);
            }
        } else {
            // Incorrect path
            onGameComplete(0);
        }
    };
    
    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-4">
                {gameState === 'watching' ? 'Memorize the Path' : 'Redraw the Path'}
            </h3>
            <div className="grid grid-cols-5 gap-2 p-2 bg-slate-900/50 rounded-lg">
                {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
                    let tileClass = 'w-16 h-16 rounded-md bg-slate-700';
                    if (litTile === index || playerPath.includes(index)) {
                        tileClass = 'w-16 h-16 rounded-md bg-sky-400';
                    }
                    if(gameState === 'playing') tileClass += ' hover:bg-slate-600 cursor-pointer';
                    return <div key={index} className={tileClass} onClick={() => handleTileClick(index)} />;
                })}
            </div>
        </div>
    );
};

export default PathPainterGame;