import React from 'react';
import { TimerState } from '../hooks/useWorkoutTimer';

interface TimerDisplayProps {
  timeRemaining: number;
  timerState: TimerState;
  isWorkPhase: boolean;
  progress: number;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({
  timeRemaining,
  timerState,
  isWorkPhase,
  progress
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timerState === 'paused') return 'text-yellow-600';
    if (isWorkPhase) return 'text-red-600';
    return 'text-green-600';
  };

  const getPhaseText = () => {
    if (timerState === 'paused') return 'PAUSED';
    if (timerState === 'completed') return 'COMPLETED';
    return isWorkPhase ? 'WORK' : 'REST';
  };

  const getProgressColor = () => {
    if (isWorkPhase) return 'bg-red-500';
    return 'bg-green-500';
  };

  return (
    <div className="text-center mb-8">
      <div className="relative w-48 h-48 mx-auto mb-6">
        {/* Progress Circle */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-gray-200"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
            className={isWorkPhase ? 'text-red-500' : 'text-green-500'}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
          />
        </svg>
        
        {/* Timer Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`text-4xl font-bold ${getTimerColor()}`}>
            {formatTime(timeRemaining)}
          </div>
          <div className={`text-sm font-semibold mt-1 ${getTimerColor()}`}>
            {getPhaseText()}
          </div>
        </div>
      </div>

      {/* Phase Indicator */}
      <div className="flex justify-center space-x-4">
        <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
          isWorkPhase && timerState !== 'paused' 
            ? 'bg-red-100 text-red-800 border-2 border-red-300' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          Work Phase
        </div>
        <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
          !isWorkPhase && timerState !== 'paused'
            ? 'bg-green-100 text-green-800 border-2 border-green-300'
            : 'bg-gray-100 text-gray-600'
        }`}>
          Rest Phase
        </div>
      </div>
    </div>
  );
};

export default TimerDisplay;
