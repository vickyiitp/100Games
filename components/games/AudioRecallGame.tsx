import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { SoundIcon } from '../Icons';

// In a real app, you would use actual audio files.
// We'll simulate with visual cues and timings for now.
const TONES = [
  { id: 0, pitch: 'C4', color: 'bg-red-500' },
  { id: 1, pitch: 'D4', color: 'bg-green-500' },
  { id: 2, pitch: 'E4', color: 'bg-blue-500' },
  { id: 3, pitch: 'F4', color: 'bg-yellow-500' },
];

interface AudioRecallGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const AudioRecallGame: React.FC<AudioRecallGameProps> = ({ level, onGameComplete }) => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [gameState, setGameState] = useState<'watching' | 'playing' | 'gameover'>('watching');
  const [activeTone, setActiveTone] = useState<number | null>(null);

  const sequenceLength = 3 + level;

  const generateSequence = useCallback(() => {
    const newSequence = Array.from({ length: sequenceLength }, () => Math.floor(Math.random() * TONES.length));
    setSequence(newSequence);
    setPlayerSequence([]);
    setGameState('watching');
  }, [sequenceLength]);
  
  useEffect(() => {
    generateSequence();
  }, [level, generateSequence]);

  // Simulate playing the sequence of tones
  useEffect(() => {
    if (gameState === 'watching' && sequence.length > 0) {
      let i = 0;
      const interval = setInterval(() => {
        // Here you would play the sound for sequence[i]
        setActiveTone(sequence[i]);
        setTimeout(() => setActiveTone(null), 400);
        i++;
        if (i >= sequence.length) {
          clearInterval(interval);
          setGameState('playing');
        }
      }, 700);
    }
  }, [gameState, sequence]);

  // Check player's input
  useEffect(() => {
    if (gameState !== 'playing' || playerSequence.length === 0) return;

    const isCorrect = sequence.every((val, index) => playerSequence[index] === undefined || val === playerSequence[index]);
    
    if (!isCorrect) {
        setGameState('gameover');
        setTimeout(() => onGameComplete(0), 1000); 
    } else if (playerSequence.length === sequence.length) {
        const score = level * 100 + sequence.length * 10;
        setTimeout(() => onGameComplete(score), 500);
    }
  }, [playerSequence, sequence, gameState, level, onGameComplete]);

  const handleToneClick = (toneId: number) => {
    if (gameState !== 'playing') return;
    // Simulate playing the sound on click
    setActiveTone(toneId);
    setTimeout(() => setActiveTone(null), 200);
    setPlayerSequence(prev => [...prev, toneId]);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-white text-center">
      <h3 className="text-2xl font-bold mb-4">
        {gameState === 'watching' && 'Listen carefully...'}
        {gameState === 'playing' && 'Repeat the melody...'}
        {gameState === 'gameover' && 'Incorrect Melody!'}
      </h3>
      <p className="text-slate-400 mb-8">Sequence Length: {sequenceLength}</p>
      
      <div className="flex gap-4">
        {TONES.map(tone => (
          <button
            key={tone.id}
            onClick={() => handleToneClick(tone.id)}
            disabled={gameState !== 'playing'}
            className={`w-24 h-24 rounded-full transition-all duration-200 flex items-center justify-center ${tone.color} ${activeTone === tone.id ? 'scale-110 shadow-lg' : ''} ${gameState === 'playing' ? 'hover:opacity-80' : 'opacity-60'}`}
          >
            <SoundIcon className="w-10 h-10" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default AudioRecallGame;