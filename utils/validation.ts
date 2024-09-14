import { GoalInput, WorkoutInput } from '@/types';

export const validateGoalInput = (goalInput: GoalInput): string | null => {
  if (!goalInput.name || goalInput.name.trim() === '') {
    return 'Goal name is required';
  }

  if (!goalInput.target || goalInput.target.trim() === '') {
    return 'Goal target is required';
  }

  if (!goalInput.deadline) {
    return 'Goal deadline is required';
  }

  return null;
};

export const validateWorkoutInput = (workoutInput: WorkoutInput): string | null => {
  if (!workoutInput.name || workoutInput.name.trim() === '') {
    return 'Workout name is required';
  }

  if (!workoutInput.duration || workoutInput.duration <= 0) {
    return 'Workout duration must be a positive number';
  }

  if (!workoutInput.calories || workoutInput.calories <= 0) {
    return 'Calories burned must be a positive number';
  }

  if (!workoutInput.date) {
    return 'Workout date is required';
  }

  return null;
};