import { useState } from 'react'
import { X, ChevronDown } from 'lucide-react'

export interface MultiSelectOption {
  id: string | number
  label: string
}

export interface MultiSelectStyles {
  /** Overrides the trigger/input area wrapper */
  trigger?: string
  /** Overrides individual selected-item chips */
  chip?: string
  /** Overrides the dropdown panel */
  dropdown?: string
  /** Overrides each dropdown list item */
  dropdownItem?: string
}

interface MultiSelectProps {
  options: MultiSelectOption[]
  value: (string | number)[]
  onChange: (selected: (string | number)[]) => void
  placeholder?: string
  styles?: MultiSelectStyles
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  styles = {},
}: MultiSelectProps) {
  const [open, setOpen] = useState(false)

  const selectedOptions = options.filter((o) => value.includes(o.id))
  const availableOptions = options.filter((o) => !value.includes(o.id))

  const select = (id: string | number) => {
    onChange([...value, id])
    setOpen(false)
  }

  const remove = (id: string | number) => {
    onChange(value.filter((v) => v !== id))
  }

  return (
    <div className="relative w-full">

      {/* Trigger / input area */}
      <div
        onClick={() => setOpen(!open)}
        className={
          styles.trigger ??
          'min-h-[44px] flex flex-wrap items-center gap-2 px-3 py-2 border rounded-lg bg-[var(--card)] border-[var(--border)] cursor-pointer'
        }
      >
        {selectedOptions.length === 0 && (
          <span className="text-sm text-[var(--text-secondary)]">
            {placeholder}
          </span>
        )}

        {selectedOptions.map((item) => (
          <div
            key={item.id}
            className={
              styles.chip ??
              'flex items-center gap-1 px-2 py-1 bg-[var(--primary)] text-white rounded-md text-sm'
            }
          >
            {item.label}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                remove(item.id)
              }}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}

        <ChevronDown className="ml-auto w-4 h-4 text-[var(--text-secondary)]" />
      </div>

      {/* Dropdown */}
      {open && (
        <div
          className={
            styles.dropdown ??
            'absolute mt-2 w-full bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-lg z-50 max-h-60 overflow-auto'
          }
        >
          {availableOptions.length === 0 && (
            <div className="p-3 text-sm text-[var(--text-secondary)]">
              No options left
            </div>
          )}

          {availableOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => select(option.id)}
              className={
                styles.dropdownItem ??
                'px-3 py-2 cursor-pointer hover:bg-[var(--bg)] text-sm text-[var(--text)]'
              }
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}