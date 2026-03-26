import Modal from '../ui/Modal'
import Input from '../ui/Input'
import Button from '../ui/Button'

interface CreateTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit?: (data: { title: string; description: string }) => void
}

export default function CreateTaskModal({ isOpen, onClose }: CreateTaskModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Task" size="md">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Input
          label="Task Title"
          placeholder="Enter task title"
          autoFocus
        />
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[var(--text)]">
            Description
          </label>
          <textarea
            placeholder="Add a more detailed description..."
            rows={4}
            className="
              w-full px-4 py-3 rounded-xl
              bg-[var(--bg)] border border-[var(--border)]
              text-[var(--text)] placeholder:text-[var(--text-secondary)]
              focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent
              transition-all duration-200 resize-none
            "
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button variant="secondary" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button className="flex-1">
            Create Task
          </Button>
        </div>
      </form>
    </Modal>
  )
}
