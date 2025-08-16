import React, { useState, useEffect } from 'react';
import { GavelIcon } from '../Icons';

interface AuctionAceGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const AuctionAceGame: React.FC<AuctionAceGameProps> = ({ level, onGameComplete }) => {
    const [cash, setCash] = useState(100 + level * 20);
    const [itemValue] = useState(50 + Math.floor(Math.random() * 50));
    const [currentBid, setCurrentBid] = useState(10);
    const [highestBidder, setHighestBidder] = useState('AI');
    const [outcome, setOutcome] = useState('');

    useEffect(() => {
        const aiTurn = () => {
            if (highestBidder === 'Player' && currentBid < itemValue * 1.2) {
                const aiMaxBid = itemValue * (0.8 + Math.random() * 0.4); // AI bids around the value
                if (currentBid < aiMaxBid) {
                    const newBid = currentBid + 10;
                    setCurrentBid(newBid);
                    setHighestBidder('AI');
                } else {
                    // AI folds
                }
            }
        };
        const timer = setTimeout(aiTurn, 1500);
        return () => clearTimeout(timer);
    }, [highestBidder, currentBid, itemValue]);

    const handleBid = () => {
        const newBid = currentBid + 10;
        if (cash >= newBid) {
            setCurrentBid(newBid);
            setHighestBidder('Player');
        }
    };

    const handleFold = () => {
        if (highestBidder === 'Player') {
            setOutcome(`You won the item for $${currentBid}!`);
            onGameComplete((itemValue - currentBid) * 10);
        } else {
            setOutcome('You folded. The AI won the item.');
            onGameComplete(cash); // Score is remaining cash
        }
    };

    if (outcome) {
        return <div className="text-2xl text-center font-bold">{outcome}</div>
    }

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-2">Auction Ace</h3>
            <div className="w-full grid grid-cols-2 gap-4 text-center p-2 bg-slate-700/50 rounded-lg mb-6">
                <div><p className="text-sm">Your Cash</p><p className="font-bold text-green-400">${cash}</p></div>
                <div><p className="text-sm">Item Value</p><p className="font-bold text-yellow-300">~${itemValue}</p></div>
            </div>
            
            <div className="mb-6">
                <p className="text-lg">Current Bid:</p>
                <p className="text-5xl font-bold text-sky-300">${currentBid}</p>
                <p className="text-sm">Highest Bidder: {highestBidder}</p>
            </div>

            <div className="flex gap-4">
                <button onClick={handleBid} disabled={highestBidder === 'Player'} className="px-8 py-3 bg-green-600 rounded-full font-bold disabled:bg-gray-500">Bid</button>
                <button onClick={handleFold} className="px-8 py-3 bg-red-600 rounded-full font-bold">Fold</button>
            </div>
        </div>
    );
};

export default AuctionAceGame;