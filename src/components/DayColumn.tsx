import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Task, daysOfWeek } from '../types';
import { TaskItem } from './TaskItem';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '../lib/utils';

interface DayColumnProps {
  day: number;
  tasks: Task[];
  onAddTask: (day: number) => void;
  onCompleteTask: (id: string, isCompleted: boolean) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onCreateRecurring: (task: Task) => void;
}

export function DayColumn({
  day,
  tasks,
  onAddTask,
  onCompleteTask,
  onEditTask,
  onDeleteTask,
  onCreateRecurring,
}: DayColumnProps) {
  const dayTasks = tasks.filter((task) => task.day === day);
  const [isDragOver, setIsDragOver] = useState(false);
  
  // Group tasks by category
  const workTasks = dayTasks.filter(task => task.category === 'work');
  const personalTasks = dayTasks.filter(task => task.category === 'personal');
  const habitTasks = dayTasks.filter(task => task.category === 'habit');
  
  // Check if today
  const isToday = new Date().getDay() === day;
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  
  const handleDragLeave = () => {
    setIsDragOver(false);
  };
  
  return (
    <Card 
      className={cn(
        "h-full flex flex-col",
        isToday && "ring-2 ring-primary/30",
        isDragOver && "ring-2 ring-primary"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <CardHeader className="p-3 pb-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium">
            {daysOfWeek[day]}
            {isToday && (
              <Badge variant="outline" className="ml-2 text-xs bg-primary/10">
                Today
              </Badge>
            )}
          </CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={() => onAddTask(day)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-3 pt-3 flex-1 overflow-hidden">
        <ScrollArea className="h-full pr-3 -mr-3">
          {dayTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-24 text-center p-4 border border-dashed border-muted rounded-lg">
              <p className="text-sm text-muted-foreground">No tasks for {daysOfWeek[day]}</p>
              <Button 
                variant="link" 
                size="sm" 
                className="mt-1 h-auto p-0"
                onClick={() => onAddTask(day)}
              >
                Add Task
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {workTasks.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase text-muted-foreground font-medium mb-2 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-1.5"></span>
                    Work ({workTasks.length})
                  </h4>
                  {workTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onComplete={onCompleteTask}
                      onEdit={onEditTask}
                      onDelete={onDeleteTask}
                      onCreateRecurring={onCreateRecurring}
                    />
                  ))}
                </div>
              )}
              
              {personalTasks.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase text-muted-foreground font-medium mb-2 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                    Personal ({personalTasks.length})
                  </h4>
                  {personalTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onComplete={onCompleteTask}
                      onEdit={onEditTask}
                      onDelete={onDeleteTask}
                      onCreateRecurring={onCreateRecurring}
                    />
                  ))}
                </div>
              )}
              
              {habitTasks.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase text-muted-foreground font-medium mb-2 flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-1.5"></span>
                    Habits ({habitTasks.length})
                  </h4>
                  {habitTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onComplete={onCompleteTask}
                      onEdit={onEditTask}
                      onDelete={onDeleteTask}
                      onCreateRecurring={onCreateRecurring}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}