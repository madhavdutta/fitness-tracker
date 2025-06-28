import React from 'react';
import { Workout } from '../types/workout';
import { Clock, Zap, Target } from 'lucide-react';

interface WorkoutSelectorProps {
  workouts: Workout[];
  selectedWorkout: Workout | null;
  onSelectWorkout: (workout: Workout) => void;
}

const WorkoutSelector: React.FC<WorkoutSelectorProps> = ({
  workouts,
  selectedWorkout,
  onSelectWorkout
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose Your Workout</h2>
      
      {workouts.map((workout) => (
        <div
          key={workout.id}
          onClick={() => onSelectWorkout(workout)}
          className={`p-6 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg ${
            selectedWorkout?.id === workout.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-semibold text-gray-800">{workout.name}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(workout.difficulty)}`}>
              {workout.difficulty}
            </span>
          </div>
          
          <p className="text-gray-600 mb-4">{workout.description}</p>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock size={16} />
              <span>{formatDuration(workout.totalDuration)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Target size={16} />
              <span>{workout.exercises.length} exercises</span>
            </div>
            <div className="flex items-center space-x-1">
              <Zap size={16} />
              <span>High intensity</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkoutSelector;
