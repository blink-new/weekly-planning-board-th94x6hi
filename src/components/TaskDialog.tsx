import { Task } from '../types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { TaskForm } from './TaskForm';

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task;
  day?: number;
  onSubmit: (task: Omit<Task, 'id'>) => void;
}

export function TaskDialog({ open, onOpenChange, task, day, onSubmit }: TaskDialogProps) {
  const handleSubmit = (taskData: Omit<Task, 'id'>) => {
    onSubmit(taskData);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{task ? 'Edit Task' : 'Add New Task'}</DialogTitle>
        </DialogHeader>
        <TaskForm
          task={task}
          day={day}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}