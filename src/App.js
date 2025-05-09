import React, { useState, useEffect, useRef } from 'react';
import { Compass } from 'lucide-react';
import RPGMap from './components/RPGMap';
import { 
  RPGDialogBox, 
  RPGButton, 
  RPGInput, 
  RPGLetterBank,
  RPGNotification 
} from './components/RPGUIComponents';
import './styles/rpg-styles.css';

// Game data structure
const gameData = {
  title: "Bubba's Big Day",
  introduction: {
    title: "Bubba's Big Day",
    story: "After waiting for what feels like forever for the proposal, baby has decided to take matters into her own hands, and hunt down Bubba. Bubba seems to be nowhere to be found, but there's a trail of clues left around Boston. Follow the path of crumbs, complete the challenges at each location, and perhaps you'll find what you've been waiting for at the end of this adventure...",
    instructions: "At each location, you'll need to:\n1. Enter the location passcode to confirm you're in the right place\n2. Complete a set of challenges\n3. Solve a riddle to find your next destination"
  },
  locations: [
    {
      id: "apartment",
      name: "Baby's Apartment",
      passcode: "home123",
      description: "Where your journey begins, surrounded by memories you've built together.",
      challenges: [
        {
          type: "question",
          prompt: "Find our first photo together and enter the date it was taken (MM/DD/YYYY)",
          answer: "06/14/2022",
          hint: "Check the photo album on the bookshelf"
        },
        {
          type: "task",
          prompt: "Find the hidden note I left inside your favorite coffee mug",
          answer: "iloveyou",
          hint: "It's the blue mug with the chip on the handle"
        }
      ],
      finalRiddle: {
        prompt: "Where we had our first date, where the barista knows your name, a place of warmth and morning ritual.",
        letterBank: "CATBEFJHMRIOSCNPAL",
        answer: "cafe fixe",
        hint: "The place where you always order a vanilla latte with an extra shot"
      },
      nextLocation: "Café Fixe at 1642 Beacon St, Brookline. Ask for the envelope with your name on it."
    },
    {
      id: "cafe",
      name: "Café Fixe",
      passcode: "vanilla",
      description: "The cozy corner cafe where we spent our first date talking until closing time.",
      challenges: [
        {
          type: "task",
          prompt: "Order my usual drink and find the message written under the cup",
          answer: "forever",
          hint: "I always get a medium americano with room for cream"
        },
        {
          type: "question",
          prompt: "What song was playing when we first kissed outside this cafe?",
          answer: "perfect",
          hint: "It was an Ed Sheeran song"
        }
      ],
      finalRiddle: {
        prompt: "Where we celebrate special occasions, where I first told you I love you, candlelight and your favorite dish await.",
        letterBank: "BAVRALHIABLTA",
        answer: "bar vlaha",
        hint: "You always order the same pasta dish here"
      },
      nextLocation: "Bar Vlaha at 1653 Beacon St, Brookline. Reservation under your name at the host stand."
    },
    {
      id: "restaurant",
      name: "Bar Vlaha",
      passcode: "pasta22",
      description: "Our special occasion spot where we've celebrated anniversaries and milestones.",
      challenges: [
        {
          type: "task",
          prompt: "Find the special menu item named after you",
          answer: "amore",
          hint: "Check today's specials"
        },
        {
          type: "question",
          prompt: "What did I whisper to you the first time we came here?",
          answer: "beautiful",
          hint: "It was a comment about how you looked in the candlelight"
        }
      ],
      finalRiddle: {
        prompt: "A place of pampering and relaxation, where you go to treat yourself, colored bottles lined up like soldiers.",
        letterBank: "NTSALIUHTDOAI",
        hint: "You had your nails done here last month before our friend's wedding",
        answer: "nail studio"
      },
      nextLocation: "The Nail Studio at 215 Newbury St, Boston. Tell them you're there for the 'Special Package'."
    },
    {
      id: "nailsalon",
      name: "The Nail Studio",
      passcode: "polish",
      description: "Your favorite spot to relax and get pampered before special events.",
      challenges: [
        {
          type: "task",
          prompt: "Choose a nail color that matches our first gift to you",
          answer: "ruby",
          hint: "Think about the earrings I gave you for your birthday last year"
        },
        {
          type: "question",
          prompt: "What name did we give to our future dream house?",
          answer: "serenity",
          hint: "We talked about it during your last manicure here"
        }
      ],
      finalRiddle: {
        prompt: "A place of luxury and rest for travelers, where the city skyline meets the clouds, room with a view awaits.",
        letterBank: "THOTELEH",
        answer: "the hotel",
        hint: "We stayed here when my parents first visited"
      },
      nextLocation: "The Hotel, 154 Berkeley St, Boston. Go to the front desk and ask for the key to your heart."
    },
    {
      id: "hotel",
      name: "The Hotel",
      passcode: "forever",
      description: "A luxury tower overlooking the city where our next chapter begins.",
      challenges: [
        {
          type: "task",
          prompt: "Go to room 823 and find the rose petals leading to your final surprise",
          answer: "yes",
          hint: "Follow your heart"
        }
      ],
      finalMessage: "This journey ends where our new beginning starts. I'm waiting for you inside with the question you've been waiting for. It's time for us to write our next chapter together."
    }
  ]
};

