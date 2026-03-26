import type { HTMLAttributes } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hoverable?: boolean
}

export default function Card({ 
  children, 
  variant = 'default', 
  padding = 'md',
  hoverable = false,
  className = '',
  ...props 
}: CardProps) {
    
  const baseStyles = 'rounded-2xl transition-all duration-200'
    
  const variants = {
    default: 'bg-[var(--card)] border border-[var(--border)]',
    elevated: 'bg-[var(--card)] shadow-lg shadow-[var(--shadow)]',
    outlined: 'bg-transparent border-2 border-[var(--border)]'
  }
    
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-8'
  }

  const hoverStyles = hoverable 
    ? 'hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--shadow-hover)] cursor-pointer' 
    : ''

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
