import React, { useState, useEffect, useRef } from 'react';

const COLORS = ["bg-sky-500", "bg-violet-500", "bg-green-500", "bg-yellow-500"];

interface Task {
    id: number;
    value: number;
    decayRate: number;
}

interface TaskJugglerGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const TaskJugglerGame: React.FC<TaskJugglerGameProps> = ({ level, onGameComplete }) => {
    const numTasks = Math.min(4, 2 + Math.floor(level / 2));
    const gameDuration = 20; // seconds

    const [tasks, setTasks] = useState<Task[]>([]);
    const [timeLeft, setTimeLeft] = useState(gameDuration);

    const gameLoopRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const newTasks: Task[] = [];
        for (let i = 0; i < numTasks; i++) {
            newTasks.push({ id: i, value: 100, decayRate: 1 + Math.random() + level * 0.2 });
        }
        setTasks(newTasks);
    }, [level, numTasks]);

    useEffect(() => {
        // Game loop
        gameLoopRef.current = setInterval(() => {
            setTasks(currentTasks => {
                const updatedTasks = currentTasks.map(task => ({
                    ...task,
                    value: Math.max(0, task.value - task.decayRate)
                }));
                if (updatedTasks.some(t => t.value <= 0)) {
                    clearInterval(gameLoopRef.current!);
                    if(timerRef.current) clearTimeout(timerRef.current);
                    onGameComplete(0); // Game over
                }
                return updatedTasks;
            });
        }, 100);

        // Game timer
        timerRef.current = setTimeout(() => {
            clearInterval(gameLoopRef.current!);
            const score = tasks.reduce((sum, t) => sum + t.value, 0);
            onGameComplete(Math.floor(score * level));
        }, gameDuration * 1000);

        return () => {
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [tasks, level, onGameComplete]);

    const handleBoost = (taskId: number) => {
        setTasks(currentTasks =>
            currentTasks.map(task =>
                task.id === taskId ? { ...task, value: Math.min(100, task.value + 25) } : task
            )
        );
    };

    return (
        <div className="flex flex-col items-center justify-start h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-2">Task Juggler</h3>
            <p className="text-slate-400 mb-6">Keep all systems operational!</p>

            <div className="w-full max-w-md flex flex-col gap-4">
                {tasks.map((task, i) => (
                    <div key={task.id} className="flex items-center gap-4">
                        <div className="w-full bg-slate-700 rounded-full h-6">
                            <div className={`${COLORS[i]} h-6 rounded-full`} style={{ width: `${task.value}%` }}></div>
                        </div>
                        <button onClick={() => handleBoost(task.id)} className="px-4 py-2 bg-slate-600 rounded-full font-bold">
                            Boost
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskJugglerGame;