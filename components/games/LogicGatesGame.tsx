import React, { useState, useMemo } from 'react';

type GateType = 'AND' | 'OR' | 'NOT';

interface LogicProblem {
    gate: GateType;
    inputs: (0 | 1)[];
    answer: 0 | 1;
}

const generateProblem = (level: number): LogicProblem => {
    const gate: GateType = ['AND', 'OR', 'NOT'][Math.floor(Math.random() * 3)] as GateType;
    let inputs: (0 | 1)[] = [];
    let answer: 0 | 1 = 0;

    if (gate === 'NOT') {
        inputs = [Math.random() > 0.5 ? 1 : 0];
        answer = inputs[0] === 0 ? 1 : 0;
    } else {
        inputs = [Math.random() > 0.5 ? 1 : 0, Math.random() > 0.5 ? 1 : 0];
        if (gate === 'AND') {
            answer = inputs[0] === 1 && inputs[1] === 1 ? 1 : 0;
        } else { // OR
            answer = inputs[0] === 1 || inputs[1] === 1 ? 1 : 0;
        }
    }
    return { gate, inputs, answer };
};

interface LogicGatesGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const LogicGatesGame: React.FC<LogicGatesGameProps> = ({ level, onGameComplete }) => {
    const problem = useMemo(() => generateProblem(level), [level]);

    const handleAnswer = (selection: 0 | 1) => {
        onGameComplete(selection === problem.answer ? 100 * level : 0);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Logic Gates</h3>
            <p className="text-slate-400 mb-8">What is the output of this logic gate?</p>

            <div className="flex items-center justify-center gap-8">
                <div className="flex flex-col gap-4">
                    {problem.inputs.map((input, i) => (
                        <div key={i} className="w-16 h-16 bg-slate-700 rounded-md flex items-center justify-center text-4xl font-bold">
                            {input}
                        </div>
                    ))}
                </div>
                
                <div className="w-24 h-24 bg-sky-500 rounded-full flex items-center justify-center text-2xl font-bold">
                    {problem.gate}
                </div>
                
                <div className="flex flex-col gap-4">
                    <button onClick={() => handleAnswer(1)} className="w-16 h-16 bg-slate-600 hover:bg-slate-500 rounded-md text-4xl font-bold">1</button>
                    <button onClick={() => handleAnswer(0)} className="w-16 h-16 bg-slate-600 hover:bg-slate-500 rounded-md text-4xl font-bold">0</button>
                </div>
            </div>
        </div>
    );
};

export default LogicGatesGame;