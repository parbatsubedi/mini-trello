import { motion } from 'framer-motion'

export interface TaskCardProps {
  id: string
  title: string
  description?: string
  tags?: { label: string; color: string }[]
  assignee?: { name: string; avatar?: string }
  dueDate?: string
  priority?: 'low' | 'medium' | 'high'
  onClick?: () => void
}

const priorityColors = {
  low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
}

export default function TaskCard({
  title,
  description,
  tags = [],
  assignee,
  dueDate,
  priority = 'medium',
  onClick
}: TaskCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 8px 20px rgba(0,0,0,0.12)' }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="
        p-4 rounded-xl 
        bg-[var(--bg)] border border-[var(--border)]
        cursor-pointer
        group
      "
    >
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 text-xs font-medium rounded-lg"
              style={{ 
                backgroundColor: tag.color + '20',
                color: tag.color
              }}
            >
              {tag.label}
            </span>
          ))}
        </div>
      )}
      
      <h4 className="font-medium text-[var(--text)] mb-1 group-hover:text-[var(--primary)] transition-colors">
        {title}
      </h4>
      
      {description && (
        <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-3">
          {description}
        </p>
      )}
      
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--border)]">
        <div className="flex items-center gap-2">
          {priority && (
            <span className={`px-2 py-0.5 text-xs font-medium rounded-lg ${priorityColors[priority]}`}>
              {priority}
            </span>
          )}
          {dueDate && (
            <span className="text-xs text-[var(--text-secondary)]">
              {dueDate}
            </span>
          )}
        </div>
        
        {assignee && (
          <div className="flex items-center gap-1.5">
            {assignee.avatar ? (
              <img
                src={assignee.avatar}
                alt={assignee.name}
                className="w-6 h-6 rounded-full object-cover"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-[var(--primary)] flex items-center justify-center text-white text-xs font-medium">
                {assignee.name.charAt(0)}
              </div>
            )}
            <span className="text-xs text-[var(--text-secondary)]">{assignee.name}</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
