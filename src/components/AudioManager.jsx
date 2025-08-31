import React, { useEffect, useRef } from "react";

export default function AudioManager({ audioSettings, onAudioSettingsChange }) {
  const bgMusicRef = useRef(null);
  const sfxRef = useRef(null);

  // Initialize audio elements
  useEffect(() => {
    if (!bgMusicRef.current) {
      bgMusicRef.current = new Audio('/audio/background-music.mp3');
      bgMusicRef.current.loop = true;
      bgMusicRef.current.volume = audioSettings.bgMusicVolume / 100;
    }

    if (!sfxRef.current) {
      sfxRef.current = new Audio('/audio/card-flip.mp3');
      sfxRef.current.volume = audioSettings.sfxVolume / 100;
    }
  }, []);

  // Handle background music
  useEffect(() => {
    if (bgMusicRef.current) {
      if (audioSettings.backgroundMusic) {
        bgMusicRef.current.play().catch(e => console.log('Audio play failed:', e));
      } else {
        bgMusicRef.current.pause();
      }
    }
  }, [audioSettings.backgroundMusic]);

  // Handle volume changes
  useEffect(() => {
    if (bgMusicRef.current) {
      bgMusicRef.current.volume = audioSettings.bgMusicVolume / 100;
    }
  }, [audioSettings.bgMusicVolume]);

  useEffect(() => {
    if (sfxRef.current) {
      sfxRef.current.volume = audioSettings.sfxVolume / 100;
    }
  }, [audioSettings.sfxVolume]);

  // Play sound effect
  const playSFX = (type = 'card-flip') => {
    if (audioSettings.soundEffects && sfxRef.current) {
      sfxRef.current.currentTime = 0;
      sfxRef.current.play().catch(e => console.log('SFX play failed:', e));
    }
  };

  // Expose playSFX function to parent component
  useEffect(() => {
    if (window) {
      window.playGameSFX = playSFX;
    }
  }, [audioSettings.soundEffects]);

  return null; // This component doesn't render anything
}