// Map tile types for the expanding map
const mapTiles = {
  grass: "🌿",
  tree: "🌲",
  path: "🟤",
  water: "🌊",
  mountain: "⛰️",
  house: "🏠",
  cafe: "☕",
  restaurant: "🍽️",
  salon: "💅",
  hotel: "🏨",
  player: "🧍",
  unknown: "❓"
};
  
// Main App Component
const TreasureHunt = () => {
  const [gameState, setGameState] = useState({
    started: false,
    currentLocationIndex: 0,
    locationUnlocked: false,
    completedChallenges: [],
    riddleSolved: false,
    nextLocationRevealed: false,
    gameCompleted: false,
    revealedMap: [] // For tracking which parts of the map are revealed
  });
  
  const [input, setInput] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const currentRef = useRef(null);
  
  // Get current location data
  const currentLocation = gameData.locations[gameState.currentLocationIndex];
  
  // Calculate total challenges at current location
  const totalChallenges = currentLocation ? currentLocation.challenges.length : 0;
  const completedChallengesCount = gameState.completedChallenges.length;
  
  // Handle input changes
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  
  // Check passcode
  const checkPasscode = () => {
    if (input.toLowerCase() === currentLocation.passcode.toLowerCase()) {
      setGameState({
        ...gameState,
        locationUnlocked: true
      });
      setMessage({ text: "Passcode correct! Location unlocked.", type: "success" });
      setInput("");
      
      // Scroll to challenges section
      setTimeout(() => {
        document.getElementById('challenges-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } else {
      setMessage({ text: "Incorrect passcode. Try again!", type: "error" });
    }
  };
  
  // Check challenge answer
  const checkChallengeAnswer = (challengeIndex) => {
    const challenge = currentLocation.challenges[challengeIndex];
    
    if (input.toLowerCase() === challenge.answer.toLowerCase()) {
      if (!gameState.completedChallenges.includes(challengeIndex)) {
        const newCompletedChallenges = [...gameState.completedChallenges, challengeIndex];
        
        setGameState({
          ...gameState,
          completedChallenges: newCompletedChallenges
        });
        
        setMessage({ text: "Challenge completed!", type: "success" });
        setInput("");
        
        // Check if all challenges are completed
        if (newCompletedChallenges.length === totalChallenges) {
          // Scroll to riddle section after a delay
          setTimeout(() => {
            document.getElementById('riddle-section')?.scrollIntoView({ behavior: 'smooth' });
          }, 800);
        }
      }
    } else {
      setMessage({ text: "That's not quite right. Try again!", type: "error" });
    }
  };
  
  // Check riddle answer
  const checkRiddleAnswer = () => {
    if (currentLocation.finalRiddle && input.toLowerCase() === currentLocation.finalRiddle.answer.toLowerCase()) {
      setGameState({
        ...gameState,
        riddleSolved: true,
        nextLocationRevealed: true
      });
      
      setMessage({ text: "Riddle solved! Next location revealed.", type: "success" });
      setInput("");
      
      // Scroll to next location section
      setTimeout(() => {
        document.getElementById('next-location-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } else {
      setMessage({ text: "That's not the right answer to the riddle. Try again!", type: "error" });
    }
  };
  
  // Handle final challenge
  const handleFinalChallenge = () => {
    if (currentLocation.id === "hotel" && input.toLowerCase() === currentLocation.challenges[0].answer.toLowerCase()) {
      setGameState({
        ...gameState,
        completedChallenges: [0],
        gameCompleted: true
      });
      
      setMessage({ text: "Congratulations! You've completed the treasure hunt!", type: "success" });
      setInput("");
      
      // Scroll to final message
      setTimeout(() => {
        document.getElementById('final-message')?.scrollIntoView({ behavior: 'smooth' });
      }, 800);
    } else {
      setMessage({ text: "That's not quite right. Try again!", type: "error" });
    }
  };
  
  // Generate initial map
  const generateInitialMap = () => {
    // Create a 10x10 grid of unknown tiles
    const initialMap = Array(10).fill().map(() => Array(10).fill("unknown"));
    
    // Reveal only the starting point (apartment)
    initialMap[5][1] = "house"; // Apartment position
    initialMap[5][2] = "path"; // Path leading from apartment
    initialMap[5][3] = "unknown"; // Next area still unknown
    
    // Add some basic terrain
    for (let i = 0; i < 10; i++) {
      initialMap[0][i] = "tree"; // Top border
      initialMap[9][i] = "tree"; // Bottom border
      initialMap[i][0] = "tree"; // Left border
      initialMap[i][9] = "tree"; // Right border
    }
    
    // Add some random trees and grass
    for (let i = 1; i < 9; i++) {
      for (let j = 1; j < 9; j++) {
        if (initialMap[i][j] === "unknown" && Math.random() < 0.2) {
          initialMap[i][j] = "grass";
        }
      }
    }
    
    return initialMap;
  };
  
  // Update map as player progresses
  const updateMap = (locationIndex) => {
    const newMap = [...gameState.revealedMap];
    
    // Define the positions of locations on the map grid
    const locations = [
      { x: 1, y: 5, type: "house" }, // Apartment
      { x: 4, y: 3, type: "cafe" },  // Cafe
      { x: 6, y: 5, type: "restaurant" }, // Restaurant
      { x: 7, y: 7, type: "salon" }, // Nail Salon
      { x: 8, y: 5, type: "hotel" }  // Hotel
    ];
    
    // Reveal the path to the current location
    if (locationIndex > 0) {
      const prevLocation = locations[locationIndex-1];
      const currLocation = locations[locationIndex];
      
      // Reveal current location
      newMap[currLocation.y][currLocation.x] = currLocation.type;
      
      // Create path between previous and current location
      const pathPoints = getPathBetweenPoints(
        prevLocation.x, prevLocation.y,
        currLocation.x, currLocation.y
      );
      
      // Add path tiles
      pathPoints.forEach(point => {
        if (newMap[point.y][point.x] === "unknown" || newMap[point.y][point.x] === "grass") {
          newMap[point.y][point.x] = "path";
        }
      });
      
      // Reveal a bit around the new location
      for (let y = currLocation.y - 1; y <= currLocation.y + 1; y++) {
        for (let x = currLocation.x - 1; x <= currLocation.x + 1; x++) {
          if (y >= 0 && y < 10 && x >= 0 && x < 10) {
            if (newMap[y][x] === "unknown") {
              newMap[y][x] = Math.random() < 0.7 ? "grass" : "tree";
            }
          }
        }
      }
    }
    
    return newMap;
  };
  
  // Get path points between two locations (simple implementation)
  const getPathBetweenPoints = (x1, y1, x2, y2) => {
    const points = [];
    
    // Horizontal movement first
    const xDiff = x2 - x1;
    const xDir = xDiff > 0 ? 1 : -1;
    
    for (let i = 1; i <= Math.abs(xDiff); i++) {
      points.push({ x: x1 + (i * xDir), y: y1 });
    }
    
    // Then vertical movement
    const yDiff = y2 - y1;
    const yDir = yDiff > 0 ? 1 : -1;
    
    for (let i = 1; i <= Math.abs(yDiff); i++) {
      points.push({ x: x2, y: y1 + (i * yDir) });
    }
    
    return points;
  };
  
  // Proceed to next location
  const proceedToNextLocation = () => {
    if (gameState.currentLocationIndex < gameData.locations.length - 1) {
      const nextIndex = gameState.currentLocationIndex + 1;
      const updatedMap = updateMap(nextIndex);
      
      setGameState({
        ...gameState,
        currentLocationIndex: nextIndex,
        locationUnlocked: false,
        completedChallenges: [],
        riddleSolved: false,
        nextLocationRevealed: false,
        revealedMap: updatedMap
      });
      
      setMessage({ text: `Proceeding to ${gameData.locations[nextIndex].name}`, type: "info" });
      
      // Scroll to top of the new location
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Start the game
  const startGame = () => {
    const initialMap = generateInitialMap();
    
    setGameState({
      ...gameState,
      started: true,
      revealedMap: initialMap
    });
    
    // Scroll to the first location section
    setTimeout(() => {
      document.getElementById('location-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };
  
  // Clear message after 5 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [message]);
  
  // Render the game map
  const renderGameMap = () => {
    if (!gameState.revealedMap.length) return null;
    
    // Define the positions of locations on the map grid
    const locationPositions = [
      { x: 1, y: 5, type: "house" }, // Apartment
      { x: 4, y: 3, type: "cafe" },  // Cafe
      { x: 6, y: 5, type: "restaurant" }, // Restaurant
      { x: 7, y: 7, type: "salon" }, // Nail Salon
      { x: 8, y: 5, type: "hotel" }  // Hotel
    ];
    
    return (
      <RPGMap 
        mapData={gameState.revealedMap}
        tileTypes={mapTiles}
        currentLocationIndex={gameState.currentLocationIndex}
        locationPositions={locationPositions}
        animate={true}
      />
    );
  };

  return (
    <div className="min-h-screen bg-green-900 text-amber-100 font-mono">
      {/* Header */}
      <header className="p-4 bg-yellow-900 border-b-4 border-green-700 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-amber-200 pixelated">
          {gameData.title}
        </h1>
        <div className="flex items-center">
          <Compass className="text-amber-300 mr-2" />
          <span className="text-xs md:text-sm pixelated">
            {gameState.started ? `Location ${gameState.currentLocationIndex + 1}/${gameData.locations.length}` : "Ready to start"}
          </span>
        </div>
      </header>
      
      {/* Game container */}
      <div className="container mx-auto p-4 md:p-8 max-w-3xl">
        {/* Introduction */}
        {!gameState.started && (
          <div className="game-section bg-yellow-900/70 border-2 border-yellow-800 p-6 rounded-lg mb-8 animate-fadeIn">
            <h2 className="text-2xl text-amber-200 mb-4 pixelated">{gameData.introduction.title}</h2>
            <div className="game-box bg-green-900/50 border border-yellow-700 p-4 mb-6 rounded-lg">
              <p className="mb-4 leading-relaxed">{gameData.introduction.story}</p>
              <div className="mb-4 p-4 bg-yellow-900/50 rounded-lg border border-yellow-700">
                <h3 className="text-amber-200 mb-2 pixelated">Instructions:</h3>
                <p className="whitespace-pre-line">{gameData.introduction.instructions}</p>
              </div>
            </div>
            <RPGButton 
              onClick={startGame}
              className="w-full py-3 px-6"
              primary={true}
            >
              START YOUR QUEST
            </RPGButton>
          </div>
        )}
        
        {/* Game content */}
        {gameState.started && currentLocation && (
          <>
            {/* Game Map */}
            <div className="mb-8 animate-fadeIn">
              {renderGameMap()}
            </div>
            
            {/* Location information */}
            <div id="location-section" className="game-section bg-yellow-900/70 border-2 border-yellow-800 p-6 rounded-lg mb-8 animate-fadeIn">
              <h2 className="text-2xl text-amber-200 mb-4 pixelated">🗺️ {currentLocation.name}</h2>
              <div className="game-box bg-green-900/50 border border-yellow-700 p-4 mb-6 rounded-lg">
                <p className="mb-4">{currentLocation.description}</p>
                
                {!gameState.locationUnlocked && (
                  <div className="passcode-section">
                    <h3 className="text-amber-200 mb-2 pixelated">Enter Location Passcode:</h3>
                    <div className="flex space-x-2">
                      <RPGInput
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Enter passcode..."
                      />
                      <RPGButton
                        onClick={checkPasscode}
                        primary={true}
                      >
                        UNLOCK
                      </RPGButton>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Challenges */}
            {gameState.locationUnlocked && (
              <div id="challenges-section" className="game-section bg-yellow-900/70 border-2 border-yellow-800 p-6 rounded-lg mb-8 animate-fadeIn">
                <h2 className="text-2xl text-amber-200 mb-4 pixelated">
                  🎯 Challenges ({completedChallengesCount}/{totalChallenges})
                </h2>
                
                <div className="challenges-list space-y-6">
                  {currentLocation.challenges.map((challenge, index) => (
                    <div key={index} className="challenge-item">
                      <div className={`game-box bg-green-900/50 border ${gameState.completedChallenges.includes(index) ? 'border-yellow-400' : 'border-yellow-700'} p-4 rounded-lg`}>
                        <div className="flex justify-between items-start mb-2">
                          <span className={`text-sm px-2 py-1 rounded-md ${challenge.type === 'question' ? 'bg-green-800 text-amber-200' : 'bg-yellow-800 text-amber-200'}`}>
                            {challenge.type === 'question' ? 'QUESTION' : 'TASK'}
                          </span>
                          {gameState.completedChallenges.includes(index) && (
                            <span className="text-yellow-400 text-sm">✓ COMPLETED</span>
                          )}
                        </div>
                        
                        <p className="mb-4">{challenge.prompt}</p>
                        
                        {!gameState.completedChallenges.includes(index) && (
                          <>
                            <div className="flex space-x-2 mb-2">
                              <RPGInput
                                value={input}
                                onChange={handleInputChange}
                                placeholder="Your answer..."
                              />
                              <RPGButton
                                onClick={() => checkChallengeAnswer(index)}
                                primary={true}
                              >
                                SUBMIT
                              </RPGButton>
                            </div>
                            <button
                              onClick={() => setMessage({ text: challenge.hint, type: "hint" })}
                              className="text-amber-400 text-sm underline hover:text-amber-300"
                            >
                              Need a hint?
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Riddle (only shown when all challenges are completed) */}
            {gameState.locationUnlocked && gameState.completedChallenges.length === totalChallenges && !gameState.gameCompleted && currentLocation.id !== "hotel" && (
              <div id="riddle-section" className="game-section bg-yellow-900/70 border-2 border-yellow-800 p-6 rounded-lg mb-8 animate-fadeIn">
                <h2 className="text-2xl text-amber-200 mb-4 pixelated">🧩 Final Riddle</h2>
                <div className="game-box bg-green-900/50 border border-yellow-700 p-4 mb-4 rounded-lg">
                  <p className="mb-4">{currentLocation.finalRiddle.prompt}</p>
                  
                  {!gameState.riddleSolved && (
                    <>
                      <RPGLetterBank 
                        letters={currentLocation.finalRiddle.letterBank} 
                        onLetterClick={(letter) => setInput(input + letter)}
                        className="mb-4"
                      />
                      
                      <div className="flex space-x-2 mb-2">
                        <RPGInput
                          value={input}
                          onChange={handleInputChange}
                          placeholder="Solve the riddle..."
                        />
                        <RPGButton
                          onClick={checkRiddleAnswer}
                          primary={true}
                        >
                          SOLVE
                        </RPGButton>
                      </div>
                      <button
                        onClick={() => setMessage({ text: currentLocation.finalRiddle.hint, type: "hint" })}
                        className="text-amber-400 text-sm underline hover:text-amber-300"
                      >
                        Need a hint?
                      </button>
                    </>
                  )}
                  
                  {gameState.riddleSolved && (
                    <div className="bg-green-800/50 border border-yellow-600 p-3 rounded-lg">
                      <p className="text-yellow-400 font-bold mb-2">✓ Riddle solved!</p>
                      <p className="text-sm">The answer was: <span className="text-amber-200 font-bold">{currentLocation.finalRiddle.answer.toUpperCase()}</span></p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Next Location Reveal */}
            {gameState.nextLocationRevealed && !gameState.gameCompleted && (
              <div id="next-location-section" className="game-section bg-yellow-900/70 border-2 border-yellow-800 p-6 rounded-lg mb-8 animate-fadeIn">
                <h2 className="text-2xl text-amber-200 mb-4 pixelated">📍 Next Destination</h2>
                <div className="game-box bg-green-900/50 border border-yellow-700 p-4 mb-6 rounded-lg">
                  <div className="bg-yellow-950/50 p-4 mb-4 rounded-lg border border-yellow-800/50">
                    <p className="text-lg mb-2">Go to:</p>
                    <p className="text-amber-300 font-bold">{currentLocation.nextLocation}</p>
                  </div>
                  <RPGButton 
                    onClick={proceedToNextLocation}
                    className="w-full py-3 px-6"
                    primary={true}
                  >
                    I'VE ARRIVED AT THE NEXT LOCATION
                  </RPGButton>
                </div>
              </div>
            )}
            
            {/* Final Location */}
            {currentLocation.id === "hotel" && gameState.locationUnlocked && !gameState.gameCompleted && (
              <div id="final-challenge" className="game-section bg-yellow-900/70 border-2 border-yellow-800 p-6 rounded-lg mb-8 animate-fadeIn">
                <h2 className="text-2xl text-amber-200 mb-4 pixelated">💍 Final Challenge</h2>
                <div className="game-box bg-green-900/50 border border-yellow-700 p-4 mb-6 rounded-lg">
                  <p className="mb-4">{currentLocation.challenges[0].prompt}</p>
                  
                  <div className="flex space-x-2 mb-2">
                    <RPGInput
                      value={input}
                      onChange={handleInputChange}
                      placeholder="Your answer..."
                    />
                    <RPGButton
                      onClick={handleFinalChallenge}
                      primary={true}
                    >
                      SUBMIT
                    </RPGButton>
                  </div>
                  <button
                    onClick={() => setMessage({ text: currentLocation.challenges[0].hint, type: "hint" })}
                    className="text-amber-400 text-sm underline hover:text-amber-300"
                  >
                    Need a hint?
                  </button>
                </div>
              </div>
            )}
            
            {/* Final Message */}
            {gameState.gameCompleted && (
              <div id="final-message" className="game-section bg-green-800 border-2 border-yellow-700 p-6 rounded-lg mb-8 animate-heartBeat">
                <h2 className="text-2xl text-amber-200 mb-4 pixelated">💖 A Message For You</h2>
                <div className="game-box bg-yellow-900/50 border border-yellow-600 p-6 mb-6 rounded-lg">
                  <p className="text-lg leading-relaxed mb-6">{currentLocation.finalMessage}</p>
                  <div className="flex justify-center items-center gap-2 my-4">
                    <div className="text-amber-300 inline-block px-2">❤️</div>
                    <div className="text-amber-300 inline-block px-2">💍</div>
                    <div className="text-amber-300 inline-block px-2">❤️</div>
                  </div>
                  <p className="text-center text-amber-300 font-bold">The real adventure awaits...</p>
                </div>
              </div>
            )}
          </>
        )}
        
        {/* Message display */}
        {message.text && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 max-w-md">
            <RPGNotification
              message={message.text}
              type={message.type}
            />
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="bg-yellow-900 p-4 border-t border-green-800 text-center text-amber-300/70 text-xs">
        <p>A special treasure hunt created with ❤️</p>
      </footer>
      
      {/* Global styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes heartBeat {
          0% { transform: scale(1); }
          14% { transform: scale(1.1); }
          28% { transform: scale(1); }
          42% { transform: scale(1.1); }
          70% { transform: scale(1); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        .animate-heartBeat {
          animation: heartBeat 1.5s ease-in-out infinite;
        }
        
        .pixelated {
          letter-spacing: 1px;
          text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
          image-rendering: pixelated;
        }
        
        .game-section {
          animation-fill-mode: both;
          animation-delay: calc(var(--index, 0) * 0.2s);
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        }
        
        .map-tile {
          font-size: 20px;
          transition: all 0.3s ease;
          image-rendering: pixelated;
        }
        
        /* RPG tile styles */
        body {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23254c29' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
};

export default TreasureHunt;