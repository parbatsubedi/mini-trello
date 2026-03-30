import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import CreateProjectModal from '../../../components/modals/CreateProjectModal'
import { 
  Plus, 
  Search, 
  Grid3X3, 
  List,
  MoreHorizontal,
  Calendar,
  MoreVertical,
} from 'lucide-react'
import { useGetProject } from '../../../hooks/useProject'
import { AlertOverlay } from '../../../components/alert/Alert'
import type { Project } from '../../../types/project'

const statusOptions = ['All', 'Active', 'Review', 'Completed', 'Archived']

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [statusFilter, setStatusFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)

  useEffect(() => {
  const handleClickOutside = () => setOpenMenuId(null)
  window.addEventListener('click', handleClickOutside)
  return () => window.removeEventListener('click', handleClickOutside)
}, [])

  // Pagination state
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(9)

  const navigate = useNavigate()

  // API call with params
  const { data, isLoading, isError, error } = useGetProject({
    page,
    per_page: perPage,
    search: searchQuery || '',
    status: statusFilter || 'All'
  })

  const projects = data?.data ?? []
  const meta = data?.meta

  // Client-side filtering (optional)
  const filteredProjects = projects.filter(project => {
    const matchesStatus =
      statusFilter === 'All' ||
      project.status.toLowerCase() === statusFilter.toLowerCase()

    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesStatus && matchesSearch
  })

  if (isLoading) {
    return <AlertOverlay type="loading" message="Loading Projects..." />
  }

  if (isError) {
    return (
      <AlertOverlay
        type="error"
        message={error instanceof Error ? error.message : 'Something went wrong'}
      />
    )
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text)]">Projects</h1>
          <p className="text-[var(--text-secondary)]">
            Manage and organize your projects
          </p>
        </div>

        <button
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--primary)] text-white font-medium rounded-lg hover:opacity-90 transition-all"
          onClick={() => setCreateModalOpen(true)}
        >
          <Plus className="w-5 h-5" />
          New Project
        </button>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        
        {/* SEARCH */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[var(--card)] border border-[var(--border)] rounded-lg flex-1 max-w-md">
          <Search className="w-5 h-5 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setPage(1)
            }}
            className="bg-transparent border-none outline-none text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] flex-1"
          />
        </div>

        {/* STATUS FILTER */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => {
                setStatusFilter(status)
                setPage(1)
              }}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                statusFilter === status
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--card)] border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--border)]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* ROWS PER PAGE */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-[var(--text-secondary)]">Show:</span>
          <select
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value))
              setPage(1)
            }}
            className="px-2 py-1 rounded-lg border border-[var(--border)] bg-[var(--card)] text-sm"
          >
            <option value={6}>6</option>
            <option value={9}>9</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
          </select>
        </div>

        {/* VIEW MODE */}
        <div className="flex items-center gap-1 p-1 bg-[var(--card)] border border-[var(--border)] rounded-lg">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'grid' ? 'bg-[var(--primary)] text-white' : 'text-[var(--text-secondary)] hover:bg-[var(--border)]'
            }`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'list' ? 'bg-[var(--primary)] text-white' : 'text-[var(--text-secondary)] hover:bg-[var(--border)]'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* GRID VIEW */}
      {viewMode === 'grid' ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project, index) => (
            // <Link key={project.id} to={`/projects/${project.id}`}>
              <motion.div
                key={project.id}
                onClick={() => navigate(`/projects/${project.id}`)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-[var(--card)] border border-[var(--border)] rounded-xl relative hover:shadow-lg transition-shadow group h-full"
              >
                {/* Color Bar */}
                <div className="rounded-t-xl overflow-hidden">
                  <div className="h-1" style={{ backgroundColor: project.color }} />
                </div>
                
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
                        {project.name}
                      </h3>
                    <p className="text-sm text-[var(--text-secondary)] mt-1 line-clamp-2">
                    {project.description}
                  </p>
                  </div>
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setOpenMenuId(openMenuId === project.id ? null : project.id)
                      }}
                      className="p-1 rounded-lg hover:bg-[var(--border)] opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <MoreHorizontal className="w-4 h-4 text-[var(--text-secondary)]" />
                    </button>

                    <ActionMenu
                      isOpen={openMenuId === project.id}
                      onEdit={() => {
                        setSelectedProject(project)
                        setCreateModalOpen(true)
                        setOpenMenuId(null)
                      }}
                      onDelete={() => {
                        console.log('delete', project.id)
                        setOpenMenuId(null)
                      }}
                    />
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-[var(--text-secondary)]">Progress</span>
                    <span className="font-medium text-[var(--text)]">{project.progress}%</span>
                  </div>
                  <div className="h-2 bg-[var(--border)] rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all"
                      style={{ width: `${project.progress}%`, backgroundColor: project.color }}
                    />
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {project.end_date}
                    </span>
                  </div>
                  <div className="flex -space-x-2">
                    {project.members.slice(0, 3).map((member, i) => (
                      <div 
                        key={i}
                        className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-[var(--card)] flex items-center justify-center"
                      >
                        <span className="text-white text-xs font-medium">{member.name?.slice(0, 2).toUpperCase()}</span>
                      </div>
                    ))}
                    {project.members.length > 3 && (
                      <div className="w-7 h-7 rounded-full bg-[var(--border)] border-2 border-[var(--card)] flex items-center justify-center">
                        <span className="text-xs text-[var(--text-secondary)]">+{project.members.length - 3}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center justify-between">
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    project.status === 'active' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                    project.status === 'review' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  }`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">
                    {project.tasks_completed}/{project.total_tasks} tasks
                    </span>
                  </div>
                </div>
              </motion.div>
            // </Link>
          ))}
        </div>
      ) : (
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left px-5 py-3 text-sm font-medium text-[var(--text-secondary)]">Project</th>
                <th className="text-left px-5 py-3 text-sm font-medium text-[var(--text-secondary)]">Progress</th>
                <th className="text-left px-5 py-3 text-sm font-medium text-[var(--text-secondary)]">Tasks</th>
                <th className="text-left px-5 py-3 text-sm font-medium text-[var(--text-secondary)]">Due Date</th>
                <th className="text-left px-5 py-3 text-sm font-medium text-[var(--text-secondary)]">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => (
                <tr key={project.id} className="border-b border-[var(--border)]">
                  <td className="px-5 py-4">{project.name}</td>
                  <td className="px-5 py-4">{project.status}</td>
                  <td className="px-5 py-4">{project.end_date}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: project.color }} />
                      <div>
                        <div className="font-medium text-[var(--text)]">{project.name}</div>
                        <div className="text-sm text-[var(--text-secondary)]">{project.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-[var(--border)] rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full" 
                          style={{ width: `${project.progress}%`, backgroundColor: project.color }}
                        />
                      </div>
                      <span className="text-sm text-[var(--text-secondary)]">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">
                    {project.tasks_completed}/{project.total_tasks}
                  </td>
                  <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">{project.end_date}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                      project.status === 'active' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                      project.status === 'review' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-5 py-4 relative">
                      <button
                        onClick={() =>
                          setOpenMenuId(openMenuId === project.id ? null : project.id)
                        }
                        className="p-1 rounded-lg hover:bg-[var(--border)]"
                      >
                        <MoreVertical className="w-4 h-4 text-[var(--text-secondary)]" />
                      </button>

                      <ActionMenu
                        isOpen={openMenuId === project.id}
                        onEdit={() => {
                          setSelectedProject(project)
                          setCreateModalOpen(true)
                          setOpenMenuId(null)
                        }}
                        onDelete={() => {
                          console.log('delete', project.id)
                          setOpenMenuId(null)
                        }}
                      />
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* PAGINATION */}
      {meta && meta.last_page > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">

          <div className="text-sm text-[var(--text-secondary)]">
            Page {meta.current_page} of {meta.last_page}
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1.5 border rounded-lg disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: meta.last_page }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1.5 border rounded-lg ${
                  p === meta.current_page
                    ? 'bg-[var(--primary)] text-white'
                    : ''
                }`}
              >
                {p}
              </button>
            ))}

            <button
              disabled={page === meta.last_page}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1.5 border rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* MODAL */}
      {createModalOpen && (
        <CreateProjectModal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          selectedProject={selectedProject}
          onSuccess={() => setCreateModalOpen(false)}
        />
      )}
      

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--border)] flex items-center justify-center">
            <FolderKanban className="w-8 h-8 text-[var(--text-muted)]" />
          </div>
          <h3 className="text-lg font-medium text-[var(--text)]">No projects found</h3>
          <p className="text-[var(--text-secondary)] mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}

function FolderKanban(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
    </svg>
  )
}


function ActionMenu({
  isOpen,
  onEdit,
  onDelete,
}: {
  isOpen: boolean
  onEdit: () => void
  onDelete: () => void
}) {
  if (!isOpen) return null
  debugger;

  return (
    <div className="absolute right-0 mt-2 w-32 bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-lg z-50">
      <button
        onClick={(e) => { e.stopPropagation(); onEdit(); }}
        className="w-full text-left px-3 py-2 text-sm hover:bg-[var(--border)]"
      >
        Edit
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onDelete(); }}
        className="w-full text-left px-3 py-2 text-sm hover:bg-[var(--border)] text-red-500"
      >
        Delete
      </button>
    </div>
  )
}