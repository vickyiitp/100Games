import React, { useState, useMemo } from 'react';

// Using simple SVG paths for shapes
const SHAPES = [
    { path: "M50 10 L90 90 L10 90 Z", transform: "skewX(30) rotate(15)" }, // Triangle
    { path: "M20 20 H80 V80 H20 Z", transform: "skewY(-25) rotate(-20)" }, // Square
    { path: "M50 50 m -40 0 a 40 40 0 1 0 80 0 a 40 40 0 1 0 -80 0", transform: "scale(1, 0.5) rotate(45)" }, // Circle -> Ellipse
];

interface ShadowMatchGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const ShadowMatchGame: React.FC<ShadowMatchGameProps> = ({ level, onGameComplete }) => {
    
    const problem = useMemo(() => {
        const shape = SHAPES[level % SHAPES.length];
        const numOptions = 3;
        const options = Array.from({ length: numOptions -1}, () => {
            const skewX = Math.random() * 40 - 20;
            const skewY = Math.random() * 40 - 20;
            const rotate = Math.random() * 90;
            return `skewX(${skewX}) skewY(${skewY}) rotate(${rotate})`;
        });
        options.push(shape.transform);
        options.sort(() => Math.random() - 0.5);
        return { ...shape, options };
    }, [level]);

    const handleAnswer = (selection: string) => {
        const score = selection === problem.transform ? 150 * level : 0;
        onGameComplete(score);
    }
    
    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Shadow Match</h3>
            <p className="text-slate-400 mb-8">Which shadow belongs to the shape?</p>
            
            <div className="mb-10 p-4 border-2 border-dashed border-sky-500 rounded-lg">
                <svg viewBox="0 0 100 100" className="w-28 h-28 text-sky-400">
                    <path d={problem.path} fill="currentColor" />
                </svg>
            </div>
            
            <div className="flex gap-6">
                {problem.options.map((transform, i) => (
                    <button key={i} onClick={() => handleAnswer(transform)} className="p-4 bg-slate-800 rounded-lg hover:bg-slate-700">
                        <svg viewBox="0 0 100 100" className="w-24 h-24 text-slate-400">
                            <path d={problem.path} fill="currentColor" transform={transform} transform-origin="center"/>
                        </svg>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ShadowMatchGame;