import React, { useState, useMemo } from 'react';

interface Choice {
  text: string;
  score: number;
  nextId: number;
}

interface Scenario {
  id: number;
  text: string;
  choices: Choice[];
}

const SCENARIO_TREE: Scenario[] = [
    { id: 1, text: "You find a wallet on the street. It's full of cash.", choices: [
        { text: "Turn it into the police.", score: 100, nextId: 2 },
        { text: "Take the cash, leave the wallet.", score: -50, nextId: 3 },
    ]},
    { id: 2, text: "The owner is grateful and offers you a reward.", choices: [
        { text: "Accept it graciously.", score: 50, nextId: 100 },
        { text: "Politely decline.", score: 100, nextId: 100 },
    ]},
    { id: 3, text: "You feel a pang of guilt. As you walk away, you see a charity fundraiser.", choices: [
        { text: "Donate all the money you found.", score: 150, nextId: 100 },
        { text: "Ignore it and keep walking.", score: -100, nextId: 100 },
    ]},
    { id: 4, text: "Your friend asks for help moving, but you had plans to relax.", choices: [
        { text: "Help your friend.", score: 80, nextId: 5 },
        { text: "Make an excuse.", score: -30, nextId: 6 },
    ]},
    { id: 5, text: "It was hard work, but your friend is extremely thankful.", choices: [
        { text: "Say 'no problem!'", score: 20, nextId: 100 },
        { text: "Mention they owe you.", score: -10, nextId: 100 },
    ]},
    { id: 6, text: "Your friend seems disappointed. Later you see them struggling alone.", choices: [
        { text: "Change your mind and go help.", score: 100, nextId: 5 },
        { text: "Pretend you didn't see them.", score: -80, nextId: 100 },
    ]},
];

const GAME_OVER_ID = 100;

interface DecisionMakerGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const DecisionMakerGame: React.FC<DecisionMakerGameProps> = ({ level, onGameComplete }) => {
  const [totalScore, setTotalScore] = useState(0);
  
  const initialScenarioId = useMemo(() => {
    // Select a starting scenario based on level
    return (level % 2 === 1) ? 1 : 4;
  }, [level]);
  
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(
    SCENARIO_TREE.find(s => s.id === initialScenarioId) || null
  );

  const handleChoice = (choice: Choice) => {
    const newScore = totalScore + choice.score;
    setTotalScore(newScore);
    
    const nextScenario = SCENARIO_TREE.find(s => s.id === choice.nextId);

    if (!nextScenario || choice.nextId === GAME_OVER_ID) {
      onGameComplete(newScore * level);
    } else {
      setCurrentScenario(nextScenario);
    }
  };

  if (!currentScenario) {
    return <div className="text-center text-white">Loading scenario...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-white p-4">
      <div className="bg-slate-700/50 p-8 rounded-2xl max-w-2xl">
          <p className="text-xl md:text-2xl leading-relaxed">
            {currentScenario.text}
          </p>
      </div>
      <div className="mt-8 flex flex-col md:flex-row gap-4">
        {currentScenario.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleChoice(choice)}
            className="px-6 py-3 bg-sky-600 rounded-full font-semibold hover:bg-sky-500 transition-all duration-300 transform hover:scale-105"
          >
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DecisionMakerGame;
