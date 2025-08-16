import React, { useState, useMemo } from 'react';

interface RuleProblem {
    description: string;
    examples: { in: string; out: string }[];
    challenge: { in: string; options: string[]; answer: string };
}

const PROBLEMS: RuleProblem[] = [
    {
        description: "Find the hidden rule.",
        examples: [{ in: "A", out: "B" }, { in: "C", out: "D" }],
        challenge: { in: "E", options: ["F", "G", "H", "A"], answer: "F" }
    },
    {
        description: "Find the hidden rule.",
        examples: [{ in: "2", out: "4" }, { in: "5", out: "10" }],
        challenge: { in: "7", options: ["12", "14", "9", "7"], answer: "14" }
    },
    {
        description: "Find the hidden rule.",
        examples: [{ in: "APPLE", out: "A" }, { in: "BALL", out: "B" }],
        challenge: { in: "CARROT", options: ["T", "CAR", "C", "R"], answer: "C" }
    }
];

interface RuleFinderGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const RuleFinderGame: React.FC<RuleFinderGameProps> = ({ level, onGameComplete }) => {
    const problem = useMemo(() => PROBLEMS[level % PROBLEMS.length], [level]);
    
    const handleAnswer = (selection: string) => {
        const score = selection === problem.challenge.answer ? 150 * level : 0;
        onGameComplete(score);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Rule Finder</h3>
            <p className="text-slate-400 mb-8">{problem.description}</p>

            <div className="flex gap-8 items-center justify-center mb-8">
                {problem.examples.map((ex, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <p className="text-sm text-slate-500">INPUT</p>
                        <div className="p-4 bg-slate-700 rounded-lg text-2xl font-mono">{ex.in}</div>
                        <p className="text-2xl font-thin my-1">↓</p>
                        <p className="text-sm text-slate-500">OUTPUT</p>
                        <div className="p-4 bg-slate-900/50 rounded-lg text-2xl font-mono">{ex.out}</div>
                    </div>
                ))}
            </div>

            <div className="w-full max-w-lg p-4 border-2 border-dashed border-sky-500 rounded-lg">
                <p className="text-lg">Based on the rule, what is the output for:</p>
                <p className="text-4xl font-mono font-bold my-4">{problem.challenge.in}</p>
                <div className="flex justify-center gap-4">
                     {problem.challenge.options.map(option => (
                        <button
                            key={option}
                            onClick={() => handleAnswer(option)}
                            className="p-4 w-24 bg-slate-700 rounded-lg text-xl font-semibold hover:bg-sky-600 transition-colors"
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RuleFinderGame;
