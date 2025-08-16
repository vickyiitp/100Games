import React, { useState, useMemo } from 'react';

interface SarcasmProblem {
    sentence: string;
    isSarcastic: boolean;
}

const PROBLEMS: SarcasmProblem[] = [
    { sentence: "I just love being stuck in traffic. It's the highlight of my day.", isSarcastic: true },
    { sentence: "This is a beautiful painting; the colors are so vibrant.", isSarcastic: false },
    { sentence: "Oh, another meeting? Wonderful. I had nothing else to do.", isSarcastic: true },
    { sentence: "I'm so grateful for your help with this project.", isSarcastic: false },
];

interface SarcasmDetectorGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const SarcasmDetectorGame: React.FC<SarcasmDetectorGameProps> = ({ level, onGameComplete }) => {
    const problem = useMemo(() => PROBLEMS[level % PROBLEMS.length], [level]);

    const handleAnswer = (userChoiceIsSarcastic: boolean) => {
        onGameComplete(userChoiceIsSarcastic === problem.isSarcastic ? 100 * level : 0);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Sarcasm Detector</h3>
            <p className="text-slate-400 mb-6">Is the following sentence sarcastic?</p>
            <div className="w-full max-w-2xl p-6 bg-slate-700/50 rounded-lg mb-8">
                <p className="text-2xl italic">"{problem.sentence}"</p>
            </div>
            <div className="flex gap-8">
                <button onClick={() => handleAnswer(true)} className="px-10 py-4 bg-sky-600 rounded-full font-bold text-2xl">Sarcastic</button>
                <button onClick={() => handleAnswer(false)} className="px-10 py-4 bg-green-600 rounded-full font-bold text-2xl">Sincere</button>
            </div>
        </div>
    );
};

export default SarcasmDetectorGame;