import React, { useState, useEffect, useMemo } from 'react';

const EMOJI_ICONS = ['🧠', '⚡️', '🚀', '⚛️', '💎', '🎯', '💡', '🛰️', '🧬', '🧭', '🔮', '🔭', '🤖', '👾', '🌐', '⚖️'];

interface Card {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface NeuroMatchGameProps {
  level: number;
  onGameComplete: (score: number) => void;
}

const NeuroMatchGame: React.FC<NeuroMatchGameProps> = ({ level, onGameComplete }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  const { numPairs, gridCols } = useMemo(() => {
    const pairs = Math.min(EMOJI_ICONS.length, 4 + level);
    let cols = 4;
    if (pairs > 4) cols = 4;
    if (pairs > 6) cols = 5;
    if (pairs > 10) cols = 6;
    if (pairs > 15) cols = 8;
    return { numPairs: pairs, gridCols: cols };
  }, [level]);

  const createGameBoard = () => {
    const gameSymbolsSource = EMOJI_ICONS.slice(0, numPairs);
    const gameSymbols = [...gameSymbolsSource, ...gameSymbolsSource];
    const shuffledSymbols = gameSymbols.sort(() => Math.random() - 0.5);
    const initialCards: Card[] = shuffledSymbols.map((symbol, index) => ({
      id: index,
      symbol,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(initialCards);
    setMoves(0);
    setFlippedCards([]);
  };

  useEffect(() => {
    createGameBoard();
  }, [level, numPairs]);
  
  const allMatched = useMemo(() => cards.length > 0 && cards.every(c => c.isMatched), [cards]);

  useEffect(() => {
    if (allMatched) {
      // Score calculation: More points for higher levels.
      const score = Math.max(100, (1000 * level) - (moves * 10));
      setTimeout(() => onGameComplete(score), 500);
    }
  }, [allMatched, moves, level, onGameComplete]);


  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsChecking(true);
      setMoves(prev => prev + 1);
      const [firstCardIndex, secondCardIndex] = flippedCards;
      const firstCard = cards[firstCardIndex];
      const secondCard = cards[secondCardIndex];

      if (firstCard.symbol === secondCard.symbol) {
        setCards(prevCards =>
          prevCards.map(card =>
            card.symbol === firstCard.symbol ? { ...card, isMatched: true } : card
          )
        );
        setFlippedCards([]);
        setIsChecking(false);
      } else {
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card => {
              if (flippedCards.includes(card.id)) {
                return { ...card, isFlipped: false };
              }
              return card;
            })
          );
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  }, [flippedCards, cards]);

  const handleCardClick = (index: number) => {
    if (isChecking || cards[index].isFlipped || cards[index].isMatched || flippedCards.length >= 2) {
      return;
    }

    setCards(prevCards =>
      prevCards.map((card, i) =>
        i === index ? { ...card, isFlipped: true } : card
      )
    );
    setFlippedCards(prev => [...prev, index]);
  };
  
  const cardSize = gridCols > 5 ? 'w-16 h-16 md:w-20 md:h-20' : 'w-20 h-20 md:w-24 md:h-24';
  const fontSize = gridCols > 5 ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl';

  return (
    <div className="flex flex-col items-center justify-center h-full">
        <div className="mb-4 text-center">
            <p className="text-slate-400">Find all {numPairs} matching pairs.</p>
            <p className="text-2xl font-bold text-white">Moves: {moves}</p>
        </div>
      <div className={`grid gap-2 md:gap-4 p-4 bg-slate-900/50 rounded-lg`} style={{gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`}}>
        {cards.map((card, index) => (
          <div key={index} className={`${cardSize} perspective-1000`} onClick={() => handleCardClick(index)}>
            <div
              className={`relative w-full h-full transform-style-3d transition-transform duration-500 ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''}`}
            >
              <div className="absolute w-full h-full backface-hidden bg-sky-500 rounded-lg flex items-center justify-center cursor-pointer">
                {/* Card Back */}
              </div>
              <div className="absolute w-full h-full backface-hidden bg-slate-600 rounded-lg flex items-center justify-center rotate-y-180">
                <span className={fontSize}>{card.symbol}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NeuroMatchGame;