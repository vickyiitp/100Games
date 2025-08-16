import React, { useState } from 'react';

// Very simplified audio - a real version would use Web Audio API
interface MelodyMakerGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const MelodyMakerGame: React.FC<MelodyMakerGameProps> = ({ level, onGameComplete }) => {
    const [melody, setMelody] = useState<string[]>([]);

    const playNote = (note: string) => {
        setMelody(m => [...m, note]);
        // Placeholder for audio playback
    };
    
    const NOTES = ['C', 'D', 'E', 'F', 'G'];

    return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Melody Maker</h3>
            <p className="text-slate-400 mb-6">Create your own tune!</p>

            <div className="w-full max-w-md h-24 p-2 bg-slate-700/50 rounded-lg mb-8 flex items-center gap-2">
                {melody.map((note, i) => <div key={i} className="w-8 h-8 flex items-center justify-center bg-sky-500 rounded-full">{note}</div>)}
            </div>
            
            <div className="flex gap-2">
                {NOTES.map(note => (
                    <button key={note} onClick={() => playNote(note)} className="w-16 h-32 bg-white text-black font-bold text-2xl rounded-md active:bg-gray-300">
                        {note}
                    </button>
                ))}
            </div>
            
            <button onClick={() => onGameComplete(melody.length * 10 * level)} className="mt-8 px-6 py-3 bg-green-600 rounded-full font-bold">Finish Composition</button>
        </div>
    );
};

export default MelodyMakerGame;