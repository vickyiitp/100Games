import React, { useState, useEffect } from 'react';
import { ChartBarIcon } from '../Icons';

interface InvestmentSimGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const InvestmentSimGame: React.FC<InvestmentSimGameProps> = ({ level, onGameComplete }) => {
    const target = 1000 + level * 200;
    const totalDays = 15;

    const [cash, setCash] = useState(500);
    const [shares, setShares] = useState(0);
    const [price, setPrice] = useState(50);
    const [day, setDay] = useState(1);
    const [history, setHistory] = useState([50]);

    useEffect(() => {
        if (day > totalDays) {
            const finalValue = cash + shares * price;
            const score = Math.floor(finalValue - 500); // Score is profit
            onGameComplete(score);
        }
    }, [day]);
    
    useEffect(() => {
        if (cash + shares * price >= target) {
            const finalValue = cash + shares * price;
            const score = Math.floor(finalValue - 500) + (totalDays - day) * 10 * level; // Bonus for finishing early
            onGameComplete(score);
        }
    }, [cash, shares, price, target]);

    const nextDay = () => {
        // Simple random walk for price movement
        const changePercent = (Math.random() - 0.45) * 0.2; // -9% to +11% change
        const newPrice = Math.max(10, price * (1 + changePercent));
        setPrice(parseFloat(newPrice.toFixed(2)));
        setHistory(h => [...h, newPrice].slice(-10)); // Keep last 10 prices
        setDay(d => d + 1);
    };

    const handleBuy = () => {
        if (cash >= price) {
            setShares(s => s + 1);
            setCash(c => c - price);
        }
    };

    const handleSell = () => {
        if (shares > 0) {
            setShares(s => s - 1);
            setCash(c => c + price);
        }
    };
    
    return (
        <div className="flex flex-col items-center justify-start h-full text-white">
            <h3 className="text-2xl font-bold mb-2">Investment Sim</h3>
            <p className="text-slate-400 mb-4">Reach ${target} to win! Day {day}/{totalDays}</p>

             <div className="w-full grid grid-cols-3 gap-4 text-center p-2 bg-slate-700/50 rounded-lg mb-6">
                <div><p className="text-sm text-slate-400">Cash</p><p className="font-bold text-green-400">${cash.toFixed(2)}</p></div>
                <div><p className="text-sm text-slate-400">Shares</p><p className="font-bold">{shares}</p></div>
                <div><p className="text-sm text-slate-400">Total Value</p><p className="font-bold text-sky-300">${(cash + shares * price).toFixed(2)}</p></div>
            </div>

            <div className="w-full p-4 bg-slate-900/50 rounded-lg mb-6">
                <p className="text-center">Stock Price: <span className="text-2xl font-bold text-yellow-300">${price.toFixed(2)}</span></p>
                {/* A simple chart could be rendered here using the history state */}
            </div>

            <div className="flex gap-4">
                 <button onClick={handleBuy} disabled={cash < price} className="px-6 py-3 bg-green-600 rounded-full font-bold text-lg hover:bg-green-500 disabled:bg-gray-500 transition-colors">
                    Buy (1)
                </button>
                 <button onClick={handleSell} disabled={shares === 0} className="px-6 py-3 bg-red-600 rounded-full font-bold text-lg hover:bg-red-500 disabled:bg-gray-500 transition-colors">
                    Sell (1)
                </button>
                 <button onClick={nextDay} className="px-6 py-3 bg-sky-600 rounded-full font-bold text-lg hover:bg-sky-500 transition-colors">
                    Next Day
                </button>
            </div>
        </div>
    );
};

export default InvestmentSimGame;
