import React, { useState, useEffect, useMemo } from 'react';

interface PathFinderGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const PathFinderGame: React.FC<PathFinderGameProps> = ({ level, onGameComplete }) => {
  const gridSize = useMemo(() => Math.min(10, 5 + Math.floor(level / 2)), [level]);
  
  const [grid, setGrid] = useState<('empty' | 'wall' | 'start' | 'end' | 'path')[]>([]);
  const [playerPath, setPlayerPath] = useState<number[]>([0]);

  useEffect(() => {
    const newGrid: ('empty' | 'wall' | 'start' | 'end')[] = Array(gridSize * gridSize).fill('empty');
    newGrid[0] = 'start';
    newGrid[gridSize * gridSize - 1] = 'end';

    // Add walls
    const numWalls = Math.floor(gridSize * gridSize / 5) + level;
    for (let i = 0; i < numWalls; i++) {
      const wallIndex = Math.floor(Math.random() * gridSize * gridSize);
      if (newGrid[wallIndex] === 'empty') {
        newGrid[wallIndex] = 'wall';
      }
    }
    // @ts-ignore
    setGrid(newGrid);
    setPlayerPath([0]);
  }, [level, gridSize]);
  
  const handleTileClick = (index: number) => {
      const lastPos = playerPath[playerPath.length - 1];
      const isAdjacent = Math.abs(Math.floor(lastPos / gridSize) - Math.floor(index / gridSize)) + Math.abs((lastPos % gridSize) - (index % gridSize)) === 1;

      if(grid[index] === 'wall' || playerPath.includes(index) || !isAdjacent) return;

      const newPath = [...playerPath, index];
      setPlayerPath(newPath);

      if (grid[index] === 'end') {
          const score = 1000 * level + (grid.length - newPath.length) * 10;
          onGameComplete(score);
      }
  }

  const getTileClasses = (type: string, index: number) => {
    let base = "w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-md transition-colors duration-200";
    if (playerPath.includes(index)) {
      return `${base} bg-sky-400`;
    }
    switch(type) {
        case 'start': return `${base} bg-green-500`;
        case 'end': return `${base} bg-violet-500`;
        case 'wall': return `${base} bg-slate-900`;
        default: return `${base} bg-slate-700 hover:bg-slate-600 cursor-pointer`;
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h3 className="text-2xl font-bold text-white mb-6">Connect the start to the end!</h3>
       <div
        className="grid gap-1 p-2 bg-slate-900/50 rounded-lg"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {grid.map((tile, index) => (
            <div key={index} className={getTileClasses(tile, index)} onClick={() => handleTileClick(index)}>
                {/* Icons could go here */}
            </div>
        ))}
       </div>
    </div>
  );
};

export default PathFinderGame;
