import React, { useState, useEffect, useMemo } from 'react';

const SHAPES = ['circle', 'square'];
const COLORS = ['bg-red-500', 'bg-blue-500', 'bg-green-500'];

interface Item {
    id: number;
    shape: 'circle' | 'square';
    color: 'bg-red-500' | 'bg-blue-500' | 'bg-green-500';
    pos: { top: string; left: string };
}

interface Rule {
    text: string;
    isValid: (item: Item) => boolean;
}

const RULES: Rule[] = [
    { text: "Click the RED shapes", isValid: (item) => item.color === 'bg-red-500' },
    { text: "Click the BLUE shapes", isValid: (item) => item.color === 'bg-blue-500' },
    { text: "Click the CIRCLES", isValid: (item) => item.shape === 'circle' },
    { text: "Click the SQUARES", isValid: (item) => item.shape === 'square' },
    { text: "Click the GREEN SQUARES", isValid: (item) => item.color === 'bg-green-500' && item.shape === 'square' },
];

interface AttentionShiftGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const AttentionShiftGame: React.FC<AttentionShiftGameProps> = ({ level, onGameComplete }) => {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(20);
    const [items, setItems] = useState<Item[]>([]);
    const [rule, setRule] = useState<Rule>(() => RULES[0]);

    // Change rule interval
    useEffect(() => {
        const interval = setInterval(() => {
            setRule(RULES[Math.floor(Math.random() * RULES.length)]);
        }, Math.max(2000, 5000 - level * 200));
        return () => clearInterval(interval);
    }, [level]);

    // Game timer
    useEffect(() => {
        if (timeLeft <= 0) {
            onGameComplete(score);
            return;
        }
        const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
        return () => clearTimeout(timer);
    }, [timeLeft, onGameComplete, score]);
    
    // Spawn items
     useEffect(() => {
        const spawnItem = () => {
            setItems(currentItems => {
                const newItems = currentItems.filter(i => i.id > Date.now() - 3000); // Keep items for 3s
                return [...newItems, {
                    id: Date.now(),
                    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)] as 'circle' | 'square',
                    color: COLORS[Math.floor(Math.random() * COLORS.length)] as 'bg-red-500' | 'bg-blue-500' | 'bg-green-500',
                    pos: { top: `${Math.random() * 80 + 10}%`, left: `${Math.random() * 80 + 10}%` },
                }];
            });
        };
        const interval = setInterval(spawnItem, 800);
        return () => clearInterval(interval);
    }, []);

    const handleItemClick = (item: Item) => {
        if (rule.isValid(item)) {
            setScore(s => s + 10 * level);
        } else {
            setScore(s => Math.max(0, s - 5 * level));
        }
        setItems(i => i.filter(i => i.id !== item.id)); // Remove clicked item
    };

    return (
        <div className="flex flex-col items-center justify-start h-full text-white">
            <div className="w-full grid grid-cols-3 gap-4 text-center p-2 bg-slate-700/50 rounded-lg mb-4">
                <div><p className="text-sm text-slate-400">Score</p><p className="font-bold text-sky-300">{score}</p></div>
                <div className="col-span-2"><p className="text-sm text-slate-400">Rule</p><p className="font-bold text-yellow-300 text-lg">{rule.text}</p></div>
            </div>
            <div className="relative w-full h-full bg-slate-900/50 rounded-lg">
                {items.map(item => (
                    <div 
                        key={item.id}
                        onClick={() => handleItemClick(item)}
                        className={`absolute w-16 h-16 cursor-pointer ${item.color} ${item.shape === 'circle' ? 'rounded-full' : 'rounded-md'}`}
                        style={{ top: item.pos.top, left: item.pos.left }}
                    />
                ))}
            </div>
        </div>
    );
};

export default AttentionShiftGame;