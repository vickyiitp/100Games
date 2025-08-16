import React, { useState, useMemo } from 'react';

const WORD_POOL = ['Spaceship', 'Banana', 'Philosophy', 'Blue', 'Whispering', 'Engine', 'Cloud', 'Justice', 'Melody', 'Quantum'];

interface CreativeConstraintsGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const CreativeConstraintsGame: React.FC<CreativeConstraintsGameProps> = ({ level, onGameComplete }) => {
    const [userInput, setUserInput] = useState('');
    const [feedback, setFeedback] = useState('');

    const constraintWords = useMemo(() => {
        return [...WORD_POOL].sort(() => 0.5 - Math.random()).slice(0, 3);
    }, [level]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let score = 0;
        const lowerInput = userInput.toLowerCase();
        
        let wordsFound = 0;
        constraintWords.forEach(word => {
            if (lowerInput.includes(word.toLowerCase())) {
                wordsFound++;
            }
        });

        if (wordsFound < 3) {
            setFeedback('You must use all three constraint words.');
            return;
        }

        if (userInput.length < 15) {
            setFeedback('Your sentence is too short.');
            return;
        }

        // Simple scoring: words used + sentence length
        score = (wordsFound * 50) + userInput.length;
        setFeedback(`Great sentence! Score: ${score * level}`);
        
        setTimeout(() => onGameComplete(score * level), 1500);
    };

    return (
        <div className="flex flex-col items-center justify-start h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-2">Creative Constraints</h3>
            <p className="text-slate-400 mb-6">Write a single sentence using the following three words:</p>

            <div className="flex gap-4 mb-8">
                {constraintWords.map(word => (
                    <div key={word} className="p-3 bg-sky-500/30 text-sky-300 font-semibold rounded-lg">
                        {word}
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="w-full max-w-xl">
                <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your creative sentence here..."
                    className="w-full h-32 p-4 bg-slate-900 border-2 border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-300"
                />
                <button type="submit" className="mt-6 px-8 py-3 bg-green-600 rounded-full font-bold text-lg hover:bg-green-500 transition-colors">
                    Submit
                </button>
            </form>
            {feedback && <p className="mt-4 text-lg">{feedback}</p>}
        </div>
    );
};

export default CreativeConstraintsGame;