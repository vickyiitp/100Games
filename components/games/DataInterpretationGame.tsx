import React, { useState, useMemo } from 'react';
import { GraphIcon } from '../Icons';

interface DataProblem {
    title: string;
    data: { label: string; value: number }[];
    question: string;
    options: string[];
    answer: string;
}

const PROBLEMS: DataProblem[] = [
    {
        title: "Fruit Sales (per day)",
        data: [{ label: 'Apples', value: 50 }, { label: 'Oranges', value: 75 }, { label: 'Bananas', value: 60 }],
        question: "Which fruit sold the most?",
        options: ["Apples", "Oranges", "Bananas"],
        answer: "Oranges",
    },
    {
        title: "Project Progress (%)",
        data: [{ label: 'Phase 1', value: 100 }, { label: 'Phase 2', value: 80 }, { label: 'Phase 3', value: 30 }],
        question: "Which phase is least complete?",
        options: ["Phase 1", "Phase 2", "Phase 3"],
        answer: "Phase 3",
    },
];

interface DataInterpretationGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const DataInterpretationGame: React.FC<DataInterpretationGameProps> = ({ level, onGameComplete }) => {
    const problem = useMemo(() => PROBLEMS[level % PROBLEMS.length], [level]);
    const maxVal = Math.max(...problem.data.map(d => d.value));

    const handleAnswer = (selection: string) => {
        const score = selection === problem.answer ? 150 * level : 0;
        onGameComplete(score);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-2">Data Interpretation</h3>
            <p className="text-slate-400 mb-6">{problem.title}</p>
            
            <div className="w-full max-w-md h-64 p-4 bg-slate-900/50 rounded-lg mb-8 flex justify-around items-end">
                {problem.data.map(item => (
                    <div key={item.label} className="flex flex-col items-center h-full justify-end">
                        <div 
                            className="w-16 bg-sky-500 rounded-t-md"
                            style={{ height: `${(item.value / maxVal) * 90}%` }}
                        ></div>
                        <p className="text-sm mt-1">{item.label}</p>
                    </div>
                ))}
            </div>

            <p className="text-xl font-semibold mb-4">{problem.question}</p>
            <div className="flex gap-4">
                {problem.options.map(option => (
                    <button
                        key={option}
                        onClick={() => handleAnswer(option)}
                        className="px-6 py-3 bg-slate-700 rounded-lg text-lg hover:bg-sky-600 transition-colors"
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DataInterpretationGame;