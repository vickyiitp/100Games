import React, { useState, useMemo } from 'react';

interface Scenario {
    text: string;
    options: { text: string; score: number }[];
}

const SCENARIOS: Scenario[] = [
    {
        text: "Your friend is excited about their new haircut, but you think it looks terrible. They ask, 'What do you think?'",
        options: [
            { text: "Tell them it looks awful.", score: -50 },
            { text: "Say, 'It's a bold new look! It'll take some getting used to.'", score: 80 },
            { text: "Enthusiastically lie and say you love it.", score: 40 },
            { text: "Change the subject immediately.", score: 10 },
        ]
    },
    {
        text: "You accidentally overhear two colleagues gossiping about you in the break room.",
        options: [
            { text: "Confront them angrily right then and there.", score: -30 },
            { text: "Ignore it, but treat them coldly from now on.", score: 20 },
            { text: "Address one of them privately later, saying 'I heard something that upset me...'", score: 100 },
            { text: "Start a new rumor about them as revenge.", score: -100 },
        ]
    }
];

interface SocialScenarioGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const SocialScenarioGame: React.FC<SocialScenarioGameProps> = ({ level, onGameComplete }) => {
    const scenario = useMemo(() => SCENARIOS[level % SCENARIOS.length], [level]);
    
    const handleAnswer = (score: number) => {
        onGameComplete(score * level);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Social Scenarios</h3>
            
            <div className="w-full max-w-2xl p-6 bg-slate-700/50 rounded-lg mb-8">
                <p className="text-xl italic">"{scenario.text}"</p>
            </div>
            
            <p className="text-slate-400 mb-4">How do you respond?</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                {scenario.options.map((option, i) => (
                    <button
                        key={i}
                        onClick={() => handleAnswer(option.score)}
                        className="p-4 h-full bg-slate-700 rounded-lg text-lg text-left hover:bg-sky-600 transition-colors"
                    >
                        {option.text}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SocialScenarioGame;