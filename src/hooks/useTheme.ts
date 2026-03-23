import { useEffect, useState } from "react"

type Theme = "light" | "dark" | "system"

export function useTheme() {
    const [theme, setTheme] = useState<Theme>("system")
    const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light")

    // Get system preference
    const getSystemTheme = () =>
        window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"

    // Initial load
    useEffect(() => {
        const stored = localStorage.getItem("theme") as Theme | null

        if (stored) {
            setTheme(stored)
        } else {
            setTheme("system")
        }
    }, [])

    // Resolve actual theme
    useEffect(() => {
        let finalTheme: "light" | "dark"

        if (theme === "system") {
            finalTheme = getSystemTheme()
        } else {
            finalTheme = theme
        }

        setResolvedTheme(finalTheme)

        if (finalTheme === "dark") {
            document.body.classList.add("dark")
        } else {
            document.body.classList.remove("dark")
        }
    }, [theme])

    // Listen to system changes
    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)")

        const handler = () => {
            if (theme === "system") {
                const sys = getSystemTheme()
                setResolvedTheme(sys)

                if (sys === "dark") {
                    document.body.classList.add("dark")
                } else {
                    document.body.classList.remove("dark")
                }
            }
        }

        media.addEventListener("change", handler)
        return () => media.removeEventListener("change", handler)
    }, [theme])

    // Update theme
    const changeTheme = (newTheme: Theme) => {
        setTheme(newTheme)

        if (newTheme === "system") {
            localStorage.removeItem("theme")
        } else {
            localStorage.setItem("theme", newTheme)
        }
    }

    return {
        theme,            // "light" | "dark" | "system"
        resolvedTheme,    // actual applied ("light" | "dark")
        setTheme: changeTheme
    }
}