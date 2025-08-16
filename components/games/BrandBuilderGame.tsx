import React, { useState, useMemo } from 'react';
import { PowerIcon, LeafIcon, StarIcon } from '../Icons';

const BRIEFS = [
    {
        product: "Eco-Friendly Energy Drink",
        keywords: ["natural", "energy", "earth"],
        options: {
            names: { "Volt": 0, "TerraFizz": 2, "NatureRush": 2 },
            logos: { "PowerIcon": 1, "LeafIcon": 2, "StarIcon": 0 },
            taglines: { "Power up instantly": 0, "The Earth's energy": 2, "Taste the stars": 0 },
        }
    },
    {
        product: "Luxury Space Tourism",
        keywords: ["luxury", "space", "exclusive"],
        options: {
            names: { "StarLeap": 2, "AstroTrek": 1, "GalaxyGo": 0 },
            logos: { "PowerIcon": 0, "LeafIcon": 0, "StarIcon": 2 },
            taglines: { "Your adventure awaits": 1, "Experience the cosmos in comfort": 2, "The cheapest way to space": 0 },
        }
    }
];

// Mock LeafIcon if it doesn't exist
const LOGO_MAP = { PowerIcon, LeafIcon, StarIcon };

interface BrandBuilderGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const BrandBuilderGame: React.FC<BrandBuilderGameProps> = ({ level, onGameComplete }) => {
    const brief = useMemo(() => BRIEFS[level % BRIEFS.length], [level]);
    const [selections, setSelections] = useState({ name: '', logo: '', tagline: '' });

    const handleSelect = (type: 'names' | 'logos' | 'taglines', value: string) => {
        setSelections(s => ({ ...s, [type.slice(0, -1)]: value }));
    };
    
    const handleSubmit = () => {
        if (!selections.name || !selections.logo || !selections.tagline) {
            // Add feedback for user
            return;
        }
        
        const nameScore = brief.options.names[selections.name as keyof typeof brief.options.names];
        const logoScore = brief.options.logos[selections.logo as keyof typeof brief.options.logos];
        const taglineScore = brief.options.taglines[selections.tagline as keyof typeof brief.options.taglines];
        
        const totalScore = (nameScore + logoScore + taglineScore) * 20 * level;
        onGameComplete(totalScore);
    };

    return (
        <div className="flex flex-col items-center justify-start h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-2">Brand Builder</h3>
            <div className="p-4 bg-slate-700/50 rounded-lg mb-6">
                <p className="text-slate-400">YOUR BRIEF:</p>
                <p className="text-xl font-semibold">{brief.product}</p>
            </div>

            <div className="w-full max-w-2xl space-y-4">
                {Object.entries(brief.options).map(([type, options]) => (
                    <div key={type}>
                        <h4 className="font-bold text-lg capitalize mb-2">{type}</h4>
                        <div className="flex justify-center gap-3 flex-wrap">
                            {Object.keys(options).map(option => {
                                const isSelected = selections[type.slice(0, -1) as keyof typeof selections] === option;
                                const LogoComponent = LOGO_MAP[option as keyof typeof LOGO_MAP];
                                return (
                                    <button
                                        key={option}
                                        onClick={() => handleSelect(type as any, option)}
                                        className={`p-3 rounded-lg border-2 transition-colors ${isSelected ? 'bg-sky-500 border-sky-400' : 'bg-slate-700 border-slate-600 hover:border-sky-500'}`}
                                    >
                                        {type === 'logos' && LogoComponent ? <LogoComponent className="w-8 h-8"/> : option}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={handleSubmit} className="mt-8 px-8 py-3 bg-green-600 rounded-full font-bold text-lg hover:bg-green-500">
                Launch Brand
            </button>
        </div>
    );
};

export default BrandBuilderGame;