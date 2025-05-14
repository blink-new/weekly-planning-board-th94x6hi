import { useState } from 'react';
import { Calendar, Plus, Settings, SunMoon, Moon, User, LayoutDashboard } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { cn } from '../lib/utils';

interface HeaderProps {
  onAddTask: () => void;
  onToggleTheme: () => void;
  isDarkTheme: boolean;
}

export function Header({ onAddTask, onToggleTheme, isDarkTheme }: HeaderProps) {
  return (
    <header className="border-b sticky top-0 z-10 bg-background">
      <div className="container flex h-14 items-center">
        <div className="flex items-center mr-4 font-semibold">
          <LayoutDashboard className="h-5 w-5 mr-2 text-primary" />
          <span>Weekly Planning Board</span>
        </div>
        
        <Separator orientation="vertical" className="mx-2 h-6" />
        
        <div className="flex items-center space-x-1 mr-auto">
          <Button variant="ghost" size="sm" className="text-sm">
            <Calendar className="h-4 w-4 mr-2" />
            This Week
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onToggleTheme}>
            {isDarkTheme ? (
              <SunMoon className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          
          <Button onClick={onAddTask} size="sm">
            <Plus className="h-4 w-4 mr-1" /> Add Task
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" /> Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" /> Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onToggleTheme}>
                {isDarkTheme ? (
                  <SunMoon className="h-4 w-4 mr-2" />
                ) : (
                  <Moon className="h-4 w-4 mr-2" />
                )}
                Toggle Theme
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}