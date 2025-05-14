import { useState } from 'react';
import { Trash2, Edit, Check, Calendar, MoreHorizontal } from 'lucide-react';
import { Task, categoryColors } from '../types';
import {
  Card,
  CardContent,
} from './ui/card';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { cn } from '../lib/utils';

interface TaskItemProps {
  task: Task;
  onComplete: (id: string, isCompleted: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onCreateRecurring: (task: Task) => void;
}

export function TaskItem({ task, onComplete, onEdit, onDelete, onCreateRecurring }: TaskItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleCheckboxChange = () => {
    onComplete(task.id, !task.isCompleted);
  };

  return (
    <Card 
      className={cn(
        'mb-2 relative transition-all duration-200 group animate-fade-in',
        task.isCompleted ? 'opacity-70' : '',
        isHovered ? 'ring-2 ring-primary/20' : ''
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={cn(
          'absolute top-0 left-0 w-1 h-full rounded-l-lg',
          categoryColors[task.category]
        )} 
      />
      <CardContent className="p-3 flex items-start gap-2">
        <Checkbox 
          checked={task.isCompleted} 
          onCheckedChange={handleCheckboxChange}
          className="mt-1"
        />
        <div className="flex-1 min-w-0">
          <p className={cn(
            'font-medium truncate',
            task.isCompleted ? 'line-through text-muted-foreground' : ''
          )}>
            {task.title}
          </p>
          {task.description && (
            <p className="text-sm text-muted-foreground truncate">
              {task.description}
            </p>
          )}
          {task.time && (
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <Clock className="h-3 w-3 mr-1" /> {task.time}
            </p>
          )}
          {task.isRecurring && (
            <div className="flex items-center mt-1">
              <Calendar className="h-3 w-3 text-blue-500 mr-1" />
              <span className="text-xs text-blue-500">
                {task.recurringPattern === 'daily' ? 'Daily' : 
                 task.recurringPattern === 'weekly' ? 'Weekly' : 
                 task.recurringPattern === 'monthly' ? 'Monthly' : ''}
              </span>
            </div>
          )}
        </div>
        
        <div className={cn(
          "flex items-center gap-1 transition-opacity duration-200",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={() => onEdit(task)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {!task.isRecurring && (
                <DropdownMenuItem onClick={() => onCreateRecurring(task)}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Make recurring
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => onDelete(task.id)} className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}

// Adding the Clock icon component since it wasn't imported but was used
function Clock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}