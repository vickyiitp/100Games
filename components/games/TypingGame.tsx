import React, { useState, useEffect, useRef } from 'react';
import { KeyboardIcon } from '../Icons';

const TEXT_SAMPLES = [
    "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet.",
    "MindSpark Hub is a futuristic platform designed to enhance cognitive skills through engaging gameplay.",
    "Logic, memory, and timing are crucial abilities that can be improved with consistent practice and effort.",
    "Creativity is intelligence having fun. Explore new ideas and challenge your perspective daily.",
    "The journey of a thousand miles begins with a single step. Stay focused and keep moving forward."
];

const GAME_DURATION = 30; // 30 seconds

interface TypingGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const TypingGame: React.FC<TypingGameProps> = ({ level, onGameComplete }) => {
    const [textToType] = useState(TEXT_SAMPLES[level % TEXT_SAMPLES.length]);
    const [userInput, setUserInput] = useState("");
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [isStarted, setIsStarted] = useState(false);
    
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isStarted && timeLeft > 0) {
            timerRef.current = setTimeout(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            const finalScore = Math.floor(wpm * (accuracy / 100)) * level;
            onGameComplete(finalScore);
        }
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [timeLeft, isStarted, wpm, accuracy, level, onGameComplete]);
    
    useEffect(() => {
        if(isStarted) {
             const wordsTyped = userInput.trim().split(/\s+/).length;
             const timeElapsed = GAME_DURATION - timeLeft;
             const currentWpm = timeElapsed > 0 ? (wordsTyped / timeElapsed) * 60 : 0;
             setWpm(Math.round(currentWpm));
             
             let correctChars = 0;
             userInput.split('').forEach((char, index) => {
                 if (textToType[index] === char) {
                     correctChars++;
                 }
             });
             const currentAccuracy = userInput.length > 0 ? (correctChars / userInput.length) * 100 : 100;
             setAccuracy(Math.round(currentAccuracy));
        }
    }, [userInput, timeLeft, isStarted, textToType]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isStarted) {
            setIsStarted(true);
        }
        setUserInput(e.target.value);
    };
    
    const getHighlightedText = () => {
        return textToType.split('').map((char, index) => {
            let color = 'text-slate-500';
            if (index < userInput.length) {
                color = char === userInput[index] ? 'text-green-400' : 'text-red-500';
            }
            return <span key={index} className={color}>{char}</span>
        });
    };

    return (
        <div className="flex flex-col items-center justify-between h-full text-white">
            <div className="w-full grid grid-cols-3 gap-4 text-center p-4 bg-slate-700/50 rounded-lg">
                <div>
                    <p className="text-sm text-slate-400">Time Left</p>
                    <p className="text-3xl font-bold text-violet-300">{timeLeft}s</p>
                </div>
                 <div>
                    <p className="text-sm text-slate-400">WPM</p>
                    <p className="text-3xl font-bold text-sky-300">{wpm}</p>
                </div>
                 <div>
                    <p className="text-sm text-slate-400">Accuracy</p>
                    <p className="text-3xl font-bold text-green-300">{accuracy}%</p>
                </div>
            </div>
            
            <div className="w-full p-6 my-4 bg-slate-900/50 rounded-lg text-2xl tracking-wider font-mono text-left" onClick={() => inputRef.current?.focus()}>
                {getHighlightedText()}
            </div>
            
            <div className="w-full flex items-center gap-4">
                <KeyboardIcon className="w-8 h-8 text-slate-400" />
                 <input
                    ref={inputRef}
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    disabled={timeLeft === 0}
                    autoFocus
                    className="flex-grow text-lg p-3 bg-slate-700 border-2 border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
            </div>
        </div>
    );
};

export default TypingGame;
