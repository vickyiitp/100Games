import React, { useState, useMemo } from 'react';

interface FusionProblem {
    elements: [string, string];
    options: string[];
    correctIndex: number;
}

const FUSION_PROBLEMS: FusionProblem[] = [
    { elements: ["Bee", "Robot"], options: ["A robot that makes honey", "A bee made of metal", "A bee that stings robots"], correctIndex: 0 },
    { elements: ["Tree", "Book"], options: ["A book that grows on trees", "A tree that tells stories", "Paper"], correctIndex: 1 },
    { elements: ["Cloud", "Computer"], options: ["A computer shaped like a cloud", "Cloud computing", "Rain that downloads files"], correctIndex: 1 },
    { elements: ["Music", "Plant"], options: ["A plant that grows faster with music", "A song about a plant", "A musical instrument made of wood"], correctIndex: 0 },
    { elements: ["Time", "Travel"], options: ["A fast car", "A history book", "Time machine"], correctIndex: 2 },
    { elements: ["Art", "Dream"], options: ["Surrealism", "A painting of a bed", "An art gallery that's only open at night"], correctIndex: 0 },
];

interface ElementFusionGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const ElementFusionGame: React.FC<ElementFusionGameProps> = ({ level, onGameComplete }) => {
  const problem = useMemo(() => {
    return FUSION_PROBLEMS[level % FUSION_PROBLEMS.length];
  }, [level]);

  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const handleOptionClick = (index: number) => {
    if (feedback) return;

    if (index === problem.correctIndex) {
      setFeedback('correct');
      setTimeout(() => onGameComplete(100 * level), 1500);
    } else {
      setFeedback('incorrect');
      setTimeout(() => onGameComplete(0), 1500);
    }
  };
  
  const getButtonClass = (index: number) => {
      let base = "w-full p-4 rounded-lg text-lg text-left transition-all duration-300";
      if (!feedback) {
          return `${base} bg-slate-700 hover:bg-sky-500/50 hover:scale-105`;
      }
      if (index === problem.correctIndex) {
          return `${base} bg-green-500 scale-105`;
      }
      return `${base} bg-red-500 opacity-50`;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full text-white text-center">
      <h3 className="text-2xl font-bold mb-4">Idea Fusion</h3>
      <p className="text-slate-400 mb-8">Combine these two elements to create the most innovative idea.</p>
      
      <div className="flex items-center justify-center gap-8 mb-10">
        <div className="p-6 bg-slate-700/50 rounded-2xl">
          <p className="text-3xl font-bold text-sky-300">{problem.elements[0]}</p>
        </div>
        <span className="text-4xl font-thin">+</span>
        <div className="p-6 bg-slate-700/50 rounded-2xl">
          <p className="text-3xl font-bold text-violet-300">{problem.elements[1]}</p>
        </div>
      </div>

      <div className="w-full max-w-md flex flex-col gap-4">
        {problem.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index)}
            disabled={!!feedback}
            className={getButtonClass(index)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ElementFusionGame;