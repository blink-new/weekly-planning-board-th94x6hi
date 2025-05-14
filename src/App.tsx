import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Task } from './types';
import { useMediaQuery } from 'react-responsive';
import { loadTasks, saveTasks, addTask, updateTask, deleteTask, createRecurringTask, applyRecurringTasks } from './lib/tasks';
import { WeeklyBoard } from './components/WeeklyBoard';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { TaskDialog } from './components/TaskDialog';
import { Toaster } from './components/ui/toaster';
import { useToast } from './hooks/use-toast';
import './App.css';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);
  const [selectedDay, setSelectedDay] = useState<number | undefined>(undefined);
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const { toast } = useToast();
  const isMobile = useMediaQuery({ maxWidth: 1024 });
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  // Set up theme
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  // Load tasks from localStorage
  useEffect(() => {
    const loadedTasks = loadTasks();
    setTasks(loadedTasks);
  }, []);

  // Handle recurring task dialog
  const handleAddRecurringTask = () => {
    setCurrentTask(undefined);
    setSelectedDay(undefined);
    setIsTaskDialogOpen(true);
  };

  // Handle add task button click
  const handleAddTask = (day?: number) => {
    setCurrentTask(undefined);
    setSelectedDay(day);
    setIsTaskDialogOpen(true);
  };

  // Handle edit task button
  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    setIsTaskDialogOpen(true);
  };

  // Handle task completion toggle
  const handleCompleteTask = (id: string, isCompleted: boolean) => {
    const updatedTasks = updateTask(tasks, id, { isCompleted });
    setTasks(updatedTasks);
    
    if (isCompleted) {
      toast({
        title: "Task completed!",
        description: "Keep up the good work!",
      });
    }
  };

  // Handle task deletion
  const handleDeleteTask = (id: string) => {
    const taskToDelete = tasks.find(task => task.id === id);
    const updatedTasks = deleteTask(tasks, id);
    setTasks(updatedTasks);
    
    toast({
      title: taskToDelete?.isRecurring ? "Template deleted" : "Task deleted",
      description: `"${taskToDelete?.title}" has been removed.`,
    });
  };

  // Handle task form submission
  const handleTaskSubmit = (taskData: Omit<Task, 'id'>) => {
    if (currentTask) {
      // Edit existing task
      const updatedTasks = updateTask(tasks, currentTask.id, taskData);
      setTasks(updatedTasks);
      
      toast({
        title: "Task updated",
        description: "Your changes have been saved.",
      });
    } else {
      // Create new task
      const updatedTasks = addTask(tasks, taskData);
      setTasks(updatedTasks);
      
      toast({
        title: taskData.isRecurring ? "Template created" : "Task added",
        description: `"${taskData.title}" has been added.`,
      });
    }
  };

  // Handle creating a recurring task from an existing task
  const handleCreateRecurring = (task: Task) => {
    const recurringTasks = createRecurringTask(tasks, {
      ...task,
      isRecurring: true,
      recurringPattern: 'weekly',
    });
    setTasks(recurringTasks);
    
    toast({
      title: "Template created",
      description: `"${task.title}" is now a recurring template.`,
    });
  };

  // Handle applying recurring tasks
  const handleApplyRecurring = () => {
    const updatedTasks = applyRecurringTasks(tasks);
    setTasks(updatedTasks);
    
    toast({
      title: "Templates applied",
      description: "Recurring tasks have been added to your board.",
    });
  };

  // Handle theme toggle
  const handleToggleTheme = () => {
    setIsDarkTheme(prev => !prev);
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <Header 
        onAddTask={() => handleAddTask()} 
        onToggleTheme={handleToggleTheme}
        isDarkTheme={isDarkTheme}
      />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile sidebar toggle */}
        {isMobile && (
          <button
            className="fixed z-20 bottom-4 right-4 bg-primary text-primary-foreground shadow-lg rounded-full p-3"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        )}
        
        {/* Sidebar */}
        <div className={`${isMobile ? (isSidebarOpen ? 'block' : 'hidden') : 'block'} ${isMobile ? 'fixed inset-0 z-10 bg-background' : ''}`}>
          <Sidebar
            tasks={tasks}
            onAddRecurringTask={handleAddRecurringTask}
            onCompleteTask={handleCompleteTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onCreateRecurring={handleCreateRecurring}
            onApplyRecurring={handleApplyRecurring}
          />
        </div>
        
        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <WeeklyBoard
            tasks={tasks}
            onAddTask={handleAddTask}
            onCompleteTask={handleCompleteTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onCreateRecurring={handleCreateRecurring}
          />
        </main>
      </div>
      
      {/* Task dialog */}
      <TaskDialog
        open={isTaskDialogOpen}
        onOpenChange={setIsTaskDialogOpen}
        task={currentTask}
        day={selectedDay}
        onSubmit={handleTaskSubmit}
      />
      
      <Toaster />
    </div>
  );
}

export default App;