import { Task } from '../types';
import { initialTasksWithRecurring } from './initialData';

// Helper function to generate unique IDs
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

// Save tasks to local storage
export const saveTasks = (tasks: Task[]): void => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Load tasks from local storage
export const loadTasks = (): Task[] => {
  const savedTasks = localStorage.getItem('tasks');
  return savedTasks ? JSON.parse(savedTasks) : initialTasksWithRecurring;
};

// Add a new task
export const addTask = (tasks: Task[], task: Omit<Task, 'id'>): Task[] => {
  const newTask: Task = {
    ...task,
    id: generateId(),
  };
  const updatedTasks = [...tasks, newTask];
  saveTasks(updatedTasks);
  return updatedTasks;
};

// Update a task
export const updateTask = (tasks: Task[], taskId: string, updates: Partial<Task>): Task[] => {
  const updatedTasks = tasks.map((task) =>
    task.id === taskId ? { ...task, ...updates } : task
  );
  saveTasks(updatedTasks);
  return updatedTasks;
};

// Delete a task
export const deleteTask = (tasks: Task[], taskId: string): Task[] => {
  const updatedTasks = tasks.filter((task) => task.id !== taskId);
  saveTasks(updatedTasks);
  return updatedTasks;
};

// Create a recurring task template
export const createRecurringTask = (tasks: Task[], task: Task): Task[] => {
  const newTask = {
    ...task,
    id: generateId(),
    isRecurring: true,
  };
  const updatedTasks = [...tasks, newTask];
  saveTasks(updatedTasks);
  return updatedTasks;
};

// Apply recurring tasks to a specific week
export const applyRecurringTasks = (tasks: Task[]): Task[] => {
  const recurringTasks = tasks.filter(task => task.isRecurring);
  
  // Create instances of recurring tasks based on their pattern
  const newTasks = [...tasks];
  
  recurringTasks.forEach(task => {
    if (task.recurringPattern === 'daily') {
      // Create a task for each day
      for (let day = 0; day < 7; day++) {
        if (!newTasks.some(t => 
          t.title === task.title && 
          t.day === day && 
          !t.isRecurring
        )) {
          newTasks.push({
            ...task,
            id: generateId(),
            day,
            isRecurring: false,
          });
        }
      }
    } else if (task.recurringPattern === 'weekly') {
      // Create a task for the same day each week
      if (!newTasks.some(t => 
        t.title === task.title && 
        t.day === task.day && 
        !t.isRecurring
      )) {
        newTasks.push({
          ...task,
          id: generateId(),
          isRecurring: false,
        });
      }
    }
  });
  
  saveTasks(newTasks);
  return newTasks;
};