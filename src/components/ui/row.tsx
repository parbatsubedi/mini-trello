
export const Row = ({
    label,
    align = 'center',
    children,
  }: {
    label: string
    align?: 'center' | 'start'
    children: React.ReactNode
  }) => (
    <div className={`grid grid-cols-[180px_1fr] gap-4 py-3 ${align === 'start' ? 'items-start' : 'items-center'}`}>
      <label className={`text-sm text-[var(--text-secondary)] ${align === 'start' ? 'pt-2' : ''}`}>
        {label}
      </label>
      <div>{children}</div>
    </div>
  )