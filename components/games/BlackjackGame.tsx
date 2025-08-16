import React, { useState, useEffect } from 'react';

const CARDS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const getCardValue = (card: string): number => {
    if (['J', 'Q', 'K'].includes(card)) return 10;
    if (card === 'A') return 11; // Simplified: Ace is always 11
    return parseInt(card);
}

interface BlackjackGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const BlackjackGame: React.FC<BlackjackGameProps> = ({ level, onGameComplete }) => {
    const [playerHand, setPlayerHand] = useState<string[]>([]);
    const [dealerHand, setDealerHand] = useState<string[]>([]);
    const [outcome, setOutcome] = useState('');

    const dealCard = () => CARDS[Math.floor(Math.random() * CARDS.length)];
    const getHandValue = (hand: string[]) => hand.reduce((sum, card) => sum + getCardValue(card), 0);

    useEffect(() => {
        setPlayerHand([dealCard(), dealCard()]);
        setDealerHand([dealCard()]);
    }, [level]);
    
    useEffect(() => {
        if (getHandValue(playerHand) > 21) {
            setOutcome('Bust! You lose.');
            onGameComplete(0);
        }
    }, [playerHand, onGameComplete]);

    const handleHit = () => {
        if (!outcome) setPlayerHand(h => [...h, dealCard()]);
    };

    const handleStand = () => {
        if (outcome) return;
        let currentDealerHand = [...dealerHand, dealCard()];
        while (getHandValue(currentDealerHand) < 17) {
            currentDealerHand.push(dealCard());
        }
        setDealerHand(currentDealerHand);
        
        const playerScore = getHandValue(playerHand);
        const dealerScore = getHandValue(currentDealerHand);

        if (dealerScore > 21 || playerScore > dealerScore) {
            setOutcome('You win!');
            onGameComplete(playerScore * 10 * level);
        } else if (playerScore < dealerScore) {
            setOutcome('Dealer wins.');
            onGameComplete(0);
        } else {
            setOutcome('Push! It\'s a tie.');
            onGameComplete(10 * level); // Small score for a tie
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Blackjack</h3>
            
            <div className="mb-4">
                <p>Dealer's Hand ({getHandValue(dealerHand)})</p>
                <div className="flex gap-2">{dealerHand.map((c, i) => <div key={i} className="w-12 h-16 bg-red-800 rounded-md flex items-center justify-center font-bold">{c}</div>)}</div>
            </div>
            
             <div className="mb-8">
                <p>Your Hand ({getHandValue(playerHand)})</p>
                <div className="flex gap-2">{playerHand.map((c, i) => <div key={i} className="w-12 h-16 bg-blue-800 rounded-md flex items-center justify-center font-bold">{c}</div>)}</div>
            </div>
            
            {outcome ? <p className="text-3xl font-bold">{outcome}</p> : (
                 <div className="flex gap-4">
                    <button onClick={handleHit} className="px-8 py-3 bg-green-600 rounded-full font-bold">Hit</button>
                    <button onClick={handleStand} className="px-8 py-3 bg-sky-600 rounded-full font-bold">Stand</button>
                </div>
            )}
        </div>
    );
};

export default BlackjackGame;