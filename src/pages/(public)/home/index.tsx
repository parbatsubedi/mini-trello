import { motion } from 'framer-motion'
import { 
  FolderKanban, 
  Users, 
  BarChart3, 
  Zap, 
  Shield, 
  Globe,
  ArrowRight,
  Check,
  Star,
  Play
} from 'lucide-react'

const features = [
  {
    icon: FolderKanban,
    title: 'Kanban Boards',
    description: 'Visualize your workflow with customizable boards, columns, and cards.'
  },
  {
    icon: Users,
    title: 'Real-time Collaboration',
    description: 'Work together with your team in real-time. See changes instantly.'
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track progress with beautiful charts and insightful metrics.'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built for speed with instant loading and smooth interactions.'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level encryption keeps your data safe and secure.'
  },
  {
    icon: Globe,
    title: 'Works Everywhere',
    description: 'Access your boards from any device, anywhere in the world.'
  }
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Product Manager at TechCorp',
    content: 'MiniTrello transformed how our team collaborates. It\'s intuitive, fast, and beautiful.',
    avatar: 'SC'
  },
  {
    name: 'Marcus Johnson',
    role: 'Founder at StartupX',
    content: 'The best project management tool we\'ve used. Simple yet powerful.',
    avatar: 'MJ'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Design Lead at Studio',
    content: 'Finally, a tool that looks as good as it performs. Our team loves it.',
    avatar: 'ER'
  }
]

