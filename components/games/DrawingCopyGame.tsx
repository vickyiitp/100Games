import React, { useRef, useEffect, useState } from 'react';
import { PencilIcon } from '../Icons';

// In a real game, pixel-based comparison would be needed. This is a simplified version.
interface DrawingCopyGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const DrawingCopyGame: React.FC<DrawingCopyGameProps> = ({ level, onGameComplete }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    
    // Draw the reference shape (a simple house)
    useEffect(() => {
        const canvas = document.getElementById('ref-canvas') as HTMLCanvasElement;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        // House shape
        ctx.strokeRect(50, 100, 100, 80);
        ctx.beginPath();
        ctx.moveTo(40, 100);
        ctx.lineTo(100, 40);
        ctx.lineTo(160, 100);
        ctx.closePath();
        ctx.stroke();
    }, []);

    const startDrawing = (e: React.MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        setIsDrawing(true);
    };

    const draw = (e: React.MouseEvent) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.stroke();
    };

    const stopDrawing = () => setIsDrawing(false);

    const checkDrawing = () => {
        // This is a placeholder for a real image comparison algorithm.
        // For this demo, we'll just give a random score.
        const score = Math.floor(Math.random() * 50 + 50) * level;
        onGameComplete(score);
    }

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Copy the Drawing</h3>
            <div className="flex gap-8 mb-6">
                <div>
                    <p className="text-slate-400 mb-2">Reference</p>
                    <canvas id="ref-canvas" width="200" height="200" className="bg-slate-900/50 rounded-lg"></canvas>
                </div>
                <div>
                    <p className="text-slate-400 mb-2">Your Canvas</p>
                    <canvas 
                        ref={canvasRef}
                        width="200" height="200"
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        className="bg-slate-900/50 rounded-lg cursor-crosshair"
                    ></canvas>
                </div>
            </div>
            <button onClick={checkDrawing} className="px-8 py-3 bg-green-600 rounded-full font-bold">Check My Drawing</button>
        </div>
    );
};

export default DrawingCopyGame;