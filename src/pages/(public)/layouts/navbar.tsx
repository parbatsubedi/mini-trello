import { Menu, Moon, Sun, X } from "lucide-react"
import { useTheme } from "../../../hooks/useTheme"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface PublicNavbarProps {
  isDark?: boolean
}

function PublicNavbar({ isDark = false }: PublicNavbarProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* MAIN NAVBAR */}
        <div className="flex items-center justify-between h-16">

          {/* LEFT */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-xl hover:bg-[var(--card)] transition"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--primary)] to-purple-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-lg font-bold text-[var(--text)]">MiniTrello</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="nav-link">Features</a>
            <a href="#how-it-works" className="nav-link">How it Works</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <a href="#testimonials" className="nav-link">Testimonials</a>
          </div>

          <div className="flex items-center gap-3">
            <a href="/login" className="nav-link hidden sm:block">
              Sign In
            </a>

            <a href="/register" className="btn-primary hidden sm:block">
              Get Started
            </a>

            {/* THEME */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl hover:bg-[var(--card)] transition"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden mt-2 rounded-2xl bg-[var(--card)] p-4 shadow-xl border border-[var(--border)]"
            >
              <div className="flex flex-col gap-4">

                {/* NAV LINKS */}
                <a href="#features" className="mobile-link" onClick={() => setIsOpen(false)}>Features</a>
                <a href="#how-it-works" className="mobile-link" onClick={() => setIsOpen(false)}>How it Works</a>
                <a href="#pricing" className="mobile-link" onClick={() => setIsOpen(false)}>Pricing</a>
                <a href="#testimonials" className="mobile-link" onClick={() => setIsOpen(false)}>Testimonials</a>

                {/* DIVIDER */}
                <div className="h-px bg-[var(--border)] my-2" />

                {/* AUTH */}
                <a
                  href="/login"
                  className="w-full text-center py-2 rounded-xl border border-[var(--border)] text-[var(--text)] hover:bg-[var(--card)] transition"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </a>

                <a
                  href="/register"
                  className="w-full text-center py-2 rounded-xl bg-[var(--primary)] text-white hover:opacity-90 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </a>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </nav>
  )
}

export default PublicNavbar
