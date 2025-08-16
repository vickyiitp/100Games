import React, { useState, useMemo } from 'react';
import { TruckIcon, CogIcon, StarIcon } from '../Icons'; // Using Star for City

interface Node {
    id: number;
    type: 'source' | 'factory' | 'city';
    name: string;
}

const NODES: Node[] = [
    { id: 1, type: 'source', name: 'Mines' },
    { id: 2, type: 'factory', name: 'Factory' },
    { id: 3, type: 'city', name: 'City' },
];

interface SupplyChainGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const SupplyChainGame: React.FC<SupplyChainGameProps> = ({ level, onGameComplete }) => {
    const [path, setPath] = useState<Node[]>([]);
    const [availableNodes, setAvailableNodes] = useState<Node[]>(NODES);

    const correctPathOrder = ['source', 'factory', 'city'];

    const handleNodeClick = (node: Node) => {
        const newPath = [...path, node];
        setPath(newPath);
        setAvailableNodes(nodes => nodes.filter(n => n.id !== node.id));

        if (newPath.length === NODES.length) {
            const isCorrect = newPath.every((p, i) => p.type === correctPathOrder[i]);
            onGameComplete(isCorrect ? 100 * level : 0);
        }
    };
    
    const getIcon = (type: Node['type']) => {
        if (type === 'source') return <TruckIcon className="w-8 h-8 mx-auto" />;
        if (type === 'factory') return <CogIcon className="w-8 h-8 mx-auto" />;
        if (type === 'city') return <StarIcon className="w-8 h-8 mx-auto" />;
    };

    return (
        <div className="flex flex-col items-center justify-start h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-2">Supply Chain</h3>
            <p className="text-slate-400 mb-6">Connect the supply chain in the correct order.</p>

            <div className="w-full max-w-xl h-24 p-4 bg-slate-900/50 rounded-lg flex items-center justify-start gap-4 mb-6">
                {path.map((node, i) => (
                    <React.Fragment key={node.id}>
                        <div className="flex-shrink-0 text-center">
                            {getIcon(node.type)}
                            <p>{node.name}</p>
                        </div>
                        {i < path.length - 1 && <div className="flex-grow h-1 bg-sky-400"></div>}
                    </React.Fragment>
                ))}
            </div>

            <p className="text-slate-400 mb-4">Available locations:</p>
            <div className="flex gap-4">
                {availableNodes.map(node => (
                    <button 
                        key={node.id}
                        onClick={() => handleNodeClick(node)}
                        className="p-4 w-32 bg-slate-700 rounded-lg hover:bg-sky-600 transition-colors"
                    >
                         {getIcon(node.type)}
                        <p className="mt-2 font-semibold">{node.name}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SupplyChainGame;