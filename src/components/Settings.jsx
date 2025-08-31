import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../App";

export default function Settings({ isOpen, onClose, audioSettings, onAudioSettingsChange }) {
  const { isDarkTheme } = useTheme();

  if (!isOpen) return null;

  const themeStyles = {
    background: isDarkTheme 
      ? "bg-slate-800/95 backdrop-blur-md"
      : "bg-white/95 backdrop-blur-md",
    textColor: isDarkTheme ? "text-white" : "text-gray-800",
    cardBg: isDarkTheme ? "bg-slate-700/50" : "bg-white/60",
    borderColor: isDarkTheme ? "border-white/20" : "border-gray-200",
    inputBg: isDarkTheme ? "bg-slate-600/50" : "bg-white/80",
    inputBorder: isDarkTheme ? "border-white/30" : "border-gray-300"
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={`${themeStyles.background} p-6 sm:p-8 rounded-2xl shadow-2xl border ${themeStyles.borderColor} max-w-md w-full`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-6">
          <h2 className={`text-2xl font-bold ${themeStyles.textColor} mb-2`}>
            ⚙️ Settings
          </h2>
          <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
            Customize your gaming experience
          </p>
        </div>

        <div className="space-y-6">
          {/* Background Music */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className={`font-medium ${themeStyles.textColor}`}>
                🎵 Background Music
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="bgMusic"
                  checked={audioSettings.backgroundMusic}
                  onChange={(e) => onAudioSettingsChange('backgroundMusic', e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                  {audioSettings.backgroundMusic ? 'On' : 'Off'}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`text-xs ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>Volume:</span>
              <input
                type="range"
                min="0"
                max="100"
                value={audioSettings.bgMusicVolume}
                onChange={(e) => onAudioSettingsChange('bgMusicVolume', parseInt(e.target.value))}
                disabled={!audioSettings.backgroundMusic}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                  isDarkTheme ? 'bg-slate-600' : 'bg-gray-200'
                } ${!audioSettings.backgroundMusic ? 'opacity-50' : ''}`}
              />
              <span className={`text-xs w-8 text-right ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                {audioSettings.bgMusicVolume}%
              </span>
            </div>
          </div>

          {/* Sound Effects */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className={`font-medium ${themeStyles.textColor}`}>
                🔊 Sound Effects
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="sfx"
                  checked={audioSettings.soundEffects}
                  onChange={(e) => onAudioSettingsChange('soundEffects', e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                  {audioSettings.soundEffects ? 'On' : 'Off'}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`text-xs ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>Volume:</span>
              <input
                type="range"
                min="0"
                max="100"
                value={audioSettings.sfxVolume}
                onChange={(e) => onAudioSettingsChange('sfxVolume', parseInt(e.target.value))}
                disabled={!audioSettings.soundEffects}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                  isDarkTheme ? 'bg-slate-600' : 'bg-gray-200'
                } ${!audioSettings.soundEffects ? 'opacity-50' : ''}`}
              />
              <span className={`text-xs w-8 text-right ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                {audioSettings.sfxVolume}%
              </span>
            </div>
          </div>

          {/* Close Button */}
          <div className="pt-4">
            <button
              onClick={onClose}
              className={`w-full px-4 py-2 rounded-lg ${themeStyles.cardBg} ${themeStyles.textColor} font-medium transition-all duration-200 border ${themeStyles.inputBorder} hover:${themeStyles.inputBorder.replace('/30', '/50')}`}
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
