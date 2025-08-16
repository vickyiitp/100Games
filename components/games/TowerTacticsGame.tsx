import React, { useState, useEffect, useMemo, useRef } from 'react';
import { TowerIcon } from '../Icons';

const GRID_SIZE = 10;
const TILE_SIZE = 40; // in pixels

interface Tower {
    id: number;
    position: number;
}

interface Enemy {
    id: number;
    pathIndex: number;
    health: number;
}

interface TowerTacticsGameProps {
    level: number;
    onGameComplete: (score: number) => void;
}

const TowerTacticsGame: React.FC<TowerTacticsGameProps> = ({ level, onGameComplete }) => {
    const [towers, setTowers] = useState<Tower[]>([]);
    const [enemies, setEnemies] = useState<Enemy[]>([]);
    const [money, setMoney] = useState(100 + level * 10);
    const [lives, setLives] = useState(10);
    const [wave, setWave] = useState(0);

    const gameLoopRef = useRef<number | null>(null);

    const path = useMemo(() => {
        // Simple S-shaped path
        const p: number[] = [];
        for (let i = 0; i < 10; i++) p.push(i + 2 * GRID_SIZE);
        for (let i = 2; i < 8; i++) p.push(9 + i * GRID_SIZE);
        for (let i = 9; i >= 0; i--) p.push(i + 7 * GRID_SIZE);
        return p;
    }, []);

    const spawnWave = () => {
        const newEnemies: Enemy[] = [];
        const numEnemies = 5 + wave * 2;
        for (let i = 0; i < numEnemies; i++) {
            newEnemies.push({ id: Date.now() + i, pathIndex: -i, health: 50 + level * 10 });
        }
        setEnemies(newEnemies);
        setWave(w => w + 1);
    };

    const gameTick = () => {
        // Move enemies
        setEnemies(prevEnemies => {
            const updatedEnemies = prevEnemies.map(enemy => {
                if (enemy.pathIndex >= path.length - 1) {
                    setLives(l => l - 1);
                    return null; // Enemy reached the end
                }
                return { ...enemy, pathIndex: enemy.pathIndex + 1 };
            }).filter(Boolean) as Enemy[];
            
            // Tower attacks
            towers.forEach(tower => {
                const towerX = tower.position % GRID_SIZE;
                const towerY = Math.floor(tower.position / GRID_SIZE);

                const target = updatedEnemies.find(enemy => {
                    if (enemy.pathIndex < 0) return false;
                    const enemyPos = path[enemy.pathIndex];
                    const enemyX = enemyPos % GRID_SIZE;
                    const enemyY = Math.floor(enemyPos / GRID_SIZE);
                    // Simple range check (2 tiles)
                    return Math.abs(towerX - enemyX) <= 2 && Math.abs(towerY - enemyY) <= 2;
                });

                if (target) {
                    target.health -= 25; // Tower damage
                }
            });

            return updatedEnemies.filter(e => e.health > 0);
        });

        gameLoopRef.current = requestAnimationFrame(gameTick);
    };

    useEffect(() => {
        spawnWave();
        gameLoopRef.current = requestAnimationFrame(gameTick);
        return () => {
            if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
        };
    }, []);
    
    useEffect(() => {
        if(enemies.length === 0 && wave > 0) {
            if (wave >= 3) { // Win after 3 waves
                 if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
                 onGameComplete(money + lives * 10 * level);
            } else {
                setMoney(m => m + 50 + wave * 10);
                spawnWave();
            }
        }
        if (lives <= 0) {
            if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
            onGameComplete(0);
        }
    }, [enemies, lives, wave]);
    
    const handleTileClick = (index: number) => {
        if (money >= 50 && !path.includes(index) && !towers.find(t => t.position === index)) {
            setTowers([...towers, { id: Date.now(), position: index }]);
            setMoney(m => m - 50);
        }
    };

    return (
        <div className="flex flex-col items-center justify-start h-full text-white">
             <div className="w-full grid grid-cols-3 gap-4 text-center p-2 bg-slate-700/50 rounded-lg mb-4">
                <div><p className="text-sm text-slate-400">Money</p><p className="font-bold text-yellow-300">${money}</p></div>
                <div><p className="text-sm text-slate-400">Wave</p><p className="font-bold">{wave}/3</p></div>
                <div><p className="text-sm text-slate-400">Lives</p><p className="font-bold text-red-400">{lives}</p></div>
            </div>
            <div 
                className="relative grid bg-slate-900/50"
                style={{
                    gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                    width: `${GRID_SIZE * TILE_SIZE}px`,
                    height: `${GRID_SIZE * TILE_SIZE}px`,
                }}
            >
                {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
                    <div
                        key={i}
                        onClick={() => handleTileClick(i)}
                        className={`w-full h-full border border-slate-700 ${path.includes(i) ? 'bg-slate-600' : 'cursor-pointer hover:bg-slate-800'}`}
                    >
                         {towers.find(t => t.position === i) && <TowerIcon className="w-full h-full p-1 text-sky-400" />}
                    </div>
                ))}
                {enemies.filter(e => e.pathIndex >= 0).map(enemy => (
                    <div
                        key={enemy.id}
                        className="absolute w-6 h-6 bg-red-500 rounded-full"
                        style={{
                            left: `${(path[enemy.pathIndex] % GRID_SIZE) * TILE_SIZE + (TILE_SIZE - 24) / 2}px`,
                            top: `${Math.floor(path[enemy.pathIndex] / GRID_SIZE) * TILE_SIZE + (TILE_SIZE - 24) / 2}px`,
                            transition: 'left 0.5s linear, top 0.5s linear',
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default TowerTacticsGame;