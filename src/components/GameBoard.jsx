import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const icons = ["🍎","🍌","🍇","🍊","🍉","🥝","🍍","🥥","🍓","🥑","🍒","🍑"];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

export default function GameBoard({ difficulty, setMoves, setGameOver, gameStarted, gameMode, currentPlayer, onMatchComplete, onTurnSwitch }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);

  useEffect(() => {
    let size = difficulty === "easy" ? 6 : difficulty === "medium" ? 8 : 12;
    let selected = shuffle(icons).slice(0, size);
    let board = shuffle([...selected, ...selected]).map((icon, index) => ({
      id: index,
      icon,
    }));
    setCards(board);
    setFlipped([]);
    setMatched([]);
    setMatchedPairs(0);
  }, [difficulty]);

  const playSound = (type) => {
    if (window.playGameSFX) {
      window.playGameSFX(type);
    }
  };

  const handleFlip = (card) => {
    if (!gameStarted || flipped.length === 2 || flipped.includes(card.id) || matched.includes(card.id)) return;
    
    // Play card flip sound
    playSound('card-flip');
    
    setFlipped([...flipped, card.id]);

    if (flipped.length === 1) {
      setMoves((m) => m + 1);
      let firstCard = cards.find((c) => c.id === flipped[0]);
      if (firstCard.icon === card.icon) {
        // Match found!
        setMatched([...matched, flipped[0], card.id]);
        setFlipped([]);
        setMatchedPairs(prev => prev + 1);
        
        // Play match sound
        playSound('match');
        
        // Call onMatchComplete for scoring
        if (onMatchComplete) {
          onMatchComplete(1);
        }
        
        // Check if game is over
        if (matched.length + 2 === cards.length) {
          // Play game over sound
          playSound('game-over');
          setGameOver(true);
        }
      } else {
        // No match, switch turns after delay
        setTimeout(() => {
          setFlipped([]);
          // Switch player turn for 1v1 mode
          if (gameMode === "1v1" && onTurnSwitch) {
            onTurnSwitch();
          }
        }, 1000);
      }
    }
  };

  // Calculate grid columns based on difficulty and screen size
  const getGridCols = () => {
    if (difficulty === "easy") return "grid-cols-3 sm:grid-cols-3";
    if (difficulty === "medium") return "grid-cols-4 sm:grid-cols-4";
    return "grid-cols-4 sm:grid-cols-6 lg:grid-cols-6";
  };

  // Calculate card size based on difficulty and screen size
  const getCardSize = () => {
    if (difficulty === "easy") return "w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28";
    if (difficulty === "medium") return "w-14 h-18 sm:w-18 sm:h-22 md:w-20 md:h-24";
    return "w-12 h-16 sm:w-16 sm:h-20 md:w-18 md:h-22";
  };

  // Calculate container max width based on difficulty
  const getContainerWidth = () => {
    if (difficulty === "easy") return "max-w-sm sm:max-w-md";
    if (difficulty === "medium") return "max-w-md sm:max-w-lg";
    return "max-w-2xl sm:max-w-3xl";
  };

  return (
    <div className={`grid gap-2 sm:gap-3 md:gap-4 ${getGridCols()} p-3 sm:p-4 md:p-6 bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-white/10 ${getContainerWidth()} mx-auto`}>
      {cards.map((card) => {
        const isFlipped = flipped.includes(card.id) || matched.includes(card.id);
        const isClickable = gameStarted && !flipped.includes(card.id) && !matched.includes(card.id);
        
        return (
          <motion.div
            key={card.id}
            onClick={() => handleFlip(card)}
            className={`${getCardSize()} relative cursor-pointer transition-all duration-300 ${
              !gameStarted ? 'opacity-50 cursor-not-allowed' : ''
            } ${
              !isClickable ? 'cursor-not-allowed' : ''
            }`}
            whileHover={{ 
              scale: isClickable ? 1.05 : 1,
              rotateY: isClickable ? 5 : 0,
              z: isClickable ? 10 : 0
            }}
            whileTap={{ scale: isClickable ? 0.95 : 1 }}
            style={{ 
              transformStyle: 'preserve-3d',
              perspective: '1000px'
            }}
          >
            {/* Card Container with 3D Transform */}
            <motion.div
              className="w-full h-full relative"
              animate={{
                rotateY: isFlipped ? 180 : 0
              }}
              transition={{
                duration: 0.8,
                ease: [0.4, 0.0, 0.2, 1]
              }}
              style={{ 
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Card Back (Question Mark) */}
              <div
                className={`absolute inset-0 flex items-center justify-center rounded-xl sm:rounded-2xl text-lg sm:text-xl md:text-2xl font-bold ${
                  isFlipped 
                    ? 'bg-gradient-to-br from-slate-700 to-slate-800' 
                    : 'bg-gradient-to-br from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700'
                } shadow-lg hover:shadow-xl transition-all duration-300 border border-white/10`}
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(0deg)'
                }}
              >
                <span className="text-white/80">❓</span>
              </div>

              {/* Card Front (Icon) */}
              <div
                className="absolute inset-0 flex items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30 text-lg sm:text-xl md:text-2xl font-bold border border-white/20"
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <span className="text-white">{card.icon}</span>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}