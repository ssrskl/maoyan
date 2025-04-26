import React from 'react';
import { cn } from '@/lib/utils';
import { 
  InfoIcon, 
  AlertTriangleIcon, 
  AlertCircleIcon, 
  HelpCircleIcon,
  LightbulbIcon
} from 'lucide-react';

type AdmonitionType = 'note' | 'tip' | 'info' | 'warning' | 'danger';

type AdmonitionProps = {
  type: AdmonitionType;
  title?: string;
  children: React.ReactNode;
  className?: string;
};

const icons = {
  note: HelpCircleIcon,
  tip: LightbulbIcon, 
  info: InfoIcon,
  warning: AlertTriangleIcon,
  danger: AlertCircleIcon,
};

const colors = {
  note: {
    border: 'border-blue-500',
    title: 'text-blue-500',
    icon: 'text-blue-500',
  },
  tip: {
    border: 'border-emerald-500',
    title: 'text-emerald-500',
    icon: 'text-emerald-500',
  },
  info: {
    border: 'border-cyan-500',
    title: 'text-cyan-500',
    icon: 'text-cyan-500',
  },
  warning: {
    border: 'border-amber-500',
    title: 'text-amber-500',
    icon: 'text-amber-500',
  },
  danger: {
    border: 'border-red-500',
    title: 'text-red-500',
    icon: 'text-red-500',
  },
};

export function Admonition({
  type = 'note',
  title,
  children,
  className,
}: AdmonitionProps) {
  const Icon = icons[type];
  const color = colors[type];
  const defaultTitle = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div
      className={cn(
        'my-6 rounded-lg border-l-4 bg-background-secondary p-4 dark:bg-zinc-800/50',
        color.border,
        className
      )}
    >
      <div className={cn('mb-2 flex items-center gap-2 font-semibold', color.title)}>
        <Icon className={cn('h-5 w-5', color.icon)} />
        <span>{title || defaultTitle}</span>
      </div>
      <div className="mt-2 text-[0.95rem]">{children}</div>
    </div>
  );
} 