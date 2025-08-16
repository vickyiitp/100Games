import React, { useState, useEffect, useRef } from 'react';

interface Note {
    id: number;
    time: number; // when it should be hit, in ms from start
}

interface RhythmFlowGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const RhythmFlowGame: React.FC<RhythmFlowGameProps> = ({ level, onGameComplete }) => {
    const songDuration = 20000; // 20 seconds
    const noteSpeed = 2000; // time for note to travel across screen
    const [notes, setNotes] = useState<Note[]>([]);
    const [startTime, setStartTime] = useState(0);
    const [score, setScore] =useState(0);
    
    const gameAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const numNotes = 10 + level * 2;
        const newNotes: Note[] = [];
        for (let i = 0; i < numNotes; i++) {
            newNotes.push({ id: i, time: (songDuration / numNotes) * (i + 1) });
        }
        setNotes(newNotes);
        setStartTime(Date.now());
    }, [level]);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            onGameComplete(score);
        }, songDuration + noteSpeed);
        return () => clearTimeout(timer);
    }, [score, onGameComplete]);

    const handleTap = () => {
        const currentTime = Date.now() - startTime;
        let points = 0;
        
        notes.forEach(note => {
            const hitWindow = 200; // ms
            if (Math.abs(currentTime - note.time) < hitWindow) {
                points += 10; // Perfect hit
            }
        });
        
        if (points > 0) {
            setScore(s => s + points * level);
            // In a real game, you'd remove the hit note
        } else {
            setScore(s => Math.max(0, s - 5)); // Penalty for mistiming
        }
    };
    
    const elapsed = Date.now() - startTime;

    return (
        <div className="flex flex-col items-center justify-between h-full text-white text-center">
            <div className="w-full flex justify-between items-center p-2 bg-slate-700/50 rounded-lg">
                <p>Score: <span className="font-bold text-sky-300">{score}</span></p>
            </div>
            
            <div ref={gameAreaRef} className="relative w-full h-24 my-4 bg-slate-900/50 rounded-lg overflow-hidden">
                {/* Target Line */}
                <div className="absolute top-0 left-[10%] w-1 h-full bg-sky-400 z-10"></div>

                {notes.map(note => {
                    const travelTime = elapsed - (note.time - noteSpeed);
                    const position = (travelTime / noteSpeed) * 100;
                    if (position < 0 || position > 100) return null;
                    return (
                        <div 
                            key={note.id} 
                            className="absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-violet-500 rounded-full"
                            style={{ left: `${position}%`}}
                        ></div>
                    );
                })}
            </div>
            
            <button
                onClick={handleTap}
                className="w-32 h-32 bg-sky-600 rounded-full font-bold text-2xl active:bg-sky-400 transition-colors"
            >
                TAP
            </button>
        </div>
    );
};

export default RhythmFlowGame;