
import React, { useState, useMemo } from 'react';
import { Game } from '../../types';

const SHAPES = [
    (props: any) => <path d="M12 2L2 12h20L12 2z M12 22l10-10H2l10 10z" {...props} />,
    (props: any) => <path d="M2 12l10-10 10 10-10 10L2 12z M7 12l5-5 5 5-5 5-5-5z" {...props} />,
    (props: any) => <path d="M12 2 L22 20 H2 Z" {...props} />,
    (props: any) => <path d="M2 2h8v8H2z M14 14h8v8h-8z" {...props} />,
];

interface SpatialRotationGameProps {
  level: number;
  onGameComplete: (score: number) => void;
  game: Game;
}

const SpatialRotationGame: React.FC<SpatialRotationGameProps> = ({ level, onGameComplete }) => {
  const { shape, targetRotation, options } = useMemo(() => {
    const numOptions = Math.min(6, 3 + Math.floor(level / 2));
    const rotationIncrement = 360 / (numOptions * 2);
    
    const currentShape = SHAPES[level % SHAPES.length];
    const correctRotation = Math.floor(Math.random() * 8) * 45;

    const generatedOptions = Array.from({ length: numOptions }, (_, i) => {
        if (i === 0) return correctRotation;
        let newRotation;
        do {
            newRotation = Math.floor(Math.random() * 16) * rotationIncrement;
        } while (newRotation === correctRotation);
        return newRotation;
    }).sort(() => Math.random() - 0.5);

    return { shape: currentShape, targetRotation: correctRotation, options: generatedOptions };
  }, [level]);
  
  const [startTime] = useState(Date.now());

  const handleOptionClick = (rotation: number) => {
    const timeTaken = (Date.now() - startTime) / 1000;
    if (rotation === targetRotation) {
      const score = Math.max(50, Math.floor((1000 * level) / timeTaken));
      onGameComplete(score);
    } else {
      onGameComplete(0);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-white text-center">
      <h3 className="text-2xl font-bold mb-4">Match the Rotation</h3>
      <p className="text-slate-400 mb-8">Which of the shapes below matches the target shape?</p>
      
      <div className="mb-10 p-4 border-2 border-dashed border-sky-500 rounded-lg">
        <svg viewBox="0 0 24 24" className="w-28 h-28 text-sky-400" style={{ transform: `rotate(${targetRotation}deg)`}}>
          {shape({ fill: 'currentColor' })}
        </svg>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {options.map((rotation, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(rotation)}
            className="p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-20 h-20" style={{ transform: `rotate(${rotation}deg)`}}>
              {shape({ fill: 'currentColor' })}
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SpatialRotationGame;
