import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Plus, 
  Search, 
  Grid3X3, 
  List,
  MoreHorizontal,
  Calendar,
  MoreVertical
} from 'lucide-react'

const projects = [
  { 
    id: 1, 
    name: 'Website Redesign', 
    description: 'Complete overhaul of company website with modern design',
    color: '#3B82F6',
    progress: 75,
    members: ['SK', 'MR', 'JD', 'EW'],
    tasks: { total: 24, completed: 18 },
    dueDate: 'Mar 28, 2026',
    status: 'active'
  },
  { 
    id: 2, 
    name: 'Mobile App Launch', 
    description: 'iOS and Android app for customer engagement',
    color: '#8B5CF6',
    progress: 45,
    members: ['LM', 'JK', 'RW', 'TH', 'MB', 'CP'],
    tasks: { total: 32, completed: 14 },
    dueDate: 'Apr 15, 2026',
    status: 'active'
  },
  { 
    id: 3, 
    name: 'Marketing Campaign', 
    description: 'Q2 marketing initiatives and social media strategy',
    color: '#10B981',
    progress: 90,
    members: ['AS', 'DR', 'FN'],
    tasks: { total: 15, completed: 13 },
    dueDate: 'Mar 20, 2026',
    status: 'review'
  },
  { 
    id: 4, 
    name: 'Backend Migration', 
    description: 'Migrate legacy systems to new infrastructure',
    color: '#F59E0B',
    progress: 30,
    members: ['JP', 'QS', 'VZ', 'GH', 'KL'],
    tasks: { total: 28, completed: 8 },
    dueDate: 'May 30, 2026',
    status: 'active'
  },
  { 
    id: 5, 
    name: 'Brand Guidelines', 
    description: 'Create comprehensive brand identity document',
    color: '#EF4444',
    progress: 100,
    members: ['YT', 'RE'],
    tasks: { total: 8, completed: 8 },
    dueDate: 'Mar 10, 2026',
    status: 'completed'
  },
  { 
    id: 6, 
    name: 'SEO Optimization', 
    description: 'Improve search engine rankings and visibility',
    color: '#06B6D4',
    progress: 60,
    members: ['AB', 'CD'],
    tasks: { total: 20, completed: 12 },
    dueDate: 'Apr 5, 2026',
    status: 'active'
  },
]

const statusOptions = ['All', 'Active', 'Review', 'Completed', 'Archived']

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [statusFilter, setStatusFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProjects = projects.filter(project => {
    const matchesStatus = statusFilter === 'All' || project.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text)]">Projects</h1>
          <p className="text-[var(--text-secondary)]">Manage and organize your projects</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--primary)] text-white font-medium rounded-lg hover:opacity-90 transition-all">
          <Plus className="w-5 h-5" />
          New Project
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[var(--card)] border border-[var(--border)] rounded-lg flex-1 max-w-md">
          <Search className="w-5 h-5 text-[var(--text-muted)]" />
          <input 
            type="text" 
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] flex-1"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
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

        {/* View Mode */}
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

      {/* Projects Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project, index) => (
            <Link key={project.id} to={`/projects/${project.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden hover:shadow-lg transition-shadow group h-full"
              >
                {/* Color Bar */}
                <div className="h-1" style={{ backgroundColor: project.color }} />
                
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
                  <button className="p-1 rounded-lg hover:bg-[var(--border)] opacity-0 group-hover:opacity-100 transition-all">
                    <MoreHorizontal className="w-4 h-4 text-[var(--text-secondary)]" />
                  </button>
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
                      {project.dueDate}
                    </span>
                  </div>
                  <div className="flex -space-x-2">
                    {project.members.slice(0, 3).map((member, i) => (
                      <div 
                        key={i}
                        className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-[var(--card)] flex items-center justify-center"
                      >
                        <span className="text-white text-xs font-medium">{member}</span>
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
                    {project.tasks.completed}/{project.tasks.total} tasks
                  </span>
                </div>
              </div>
            </motion.div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
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
                <tr key={project.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg)] transition-colors">
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
                    {project.tasks.completed}/{project.tasks.total}
                  </td>
                  <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">{project.dueDate}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                      project.status === 'active' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                      project.status === 'review' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button className="p-1.5 rounded-lg hover:bg-[var(--border)]">
                      <MoreVertical className="w-4 h-4 text-[var(--text-secondary)]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
