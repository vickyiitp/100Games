import React, { useState, useEffect, useMemo } from 'react';

interface SymmetryGameProps {
    level: number;
    onGameComplete: (score: number) => void;
}

const SymmetryGame: React.FC<SymmetryGameProps> = ({ level, onGameComplete }) => {
    const gridSize = useMemo(() => Math.min(8, 4 + Math.floor(level / 2)), [level]);
    
    const [problemGrid, setProblemGrid] = useState<boolean[]>([]);
    const [playerGrid, setPlayerGrid] = useState<boolean[]>([]);

    useEffect(() => {
        const halfSize = (gridSize * gridSize) / 2;
        const newProblemGrid: boolean[] = Array(halfSize).fill(false);
        const cellsToFill = Math.floor(halfSize * 0.4) + level;
        
        for (let i = 0; i < cellsToFill; i++) {
            const index = Math.floor(Math.random() * halfSize);
            newProblemGrid[index] = true;
        }
        
        setProblemGrid(newProblemGrid);
        setPlayerGrid(Array(halfSize).fill(false));
    }, [level, gridSize]);
    
    const handleTileClick = (index: number) => {
        setPlayerGrid(currentGrid => {
            const newGrid = [...currentGrid];
            newGrid[index] = !newGrid[index];
            return newGrid;
        });
    };
    
    const checkSolution = () => {
        let correctCells = 0;
        for(let i = 0; i < problemGrid.length; i++) {
            // Symmetry means the problem grid should match the player's grid
            if (problemGrid[i] === playerGrid[i]) {
                correctCells++;
            }
        }
        
        const accuracy = correctCells / problemGrid.length;
        const score = Math.floor(100 * level * accuracy);
        onGameComplete(score);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-2">Symmetry Master</h3>
            <p className="text-slate-400 mb-6">Complete the symmetrical pattern.</p>

            <div className="flex gap-1">
                {/* Problem Side */}
                <div 
                    className="grid gap-1 p-1 bg-slate-900/50 rounded-l-lg"
                    style={{ gridTemplateColumns: `repeat(${gridSize / 2}, 1fr)`}}
                >
                    {problemGrid.map((isFilled, index) => (
                        <div key={index} className={`w-10 h-10 rounded-sm ${isFilled ? 'bg-sky-400' : 'bg-slate-700'}`}></div>
                    ))}
                </div>
                {/* Player Side */}
                 <div 
                    className="grid gap-1 p-1 bg-slate-900/50 rounded-r-lg"
                    style={{ gridTemplateColumns: `repeat(${gridSize / 2}, 1fr)`}}
                >
                    {playerGrid.map((isFilled, index) => (
                        <div 
                            key={index}
                            onClick={() => handleTileClick(index)}
                            className={`w-10 h-10 rounded-sm cursor-pointer ${isFilled ? 'bg-sky-400' : 'bg-slate-700 hover:bg-slate-600'}`}
                        ></div>
                    ))}
                </div>
            </div>

            <button onClick={checkSolution} className="mt-8 px-8 py-3 bg-green-600 rounded-full font-bold text-lg hover:bg-green-500 transition-colors">
                Check Symmetry
            </button>
        </div>
    );
};

export default SymmetryGame;