import { Link } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import { useState } from 'react'

export default function Navigation() {
    const { theme, resolvedTheme, setTheme } = useTheme()
    const [open, setOpen] = useState(false)

    const toggleTheme = () => {
        if (theme === "system") {
            setTheme(resolvedTheme === "dark" ? "light" : "dark")
        } else {
            setTheme(resolvedTheme === "dark" ? "light" : "dark")
        }
    }
    return (
        <nav className="nav-bar" >
            <ul className='flex gap-4'>
                {/* Hamburger */}
                <div className="nav-toggle hidden" onClick={() => setOpen(!open)}>
                    <i className={`fa-solid ${open ? "fa-xmark" : "fa-bars"}`}></i>
                </div>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/boards">Boards</Link>
                </li>
                <li>
                    <Link to="/settings">Settings</Link>
                </li>
                <li>
                    <Link to="/login">
                        <i className="fa-solid fa-right-to-bracket"></i> Login
                    </Link>
                </li>

                <li>
                    <Link to="/signup">
                        <i className="fa-solid fa-user-plus"></i> Signup
                    </Link>
                </li>

                {/* Toggle */}
                <li>
                    <button onClick={toggleTheme}>
                        <i className={`fa-solid ${resolvedTheme === "dark" ? "fa-sun" : "fa-moon"}`}></i>
                    </button>
                </li>

                {/* Optional: System Mode Button */}
                {/* <li>
                    <button onClick={() => setTheme("system")} title="Use system theme">
                        <i className="fa-solid fa-gear"></i>
                    </button>
                </li> */}
            </ul>
        </nav>
    )
}
