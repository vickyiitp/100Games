import React, { useState, useMemo } from 'react';
import { ShipIcon } from '../Icons'; // Assuming ShipIcon exists

const SHIP_TYPES = {
    Destroyer: { beats: 'Battleship', icon: 'D' },
    Cruiser: { beats: 'Destroyer', icon: 'C' },
    Battleship: { beats: 'Cruiser', icon: 'B' },
};
type ShipType = keyof typeof SHIP_TYPES;

interface FleetCommanderGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const FleetCommanderGame: React.FC<FleetCommanderGameProps> = ({ level, onGameComplete }) => {
    const [playerFleet, setPlayerFleet] = useState<ShipType[]>([]);
    const [aiFleet, setAiFleet] = useState<ShipType[]>([]);
    const [outcome, setOutcome] = useState('');
    
    const fleetSize = 3 + Math.floor(level / 2);

    useMemo(() => {
        const fleetOptions = Object.keys(SHIP_TYPES) as ShipType[];
        const newAiFleet: ShipType[] = [];
        for (let i = 0; i < fleetSize; i++) {
            newAiFleet.push(fleetOptions[Math.floor(Math.random() * fleetOptions.length)]);
        }
        setAiFleet(newAiFleet);
        setPlayerFleet([]);
        setOutcome('');
    }, [level, fleetSize]);

    const selectShip = (ship: ShipType) => {
        if (playerFleet.length < fleetSize) {
            setPlayerFleet(f => [...f, ship]);
        }
    };

    const fight = () => {
        let playerScore = 0;
        for (let i = 0; i < fleetSize; i++) {
            const pShip = playerFleet[i];
            const aShip = aiFleet[i];
            if (SHIP_TYPES[pShip].beats === aShip) {
                playerScore++;
            } else if (SHIP_TYPES[aShip].beats !== pShip) {
                playerScore += 0.5; // Draw
            }
        }
        
        const win = playerScore > fleetSize / 2;
        setOutcome(win ? "VICTORY!" : "DEFEAT");
        onGameComplete(win ? playerScore * 50 * level : 0);
    };

    return (
        <div className="flex flex-col items-center justify-start h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-2">Fleet Commander</h3>
            <p className="text-slate-400 mb-4">Choose your fleet of {fleetSize} ships to counter the enemy.</p>
            <p className="text-xs text-slate-500 mb-4">(Battleship beats Cruiser, Cruiser beats Destroyer, Destroyer beats Battleship)</p>

            <div className="w-full p-2 mb-4">
                <p>Your Fleet:</p>
                <div className="flex justify-center gap-2 h-12">
                    {playerFleet.map((ship, i) => <div key={i} className="w-10 h-10 bg-sky-500 rounded-md flex items-center justify-center font-bold">{SHIP_TYPES[ship].icon}</div>)}
                </div>
            </div>

            {playerFleet.length < fleetSize ? (
                <div className="flex gap-4">
                    {(Object.keys(SHIP_TYPES) as ShipType[]).map(ship => (
                        <button key={ship} onClick={() => selectShip(ship)} className="p-4 bg-slate-700 rounded-lg">
                            <div className="w-12 h-12 bg-slate-600 rounded-md flex items-center justify-center font-bold text-2xl mb-2">{SHIP_TYPES[ship].icon}</div>
                            {ship}
                        </button>
                    ))}
                </div>
            ) : (
                <button onClick={fight} className="px-8 py-3 bg-green-600 rounded-full font-bold">Engage!</button>
            )}
            
            {outcome && <div className="mt-4 text-3xl font-bold">{outcome}</div>}
        </div>
    );
};

export default FleetCommanderGame;