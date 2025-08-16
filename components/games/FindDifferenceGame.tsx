import React, { useState, useMemo } from 'react';
import { CircleIcon, SquareIcon, TriangleIcon, StarIcon } from '../Icons';

const ICONS = [
    (props: any) => <CircleIcon {...props} className="w-full h-full text-sky-400" />,
    (props: any) => <SquareIcon {...props} className="w-full h-full text-violet-400" />,
    (props: any) => <TriangleIcon {...props} className="w-full h-full text-green-400" />,
    (props: any) => <StarIcon {...props} className="w-full h-full text-yellow-400" />,
];

interface FindDifferenceGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const FindDifferenceGame: React.FC<FindDifferenceGameProps> = ({ level, onGameComplete }) => {
    const gridSize = useMemo(() => Math.min(5, 3 + Math.floor(level / 3)), [level]);
    
    const { grid, diffIndex } = useMemo(() => {
        const size = gridSize * gridSize;
        const newGrid = Array.from({ length: size }, () => Math.floor(Math.random() * ICONS.length));
        const newDiffIndex = Math.floor(Math.random() * size);
        return { grid: newGrid, diffIndex: newDiffIndex };
    }, [level, gridSize]);
    
    const [startTime] = useState(Date.now());

    const handleTileClick = (index: number) => {
        const timeTaken = (Date.now() - startTime) / 1000;
        if (index === diffIndex) {
            const score = Math.max(50, Math.floor((1000 * level) / timeTaken));
            onGameComplete(score);
        } else {
            onGameComplete(0); // Incorrect click
        }
    };
    
    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Find the Difference</h3>
            <p className="text-slate-400 mb-8">Click the one icon in the right grid that is different from the left.</p>

            <div className="flex gap-8">
                {/* Left Grid (Reference) */}
                <div className="grid gap-2 p-2 bg-slate-900/50 rounded-lg" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)`}}>
                    {grid.map((iconIndex, i) => {
                        const Icon = ICONS[iconIndex];
                        return <div key={i} className="w-12 h-12 p-1"><Icon /></div>
                    })}
                </div>

                {/* Right Grid (Interactive) */}
                <div className="grid gap-2 p-2 bg-slate-900/50 rounded-lg" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)`}}>
                    {grid.map((iconIndex, i) => {
                        // The different icon is the "next" icon in the list, wrapping around
                        const finalIndex = i === diffIndex ? (iconIndex + 1) % ICONS.length : iconIndex;
                        const Icon = ICONS[finalIndex];
                        return (
                            <button key={i} onClick={() => handleTileClick(i)} className="w-12 h-12 p-1 rounded-md hover:bg-slate-700">
                                <Icon />
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FindDifferenceGame;
