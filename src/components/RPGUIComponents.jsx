import React from 'react';

/**
 * RPG Dialog Box - Creates a classic RPG-style dialog box with ornate borders
 */
export const RPGDialogBox = ({ children, title, className = '' }) => {
  return (
    <div className={`rpg-dialog-box bg-green-900/50 border-2 border-yellow-700 rounded-lg p-4 ${className}`}>
      {title && (
        <div className="mb-2 flex items-center">
          <div className="corner-decoration"></div>
          <h3 className="text-amber-200 text-lg pixelated">{title}</h3>
          <div className="corner-decoration"></div>
        </div>
      )}
      <div className="rpg-dialog-content">
        {children}
      </div>
      
      <style jsx>{`
        .rpg-dialog-box {
          position: relative;
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
        }
        
        .rpg-dialog-box::before,
        .rpg-dialog-box::after {
          content: '';
          position: absolute;
          width: 12px;
          height: 12px;
          border: 2px solid #a87d18;
        }
        
        .rpg-dialog-box::before {
          top: -2px;
          left: -2px;
          border-right: none;
          border-bottom: none;
        }
        
        .rpg-dialog-box::after {
          bottom: -2px;
          right: -2px;
          border-left: none;
          border-top: none;
        }
        
        .corner-decoration {
          flex: 1;
          height: 2px;
          background: repeating-linear-gradient(
            to right,
            #a87d18 0px,
            #a87d18 3px,
            transparent 3px,
            transparent 6px
          );
          margin: 0 8px;
        }
      `}</style>
    </div>
  );
};

/**
 * RPG Button - Stylized button with classic RPG game look
 */
export const RPGButton = ({ 
  children, 
  onClick, 
  className = '', 
  disabled = false,
  primary = true 
}) => {
  // Color schemes
  const colorScheme = primary 
    ? 'bg-green-800 hover:bg-green-700 text-amber-200 border-green-700' 
    : 'bg-yellow-800 hover:bg-yellow-700 text-amber-100 border-yellow-700';
    
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        rpg-button ${colorScheme} py-2 px-4 rounded 
        transition-all duration-300 hover:scale-105 border-2
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {children}
      
      <style jsx>{`
        .rpg-button {
          position: relative;
          box-shadow: 0 4px 0 ${primary ? '#2a5d34' : '#8b6914'};
          transform: translateY(-2px);
          transition: all 0.1s ease;
        }
        
        .rpg-button:active {
          transform: translateY(2px);
          box-shadow: 0 0 0 ${primary ? '#2a5d34' : '#8b6914'};
        }
        
        .rpg-button::before {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          right: 2px;
          height: 1px;
          background: rgba(255,255,255,0.3);
        }
        
        .hover\\:scale-105:hover {
          transform: scale(1.05);
        }
        
        .transition-all {
          transition-property: all;
        }
        
        .duration-300 {
          transition-duration: 300ms;
        }
      `}</style>
    </button>
  );
};

/**
 * RPG Input - Stylized input field with RPG theme
 */
export const RPGInput = ({ 
  value, 
  onChange, 
  placeholder, 
  className = '' 
}) => {
  return (
    <div className="rpg-input-container w-full">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          flex-1 bg-yellow-950 border-2 border-yellow-700 
          rounded p-2 text-amber-100 w-full
          ${className}
        `}
      />
      
      <style jsx>{`
        .rpg-input-container {
          position: relative;
        }
        
        input {
          outline: none;
          transition: all 0.2s ease;
          background-color: rgba(41, 20, 5, 0.9) !important; /* Much darker background */
        }
        
        input::placeholder {
          color: rgba(254, 243, 199, 0.5); /* Semi-transparent placeholder */
        }
        
        input:focus {
          border-color: #a87d18 !important;
          box-shadow: 0 0 0 2px rgba(168, 125, 24, 0.3);
        }
      `}</style>
    </div>
  );
};

/**
 * RPG Letter Bank - Stylized letter tiles for riddles
 */
export const RPGLetterBank = ({ 
  letters, 
  onLetterClick,
  className = '' 
}) => {
  return (
    <div className={`letter-bank flex flex-wrap justify-center gap-1 ${className}`}>
      {letters.split('').map((letter, i) => (
        <div 
          key={i} 
          className="inline-block bg-green-800 text-amber-100 w-8 h-8 
                    flex items-center justify-center rounded-md border border-yellow-700 
                    hover:bg-green-700 cursor-pointer transition-all duration-200"
          onClick={() => onLetterClick && onLetterClick(letter)}
        >
          {letter}
        </div>
      ))}
      
      <style jsx>{`
        .letter-bank div {
          transition: all 0.2s ease;
        }
        
        .letter-bank div:hover {
          transform: translateY(-2px);
          background-color: #166534;
        }
      `}</style>
    </div>
  );
};

/**
 * RPG Notification - Toast-style message with RPG theme
 */
export const RPGNotification = ({ 
  message, 
  type = 'info',
  onClose,
  className = '' 
}) => {
  const typeStyles = {
    success: 'bg-green-800 border-yellow-600',
    error: 'bg-yellow-800 border-red-700',
    hint: 'bg-yellow-900 border-yellow-700',
    info: 'bg-green-900 border-yellow-700'
  };
  
  return (
    <div className={`
      rpg-notification ${typeStyles[type]} px-6 py-3 rounded-lg
      text-sm md:text-base max-w-md
      ${className}
    `}>
      {message}
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center text-amber-300/70 hover:text-amber-200"
        >
          ×
        </button>
      )}
      
      <style jsx>{`
        .rpg-notification {
          position: relative;
          border-width: 2px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5);
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .rpg-notification::before,
        .rpg-notification::after {
          content: '';
          position: absolute;
          width: 8px;
          height: 8px;
          border: 2px solid currentColor;
          opacity: 0.7;
        }
        
        .rpg-notification::before {
          top: -4px;
          left: -4px;
          border-right: none;
          border-bottom: none;
        }
        
        .rpg-notification::after {
          bottom: -4px;
          right: -4px;
          border-left: none;
          border-top: none;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};