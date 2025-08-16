import React, { useState, useMemo } from 'react';
import { GlobeIcon } from '../Icons';

interface GeoProblem {
    landmark: string;
    imageSeed: string; // for picsum.photos
    options: string[];
    answer: string;
}

const PROBLEMS: GeoProblem[] = [
    { landmark: "Eiffel Tower", imageSeed: "eiffel", options: ["Italy", "USA", "France", "Spain"], answer: "France" },
    { landmark: "Statue of Liberty", imageSeed: "liberty", options: ["USA", "UK", "Canada", "Australia"], answer: "USA" },
    { landmark: "Colosseum", imageSeed: "colosseum", options: ["Greece", "Egypt", "Turkey", "Italy"], answer: "Italy" },
];

interface GeoGuesserGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const GeoGuesserGame: React.FC<GeoGuesserGameProps> = ({ level, onGameComplete }) => {
    const problem = useMemo(() => PROBLEMS[level % PROBLEMS.length], [level]);
    const imageUrl = `https://picsum.photos/seed/${problem.imageSeed}/400/300`;

    const handleAnswer = (selection: string) => {
        onGameComplete(selection === problem.answer ? 100 * level : 0);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Geo Guesser</h3>
            <p className="text-slate-400 mb-6">In which country is this landmark located?</p>
            
            <img src={imageUrl} alt={problem.landmark} className="w-96 h-64 object-cover rounded-lg mb-8" />
            
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                {problem.options.map(option => (
                    <button
                        key={option}
                        onClick={() => handleAnswer(option)}
                        className="p-4 bg-slate-700 rounded-lg text-xl hover:bg-sky-600"
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default GeoGuesserGame;