import React, { useState, useMemo } from 'react';

interface IdiomProblem {
    literal: string;
    options: string[];
    answer: string;
}

const PROBLEMS: IdiomProblem[] = [
    { literal: "A feline has possession of your tongue.", options: ["Let the cat out of the bag", "Curiosity killed the cat", "Cat got your tongue?", "Raining cats and dogs"], answer: "Cat got your tongue?" },
    { literal: "To give someone the cold part of your body used for carrying things.", options: ["A chip on your shoulder", "Give the cold shoulder", "An arm and a leg", "Cold feet"], answer: "Give the cold shoulder" },
    { literal: "Cease to live by kicking a container.", options: ["A drop in the bucket", "Kick the bucket", "All in one basket", "For kicks"], answer: "Kick the bucket" },
    { literal: "It is precipitating felines and canines.", options: ["Every dog has its day", "Let sleeping dogs lie", "Raining cats and dogs", "The cat's pajamas"], answer: "Raining cats and dogs" },
];

interface IdiomDecoderGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const IdiomDecoderGame: React.FC<IdiomDecoderGameProps> = ({ level, onGameComplete }) => {
    const problem = useMemo(() => PROBLEMS[level % PROBLEMS.length], [level]);

    const handleAnswer = (selection: string) => {
        const score = selection === problem.answer ? 100 * level : 0;
        onGameComplete(score);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Idiom Decoder</h3>
            <p className="text-slate-400 mb-6">What idiom does this literal description represent?</p>
            
            <div className="w-full max-w-2xl p-6 bg-slate-700/50 rounded-lg mb-8">
                <p className="text-2xl italic">"{problem.literal}"</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                {problem.options.map(option => (
                    <button
                        key={option}
                        onClick={() => handleAnswer(option)}
                        className="p-4 bg-slate-700 rounded-lg text-lg hover:bg-sky-600 transition-colors"
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default IdiomDecoderGame;