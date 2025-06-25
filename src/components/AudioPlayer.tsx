
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import TimeDisplay from './TimeDisplay';
import ProgressBar from './ProgressBar';

interface AudioPlayerProps {
  title: string;
  author: string;
  coverUrl?: string;
  audioUrl?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ title, author, coverUrl, audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState([75]);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, [audioUrl]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newTime = (value[0] / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    setVolume(value);
    audio.volume = value[0] / 100;
  };

  const skipForward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.currentTime = Math.min(audio.currentTime + 30, duration);
  };

  const skipBackward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.currentTime = Math.max(audio.currentTime - 15, 0);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      {/* Book Cover & Info */}
      <div className="text-center mb-6">
        <div className="w-48 h-48 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
          {coverUrl ? (
            <img src={coverUrl} alt={title} className="w-full h-full object-cover rounded-lg" />
          ) : (
            <div className="text-4xl font-bold text-blue-600">{title.charAt(0)}</div>
          )}
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-1">{title}</h2>
        <p className="text-gray-600">{author}</p>
      </div>

      {/* Progress Bar */}
      <ProgressBar 
        currentTime={currentTime}
        duration={duration}
        onSeek={handleSeek}
      />

      {/* Time Display */}
      <TimeDisplay currentTime={currentTime} duration={duration} />

      {/* Control Buttons */}
      <div className="flex items-center justify-center space-x-4 mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={skipBackward}
          className="hover:bg-blue-50"
        >
          <SkipBack className="w-5 h-5" />
        </Button>
        
        <Button
          onClick={togglePlayPause}
          className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-1" />
          )}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={skipForward}
          className="hover:bg-blue-50"
        >
          <SkipForward className="w-5 h-5" />
        </Button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center space-x-2">
        <Volume2 className="w-4 h-4 text-gray-600" />
        <Slider
          value={volume}
          onValueChange={handleVolumeChange}
          max={100}
          step={1}
          className="flex-1"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
