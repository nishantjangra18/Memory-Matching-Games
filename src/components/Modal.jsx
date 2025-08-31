import React from "react";
import { motion } from "framer-motion";

export default function Modal({ moves, time, onRestart, gameMode, player1Score, player2Score, player1Name, player2Name }) {
  const getWinner = () => {
    if (gameMode === "1v1") {
      if (player1Score > player2Score) return player1Name;
      if (player2Score > player1Score) return player2Name;
      return "Tie";
    }
    return null;
  };

  const getScoreDisplay = () => {
    if (gameMode === "1v1") {
      return (
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-blue-500/20 rounded-xl border border-blue-500/30 shadow-lg">
            <span className="font-semibold text-lg">{player1Name}</span>
            <span className="text-2xl font-bold text-blue-300">{player1Score}</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-red-500/20 rounded-xl border border-red-500/30 shadow-lg">
            <span className="font-semibold text-lg">{player2Name}</span>
            <span className="text-2xl font-bold text-red-300">{player2Score}</span>
          </div>
        </div>
      );
    }
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center p-4 bg-green-500/20 rounded-xl border border-green-500/30 shadow-lg">
          <span className="font-semibold text-lg">Moves</span>
          <span className="text-2xl font-bold text-green-300">{moves}</span>
        </div>
        <div className="flex justify-between items-center p-4 bg-purple-500/20 rounded-xl border border-purple-500/30 shadow-lg">
          <span className="font-semibold text-lg">Time</span>
          <span className="text-2xl font-bold text-purple-300">{Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}</span>
        </div>
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4"
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-2xl border border-white/20 max-w-md w-full"
      >
        <div className="text-center space-y-6">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              🎉 Game Complete!
            </h2>
            {gameMode === "1v1" && (
              <div className="space-y-2">
                <p className="text-lg text-gray-300">
                  {getWinner() === "Tie" ? "It's a tie!" : `${getWinner()} wins!`}
                </p>
                <div className="text-2xl sm:text-3xl font-bold text-yellow-300">
                  🏆 {getWinner() === "Tie" ? "Tie Game" : "Winner!"}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {getScoreDisplay()}
          </div>

          <button
            onClick={onRestart}
            className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            🎮 Play Again
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}