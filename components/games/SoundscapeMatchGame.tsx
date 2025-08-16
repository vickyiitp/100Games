import React, { useState, useMemo } from 'react';
import { SoundIcon } from '../Icons';

interface SoundscapeProblem {
    name: string;
    components: string[]; // Sounds in the scene
    options: string[]; // Options to choose from, one is correct
    answer: string;
}

const PROBLEMS: SoundscapeProblem[] = [
    {
        name: "City Street",
        components: ["Car Horn", "Distant Siren", "Chatter"],
        options: ["Birdsong", "Distant Siren", "Waves Crashing"],
        answer: "Distant Siren",
    },
    {
        name: "Quiet Forest",
        components: ["Wind in Trees", "Birdsong", "Cricket Chirp"],
        options: ["Cricket Chirp", "Car Horn", "Flowing River"],
        answer: "Cricket Chirp",
    },
];

interface SoundscapeMatchGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const SoundscapeMatchGame: React.FC<SoundscapeMatchGameProps> = ({ level, onGameComplete }) => {
    const problem = useMemo(() => PROBLEMS[level % PROBLEMS.length], [level]);
    const [gameState, setGameState] = useState<'listening' | 'choosing'>('listening');
    const [activeSound, setActiveSound] = useState('');

    const playSoundscape = () => {
        // In a real game, this would play multiple audio files.
        // We'll simulate it by flashing the names.
        let i = 0;
        const interval = setInterval(() => {
            setActiveSound(problem.components[i]);
            i++;
            if (i >= problem.components.length) {
                clearInterval(interval);
                setActiveSound('');
                setGameState('choosing');
            }
        }, 1000);
    };

    const handleAnswer = (selection: string) => {
        onGameComplete(selection === problem.answer ? 100 * level : 0);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Soundscape Match</h3>

            {gameState === 'listening' && (
                <>
                    <p className="text-slate-400 mb-6">Listen to the soundscape: <span className="font-bold text-white">{problem.name}</span></p>
                    <div className="w-48 h-48 flex items-center justify-center bg-slate-700/50 rounded-full mb-6">
                        {activeSound ? (
                            <p className="text-2xl animate-fade-in">{activeSound}</p>
                        ) : (
                            <SoundIcon className="w-16 h-16" />
                        )}
                    </div>
                    <button onClick={playSoundscape} className="px-8 py-3 bg-sky-500 rounded-full font-bold">
                        Play Soundscape
                    </button>
                </>
            )}

            {gameState === 'choosing' && (
                <>
                    <p className="text-slate-400 mb-6">Which of these sounds did you hear?</p>
                    <div className="flex flex-col gap-4 w-full max-w-xs">
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
                </>
            )}
        </div>
    );
};

export default SoundscapeMatchGame;