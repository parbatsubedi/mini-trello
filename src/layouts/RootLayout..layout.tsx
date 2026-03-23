import type { PropsWithChildren } from 'react'
import Navigation from '../pages/navigation'
import Footer from '../footer'

// The naming convention .layout.tsx is just a team signal —
// it tells anyone reading the file tree "this is a layout, not a page".
// React doesn't care about the name.


// RootLayout is the outer shell of every page in the app.
// Navbar, sidebar, global background — anything shared across all routes.
// children is either a page, or another layout wrapping a page.
export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <div className="app-shell">
            <Navigation />
            <main className="main-content">
                {children}
            </main>
            <Footer />
        </div>
    )
}