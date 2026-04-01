import { useEffect, useState } from 'react'
import Modal from '../ui/Modal'
import { useCreateTaskMutation, useUpdateTaskMutation, useAssignCollaboratorsMutation } from '../../hooks/useTask'
import { AlertOverlay } from '../alert/Alert'
import { Save, X } from 'lucide-react'
import { MultiSelect } from '../select/multiSelect'
import { ChevronDown } from '../ui/chevronDown'
import { Row } from '../ui/row'
import { useFormState } from '../../hooks/form/useFormState'
import { FieldError } from '../errors/fieldError'
import type { Priority, User } from '../../types/types'

interface TaskModalProps {
  isOpen: boolean
  onClose: () => void
  task?: TaskFormData | null
  projectId: number
  users: User[]
  onSuccess?: () => void
}

export interface TaskFormData {
  id: number
  title: string
  description: string
  priority: Priority
  status: string
  points: number
  start_date: string
  due_date: string
  assignee_id: number | null
  assigned_users: number[]
}

const statusOptions = [
  { value: 'todo',       label: 'To Do'       },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'review',     label: 'In Review'   },
  { value: 'done',      label: 'Done'        },
]

const priorityOptions = [
  { value: 'low',      label: 'Low'      },
  { value: 'medium',  label: 'Medium'  },
  { value: 'high',    label: 'High'    },
  { value: 'urgent',  label: 'Urgent'  },
]

const inputCls = `
  w-full px-3 py-2 rounded-md text-sm
  bg-[var(--input-bg)]
  border border-transparent
  text-[var(--text)] placeholder:text-[var(--text-secondary)]
  focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)]
  transition-all duration-150
`

const selectCls = `
  w-full px-3 py-2 pr-8 rounded-md text-sm appearance-none
  bg-[var(--input-bg)]
  border border-transparent
  text-[var(--text)]
  focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)]
  transition-all duration-150 cursor-pointer
`

const makeEmpty = (): TaskFormData => ({
  id: 0,
  title: '',
  description: '',
  priority: 'medium',
  status: 'todo',
  points: 0,
  start_date: '',
  due_date: '',
  assignee_id: null,
  assigned_users: [],
})

