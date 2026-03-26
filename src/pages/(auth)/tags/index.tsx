import { Search, Plus, Edit2, Trash2, Tag } from 'lucide-react'

export default function TagsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text)]">Tags</h1>
          <p className="text-[var(--text-secondary)]">Manage task tags and labels</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--primary)] text-white font-medium rounded-lg hover:opacity-90 transition-all">
          <Plus className="w-5 h-5" />
          Add Tag
        </button>
      </div>

      <div className="flex items-center gap-2 px-3 py-2 bg-[var(--card)] border border-[var(--border)] rounded-lg max-w-md">
        <Search className="w-5 h-5 text-[var(--text-muted)]" />
        <input 
          type="text" 
          placeholder="Search tags..."
          className="bg-transparent border-none outline-none text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] flex-1"
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#06B6D4', '#EC4899', '#84CC16'].map((color) => (
          <div key={color} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" style={{ color }} />
                <span className="font-medium text-[var(--text)]">Tag Name</span>
              </div>
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
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
        ))}
      </div>
    </div>
  )
}
