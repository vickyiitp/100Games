import React, { useState, useEffect, useRef } from 'react';

interface LineFollowerGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const LineFollowerGame: React.FC<LineFollowerGameProps> = ({ level, onGameComplete }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [path, setPath] = useState<[number, number][]>([]);
    
    const pathWidth = Math.max(10, 30 - level * 2);

    useEffect(() => {
        const newPath: [number, number][] = [[50, 250]];
        let x = 50, y = 250;
        for (let i = 0; i < 5; i++) {
            x += 80;
            y = y === 250 ? 50 : 250;
            newPath.push([x, y]);
        }
        setPath(newPath);
    }, [level]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx || path.length === 0) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw path
        ctx.strokeStyle = '#38bdf8'; // sky-400
        ctx.lineWidth = pathWidth;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(path[0][0], path[0][1]);
        for (let i = 1; i < path.length; i++) {
            ctx.lineTo(path[i][0], path[i][1]);
        }
        ctx.stroke();
        
        // Draw start/end
        ctx.fillStyle = '#10b981'; // green-500
        ctx.beginPath();
        ctx.arc(path[0][0], path[0][1], pathWidth / 2 + 5, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.fillStyle = '#ef4444'; // red-500
        ctx.beginPath();
        ctx.arc(path[path.length-1][0], path[path.length-1][1], pathWidth / 2 + 5, 0, 2 * Math.PI);
        ctx.fill();

    }, [path, pathWidth]);
    
    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isFollowing) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Hit detection
        if (!ctx.isPointInStroke(x, y)) {
            setIsFollowing(false);
            onGameComplete(0); // Failed
        }
        
        // Win condition
        const end = path[path.length - 1];
        if (Math.hypot(x - end[0], y - end[1]) < pathWidth) {
            setIsFollowing(false);
            onGameComplete(100 * level);
        }
    };
    
    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const start = path[0];
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (Math.hypot(x - start[0], y - start[1]) < pathWidth) {
            setIsFollowing(true);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Line Follower</h3>
            <p className="text-slate-400 mb-4">Click the green circle and trace the path to the red circle without leaving the line.</p>
            <canvas
                ref={canvasRef}
                width={500}
                height={300}
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={() => setIsFollowing(false)}
                onMouseLeave={() => setIsFollowing(false)}
                className="bg-slate-900/50 rounded-lg cursor-crosshair"
            />
        </div>
    );
};

export default LineFollowerGame;