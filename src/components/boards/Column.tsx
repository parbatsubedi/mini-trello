import type { TaskCardProps } from './TaskCard'
import TaskCard from './TaskCard'
import { Plus } from 'lucide-react'
import Button from '../ui/Button'

export type { TaskCardProps }

export interface ColumnProps {
  id: string
  title: string
  tasks: TaskCardProps[]
  color?: string
  onAddTask?: () => void
}

const columnColors: Record<string, string> = {
  todo: '#6366f1',
  inprogress: '#f59e0b',
  done: '#10b981',
  default: '#8b5cf6'
}

export default function Column({ 
  title, 
  tasks, 
  color = 'default',
  onAddTask 
}: ColumnProps) {
  const accentColor = columnColors[color] || columnColors.default

  return (
    <div className="flex flex-col w-80 min-w-[320px] max-h-full">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
          <h3 className="font-semibold text-[var(--text)]">{title}</h3>
          <span className="px-2 py-0.5 text-xs font-medium rounded-lg bg-[var(--card)] text-[var(--text-secondary)]">
            {tasks.length}
          </span>
        </div>
        <button 
          onClick={onAddTask}
          className="p-1.5 rounded-lg hover:bg-[var(--card)] text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors"
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 px-1 pb-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
        
        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[var(--card)] flex items-center justify-center mb-3">
              <Plus size={20} className="text-[var(--text-secondary)]" />
            </div>
            <p className="text-sm text-[var(--text-secondary)] mb-3">No tasks yet</p>
            <Button variant="ghost" size="sm" onClick={onAddTask}>
              Add a task
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
