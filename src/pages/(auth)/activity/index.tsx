import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  Circle,
  MessageSquare,
  Clock,
  User,
  ChevronDown,
  RefreshCw,
  FileText,
  Settings,
  Plus,
  Trash2,
  Move
} from 'lucide-react'

const activities = [
  { 
    id: 1, 
    user: { name: 'Sarah Kim', avatar: 'SK', color: 'from-blue-400 to-cyan-400' },
    action: 'completed task', 
    target: 'Design homepage mockup',
    project: 'Website Redesign',
    timestamp: '2 hours ago',
    type: 'task_completed'
  },
  { 
    id: 2, 
    user: { name: 'Mike Roberts', avatar: 'MR', color: 'from-purple-400 to-pink-400' },
    action: 'created', 
    target: 'API Integration',
    project: 'Mobile App Launch',
    timestamp: '3 hours ago',
    type: 'task_created'
  },
  { 
    id: 3, 
    user: { name: 'Emily Watson', avatar: 'EW', color: 'from-green-400 to-emerald-400' },
    action: 'commented on', 
    target: 'Login page design',
    project: 'Website Redesign',
    timestamp: '5 hours ago',
    type: 'comment'
  },
  { 
    id: 4, 
    user: { name: 'John Doe', avatar: 'JD', color: 'from-orange-400 to-red-400' },
    action: 'moved', 
    target: 'User authentication',
    project: 'Backend Migration',
    timestamp: '6 hours ago',
    type: 'task_moved'
  },
  { 
    id: 5, 
    user: { name: 'Lisa Martinez', avatar: 'LM', color: 'from-indigo-400 to-purple-400' },
    action: 'added 3 members to', 
    target: 'Marketing Campaign',
    project: 'Marketing Campaign',
    timestamp: '1 day ago',
    type: 'member_added'
  },
  { 
    id: 6, 
    user: { name: 'Tom Harris', avatar: 'TH', color: 'from-pink-400 to-rose-400' },
    action: 'updated', 
    target: 'Project deadline',
    project: 'Mobile App Launch',
    timestamp: '1 day ago',
    type: 'project_updated'
  },
  { 
    id: 7, 
    user: { name: 'Anna Lee', avatar: 'AL', color: 'from-amber-400 to-orange-400' },
    action: 'deleted task', 
    target: 'Old wireframes',
    project: 'Brand Guidelines',
    timestamp: '2 days ago',
    type: 'task_deleted'
  },
  { 
    id: 8, 
    user: { name: 'David Chen', avatar: 'DC', color: 'from-cyan-400 to-blue-400' },
    action: 'created new project', 
    target: 'Q3 Planning',
    project: '-',
    timestamp: '3 days ago',
    type: 'project_created'
  },
]

const activityIcons: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  task_completed: CheckCircle2,
  task_created: Plus,
  comment: MessageSquare,
  task_moved: Move,
  member_added: User,
  project_updated: Settings,
  task_deleted: Trash2,
  project_created: FileText,
}

const activityColors: Record<string, string> = {
  task_completed: 'text-green-500 bg-green-100 dark:bg-green-900/30',
  task_created: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30',
  comment: 'text-purple-500 bg-purple-100 dark:bg-purple-900/30',
  task_moved: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30',
  member_added: 'text-indigo-500 bg-indigo-100 dark:bg-indigo-900/30',
  project_updated: 'text-orange-500 bg-orange-100 dark:bg-orange-900/30',
  task_deleted: 'text-red-500 bg-red-100 dark:bg-red-900/30',
  project_created: 'text-cyan-500 bg-cyan-100 dark:bg-cyan-900/30',
}

const users = ['All Users', 'Sarah Kim', 'Mike Roberts', 'Emily Watson', 'John Doe', 'Lisa Martinez']
const projects = ['All Projects', 'Website Redesign', 'Mobile App Launch', 'Marketing Campaign', 'Backend Migration', 'Brand Guidelines']
const types = ['All Types', 'Task Completed', 'Task Created', 'Comment', 'Member Added', 'Project Updated']

