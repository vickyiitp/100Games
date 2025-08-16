import React, { useState, useEffect } from 'react';
import { ShoppingCartIcon } from '../Icons';

interface Resource {
    name: string;
    basePrice: number;
}

const RESOURCES: Resource[] = [
    { name: 'Grain', basePrice: 10 },
    { name: 'Metal', basePrice: 30 },
    { name: 'Gems', basePrice: 100 },
];

interface Market {
    name: string;
    prices: { [key: string]: number };
}

const generateMarkets = (level: number): Market[] => {
    const cityA: Market = { name: 'City A', prices: {} };
    const cityB: Market = { name: 'City B', prices: {} };
    RESOURCES.forEach(res => {
        cityA.prices[res.name] = Math.floor(res.basePrice * (1 + (Math.random() - 0.5) * 0.4));
        cityB.prices[res.name] = Math.floor(res.basePrice * (1 + (Math.random() - 0.5) * 0.4));
    });
    return [cityA, cityB];
};

interface MarketTraderGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const MarketTraderGame: React.FC<MarketTraderGameProps> = ({ level, onGameComplete }) => {
    const target = 500 + level * 100;
    const [cash, setCash] = useState(100);
    const [inventory, setInventory] = useState<{ [key: string]: number }>({ Grain: 0, Metal: 0, Gems: 0 });
    const [markets, setMarkets] = useState(() => generateMarkets(level));
    const [currentCity, setCurrentCity] = useState(0); // 0 for City A, 1 for City B

    const handleTrade = (action: 'buy' | 'sell', resource: string) => {
        const price = markets[currentCity].prices[resource];
        if (action === 'buy' && cash >= price) {
            setCash(c => c - price);
            setInventory(inv => ({...inv, [resource]: inv[resource] + 1}));
        } else if (action === 'sell' && inventory[resource] > 0) {
            setCash(c => c + price);
            setInventory(inv => ({...inv, [resource]: inv[resource] - 1}));
        }
    };
    
    useEffect(() => {
        if (cash >= target) {
            onGameComplete(cash);
        }
    }, [cash, target, onGameComplete]);

    return (
        <div className="flex flex-col items-center justify-start h-full text-white">
            <h3 className="text-2xl font-bold mb-2">Market Trader</h3>
            <p className="text-slate-400 mb-4">Reach ${target} cash to win!</p>

            <div className="w-full grid grid-cols-2 gap-4 text-center p-2 bg-slate-700/50 rounded-lg mb-6">
                <div><p className="text-sm text-slate-400">Cash</p><p className="font-bold text-green-400">${cash.toFixed(2)}</p></div>
                <div><p className="text-sm text-slate-400">Location</p><p className="font-bold">{markets[currentCity].name}</p></div>
            </div>
            
            <div className="w-full max-w-lg">
                {RESOURCES.map(res => (
                    <div key={res.name} className="flex justify-between items-center p-2 bg-slate-900/50 rounded-md mb-2">
                        <div>
                            <p className="font-bold text-lg">{res.name}</p>
                            <p className="text-sm">You have: {inventory[res.name]}</p>
                        </div>
                        <div className="text-right">
                           <p>Price: ${markets[currentCity].prices[res.name]}</p>
                           <div className="flex gap-2 mt-1">
                               <button onClick={() => handleTrade('buy', res.name)} className="px-3 py-1 bg-green-600 rounded-md text-sm">Buy</button>
                               <button onClick={() => handleTrade('sell', res.name)} className="px-3 py-1 bg-red-600 rounded-md text-sm">Sell</button>
                           </div>
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={() => setCurrentCity(c => 1 - c)} className="mt-6 px-8 py-3 bg-sky-600 rounded-full font-bold text-lg hover:bg-sky-500">
                Travel to {markets[1-currentCity].name}
            </button>
        </div>
    );
};

export default MarketTraderGame;