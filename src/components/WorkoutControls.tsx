import React from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import { TimerState } from '../hooks/useWorkoutTimer';

interface WorkoutControlsProps {
  timerState: TimerState;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
  onSkip: () => void;
}

const WorkoutControls: React.FC<WorkoutControlsProps> = ({
  timerState,
  onStart,
  onPause,
  onResume,
  onReset,
  onSkip
}) => {
  const getMainButtonContent = () => {
    switch (timerState) {
      case 'idle':
        return (
          <button
            onClick={onStart}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center space-x-2 transition-colors shadow-lg"
          >
            <Play size={24} />
            <span>Start Workout</span>
          </button>
        );
      case 'work':
      case 'rest':
        return (
          <button
            onClick={onPause}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center space-x-2 transition-colors shadow-lg"
          >
            <Pause size={24} />
            <span>Pause</span>
          </button>
        );
      case 'paused':
        return (
          <button
            onClick={onResume}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center space-x-2 transition-colors shadow-lg"
          >
            <Play size={24} />
            <span>Resume</span>
          </button>
        );
      case 'completed':
        return (
          <button
            onClick={onReset}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center space-x-2 transition-colors shadow-lg"
          >
            <RotateCcw size={24} />
            <span>Start Again</span>
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {getMainButtonContent()}
      
      {(timerState === 'work' || timerState === 'rest' || timerState === 'paused') && (
        <div className="flex space-x-4">
          <button
            onClick={onReset}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
          >
            <RotateCcw size={18} />
            <span>Reset</span>
          </button>
          <button
            onClick={onSkip}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
          >
            <SkipForward size={18} />
            <span>Skip</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkoutControls;
