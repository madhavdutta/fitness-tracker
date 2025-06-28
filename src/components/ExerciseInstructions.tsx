import React from 'react';
import { Exercise } from '../types/workout';
import { CheckCircle } from 'lucide-react';

interface ExerciseInstructionsProps {
  exercise: Exercise;
}

const ExerciseInstructions: React.FC<ExerciseInstructionsProps> = ({ exercise }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Exercise Instructions</h3>
      <ul className="space-y-3">
        {exercise.instructions.map((instruction, index) => (
          <li key={index} className="flex items-start space-x-3">
            <CheckCircle size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">{instruction}</span>
          </li>
        ))}
      </ul>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Work Duration: <strong>{exercise.duration}s</strong></span>
          <span>Rest Duration: <strong>{exercise.restDuration}s</strong></span>
        </div>
      </div>
    </div>
  );
};

export default ExerciseInstructions;
