import React from 'react';
import { cn } from '../../utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
}

export function Badge({ 
  className, 
  variant = 'default', 
  size = 'md',
  ...props 
}: BadgeProps) {
  const variants = {
    default: 'bg-primary-500 text-white',
    secondary: 'bg-secondary-500 text-white',
    destructive: 'bg-red-500 text-white',
    outline: 'border border-gray-300 bg-transparent text-gray-700 dark:border-gray-600 dark:text-gray-300',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-white'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-sm'
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  showText?: boolean;
}

export function Progress({ 
  value, 
  max = 100, 
  className, 
  showText = false 
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className="space-y-2">
      {showText && (
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={cn('w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700', className)}>
        <div
          className="bg-primary-500 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
