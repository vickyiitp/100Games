import React, { useState, useMemo } from 'react';
import { LightbulbIcon } from '../Icons';

interface InventionProblem {
    problem: string;
    items: string[];
    solutions: { text: string, score: number }[];
}

const PROBLEMS: InventionProblem[] = [
    {
        problem: "Get a cat out of a tall tree.",
        items: ["A long pole", "A can of tuna", "A loud horn"],
        solutions: [
            { text: "Poke the cat with the pole", score: 10 },
            { text: "Lure the cat down with the tuna", score: 100 },
            { text: "Scare the cat with the horn", score: -20 },
        ]
    },
    {
        problem: "You need to cross a small, fast-flowing river.",
        items: ["A long rope", "A large empty barrel", "A box of matches"],
        solutions: [
            { text: "Try to jump it", score: 0 },
            { text: "Float across in the barrel", score: 50 },
            { text: "Tie the rope to a tree and pull yourself across", score: 100 },
        ]
    }
];

interface InventionBoxGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const InventionBoxGame: React.FC<InventionBoxGameProps> = ({ level, onGameComplete }) => {
    const problem = useMemo(() => PROBLEMS[level % PROBLEMS.length], [level]);
    
    const handleSolution = (score: number) => {
        onGameComplete(score * level);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <LightbulbIcon className="w-16 h-16 text-yellow-400 mb-4" />
            <h3 className="text-2xl font-bold mb-4">Invention Box</h3>
            
            <div className="w-full max-w-2xl p-6 bg-slate-700/50 rounded-lg mb-6">
                <p className="text-xl">{problem.problem}</p>
            </div>

            <p className="text-slate-400 mb-2">You have:</p>
            <p className="font-semibold mb-6">{problem.items.join(', ')}</p>

            <p className="text-slate-400 mb-4">What do you do?</p>
            <div className="flex flex-col gap-3 w-full max-w-md">
                {problem.solutions.map((sol, i) => (
                    <button key={i} onClick={() => handleSolution(sol.score)} className="p-3 bg-slate-700 rounded-lg hover:bg-sky-600">
                        {sol.text}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default InventionBoxGame;