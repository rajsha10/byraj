import React from 'react';

const GlowLight = ({ 
  glowColor = "#00bcd4" 
}) => {
  return (
    <div className="flex justify-center items-center my-4">
      <div className="relative w-full max-w-4xl">
        {/* Main tube */}
        <div 
          className="h-0.5 relative mx-auto"
          style={{ 
            width: "40%",
            background: `linear-gradient(to right, transparent 0%, ${glowColor}40 20%, ${glowColor} 50%, ${glowColor}40 80%, transparent 100%)`,
            boxShadow: `0 0 8px ${glowColor}60, 0 0 16px ${glowColor}30`
          }}
        />
        
        {/* Subtle outer glow */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 rounded-full opacity-20"
          style={{ 
            width: "70%",
            background: `linear-gradient(to right, transparent 0%, ${glowColor} 20%, ${glowColor} 50%, ${glowColor} 80%, transparent 100%)`,
            filter: "blur(8px)"
          }}
        />
      </div>
    </div>
  );
};

export default GlowLight;