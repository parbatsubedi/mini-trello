import Modal from '../ui/Modal'
import Button from '../ui/Button'
import { AlertTriangle } from 'lucide-react'

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm?: () => void
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger'
}: ConfirmModalProps) {
  const iconColors = {
    danger: 'text-red-500 bg-red-100 dark:bg-red-900/30',
    warning: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30',
    info: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30'
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="text-center">
        <div className={`mx-auto w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${iconColors[variant]}`}>
          <AlertTriangle size={24} />
        </div>
        
        <p className="text-[var(--text-secondary)] mb-6">
          {message}
        </p>
        
        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={onClose}>
            {cancelText}
          </Button>
          <Button 
            variant={variant === 'danger' ? 'danger' : 'primary'} 
            className="flex-1"
            onClick={() => {
              onConfirm?.()
              onClose()
            }}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
