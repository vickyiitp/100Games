import React, { useState, useEffect, useRef } from 'react';

const DISTRACTIONS = ['🤯', '💥', '👻', '🚨', '🎉', '🤡'];

interface Distraction {
    id: number;
    emoji: string;
    pos: { top: string; left: string };
    size: number;
}

interface DistractionDodgerGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const DistractionDodgerGame: React.FC<DistractionDodgerGameProps> = ({ level, onGameComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isHolding, setIsHolding] = useState(false);
    const [distractions, setDistractions] = useState<Distraction[]>([]);

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const distractionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    
    useEffect(() => {
        const spawnDistraction = () => {
             setDistractions(d => [...d, {
                id: Date.now(),
                emoji: DISTRACTIONS[Math.floor(Math.random() * DISTRACTIONS.length)],
                pos: { top: `${Math.random() * 80}%`, left: `${Math.random() * 80}%`},
                size: Math.random() * 50 + 50,
            }]);
            
            const nextSpawnTime = Math.max(200, 1500 - level * 100);
            distractionTimerRef.current = setTimeout(spawnDistraction, nextSpawnTime);
        };
        
        distractionTimerRef.current = setTimeout(spawnDistraction, 1000);
        
        return () => {
            if (distractionTimerRef.current) clearTimeout(distractionTimerRef.current);
        };
    }, [level]);

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
            
            {distractions.map(d => (
                <div 
                    key={d.id} 
                    className="absolute animate-fade-in-out" 
                    style={{ top: d.pos.top, left: d.pos.left, fontSize: `${d.size}px`}}
                >
                    {d.emoji}
                </div>
            ))}
        </div>
    );
};

// Add keyframes for fade-in-out animation
const style = document.createElement('style');
style.innerHTML = `
@keyframes fade-in-out {
    0% { opacity: 0; transform: scale(0.5); }
    20% { opacity: 1; transform: scale(1); }
    80% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(1.2); }
}
.animate-fade-in-out {
    animation: fade-in-out 1s ease-in-out forwards;
}
`;
document.head.appendChild(style);


export default DistractionDodgerGame;