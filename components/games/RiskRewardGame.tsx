import React, { useState, useEffect, useMemo } from 'react';
import { CheckIcon, XIcon } from '../Icons';

interface RiskRewardGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const RiskRewardGame: React.FC<RiskRewardGameProps> = ({ level, onGameComplete }) => {
  const [score, setScore] = useState(0);
  const [roundsLeft, setRoundsLeft] = useState(5);
  const [feedback, setFeedback] = useState<{ type: 'win' | 'loss' | 'safe', amount: number} | null>(null);

  const { safeOption, riskyOption } = useMemo(() => {
    const baseValue = 20 * level;
    return {
      safeOption: {
        reward: Math.floor(baseValue * 0.5),
      },
      riskyOption: {
        reward: baseValue * 2,
        loss: baseValue,
        chance: Math.max(0.2, 0.6 - level * 0.05), // Chance decreases with level
      }
    };
  }, [level]);

  useEffect(() => {
    if (roundsLeft <= 0) {
      setTimeout(() => onGameComplete(score), 1500);
    }
  }, [roundsLeft, score, onGameComplete]);
  
  const handleChoice = (isRisky: boolean) => {
      if (feedback || roundsLeft <= 0) return;

      if (isRisky) {
          if (Math.random() < riskyOption.chance) {
              setScore(s => s + riskyOption.reward);
              setFeedback({ type: 'win', amount: riskyOption.reward });
          } else {
              setScore(s => Math.max(0, s - riskyOption.loss));
              setFeedback({ type: 'loss', amount: riskyOption.loss });
          }
      } else {
          setScore(s => s + safeOption.reward);
          setFeedback({ type: 'safe', amount: safeOption.reward });
      }

      setTimeout(() => {
          setRoundsLeft(r => r - 1);
          setFeedback(null);
      }, 1500);
  };
  
  const getFeedbackUI = () => {
      if (!feedback) return null;
      switch(feedback.type) {
          case 'win': return <div className="flex items-center gap-2 text-green-400"><CheckIcon /> +{feedback.amount}</div>;
          case 'loss': return <div className="flex items-center gap-2 text-red-400"><XIcon /> -{feedback.amount}</div>;
          case 'safe': return <div className="flex items-center gap-2 text-sky-400"><CheckIcon /> +{feedback.amount}</div>;
      }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full text-white text-center">
        <div className="w-full flex justify-between items-center p-4 bg-slate-700/50 rounded-lg mb-8">
            <div className="text-left">
                <p className="text-sm text-slate-400">Score</p>
                <p className="text-3xl font-bold text-sky-300">{score}</p>
            </div>
             <div className="text-2xl font-bold">{getFeedbackUI()}</div>
            <div className="text-right">
                <p className="text-sm text-slate-400">Rounds Left</p>
                <p className="text-3xl font-bold text-violet-300">{roundsLeft}</p>
            </div>
        </div>

      <h3 className="text-2xl text-slate-300 mb-8">Choose your move:</h3>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Safe Option */}
        <button 
          onClick={() => handleChoice(false)}
          disabled={!!feedback}
          className="p-8 border-2 border-slate-600 rounded-2xl text-center hover:border-sky-500 hover:bg-sky-500/10 transition-colors disabled:opacity-50">
            <h4 className="text-2xl font-bold text-sky-300">Safe Bet</h4>
            <p className="text-lg mt-2">Guaranteed <span className="font-bold text-white">+{safeOption.reward}</span> points</p>
        </button>

        {/* Risky Option */}
        <button 
          onClick={() => handleChoice(true)}
          disabled={!!feedback}
          className="p-8 border-2 border-slate-600 rounded-2xl text-center hover:border-yellow-500 hover:bg-yellow-500/10 transition-colors disabled:opacity-50">
            <h4 className="text-2xl font-bold text-yellow-300">High Risk</h4>
            <p className="text-lg mt-2">
                <span className="font-bold text-white">{Math.round(riskyOption.chance * 100)}%</span> chance to win <span className="font-bold text-green-400">+{riskyOption.reward}</span>
            </p>
             <p className="text-sm text-slate-400">
                Risk losing <span className="font-bold text-red-400">{riskyOption.loss}</span> points
            </p>
        </button>
      </div>
    </div>
  );
};

export default RiskRewardGame;