const pricingPlans = [
  {
    name: 'Starter',
    price: '0',
    description: 'Perfect for individuals',
    features: ['Up to 3 boards', 'Unlimited cards', 'Basic analytics', 'Mobile app'],
    cta: 'Get Started',
    popular: false
  },
  {
    name: 'Pro',
    price: '12',
    description: 'For growing teams',
    features: ['Unlimited boards', 'Team collaboration', 'Advanced analytics', 'Priority support', 'Custom workflows'],
    cta: 'Start Free Trial',
    popular: true
  },
  {
    name: 'Enterprise',
    price: '49',
    description: 'For large organizations',
    features: ['Everything in Pro', 'SSO & SAML', 'Dedicated support', 'Custom integrations', 'SLA guarantee'],
    cta: 'Contact Sales',
    popular: false
  }
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Navigation */}
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
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 via-transparent to-purple-500/5" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--primary)]/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-[var(--primary)]/10 text-[var(--primary)] mb-6">
                <Zap size={14} />
                Now with AI-powered features
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[var(--text)] leading-tight"
            >
              Manage projects{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-purple-500">
                smarter
              </span>
              {' '}not harder
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-xl text-[var(--text-secondary)] max-w-2xl mx-auto"
            >
              The modern project management tool that helps teams stay organized, 
              collaborate seamlessly, and deliver results faster.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a 
                href="/register" 
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-[var(--primary)] rounded-2xl hover:opacity-90 transition-all hover:scale-105"
              >
                Start Free Trial
                <ArrowRight size={20} />
              </a>
              <button className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-[var(--text)] bg-[var(--card)] border border-[var(--border)] rounded-2xl hover:bg-[var(--border)] transition-all">
                <Play size={18} />
                Watch Demo
              </button>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 text-sm text-[var(--text-secondary)]"
            >
              No credit card required • Free 14-day trial • Cancel anytime
            </motion.p>
          </div>

          {/* Hero Image */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-16 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[var(--border)] bg-[var(--card)]">
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/50 to-transparent z-10" />
              <div className="p-2">
                <div className="aspect-video rounded-xl bg-[var(--bg)] border border-[var(--border)] overflow-hidden">
                  <div className="h-full flex">
                    {/* Mock Kanban Board */}
                    <div className="w-64 border-r border-[var(--border)] p-4 bg-[var(--card)]">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      <div className="space-y-3">
                        <div className="h-8 rounded-lg bg-[var(--bg)] border border-[var(--border)]" />
                        <div className="h-8 rounded-lg bg-[var(--bg)] border border-[var(--border)]" />
                        <div className="h-8 rounded-lg bg-[var(--bg)] border border-[var(--border)]" />
                      </div>
                    </div>
                    <div className="flex-1 p-4">
                      <div className="grid grid-cols-3 gap-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="space-y-3">
                            <div className="h-4 w-20 rounded bg-[var(--text-secondary)]/20" />
                            {[1, 2, 3].map((j) => (
                              <div key={j} className="h-24 rounded-xl bg-[var(--card)] border border-[var(--border)] p-3">
                                <div className="h-3 w-16 rounded bg-[var(--text-secondary)]/20 mb-2" />
                                <div className="h-2 w-full rounded bg-[var(--text-secondary)]/10" />
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-[var(--primary)]/10 text-[var(--primary)] mb-4">
              Features
            </span>
            <h2 className="text-4xl font-bold text-[var(--text)]">
              Everything you need to succeed
            </h2>
            <p className="mt-4 text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              Powerful features designed to help your team work more efficiently.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--primary)]/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--primary)]/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[var(--text-secondary)]">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-[var(--card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-[var(--primary)]/10 text-[var(--primary)] mb-4">
              How It Works
            </span>
            <h2 className="text-4xl font-bold text-[var(--text)]">
              Get started in minutes
            </h2>
            <p className="mt-4 text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              Three simple steps to transform how your team works.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Create a Board', description: 'Start by creating a new board for your project. Choose from templates or build from scratch.' },
              { step: '02', title: 'Add Your Team', description: 'Invite team members and assign roles. Collaborate in real-time on tasks and projects.' },
              { step: '03', title: 'Track Progress', description: 'Watch your project come to life with visual workflows and automated updates.' }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="text-6xl font-bold text-[var(--primary)]/20 mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-[var(--text)] mb-2">
                  {item.title}
                </h3>
                <p className="text-[var(--text-secondary)]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-[var(--primary)]/10 text-[var(--primary)] mb-4">
              Testimonials
            </span>
            <h2 className="text-4xl font-bold text-[var(--text)]">
              Loved by teams everywhere
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)]"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={16} className="fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-[var(--text)] mb-6">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-purple-500 flex items-center justify-center text-white font-medium text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-medium text-[var(--text)]">{testimonial.name}</div>
                    <div className="text-sm text-[var(--text-secondary)]">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-[var(--card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-[var(--primary)]/10 text-[var(--primary)] mb-4">
              Pricing
            </span>
            <h2 className="text-4xl font-bold text-[var(--text)]">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              Choose the plan that works best for your team.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative p-6 rounded-2xl bg-[var(--bg)] border ${
                  plan.popular 
                    ? 'border-[var(--primary)] shadow-lg shadow-[var(--primary)]/10' 
                    : 'border-[var(--border)]'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[var(--primary)] text-white text-xs font-medium rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-lg font-semibold text-[var(--text)]">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[var(--text)]">${plan.price}</span>
                  <span className="text-[var(--text-secondary)]">/month</span>
                </div>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">{plan.description}</p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-[var(--text)]">
                      <Check size={16} className="text-[var(--primary)]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`mt-6 w-full py-3 px-4 rounded-xl font-medium transition-colors ${
                  plan.popular
                    ? 'bg-[var(--primary)] text-white hover:opacity-90'
                    : 'bg-[var(--card)] text-[var(--text)] border border-[var(--border)] hover:bg-[var(--border)]'
                }`}>
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[var(--bg)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="p-12 rounded-3xl bg-gradient-to-br from-[var(--primary)] to-purple-600 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-30" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to transform your workflow?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                Join thousands of teams already using MiniTrello to work smarter.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="/register" 
                  className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-[var(--primary)] bg-white rounded-2xl hover:opacity-90 transition-all"
                >
                  Get Started Free
                  <ArrowRight size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[var(--card)] border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--primary)] to-purple-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <span className="text-lg font-bold text-[var(--text)]">MiniTrello</span>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">
                The modern project management tool for forward-thinking teams.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-[var(--text)] mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Changelog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-[var(--text)] mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li><a href="#" className="hover:text-[var(--primary)] transition-colors">About</a></li>
                <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-[var(--text)] mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[var(--text-secondary)]">
              © 2026 MiniTrello. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
