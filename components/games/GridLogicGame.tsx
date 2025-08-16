import React, { useState, useEffect, useMemo } from 'react';
import { CircleIcon, SquareIcon, TriangleIcon, StarIcon } from '../Icons';

const ICONS = [
    (props: any) => <CircleIcon {...props} className="w-8 h-8 text-red-400" />,
    (props: any) => <SquareIcon {...props} className="w-8 h-8 text-blue-400" />,
    (props: any) => <TriangleIcon {...props} className="w-8 h-8 text-green-400" />,
    (props: any) => <StarIcon {...props} className="w-8 h-8 text-yellow-400" />,
];

interface GridLogicGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const GridLogicGame: React.FC<GridLogicGameProps> = ({ level, onGameComplete }) => {
  const gridSize = useMemo(() => Math.min(4, 2 + Math.floor(level / 2)), [level]);
  const [grid, setGrid] = useState<(number | null)[]>([]);
  const [solution, setSolution] = useState<number[]>([]);
  
  useEffect(() => {
      // Simple Latin Square generation
      const p = Array.from({length: gridSize}, (_, i) => i);
      const latinSquare = Array.from({length: gridSize}, (_, i) =>
          p.map((_, j) => (i + j) % gridSize)
      );
      const flatSolution = latinSquare.flat();
      setSolution(flatSolution);
      
      const newGrid = [...flatSolution];
      // Remove some cells to create the puzzle
      const cellsToRemove = Math.floor(gridSize * gridSize * (0.4 + level * 0.05));
      for (let i = 0; i < cellsToRemove; i++) {
          const index = Math.floor(Math.random() * newGrid.length);
          newGrid[index] = null;
      }
      setGrid(newGrid);

  }, [level, gridSize]);

  const handleTileClick = (index: number) => {
    if (grid[index] !== null) { // Can't change pre-filled tiles in this simple version
        // A more advanced version would distinguish between user-placed and initial tiles
    }
    setGrid(currentGrid => {
        const newGrid = [...currentGrid];
        const currentValue = newGrid[index];
        newGrid[index] = currentValue === null ? 0 : (currentValue + 1) % gridSize;
        return newGrid;
    });
  };

  const checkSolution = () => {
    if (grid.toString() === solution.toString()) {
        onGameComplete(100 * level * gridSize);
    } else {
        onGameComplete(0); // Or provide feedback
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full text-white text-center">
      <h3 className="text-2xl font-bold mb-4">Grid Logic Puzzle</h3>
      <p className="text-slate-400 mb-6 max-w-sm">Fill the grid so that each icon appears exactly once in each row and column.</p>
      
      <div 
        className="grid gap-2 p-2 bg-slate-900/50 rounded-lg"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)`}}
      >
        {grid.map((value, index) => {
          const Icon = value !== null ? ICONS[value] : null;
          return (
            <button
              key={index}
              onClick={() => handleTileClick(index)}
              className="w-20 h-20 md:w-24 md:h-24 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-slate-600 transition-colors"
            >
              {Icon && <Icon />}
            </button>
          )
        })}
      </div>
      <button onClick={checkSolution} className="mt-6 px-8 py-3 bg-green-600 rounded-full font-bold text-lg hover:bg-green-500 transition-colors">
          Check Solution
      </button>
    </div>
  );
};

export default GridLogicGame;