export default function TaskModal({
  isOpen,
  onClose,
  task,
  projectId,
  users,
  onSuccess,
}: TaskModalProps) {
  const isEditMode = !!task?.id

  const getError = (field: string) => errors[field]?.[0]

  const { formData, set, setFormData, reset } = useFormState(makeEmpty())
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  
  const createMutation = useCreateTaskMutation()
  const updateMutation = useUpdateTaskMutation()
  const assignCollaborators = useAssignCollaboratorsMutation()

  const userOptions = users.map(u => ({ id: u.id, label: u.name || u.email }))

  useEffect(() => {
    if (task) {
      setFormData({
        id: task.id || 0,
        title: task.title,
        description: task.description || '',
        priority: task.priority,
        status: task.status,
        points: task.points || 0,
        start_date: task.start_date || '',
        due_date: task.due_date || '',
        assignee_id: task.assignee_id,
        assigned_users: task.assigned_users || [],
      })
    } else {
      reset()
      setErrors({})
    }
  }, [task, isOpen])

  const handleSubmit = async () => {
    setErrors({})

    const payload = {
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      status: formData.status,
      points: formData.points || undefined,
      start_date: formData.start_date || undefined,
      due_date: formData.due_date || undefined,
      project_id: projectId,
      assignee_id: formData.assignee_id || undefined,
    }

    try {
      const taskId = isEditMode ? task!.id : 0

      if (isEditMode) {
        await updateMutation.mutateAsync({ 
          id: task!.id, 
          payload 
        })
      } else {
        const result = await createMutation.mutateAsync({ payload })
        const response = result as unknown as { data?: { id: number } }
        if (!response.data?.id) {
          throw new Error('Failed to create task')
        }
      }

      if (formData.assigned_users.length > 0 && taskId) {
        await assignCollaborators.mutateAsync({
          taskId,
          userIds: formData.assigned_users,
        })
      }

      onSuccess?.()
      onClose()
    } catch (err: any) {
      if (err.status === 422 && err.data) {
        setErrors(err.data)
      } else {
        console.error('Error:', err)
      }
    }
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={isEditMode ? 'Edit Task' : 'Add Task'}
        size="screen-70"
      >
        <div className="divide-y divide-[var(--border)]">

          {/* Title */}
          <Row label="Title">
            <input
              type="text"
              value={formData.title}
              onChange={e => set('title', e.target.value)}
              placeholder="Task title"
              className={inputCls}
            />
            <FieldError msg={getError('title')} />
          </Row>

          {/* Description */}
          <Row label="Description" align="start">
            <textarea
              value={formData.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Describe the task..."
              rows={4}
              className={`${inputCls} resize-none`}
            />
            <FieldError msg={getError('description')} />
          </Row>

          {/* Status */}
          <Row label="Status" align="start">
            <div className="flex flex-wrap gap-2 pt-1">
              {statusOptions.map(s => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => set('status', s.value)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all duration-150 ${
                    formData.status === s.value
                      ? 'bg-[var(--primary)] text-white border-transparent'
                      : 'bg-[var(--input-bg)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--primary)] hover:text-[var(--text)]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <FieldError msg={getError('status')} />
          </Row>

          {/* Priority */}
          <Row label="Priority" align="start">
            <div className="flex flex-wrap gap-2 pt-1">
              {priorityOptions.map(p => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => set('priority', p.value as Priority)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all duration-150 ${
                    formData.priority === p.value
                      ? 'bg-[var(--primary)] text-white border-transparent'
                      : 'bg-[var(--input-bg)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--primary)] hover:text-[var(--text)]'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <FieldError msg={getError('priority')} />
          </Row>

          {/* Start Date & Due Date */}
          <div className="grid grid-cols-2 divide-x divide-[var(--border)]">
            <Row label="Start Date">
              <input
                type="date"
                value={formData.start_date}
                onChange={e => set('start_date', e.target.value)}
                className={inputCls}
              />
              <FieldError msg={getError('start_date')} />
            </Row>
            <Row label="Due Date">
              <input
                type="date"
                value={formData.due_date}
                onChange={e => set('due_date', e.target.value)}
                className={inputCls}
              />
              <FieldError msg={getError('due_date')} />
            </Row>
          </div>

          {/* Points */}
          <Row label="Points">
            <input
              type="number"
              value={formData.points || ''}
              onChange={e => set('points', Number(e.target.value) || 0)}
              placeholder="0"
              min="0"
              className={inputCls}
            />
            <FieldError msg={getError('points')} />
          </Row>

          {/* Assignee */}
          <Row label="Assignee">
            <div className="relative">
              <select
                value={formData.assignee_id || ''}
                onChange={e => set('assignee_id', e.target.value ? Number(e.target.value) : null)}
                className={selectCls}
              >
                <option value="">Unassigned</option>
                {users.map(u => (
                  <option key={u.id} value={u.id}>{u.name || u.email}</option>
                ))}
              </select>
              <ChevronDown />
            </div>
            <FieldError msg={getError('assignee_id')} />
          </Row>

          {/* Collaborators */}
          <Row label="Collaborators" align="start">
            <div className="pt-1">
              <MultiSelect
                options={userOptions}
                value={formData.assigned_users}
                onChange={val => set('assigned_users', val as number[])}
                placeholder="Select collaborators..."
                styles={{
                  trigger: 'min-h-[38px] flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-md bg-[var(--input-bg)] border border-transparent cursor-pointer focus-within:ring-1 focus-within:ring-[var(--primary)] transition-all duration-150',
                  chip: 'flex items-center gap-1 px-2 py-0.5 bg-[var(--primary)] text-white rounded text-xs font-medium',
                  dropdown: 'absolute mt-1 w-full bg-[var(--card)] border border-[var(--border)] rounded-md shadow-lg z-50 max-h-52 overflow-auto',
                  dropdownItem: 'px-3 py-2 cursor-pointer hover:bg-[var(--input-bg)] text-sm text-[var(--text)]',
                }}
              />
            </div>
            <FieldError msg={getError('assigned_users')} />
          </Row>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 pt-5 mt-4 border-t border-[var(--border)]">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium
              text-[var(--text-secondary)] hover:text-[var(--text)]
              border border-[var(--border)]
              bg-transparent hover:bg-[var(--card)]
              transition-all duration-150"
          >
            <X size={14} />
            Close
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!formData.title.trim() || createMutation.isPending || updateMutation.isPending}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium
              text-white bg-[var(--primary)] hover:opacity-90
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-150"
          >
            <Save size={14} />
            {isEditMode ? 'Update' : 'Save'}
          </button>
        </div>
      </Modal>

      {(createMutation.isPending || updateMutation.isPending) && (
        <AlertOverlay type="loading" message="Loading please wait ..." />
      )}
    </>
  )
}