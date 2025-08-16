import React, { useState, useEffect, useMemo } from 'react';

const EMOTIONS = {
  Happy: '😀',
  Sad: '😢',
  Angry: '😠',
  Surprised: '😮',
  Winking: '😉',
  Neutral: '😐',
};

type EmotionKey = keyof typeof EMOTIONS;

interface MicroexpressionGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const MicroexpressionGame: React.FC<MicroexpressionGameProps> = ({ level, onGameComplete }) => {
  const [correctEmotion, setCorrectEmotion] = useState<EmotionKey>('Happy');
  const [options, setOptions] = useState<EmotionKey[]>([]);
  const [showFace, setShowFace] = useState(true);
  
  const displayTime = Math.max(500, 2000 - level * 100); // Time face is shown decreases with level

  useEffect(() => {
    // Generate new problem for the level
    const emotionKeys = Object.keys(EMOTIONS) as EmotionKey[];
    const correct = emotionKeys[Math.floor(Math.random() * emotionKeys.length)];
    setCorrectEmotion(correct);
    
    // Generate options
    const otherOptions = emotionKeys.filter(k => k !== correct);
    const shuffledOptions = otherOptions.sort(() => 0.5 - Math.random()).slice(0, 3);
    const finalOptions = [...shuffledOptions, correct].sort(() => 0.5 - Math.random());
    setOptions(finalOptions);

    setShowFace(true);
    const timer = setTimeout(() => {
        setShowFace(false);
    }, displayTime);

    return () => clearTimeout(timer);
  }, [level, displayTime]);

  const handleChoice = (choice: EmotionKey) => {
    if (choice === correctEmotion) {
      onGameComplete(100 * level + (5000 - displayTime)); // Score based on level and reaction time
    } else {
      onGameComplete(0);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-white text-center">
      <h3 className="text-2xl font-bold mb-4">Identify the Emotion</h3>
      <div className="w-48 h-48 bg-slate-700/50 rounded-full flex items-center justify-center mb-8 transition-opacity duration-300">
        {showFace ? (
          <span className="text-8xl animate-fade-in">{EMOTIONS[correctEmotion]}</span>
        ) : (
          <span className="text-5xl text-slate-500">?</span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {options.map(option => (
          <button
            key={option}
            onClick={() => handleChoice(option)}
            disabled={showFace}
            className="p-4 bg-slate-700 rounded-lg text-xl font-semibold hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MicroexpressionGame;