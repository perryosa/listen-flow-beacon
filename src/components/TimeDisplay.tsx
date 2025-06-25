
import React from 'react';

interface TimeDisplayProps {
  currentTime: number;
  duration: number;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ currentTime, duration }) => {
  const formatTime = (time: number): string => {
    if (isNaN(time)) return '0:00';
    
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  };

  return (
    <div className="flex justify-between text-sm text-gray-500 mb-4">
      <span className="font-mono">{formatTime(currentTime)}</span>
      <span className="font-mono">{formatTime(duration)}</span>
    </div>
  );
};

export default TimeDisplay;
