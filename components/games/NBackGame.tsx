import React, { useState, useEffect, useCallback } from 'react';
import { CircleIcon, SquareIcon, TriangleIcon, StarIcon } from '../Icons';

const ICONS = [
    (props: any) => <CircleIcon {...props} className="w-24 h-24 text-red-400" />,
    (props: any) => <SquareIcon {...props} className="w-24 h-24 text-blue-400" />,
    (props: any) => <TriangleIcon {...props} className="w-24 h-24 text-green-400" />,
    (props: any) => <StarIcon {...props} className="w-24 h-24 text-yellow-400" />,
];

interface NBackGameProps {
    level: number;
    onGameComplete: (score: number) => void;
}

const NBackGame: React.FC<NBackGameProps> = ({ level, onGameComplete }) => {
    const n = Math.min(4, 1 + Math.floor(level / 3)); // N value from 1 to 4
    const totalTurns = 15 + n * 5;
    
    const [sequence, setSequence] = useState<number[]>([]);
    const [turn, setTurn] = useState(0);
    const [score, setScore] = useState(0);

    const generateSequence = useCallback(() => {
        const newSequence = Array.from({ length: totalTurns }, () => Math.floor(Math.random() * ICONS.length));
        setSequence(newSequence);
    }, [totalTurns]);

    useEffect(() => {
        generateSequence();
    }, [level, generateSequence]);

    useEffect(() => {
        if (turn >= totalTurns) {
            onGameComplete(score);
            return;
        }

        const timer = setTimeout(() => {
            setTurn(t => t + 1);
        }, 2500); // 2.5 seconds per turn

        return () => clearTimeout(timer);
    }, [turn, totalTurns, score, onGameComplete]);

    const handleAnswer = (isMatch: boolean) => {
        if (turn < n) return; // No answer possible for the first N turns

        const actualMatch = sequence[turn] === sequence[turn - n];
        if (isMatch === actualMatch) {
            setScore(s => s + 10 * level);
        } else {
            setScore(s => Math.max(0, s - 5 * level));
        }
        setTurn(t => t + 1); // Advance to next turn immediately
    };
    
    const CurrentIcon = turn < totalTurns ? ICONS[sequence[turn]] : null;

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <div className="w-full flex justify-between items-center p-4 bg-slate-700/50 rounded-lg mb-8">
                <div className="text-left">
                    <p className="text-sm text-slate-400">Score</p>
                    <p className="text-3xl font-bold text-sky-300">{score}</p>
                </div>
                <div className="text-center">
                    <p className="text-3xl font-bold">{n}-Back</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-slate-400">Turn</p>
                    <p className="text-3xl font-bold text-violet-300">{turn} / {totalTurns}</p>
                </div>
            </div>
            
            <div className="w-48 h-48 bg-slate-700/50 rounded-lg flex items-center justify-center mb-8">
                {CurrentIcon && <CurrentIcon />}
            </div>

            <h3 className="text-lg text-slate-300 mb-4">Does this shape match the one from {n} turn{n > 1 ? 's' : ''} ago?</h3>

            <div className="flex gap-8">
                <button
                    onClick={() => handleAnswer(true)}
                    disabled={turn < n}
                    className="px-10 py-4 bg-green-600 rounded-full font-bold text-2xl hover:bg-green-500 transition-colors disabled:opacity-50"
                >
                    Match
                </button>
                <button
                    onClick={() => handleAnswer(false)}
                    disabled={turn < n}
                    className="px-10 py-4 bg-red-600 rounded-full font-bold text-2xl hover:bg-red-500 transition-colors disabled:opacity-50"
                >
                    No Match
                </button>
            </div>
        </div>
    );
};

export default NBackGame;
