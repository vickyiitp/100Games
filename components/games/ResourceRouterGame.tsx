import React, { useState, useEffect, useMemo } from 'react';
import { PowerIcon } from '../Icons';

interface Node {
  id: number;
  demand: number;
  supplied: number;
}

interface ResourceRouterGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const ResourceRouterGame: React.FC<ResourceRouterGameProps> = ({ level, onGameComplete }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [powerPool, setPowerPool] = useState(0);

  const { totalDemand, initialPower } = useMemo(() => {
    let demand = 0;
    const numNodes = 2 + Math.floor(level / 2);
    const newNodes: Node[] = [];
    for (let i = 0; i < numNodes; i++) {
      const nodeDemand = (Math.floor(Math.random() * 3) + level) * 10;
      demand += nodeDemand;
      newNodes.push({ id: i, demand: nodeDemand, supplied: 0 });
    }
    setNodes(newNodes);
    
    // Power pool is slightly more than total demand
    const power = demand + (10 * level);
    setPowerPool(power);
    
    return { totalDemand: demand, initialPower: power };
  }, [level]);

  const handleAllocate = (nodeId: number, amount: number) => {
    if (powerPool - amount < 0) return;

    setNodes(currentNodes =>
      currentNodes.map(node =>
        node.id === nodeId
          ? { ...node, supplied: Math.min(node.demand, node.supplied + amount) }
          : node
      )
    );
    setPowerPool(p => p - amount);
  };
  
  const checkWinCondition = () => {
      const allSupplied = nodes.every(node => node.supplied >= node.demand);
      if (allSupplied) {
          onGameComplete(powerPool * 10 + level * 100); // Score is based on leftover power
      }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full text-white text-center">
      <h3 className="text-2xl font-bold mb-2">Resource Router</h3>
      <p className="text-slate-400 mb-6">Allocate power to meet the demand of each node.</p>

      <div className="w-full flex items-center justify-center gap-4 p-4 bg-slate-700/50 rounded-lg mb-8">
        <PowerIcon className="w-10 h-10 text-yellow-400" />
        <p className="text-4xl font-bold">{powerPool}</p>
        <p className="text-lg text-slate-400">Power Available</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl">
        {nodes.map(node => (
          <div key={node.id} className="p-4 bg-slate-700 rounded-lg">
            <h4 className="font-bold text-lg">Node {node.id + 1}</h4>
            <div className="my-2">
              <p className="text-sm text-slate-400">Supplied / Demand</p>
              <p className={`text-2xl font-semibold ${node.supplied >= node.demand ? 'text-green-400' : 'text-sky-300'}`}>
                {node.supplied} / {node.demand}
              </p>
            </div>
            <div className="flex justify-center gap-2 mt-2">
                <button onClick={() => handleAllocate(node.id, 10)} className="px-3 py-1 bg-slate-600 rounded-md hover:bg-sky-500">+</button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={checkWinCondition} className="mt-8 px-8 py-3 bg-green-600 rounded-full font-bold text-lg hover:bg-green-500 transition-colors">
          Check Allocation
      </button>
    </div>
  );
};

export default ResourceRouterGame;
