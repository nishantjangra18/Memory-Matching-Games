# 🎴 Memory Match Game

A modern, responsive memory card matching game built with React, featuring both single-player and 1v1 multiplayer modes with beautiful animations and clean UI.

## 🚀 Features

### Game Modes
- **Single Player Mode**: Classic memory game experience
- **1v1 Multiplayer Mode**: Two players compete for the highest score
- **Turn-based gameplay** with score tracking

### Difficulty Levels
- **Easy**: 6 cards (3x2 grid)
- **Medium**: 8 cards (4x2 grid) 
- **Hard**: 12 cards (4x3 grid)

### Visual Features
- **Dark/Light Theme Toggle** with smooth transitions
- **3D Card Flip Animations** using Framer Motion
- **Responsive Design** that works on all screen sizes
- **Clean, Modern UI** with consistent theming
- **Smooth Hover Effects** and micro-interactions

### Game Mechanics
- **Score Tracking** for multiplayer mode
- **Move Counter** to track performance
- **Timer** to measure completion speed
- **Current Turn Indicator** for 1v1 mode
- **Auto Player Switching** when no match is found

## 🛠️ Setup & Installation

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd memory-game-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)
   - The game will automatically reload when you make changes

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## 🎮 Controls & How to Play

### Game Setup
1. **Choose Game Mode**
   - Select between "Single Player" or "1v1 Mode"
   - For 1v1 mode, enter player names

2. **Select Difficulty**
   - Choose from Easy, Medium, or Hard
   - Difficulty affects the number of cards and grid size

3. **Start Game**
   - Click "Start Game" to begin
   - Timer starts counting when game begins

### Gameplay
- **Click on cards** to flip them
- **Find matching pairs** of the same icon
- **Complete all pairs** to finish the game
- **In 1v1 mode**: Players take turns, current player gets another turn when finding a match

### Navigation
- **Back to Menu**: Return to game mode selection
- **Theme Toggle**: Switch between dark and light themes
- **Restart Game**: Reset current game with same settings

## 🔧 Technical Details

### Built With
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for React
- **JavaScript ES6+** - Modern JavaScript features

### Project Structure
```
src/
├── components/
│   ├── GameModeSelector.jsx    # Home page and mode selection
│   ├── GameBoard.jsx           # Main game board and card logic
│   ├── HUD.jsx                 # Game controls and difficulty selection
│   ├── Modal.jsx               # Game over modal
│   └── App.jsx                 # Main app component and routing
├── index.css                   # Global styles
└── main.jsx                    # App entry point
```

### Key Components

#### GameModeSelector
- Handles game mode selection
- Player name input for 1v1 mode
- Theme toggle functionality

#### GameBoard
- Manages card state and game logic
- Handles card flipping and matching
- Implements 3D card animations

#### HUD (Heads Up Display)
- Difficulty selection buttons
- Game start/restart controls
- Current player turn indicator

#### Modal
- Game completion screen
- Score display and statistics
- Play again functionality

## 🎯 Game Rules

### Single Player Mode
- Find all matching pairs as quickly as possible
- Timer runs from start to completion
- No score limit - focus on speed and efficiency

### 1v1 Mode
- Players take turns flipping cards
- Finding a match gives the player another turn
- Score is calculated: 10 points per matched pair
- Player with highest score wins

### Scoring System
- **Match Found**: +10 points (1v1 mode only)
- **No Match**: Turn switches to other player
- **Game Complete**: Final scores displayed

## 🐛 Known Issues

### Current Limitations
1. **Sound Effects**: Audio functionality is implemented but requires browser audio context setup
2. **Mobile Touch**: Some hover effects may not work optimally on touch devices
3. **Browser Compatibility**: Best experience on modern browsers (Chrome, Firefox, Safari, Edge)

### Potential Improvements
- Add sound effects and background music
- Implement local storage for high scores
- Add more card themes and customization options
- Include accessibility features (keyboard navigation, screen reader support)

## 🤝 Contributing

### Development Guidelines
- Follow React best practices and hooks
- Use Tailwind CSS for styling
- Maintain responsive design principles
- Test on multiple screen sizes

### Code Style
- Use functional components with hooks
- Implement proper error handling
- Add meaningful comments for complex logic
- Follow consistent naming conventions

## 📱 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Icons and emojis for card content
- Framer Motion for smooth animations
- Tailwind CSS for utility-first styling
- React community for excellent documentation

---

**Enjoy playing Memory Match! 🎉**

For questions or issues, please check the known issues section or create a new issue in the repository.
