import React, { useState, useMemo } from 'react';
import { EyeIcon } from '../Icons';

interface LieDetectorProblem {
    statement: string;
    cues: { name: string, value: string, isLieIndicator: boolean }[];
    isLie: boolean;
}

const PROBLEMS: LieDetectorProblem[] = [
    {
        statement: "I definitely finished all my homework.",
        cues: [
            { name: "Heart Rate", value: "Slightly Elevated", isLieIndicator: true },
            { name: "Gaze", value: "Averted", isLieIndicator: true },
            { name: "Speech", value: "Clear", isLieIndicator: false },
        ],
        isLie: true,
    },
    {
        statement: "Yes, I was at the library all evening.",
        cues: [
            { name: "Heart Rate", value: "Normal", isLieIndicator: false },
            { name: "Gaze", value: "Steady", isLieIndicator: false },
            { name: "Speech", value: "Calm", isLieIndicator: false },
        ],
        isLie: false,
    },
    {
        statement: "I have no idea who ate the last cookie.",
        cues: [
            { name: "Heart Rate", value: "Normal", isLieIndicator: false },
            { name: "Gaze", value: "Shifting", isLieIndicator: true },
            { name: "Microexpression", value: "Brief smirk", isLieIndicator: true },
        ],
        isLie: true,
    },
];

interface LieDetectorGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const LieDetectorGame: React.FC<LieDetectorGameProps> = ({ level, onGameComplete }) => {
    const problem = useMemo(() => PROBLEMS[level % PROBLEMS.length], [level]);

    const handleAnswer = (userChoiceIsLie: boolean) => {
        const score = userChoiceIsLie === problem.isLie ? 100 * level : 0;
        onGameComplete(score);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Lie Detector</h3>
            <div className="w-full max-w-xl p-6 bg-slate-700/50 rounded-lg mb-6">
                <p className="text-2xl italic">"{problem.statement}"</p>
            </div>
            
            <div className="w-full max-w-xl grid grid-cols-3 gap-4 mb-8 text-center">
                {problem.cues.map(cue => (
                    <div key={cue.name} className="p-3 bg-slate-900/50 rounded-lg">
                        <p className="text-sm text-slate-400">{cue.name}</p>
                        <p className="font-semibold text-lg">{cue.value}</p>
                    </div>
                ))}
            </div>

            <p className="text-slate-300 mb-4">Based on the cues, is the statement a truth or a lie?</p>
            <div className="flex gap-8">
                <button
                    onClick={() => handleAnswer(false)}
                    className="px-10 py-4 bg-green-600 rounded-full font-bold text-2xl hover:bg-green-500 transition-colors"
                >
                    Truth
                </button>
                <button
                    onClick={() => handleAnswer(true)}
                    className="px-10 py-4 bg-red-600 rounded-full font-bold text-2xl hover:bg-red-500 transition-colors"
                >
                    Lie
                </button>
            </div>
        </div>
    );
};

export default LieDetectorGame;
