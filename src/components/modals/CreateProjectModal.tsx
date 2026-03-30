import { motion } from 'framer-motion'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { useEffect, useState } from 'react'
import type { Project } from '../../types/project'
import { MultiSelect } from '../select/multiSelect'

type CreateProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedProject: Project | null;
  onSuccess?: () => void;
}

const colorOptions = [
  '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444',
  '#06B6D4', '#EC4899', '#84CC16', '#F97316', '#6366F1'
]

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'review', label: 'In Review' },
  { value: 'completed', label: 'Completed' },
  { value: 'archived', label: 'Archived' }
]

const teamMembers = [
  { id: 1, name: 'Sarah Kim', initials: 'SK' },
  { id: 2, name: 'Mike Ross', initials: 'MR' },
  { id: 3, name: 'John Doe', initials: 'JD' },
  { id: 4, name: 'Emma Wilson', initials: 'EW' },
  { id: 5, name: 'Lisa Marie', initials: 'LM' },
  { id: 6, name: 'James King', initials: 'JK' },
]

const options = teamMembers.map(m => ({
  id: m.id,
  label: m.name,
  initials: m.initials
}))

export default function CreateProjectModal({
  isOpen,
  onClose,
  selectedProject,
  onSuccess
}: CreateProjectModalProps) {

  const isEditMode = !!selectedProject

  // Default members for CREATE
  const defaultMembers = teamMembers.slice(0, 3).map(m => m.id)

  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    description: '',
    color: colorOptions[0],
    status: 'active',
    dueDate: '',
    members: defaultMembers
  })

  const [selectedMembers, setSelectedMembers] = useState<(string | number)[]>(defaultMembers)

  //  Reset form when modal opens or project changes
  useEffect(() => {
    if (selectedProject) {
      const memberIds = selectedProject.members?.map(m => typeof m.id === 'string' ? parseInt(m.id, 10) : m.id) ?? defaultMembers
      setFormData({
        id: selectedProject.id,
        name: selectedProject.name,
        description: selectedProject.description,
        color: selectedProject.color ?? colorOptions[0],
        status: selectedProject.status,
        dueDate: selectedProject.end_date ?? '',
        members: memberIds
      })

      setSelectedMembers(memberIds)
    } else {
      setFormData({
        id: 0,
        name: '',
        description: '',
        color: colorOptions[0],
        status: 'active',
        dueDate: '',
        members: defaultMembers
      })

      setSelectedMembers(defaultMembers)
    }
  }, [selectedProject, isOpen])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit Project" : "Create New Project"}
      size="lg"
    >
      <div className="space-y-6">

        <Input
          label="Project Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />

        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Describe your project..."
          rows={3}
          className="w-full px-4 py-3 rounded-xl border"
        />

        {/* COLOR */}
        <div className="flex flex-wrap gap-2">
          {colorOptions.map(color => (
            <button
              key={color}
              type="button"
              onClick={() => setFormData({ ...formData, color })}
              className={`w-10 h-10 rounded-xl ${
                formData.color === color ? 'ring-2 ring-black' : ''
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        {/* STATUS */}
        <div className="flex flex-wrap gap-2">
          {statusOptions.map(status => (
            <button
              key={status.value}
              type="button"
              onClick={() =>
                setFormData({ ...formData, status: status.value })
              }
              className={`px-4 py-2 rounded-xl border ${
                formData.status === status.value
                  ? 'bg-[var(--primary)] text-white'
                  : ''
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>

        <Input
          label="Due Date"
          type="date"
          value={formData.dueDate}
          onChange={(e) =>
            setFormData({ ...formData, dueDate: e.target.value })
          }
        />

        <MultiSelect
          options={options}
          value={selectedMembers}
          onChange={(val) => {
            setSelectedMembers(val)
            setFormData({ ...formData, members: val as number[] })
          }}
        />

        <div className="flex gap-3 pt-4">
          <Button variant="secondary" className="flex-1" onClick={onClose}>
            Cancel
          </Button>

          <Button
            className="flex-1"
            onClick={() => {
              console.log('Submit:', formData)
              onSuccess?.()
            }}
          >
            {isEditMode ? 'Update Project' : 'Create Project'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}