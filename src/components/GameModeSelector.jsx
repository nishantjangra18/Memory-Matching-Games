import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../App";

export default function GameModeSelector({ onSelectMode, player1Name, setPlayer1Name, player2Name, setPlayer2Name }) {
  const [showNameInputs, setShowNameInputs] = useState(false);
  const { isDarkTheme, toggleTheme } = useTheme();

  const handleModeSelect = (mode) => {
    if (mode === "1v1") {
      setShowNameInputs(true);
    } else {
      onSelectMode(mode);
    }
  };

  const handleStart1v1 = () => {
    if (player1Name.trim() && player2Name.trim()) {
      onSelectMode("1v1");
    }
  };

  // Theme-based styles
  const themeStyles = {
    background: isDarkTheme 
      ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50",
    textColor: isDarkTheme ? "text-white" : "text-gray-800",
    subtitleColor: isDarkTheme ? "text-gray-300" : "text-gray-600",
    cardBg: isDarkTheme ? "bg-white/10" : "bg-white/80",
    cardBorder: isDarkTheme ? "border-white/20" : "border-gray-200",
    inputBg: isDarkTheme ? "bg-white/10" : "bg-white/60",
    inputBorder: isDarkTheme ? "border-white/20" : "border-gray-300",
    inputFocusRing: isDarkTheme ? "ring-blue-500/50" : "ring-blue-500/30",
    inputFocusBorder: isDarkTheme ? "border-blue-500/50" : "border-blue-500/30"
  };

  return (
    <div className={`relative min-h-screen ${themeStyles.background} p-6 sm:p-8`}>
      {/* Theme Toggle Button - Top Right */}
      <button 
        onClick={toggleTheme}
        className={`absolute top-6 sm:top-8 right-6 sm:right-8 p-3 rounded-full ${isDarkTheme ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-800/20 hover:bg-gray-800/30'} transition-all duration-200 shadow-lg`}
      >
        {isDarkTheme ? '☀️' : '🌙'}
      </button>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center justify-center min-h-screen max-w-6xl mx-auto"
      >
        {/* Header Section */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.h1 
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-8"
          >
            🎴 Memory Match
          </motion.h1>
          <motion.p 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl sm:text-2xl md:text-3xl max-w-3xl mx-auto"
          >
            Choose Your Game Mode
          </motion.p>
        </div>

        {!showNameInputs ? (
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 w-full max-w-5xl"
          >
            {/* 1 vs 1 Mode */}
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group cursor-pointer"
              onClick={() => handleModeSelect("1v1")}
            >
              <div className={`relative overflow-hidden rounded-3xl ${themeStyles.cardBg} ${themeStyles.cardBorder} border p-10 sm:p-12 h-full transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 group-hover:border-blue-400/40`}>
                <div className="text-center space-y-6">
                  <motion.div 
                    className="text-6xl sm:text-7xl mb-6"
                    whileHover={{ rotate: 5, scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    👥
                  </motion.div>
                  <h3 className="text-3xl sm:text-4xl font-bold mb-4">1 vs 1</h3>
                  <p className={`text-lg sm:text-xl leading-relaxed ${isDarkTheme ? 'text-blue-200' : 'text-blue-700'}`}>
                    Two players compete for the highest score. Take turns finding matches!
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Normal Single Player Mode */}
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group cursor-pointer"
              onClick={() => handleModeSelect("normal")}
            >
              <div className={`relative overflow-hidden rounded-3xl ${themeStyles.cardBg} ${themeStyles.cardBorder} border p-10 sm:p-12 h-full transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 group-hover:border-purple-400/40`}>
                <div className="text-center space-y-6">
                  <motion.div 
                    className="text-6xl sm:text-7xl mb-6"
                    whileHover={{ rotate: -5, scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    🎮
                  </motion.div>
                  <h3 className="text-3xl sm:text-4xl font-bold mb-4">Single Player</h3>
                  <p className={`text-lg sm:text-xl leading-relaxed ${isDarkTheme ? 'text-purple-200' : 'text-purple-700'}`}>
                    Classic memory game experience. Find all pairs as quickly as possible!
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-2xl mx-auto"
          >
            <div className={`${themeStyles.cardBg} backdrop-blur-md p-10 sm:p-12 rounded-3xl border ${themeStyles.cardBorder} shadow-2xl`}>
              <h3 className="text-3xl sm:text-4xl font-bold mb-10 text-center">Enter Player Names</h3>
              
              <div className="space-y-8">
                <div>
                  <label className={`block text-lg font-medium mb-4 ${themeStyles.subtitleColor}`}>Player 1 Name</label>
                  <input
                    type="text"
                    value={player1Name}
                    onChange={(e) => setPlayer1Name(e.target.value)}
                    className={`w-full px-6 py-4 rounded-xl ${themeStyles.inputBg} border ${themeStyles.inputBorder} ${themeStyles.textColor} placeholder-gray-400 focus:outline-none focus:ring-2 ${themeStyles.inputFocusRing} focus:border ${themeStyles.inputFocusBorder} transition-all duration-200 text-lg`}
                    placeholder="Enter Player 1 name"
                  />
                </div>
                
                <div>
                  <label className={`block text-lg font-medium mb-4 ${themeStyles.subtitleColor}`}>Player 2 Name</label>
                  <input
                    type="text"
                    value={player2Name}
                    onChange={(e) => setPlayer2Name(e.target.value)}
                    className={`w-full px-6 py-4 rounded-xl ${themeStyles.inputBg} border ${themeStyles.inputBorder} ${themeStyles.textColor} placeholder-gray-400 focus:outline-none focus:ring-2 ${themeStyles.inputFocusRing} focus:border ${themeStyles.inputFocusBorder} transition-all duration-200 text-lg`}
                    placeholder="Enter Player 2 name"
                  />
                </div>
              </div>

              <div className="flex gap-6 mt-10">
                <button
                  onClick={() => setShowNameInputs(false)}
                  className={`flex-1 px-8 py-4 rounded-xl ${themeStyles.inputBg} hover:${themeStyles.inputBg.replace('/10', '/20')} ${themeStyles.textColor} font-medium transition-all duration-200 border ${themeStyles.inputBorder} hover:${themeStyles.inputBorder.replace('/20', '/30')} text-lg`}
                >
                  Back
                </button>
                <button
                  onClick={handleStart1v1}
                  disabled={!player1Name.trim() || !player2Name.trim()}
                  className="flex-1 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
                >
                  Start Game
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
