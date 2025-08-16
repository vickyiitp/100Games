import React, { useState, useMemo } from 'react';

interface EmojiProblem {
    emojis: string;
    question: string;
    options: string[];
    answer: string;
}

const PROBLEMS: EmojiProblem[] = [
    { emojis: "👨‍💻➡️☕️➡️😄", question: "What happened here?", options: ["Work, coffee, happiness", "A man hates coffee", "A computer is happy", "A man spills coffee"], answer: "Work, coffee, happiness" },
    { emojis: "📚➡️🧠➡️💡", question: "What does this represent?", options: ["Forgetting a book", "Reading leads to ideas", "A bright library", "A smart book"], answer: "Reading leads to ideas" },
    { emojis: "🏃‍♀️➡️💧➡️😴", question: "Describe the sequence:", options: ["Running from water", "A tired runner", "A long run, then hydration, then rest", "Someone sleeping by a river"], answer: "A long run, then hydration, then rest" },
    { emojis: "😠➡️🧘‍♀️➡️😌", question: "What is this person doing?", options: ["Getting angry at yoga", "Hating meditation", "Calming down with meditation", "Being peacefully angry"], answer: "Calming down with meditation" },
];

interface EmojiEQGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const EmojiEQGame: React.FC<EmojiEQGameProps> = ({ level, onGameComplete }) => {
    const problem = useMemo(() => PROBLEMS[level % PROBLEMS.length], [level]);

    const handleAnswer = (selection: string) => {
        const score = selection === problem.answer ? 100 * level : 0;
        onGameComplete(score);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Emoji EQ</h3>
            <p className="text-slate-400 mb-6">{problem.question}</p>
            
            <div className="w-full max-w-md p-6 bg-slate-700/50 rounded-lg mb-8">
                <p className="text-5xl">{problem.emojis}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
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

export default EmojiEQGame;