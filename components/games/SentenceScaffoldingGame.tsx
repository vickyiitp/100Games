import React, { useState, useMemo } from 'react';

interface SentenceProblem {
    parts: string[];
    blanks: { options: string[], answer: string }[];
}

const PROBLEMS: SentenceProblem[] = [
    {
        parts: ["Although the storm was ", ", the team ", " to finish the project."],
        blanks: [
            { options: ["raging", "calm", "sunny"], answer: "raging" },
            { options: ["stopped", "persisted", "forgot"], answer: "persisted" },
        ]
    },
    {
        parts: ["The ", " artifact, which was discovered ", ", provided new insights into the ancient culture."],
        blanks: [
            { options: ["ancient", "modern", "bland"], answer: "ancient" },
            { options: ["yesterday", "underwater", "unexpectedly"], answer: "unexpectedly" },
        ]
    }
];

interface SentenceScaffoldingGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const SentenceScaffoldingGame: React.FC<SentenceScaffoldingGameProps> = ({ level, onGameComplete }) => {
    const problem = useMemo(() => PROBLEMS[level % PROBLEMS.length], [level]);
    const [answers, setAnswers] = useState<string[]>(Array(problem.blanks.length).fill(''));

    const handleSelect = (blankIndex: number, value: string) => {
        const newAnswers = [...answers];
        newAnswers[blankIndex] = value;
        setAnswers(newAnswers);
    };
    
    const handleSubmit = () => {
        let correctCount = 0;
        answers.forEach((ans, i) => {
            if (ans === problem.blanks[i].answer) {
                correctCount++;
            }
        });
        const score = (correctCount / problem.blanks.length) * 100 * level;
        onGameComplete(score);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-2">Sentence Scaffolding</h3>
            <p className="text-slate-400 mb-8">Fill in the blanks to complete the sentence.</p>

            <div className="w-full max-w-3xl p-6 bg-slate-700/50 rounded-lg mb-8 text-2xl leading-loose">
                {problem.parts.map((part, i) => (
                    <React.Fragment key={i}>
                        {part}
                        {i < problem.blanks.length && (
                            <select 
                                value={answers[i]} 
                                onChange={(e) => handleSelect(i, e.target.value)}
                                className="mx-2 px-2 py-1 rounded-md bg-slate-600 text-sky-300 text-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                            >
                                <option value="" disabled>______</option>
                                {problem.blanks[i].options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        )}
                    </React.Fragment>
                ))}
            </div>
            
            <button onClick={handleSubmit} className="px-8 py-3 bg-green-600 rounded-full font-bold text-lg hover:bg-green-500">
                Check Sentence
            </button>
        </div>
    );
};

export default SentenceScaffoldingGame;