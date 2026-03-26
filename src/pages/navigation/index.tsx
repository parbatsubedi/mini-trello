import Navbar from '../../layouts/partial/Navbar'
import { useTheme } from '../../hooks/useTheme'

export default function Navigation() {
  const { resolvedTheme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Navbar 
      isDark={resolvedTheme === 'dark'}
      onThemeToggle={toggleTheme}
    />
  )
}
