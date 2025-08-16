import React, { useState, useMemo } from 'react';

interface ToneProblem {
    sentence: string;
    options: string[];
    answer: string;
}

const PROBLEMS: ToneProblem[] = [
    {
        sentence: "Oh, great. Another meeting. I can't wait.",
        options: ["Genuine", "Sarcastic", "Anxious", "Joyful"],
        answer: "Sarcastic"
    },
    {
        sentence: "I can't believe we actually won the championship!",
        options: ["Disappointed", "Confused", "Elated", "Calm"],
        answer: "Elated"
    },
    {
        sentence: "Are you sure you turned off the stove before we left?",
        options: ["Confident", "Curious", "Anxious", "Angry"],
        answer: "Anxious"
    },
    {
        sentence: "This piece of art is... interesting. I've never seen anything like it.",
        options: ["Politely Confused", "Overjoyed", "Furious", "Directly Insulting"],
        answer: "Politely Confused"
    }
];

interface ToneInterpreterGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const ToneInterpreterGame: React.FC<ToneInterpreterGameProps> = ({ level, onGameComplete }) => {
    const problem = useMemo(() => PROBLEMS[level % PROBLEMS.length], [level]);
    
    const handleAnswer = (selection: string) => {
        const score = selection === problem.answer ? 100 * level : 0;
        onGameComplete(score);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Tone Interpreter</h3>
            <p className="text-slate-400 mb-6">What is the tone of the following sentence?</p>
            
            <div className="w-full max-w-2xl p-6 bg-slate-700/50 rounded-lg mb-8">
                <p className="text-3xl italic">"{problem.sentence}"</p>
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

export default ToneInterpreterGame;
