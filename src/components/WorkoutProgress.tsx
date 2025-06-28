import React from 'react';
import { Exercise } from '../types/workout';

interface WorkoutProgressProps {
  exercises: Exercise[];
  currentExerciseIndex: number;
  workoutProgress: number;
}

const WorkoutProgress: React.FC<WorkoutProgressProps> = ({
  exercises,
  currentExerciseIndex,
  workoutProgress
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Workout Progress</h3>
        <span className="text-sm text-gray-600">
          {currentExerciseIndex + 1} of {exercises.length}
        </span>
      </div>
      
      {/* Overall Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Overall Progress</span>
          <span>{Math.round(workoutProgress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${workoutProgress}%` }}
          />
        </div>
      </div>

      {/* Exercise List */}
      <div className="space-y-2">
        {exercises.map((exercise, index) => (
          <div
            key={exercise.id}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              index === currentExerciseIndex
                ? 'bg-blue-50 border-2 border-blue-200'
                : index < currentExerciseIndex
                ? 'bg-green-50 border border-green-200'
                : 'bg-gray-50 border border-gray-200'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                index === currentExerciseIndex
                  ? 'bg-blue-500 text-white'
                  : index < currentExerciseIndex
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-300 text-gray-600'
              }`}
            >
              {index < currentExerciseIndex ? '✓' : index + 1}
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-800">{exercise.name}</div>
              <div className="text-sm text-gray-600">
                {exercise.duration}s work, {exercise.restDuration}s rest
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutProgress;
