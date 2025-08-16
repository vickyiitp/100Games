import React, { useState, useMemo } from 'react';
import { UserIcon } from '../Icons';

const NAMES = ["Alex", "Ben", "Chloe", "David", "Eva", "Frank", "Grace", "Henry"];
const FACES = ["😀", "😎", "🤔", "😴", "🥳", "😢", "😠", "😮"]; // Using emojis to represent faces

interface Person {
    name: string;
    face: string;
}

interface FaceFileGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const FaceFileGame: React.FC<FaceFileGameProps> = ({ level, onGameComplete }) => {
    const [gameState, setGameState] = useState<'study' | 'test'>('study');
    const [testSubject, setTestSubject] = useState<Person | null>(null);
    const [options, setOptions] = useState<string[]>([]);
    
    const peopleToMemorize = useMemo(() => {
        const numPeople = Math.min(8, 2 + level);
        const shuffledNames = [...NAMES].sort(() => 0.5 - Math.random());
        const shuffledFaces = [...FACES].sort(() => 0.5 - Math.random());
        return Array.from({ length: numPeople }, (_, i) => ({
            name: shuffledNames[i],
            face: shuffledFaces[i],
        }));
    }, [level]);

    const startTest = () => {
        const subject = peopleToMemorize[Math.floor(Math.random() * peopleToMemorize.length)];
        setTestSubject(subject);

        const distractors = NAMES.filter(n => n !== subject.name && !peopleToMemorize.find(p => p.name === n));
        const finalOptions = [subject.name, ...distractors.slice(0, 3)].sort(() => 0.5 - Math.random());
        setOptions(finalOptions);
        setGameState('test');
    };

    const handleAnswer = (name: string) => {
        onGameComplete(name === testSubject?.name ? 100 * level : 0);
    };

    if (gameState === 'study') {
        return (
            <div className="flex flex-col items-center justify-center h-full text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Memorize These People</h3>
                <div className="grid grid-cols-3 gap-4 mb-8">
                    {peopleToMemorize.map(p => (
                        <div key={p.name} className="p-4 bg-slate-700 rounded-lg">
                            <div className="text-5xl">{p.face}</div>
                            <div className="font-bold mt-2">{p.name}</div>
                        </div>
                    ))}
                </div>
                <button onClick={startTest} className="px-8 py-3 bg-sky-500 rounded-full font-bold">Start Test</button>
            </div>
        );
    }
    
    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Who is this?</h3>
            <div className="text-8xl mb-8">{testSubject?.face}</div>
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                {options.map(name => (
                    <button key={name} onClick={() => handleAnswer(name)} className="p-4 bg-slate-700 rounded-lg text-xl hover:bg-sky-600">
                        {name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FaceFileGame;