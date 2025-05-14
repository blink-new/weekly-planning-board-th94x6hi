import { Task } from '../types';
import { DayColumn } from './DayColumn';

interface WeeklyBoardProps {
  tasks: Task[];
  onAddTask: (day: number) => void;
  onCompleteTask: (id: string, isCompleted: boolean) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onCreateRecurring: (task: Task) => void;
}

export function WeeklyBoard({
  tasks,
  onAddTask,
  onCompleteTask,
  onEditTask,
  onDeleteTask,
  onCreateRecurring,
}: WeeklyBoardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4 flex-1 h-full p-4">
      {Array.from({ length: 7 }, (_, i) => (
        <DayColumn
          key={i}
          day={i}
          tasks={tasks}
          onAddTask={onAddTask}
          onCompleteTask={onCompleteTask}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
          onCreateRecurring={onCreateRecurring}
        />
      ))}
    </div>
  );
}