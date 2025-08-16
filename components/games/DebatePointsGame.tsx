import React, { useState, useMemo } from 'react';
import { ChatBubbleIcon } from '../Icons';

interface DebateProblem {
    statement: string;
    options: { text: string, isCorrect: boolean }[];
}

const PROBLEMS: DebateProblem[] = [
    {
        statement: "All art should be beautiful and pleasant to look at.",
        options: [
            { text: "That's just wrong.", isCorrect: false },
            { text: "But art can also challenge us or make us think, which isn't always pleasant.", isCorrect: true },
            { text: "Only modern art is ugly.", isCorrect: false },
            { text: "My favorite painting is beautiful.", isCorrect: false },
        ]
    },
    {
        statement: "Video games are a complete waste of time.",
        options: [
            { text: "They can actually improve problem-solving skills and reaction time.", isCorrect: true },
            { text: "No, they're not!", isCorrect: false },
            { text: "Reading books is better.", isCorrect: false },
            { text: "My friend plays video games all day.", isCorrect: false },
        ]
    }
];

interface DebatePointsGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const DebatePointsGame: React.FC<DebatePointsGameProps> = ({ level, onGameComplete }) => {
    const problem = useMemo(() => {
        const current = PROBLEMS[level % PROBLEMS.length];
        current.options.sort(() => Math.random() - 0.5);
        return current;
    }, [level]);

    const handleAnswer = (isCorrect: boolean) => {
        onGameComplete(isCorrect ? 100 * level : 0);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Debate Points</h3>
            <p className="text-slate-400 mb-6">Choose the best counter-argument for the statement below:</p>
            
            <div className="w-full max-w-2xl p-6 bg-slate-700/50 rounded-lg mb-8">
                <p className="text-2xl italic">"{problem.statement}"</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                {problem.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(option.isCorrect)}
                        className="p-4 h-full bg-slate-700 rounded-lg text-lg text-left hover:bg-sky-600 transition-colors"
                    >
                        {option.text}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DebatePointsGame;