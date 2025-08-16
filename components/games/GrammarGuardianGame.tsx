import React, { useState, useEffect, useMemo } from 'react';
import { CheckIcon, XIcon } from '../Icons';

interface SentenceProblem {
    words: string[];
    correct: string;
    incorrectIndex: number;
}

const SENTENCES: Omit<SentenceProblem, 'words'>[] = [
    { correct: 'are', incorrectIndex: 1 }, // They is happy -> They are happy
    { correct: 'ate', incorrectIndex: 2 }, // She eat the apple -> She ate the apple
    { correct: 'many', incorrectIndex: 2 }, // He has much dogs -> He has many dogs
    { correct: 'went', incorrectIndex: 1 }, // We go to the park yesterday -> We went...
    { correct: 'an', incorrectIndex: 2 }, // I saw a elephant -> I saw an elephant
    { correct: 'were', incorrectIndex: 1 }, // You was late -> You were late
    { correct: 'their', incorrectIndex: 3 }, // The cats want there food -> ... their food
];

const generateProblem = (level: number): SentenceProblem => {
    const base = SENTENCES[level % SENTENCES.length];
    let sentenceStr = "";
    // This is a simple way to generate sentences. A more robust system would be better.
    switch(base.correct) {
        case 'are': sentenceStr = "They is happy today."; break;
        case 'ate': sentenceStr = "She eat the apple quickly."; break;
        case 'many': sentenceStr = "He has much dogs at home."; break;
        case 'went': sentenceStr = "We go to the park yesterday."; break;
        case 'an': sentenceStr = "I saw a elephant at the zoo."; break;
        case 'were': sentenceStr = "You was late for the meeting."; break;
        case 'their': sentenceStr = "The cats want there food now."; break;
        default: sentenceStr = "This is a test sentence.";
    }
    return { ...base, words: sentenceStr.split(' ') };
}


interface GrammarGuardianGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const GrammarGuardianGame: React.FC<GrammarGuardianGameProps> = ({ level, onGameComplete }) => {
  const [problem, setProblem] = useState(generateProblem(level));
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setProblem(generateProblem(level));
    setFeedback(null);
    setTimeLeft(15);
  }, [level]);

  useEffect(() => {
    if (feedback) return; // Stop timer on answer
    if (timeLeft <= 0) {
      onGameComplete(0);
      return;
    }
    timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [timeLeft, feedback, onGameComplete]);

  const handleWordClick = (index: number) => {
    if (feedback) return;
    if (timerRef.current) clearTimeout(timerRef.current);

    if (index === problem.incorrectIndex) {
        setFeedback('correct');
        const score = timeLeft * 10 * level;
        setTimeout(() => onGameComplete(score), 1500);
    } else {
        setFeedback('incorrect');
        setTimeout(() => onGameComplete(0), 1500);
    }
  };
  
  const getWordClass = (index: number) => {
      let base = "p-2 rounded-md transition-all text-2xl md:text-3xl font-medium";
      if (!feedback) {
          return `${base} cursor-pointer hover:bg-slate-600`;
      }
      if (index === problem.incorrectIndex) {
          return `${base} bg-green-500/50 text-green-300`;
      }
      if (feedback === 'incorrect' && index !== problem.incorrectIndex) {
           return `${base} text-slate-500`;
      }
      return base;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full text-white text-center">
        <div className="absolute top-4 right-4 text-2xl font-bold text-violet-300">{timeLeft}s</div>
        <h3 className="text-xl text-slate-400 mb-8">Click the incorrect word in the sentence:</h3>
        
        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 p-6 bg-slate-700/50 rounded-lg max-w-2xl">
            {problem.words.map((word, i) => (
                <span key={i} onClick={() => handleWordClick(i)} className={getWordClass(i)}>{word}</span>
            ))}
        </div>
        
        {feedback && (
             <div className="mt-8 flex items-center gap-4 text-3xl animate-fade-in">
                {feedback === 'correct' ? 
                    <><CheckIcon className="w-10 h-10 text-green-400"/> <span className="text-green-400">Correct!</span></> :
                    <><XIcon className="w-10 h-10 text-red-400"/> <span className="text-red-400">Incorrect!</span></>
                }
             </div>
        )}
    </div>
  );
};

export default GrammarGuardianGame;
