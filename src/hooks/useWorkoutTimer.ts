import { useState, useEffect, useCallback } from 'react';
import { Exercise } from '../types/workout';

export type TimerState = 'idle' | 'work' | 'rest' | 'paused' | 'completed';

export const useWorkoutTimer = (exercises: Exercise[]) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timerState, setTimerState] = useState<TimerState>('idle');
  const [isWorkPhase, setIsWorkPhase] = useState(true);
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);

  const currentExercise = exercises[currentExerciseIndex];

  const startTimer = useCallback(() => {
    if (timerState === 'idle') {
      setTimeRemaining(currentExercise.duration);
      setIsWorkPhase(true);
    }
    setTimerState('work');
  }, [timerState, currentExercise]);

  const pauseTimer = useCallback(() => {
    setTimerState('paused');
  }, []);

  const resumeTimer = useCallback(() => {
    setTimerState(isWorkPhase ? 'work' : 'rest');
  }, [isWorkPhase]);

  const resetTimer = useCallback(() => {
    setCurrentExerciseIndex(0);
    setTimeRemaining(exercises[0]?.duration || 0);
    setTimerState('idle');
    setIsWorkPhase(true);
    setTotalElapsedTime(0);
  }, [exercises]);

  const skipExercise = useCallback(() => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setTimeRemaining(exercises[currentExerciseIndex + 1].duration);
      setIsWorkPhase(true);
      setTimerState('work');
    } else {
      setTimerState('completed');
    }
  }, [currentExerciseIndex, exercises]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerState === 'work' || timerState === 'rest') {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            if (timerState === 'work') {
              // Switch to rest phase
              setIsWorkPhase(false);
              setTimerState('rest');
              return currentExercise.restDuration;
            } else {
              // Move to next exercise or complete workout
              if (currentExerciseIndex < exercises.length - 1) {
                setCurrentExerciseIndex(prev => prev + 1);
                setIsWorkPhase(true);
                setTimerState('work');
                return exercises[currentExerciseIndex + 1].duration;
              } else {
                setTimerState('completed');
                return 0;
              }
            }
          }
          return prev - 1;
        });

        setTotalElapsedTime(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerState, currentExercise, currentExerciseIndex, exercises]);

  const progress = {
    exerciseProgress: ((currentExercise?.duration - timeRemaining) / currentExercise?.duration) * 100,
    workoutProgress: ((currentExerciseIndex + (isWorkPhase ? 0 : 0.5)) / exercises.length) * 100
  };

  return {
    currentExercise,
    currentExerciseIndex,
    timeRemaining,
    timerState,
    isWorkPhase,
    totalElapsedTime,
    progress,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    skipExercise
  };
};
