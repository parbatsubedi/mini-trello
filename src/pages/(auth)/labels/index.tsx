import { Building2, Edit2, Search, Trash2, UserPlus, X, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useLabels, useCreateLabelMutation, useUpdateLabelMutation, useDeleteLabelMutation } from "../../../hooks/useLabels"
import { AlertOverlay } from "../../../components/alert/Alert";
import Modal from "../../../components/ui/Modal";
import { useFormState } from "../../../hooks/form/useFormState";
import { ChevronDown } from "../../../components/ui/chevronDown";
import type { Label } from "../../../types/types";

type LabelFormData = {
  id: number;
  name: string;
  color: string;
  type: 'task' | 'project' | 'both';
}

const makeEmpty = (): LabelFormData => ({
  id: 0,
  name: '',
  color: '#3B82F6',
  type: 'task',
})

const typeOptions = [
  { value: 'task', label: 'Task' },
  { value: 'project', label: 'Project' },
  { value: 'both', label: 'Both' },
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

type FilterState = {
  search: string;
  types: ('task' | 'project' | 'both')[];
  page: number;
  per_page: number;
}

export default function LabelsPage() {
    const [filters, setFilters] = useState<FilterState>({
        search: '',
        types: [],
        page: 1,
        per_page: 10,
    })
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedLabel, setSelectedLabel] = useState<Label | null>(null)
    const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)

    const createMutation = useCreateLabelMutation()
    const updateMutation = useUpdateLabelMutation()
    const deleteMutation = useDeleteLabelMutation()

    const { formData, set, setFormData, reset } = useFormState(makeEmpty())

    const { data: labelsData, isLoading, isError, error } = useLabels({
        search: filters.search,
        types: filters.types,
        page: filters.page,
        per_page: filters.per_page,
    })

    const labels = labelsData?.data ?? []
    const meta = labelsData?.meta
    const links = labelsData?.links

    // Debounced search
    const [searchDebounce, setSearchDebounce] = useState('')
    useEffect(() => {
        const timer = setTimeout(() => {
            setFilters(prev => ({ ...prev, search: searchDebounce, page: 1 }))
        }, 300)
        return () => clearTimeout(timer)
    }, [searchDebounce])

    const handleFilterByType = (type: string) => {
        if (type === 'all') {
            setFilters(prev => ({ ...prev, types: [], page: 1 }))
        } else {
            setFilters(prev => ({ ...prev, types: [type as 'task' | 'project' | 'both'], page: 1 }))
        }
    }

    const handlePageChange = (page: number) => {
        setFilters(prev => ({ ...prev, page }))
    }

    const handlePerPageChange = (per_page: number) => {
        setFilters(prev => ({ ...prev, per_page, page: 1 }))
    }

    const handleOpenCreate = () => {
        setSelectedLabel(null)
        reset()
        setIsModalOpen(true)
    }

    const handleOpenEdit = (label: Label) => {
        setSelectedLabel(label)
        setFormData({
            id: label.id,
            name: label.name,
            color: label.color,
            type: label.type,
        })
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedLabel(null)
        reset()
    }

    const handleSubmit = async (keepOpen = false) => {
        try {
            if (selectedLabel) {
                await updateMutation.mutateAsync({
                    id: selectedLabel.id,
                    data: {
                        name: formData.name,
                        color: formData.color,
                        type: formData.type,
                    }
                })
            } else {
                await createMutation.mutateAsync({
                    name: formData.name,
                    color: formData.color,
                    type: formData.type,
                })
            }

            if (!keepOpen) {
                handleCloseModal()
            } else {
                reset()
            }
        } catch (err: any) {
            console.error('Error saving label:', err)
        }
    }

    const handleDelete = async (id: number) => {
        try {
            await deleteMutation.mutateAsync(id)
            setDeleteConfirm(null)
        } catch (err: any) {
            console.error('Error deleting label:', err)
        }
    }

    const colorPresets = [
        '#EF4444', '#F97316', '#F59E0B', '#EAB508',
        '#84CC16', '#22C55E', '#14B8A6', '#06B6D4',
        '#3B82F6', '#6366F1', '#8B5CF6', '#A855F7',
        '#D946EF', '#EC4899', '#F43F5E', '#000000',
    ]

    if (isLoading) {
        return <AlertOverlay type="loading" message="Loading labels..." />
    }

    if (isError) {
        return (
            <AlertOverlay
                type="error"
                message={error instanceof Error ? error.message : 'Something went wrong while fetching labels'}
            />
        )
    }

    return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text)]">Labels</h1>
          <p className="text-[var(--text-secondary)]">Manage your label categories and their properties</p>
        </div>
        <button 
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--primary)] text-white font-medium rounded-lg hover:opacity-90 transition-all"
        >
          <UserPlus className="w-5 h-5" />
          Add Label
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-[var(--card)] border border-[var(--border)] rounded-lg flex-1 max-w-md">
          <Search className="w-5 h-5 text-[var(--text-muted)]" />
          <input
            type="text"
            value={searchDebounce}
            onChange={(e) => setSearchDebounce(e.target.value)}
            placeholder="Search labels..."
            className="bg-transparent border-none outline-none text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] flex-1"
          />
        </div>

        <div className="relative">
          <select
            value={filters.types.length === 0 ? 'all' : filters.types[0]}
            onChange={(e) => handleFilterByType(e.target.value)}
            className={selectCls}
          >
            <option value="all">All Types</option>
            <option value="task">Task</option>
            <option value="project">Project</option>
            <option value="both">Both</option>
          </select>
          <ChevronDown />
        </div>
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left px-5 py-3 text-sm font-medium text-[var(--text-secondary)]">Name</th>
                <th className="text-left px-5 py-3 text-sm font-medium text-[var(--text-secondary)]">Color</th>
                <th className="text-left px-5 py-3 text-sm font-medium text-[var(--text-secondary)]">Type</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>

            <tbody>
                {labels.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-8 text-center text-[var(--text-secondary)]">
                      {filters.search || filters.types.length > 0
                        ? 'No labels match your filters'
                        : 'No labels found. Create one to get started.'}
                    </td>
                  </tr>
                ) : (
                  labels.map((label) => (
                    <tr key={label.id} className="border-b border-[var(--border)]">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="font-medium text-[var(--text)]">{label.name}</div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className="inline-block w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: label.color }}
                        ></span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                          <Building2 className="w-4 h-4" />
                          <span className="capitalize">{label.type}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => handleOpenEdit(label)}
                            className="p-1.5 rounded-lg hover:bg-[var(--border)] transition-colors"
                          >
                            <Edit2 className="w-4 h-4 text-[var(--text-secondary)]" />
                          </button>
                          <button 
                            onClick={() => setDeleteConfirm(label.id)}
                            className="p-1.5 rounded-lg hover:bg-[var(--border)] transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-lg">
          {/* Left: Per-page dropdown */}
          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <span>Show</span>
            <div className="relative">
              <select
                value={filters.per_page}
                onChange={(e) => handlePerPageChange(Number(e.target.value))}
                className="px-3 py-1.5 pr-8 bg-[var(--input-bg)] border border-[var(--border)] rounded-md text-[var(--text)] outline-none focus:ring-2 focus:ring-[var(--primary)] appearance-none cursor-pointer"
              >
                {[5, 10, 20, 50, 100].map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
              <ChevronDown />
            </div>
            <span>entries</span>
          </div>

          {/* Right: Page info + navigation */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Page info */}
            {meta && (
              <div className="text-sm text-[var(--text-secondary)] whitespace-nowrap">
                Showing {meta.from} to {meta.to} of {meta.total} results
              </div>
            )}

            {/* Page navigation - only show if more than 1 page */}
            {meta && meta.last_page > 1 && (
              <div className="flex items-center gap-1">
                {/* First page */}
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={filters.page === 1}
                  className="p-1.5 rounded-md hover:bg-[var(--border)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronsLeft className="w-4 h-4 text-[var(--text-secondary)]" />
                </button>

                {/* Previous page */}
                <button
                  onClick={() => handlePageChange(filters.page - 1)}
                  disabled={filters.page === 1}
                  className="p-1.5 rounded-md hover:bg-[var(--border)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4 text-[var(--text-secondary)]" />
                </button>

                {/* Page numbers */}
                {Array.from({ length: Math.min(5, meta.last_page) }, (_, i) => {
                  let pageNum: number
                  if (meta.last_page <= 5) {
                    pageNum = i + 1
                  } else if (filters.page <= 3) {
                    pageNum = i + 1
                  } else if (filters.page >= meta.last_page - 2) {
                    pageNum = meta.last_page - 4 + i
                  } else {
                    pageNum = filters.page - 2 + i
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`min-w-[32px] h-8 rounded-md text-sm font-medium transition-colors ${
                        filters.page === pageNum
                          ? 'bg-[var(--primary)] text-white'
                          : 'hover:bg-[var(--border)] text-[var(--text-secondary)]'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}

                {/* Next page */}
                <button
                  onClick={() => handlePageChange(filters.page + 1)}
                  disabled={filters.page === meta.last_page}
                  className="p-1.5 rounded-md hover:bg-[var(--border)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4 text-[var(--text-secondary)]" />
                </button>

                {/* Last page */}
                <button
                  onClick={() => handlePageChange(meta.last_page)}
                  disabled={filters.page === meta.last_page}
                  className="p-1.5 rounded-md hover:bg-[var(--border)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronsRight className="w-4 h-4 text-[var(--text-secondary)]" />
                </button>
              </div>
            )}
          </div>
        </div>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedLabel ? 'Edit Label' : 'Create Label'}
        size="md"
      >
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="Label name"
              className={inputCls}
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1">Type</label>
            <div className="relative">
              <select
                value={formData.type}
                onChange={(e) => set('type', e.target.value as 'task' | 'project' | 'both')}
                className={selectCls}
              >
                {typeOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown />
            </div>
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-2">Color</label>
            <div className="grid grid-cols-8 gap-2 mb-3">
              {colorPresets.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => set('color', color)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    formData.color === color ? 'border-[var(--primary)] scale-110' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={formData.color}
                onChange={(e) => set('color', e.target.value)}
                className="w-10 h-10 rounded cursor-pointer"
              />
              <input
                type="text"
                value={formData.color}
                onChange={(e) => set('color', e.target.value)}
                placeholder="#000000"
                className={`${inputCls} flex-1`}
              />
            </div>
          </div>

          {/* Preview */}
          {formData.name && (
            <div>
              <label className="block text-sm font-medium text-[var(--text)] mb-2">Preview</label>
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: formData.color }}
              >
                {formData.name}
              </span>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-4 border-t border-[var(--border)]">
            <button
              type="button"
              onClick={handleCloseModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium
                text-[var(--text-secondary)] hover:text-[var(--text)]
                border border-[var(--border)]
                bg-transparent hover:bg-[var(--card)]
                transition-all duration-150"
            >
              <X size={14} />
              Close
            </button>

            {!selectedLabel && (
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
                Save & continue
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
              {selectedLabel ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        title="Delete Label"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-[var(--text-secondary)]">
            Are you sure you want to delete this label? This action cannot be undone.
          </p>
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setDeleteConfirm(null)}
              className="px-4 py-2 rounded-md text-sm font-medium
                text-[var(--text-secondary)] hover:text-[var(--text)]
                border border-[var(--border)]
                bg-transparent hover:bg-[var(--card)]
                transition-all duration-150"
            >
              Cancel
            </button>
            <button
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
              disabled={deleteMutation.isPending}
              className="px-4 py-2 rounded-md text-sm font-medium
                text-white bg-red-500 hover:bg-red-600
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-150"
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Loading Overlay */}
      {(createMutation.isPending || updateMutation.isPending || deleteMutation.isPending) && (
        <AlertOverlay type="loading" message="Saving label..." />
      )}
    </div>
    )
}