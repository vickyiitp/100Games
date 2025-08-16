import React, { useState, useMemo } from 'react';

interface DiplomacyDuelGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const DiplomacyDuelGame: React.FC<DiplomacyDuelGameProps> = ({ level, onGameComplete }) => {
    const aiPersonality = useMemo(() => (level % 2 === 0 ? 'Generous' : 'Greedy'), [level]);
    const [playerResources, setPlayerResources] = useState({ wood: 10, stone: 20 });
    const [aiResources, setAiResources] = useState({ wood: 20, stone: 10 });
    const [outcome, setOutcome] = useState('');

    const handleOffer = (offer: 'generous' | 'fair' | 'greedy') => {
        let success = false;
        let score = 0;

        if (offer === 'generous') { // Offer 15 stone for 10 wood
            success = true;
            score = 50;
        } else if (offer === 'fair') { // Offer 10 stone for 10 wood
            success = aiPersonality === 'Generous' || Math.random() > 0.3;
            score = success ? 100 : 0;
        } else { // Offer 5 stone for 10 wood
            success = aiPersonality === 'Generous' && Math.random() > 0.7;
            score = success ? 200 : 0;
        }

        if (success) {
            setOutcome('Deal Accepted! You got the wood.');
            onGameComplete(score * level);
        } else {
            setOutcome('Deal Rejected! The negotiations failed.');
            onGameComplete(0);
        }
    };
    
    if (outcome) {
        return <div className="text-2xl text-center font-bold">{outcome}</div>
    }

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-2">Diplomacy Duel</h3>
            <p className="text-slate-400 mb-6">You need 10 wood. Make an offer to your rival.</p>
            
            <div className="w-full max-w-lg grid grid-cols-2 gap-4 p-4 bg-slate-700/50 rounded-lg mb-8">
                <div>Your Resources: {playerResources.wood} Wood, {playerResources.stone} Stone</div>
                <div>Rival's Resources: {aiResources.wood} Wood, {aiResources.stone} Stone</div>
            </div>

            <div className="flex flex-col gap-4">
                <button onClick={() => handleOffer('generous')} className="p-4 bg-slate-700 rounded-lg hover:bg-sky-600">
                    Offer 15 stone for 10 wood
                </button>
                <button onClick={() => handleOffer('fair')} className="p-4 bg-slate-700 rounded-lg hover:bg-sky-600">
                    Offer 10 stone for 10 wood
                </button>
                <button onClick={() => handleOffer('greedy')} className="p-4 bg-slate-700 rounded-lg hover:bg-sky-600">
                    Offer 5 stone for 10 wood
                </button>
            </div>
        </div>
    );
};

export default DiplomacyDuelGame;