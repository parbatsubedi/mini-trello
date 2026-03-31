import { useState } from 'react'

export function useFormState<T extends object>(initial: T) {
  const [formData, setFormData] = useState<T>(initial)

  const set = <K extends keyof T>(key: K, value: T[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const reset = () => setFormData(initial)

  return { formData, set, setFormData, reset }
}