import React, { useState, useEffect } from 'react';

// Simplified Kalaha logic
interface KalahaGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const KalahaGame: React.FC<KalahaGameProps> = ({ level, onGameComplete }) => {
    const [board, setBoard] = useState<number[]>([]); // 6 pits for player, 1 store, 6 for AI, 1 store
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);

    useEffect(() => {
        setBoard([...Array(6).fill(4), 0, ...Array(6).fill(4), 0]);
    }, [level]);
    
    const playMove = (pitIndex: number) => {
        if (!isPlayerTurn || pitIndex > 5 || board[pitIndex] === 0) return;

        let stones = board[pitIndex];
        const newBoard = [...board];
        newBoard[pitIndex] = 0;
        
        let currentPit = pitIndex;
        while (stones > 0) {
            currentPit = (currentPit + 1) % 14;
            if (currentPit === 13) continue; // Skip opponent's store
            newBoard[currentPit]++;
            stones--;
        }
        
        setBoard(newBoard);
        // Simplified turn logic: player always gives turn to AI
        setIsPlayerTurn(false);
    };
    
    // AI Move
    useEffect(() => {
        if (!isPlayerTurn) {
            const aiMove = board.slice(7, 13).findIndex(stones => stones > 0);
            if (aiMove !== -1) {
                // Simplified AI just plays the first available move
                const pitIndex = 7 + aiMove;
                let stones = board[pitIndex];
                const newBoard = [...board];
                newBoard[pitIndex] = 0;
                 let currentPit = pitIndex;
                while (stones > 0) {
                    currentPit = (currentPit + 1) % 14;
                    if (currentPit === 6) continue; // Skip player's store
                    newBoard[currentPit]++;
                    stones--;
                }
                 setBoard(newBoard);
            }
            setIsPlayerTurn(true);
        }
        // Check for game over
        const playerPitsEmpty = board.slice(0, 6).every(s => s === 0);
        if (playerPitsEmpty) {
            const playerScore = board[6];
            const aiScore = board[13];
            onGameComplete(playerScore > aiScore ? playerScore * level : 0);
        }

    }, [isPlayerTurn, board, level, onGameComplete]);

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Kalaha</h3>
            <div className="p-4 bg-slate-900/50 rounded-lg">
                <div className="flex justify-center gap-4 mb-2">
                    {board.slice(7, 13).reverse().map((s, i) => <div key={i} className="w-16 h-16 bg-red-800 rounded-full flex items-center justify-center text-2xl">{s}</div>)}
                </div>
                <div className="flex justify-between items-center mb-2">
                    <div className="w-20 h-24 bg-red-900 rounded-lg flex items-center justify-center text-3xl">{board[13]}</div>
                     <div className="w-20 h-24 bg-blue-900 rounded-lg flex items-center justify-center text-3xl">{board[6]}</div>
                </div>
                 <div className="flex justify-center gap-4">
                    {board.slice(0, 6).map((s, i) => <button key={i} onClick={() => playMove(i)} className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center text-2xl">{s}</button>)}
                </div>
            </div>
        </div>
    );
};

export default KalahaGame;