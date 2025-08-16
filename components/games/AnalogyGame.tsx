import React, { useState, useMemo } from 'react';

interface AnalogyProblem {
    a: string;
    b: string;
    c: string;
    options: string[];
    answer: string;
}

const ANALOGIES: AnalogyProblem[] = [
    { a: "Puppy", b: "Dog", c: "Kitten", options: ["Cat", "Horse", "Fish", "Bird"], answer: "Cat" },
    { a: "Hot", b: "Sun", c: "Cold", options: ["Moon", "Ice", "Fire", "Star"], answer: "Ice" },
    { a: "Up", b: "Down", c: "Left", options: ["Sideways", "Correct", "Right", "Over"], answer: "Right" },
    { a: "Leaf", b: "Tree", c: "Petal", options: ["Stem", "Rose", "Flower", "Bush"], answer: "Flower" },
    { a: "Doctor", b: "Hospital", c: "Teacher", options: ["Book", "School", "Student", "Desk"], answer: "School" },
];

interface AnalogyGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const AnalogyGame: React.FC<AnalogyGameProps> = ({ level, onGameComplete }) => {
    const problem = useMemo(() => ANALOGIES[level % ANALOGIES.length], [level]);

    const handleAnswer = (selection: string) => {
        const score = selection === problem.answer ? 100 * level : 0;
        onGameComplete(score);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-8">Complete the Analogy</h3>

            <div className="flex items-center justify-center text-3xl md:text-4xl font-semibold mb-10">
                <span>{problem.a}</span>
                <span className="text-slate-400 mx-2">is to</span>
                <span className="text-sky-300">{problem.b}</span>
                <span className="text-slate-400 mx-4">::</span>
                <span>{problem.c}</span>
                <span className="text-slate-400 mx-2">is to</span>
                <span className="text-violet-300">?</span>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                {problem.options.map(option => (
                    <button
                        key={option}
                        onClick={() => handleAnswer(option)}
                        className="p-4 bg-slate-700 rounded-lg text-xl font-semibold hover:bg-sky-600 transition-colors"
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AnalogyGame;
