
import React, { useState } from 'react';
import { Game, GameArchetype } from '../types';
import { CloseIcon } from './Icons';

// Import the new, consolidated game archetypes
import MemoryMatchGame from './archetypes/MemoryMatchGame';
import ReflexTapGame from './archetypes/ReflexTapGame';
import SequenceMemoryGame from './archetypes/SequenceMemoryGame';
import WordScrambleGame from './archetypes/WordScrambleGame';
import OddOneOutGame from './archetypes/OddOneOutGame';
import LogicGridGame from './archetypes/LogicGridGame';
import SpatialRotationGame from './archetypes/SpatialRotationGame';
import TimingRhythmGame from './archetypes/TimingRhythmGame';
import StrategyTDGame from './archetypes/StrategyTDGame';
import DecisionScenarioGame from './archetypes/DecisionScenarioGame';
import LanguageVocabGame from './archetypes/LanguageVocabGame';
import FocusAttentionGame from './archetypes/FocusAttentionGame';
import PuzzleSudokuGame from './archetypes/PuzzleSudokuGame';
import CreativityWritingGame from './archetypes/CreativityWritingGame';
import VisualDifferenceGame from './archetypes/VisualDifferenceGame';
import StrategyResourceGame from './archetypes/StrategyResourceGame';


interface GameViewProps {
  game: Game;
  onClose: () => void;
}

const GameView: React.FC<GameViewProps> = ({ game, onClose }) => {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'result'>('intro');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);

  const handleGameComplete = (finalScore: number) => {
    setScore(finalScore);
    setGameState('result');
  };
  
  const handleNextLevel = () => {
    setLevel(prev => prev + 1);
    setScore(0);
    setGameState('playing');
  }

  const handleRetryLevel = () => {
    setScore(0);
    setGameState('playing');
  }

  const renderGame = () => {
    const gameProps = { onGameComplete: handleGameComplete, level: level, game: game };

    // This new, simplified logic routes games based on their assigned archetype.
    switch (game.archetype) {
        case GameArchetype.MEMORY_MATCH:
            return <MemoryMatchGame {...gameProps} />;
        case GameArchetype.REFLEX_TAP:
            return <ReflexTapGame {...gameProps} />;
        case GameArchetype.SEQUENCE_MEMORY:
            return <SequenceMemoryGame {...gameProps} />;
        case GameArchetype.WORD_SCRAMBLE:
            return <WordScrambleGame {...gameProps} />;
        case GameArchetype.ODD_ONE_OUT:
            return <OddOneOutGame {...gameProps} />;
        case GameArchetype.LOGIC_GRID:
            return <LogicGridGame {...gameProps} />;
        case GameArchetype.SPATIAL_ROTATION:
            return <SpatialRotationGame {...gameProps} />;
        case GameArchetype.TIMING_RHYTHM:
            return <TimingRhythmGame {...gameProps} />;
        case GameArchetype.STRATEGY_TD:
            return <StrategyTDGame {...gameProps} />;
        case GameArchetype.DECISION_SCENARIO:
            return <DecisionScenarioGame {...gameProps} />;
        case GameArchetype.LANGUAGE_VOCAB:
            return <LanguageVocabGame {...gameProps} />;
        case GameArchetype.FOCUS_ATTENTION:
            return <FocusAttentionGame {...gameProps} />;
        case GameArchetype.PUZZLE_SUDOKU:
            return <PuzzleSudokuGame {...gameProps} />;
        case GameArchetype.CREATIVITY_WRITING:
            return <CreativityWritingGame {...gameProps} />;
        case GameArchetype.VISUAL_DIFFERENCE:
            return <VisualDifferenceGame {...gameProps} />;
        case GameArchetype.STRATEGY_RESOURCE:
            return <StrategyResourceGame {...gameProps} />;
        default:
            // A sensible fallback for any unassigned archetypes
            return <ReflexTapGame {...gameProps} />;
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-lg flex items-center justify-center z-50 animate-fade-in">
      <div className="w-full max-w-4xl h-full md:h-[90vh] md:max-h-[800px] bg-slate-800 rounded-2xl shadow-2xl flex flex-col relative border border-slate-700">
        <header className="flex items-center justify-between p-4 border-b border-slate-700">
          <div>
            <h2 className="text-2xl font-bold text-sky-300">{game.name}</h2>
            <p className="text-sm text-slate-400">Level {level}</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors">
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>

        <main className="flex-grow p-6 overflow-y-auto">
          {gameState === 'intro' && (
            <div className="flex flex-col items-center justify-center text-center text-white h-full animate-fade-in">
               <h3 className="text-3xl font-bold mb-2">Level {level}</h3>
               <p className="text-slate-300 max-w-md mb-8">Press start to begin the challenge. Good luck!</p>
               <button onClick={() => setGameState('playing')} className="px-10 py-4 bg-violet-600 rounded-full font-bold text-xl hover:bg-violet-500 transition-all duration-300 transform hover:scale-105">
                 Start Game
               </button>
            </div>
          )}

          {gameState === 'playing' && renderGame()}

          {gameState === 'result' && (
             <div className="flex flex-col items-center justify-center text-center text-white h-full animate-fade-in">
               <h3 className="text-4xl font-bold mb-2 text-green-400">Level {level} Complete!</h3>
               <p className="text-slate-300 text-lg mb-6">Here's how you did:</p>
               <div className="bg-slate-700/50 p-8 rounded-2xl mb-8">
                <p className="text-xl text-slate-400">Your Score</p>
                <p className="text-7xl font-extrabold text-sky-300 my-2">{score}</p>
               </div>
               <div className="flex flex-col md:flex-row gap-4">
                 <button onClick={handleNextLevel} className="px-8 py-4 bg-sky-500 rounded-full font-bold text-lg hover:bg-sky-400 transition-colors">
                    Next Level
                 </button>
                 <button onClick={handleRetryLevel} className="px-6 py-3 bg-slate-600 rounded-full font-semibold hover:bg-slate-500 transition-colors">
                    Retry Level {level}
                 </button>
                 <button onClick={onClose} className="px-6 py-3 bg-transparent text-slate-400 rounded-full font-semibold hover:bg-slate-700 transition-colors">
                    Return to Hub
                 </button>
               </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default GameView;
