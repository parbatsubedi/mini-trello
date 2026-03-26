import { Link } from 'react-router-dom'
import { 
  LayoutDashboard, 
  FolderKanban, 
  Settings, 
  Users,
  X,
  Plus,
  Building2,
  Shield,
  Tag
} from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: false, path: '/dashboard' },
  { icon: FolderKanban, label: 'Projects', active: false, path: '/projects' },
  { icon: FolderKanban, label: 'Boards', active: true, path: '/boards' },
  { icon: Users, label: 'Team', active: false, path: '/team' },
  { icon: Building2, label: 'Departments', active: false, path: '/departments' },
  { icon: Shield, label: 'Roles', active: false, path: '/roles' },
  { icon: Tag, label: 'Tags', active: false, path: '/tags' },
]

const bottomMenuItems = [
  { icon: Settings, label: 'Settings', active: false },
]

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />
      )}
      
      <aside className={`
          fixed top-0 left-0 bottom-0 w-[280px] z-50
          bg-[var(--bg)] border-r border-[var(--border)]
          flex flex-col
          transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:block
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-[var(--border)]">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[var(--primary)] flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-lg font-bold text-[var(--text)]">
              MiniTrello
            </span>
          </a>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-xl hover:bg-[var(--card)] transition-colors"
          >
            <X size={20} className="text-[var(--text)]" />
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <div className="mb-6">
            <button className="
              w-full flex items-center gap-3 px-4 py-3
              bg-[var(--primary)] text-white rounded-xl
              font-medium text-sm
              hover:opacity-90 transition-opacity
            ">
              <Plus size={18} />
              New Board
            </button>
          </div>

          <div className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl
                  text-sm font-medium transition-colors
                  ${item.active 
                    ? 'bg-[var(--primary)]/10 text-[var(--primary)]' 
                    : 'text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--card)]'
                  }
                `}
              >
                <item.icon size={18} />
                {item.label}
                {item.active && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                )}
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="px-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
              Recent Boards
            </h3>
            <div className="space-y-1">
              {['Product Roadmap', 'Marketing Q1', 'Engineering'].map((board) => (
                <button
                  key={board}
                  className="
                    w-full flex items-center gap-3 px-4 py-2.5 rounded-xl
                    text-sm text-[var(--text-secondary)]
                    hover:text-[var(--text)] hover:bg-[var(--card)]
                    transition-colors
                  "
                >
                  <FolderKanban size={16} />
                  {board}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[var(--border)]">
          {bottomMenuItems.map((item) => (
            <button
              key={item.label}
              className="
                w-full flex items-center gap-3 px-4 py-3 rounded-xl
                text-sm font-medium
                text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--card)]
                transition-colors
              "
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>
      </aside>
    </>
  )
}
