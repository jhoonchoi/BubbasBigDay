import React, { useState, useEffect } from 'react';

/**
 * RPG Map Component - Renders a classic top-down RPG style map
 * 
 * @param {Object} props
 * @param {Array} props.mapData - 2D array of map tiles
 * @param {Number} props.currentLocationIndex - Current player location index
 * @param {Array} props.locationPositions - Array of location positions on the map
 * @param {Boolean} props.animate - Whether to animate tile reveals
 */
const RPGMap = ({ 
  mapData = [], 
  currentLocationIndex = 0,
  locationPositions = [],
  animate = true
}) => {
  const [animatingTiles, setAnimatingTiles] = useState(new Set());
  
  // Map tile types for the expanding map
  const tileTypes = {
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
  
  // Handle animation of newly revealed tiles
  useEffect(() => {
    if (!animate || !mapData.length) return;
    
    const newlyRevealed = new Set();
    const timer = setTimeout(() => {
      mapData.forEach((row, y) => {
        row.forEach((tile, x) => {
          if (tile !== 'unknown' && tile !== 'tree') {
            // Add some randomness to the animation timing
            setTimeout(() => {
              newlyRevealed.add(`${x}-${y}`);
              setAnimatingTiles(new Set([...newlyRevealed]));
            }, Math.random() * 800);
          }
        });
      });
    }, 300);
    
    return () => clearTimeout(timer);
  }, [mapData, animate]);
  
  // Render individual map tile
  const renderMapTile = (tileType, x, y) => {
    // Get the emoji or character based on tile type
    const tileEmoji = tileTypes[tileType] || tileTypes.unknown;
    
    // Check if this tile is a location point
    const isCurrentLocation = locationPositions.some((pos, index) => 
      pos.x === x && pos.y === y && index === currentLocationIndex
    );
    
    // Check if this tile should be animated
    const isAnimating = animatingTiles.has(`${x}-${y}`);
    
    // CSS classes for different tile types
    const tileClassName = `tile-${tileType}`;
    
    return (
      <div 
        key={`${x}-${y}`} 
        className={`
          map-tile w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-sm sm:text-base
          ${isCurrentLocation ? 'animate-pulse border-2 border-yellow-400' : ''}
          ${isAnimating ? 'tile-reveal' : ''}
          ${tileType !== 'unknown' ? tileClassName : ''}
        `}
        title={`${x},${y}: ${tileType}`}
      >
        {tileEmoji}
      </div>
    );
  };
  
  // If no map data, render loading state or placeholder
  if (!mapData.length) {
    return (
      <div className="text-center py-8 bg-green-900/30 rounded-lg border-2 border-yellow-800">
        <p>Loading map...</p>
      </div>
    );
  }
  
  return (
    <div className="game-map bg-green-900/50 p-4 rounded-lg border-4 border-yellow-900">
      <div className="grid grid-cols-10 gap-0">
        {mapData.map((row, y) => 
          row.map((tile, x) => renderMapTile(tile, x, y))
        )}
      </div>
      
      {/* Legend */}
      <div className="mt-2 flex flex-wrap justify-center gap-1 text-xs leading-tight">
        <div className="flex items-center mr-1">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-800 mr-1"></div>
          <span>Grass</span>
        </div>
        <div className="flex items-center mr-1">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-800 mr-1"></div>
          <span>Path</span>
        </div>
        <div className="flex items-center mr-1">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-950 mr-1"></div>
          <span>Tree</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 sm:w-3 sm:h-3 border border-dashed border-yellow-500 mr-1"></div>
          <span>Current</span>
        </div>
      </div>
      
      {/* Animation styles */}
      <style jsx>{`
        @keyframes tileReveal {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.2); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        .tile-reveal {
          animation: tileReveal 0.5s ease-out forwards;
        }
        
        .grid-cols-10 {
          display: grid;
          grid-template-columns: repeat(10, minmax(0, 1fr));
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .5;
          }
        }
      `}</style>
    </div>
  );
};

export default RPGMap;