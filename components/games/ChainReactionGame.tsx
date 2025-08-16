import React, { useState, useEffect } from 'react';

interface Dot {
    id: number;
    x: number;
    y: number;
    radius: number;
    state: 'idle' | 'expanding' | 'fading';
}

interface ChainReactionGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const ChainReactionGame: React.FC<ChainReactionGameProps> = ({ level, onGameComplete }) => {
    const [dots, setDots] = useState<Dot[]>([]);
    const [clicksLeft, setClicksLeft] = useState(1);
    const [poppedCount, setPoppedCount] = useState(0);

    const numDots = 20 + level * 5;
    const targetCount = Math.floor(numDots * 0.5);

    useEffect(() => {
        const newDots: Dot[] = [];
        for (let i = 0; i < numDots; i++) {
            newDots.push({
                id: i,
                x: Math.random() * 500,
                y: Math.random() * 300,
                radius: 10,
                state: 'idle',
            });
        }
        setDots(newDots);
    }, [level, numDots]);

    const handleCanvasClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (clicksLeft <= 0) return;

        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const clickedDot = dots.find(dot => 
            dot.state === 'idle' && Math.hypot(dot.x - x, dot.y - y) < dot.radius
        );
        
        if (clickedDot) {
            setClicksLeft(c => c - 1);
            setDots(prevDots => prevDots.map(d => d.id === clickedDot.id ? { ...d, state: 'expanding' } : d));
        }
    };

    useEffect(() => {
        const gameLoop = setInterval(() => {
            let newPoppedCount = 0;
            let anythingHappening = false;

            setDots(prevDots => {
                const newDots = [...prevDots];
                const expandingDots = newDots.filter(d => d.state === 'expanding');

                for (const dot of newDots) {
                    if (dot.state === 'expanding') {
                        dot.radius += 2;
                        if (dot.radius > 50) dot.state = 'fading';
                        anythingHappening = true;
                    } else if (dot.state === 'fading') {
                        dot.radius -= 1;
                        if (dot.radius <= 0) dot.state = 'idle'; // Reset for simplicity
                        anythingHappening = true;
                    }
                }
                
                for (const idleDot of newDots.filter(d => d.state === 'idle')) {
                    for (const expander of expandingDots) {
                        if (Math.hypot(idleDot.x - expander.x, idleDot.y - expander.y) < expander.radius) {
                            idleDot.state = 'expanding';
                        }
                    }
                }

                newPoppedCount = newDots.filter(d => d.state !== 'idle').length;
                
                if (clicksLeft === 0 && !anythingHappening) {
                    clearInterval(gameLoop);
                    const score = poppedCount >= targetCount ? poppedCount * level : 0;
                    onGameComplete(score);
                }
                
                return newDots;
            });

            setPoppedCount(newPoppedCount);
            
        }, 50); // 20 FPS

        return () => clearInterval(gameLoop);
    }, [clicksLeft, onGameComplete, poppedCount, targetCount, level]);

    return (
        <div className="flex flex-col items-center justify-start h-full text-white">
            <h3 className="text-2xl font-bold mb-2">Chain Reaction</h3>
            <p className="text-slate-400 mb-4">Pop {targetCount} dots in {clicksLeft} click!</p>
            <div 
                onClick={handleCanvasClick}
                className="w-full h-full bg-slate-900/50 rounded-lg relative cursor-pointer"
                style={{width: 500, height: 300}}
            >
                {dots.map(dot => (
                    <div 
                        key={dot.id}
                        className={`absolute rounded-full ${dot.state === 'expanding' ? 'bg-sky-400' : 'bg-violet-500'}`}
                        style={{
                            left: dot.x - dot.radius,
                            top: dot.y - dot.radius,
                            width: dot.radius * 2,
                            height: dot.radius * 2,
                            opacity: dot.state === 'fading' ? dot.radius / 50 : 1,
                            transition: 'all 0.05s linear'
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default ChainReactionGame;