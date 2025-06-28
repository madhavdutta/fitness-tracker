export interface Exercise {
  id: string;
  name: string;
  duration: number; // in seconds
  restDuration: number; // in seconds
  instructions: string[];
  targetMuscles: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  exercises: Exercise[];
  totalDuration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface WorkoutSession {
  id: string;
  workoutId: string;
  date: string;
  completed: boolean;
  duration: number;
  exercisesCompleted: number;
  totalExercises: number;
}

export interface WorkoutProgress {
  totalWorkouts: number;
  totalMinutes: number;
  currentStreak: number;
  longestStreak: number;
  sessions: WorkoutSession[];
}
