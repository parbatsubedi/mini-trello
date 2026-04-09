import { useState } from 'react'
import type { PropsWithChildren } from 'react'
import { 
  LayoutDashboard, 
  FolderKanban, 
  History, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  User,
  Users,
  Building2,
  Shield,
  Tag,
  Badge,
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { authService } from '../services/auth.service'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  {icon: Badge, label: 'Labels', path: '/labels' },
  {icon: Users, label: 'Clients', path: '/clients' },
  { icon: FolderKanban, label: 'Projects', path: '/projects' },
  { icon: History, label: 'Activity', path: '/activity' },
  { icon: Users, label: 'Team', path: '/team' },
  { icon: Building2, label: 'Departments', path: '/departments' },
  { icon: Shield, label: 'Roles', path: '/roles' },
  { icon: Tag, label: 'Tags', path: '/tags' },
  { icon: Settings, label: 'Settings', path: '/settings' },
]

export default function AuthLayout({ children }: PropsWithChildren) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const handleLogout = () => {
    authService.logout()
    localStorage.removeItem('token')
    window.location.href = '/login'
  }
  const location = useLocation()

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-[var(--card)] border-r border-[var(--border)] 
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[var(--border)]">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--primary)] to-purple-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="font-bold text-[var(--text)]">MiniTrello</span>
          </Link>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-[var(--border)]"
          >
            <X className="w-5 h-5 text-[var(--text-secondary)]" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                  ${isActive 
                    ? 'bg-[var(--primary)] text-white' 
                    : 'text-[var(--text-secondary)] hover:bg-[var(--border)] hover:text-[var(--text)]'
                  }
                `}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[var(--border)]">
          <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--border)] hover:text-[var(--text)] transition-all"
            onClick={handleLogout}>
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="lg:ml-64">
        {/* Top Header */}
        <header className="h-16 bg-[var(--card)] border-b border-[var(--border)] flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-[var(--border)]"
            >
              <Menu className="w-5 h-5 text-[var(--text-secondary)]" />
            </button>
            
            {/* Search */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg w-64">
              <Search className="w-4 h-4 text-[var(--text-muted)]" />
              <input 
                type="text" 
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-[var(--border)] transition-colors">
              <Bell className="w-5 h-5 text-[var(--text-secondary)]" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* User Menu */}
            <div className="relative">
              <button 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1.5 pr-3 rounded-lg hover:bg-[var(--border)] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-purple-500 flex items-center justify-center">
                  <span className="text-white font-medium text-sm">JD</span>
                </div>
                <span className="hidden sm:block text-sm font-medium text-[var(--text)]">John Doe</span>
                <ChevronDown className="w-4 h-4 text-[var(--text-secondary)]" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-lg overflow-hidden z-50">
                  <Link 
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--text)] hover:bg-[var(--border)]"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                  <Link 
                    to="/settings"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--text)] hover:bg-[var(--border)]"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                  <div className="border-t border-[var(--border)]">
                    <button className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-[var(--border)] w-full" onClick={handleLogout}>
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
