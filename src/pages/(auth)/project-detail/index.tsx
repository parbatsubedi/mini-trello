import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  ArrowLeft,
  MoreHorizontal,
  Search,
  Plus,
  LayoutGrid,
  List,
  Calendar,
  Users,
  Lock,
  Globe,
  Clock,
  MessageSquare,
  Paperclip,
  MoreVertical,
  Edit,
  UserPlus,
  X
} from 'lucide-react'

type TabType = 'overview' | 'tasks' | 'team' | 'settings'

interface Task {
  id: number
  title: string
  description: string
  status: 'todo' | 'in_progress' | 'review' | 'done'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assignee?: { name: string; avatar: string; color: string }
  dueDate?: string
  tags: string[]
  comments: number
  attachments: number
}

interface TeamMember {
  id: number
  name: string
  email: string
  avatar: string
  color: string
  role: 'owner' | 'admin' | 'member' | 'viewer'
}

const sampleTasks: Task[] = [
  { id: 1, title: 'Design homepage mockup', description: 'Create initial wireframes and high-fidelity designs', status: 'done', priority: 'high', assignee: { name: 'Sarah K', avatar: 'SK', color: 'from-blue-400 to-cyan-400' }, dueDate: 'Mar 15', tags: ['Design', 'UX'], comments: 5, attachments: 2 },
  { id: 2, title: 'Implement authentication', description: 'Set up login/signup with JWT tokens', status: 'done', priority: 'urgent', assignee: { name: 'Mike R', avatar: 'MR', color: 'from-purple-400 to-pink-400' }, dueDate: 'Mar 18', tags: ['Backend', 'Security'], comments: 12, attachments: 0 },
  { id: 3, title: 'Build API endpoints', description: 'Create REST API for user management', status: 'in_progress', priority: 'high', assignee: { name: 'John D', avatar: 'JD', color: 'from-orange-400 to-red-400' }, dueDate: 'Mar 25', tags: ['Backend', 'API'], comments: 3, attachments: 1 },
  { id: 4, title: 'Write unit tests', description: 'Add comprehensive test coverage', status: 'in_progress', priority: 'medium', assignee: { name: 'Emily W', avatar: 'EW', color: 'from-green-400 to-emerald-400' }, dueDate: 'Mar 28', tags: ['Testing'], comments: 0, attachments: 0 },
  { id: 5, title: 'Design dashboard layout', description: 'Create responsive dashboard UI', status: 'review', priority: 'medium', assignee: { name: 'Sarah K', avatar: 'SK', color: 'from-blue-400 to-cyan-400' }, dueDate: 'Mar 22', tags: ['Design', 'UI'], comments: 8, attachments: 3 },
  { id: 6, title: 'Setup CI/CD pipeline', description: 'Configure GitHub Actions for deployment', status: 'todo', priority: 'high', assignee: { name: 'Lisa M', avatar: 'LM', color: 'from-indigo-400 to-purple-400' }, dueDate: 'Apr 1', tags: ['DevOps'], comments: 2, attachments: 0 },
  { id: 7, title: 'Mobile responsive fixes', description: 'Fix layout issues on mobile devices', status: 'todo', priority: 'low', assignee: { name: 'Tom H', avatar: 'TH', color: 'from-pink-400 to-rose-400' }, dueDate: 'Apr 5', tags: ['Frontend', 'Mobile'], comments: 1, attachments: 0 },
  { id: 8, title: 'Performance optimization', description: 'Improve load times and bundle size', status: 'todo', priority: 'medium', dueDate: 'Apr 10', tags: ['Performance'], comments: 0, attachments: 0 },
]

const sampleTeam: TeamMember[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', avatar: 'JD', color: 'from-orange-400 to-red-400', role: 'owner' },
  { id: 2, name: 'Sarah Kim', email: 'sarah@example.com', avatar: 'SK', color: 'from-blue-400 to-cyan-400', role: 'admin' },
  { id: 3, name: 'Mike Roberts', email: 'mike@example.com', avatar: 'MR', color: 'from-purple-400 to-pink-400', role: 'member' },
  { id: 4, name: 'Emily Watson', email: 'emily@example.com', avatar: 'EW', color: 'from-green-400 to-emerald-400', role: 'member' },
  { id: 5, name: 'Lisa Martinez', email: 'lisa@example.com', avatar: 'LM', color: 'from-indigo-400 to-purple-400', role: 'viewer' },
]

