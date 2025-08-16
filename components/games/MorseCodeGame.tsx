import React, { useState, useEffect } from 'react';

const MORSE_CODE: { [key: string]: string } = { 'S': '...', 'O': '---' };
const WORD = "SOS";

interface MorseCodeGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const MorseCodeGame: React.FC<MorseCodeGameProps> = ({ level, onGameComplete }) => {
    const [userInput, setUserInput] = useState('');
    const [startTime, setStartTime] = useState(0);
    const [feedback, setFeedback] = useState('');

    const handleMouseDown = () => setStartTime(Date.now());
    const handleMouseUp = () => {
        const duration = Date.now() - startTime;
        const symbol = duration < 150 ? '.' : '-';
        setUserInput(u => u + symbol);
    };
    
    useEffect(() => {
        const targetCode = WORD.split('').map(char => MORSE_CODE[char]).join('');
        if (userInput.length >= targetCode.length) {
            if (userInput === targetCode) {
                setFeedback('Correct!');
                onGameComplete(100 * level);
            } else {
                setFeedback('Incorrect code.');
                onGameComplete(0);
            }
        }
    }, [userInput, level, onGameComplete]);

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Morse Code</h3>
            <p className="text-slate-400 mb-2">Tap out the word:</p>
            <p className="text-5xl font-mono tracking-widest mb-4">{WORD}</p>
            <p className="text-sm text-slate-500 mb-6">(Short tap for dot, long tap for dash)</p>

            <div className="w-full max-w-sm h-12 p-2 bg-slate-700/50 rounded-md mb-8 font-mono text-3xl">
                {userInput}
            </div>
            
            <button
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                className="w-32 h-32 bg-sky-600 rounded-full font-bold text-2xl active:bg-sky-400"
            >
                TAP
            </button>
            {feedback && <p className="mt-4 text-xl">{feedback}</p>}
        </div>
    );
};

export default MorseCodeGame;