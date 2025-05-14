export type TaskCategory = 'work' | 'personal' | 'habit';

export type Task = {
  id: string;
  title: string;
  description?: string;
  category: TaskCategory;
  day: number; // 0-6 (Sunday to Saturday)
  time?: string;
  isCompleted: boolean;
  isRecurring: boolean;
  recurringPattern?: 'daily' | 'weekly' | 'monthly';
};

export type CategoryColor = {
  [key in TaskCategory]: string;
};

export const categoryColors: CategoryColor = {
  work: 'bg-blue-500',
  personal: 'bg-green-500',
  habit: 'bg-purple-500'
};

export const categoryIcons: Record<TaskCategory, string> = {
  work: 'briefcase',
  personal: 'heart',
  habit: 'repeat'
};

export const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];