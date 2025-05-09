import React, { useState, useEffect } from 'react';

// Sample map data to visualize
const sampleMapData = [
  ['tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree'],
  ['tree', 'grass', 'grass', 'tree', 'cafe', 'grass', 'grass', 'tree', 'unknown', 'tree'],
  ['tree', 'grass', 'tree', 'grass', 'path', 'grass', 'tree', 'unknown', 'unknown', 'tree'],
  ['tree', 'grass', 'grass', 'grass', 'path', 'path', 'path', 'path', 'unknown', 'tree'],
  ['tree', 'grass', 'tree', 'grass', 'path', 'grass', 'tree', 'unknown', 'unknown', 'tree'],
  ['tree', 'house', 'path', 'path', 'path', 'restaurant', 'grass', 'grass', 'hotel', 'tree'],
  ['tree', 'grass', 'tree', 'grass', 'path', 'grass', 'tree', 'unknown', 'unknown', 'tree'],
  ['tree', 'grass', 'grass', 'grass', 'path', 'path', 'path', 'salon', 'unknown', 'tree'],
  ['tree', 'grass', 'grass', 'grass', 'tree', 'grass', 'grass', 'unknown', 'unknown', 'tree'],
  ['tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree']
];

// Define the map tile types with emoji representations
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

// Location names and positions on the map
const locationData = [
  { x: 1, y: 5, type: "house", name: "Baby's Apartment" },
  { x: 4, y: 1, type: "cafe", name: "Café Fixe" },
  { x: 5, y: 5, type: "restaurant", name: "Bar Vlaha" },
  { x: 7, y: 7, type: "salon", name: "The Nail Studio" },
  { x: 8, y: 5, type: "hotel", name: "The Hotel" }
];

const RPGMapExample = () => {
  const [currentLocation, setCurrentLocation] = useState(0);
  const [revealedMap, setRevealedMap] = useState(sampleMapData);
  const [animatingTiles, setAnimatingTiles] = useState(new Set());
  
  // Simulate revealing more of the map when location changes
  useEffect(() => {
    // Reset animation state
    setAnimatingTiles(new Set());
    
    // Add animation to tiles around the current location
    const pos = locationData[currentLocation];
    const newAnimating = new Set();
    
    for (let y = Math.max(0, pos.y - 2); y <= Math.min(9, pos.y + 2); y++) {
      for (let x = Math.max(0, pos.x - 2); x <= Math.min(9, pos.x + 2); x++) {
        if (revealedMap[y][x] !== 'tree') {
          setTimeout(() => {
            newAnimating.add(`${x}-${y}`);
            setAnimatingTiles(prev => new Set([...prev, `${x}-${y}`]));
          }, Math.random() * 800);
        }
      }
    }
  }, [currentLocation]);
  
  // Render map tile
  const renderMapTile = (tileType, x, y) => {
    const tileEmoji = mapTiles[tileType] || mapTiles.unknown;
    
    // Check if this tile is a location point
    const isCurrentLocation = locationData.some((pos, index) => 
      pos.x === x && pos.y === y && index === currentLocation
    );
    
    // Check if this tile should be animated
    const isAnimating = animatingTiles.has(`${x}-${y}`);
    
    return (
      <div 
        key={`${x}-${y}`} 
        className={`
          map-tile w-8 h-8 flex items-center justify-center text-lg
          ${isCurrentLocation ? 'animate-pulse border-2 border-yellow-400' : ''}
          ${isAnimating ? 'animate-tileReveal' : ''}
        `}
      >
        {tileEmoji}
      </div>
    );
  };

  return (
    <div className="p-4 bg-green-900 min-h-screen text-amber-100">
      <h1 className="text-xl text-center text-amber-200 font-bold mb-4">Bubba's Big Day - Journey Map</h1>
      
      {/* Current location info */}
      <div className="mb-4 text-center">
        <div className="inline-block bg-yellow-900/70 px-4 py-2 rounded-lg border-2 border-yellow-800">
          <span className="mr-2">Current Location:</span>
          <span className="font-bold text-amber-300">
            {locationData[currentLocation].name}
          </span>
        </div>
      </div>
      
      {/* Game map */}
      <div className="game-map bg-green-900/50 p-4 rounded-lg border-4 border-yellow-900 mb-6">
        <div className="grid grid-cols-10 gap-0">
          {revealedMap.map((row, y) => 
            row.map((tile, x) => renderMapTile(tile, x, y))
          )}
        </div>
      </div>
      
      {/* Location controls */}
      <div className="flex justify-center space-x-2 mb-4">
        <button 
          onClick={() => setCurrentLocation(Math.max(0, currentLocation - 1))}
          disabled={currentLocation === 0}
          className="bg-green-800 px-4 py-2 rounded-lg border-2 border-green-700 disabled:opacity-50"
        >
          Previous Location
        </button>
        <button 
          onClick={() => setCurrentLocation(Math.min(4, currentLocation + 1))}
          disabled={currentLocation === 4}
          className="bg-green-800 px-4 py-2 rounded-lg border-2 border-green-700 disabled:opacity-50"
        >
          Next Location
        </button>
      </div>
      
      {/* Legend */}
      <div className="flex justify-center flex-wrap gap-4 text-sm">
        <div className="flex items-center">
          <span className="inline-block mr-1">🏠</span>
          <span>Baby's Apartment</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block mr-1">☕</span>
          <span>Café Fixe</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block mr-1">🍽️</span>
          <span>Bar Vlaha</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block mr-1">💅</span>
          <span>The Nail Studio</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block mr-1">🏨</span>
          <span>The Hotel</span>
        </div>
      </div>
      
      {/* Description */}
      <div className="mt-6 bg-yellow-900/70 p-4 rounded-lg border-2 border-yellow-800 max-w-lg mx-auto">
        <h2 className="text-amber-200 font-bold mb-2">How It Works</h2>
        <p className="mb-2">This map expands as your girlfriend progresses through the treasure hunt. Each location unlocks new parts of the map, creating a visual journey from the apartment to the final proposal at the hotel.</p>
        <p>The highlighted location shows where she currently is on her quest to find you.</p>
      </div>
      
      {/* Animation styles */}
      <style jsx>{`
        @keyframes tileReveal {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.2); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        .animate-tileReveal {
          animation: tileReveal 0.5s ease-out forwards;
        }
        
        .map-tile {
          font-size: 20px;
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default RPGMapExample;