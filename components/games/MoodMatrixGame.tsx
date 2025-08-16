import React, { useState, useMemo, useEffect } from 'react';

const EMOJIS = {
    happy: '😀', sad: '😢', angry: '😠', surprised: '😮'
};
type Emotion = keyof typeof EMOJIS;

interface MoodMatrixGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const MoodMatrixGame: React.FC<MoodMatrixGameProps> = ({ level, onGameComplete }) => {
    const gridSize = Math.min(6, 4 + Math.floor(level / 3));
    const [grid, setGrid] = useState<Emotion[]>([]);
    const [targetEmotion, setTargetEmotion] = useState<Emotion>('happy');
    const [selected, setSelected] = useState<Set<number>>(new Set());
    
    const targetCount = useMemo(() => {
        const emotions = Object.keys(EMOJIS) as Emotion[];
        const target = emotions[Math.floor(Math.random() * emotions.length)];
        setTargetEmotion(target);

        let count = 0;
        const newGrid = Array.from({ length: gridSize * gridSize }, () => {
            const emotion = emotions[Math.floor(Math.random() * emotions.length)];
            if (emotion === target) count++;
            return emotion;
        });
        setGrid(newGrid);
        setSelected(new Set());
        return count;
    }, [level, gridSize]);
    
    const handleTileClick = (index: number) => {
        const newSelected = new Set(selected);
        if (newSelected.has(index)) {
            newSelected.delete(index);
        } else {
            newSelected.add(index);
        }
        setSelected(newSelected);
    };
    
    const checkSolution = () => {
        let correctSelections = 0;
        let incorrectSelections = 0;
        selected.forEach(index => {
            if (grid[index] === targetEmotion) {
                correctSelections++;
            } else {
                incorrectSelections++;
            }
        });
        
        const score = (correctSelections * 50 - incorrectSelections * 25) * level;
        onGameComplete(Math.max(0, score));
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Mood Matrix</h3>
            <p className="text-slate-400 mb-6">Click all the <span className="font-bold text-yellow-300">{targetEmotion}</span> faces.</p>

            <div 
                className="grid gap-2 p-2 bg-slate-900/50 rounded-lg"
                style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
            >
                {grid.map((emotion, index) => (
                    <button
                        key={index}
                        onClick={() => handleTileClick(index)}
                        className={`w-14 h-14 text-3xl rounded-md transition-colors ${selected.has(index) ? 'bg-sky-500' : 'bg-slate-700 hover:bg-slate-600'}`}
                    >
                        {EMOJIS[emotion]}
                    </button>
                ))}
            </div>
            <button onClick={checkSolution} className="mt-6 px-8 py-3 bg-green-600 rounded-full font-bold">Check</button>
        </div>
    );
};

export default MoodMatrixGame;