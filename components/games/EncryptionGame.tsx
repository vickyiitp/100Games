import React, { useState, useMemo } from 'react';

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const encrypt = (text: string, shift: number): string => {
    return text.toUpperCase().split('').map(char => {
        const index = ALPHABET.indexOf(char);
        if (index === -1) return char;
        return ALPHABET[(index + shift) % 26];
    }).join('');
};

interface EncryptionGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const EncryptionGame: React.FC<EncryptionGameProps> = ({ level, onGameComplete }) => {
    const { plaintext, shift } = useMemo(() => ({
        plaintext: "HELLO",
        shift: 3 + level
    }), [level]);
    const ciphertext = encrypt(plaintext, shift);
    
    const [userInput, setUserInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (parseInt(userInput) === shift) {
            onGameComplete(100 * level);
        } else {
            onGameComplete(0);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-2">Crack the Code</h3>
            <p className="text-slate-400 mb-6">This is a Caesar cipher. Find the shift value.</p>
            
            <div className="mb-6 text-center">
                <p>Plaintext: <span className="font-mono text-2xl text-green-400">{plaintext}</span></p>
                <p className="text-2xl font-thin my-1">↓</p>
                <p>Ciphertext: <span className="font-mono text-2xl text-red-400">{ciphertext}</span></p>
            </div>
            
            <form onSubmit={handleSubmit}>
                <label className="block mb-2">Shift Value (1-25):</label>
                <input 
                    type="number" 
                    min="1" max="25"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="w-48 p-2 bg-slate-700 rounded-md text-center text-xl"
                />
                <button type="submit" className="mt-4 px-6 py-2 bg-sky-600 rounded-full font-bold">Decrypt</button>
            </form>
        </div>
    );
};

export default EncryptionGame;