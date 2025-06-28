import { Workout } from '../types/workout';

export const workouts: Workout[] = [
  {
    id: 'hiit-beginner',
    name: 'HIIT for Beginners',
    description: 'High-intensity interval training perfect for beginners',
    difficulty: 'beginner',
    totalDuration: 900, // 15 minutes
    exercises: [
      {
        id: 'jumping-jacks',
        name: 'Jumping Jacks',
        duration: 30,
        restDuration: 15,
        instructions: [
          'Stand with feet together, arms at sides',
          'Jump while spreading legs shoulder-width apart',
          'Simultaneously raise arms overhead',
          'Jump back to starting position'
        ],
        targetMuscles: ['Full Body', 'Cardio'],
        difficulty: 'beginner'
      },
      {
        id: 'push-ups',
        name: 'Push-ups',
        duration: 30,
        restDuration: 15,
        instructions: [
          'Start in plank position',
          'Lower body until chest nearly touches floor',
          'Push back up to starting position',
          'Keep core engaged throughout'
        ],
        targetMuscles: ['Chest', 'Arms', 'Core'],
        difficulty: 'beginner'
      },
      {
        id: 'squats',
        name: 'Bodyweight Squats',
        duration: 30,
        restDuration: 15,
        instructions: [
          'Stand with feet shoulder-width apart',
          'Lower body as if sitting in a chair',
          'Keep chest up and knees behind toes',
          'Return to standing position'
        ],
        targetMuscles: ['Legs', 'Glutes'],
        difficulty: 'beginner'
      },
      {
        id: 'mountain-climbers',
        name: 'Mountain Climbers',
        duration: 30,
        restDuration: 15,
        instructions: [
          'Start in plank position',
          'Bring right knee toward chest',
          'Quickly switch legs',
          'Continue alternating at a fast pace'
        ],
        targetMuscles: ['Core', 'Cardio'],
        difficulty: 'beginner'
      },
      {
        id: 'plank',
        name: 'Plank Hold',
        duration: 30,
        restDuration: 15,
        instructions: [
          'Start in push-up position',
          'Hold body in straight line',
          'Engage core muscles',
          'Breathe steadily'
        ],
        targetMuscles: ['Core', 'Shoulders'],
        difficulty: 'beginner'
      }
    ]
  },
  {
    id: 'strength-intermediate',
    name: 'Strength Circuit',
    description: 'Intermediate strength training circuit',
    difficulty: 'intermediate',
    totalDuration: 1200, // 20 minutes
    exercises: [
      {
        id: 'burpees',
        name: 'Burpees',
        duration: 45,
        restDuration: 15,
        instructions: [
          'Start standing, drop into squat',
          'Place hands on floor, jump feet back',
          'Do a push-up, jump feet forward',
          'Jump up with arms overhead'
        ],
        targetMuscles: ['Full Body', 'Cardio'],
        difficulty: 'intermediate'
      },
      {
        id: 'pike-push-ups',
        name: 'Pike Push-ups',
        duration: 45,
        restDuration: 15,
        instructions: [
          'Start in downward dog position',
          'Lower head toward hands',
          'Push back up to starting position',
          'Keep legs straight'
        ],
        targetMuscles: ['Shoulders', 'Arms'],
        difficulty: 'intermediate'
      },
      {
        id: 'jump-squats',
        name: 'Jump Squats',
        duration: 45,
        restDuration: 15,
        instructions: [
          'Start in squat position',
          'Jump up explosively',
          'Land softly back in squat',
          'Repeat immediately'
        ],
        targetMuscles: ['Legs', 'Glutes', 'Power'],
        difficulty: 'intermediate'
      },
      {
        id: 'russian-twists',
        name: 'Russian Twists',
        duration: 45,
        restDuration: 15,
        instructions: [
          'Sit with knees bent, lean back slightly',
          'Lift feet off ground',
          'Rotate torso left and right',
          'Keep core engaged'
        ],
        targetMuscles: ['Core', 'Obliques'],
        difficulty: 'intermediate'
      }
    ]
  }
];