export default function ActivityPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [userFilter, setUserFilter] = useState('All Users')
  const [projectFilter, setProjectFilter] = useState('All Projects')
  const [typeFilter, setTypeFilter] = useState('All Types')
  const [showFilters, setShowFilters] = useState(false)

  const filteredActivities = activities.filter(activity => {
    const matchesUser = userFilter === 'All Users' || activity.user.name === userFilter
    const matchesProject = projectFilter === 'All Projects' || activity.project === projectFilter
    const matchesType = typeFilter === 'All Types' || 
      (typeFilter === 'Task Completed' && activity.type === 'task_completed') ||
      (typeFilter === 'Task Created' && activity.type === 'task_created') ||
      (typeFilter === 'Comment' && activity.type === 'comment') ||
      (typeFilter === 'Member Added' && activity.type === 'member_added') ||
      (typeFilter === 'Project Updated' && activity.type === 'project_updated')
    const matchesSearch = activity.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          activity.user.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesUser && matchesProject && matchesType && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text)]">Activity History</h1>
          <p className="text-[var(--text-secondary)]">Track all user activities and updates</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--card)] border border-[var(--border)] text-[var(--text)] font-medium rounded-lg hover:bg-[var(--border)] transition-all">
          <RefreshCw className="w-5 h-5" />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg flex-1">
            <Search className="w-5 h-5 text-[var(--text-muted)]" />
            <input 
              type="text" 
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] flex-1"
            />
          </div>

          {/* Filter Toggle */}
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--text)] font-medium hover:bg-[var(--border)] transition-all lg:hidden"
          >
            <Filter className="w-5 h-5" />
            Filters
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Filter Options */}
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 ${showFilters ? 'block' : 'hidden lg:grid'}`}>
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">User</label>
            <select 
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
              className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
            >
              {users.map(user => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Project</label>
            <select 
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
            >
              {projects.map(project => (
                <option key={project} value={project}>{project}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Activity Type</label>
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
            >
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
        <div className="p-5 border-b border-[var(--border)]">
          <h2 className="font-semibold text-[var(--text)]">All Activities</h2>
        </div>

        <div className="divide-y divide-[var(--border)]">
          {filteredActivities.map((activity, index) => {
            const IconComponent = activityIcons[activity.type] || Circle
            const colorClass = activityColors[activity.type] || 'text-gray-500 bg-gray-100'
            
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-5 hover:bg-[var(--bg)] transition-colors"
              >
                <div className="flex items-start gap-4">
                  {/* User Avatar */}
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${activity.user.color} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white font-medium text-sm">{activity.user.avatar}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span className="font-medium text-[var(--text)]">{activity.user.name}</span>
                      <span className="text-[var(--text-secondary)]">{activity.action}</span>
                      <span className="font-medium text-[var(--primary)]">{activity.target}</span>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-2 text-sm text-[var(--text-secondary)]">
                      {activity.project !== '-' && (
                        <span className="flex items-center gap-1">
                          <FolderKanban className="w-4 h-4" />
                          {activity.project}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {activity.timestamp}
                      </span>
                    </div>
                  </div>

                  {/* Activity Icon */}
                  <div className={`p-2 rounded-lg ${colorClass}`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredActivities.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--border)] flex items-center justify-center">
              <Clock className="w-8 h-8 text-[var(--text-muted)]" />
            </div>
            <h3 className="text-lg font-medium text-[var(--text)]">No activities found</h3>
            <p className="text-[var(--text-secondary)] mt-1">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Pagination */}
        <div className="p-5 border-t border-[var(--border)] flex items-center justify-between">
          <span className="text-sm text-[var(--text-secondary)]">
            Showing {filteredActivities.length} of {activities.length} activities
          </span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm font-medium text-[var(--text-secondary)] bg-[var(--bg)] border border-[var(--border)] rounded-lg hover:bg-[var(--border)] disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-white bg-[var(--primary)] rounded-lg hover:opacity-90">
              1
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-[var(--text-secondary)] bg-[var(--bg)] border border-[var(--border)] rounded-lg hover:bg-[var(--border)]">
              2
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-[var(--text-secondary)] bg-[var(--bg)] border border-[var(--border)] rounded-lg hover:bg-[var(--border)]">
              3
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-[var(--text-secondary)] bg-[var(--bg)] border border-[var(--border)] rounded-lg hover:bg-[var(--border)]">
              Next
            </button>
          </div>
        </div>
      </div>
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
