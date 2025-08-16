import React, { useState, useEffect, useMemo } from 'react';
import { CogIcon, PlayIcon, PowerIcon, SquareIcon } from '../Icons';

const ICONS = [
    (props: any) => <CogIcon {...props} />,
    (props: any) => <PowerIcon {...props} />,
    (props: any) => <SquareIcon {...props} />,
    (props: any) => <PlayIcon {...props} />,
];

interface AssemblyLineGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const AssemblyLineGame: React.FC<AssemblyLineGameProps> = ({ level, onGameComplete }) => {
    const sequenceLength = useMemo(() => Math.min(ICONS.length, 2 + level), [level]);
    const [correctSequence, setCorrectSequence] = useState<number[]>([]);
    const [jumbledOptions, setJumbledOptions] = useState<number[]>([]);
    const [playerSequence, setPlayerSequence] = useState<number[]>([]);

    useEffect(() => {
        const newSequence = Array.from({ length: ICONS.length }, (_, i) => i)
            .sort(() => 0.5 - Math.random())
            .slice(0, sequenceLength);
        
        setCorrectSequence(newSequence);
        setJumbledOptions([...newSequence].sort(() => 0.5 - Math.random()));
        setPlayerSequence([]);
    }, [level, sequenceLength]);

    const handleOptionClick = (iconIndex: number) => {
        const newPlayerSequence = [...playerSequence, iconIndex];
        setPlayerSequence(newPlayerSequence);

        const newJumbledOptions = jumbledOptions.filter(opt => opt !== iconIndex);
        setJumbledOptions(newJumbledOptions);
        
        if (newPlayerSequence.length === correctSequence.length) {
            const isCorrect = newPlayerSequence.every((val, index) => val === correctSequence[index]);
            const score = isCorrect ? 100 * level * sequenceLength : 0;
            setTimeout(() => onGameComplete(score), 500);
        }
    };
    
    return (
        <div className="flex flex-col items-center justify-start h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-2">Assembly Line</h3>
            <p className="text-slate-400 mb-6">Click the components in the correct order to build the product.</p>

            <div className="mb-4">
                <p className="text-sm text-slate-500 mb-2">Final Product</p>
                <div className="flex gap-2 p-2 bg-slate-700/50 rounded-lg border-2 border-sky-500">
                    {correctSequence.map(iconIndex => {
                        const Icon = ICONS[iconIndex];
                        return <div key={iconIndex} className="w-12 h-12 text-sky-300"><Icon /></div>;
                    })}
                </div>
            </div>

            <div className="mb-6">
                <p className="text-sm text-slate-500 mb-2">Your Assembly</p>
                 <div className="flex gap-2 p-2 h-20 bg-slate-700/50 rounded-lg">
                    {playerSequence.map(iconIndex => {
                        const Icon = ICONS[iconIndex];
                        return <div key={iconIndex} className="w-12 h-12 text-white"><Icon /></div>;
                    })}
                </div>
            </div>
            
            <div>
                <p className="text-sm text-slate-500 mb-2">Available Components</p>
                <div className="flex gap-4 p-4 justify-center">
                    {jumbledOptions.map(iconIndex => {
                        const Icon = ICONS[iconIndex];
                        return (
                            <button key={iconIndex} onClick={() => handleOptionClick(iconIndex)} className="w-16 h-16 p-2 bg-slate-700 rounded-lg hover:bg-slate-600">
                                <Icon />
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AssemblyLineGame;
