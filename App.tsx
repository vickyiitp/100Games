
import React, { useState, useMemo } from 'react';
import { Game, GameCategory, Difficulty } from './types';
import { GAMES } from './constants';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import GameCard from './components/GameCard';
import FeaturedCarousel from './components/FeaturedCarousel';
import GameView from './components/GameView';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GameCategory>(GameCategory.ALL);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'All'>('All');
  const [activeGame, setActiveGame] = useState<Game | null>(null);

  const featuredGames = useMemo(() => GAMES.filter(g => g.isFeatured), []);

  const handlePlayGame = (game: Game) => {
    setActiveGame(game);
  };

  const handleCloseGame = () => {
    setActiveGame(null);
  };

  const filteredGames = useMemo(() => {
    return GAMES.filter(game => {
      const matchesCategory =
        selectedCategory === GameCategory.ALL || game.categories.includes(selectedCategory);
      
      const matchesDifficulty =
        selectedDifficulty === 'All' || game.difficulty === selectedDifficulty;

      const matchesSearch =
        game.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesDifficulty && matchesSearch;
    });
  }, [selectedCategory, selectedDifficulty, searchTerm]);

  return (
    <div 
        className="min-h-screen bg-slate-900 bg-cover bg-fixed" 
        style={{backgroundImage: `radial-gradient(circle at 10% 20%, rgba(30, 58, 138, 0.3), transparent), radial-gradient(circle at 80% 90%, rgba(107, 33, 168, 0.2), transparent)`}}>
      
      {activeGame ? (
        <GameView game={activeGame} onClose={handleCloseGame} />
      ) : (
        <div className="container mx-auto px-4 py-4">
          <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          
          <main>
            <FeaturedCarousel games={featuredGames} onPlay={handlePlayGame} />

            <FilterBar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedDifficulty={selectedDifficulty}
              setSelectedDifficulty={setSelectedDifficulty}
            />
            
            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredGames.map(game => (
                  <GameCard key={game.id} game={game} onPlay={handlePlayGame} />
                ))}
              </div>
            ) : (
               <div className="text-center py-16">
                  <h2 className="text-2xl font-bold text-slate-300">No Games Found</h2>
                  <p className="text-slate-500 mt-2">Try adjusting your search or filters.</p>
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
};

export default App;
