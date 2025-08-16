import React, { useState, useMemo } from 'react';

interface RebuttalProblem {
    initialStatement: string;
    counterArgument: string;
    options: { text: string, isCorrect: boolean }[];
}

const PROBLEMS: RebuttalProblem[] = [
    {
        initialStatement: "We should switch to a 4-day work week.",
        counterArgument: "But that would decrease productivity by 20%!",
        options: [
            { text: "You're wrong, it wouldn't.", isCorrect: false },
            { text: "Studies show that shorter work weeks can actually boost focus and productivity, leading to the same or better output.", isCorrect: true },
            { text: "Who cares about productivity?", isCorrect: false },
        ]
    }
];

interface DebateRebuttalGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const DebateRebuttalGame: React.FC<DebateRebuttalGameProps> = ({ level, onGameComplete }) => {
    const problem = useMemo(() => PROBLEMS[level % PROBLEMS.length], [level]);

    const handleAnswer = (isCorrect: boolean) => {
        onGameComplete(isCorrect ? 150 * level : 0);
    };

    return (
        <div className="flex flex-col items-center justify-start h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Debate Rebuttal</h3>
            <div className="w-full max-w-2xl p-4 bg-slate-700/50 rounded-lg mb-2 text-left">
                <p className="text-sm text-slate-400">Initial Statement:</p>
                <p>"{problem.initialStatement}"</p>
            </div>
            <div className="w-full max-w-2xl p-4 bg-red-900/30 rounded-lg mb-6 text-left">
                <p className="text-sm text-slate-400">Counter-Argument:</p>
                <p>"{problem.counterArgument}"</p>
            </div>

            <p className="text-slate-300 mb-4">What is the best rebuttal?</p>
            <div className="flex flex-col gap-3 w-full max-w-2xl">
                {problem.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(option.isCorrect)}
                        className="p-4 bg-slate-700 rounded-lg text-lg text-left hover:bg-sky-600 transition-colors"
                    >
                        {option.text}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DebateRebuttalGame;