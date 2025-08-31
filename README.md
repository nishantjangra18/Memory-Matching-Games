# Memory Match Game

A modern, responsive memory card game with multiple game modes, themes, and audio features.

## Features

- 🎮 **Multiple Game Modes**: 1v1, Single Player
- 🌓 **Theme System**: Light/Dark theme toggle
- 🎵 **Audio System**: Background music and sound effects
- ⚙️ **Settings**: Audio controls and preferences
- 📱 **Responsive Design**: Optimized for all devices including Samsung S20 Ultra
- 🎴 **Realistic Card Flipping**: 3D card animations
- 🏆 **Scoring System**: Competitive scoring for multiplayer modes

## Audio Setup

To enable audio features, create an `audio` folder in the `public` directory with the following files:

```
public/
  audio/
    background-music.mp3    # Background music (looping)
    card-flip.mp3          # Card flip sound effect
    match.mp3              # Match found sound effect
    game-over.mp3          # Game completion sound effect
```

### Audio File Requirements

- **Background Music**: MP3 format, recommended length: 2-3 minutes (will loop)
- **Sound Effects**: MP3 format, short duration (0.5-2 seconds)
- **File Size**: Keep under 5MB for optimal performance

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Add audio files to `public/audio/` directory
4. Start development server: `npm run dev`

## Game Modes

### 1v1 Mode
- Two players compete for highest score
- Turn-based gameplay
- Custom player names
- Score tracking

### Single Player Mode
- Classic memory game
- Time and moves tracking
- Personal best challenges

## Difficulty Levels

- **Easy**: 6 cards (3x2 grid)
- **Medium**: 8 cards (4x2 grid)  
- **Hard**: 12 cards (4x3 grid)

## Controls

- **Theme Toggle**: ☀️/🌙 button (top right)
- **Settings**: ⚙️ button (top right)
- **Audio Controls**: Background music and SFX toggles
- **Volume Sliders**: Individual control for music and effects

## Responsive Design

Optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Samsung S20 Ultra (1440x3200)

## Technologies Used

- React 18
- Framer Motion
- Tailwind CSS
- HTML5 Audio API
- Context API for state management

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License - feel free to use and modify!
