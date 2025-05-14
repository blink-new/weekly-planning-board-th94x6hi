import { LayoutList, CheckSquare, BarChart3 } from 'lucide-react';
import { Task, TaskCategory, categoryColors } from '../types';
import { RecurringTasksPanel } from './RecurringTasksPanel';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { cn } from '../lib/utils';

interface SidebarProps {
  tasks: Task[];
  onAddRecurringTask: () => void;
  onCompleteTask: (id: string, isCompleted: boolean) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onCreateRecurring: (task: Task) => void;
  onApplyRecurring: () => void;
}

export function Sidebar({
  tasks,
  onAddRecurringTask,
  onCompleteTask,
  onEditTask,
  onDeleteTask,
  onCreateRecurring,
  onApplyRecurring,
}: SidebarProps) {
  // Calculate task statistics
  const totalTasks = tasks.filter(t => !t.isRecurring).length;
  const completedTasks = tasks.filter(t => !t.isRecurring && t.isCompleted).length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Count by category
  const workTasks = tasks.filter(t => !t.isRecurring && t.category === 'work');
  const personalTasks = tasks.filter(t => !t.isRecurring && t.category === 'personal');
  const habitTasks = tasks.filter(t => !t.isRecurring && t.category === 'habit');
  
  // Calculate completion by category
  const calculateCategoryCompletion = (category: TaskCategory) => {
    const categoryTasks = tasks.filter(t => !t.isRecurring && t.category === category);
    const categoryTotal = categoryTasks.length;
    const categoryCompleted = categoryTasks.filter(t => t.isCompleted).length;
    return categoryTotal > 0 ? Math.round((categoryCompleted / categoryTotal) * 100) : 0;
  };
  
  const workCompletion = calculateCategoryCompletion('work');
  const personalCompletion = calculateCategoryCompletion('personal');
  const habitCompletion = calculateCategoryCompletion('habit');
  
  return (
    <div className="w-full lg:w-72 border-r bg-sidebar h-full overflow-auto flex flex-col">
      <div className="p-4">
        <div className="mb-4">
          <h3 className="text-sm font-medium flex items-center mb-2">
            <LayoutList className="h-4 w-4 mr-2" />
            Weekly Progress
          </h3>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs text-muted-foreground">Overall</span>
                <span className="text-xs font-medium">{completedTasks}/{totalTasks} ({completionPercentage}%)</span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs text-muted-foreground flex items-center">
                  <span className={cn("w-2 h-2 rounded-full mr-1.5", categoryColors.work)}></span>
                  Work
                </span>
                <span className="text-xs font-medium">
                  {workTasks.filter(t => t.isCompleted).length}/{workTasks.length} ({workCompletion}%)
                </span>
              </div>
              <Progress value={workCompletion} className="h-2 bg-blue-100 dark:bg-blue-900/20" indicatorClassName="bg-blue-500" />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs text-muted-foreground flex items-center">
                  <span className={cn("w-2 h-2 rounded-full mr-1.5", categoryColors.personal)}></span>
                  Personal
                </span>
                <span className="text-xs font-medium">
                  {personalTasks.filter(t => t.isCompleted).length}/{personalTasks.length} ({personalCompletion}%)
                </span>
              </div>
              <Progress value={personalCompletion} className="h-2 bg-green-100 dark:bg-green-900/20" indicatorClassName="bg-green-500" />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs text-muted-foreground flex items-center">
                  <span className={cn("w-2 h-2 rounded-full mr-1.5", categoryColors.habit)}></span>
                  Habits
                </span>
                <span className="text-xs font-medium">
                  {habitTasks.filter(t => t.isCompleted).length}/{habitTasks.length} ({habitCompletion}%)
                </span>
              </div>
              <Progress value={habitCompletion} className="h-2 bg-purple-100 dark:bg-purple-900/20" indicatorClassName="bg-purple-500" />
            </div>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <RecurringTasksPanel
          tasks={tasks}
          onAddTask={onAddRecurringTask}
          onCompleteTask={onCompleteTask}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
          onCreateRecurring={onCreateRecurring}
          onApplyRecurring={onApplyRecurring}
        />
      </div>
    </div>
  );
}

// Need to update the Progress component with indicatorClassName prop
export function ProgressWithIndicatorClassName({ value, className, indicatorClassName }: { value: number, className?: string, indicatorClassName?: string }) {
  return (
    <div className={cn("relative h-2 w-full overflow-hidden rounded-full bg-secondary", className)}>
      <div 
        className={cn("h-full w-full flex-1 bg-primary transition-all", indicatorClassName)} 
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  );
}