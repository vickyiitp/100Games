import React, { useState, useMemo, useEffect } from 'react';

interface RhymeProblem {
    word: string;
    options: string[];
    answer: string;
}

const RHYME_SETS: RhymeProblem[] = [
    { word: "CAT", options: ["SIT", "HAT", "CUP", "DOG"], answer: "HAT" },
    { word: "STAR", options: ["FAR", "STOP", "RUN", "SKY"], answer: "FAR" },
    { word: "BLUE", options: ["RED", "SHOE", "BALL", "TREE"], answer: "SHOE" },
    { word: "BRAIN", options: ["MIND", "THINK", "RAIN", "SMART"], answer: "RAIN" },
    { word: "LIGHT", options: ["DARK", "HEAVY", "NIGHT", "BEAM"], answer: "NIGHT" },
];

interface RhymeFinderGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const RhymeFinderGame: React.FC<RhymeFinderGameProps> = ({ level, onGameComplete }) => {
    const problem = useMemo(() => RHYME_SETS[level % RHYME_SETS.length], [level]);
    const [timeLeft, setTimeLeft] = useState(8);

    const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        setTimeLeft(8 - Math.min(4, Math.floor(level / 2)));
    }, [level]);

    useEffect(() => {
        if (timeLeft <= 0) {
            onGameComplete(0);
            return;
        }
        timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
        return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }, [timeLeft, onGameComplete]);
    
    const handleAnswer = (selection: string) => {
        if (timerRef.current) clearTimeout(timerRef.current);
        const score = selection === problem.answer ? timeLeft * 10 * level : 0;
        onGameComplete(score);
    }
    
    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <div className="absolute top-4 right-4 text-2xl font-bold text-violet-300">{timeLeft}s</div>
            <h3 className="text-xl text-slate-400 mb-4">Which word rhymes with:</h3>
            <p className="text-5xl md:text-6xl font-extrabold text-sky-300 mb-8 p-4">
                {problem.word}
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

export default RhymeFinderGame;
