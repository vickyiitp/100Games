import React, { useState, useMemo } from 'react';
import { BalanceIcon } from '../Icons';

interface Dilemma {
    text: string;
    choices: { text: string; consequence: string }[];
}

const DILEMMAS: Dilemma[] = [
    {
        text: "A runaway trolley is about to hit five people tied to the main track. You can pull a lever to divert it to a side track, but there is one person tied to that track. What do you do?",
        choices: [
            { text: "Pull the lever.", consequence: "You chose to sacrifice one person to save five." },
            { text: "Do nothing.", consequence: "You chose to let events unfold, resulting in five deaths." },
        ],
    },
    {
        text: "You are a doctor. Five patients will die without an organ transplant. A healthy person walks into your clinic for a check-up who is a perfect match for all five. Do you sacrifice the healthy person to save the five patients?",
        choices: [
            { text: "Sacrifice the one.", consequence: "You chose to actively harm one person to save five." },
            { text: "Let the five die.", consequence: "You chose to uphold your oath to do no harm, even at great cost." },
        ],
    }
];

interface MoralCompassGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const MoralCompassGame: React.FC<MoralCompassGameProps> = ({ level, onGameComplete }) => {
    const dilemma = useMemo(() => DILEMMAS[level % DILEMMAS.length], [level]);
    const [outcome, setOutcome] = useState<string | null>(null);

    const handleChoice = (consequence: string) => {
        setOutcome(consequence);
        // Scoring is complex for morals; here we just reward participation.
        setTimeout(() => onGameComplete(100 * level), 4000);
    };

    if (outcome) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-white text-center">
                <h3 className="text-3xl font-bold mb-4">Your Choice:</h3>
                <p className="text-xl max-w-lg">{outcome}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <BalanceIcon className="w-16 h-16 text-sky-400 mb-4" />
            <h3 className="text-2xl font-bold mb-4">Moral Compass</h3>
            
            <div className="w-full max-w-2xl p-6 bg-slate-700/50 rounded-lg mb-8">
                <p className="text-xl leading-relaxed">{dilemma.text}</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
                {dilemma.choices.map((choice, index) => (
                    <button
                        key={index}
                        onClick={() => handleChoice(choice.consequence)}
                        className="px-6 py-4 bg-slate-700 rounded-lg text-lg hover:bg-sky-600 transition-colors"
                    >
                        {choice.text}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MoralCompassGame;