import React from 'react';
import { Exercise } from '../types/workout';

interface ExerciseAnimationProps {
  exercise: Exercise;
  isActive: boolean;
}

const ExerciseAnimation: React.FC<ExerciseAnimationProps> = ({ exercise, isActive }) => {
  const getAnimationClass = (exerciseId: string) => {
    const baseClass = "w-32 h-32 mx-auto mb-4 rounded-full flex items-center justify-center text-4xl transition-all duration-500";
    
    switch (exerciseId) {
      case 'jumping-jacks':
        return `${baseClass} bg-gradient-to-br from-blue-400 to-blue-600 ${isActive ? 'animate-bounce' : ''}`;
      case 'push-ups':
        return `${baseClass} bg-gradient-to-br from-red-400 to-red-600 ${isActive ? 'animate-pulse' : ''}`;
      case 'squats':
        return `${baseClass} bg-gradient-to-br from-green-400 to-green-600 ${isActive ? 'animate-bounce' : ''}`;
      case 'mountain-climbers':
        return `${baseClass} bg-gradient-to-br from-yellow-400 to-yellow-600 ${isActive ? 'animate-ping' : ''}`;
      case 'plank':
        return `${baseClass} bg-gradient-to-br from-purple-400 to-purple-600 ${isActive ? 'animate-pulse' : ''}`;
      case 'burpees':
        return `${baseClass} bg-gradient-to-br from-orange-400 to-orange-600 ${isActive ? 'animate-bounce' : ''}`;
      case 'pike-push-ups':
        return `${baseClass} bg-gradient-to-br from-pink-400 to-pink-600 ${isActive ? 'animate-pulse' : ''}`;
      case 'jump-squats':
        return `${baseClass} bg-gradient-to-br from-indigo-400 to-indigo-600 ${isActive ? 'animate-bounce' : ''}`;
      case 'russian-twists':
        return `${baseClass} bg-gradient-to-br from-teal-400 to-teal-600 ${isActive ? 'animate-spin' : ''}`;
      default:
        return `${baseClass} bg-gradient-to-br from-gray-400 to-gray-600`;
    }
  };

  const getExerciseEmoji = (exerciseId: string) => {
    switch (exerciseId) {
      case 'jumping-jacks': return '🤸';
      case 'push-ups': return '💪';
      case 'squats': return '🏋️';
      case 'mountain-climbers': return '🏃';
      case 'plank': return '🧘';
      case 'burpees': return '🔥';
      case 'pike-push-ups': return '🤸';
      case 'jump-squats': return '⚡';
      case 'russian-twists': return '🌪️';
      default: return '💪';
    }
  };

  return (
    <div className="text-center">
      <div className={getAnimationClass(exercise.id)}>
        <span className="filter drop-shadow-lg">
          {getExerciseEmoji(exercise.id)}
        </span>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{exercise.name}</h2>
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {exercise.targetMuscles.map((muscle, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
          >
            {muscle}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ExerciseAnimation;
