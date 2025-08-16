import React, { useState, useEffect } from 'react';
import { TrafficLightIcon } from '../Icons';

// Simplified logic - no actual car movement visualization
interface TrafficControlGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const TrafficControlGame: React.FC<TrafficControlGameProps> = ({ level, onGameComplete }) => {
    const [lights, setLights] = useState({ northSouth: 'green', eastWest: 'red' });
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);

    // Random events
    useEffect(() => {
        const eventTimer = setInterval(() => {
            const carFlowNorthSouth = Math.random();
            const carFlowEastWest = Math.random();
            let scoreChange = 0;
            if (lights.northSouth === 'green') scoreChange += Math.floor(carFlowNorthSouth * 10);
            if (lights.eastWest === 'green') scoreChange += Math.floor(carFlowEastWest * 10);
            if (lights.northSouth === 'green' && lights.eastWest === 'green') scoreChange -= 50; // Crash!
            setScore(s => Math.max(0, s + scoreChange));
        }, 1000);
        return () => clearInterval(eventTimer);
    }, [lights]);

    // Game timer
    useEffect(() => {
        if (timeLeft <= 0) {
            onGameComplete(score * level);
            return;
        }
        const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
        return () => clearTimeout(timer);
    }, [timeLeft, onGameComplete, score, level]);

    const toggleLights = () => {
        setLights(l => ({
            northSouth: l.northSouth === 'green' ? 'red' : 'green',
            eastWest: l.eastWest === 'green' ? 'red' : 'green',
        }));
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Traffic Control</h3>
            <div className="w-full grid grid-cols-2 gap-4 text-center p-2 bg-slate-700/50 rounded-lg mb-6">
                <div><p className="text-sm">Score</p><p className="font-bold text-sky-300">{score}</p></div>
                <div><p className="text-sm">Time Left</p><p className="font-bold text-violet-300">{timeLeft}s</p></div>
            </div>

            <div className="flex gap-8 items-center mb-8">
                <div>
                    <p>North/South</p>
                    <div className={`w-8 h-8 rounded-full ${lights.northSouth === 'green' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                </div>
                 <div>
                    <p>East/West</p>
                    <div className={`w-8 h-8 rounded-full ${lights.eastWest === 'green' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                </div>
            </div>
            
            <button onClick={toggleLights} className="px-8 py-4 bg-yellow-500 text-black rounded-full font-bold">Change Lights</button>
        </div>
    );
};

export default TrafficControlGame;