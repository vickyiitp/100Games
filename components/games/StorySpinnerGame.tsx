import React, { useState, useMemo } from 'react';

interface StorySegment {
  text: string;
  choices: { text: string; score: number; nextId: number }[];
}

interface Story {
  [key: number]: StorySegment;
}

const STORY_TREE: Story = {
  1: {
    text: "The old spaceship creaked as it landed on the forgotten planet. The airlock hissed open, revealing...",
    choices: [
      { text: "a lush jungle teeming with alien life.", score: 10, nextId: 2 },
      { text: "the ruins of an ancient, silent city.", score: 10, nextId: 3 },
      { text: "a perfectly manicured lawn with a welcome mat.", score: 5, nextId: 4 },
    ],
  },
  2: {
    text: "Strange, beautiful plants glowed with an inner light. Suddenly, a small, furry creature with six legs darted across the path.",
    choices: [
      { text: "Follow it deeper into the jungle.", score: 20, nextId: 100 },
      { text: "Analyze the glowing flora instead.", score: 15, nextId: 100 },
      { text: "Head back to the ship immediately.", score: -5, nextId: 100 },
    ],
  },
  3: {
    text: "Towering spires of obsidian glass pierced the twin moons in the sky. A faint, melodic humming seemed to emanate from the largest tower.",
    choices: [
      { text: "Investigate the source of the humming.", score: 20, nextId: 100 },
      { text: "Search the smaller buildings for artifacts.", score: 15, nextId: 100 },
      { text: "Set up a defensive perimeter.", score: 5, nextId: 100 },
    ],
  },
  4: {
      text: "The welcome mat read 'Wipe Your Feet.' The front door of the small cottage was slightly ajar.",
      choices: [
          { text: "Knock politely before entering.", score: 15, nextId: 100 },
          { text: "Barge in, ready for anything.", score: 5, nextId: 100 },
          { text: "Assume it's a trap and fire a warning shot.", score: -10, nextId: 100 },
      ]
  }
};

const GAME_END_ID = 100;

interface StorySpinnerGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const StorySpinnerGame: React.FC<StorySpinnerGameProps> = ({ level, onGameComplete }) => {
  const [story, setStory] = useState<string[]>([]);
  const [currentSegment, setCurrentSegment] = useState<StorySegment | null>(null);
  const [totalScore, setTotalScore] = useState(0);

  useMemo(() => {
    const startSegment = STORY_TREE[1];
    setStory([startSegment.text]);
    setCurrentSegment(startSegment);
    setTotalScore(0);
  }, [level]);

  const handleChoice = (choice: StorySegment['choices'][0]) => {
    if (!currentSegment) return;
    
    const newScore = totalScore + choice.score;
    setTotalScore(newScore);

    if (choice.nextId === GAME_END_ID) {
      onGameComplete(newScore * level);
    } else {
      const nextSegment = STORY_TREE[choice.nextId];
      setStory(s => [...s, choice.text, nextSegment.text]);
      setCurrentSegment(nextSegment);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start h-full text-white text-center">
      <h3 className="text-2xl font-bold mb-4">Continue the Story</h3>
      
      <div className="w-full max-w-2xl bg-slate-900/50 p-4 rounded-lg mb-6 h-48 overflow-y-auto text-left">
        {story.map((line, index) => (
          <p key={index} className="mb-2">{line}</p>
        ))}
      </div>
      
      <h4 className="text-lg text-slate-400 mb-4">What happens next?</h4>
      <div className="w-full max-w-2xl flex flex-col gap-3">
        {currentSegment?.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleChoice(choice)}
            className="p-3 bg-slate-700 rounded-lg text-left hover:bg-sky-600 transition-colors"
          >
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StorySpinnerGame;
