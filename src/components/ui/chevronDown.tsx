export function ChevronDown() {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-[var(--text-secondary)]">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  )
}