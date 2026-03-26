import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, Check } from 'lucide-react'
import { useState } from 'react'

const benefits = [
  'Unlimited boards',
  'Real-time collaboration',
  'Advanced analytics',
  'Priority support',
  'Custom workflows',
]

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[var(--bg)]">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[var(--primary)]/5 via-transparent to-purple-500/5" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-[var(--primary)]/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative max-w-5xl mx-4 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Benefits */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:block"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            {/* Decorative Card */}
            <div className="relative bg-gradient-to-br from-[var(--primary)] to-purple-600 rounded-3xl p-8 text-white overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-30" />
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <span className="font-bold">T</span>
                  </div>
                  <span className="text-xl font-bold">MiniTrello</span>
                </div>
                
                <h2 className="text-2xl font-bold mb-2">Start your journey</h2>
                <p className="text-white/80 mb-8">Join thousands of teams already using MiniTrello</p>

                <div className="space-y-3">
                  {benefits.map((benefit, i) => (
                    <motion.div
                      key={benefit}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-white/90">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -right-8 -top-8 w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg"
            />
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -left-6 -bottom-6 w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl shadow-lg"
            />
          </motion.div>
        </motion.div>

        {/* Right Side - Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Logo - Mobile Only */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-purple-500 flex items-center justify-center shadow-lg shadow-[var(--primary)]/25">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-bold text-[var(--text)]">MiniTrello</span>
          </div>

          <div className="bg-[var(--card)]/80 backdrop-blur-xl border border-[var(--border)] rounded-3xl p-8 shadow-2xl shadow-black/5">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-2xl font-bold text-[var(--text)]">Create an account</h1>
              <p className="text-[var(--text-secondary)] mt-2">Get started with your free account</p>
            </motion.div>

            <form className="mt-8 space-y-5">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-[var(--text)] mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-3.5 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-medium text-[var(--text)] mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3.5 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-sm font-medium text-[var(--text)] mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-14 py-3.5 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-2">Must be at least 8 characters</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex items-start gap-2"
              >
                <input type="checkbox" className="mt-1 w-4 h-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]/20" />
                <span className="text-sm text-[var(--text-secondary)]">
                  I agree to the{' '}
                  <a href="#" className="text-[var(--primary)] hover:underline">Terms</a>
                  {' '}and{' '}
                  <a href="#" className="text-[var(--primary)] hover:underline">Privacy Policy</a>
                </span>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                type="button"
                className="w-full py-3.5 bg-gradient-to-r from-[var(--primary)] to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 group"
              >
                Create Account
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </form>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-center mt-6 text-[var(--text-secondary)]"
            >
              Already have an account?{' '}
              <a href="/login" className="text-[var(--primary)] font-medium hover:underline">
                Sign in
              </a>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
