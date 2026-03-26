import { Search, Plus, Edit2, Trash2, Building2, Users } from 'lucide-react'

export default function DepartmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text)]">Departments</h1>
          <p className="text-[var(--text-secondary)]">Manage organizational departments</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--primary)] text-white font-medium rounded-lg hover:opacity-90 transition-all">
          <Plus className="w-5 h-5" />
          Add Department
        </button>
      </div>

      <div className="flex items-center gap-2 px-3 py-2 bg-[var(--card)] border border-[var(--border)] rounded-lg max-w-md">
        <Search className="w-5 h-5 text-[var(--text-muted)]" />
        <input 
          type="text" 
          placeholder="Search departments..."
          className="bg-transparent border-none outline-none text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] flex-1"
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {['Engineering', 'Product', 'Design', 'Marketing', 'Human Resources', 'Sales'].map((name) => (
          <div key={name} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-[var(--primary)]" />
                </div>
                <div>
                  <h3 className="font-medium text-[var(--text)]">{name}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">Department</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
              <div className="flex items-center gap-1 text-sm text-[var(--text-secondary)]">
                <Users className="w-4 h-4" />
                0 members
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 rounded-lg hover:bg-[var(--border)] transition-colors">
                  <Edit2 className="w-4 h-4 text-[var(--text-secondary)]" />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-[var(--border)] transition-colors">
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
