import React, { useState, useMemo } from 'react';

interface StoryProblem {
    story: string;
    question: string;
    options: string[];
    correctIndex: number;
}

const STORIES: StoryProblem[] = [
    {
        story: "Sarah felt a rush of excitement. After weeks of practicing, her violin recital was tonight. Her palms were sweaty, but she couldn't stop smiling as she imagined the applause.",
        question: "How was Sarah feeling about her recital?",
        options: ["Nervous and Dreadful", "Excited and a little Anxious", "Calm and Collected", "Angry and Frustrated"],
        correctIndex: 1,
    },
    {
        story: "The old lighthouse keeper, John, scanned the stormy sea. He had seen many tempests, but this one felt different. The wind howled like a hungry wolf, and the waves crashed against the rocks with unusual fury. He knew he had to keep the light burning bright.",
        question: "What was John's primary responsibility?",
        options: ["To calm the storm", "To predict the weather", "To keep the lighthouse lamp lit", "To rescue ships"],
        correctIndex: 2,
    }
];

interface ActiveListenerGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const ActiveListenerGame: React.FC<ActiveListenerGameProps> = ({ level, onGameComplete }) => {
    const [view, setView] = useState<'reading' | 'answering'>('reading');
    const problem = useMemo(() => STORIES[level % STORIES.length], [level]);

    const handleAnswer = (index: number) => {
        const score = index === problem.correctIndex ? 100 * level : 0;
        onGameComplete(score);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            {view === 'reading' && (
                <>
                    <h3 className="text-2xl font-bold mb-4">Read the passage carefully:</h3>
                    <div className="w-full max-w-2xl p-6 bg-slate-700/50 rounded-lg mb-6 text-lg text-left leading-relaxed">
                        {problem.story}
                    </div>
                    <button 
                        onClick={() => setView('answering')}
                        className="px-8 py-3 bg-sky-500 rounded-full font-bold text-lg hover:bg-sky-400 transition-colors"
                    >
                        I'm ready
                    </button>
                </>
            )}

            {view === 'answering' && (
                <>
                    <h3 className="text-2xl font-bold mb-4">{problem.question}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
                        {problem.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(index)}
                                className="p-4 bg-slate-700 rounded-lg text-lg hover:bg-sky-600 transition-colors"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ActiveListenerGame;
