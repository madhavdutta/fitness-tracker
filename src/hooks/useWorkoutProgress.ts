import { useState, useEffect } from 'react';
import { WorkoutProgress, WorkoutSession } from '../types/workout';

const STORAGE_KEY = 'fitness-workout-progress';

export const useWorkoutProgress = () => {
  const [progress, setProgress] = useState<WorkoutProgress>({
    totalWorkouts: 0,
    totalMinutes: 0,
    currentStreak: 0,
    longestStreak: 0,
    sessions: []
  });

  useEffect(() => {
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  const saveProgress = (newProgress: WorkoutProgress) => {
    setProgress(newProgress);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
  };

  const addWorkoutSession = (session: WorkoutSession) => {
    const newSessions = [...progress.sessions, session];
    const totalMinutes = Math.floor(session.duration / 60);
    
    // Calculate streak
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const lastSession = progress.sessions[progress.sessions.length - 1];
    
    let newStreak = 1;
    if (lastSession) {
      const lastSessionDate = new Date(lastSession.date).toDateString();
      if (lastSessionDate === yesterday) {
        newStreak = progress.currentStreak + 1;
      } else if (lastSessionDate === today) {
        newStreak = progress.currentStreak;
      }
    }

    const newProgress: WorkoutProgress = {
      totalWorkouts: progress.totalWorkouts + 1,
      totalMinutes: progress.totalMinutes + totalMinutes,
      currentStreak: newStreak,
      longestStreak: Math.max(progress.longestStreak, newStreak),
      sessions: newSessions
    };

    saveProgress(newProgress);
  };

  const getWeeklyStats = () => {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const weekSessions = progress.sessions.filter(
      session => new Date(session.date) >= oneWeekAgo
    );
    
    return {
      workoutsThisWeek: weekSessions.length,
      minutesThisWeek: weekSessions.reduce((total, session) => 
        total + Math.floor(session.duration / 60), 0
      )
    };
  };

  return {
    progress,
    addWorkoutSession,
    getWeeklyStats
  };
};
