
import React, { useState } from 'react';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (value: number[]) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentTime, duration, onSeek }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [hoverPosition, setHoverPosition] = useState<number | null>(null);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const position = ((e.clientX - rect.left) / rect.width) * 100;
    setHoverPosition(Math.max(0, Math.min(100, position)));
  };

  const handleMouseLeave = () => {
    setHoverPosition(null);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const position = ((e.clientX - rect.left) / rect.width) * 100;
    onSeek([Math.max(0, Math.min(100, position))]);
  };

  return (
    <div className="mb-2">
      <div
        className="relative h-2 bg-gray-200 rounded-full cursor-pointer group"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {/* Background track */}
        <div className="absolute inset-0 bg-gray-200 rounded-full" />
        
        {/* Progress fill */}
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
        
        {/* Hover preview */}
        {hoverPosition !== null && (
          <div
            className="absolute top-0 left-0 h-full bg-blue-300 rounded-full opacity-50"
            style={{ width: `${hoverPosition}%` }}
          />
        )}
        
        {/* Progress handle */}
        <div
          className="absolute top-1/2 w-4 h-4 bg-white border-2 border-blue-600 rounded-full shadow-md transform -translate-y-1/2 transition-all duration-150 opacity-0 group-hover:opacity-100"
          style={{ left: `calc(${progress}% - 8px)` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
