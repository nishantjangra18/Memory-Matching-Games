import React, { useState, createContext, useContext } from "react";
import GameBoard from "./components/GameBoard";
import HUD from "./components/HUD";
import Modal from "./components/Modal";
import GameModeSelector from "./components/GameModeSelector";

// Create theme context
export const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default function App() {
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [gameKey, setGameKey] = useState(0);
  const [gameMode, setGameMode] = useState(null);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [player1Name, setPlayer1Name] = useState("Player 1");
  const [player2Name, setPlayer2Name] = useState("Player 2");
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const restartGame = () => {
    setMoves(0);
    setTime(0);
    setGameOver(false);
    setGameStarted(false);
    setGameKey(prev => prev + 1);
    setCurrentPlayer(1);
    // Reset scores when restarting
    setPlayer1Score(0);
    setPlayer2Score(0);
  };

  const resetToMenu = () => {
    setGameMode(null);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setCurrentPlayer(1);
    setPlayer1Name("Player 1");
    setPlayer2Name("Player 2");
    restartGame();
  };

  const handleMatchComplete = (matchedPairs) => {
    if (gameMode === "1v1") {
      const points = matchedPairs * 10;
      if (currentPlayer === 1) {
        setPlayer1Score(prev => prev + points);
      } else {
        setPlayer2Score(prev => prev + points);
      }
      // Don't switch turns when a match is found - player gets another turn
    }
  };

  const handleTurnSwitch = () => {
    if (gameMode === "1v1") {
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
  };

  if (!gameMode) {
    return (
      <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
        <div className="relative">
          <GameModeSelector 
            onSelectMode={setGameMode}
            player1Name={player1Name}
            setPlayer1Name={setPlayer1Name}
            player2Name={player2Name}
            setPlayer2Name={setPlayer2Name}
          />
        </div>
      </ThemeContext.Provider>
    );
  }

  // Theme-based styles
  const themeStyles = {
    background: isDarkTheme 
      ? "bg-slate-900"
      : "bg-gray-50",
    textColor: isDarkTheme ? "text-white" : "text-gray-800",
    cardBg: isDarkTheme ? "bg-white/10" : "bg-white/80",
    borderColor: isDarkTheme ? "border-white/10" : "border-gray-200",
    modeBadge: isDarkTheme ? "bg-white/10" : "bg-gray-800/20",
    modeText: isDarkTheme ? "text-white/90" : "text-gray-700"
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      <div className={`relative min-h-screen ${themeStyles.background} p-4`}>
        {/* Back to Menu Button - Top Left */}
        <button 
          onClick={resetToMenu}
          className={`absolute top-4 left-4 ${isDarkTheme ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-800'} transition-colors z-10 font-medium text-sm`}
        >
          ← Back to Menu
        </button>

        {/* Theme Toggle Button - Top Right */}
        <button 
          onClick={toggleTheme}
          className={`absolute top-4 right-4 p-2 rounded-full ${isDarkTheme ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-800/20 hover:bg-gray-800/30'} transition-all duration-200`}
        >
          {isDarkTheme ? '☀️' : '🌙'}
        </button>

        <div className="flex flex-col items-center justify-center gap-6 pt-16 max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center space-y-3">
            <h1 className={`text-4xl font-bold tracking-tight ${themeStyles.textColor}`}>
              🎴 Memory Match
            </h1>
            <div className={`inline-flex items-center px-3 py-2 ${themeStyles.modeBadge} backdrop-blur-sm rounded-full`}>
              <span className={`font-medium text-sm ${themeStyles.modeText}`}>
                {gameMode === "1v1" && "1 vs 1 Mode"}
                {gameMode === "normal" && "Single Player Mode"}
              </span>
            </div>
          </div>

          {/* Player Scores for 1v1 mode - Always side by side */}
          {gameMode === "1v1" && (
            <div className="flex gap-4 justify-center items-center w-full">
              <div className={`relative flex-1 p-4 rounded-xl backdrop-blur-sm transition-all duration-300 ${
                currentPlayer === 1 
                  ? 'bg-blue-500/20 border border-blue-500/30 shadow-lg shadow-blue-500/20' 
                  : `${themeStyles.cardBg} border ${themeStyles.borderColor}`
              }`}>
                <div className="text-center space-y-2">
                  <div className={`font-semibold text-sm ${themeStyles.modeText}`}>{player1Name}</div>
                  <div className={`text-2xl font-bold ${themeStyles.textColor}`}>{player1Score}</div>
                  {currentPlayer === 1 && (
                    <div className="flex items-center justify-center gap-1 text-blue-300 text-xs font-medium">
                      <span>🎯</span>
                      <span>Current Turn</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className={`relative flex-1 p-4 rounded-xl backdrop-blur-sm transition-all duration-300 ${
                currentPlayer === 2 
                  ? 'bg-red-500/20 border border-red-500/30 shadow-lg shadow-red-500/20' 
                  : `${themeStyles.cardBg} border ${themeStyles.borderColor}`
              }`}>
                <div className="text-center space-y-2">
                  <div className={`font-semibold text-sm ${themeStyles.modeText}`}>{player2Name}</div>
                  <div className={`text-2xl font-bold ${themeStyles.textColor}`}>{player2Score}</div>
                  {currentPlayer === 2 && (
                    <div className="flex items-center justify-center gap-1 text-red-300 text-xs font-medium">
                      <span>🎯</span>
                      <span>Current Turn</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Game Controls */}
          <HUD 
            moves={moves} 
            time={time} 
            setTime={setTime} 
            setDifficulty={setDifficulty}
            gameStarted={gameStarted}
            setGameStarted={setGameStarted}
            onRestart={restartGame}
            gameMode={gameMode}
            currentPlayer={currentPlayer}
          />
          
          {/* Game Board */}
          <GameBoard
            key={gameKey}
            difficulty={difficulty}
            setMoves={setMoves}
            setGameOver={setGameOver}
            gameStarted={gameStarted}
            gameMode={gameMode}
            currentPlayer={currentPlayer}
            onMatchComplete={handleMatchComplete}
            onTurnSwitch={handleTurnSwitch}
          />
          
          {gameOver && <Modal 
            moves={moves} 
            time={time} 
            onRestart={restartGame} 
            gameMode={gameMode}
            player1Score={player1Score}
            player2Score={player2Score}
            player1Name={player1Name}
            player2Name={player2Name}
          />}
        </div>
      </div>
    </ThemeContext.Provider>
  );
}