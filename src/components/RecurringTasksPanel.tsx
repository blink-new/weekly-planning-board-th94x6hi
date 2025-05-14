import { useState } from 'react';
import { Calendar, ChevronRight, ChevronDown, Plus } from 'lucide-react';
import { Task } from '../types';
import { TaskItem } from './TaskItem';
import { Button } from './ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '../lib/utils';

interface RecurringTasksPanelProps {
  tasks: Task[];
  onAddTask: () => void;
  onCompleteTask: (id: string, isCompleted: boolean) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onCreateRecurring: (task: Task) => void;
  onApplyRecurring: () => void;
}

export function RecurringTasksPanel({
  tasks,
  onAddTask,
  onCompleteTask,
  onEditTask,
  onDeleteTask,
  onCreateRecurring,
  onApplyRecurring,
}: RecurringTasksPanelProps) {
  const [isOpen, setIsOpen] = useState(true);
  const recurringTasks = tasks.filter(task => task.isRecurring);
  
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="border rounded-lg overflow-hidden bg-card"
    >
      <CollapsibleTrigger asChild>
        <div className="p-3 flex justify-between items-center cursor-pointer hover:bg-accent/50">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-blue-500" />
            <h3 className="text-sm font-medium">Recurring Templates</h3>
            <span className="ml-2 text-xs text-muted-foreground">
              {recurringTasks.length} templates
            </span>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-3 pb-3">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs text-muted-foreground">
              Templates will be applied to your weekly schedule
            </p>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 text-xs"
                onClick={onApplyRecurring}
              >
                Apply All
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                className="h-7 text-xs"
                onClick={onAddTask}
              >
                <Plus className="h-3 w-3 mr-1" /> Add Template
              </Button>
            </div>
          </div>
          
          <ScrollArea className="h-[200px] pr-3 -mr-3">
            {recurringTasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-24 text-center p-4 border border-dashed border-muted rounded-lg">
                <p className="text-sm text-muted-foreground">No recurring templates</p>
                <Button 
                  variant="link" 
                  size="sm" 
                  className="mt-1 h-auto p-0"
                  onClick={onAddTask}
                >
                  Create Template
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {recurringTasks.map((task) => (
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
          </ScrollArea>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}