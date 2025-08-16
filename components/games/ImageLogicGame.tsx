import React, { useState, useMemo } from 'react';
import { CircleIcon, SquareIcon, TriangleIcon } from '../Icons';

const ICONS = [
    (props: any) => <CircleIcon {...props} />,
    (props: any) => <SquareIcon {...props} />,
    (props: any) => <TriangleIcon {...props} />,
];

interface ImageLogicProblem {
    sequence: number[]; // Indices of icons
    options: number[];
    answer: number;
}

const generateProblem = (level: number): ImageLogicProblem => {
    // Simple pattern: repeat the sequence
    const baseSeq = [0, 1, 2].sort(() => 0.5 - Math.random()).slice(0, 3);
    const sequence = [baseSeq[0], baseSeq[1], baseSeq[2]];
    const answer = baseSeq[0];

    const distractors = [0, 1, 2].filter(i => i !== answer);
    const options = [...distractors, answer].sort(() => 0.5 - Math.random());
    
    return { sequence, options, answer };
};

interface ImageLogicGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const ImageLogicGame: React.FC<ImageLogicGameProps> = ({ level, onGameComplete }) => {
    const problem = useMemo(() => generateProblem(level), [level]);

    const handleAnswer = (selection: number) => {
        onGameComplete(selection === problem.answer ? 100 * level : 0);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Image Logic</h3>
            <p className="text-slate-400 mb-8">What comes next in the sequence?</p>

            <div className="flex items-center justify-center gap-4 mb-10 p-4 bg-slate-700/50 rounded-lg">
                {problem.sequence.map((iconIndex, i) => {
                    const Icon = ICONS[iconIndex];
                    return <Icon key={i} className="w-16 h-16 text-sky-400" />;
                })}
                <div className="w-16 h-16 flex items-center justify-center text-4xl text-slate-500">?</div>
            </div>

            <div className="flex gap-4">
                {problem.options.map(optionIndex => {
                    const Icon = ICONS[optionIndex];
                    return (
                        <button key={optionIndex} onClick={() => handleAnswer(optionIndex)} className="p-4 bg-slate-700 rounded-lg hover:bg-slate-600">
                            <Icon className="w-16 h-16" />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default ImageLogicGame;