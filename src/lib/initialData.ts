import { Task } from '../types';
import { generateId } from './tasks';

// Get current day of week (0-6)
const today = new Date().getDay();
const tomorrow = (today + 1) % 7;

// Create some sample tasks
export const initialTasks: Task[] = [
  // Work tasks
  {
    id: generateId(),
    title: 'Team standup meeting',
    description: 'Daily team check-in',
    category: 'work',
    day: today,
    time: '09:00',
    isCompleted: false,
    isRecurring: true,
    recurringPattern: 'daily',
  },
  {
    id: generateId(),
    title: 'Complete project proposal',
    description: 'Finalize budget and timeline',
    category: 'work',
    day: today,
    time: '11:00',
    isCompleted: false,
    isRecurring: false,
  },
  {
    id: generateId(),
    title: 'Client presentation',
    description: 'Present new design concepts',
    category: 'work',
    day: tomorrow,
    time: '14:00',
    isCompleted: false,
    isRecurring: false,
  },
  
  // Personal tasks
  {
    id: generateId(),
    title: 'Grocery shopping',
    description: 'Buy ingredients for dinner',
    category: 'personal',
    day: today,
    time: '18:00',
    isCompleted: false,
    isRecurring: false,
  },
  {
    id: generateId(),
    title: 'Call parents',
    description: 'Weekly check-in call',
    category: 'personal',
    day: (today + 3) % 7,
    time: '19:00',
    isCompleted: false,
    isRecurring: true,
    recurringPattern: 'weekly',
  },
  
  // Habits
  {
    id: generateId(),
    title: 'Morning workout',
    description: '30 minute cardio',
    category: 'habit',
    day: today,
    time: '06:30',
    isCompleted: false,
    isRecurring: true,
    recurringPattern: 'daily',
  },
  {
    id: generateId(),
    title: 'Read for 30 minutes',
    description: 'Personal development book',
    category: 'habit',
    day: today,
    time: '21:00',
    isCompleted: false,
    isRecurring: true,
    recurringPattern: 'daily',
  },
];

// Create instances of the recurring tasks for display
export const initialTasksWithRecurring: Task[] = [
  ...initialTasks,
  
  // Create non-recurring instances for today
  {
    id: generateId(),
    title: 'Team standup meeting',
    description: 'Daily team check-in',
    category: 'work',
    day: today,
    time: '09:00',
    isCompleted: false,
    isRecurring: false,
  },
  {
    id: generateId(),
    title: 'Morning workout',
    description: '30 minute cardio',
    category: 'habit',
    day: today,
    time: '06:30',
    isCompleted: false,
    isRecurring: false,
  },
  {
    id: generateId(),
    title: 'Read for 30 minutes',
    description: 'Personal development book',
    category: 'habit',
    day: today,
    time: '21:00',
    isCompleted: false,
    isRecurring: false,
  },
];