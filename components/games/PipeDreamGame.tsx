import React, { useState, useEffect } from 'react';
import { PipeIcon } from '../Icons'; // Assuming a generic pipe icon exists

// Simplified pipe representation: 0=empty, 1=straight(L-R), 2=corner(L-D), S=start, E=end
const PIPE_TYPES = [' ', '─', '┐', '│', '└', '┘', '┌']; // 0, 1, 2, 3, 4, 5, 6
const ROTATIONS = { 1: 3, 3: 1, 2: 5, 5: 4, 4: 6, 6: 2 };

interface PipeDreamGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const PipeDreamGame: React.FC<PipeDreamGameProps> = ({ level, onGameComplete }) => {
    const gridSize = 5;
    const [board, setBoard] = useState<(number | 'S' | 'E')[]>([]);

    useEffect(() => {
        const newBoard: (number | 'S' | 'E')[] = Array.from({length: gridSize * gridSize}, () => {
            const pipeTypeIndex = Math.floor(Math.random() * (PIPE_TYPES.length -1)) + 1;
            return pipeTypeIndex;
        });
        newBoard[0] = 'S';
        newBoard[gridSize * gridSize - 1] = 'E';
        setBoard(newBoard);
    }, [level]);
    
    const rotatePipe = (index: number) => {
        const pipe = board[index];
        if (typeof pipe !== 'number' || !ROTATIONS[pipe as keyof typeof ROTATIONS]) return;
        
        const newBoard = [...board];
        // @ts-ignore
        newBoard[index] = ROTATIONS[pipe];
        setBoard(newBoard);
    };

    const checkSolution = () => {
        const startIndex = 0;
        const endIndex = gridSize * gridSize - 1;

        const connections: { [key: number]: string[] } = {
            1: ['left', 'right'], 3: ['up', 'down'], 2: ['left', 'down'],
            5: ['right', 'up'],   4: ['right', 'down'], 6: ['left', 'up']
        };

        const opposites: { [key: string]: string } = {
            up: 'down', down: 'up', left: 'right', right: 'left'
        };

        const queue: { index: number, cameFrom: string | null }[] = [{ index: startIndex, cameFrom: null }];
        const visited = new Set([startIndex]);

        while (queue.length > 0) {
            const { index: currentIdx, cameFrom } = queue.shift()!;

            if (currentIdx === endIndex) {
                // Check if the final connection is valid
                const endPipeConnections = ['up', 'left']; // End pipe must be entered from top or left
                if (cameFrom && endPipeConnections.includes(cameFrom)) {
                    onGameComplete(100 * level);
                    return;
                }
            }

            let currentConnections: string[] = [];
            if (currentIdx === startIndex) {
                currentConnections = ['right', 'down'];
            } else {
                const currentPipe = board[currentIdx];
                if (typeof currentPipe === 'number') {
                    currentConnections = connections[currentPipe] || [];
                }
            }

            for (const exitDir of currentConnections) {
                if (cameFrom && exitDir === cameFrom) continue; // Don't go back

                const x = currentIdx % gridSize;
                const y = Math.floor(currentIdx / gridSize);
                let neighborIdx: number | null = null;

                if (exitDir === 'up' && y > 0) neighborIdx = currentIdx - gridSize;
                if (exitDir === 'down' && y < gridSize - 1) neighborIdx = currentIdx + gridSize;
                if (exitDir === 'left' && x > 0) neighborIdx = currentIdx - 1;
                if (exitDir === 'right' && x < gridSize - 1) neighborIdx = currentIdx + 1;

                if (neighborIdx !== null && !visited.has(neighborIdx)) {
                    const entryDir = opposites[exitDir];
                    const neighborPipe = board[neighborIdx];
                    let neighborConnections: string[] = [];

                    if (neighborPipe === 'E') {
                        neighborConnections = ['up', 'left'];
                    } else if (typeof neighborPipe === 'number') {
                        neighborConnections = connections[neighborPipe] || [];
                    }

                    if (neighborConnections.includes(entryDir)) {
                        visited.add(neighborIdx);
                        queue.push({ index: neighborIdx, cameFrom: entryDir });
                    }
                }
            }
        }

        onGameComplete(0);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-2">Pipe Dream</h3>
            <p className="text-slate-400 mb-6">Rotate the pipes to connect Start (S) to End (E).</p>
            <div className="grid grid-cols-5 gap-1 p-2 bg-slate-900/50 rounded-lg">
                {board.map((pipe, i) => (
                    <button key={i} onClick={() => rotatePipe(i)} className="w-16 h-16 bg-slate-700 text-3xl font-mono text-sky-300">
                        {typeof pipe === 'number' ? PIPE_TYPES[pipe] : pipe}
                    </button>
                ))}
            </div>
            <button onClick={checkSolution} className="mt-6 px-8 py-3 bg-green-600 rounded-full font-bold">Check Pipes</button>
        </div>
    );
};

export default PipeDreamGame;