
import React, { useState, useEffect, useRef } from 'react';
import { Game } from '../../types';

interface FocusAttentionGameProps {
  level: number;
  onGameComplete: (score: number) => void;
  game: Game;
}

const FocusAttentionGame: React.FC<FocusAttentionGameProps> = ({ level, onGameComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isHolding, setIsHolding] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (isHolding) {
            intervalRef.current = setInterval(() => {
                setProgress(p => {
                    if (p >= 100) {
                        clearInterval(intervalRef.current!);
                        onGameComplete(100 * level);
                        return 100;
                    }
                    return p + 1;
                });
            }, 50); // Fill speed
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [isHolding, level, onGameComplete]);
    
    const handleMouseDown = () => setIsHolding(true);
    const handleMouseUp = () => setIsHolding(false);

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-4 z-10">Hold the button. Don't get distracted!</h3>
            
            <div className="w-full max-w-md bg-slate-700 rounded-full h-8 mb-8 z-10">
                <div className="bg-green-500 h-8 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>

            <button
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
                className="px-12 py-6 bg-sky-600 rounded-full font-bold text-2xl hover:bg-sky-500 transition-colors z-10 select-none"
            >
                Hold Me
            </button>
        </div>
    );
};

export default FocusAttentionGame;
