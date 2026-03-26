import { Moon, Sun, Menu, Bell, Search, Plus } from 'lucide-react'

interface NavbarProps {
  onMenuClick?: () => void
  isDark?: boolean
  onThemeToggle?: () => void
}

export default function Navbar({ 
  onMenuClick,
  isDark = false,
  onThemeToggle 
}: NavbarProps) {

  return (
    <nav className="
        fixed top-0 left-0 right-0 z-50
        h-16 px-4 md:px-6
        bg-[var(--bg)]/80 backdrop-blur-xl
        border-b border-[var(--border)]
      "
    >
      <div className="h-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl hover:bg-[var(--card)] transition-colors"
          >
            <Menu size={20} className="text-[var(--text)]" />
          </button>
          
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[var(--primary)] flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-lg font-bold text-[var(--text)] hidden sm:block">
              MiniTrello
            </span>
          </a>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <button className="
              flex items-center gap-2 px-4 py-2
              bg-[var(--card)] border border-[var(--border)] rounded-xl
              text-[var(--text-secondary)] hover:text-[var(--text)]
              transition-colors
            "
          >
            <Search size={16} />
            <span className="text-sm">Search...</span>
            <kbd className="ml-4 px-1.5 py-0.5 text-xs bg-[var(--bg)] rounded-md border border-[var(--border)]">
              ⌘K
            </kbd>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="
              p-2 rounded-xl
              bg-[var(--primary)] text-white
              hover:opacity-90 transition-opacity
            "
          >
            <Plus size={18} />
          </button>

          <button className="
              relative p-2 rounded-xl
              hover:bg-[var(--card)] text-[var(--text-secondary)]
              hover:text-[var(--text)] transition-colors
            "
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <button
            onClick={onThemeToggle}
            className="
              p-2 rounded-xl
              hover:bg-[var(--card)] text-[var(--text-secondary)]
              hover:text-[var(--text)] transition-colors
            "
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-purple-500 flex items-center justify-center text-white font-medium text-sm cursor-pointer">
            P
          </div>
        </div>
      </div>
    </nav>
  )
}
