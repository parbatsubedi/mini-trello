import { 
  Search, 
  Mail,
  Building2,
  Edit2,
  Trash2,
  UserPlus
} from 'lucide-react'

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text)]">Team</h1>
          <p className="text-[var(--text-secondary)]">Manage your team members and their roles</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--primary)] text-white font-medium rounded-lg hover:opacity-90 transition-all">
          <UserPlus className="w-5 h-5" />
          Add Member
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-[var(--card)] border border-[var(--border)] rounded-lg flex-1 max-w-md">
          <Search className="w-5 h-5 text-[var(--text-muted)]" />
          <input 
            type="text" 
            placeholder="Search members..."
            className="bg-transparent border-none outline-none text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] flex-1"
          />
        </div>

        <select className="px-3 py-2 bg-[var(--card)] border border-[var(--border)] rounded-lg text-sm text-[var(--text)] outline-none focus:ring-2 focus:ring-[var(--primary)]">
          <option>All Roles</option>
        </select>

        <select className="px-3 py-2 bg-[var(--card)] border border-[var(--border)] rounded-lg text-sm text-[var(--text)] outline-none focus:ring-2 focus:ring-[var(--primary)]">
          <option>All Departments</option>
        </select>
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left px-5 py-3 text-sm font-medium text-[var(--text-secondary)]">Member</th>
                <th className="text-left px-5 py-3 text-sm font-medium text-[var(--text-secondary)]">Role</th>
                <th className="text-left px-5 py-3 text-sm font-medium text-[var(--text-secondary)]">Department</th>
                <th className="text-left px-5 py-3 text-sm font-medium text-[var(--text-secondary)]">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--border)]">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                      <span className="text-white font-medium text-sm">SK</span>
                    </div>
                    <div>
                      <div className="font-medium text-[var(--text)]">Sarah Kim</div>
                      <div className="text-sm text-[var(--text-secondary)] flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        sarah.kim@company.com
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">Admin</span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <Building2 className="w-4 h-4" />Engineering
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Active</span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-[var(--border)] transition-colors">
                      <Edit2 className="w-4 h-4 text-[var(--text-secondary)]" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-[var(--border)] transition-colors">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
