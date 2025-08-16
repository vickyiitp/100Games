import React, { useState, useMemo } from 'react';

interface DefinitionProblem {
    word: string;
    options: string[];
    answer: string;
}

const DEFINITIONS: DefinitionProblem[] = [
    { word: "Ephemeral", options: ["Long-lasting", "Strong", "Lasting for a very short time", "Beautiful"], answer: "Lasting for a very short time" },
    { word: "Lethargic", options: ["Energetic and active", "Sluggish and apathetic", "Quick-witted", "Happy and joyful"], answer: "Sluggish and apathetic" },
    { word: "Ubiquitous", options: ["Rare and hard to find", "Found only in one place", "Present, appearing, or found everywhere", "Extremely small"], answer: "Present, appearing, or found everywhere" },
    { word: "Malleable", options: ["Easily broken", "Rigid and unbending", "Difficult to understand", "Easily influenced; pliable"], answer: "Easily influenced; pliable" },
];

interface DefinitionDetectiveGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const DefinitionDetectiveGame: React.FC<DefinitionDetectiveGameProps> = ({ level, onGameComplete }) => {
    const problem = useMemo(() => DEFINITIONS[level % DEFINITIONS.length], [level]);

    const handleAnswer = (selection: string) => {
        const score = selection === problem.answer ? 100 * level : 0;
        onGameComplete(score);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-xl text-slate-400 mb-4">Choose the correct definition for:</h3>
            <p className="text-5xl md:text-6xl font-extrabold text-sky-300 mb-8 p-4">
                {problem.word}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                {problem.options.map(option => (
                    <button
                        key={option}
                        onClick={() => handleAnswer(option)}
                        className="p-4 h-full bg-slate-700 rounded-lg text-lg font-semibold hover:bg-sky-600 transition-colors"
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DefinitionDetectiveGame;