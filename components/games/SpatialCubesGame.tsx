import React, { useState, useMemo } from 'react';
import { CubeIcon } from '../Icons';

interface CubeProblem {
    description: string;
    answer: number;
}

const PROBLEMS: CubeProblem[] = [
    { description: "A solid 2x2x2 cube.", answer: 8 },
    { description: "An L-shape, 3 blocks high and 3 blocks long.", answer: 5 },
    { description: "A 3x3 flat base with a 2x2 tower on top.", answer: 13 },
];

interface SpatialCubesGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const SpatialCubesGame: React.FC<SpatialCubesGameProps> = ({ level, onGameComplete }) => {
    const problem = useMemo(() => PROBLEMS[level % PROBLEMS.length], [level]);
    const [userInput, setUserInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onGameComplete(parseInt(userInput) === problem.answer ? 100 * level : 0);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Spatial Cubes</h3>
            <p className="text-slate-400 mb-6">How many cubes are in this structure?</p>
            
            <div className="w-64 h-64 flex items-center justify-center bg-slate-700/50 rounded-lg mb-8">
                {/* This would be a visual representation of the cube structure */}
                <p className="p-4">{problem.description}</p>
            </div>
            
            <form onSubmit={handleSubmit}>
                <input 
                    type="number" 
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="w-48 p-2 bg-slate-700 rounded-md text-center text-xl"
                />
                <button type="submit" className="mt-4 px-6 py-2 bg-green-600 rounded-full font-bold">Submit Count</button>
            </form>
        </div>
    );
};

export default SpatialCubesGame;