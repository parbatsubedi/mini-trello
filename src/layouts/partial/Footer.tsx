import { motion } from 'framer-motion'

interface FooterProps {
  companyName?: string
  year?: number
}

export default function Footer({ 
  companyName = 'MiniTrello', 
  year = new Date().getFullYear() 
}: FooterProps) {
  const links = [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Contact', href: '#' },
  ]

  return (
    <motion.footer
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="
        py-4 px-6
        bg-[var(--card)] border-t border-[var(--border)]
      "
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[var(--text-secondary)]">
          © {year} {companyName}. All rights reserved.
        </p>
        
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="
                text-sm text-[var(--text-secondary)]
                hover:text-[var(--primary)] transition-colors
              "
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </motion.footer>
  )
}
