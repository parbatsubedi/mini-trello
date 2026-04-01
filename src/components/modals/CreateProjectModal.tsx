import Modal from '../ui/Modal'
import { useEffect, useState } from 'react'
import { useCreateProjectMutation, useUpdateProjectMutation } from '../../hooks/useProject'

import { AlertOverlay } from '../alert/Alert'
import { Save, X, Globe, Lock } from 'lucide-react'
import { MultiSelect } from '../select/multiSelect'
import { ChevronDown } from '../ui/chevronDown'
import { Row } from '../ui/row'
import { useFormState } from '../../hooks/form/useFormState'
import { useLabels } from '../../hooks/useLabels'
import { useClient } from '../../hooks/useClient'
import { useUsers } from '../../hooks/useUser'
import { FieldError } from '../errors/fieldError'
import type { Project, ProjectPayload } from '../../types/types'

type CreateProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedProject: Project | null;
  onSuccess?: () => void;
}


const statusOptions = [
  { value: 'active',    label: 'Active'    },
  { value: 'on_hold',   label: 'On Hold'   },
  { value: 'review',    label: 'In Review' },
  { value: 'completed', label: 'Completed' },
  { value: 'archived',  label: 'Archived'  },
]

const projectTypeOptions = [
  { value: 'client_project', label: 'Client Project'   },
  { value: 'internal',       label: 'Internal Project'  },
  { value: 'research',       label: 'Research Project'  },
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



// ─── Form defaults ──────────────────────────────────────────────────────────────
const makeEmpty = () => ({
  id:           0,
  name:         '',
  description:  '',
  project_type: 'client_project',
  status:       'active',
  visibility:   'open' as 'open' | 'closed',
  startDate:    '',
  dueDate:      '',
  price:        '',
  client_id:    0,
  color:        '#3B82F6',
  members:      [] as number[],
  labels:       [] as number[],
})


export default function CreateProjectModal({
  isOpen,
  onClose,
  selectedProject,
  onSuccess,
}: CreateProjectModalProps) {
  const isEditMode = !!selectedProject
const getError = (field: string) => errors[field]?.[0]

const { formData, set ,setFormData, reset} = useFormState(makeEmpty())
const [errors, setErrors]     = useState<Record<string, string[]>>({})
const createMutation = useCreateProjectMutation()
const updateMutation = useUpdateProjectMutation()

const { data: labelOptions =[] } = useLabels(['project', 'both'])
const {data : clientOptions = []} = useClient()
const { data: memberOptions} = useUsers()

console.log('Label options:', memberOptions?.data || [])

const selectOptions = memberOptions?.data.map(u => ({ id: u.id, label: u.name })) || []

  useEffect(() => {
    if (selectedProject) {
      const memberIds = selectedProject.members?.map(m =>
        typeof m.id === 'string' ? parseInt(m.id, 10) : Number(m.id)
      ) ?? []
      const labelIds = selectedProject.labels?.map(l => l.id) ?? []

      console.log('Selected project:', selectedProject)
      setFormData({
        id:           selectedProject.id,
        name:         selectedProject.name,
        description:  selectedProject.description,
        project_type: selectedProject.project_type ?? 'client_project',
        color:        selectedProject.color ?? '#3B82F6',
        status:       selectedProject.status,
        visibility:   selectedProject.visibility ?? 'open',
        startDate:    selectedProject.start_date ?? '',
        dueDate:      selectedProject.end_date ?? '',
        price:        selectedProject.price != null ? String(selectedProject.price) : '',
        client_id:    selectedProject.client_id ?? 0,
        members:      memberIds,
        labels:       labelIds,
      })
    } else {
      reset()
      setErrors({})
    }
  }, [selectedProject, isOpen])

  const handleSubmit = async (keepOpen = false) => {
    setErrors({})

    const payload: ProjectPayload = {
      name:         formData.name,
      description:  formData.description,
      status:       formData.status,
      visibility:   formData.visibility,
      start_date:   formData.startDate,
      end_date:     formData.dueDate,
      members:      formData.members,
      labels:       formData.labels,
      project_type: formData.project_type,
      price:        parseFloat(formData.price) || 0,
      client_id:    formData.client_id || undefined,
      color:        formData.color,
    }

    try {
      if (isEditMode) {
        await updateMutation.mutateAsync({ id: selectedProject!.id, payload })
      } else {
        await createMutation.mutateAsync({ payload })
      }
      onSuccess?.()
      if (!keepOpen) {
        onClose()
      } else {
        setFormData(makeEmpty())
        setErrors({})
      }
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
        title={isEditMode ? 'Edit Project' : 'Add project'}
        size="screen-70"
      >
        <div className="divide-y divide-[var(--border)]">

          {/* Title */}
          <Row label="Title">
            <input
              type="text"
              value={formData.name}
              onChange={e => set('name', e.target.value)}
              placeholder="Project title"
              className={inputCls}
            />
            <FieldError msg={getError('name')} />
          </Row>

          {/* Project type */}
          <Row label="Project type">
            <div className="relative">
              <select
                value={formData.project_type}
                onChange={e => set('project_type', e.target.value)}
                className={selectCls}
              >
                {projectTypeOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown />
            </div>
            <FieldError msg={getError('project_type')} />
          </Row>

          {/* Client */}
          <Row label="Client">
            <div className="relative">
              <select
                value={formData.client_id}
                onChange={e => set('client_id', Number(e.target.value))}
                className={selectCls}
              >
                {clientOptions.map(opt => (
                  <option key={opt.id} value={opt.id}>{opt.name}</option>
                ))}
              </select>
              <ChevronDown />
            </div>
            <FieldError msg={getError('client_id')} />
          </Row>

          {/* Description */}
          <Row label="Description" align="start">
            <textarea
              value={formData.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Describe the project..."
              rows={4}
              className={`${inputCls} resize-none`}
            />
            <FieldError msg={getError('description')} />
          </Row>

          {/* Start date */}
          <Row label="Start date">
            <input
              type="date"
              value={formData.startDate}
              onChange={e => set('startDate', e.target.value)}
              className={inputCls}
            />
            <FieldError msg={getError('start_date')} />
          </Row>

          {/* Deadline */}
          <Row label="Deadline">
            <input
              type="date"
              value={formData.dueDate}
              onChange={e => set('dueDate', e.target.value)}
              className={inputCls}
            />
            <FieldError msg={getError('end_date')} />
          </Row>

          {/* Price */}
          <Row label="Price">
            <input
              type="number"
              value={formData.price}
              onChange={e => set('price', e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              className={inputCls}
            />
            <FieldError msg={getError('price')} />
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

          {/* Visibility */}
          <Row label="Visibility" align="start">
            <div className="flex gap-3 pt-1">
              {/* Open */}
              <button
                type="button"
                onClick={() => set('visibility', 'open')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-150 ${
                  formData.visibility === 'open'
                    ? 'bg-[var(--primary)] text-white border-transparent'
                    : 'bg-[var(--input-bg)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--primary)] hover:text-[var(--text)]'
                }`}
              >
                <Globe className="w-4 h-4" />
                Open
              </button>

              {/* Private */}
              <button
                type="button"
                onClick={() => set('visibility', 'closed')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-150 ${
                  formData.visibility === 'closed'
                    ? 'bg-[var(--text)] text-[var(--bg)] border-transparent'
                    : 'bg-[var(--input-bg)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--primary)] hover:text-[var(--text)]'
                }`}
              >
                <Lock className="w-4 h-4" />
                Private
              </button>
            </div>

            {/* Contextual hint */}
            <p className="text-xs text-[var(--text-secondary)] mt-2">
              {formData.visibility === 'open'
                ? 'Public — all workspace members can view and join this project.'
                : 'Private — only invited members can access this project.'}
            </p>
            <FieldError msg={getError('visibility')} />
          </Row>

          {/* Members */}
          <Row label="Members" align="start">
            <div className="pt-1">
              <MultiSelect
                options={selectOptions}
                value={formData.members}
                onChange={val => set('members', val as number[])}
                placeholder="Select team members..."
                styles={{
                  trigger: 'min-h-[38px] flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-md bg-[var(--input-bg)] border border-transparent cursor-pointer focus-within:ring-1 focus-within:ring-[var(--primary)] transition-all duration-150',
                  chip: 'flex items-center gap-1 px-2 py-0.5 bg-[var(--primary)] text-white rounded text-xs font-medium',
                  dropdown: 'absolute mt-1 w-full bg-[var(--card)] border border-[var(--border)] rounded-md shadow-lg z-50 max-h-52 overflow-auto',
                  dropdownItem: 'px-3 py-2 cursor-pointer hover:bg-[var(--input-bg)] text-sm text-[var(--text)]',
                }}
              />
            </div>
            <FieldError msg={getError('members')} />
          </Row>

          {/* Labels */}
          <Row label="Labels" align="start">
            <div className="flex flex-wrap gap-2 pt-1">
              {labelOptions.map(option => {
                const selected = formData.labels.includes(option.id)
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      const newLabels = selected
                        ? formData.labels.filter(id => id !== option.id)
                        : [...formData.labels, option.id]
                      set('labels', newLabels)
                    }}
                    className={`
                      inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
                      border transition-all duration-150
                      ${selected
                        ? 'border-transparent text-white'
                        : 'bg-[var(--input-bg)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--primary)] hover:text-[var(--text)]'
                      }
                    `}
                    style={selected && option.color ? { backgroundColor: option.color } : undefined}
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: option.color }}
                    />
                    {option.name}
                    {selected && <X className="w-2.5 h-2.5 opacity-80" />}
                  </button>
                )
              })}
            </div>
            <FieldError msg={getError('labels')} />
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

          {!isEditMode && (
          <button
            type="button"
            onClick={() => handleSubmit(true)}
            disabled={createMutation.isPending || updateMutation.isPending}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium
              text-[var(--primary)] border border-[var(--primary)]
              bg-transparent hover:bg-[var(--primary)] hover:text-white
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-150"
          >
              <Save size={14} />
              Save &amp; continue
            </button>
          )}

          <button
            type="button"
            onClick={() => handleSubmit(false)}
            disabled={createMutation.isPending || updateMutation.isPending}
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

  {(createMutation.isPending || updateMutation.isPending) && <AlertOverlay type="loading" message="Loading please wait ..." />}
    </>
  )
}
