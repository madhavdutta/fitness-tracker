import React, { useState, useEffect } from 'react';
import { Activity, Trophy, Clock, Flame, Calendar, TrendingUp } from 'lucide-react';
import { workouts } from './data/workouts';
import { Workout } from './types/workout';
import { useWorkoutTimer } from './hooks/useWorkoutTimer';
import { useWorkoutProgress } from './hooks/useWorkoutProgress';
import WorkoutSelector from './components/WorkoutSelector';
import ExerciseAnimation from './components/ExerciseAnimation';
import TimerDisplay from './components/TimerDisplay';
import WorkoutControls from './components/WorkoutControls';
import ExerciseInstructions from './components/ExerciseInstructions';
import WorkoutProgress from './components/WorkoutProgress';
import StatsCard from './components/StatsCard';

function App() {
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [currentView, setCurrentView] = useState<'select' | 'workout' | 'stats'>('select');
  
  const { progress, addWorkoutSession, getWeeklyStats } = useWorkoutProgress();
  const weeklyStats = getWeeklyStats();
  
  const {
    currentExercise,
    currentExerciseIndex,
    timeRemaining,
    timerState,
    isWorkPhase,
    totalElapsedTime,
    progress: timerProgress,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    skipExercise
  } = useWorkoutTimer(selectedWorkout?.exercises || []);

  // Handle workout completion
  useEffect(() => {
    if (timerState === 'completed' && selectedWorkout) {
      const session = {
        id: Date.now().toString(),
        workoutId: selectedWorkout.id,
        date: new Date().toISOString(),
        completed: true,
        duration: totalElapsedTime,
        exercisesCompleted: selectedWorkout.exercises.length,
        totalExercises: selectedWorkout.exercises.length
      };
      addWorkoutSession(session);
    }
  }, [timerState, selectedWorkout, totalElapsedTime, addWorkoutSession]);

  const handleWorkoutSelect = (workout: Workout) => {
    setSelectedWorkout(workout);
    setCurrentView('workout');
  };

  const handleBackToSelection = () => {
    resetTimer();
    setSelectedWorkout(null);
    setCurrentView('select');
  };

  const renderHeader = () => (
    <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6 shadow-lg">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Activity size={32} />
            <h1 className="text-2xl font-bold">FitTimer Pro</h1>
          </div>
          
          <nav className="flex space-x-4">
            <button
              onClick={() => setCurrentView('select')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'select' ? 'bg-white text-blue-600' : 'hover:bg-white/20'
              }`}
            >
              Workouts
            </button>
            <button
              onClick={() => setCurrentView('stats')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'stats' ? 'bg-white text-blue-600' : 'hover:bg-white/20'
              }`}
            >
              Stats
            </button>
          </nav>
        </div>
      </div>
    </header>
  );

  const renderWorkoutView = () => {
    if (!selectedWorkout || !currentExercise) return null;

    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <button
            onClick={handleBackToSelection}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Workouts
          </button>
          <h2 className="text-3xl font-bold text-gray-800 mt-2">{selectedWorkout.name}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Timer Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-8 shadow-lg mb-6">
              <ExerciseAnimation 
                exercise={currentExercise} 
                isActive={timerState === 'work' || timerState === 'rest'} 
              />
              
              <TimerDisplay
                timeRemaining={timeRemaining}
                timerState={timerState}
                isWorkPhase={isWorkPhase}
                progress={timerProgress.exerciseProgress}
              />
              
              <WorkoutControls
                timerState={timerState}
                onStart={startTimer}
                onPause={pauseTimer}
                onResume={resumeTimer}
                onReset={resetTimer}
                onSkip={skipExercise}
              />
            </div>

            <ExerciseInstructions exercise={currentExercise} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <WorkoutProgress
              exercises={selectedWorkout.exercises}
              currentExerciseIndex={currentExerciseIndex}
              workoutProgress={timerProgress.workoutProgress}
            />
            
            {timerState === 'completed' && (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
                <Trophy size={48} className="text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-green-800 mb-2">Workout Complete!</h3>
                <p className="text-green-700">
                  Great job! You completed {selectedWorkout.exercises.length} exercises 
                  in {Math.floor(totalElapsedTime / 60)} minutes.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderStatsView = () => (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Your Fitness Stats</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Workouts"
          value={progress.totalWorkouts}
          icon={Trophy}
          color="bg-blue-500"
        />
        <StatsCard
          title="Total Minutes"
          value={progress.totalMinutes}
          icon={Clock}
          color="bg-green-500"
        />
        <StatsCard
          title="Current Streak"
          value={`${progress.currentStreak} days`}
          icon={Flame}
          color="bg-orange-500"
        />
        <StatsCard
          title="This Week"
          value={weeklyStats.workoutsThisWeek}
          icon={Calendar}
          color="bg-purple-500"
          subtitle={`${weeklyStats.minutesThisWeek} minutes`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Sessions</h3>
          {progress.sessions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No workouts completed yet. Start your first workout!</p>
          ) : (
            <div className="space-y-3">
              {progress.sessions.slice(-5).reverse().map((session) => (
                <div key={session.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-800">
                      {workouts.find(w => w.id === session.workoutId)?.name || 'Unknown Workout'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {new Date(session.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-800">
                      {Math.floor(session.duration / 60)} min
                    </div>
                    <div className="text-xs text-green-600">Completed</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Achievements</h3>
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${progress.totalWorkouts >= 1 ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
              <div className="flex items-center space-x-3">
                <Trophy className={`${progress.totalWorkouts >= 1 ? 'text-green-600' : 'text-gray-400'}`} size={24} />
                <div>
                  <div className="font-medium">First Workout</div>
                  <div className="text-sm text-gray-600">Complete your first workout</div>
                </div>
              </div>
            </div>
            
            <div className={`p-4 rounded-lg ${progress.currentStreak >= 3 ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
              <div className="flex items-center space-x-3">
                <Flame className={`${progress.currentStreak >= 3 ? 'text-orange-600' : 'text-gray-400'}`} size={24} />
                <div>
                  <div className="font-medium">3-Day Streak</div>
                  <div className="text-sm text-gray-600">Work out for 3 consecutive days</div>
                </div>
              </div>
            </div>
            
            <div className={`p-4 rounded-lg ${progress.totalWorkouts >= 10 ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
              <div className="flex items-center space-x-3">
                <TrendingUp className={`${progress.totalWorkouts >= 10 ? 'text-blue-600' : 'text-gray-400'}`} size={24} />
                <div>
                  <div className="font-medium">Fitness Enthusiast</div>
                  <div className="text-sm text-gray-600">Complete 10 workouts</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {renderHeader()}
      
      <main>
        {currentView === 'select' && (
          <div className="max-w-4xl mx-auto p-6">
            <WorkoutSelector
              workouts={workouts}
              selectedWorkout={selectedWorkout}
              onSelectWorkout={handleWorkoutSelect}
            />
          </div>
        )}
        
        {currentView === 'workout' && renderWorkoutView()}
        {currentView === 'stats' && renderStatsView()}
      </main>
    </div>
  );
}

export default App;
