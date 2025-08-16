import React, { useState, useMemo } from 'react';

const ITEM_POOL = ["🍎", "🍌", "🍞", "🥛", "🧀", "🍗", "🥕", "🥦", "🍕", "🍔", "🍓", "🍇", "🍩", "🍪", "🥚", "🌶️"];

interface ShoppingListGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const ShoppingListGame: React.FC<ShoppingListGameProps> = ({ level, onGameComplete }) => {
    const [gameState, setGameState] = useState<'memorize' | 'select'>('memorize');
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

    const { list, options } = useMemo(() => {
        const listSize = Math.min(10, 4 + level);
        const shuffledPool = [...ITEM_POOL].sort(() => 0.5 - Math.random());
        const newList = shuffledPool.slice(0, listSize);
        const newOptions = [...ITEM_POOL].sort(() => 0.5 - Math.random());
        return { list: newList, options: newOptions };
    }, [level]);
    
    const handleItemClick = (item: string) => {
        const newSelected = new Set(selectedItems);
        if (newSelected.has(item)) {
            newSelected.delete(item);
        } else {
            newSelected.add(item);
        }
        setSelectedItems(newSelected);
    };

    const checkList = () => {
        let correctCount = 0;
        let incorrectCount = 0;
        selectedItems.forEach(item => {
            if (list.includes(item)) {
                correctCount++;
            } else {
                incorrectCount++;
            }
        });
        
        const missedCount = list.length - correctCount;
        const score = (correctCount * 50 - (incorrectCount + missedCount) * 25) * level;
        onGameComplete(Math.max(0, score));
    };

    if (gameState === 'memorize') {
        return (
            <div className="flex flex-col items-center justify-center h-full text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Memorize Your Shopping List</h3>
                <div className="grid grid-cols-4 gap-4 p-4 bg-slate-700/50 rounded-lg mb-8">
                    {list.map(item => <div key={item} className="text-4xl">{item}</div>)}
                </div>
                <button onClick={() => setGameState('select')} className="px-8 py-3 bg-sky-500 rounded-full font-bold">Go to Store</button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Select the items from your list.</h3>
            <div className="grid grid-cols-4 gap-2 p-2 bg-slate-900/50 rounded-lg">
                {options.map(item => (
                    <button
                        key={item}
                        onClick={() => handleItemClick(item)}
                        className={`w-16 h-16 text-4xl rounded-md transition-colors ${selectedItems.has(item) ? 'bg-sky-500' : 'bg-slate-700 hover:bg-slate-600'}`}
                    >
                        {item}
                    </button>
                ))}
            </div>
            <button onClick={checkList} className="mt-6 px-8 py-3 bg-green-600 rounded-full font-bold">Checkout</button>
        </div>
    );
};

export default ShoppingListGame;