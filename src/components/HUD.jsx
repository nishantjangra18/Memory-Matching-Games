import React, { useEffect } from "react";
import { useTheme } from "../App";

export default function HUD({ moves, time, setTime, setDifficulty, gameStarted, setGameStarted, onRestart, gameMode, currentPlayer }) {
  const { isDarkTheme } = useTheme();

  useEffect(() => {
    if (gameStarted) {
      const interval = setInterval(() => setTime((t) => t + 1), 1000);
      return () => clearInterval(interval);
    }
  }, [gameStarted, setTime]);

  return (
    <div className="flex flex-col items-center gap-6 sm:gap-8 w-full">
      {gameMode === "1v1" && (
        <div className={`px-6 sm:px-8 py-3 sm:py-4 ${isDarkTheme ? 'bg-white/10' : 'bg-gray-800/20'} backdrop-blur-sm rounded-full border ${isDarkTheme ? 'border-white/20' : 'border-gray-300/30'}`}>
          <span className={`font-semibold text-base sm:text-lg ${currentPlayer === 1 ? 'text-blue-300' : 'text-red-300'}`}>
            🎯 {currentPlayer === 1 ? 'Player 1' : 'Player 2'} Turn
          </span>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full">
        <button 
          onClick={() => setDifficulty("easy")} 
          className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-base sm:text-lg"
        >
          Easy
        </button>
        <button 
          onClick={() => setDifficulty("medium")} 
          className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-base sm:text-lg"
        >
          Medium
        </button>
        <button 
          onClick={() => setDifficulty("hard")} 
          className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-base sm:text-lg"
        >
          Hard
        </button>
      </div>
      
      <div className="mt-4 sm:mt-6">
        {!gameStarted ? (
          <button 
            onClick={() => setGameStarted(true)} 
            className="px-8 sm:px-10 py-4 sm:py-5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-lg sm:text-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            🚀 Start Game
          </button>
        ) : (
          <button 
            onClick={onRestart} 
            className="px-8 sm:px-10 py-4 sm:py-5 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-lg sm:text-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            🔄 Restart Game
          </button>
        )}
      </div>
    </div>
  );
}