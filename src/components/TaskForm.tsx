import { useState, useEffect } from 'react';
import { Task, TaskCategory, daysOfWeek } from '../types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { cn } from '../lib/utils';

interface TaskFormProps {
  task?: Task;
  day?: number;
  onSubmit: (task: Omit<Task, 'id'>) => void;
  onCancel: () => void;
}

export function TaskForm({ task, day = 0, onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TaskCategory>('work');
  const [selectedDay, setSelectedDay] = useState(day);
  const [time, setTime] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringPattern, setRecurringPattern] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setCategory(task.category);
      setSelectedDay(task.day);
      setTime(task.time || '');
      setIsRecurring(task.isRecurring);
      setRecurringPattern(task.recurringPattern || 'weekly');
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSubmit({
      title,
      description: description || undefined,
      category,
      day: selectedDay,
      time: time || undefined,
      isCompleted: false,
      isRecurring,
      recurringPattern: isRecurring ? recurringPattern : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (optional)</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add details about this task"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>Category</Label>
        <RadioGroup 
          value={category} 
          onValueChange={(value) => setCategory(value as TaskCategory)}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="work" id="work" />
            <Label htmlFor="work" className="cursor-pointer">
              <span className="flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                Work
              </span>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="personal" id="personal" />
            <Label htmlFor="personal" className="cursor-pointer">
              <span className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Personal
              </span>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="habit" id="habit" />
            <Label htmlFor="habit" className="cursor-pointer">
              <span className="flex items-center">
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                Habit
              </span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="day">Day</Label>
        <Select 
          value={selectedDay.toString()} 
          onValueChange={(value) => setSelectedDay(parseInt(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select day" />
          </SelectTrigger>
          <SelectContent>
            {daysOfWeek.map((day, index) => (
              <SelectItem key={day} value={index.toString()}>
                {day}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="time">Time (optional)</Label>
        <Input
          id="time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="recurring"
          checked={isRecurring}
          onCheckedChange={setIsRecurring}
        />
        <Label htmlFor="recurring">Make this a recurring task</Label>
      </div>

      {isRecurring && (
        <div className="space-y-2 pl-6 animate-slide-up">
          <Label htmlFor="recurringPattern">Recurrence Pattern</Label>
          <Select 
            value={recurringPattern} 
            onValueChange={(value) => setRecurringPattern(value as 'daily' | 'weekly' | 'monthly')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select pattern" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex justify-end space-x-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {task ? 'Update Task' : 'Add Task'}
        </Button>
      </div>
    </form>
  );
}