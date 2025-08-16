import React, { useState, useMemo } from 'react';

interface Task {
    id: number;
    name: string;
    points: number;
    time: number;
}

const generateTasks = (level: number): Task[] => {
    const numTasks = 3 + Math.floor(level / 2);
    const tasks: Task[] = [];
    for (let i = 0; i < numTasks; i++) {
        tasks.push({
            id: i,
            name: `Task ${String.fromCharCode(65 + i)}`,
            points: (Math.floor(Math.random() * 5) + level) * 10,
            time: Math.floor(Math.random() * 3) + 1,
        });
    }
    return tasks;
};

interface PriorityPlannerGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const PriorityPlannerGame: React.FC<PriorityPlannerGameProps> = ({ level, onGameComplete }) => {
    const timeLimit = 8;
    const [tasks, setTasks] = useState(() => generateTasks(level));
    const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
    const [totalTime, setTotalTime] = useState(0);
    const [totalPoints, setTotalPoints] = useState(0);

    const handleTaskClick = (task: Task) => {
        if (tasks.find(t => t.id === task.id) && totalTime + task.time <= timeLimit) {
            setTasks(currentTasks => currentTasks.filter(t => t.id !== task.id));
            setSelectedTasks(st => [...st, task]);
            setTotalTime(t => t + task.time);
            setTotalPoints(p => p + task.points);
        }
    };
    
    const handleFinish = () => {
        onGameComplete(totalPoints);
    }
    
    return (
        <div className="flex flex-col items-center justify-start h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-2">Priority Planner</h3>
            <p className="text-slate-400 mb-4">You have {timeLimit} hours. Complete tasks to maximize points.</p>
            
            <div className="w-full grid grid-cols-2 gap-4 text-center p-2 bg-slate-700/50 rounded-lg mb-6">
                <div><p className="text-sm text-slate-400">Time Spent</p><p className="font-bold text-yellow-300">{totalTime} / {timeLimit} hours</p></div>
                <div><p className="text-sm text-slate-400">Total Points</p><p className="font-bold text-sky-300">{totalPoints}</p></div>
            </div>

            <div className="w-full max-w-xl">
                <p className="text-left font-semibold mb-2">Available Tasks:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {tasks.map(task => (
                        <button 
                            key={task.id} 
                            onClick={() => handleTaskClick(task)}
                            className="p-3 bg-slate-700 rounded-lg text-left hover:bg-sky-600 transition-colors"
                        >
                            <p className="font-bold">{task.name}</p>
                            <p>Points: <span className="text-green-400">{task.points}</span> | Time: <span className="text-yellow-400">{task.time}h</span></p>
                        </button>
                    ))}
                </div>
            </div>

             <button onClick={handleFinish} className="mt-8 px-8 py-3 bg-green-600 rounded-full font-bold text-lg hover:bg-green-500 transition-colors">
                Finish Planning
            </button>
        </div>
    );
};

export default PriorityPlannerGame;