const project = {
  id: 1,
  name: 'Website Redesign',
  description: 'Complete overhaul of company website with modern design, improved UX, and better performance.',
  color: '#3B82F6',
  progress: 75,
  isPublic: false,
  createdAt: 'Jan 15, 2026',
  dueDate: 'Mar 28, 2026',
  status: 'active',
  owner: { name: 'John Doe', avatar: 'JD' }
}

const statusColumns = [
  { id: 'todo', label: 'To Do', color: 'bg-gray-500' },
  { id: 'in_progress', label: 'In Progress', color: 'bg-blue-500' },
  { id: 'review', label: 'In Review', color: 'bg-yellow-500' },
  { id: 'done', label: 'Done', color: 'bg-green-500' },
]

const priorityColors = {
  low: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
  medium: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  high: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  urgent: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

export default function ProjectDetailPage() {
  const [activeTab, setActiveTab] = useState<TabType>('tasks')
  const [viewMode, setViewMode] = useState<'board' | 'list'>('board')
  const [searchQuery, setSearchQuery] = useState('')
  const [isPublic, setIsPublic] = useState(project.isPublic)
  const [showNewTaskModal, setShowNewTaskModal] = useState(false)
  const [showAddMemberModal, setShowAddMemberModal] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [assigneeFilter, setAssigneeFilter] = useState<string>('all')

  const filteredTasks = sampleTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter
    const matchesAssignee = assigneeFilter === 'all' || 
      (assigneeFilter === 'unassigned' && !task.assignee) ||
      (task.assignee && task.assignee.name.toLowerCase().includes(assigneeFilter.toLowerCase()))
    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee
  })

  const getTasksByStatus = (status: string) => filteredTasks.filter(t => t.status === status)

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'tasks', label: 'Tasks' },
    { id: 'team', label: 'Team' },
    { id: 'settings', label: 'Settings' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="flex items-start gap-4">
          <Link 
            to="/projects" 
            className="p-2 rounded-lg bg-[var(--card)] border border-[var(--border)] hover:bg-[var(--border)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[var(--text-secondary)]" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: project.color }} />
              <h1 className="text-2xl font-bold text-[var(--text)]">{project.name}</h1>
              <button 
                onClick={() => setIsPublic(!isPublic)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                  isPublic 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
                }`}
              >
                {isPublic ? <Globe className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                {isPublic ? 'Public' : 'Private'}
              </button>
            </div>
            <p className="text-[var(--text-secondary)] mt-1 max-w-2xl">{project.description}</p>
            <div className="flex items-center gap-4 mt-3 text-sm text-[var(--text-secondary)]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                Due {project.dueDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                {sampleTeam.length} members
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {sampleTeam.slice(0, 4).map((member) => (
              <div 
                key={member.id}
                className={`w-8 h-8 rounded-full bg-gradient-to-br ${member.color} border-2 border-[var(--card)] flex items-center justify-center`}
                title={member.name}
              >
                <span className="text-white text-xs font-medium">{member.avatar}</span>
              </div>
            ))}
            {sampleTeam.length > 4 && (
              <div className="w-8 h-8 rounded-full bg-[var(--border)] border-2 border-[var(--card)] flex items-center justify-center">
                <span className="text-xs text-[var(--text-secondary)]">+{sampleTeam.length - 4}</span>
              </div>
            )}
          </div>
          <button className="p-2 rounded-lg bg-[var(--card)] border border-[var(--border)] hover:bg-[var(--border)]">
            <MoreHorizontal className="w-5 h-5 text-[var(--text-secondary)]" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[var(--border)]">
        <div className="flex items-center gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[var(--primary)] text-[var(--primary)]'
                  : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Progress Overview */}
          <div className="lg:col-span-2 bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
            <h3 className="font-semibold text-[var(--text)] mb-4">Progress Overview</h3>
            <div className="space-y-4">
              {statusColumns.map((column) => {
                const count = sampleTasks.filter(t => t.status === column.id).length
                const total = sampleTasks.length
                const percentage = Math.round((count / total) * 100)
                return (
                  <div key={column.id}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${column.color}`} />
                        <span className="text-sm text-[var(--text)]">{column.label}</span>
                      </div>
                      <span className="text-sm text-[var(--text-secondary)]">{count} tasks</span>
                    </div>
                    <div className="h-2 bg-[var(--border)] rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${column.color} rounded-full transition-all`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
              <h3 className="font-semibold text-[var(--text)] mb-4">Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-secondary)]">Total Tasks</span>
                  <span className="font-semibold text-[var(--text)]">{sampleTasks.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-secondary)]">Completed</span>
                  <span className="font-semibold text-green-500">{sampleTasks.filter(t => t.status === 'done').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-secondary)]">In Progress</span>
                  <span className="font-semibold text-blue-500">{sampleTasks.filter(t => t.status === 'in_progress').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-secondary)]">Overdue</span>
                  <span className="font-semibold text-red-500">1</span>
                </div>
              </div>
            </div>

            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
              <h3 className="font-semibold text-[var(--text)] mb-4">Team</h3>
              <div className="space-y-3">
                {sampleTeam.slice(0, 5).map((member) => (
                  <div key={member.id} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center`}>
                      <span className="text-white text-xs font-medium">{member.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--text)] truncate">{member.name}</p>
                      <p className="text-xs text-[var(--text-secondary)]">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tasks' && (
        <div className="space-y-4">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <div className="flex items-center gap-2 px-3 py-2 bg-[var(--card)] border border-[var(--border)] rounded-lg flex-1">
                <Search className="w-4 h-4 text-[var(--text-muted)]" />
                <input 
                  type="text" 
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] w-full"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Filters */}
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-[var(--card)] border border-[var(--border)] rounded-lg text-sm text-[var(--text)]"
              >
                <option value="all">All Status</option>
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="review">In Review</option>
                <option value="done">Done</option>
              </select>

              <select 
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-2 bg-[var(--card)] border border-[var(--border)] rounded-lg text-sm text-[var(--text)]"
              >
                <option value="all">All Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>

              <select 
                value={assigneeFilter}
                onChange={(e) => setAssigneeFilter(e.target.value)}
                className="px-3 py-2 bg-[var(--card)] border border-[var(--border)] rounded-lg text-sm text-[var(--text)]"
              >
                <option value="all">All Assignees</option>
                <option value="unassigned">Unassigned</option>
                {sampleTeam.map(m => (
                  <option key={m.id} value={m.name}>{m.name}</option>
                ))}
              </select>

              {/* View Toggle */}
              <div className="flex items-center gap-1 p-1 bg-[var(--card)] border border-[var(--border)] rounded-lg">
                <button
                  onClick={() => setViewMode('board')}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === 'board' ? 'bg-[var(--primary)] text-white' : 'text-[var(--text-secondary)] hover:bg-[var(--border)]'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-[var(--primary)] text-white' : 'text-[var(--text-secondary)] hover:bg-[var(--border)]'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <button 
                onClick={() => setShowNewTaskModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white font-medium rounded-lg hover:opacity-90 transition-all"
              >
                <Plus className="w-4 h-4" />
                Add Task
              </button>
            </div>
          </div>

          {/* Board View */}
          {viewMode === 'board' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {statusColumns.map((column) => (
                <div key={column.id} className="bg-[var(--bg)] border border-[var(--border)] rounded-xl">
                  <div className="p-4 border-b border-[var(--border)]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${column.color}`} />
                        <span className="font-medium text-[var(--text)]">{column.label}</span>
                      </div>
                      <span className="text-sm text-[var(--text-secondary)]">{getTasksByStatus(column.id).length}</span>
                    </div>
                  </div>
                  <div className="p-3 space-y-3 max-h-[calc(100vh-400px)] overflow-y-auto">
                    {getTasksByStatus(column.id).map((task) => (
                      <motion.div
                        key={task.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${priorityColors[task.priority]}`}>
                            {task.priority}
                          </span>
                          <button className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-[var(--border)]">
                            <MoreVertical className="w-4 h-4 text-[var(--text-secondary)]" />
                          </button>
                        </div>
                        <h4 className="font-medium text-[var(--text)] mb-1">{task.title}</h4>
                        <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-3">{task.description}</p>
                        
                        <div className="flex items-center gap-2 flex-wrap mb-3">
                          {task.tags.map((tag) => (
                            <span key={tag} className="px-2 py-0.5 text-xs bg-[var(--bg)] text-[var(--text-secondary)] rounded">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          {task.assignee ? (
                            <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${task.assignee.color} flex items-center justify-center`}>
                              <span className="text-white text-xs">{task.assignee.avatar}</span>
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-[var(--border)] flex items-center justify-center">
                              <Users className="w-3 h-3 text-[var(--text-muted)]" />
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-[var(--text-muted)]">
                            {task.comments > 0 && (
                              <span className="flex items-center gap-1 text-xs">
                                <MessageSquare className="w-3 h-3" />
                                {task.comments}
                              </span>
                            )}
                            {task.attachments > 0 && (
                              <span className="flex items-center gap-1 text-xs">
                                <Paperclip className="w-3 h-3" />
                                {task.attachments}
                              </span>
                            )}
                            {task.dueDate && (
                              <span className="flex items-center gap-1 text-xs">
                                <Clock className="w-3 h-3" />
                                {task.dueDate}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    <button 
                      onClick={() => setShowNewTaskModal(true)}
                      className="w-full p-3 border-2 border-dashed border-[var(--border)] rounded-lg text-[var(--text-secondary)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Task
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left px-4 py-3 text-sm font-medium text-[var(--text-secondary)]">Task</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-[var(--text-secondary)]">Status</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-[var(--text-secondary)]">Priority</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-[var(--text-secondary)]">Assignee</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-[var(--text-secondary)]">Due Date</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.map((task) => (
                    <tr key={task.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg)] transition-colors">
                      <td className="px-4 py-3">
                        <div>
                          <div className="font-medium text-[var(--text)]">{task.title}</div>
                          <div className="text-sm text-[var(--text-secondary)] line-clamp-1">{task.description}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                          task.status === 'done' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          task.status === 'in_progress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                          task.status === 'review' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                          'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
                        }`}>
                          {task.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${priorityColors[task.priority]}`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {task.assignee ? (
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${task.assignee.color} flex items-center justify-center`}>
                              <span className="text-white text-xs">{task.assignee.avatar}</span>
                            </div>
                            <span className="text-sm text-[var(--text)]">{task.assignee.name}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-[var(--text-muted)]">Unassigned</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{task.dueDate || '-'}</td>
                      <td className="px-4 py-3">
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
        </div>
      )}

      {activeTab === 'team' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-[var(--text)]">Team Members</h3>
              <p className="text-[var(--text-secondary)]">{sampleTeam.length} members</p>
            </div>
            <button 
              onClick={() => setShowAddMemberModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white font-medium rounded-lg hover:opacity-90 transition-all"
            >
              <UserPlus className="w-4 h-4" />
              Add Member
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sampleTeam.map((member) => (
              <div key={member.id} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white font-medium">{member.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-[var(--text)]">{member.name}</h4>
                    <p className="text-sm text-[var(--text-secondary)]">{member.email}</p>
                    <span className={`inline-block mt-2 px-2.5 py-1 text-xs font-medium rounded-full ${
                      member.role === 'owner' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
                      member.role === 'admin' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                      member.role === 'member' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
                    }`}>
                      {member.role}
                    </span>
                  </div>
                  <button className="p-1.5 rounded-lg hover:bg-[var(--border)]">
                    <MoreVertical className="w-4 h-4 text-[var(--text-secondary)]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="max-w-2xl space-y-6">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
            <h3 className="font-semibold text-[var(--text)] mb-4">Project Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-[var(--border)]">
                <div>
                  <p className="font-medium text-[var(--text)]">Public Project</p>
                  <p className="text-sm text-[var(--text-secondary)]">Anyone with the link can view this project</p>
                </div>
                <button 
                  onClick={() => setIsPublic(!isPublic)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${isPublic ? 'bg-[var(--primary)]' : 'bg-[var(--border)]'}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${isPublic ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-[var(--border)]">
                <div>
                  <p className="font-medium text-[var(--text)]">Project Name</p>
                  <p className="text-sm text-[var(--text-secondary)]">{project.name}</p>
                </div>
                <button className="p-2 rounded-lg hover:bg-[var(--border)]">
                  <Edit className="w-4 h-4 text-[var(--text-secondary)]" />
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-[var(--border)]">
                <div>
                  <p className="font-medium text-[var(--text)]">Description</p>
                  <p className="text-sm text-[var(--text-secondary)] line-clamp-2">{project.description}</p>
                </div>
                <button className="p-2 rounded-lg hover:bg-[var(--border)]">
                  <Edit className="w-4 h-4 text-[var(--text-secondary)]" />
                </button>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-[var(--text)]">Delete Project</p>
                  <p className="text-sm text-[var(--text-secondary)]">Permanently delete this project and all its data</p>
                </div>
                <button className="px-3 py-1.5 text-red-500 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Task Modal */}
      {showNewTaskModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[var(--card)] border border-[var(--border)] rounded-xl w-full max-w-lg"
          >
            <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
              <h3 className="font-semibold text-[var(--text)]">Create New Task</h3>
              <button onClick={() => setShowNewTaskModal(false)} className="p-1.5 rounded-lg hover:bg-[var(--border)]">
                <X className="w-5 h-5 text-[var(--text-secondary)]" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text)] mb-2">Title</label>
                <input 
                  type="text" 
                  placeholder="Enter task title"
                  className="w-full px-3 py-2.5 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--text)] placeholder:text-[var(--text-muted)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text)] mb-2">Description</label>
                <textarea 
                  placeholder="Enter task description"
                  rows={3}
                  className="w-full px-3 py-2.5 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--text)] placeholder:text-[var(--text-muted)] resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text)] mb-2">Priority</label>
                  <select className="w-full px-3 py-2.5 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--text)]">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text)] mb-2">Due Date</label>
                  <input 
                    type="date" 
                    className="w-full px-3 py-2.5 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--text)]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text)] mb-2">Assignee</label>
                <select className="w-full px-3 py-2.5 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--text)]">
                  <option value="">Unassigned</option>
                  {sampleTeam.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-5 border-t border-[var(--border)]">
              <button 
                onClick={() => setShowNewTaskModal(false)}
                className="px-4 py-2 text-[var(--text)] font-medium hover:bg-[var(--border)] rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-[var(--primary)] text-white font-medium rounded-lg hover:opacity-90 transition-all">
                Create Task
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Add Member Modal */}
      {showAddMemberModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[var(--card)] border border-[var(--border)] rounded-xl w-full max-w-md"
          >
            <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
              <h3 className="font-semibold text-[var(--text)]">Add Team Member</h3>
              <button onClick={() => setShowAddMemberModal(false)} className="p-1.5 rounded-lg hover:bg-[var(--border)]">
                <X className="w-5 h-5 text-[var(--text-secondary)]" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text)] mb-2">Email Address</label>
                <input 
                  type="email" 
                  placeholder="Enter email address"
                  className="w-full px-3 py-2.5 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--text)] placeholder:text-[var(--text-muted)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text)] mb-2">Role</label>
                <select className="w-full px-3 py-2.5 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--text)]">
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-5 border-t border-[var(--border)]">
              <button 
                onClick={() => setShowAddMemberModal(false)}
                className="px-4 py-2 text-[var(--text)] font-medium hover:bg-[var(--border)] rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-[var(--primary)] text-white font-medium rounded-lg hover:opacity-90 transition-all">
                Send Invite
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
