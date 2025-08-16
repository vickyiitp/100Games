import React, { useState, useEffect, useMemo } from 'react';

interface AntonymProblem {
    word: string;
    options: string[];
    answer: string;
}

const ANTONYM_SETS: { [key: string]: string } = {
    'happy': 'sad', 'hot': 'cold', 'fast': 'slow', 'hard': 'soft', 'rich': 'poor', 'empty': 'full',
    'easy': 'difficult', 'light': 'dark', 'win': 'lose', 'strong': 'weak', 'brave': 'cowardly'
};
const ALL_WORDS = Object.keys(ANTONYM_SETS).concat(Object.values(ANTONYM_SETS));


const generateProblem = (level: number): AntonymProblem => {
    const words = Object.keys(ANTONYM_SETS);
    const word = words[Math.floor(Math.random() * words.length)];
    const answer = ANTONYM_SETS[word];

    const distractors = ALL_WORDS.filter(w => w !== word && w !== answer);
    const shuffledDistractors = distractors.sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [...shuffledDistractors, answer].sort(() => 0.5 - Math.random());

    return { word, options, answer };
};

interface AntonymGameProps {
    level: number;
    onGameComplete: (score: number) => void;
}

const AntonymGame: React.FC<AntonymGameProps> = ({ level, onGameComplete }) => {
    const [problem, setProblem] = useState(generateProblem(level));
    const [timeLeft, setTimeLeft] = useState(10);

    const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        setProblem(generateProblem(level));
        setTimeLeft(10 - Math.min(5, Math.floor(level / 2)));
    }, [level]);

    useEffect(() => {
        if (timeLeft <= 0) {
            onGameComplete(0);
            return;
        }
        timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
        return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }, [timeLeft, onGameComplete]);

    const handleAnswer = (selectedOption: string) => {
        if (timerRef.current) clearTimeout(timerRef.current);
        const score = selectedOption === problem.answer ? timeLeft * 10 * level : 0;
        onGameComplete(score);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <div className="absolute top-4 right-4 text-2xl font-bold text-violet-300">{timeLeft}s</div>
            <h3 className="text-xl text-slate-400 mb-4">Choose the antonym for:</h3>
            <p className="text-5xl md:text-6xl font-extrabold text-sky-300 mb-8 p-4">
                {problem.word.toUpperCase()}
            </p>
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

export default AntonymGame;