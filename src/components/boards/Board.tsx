import type { ColumnProps } from './Column'
import Column from './Column'

export type { ColumnProps }

interface BoardProps {
  title: string
  description?: string
  columns: ColumnProps[]
  onAddColumn?: () => void
}

export default function Board({ 
  title, 
  description,
  columns,
  onAddColumn 
}: BoardProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--text)]">
          {title}
        </h1>
        {description && (
          <p className="text-[var(--text-secondary)] mt-1">
            {description}
          </p>
        )}
      </div>

      <div className="flex-1 flex gap-6 overflow-x-auto pb-4">
        {columns.map((column) => (
          <Column key={column.id} {...column} />
        ))}
        
        {onAddColumn && (
          <button
            onClick={onAddColumn}
            className="
              flex-shrink-0 w-80 min-w-[320px] h-32
              rounded-2xl border-2 border-dashed border-[var(--border)]
              flex flex-col items-center justify-center gap-2
              text-[var(--text-secondary)] hover:text-[var(--primary)]
              hover:border-[var(--primary)] hover:bg-[var(--primary)]/5
              transition-all duration-200
            "
          >
            <span className="text-2xl">+</span>
            <span className="text-sm font-medium">Add Column</span>
          </button>
        )}
      </div>
    </div>
  )
}
