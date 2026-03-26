import Modal from '../ui/Modal'
import Input from '../ui/Input'
import Button from '../ui/Button'

interface EditTaskModalProps {
  isOpen: boolean
  onClose: () => void
  task?: {
    id: string
    title: string
    description?: string
  }
}

export default function EditTaskModal({ isOpen, onClose, task }: EditTaskModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Task" size="md">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Input
          label="Task Title"
          placeholder="Enter task title"
          defaultValue={task?.title}
          autoFocus
        />
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[var(--text)]">
            Description
          </label>
          <textarea
            placeholder="Add a more detailed description..."
            rows={4}
            defaultValue={task?.description}
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
          <Button variant="danger" onClick={onClose}>
            Delete
          </Button>
          <div className="flex-1" />
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button>
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  )
}
