import { Moon, Sun } from "lucide-react"
import { useTheme } from "../../../hooks/useTheme"


function PublicNavbar() {
    const { resolvedTheme, setTheme } = useTheme()
    const isDark = resolvedTheme === 'dark'

    const toggleTheme = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
    }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--primary)] to-purple-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-lg font-bold text-[var(--text)]">MiniTrello</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors">How it Works</a>
              <a href="#pricing" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors">Pricing</a>
              <a href="#testimonials" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors">Testimonials</a>
            </div>

            <div className="flex items-center gap-3">
              <a href="/login" className="text-sm font-medium text-[var(--text)] hover:text-[var(--primary)] transition-colors">
                Sign In
              </a>
              <a 
                href="/register" 
                className="px-4 py-2 text-sm font-medium text-white bg-[var(--primary)] rounded-xl hover:opacity-90 transition-opacity"
              >
                Get Started
              </a>
            </div>
            <button
            onClick={toggleTheme}
            className="
              p-2 rounded-xl
              hover:bg-[var(--card)] text-[var(--text-secondary)]
              hover:text-[var(--text)] transition-colors
            "
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          </div>
        </div>
      </nav>
  )
}

export default PublicNavbar
