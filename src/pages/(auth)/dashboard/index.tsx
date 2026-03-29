import { motion } from 'framer-motion'
import { 
  FolderKanban, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  ArrowUpRight,
  MoreHorizontal,
  Plus
} from 'lucide-react'
import { useDashboard } from '../../../hooks/useDashboard'
import { AlertOverlay } from '../../../components/alert/Alert'

const statusColors = {
  active: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  review: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
}

export default function DashboardPage() {
  const { data, isLoading, isError, error } = useDashboard()

  const icons = [
    FolderKanban,
    CheckCircle2,
    Clock,
    TrendingUp,
  ]
  const stats = (data?.stats ?? []).map((stat, index) => ({
    ...stat,
    icon: icons[index], //maps the icons from above array through the index of array in the stats response
  }))

const recentProjects = data?.recentProjects ?? []
const recentActivity = data?.recentActivity ?? []

if (isLoading) {
  return <AlertOverlay type="loading" message="Loading dashboard data..." />
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text)]">Dashboard</h1>
          <p className="text-[var(--text-secondary)]">Welcome back! Here's your project overview.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--primary)] text-white font-medium rounded-lg hover:opacity-90 transition-all">
          <Plus className="w-5 h-5" />
          New Project
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-[var(--text)]">{stat.value}</div>
            <div className="text-sm text-[var(--text-secondary)]">{stat.label}</div>
            <div className="text-xs text-[var(--text-muted)] mt-1">{stat.change}</div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Projects Table */}
        <div className="lg:col-span-2 bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
            <h2 className="font-semibold text-[var(--text)]">Recent Projects</h2>
            <button className="text-sm text-[var(--primary)] hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left px-5 py-3 text-sm font-medium text-[var(--text-secondary)]">Project</th>
                  <th className="text-left px-5 py-3 text-sm font-medium text-[var(--text-secondary)]">Progress</th>
                  <th className="text-left px-5 py-3 text-sm font-medium text-[var(--text-secondary)]">Members</th>
                  <th className="text-left px-5 py-3 text-sm font-medium text-[var(--text-secondary)]">Tasks</th>
                  <th className="text-left px-5 py-3 text-sm font-medium text-[var(--text-secondary)]">Status</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {recentProjects.map((project) => (
                  <tr key={project.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg)] transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-medium text-[var(--text)]">{project.name}</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-[var(--border)] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[var(--primary)] rounded-full" 
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-[var(--text-secondary)]">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-[var(--card)] flex items-center justify-center">
                            <span className="text-white text-xs font-medium">{String.fromCharCode(64 + i + Number(project.id))}</span>
                          </div>
                        ))}
                        {project.members > 3 && (
                          <div className="w-7 h-7 rounded-full bg-[var(--border)] border-2 border-[var(--card)] flex items-center justify-center">
                            <span className="text-xs text-[var(--text-secondary)]">+{project.members - 3}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">{project.tasks}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${statusColors[project.status as keyof typeof statusColors]}`}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <button className="p-1.5 rounded-lg hover:bg-[var(--border)] transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-[var(--text-secondary)]" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
            <h2 className="font-semibold text-[var(--text)]">Recent Activity</h2>
            <button className="text-sm text-[var(--primary)] hover:underline">View All</button>
          </div>
          <div className="p-5 space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-purple-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-medium">{activity.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[var(--text)]">
                    <span className="font-medium">{activity.user}</span>{' '}
                    <span className="text-[var(--text-secondary)]">{activity.action}</span>{' '}
                    <span className="font-medium">{activity.target}</span>
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
