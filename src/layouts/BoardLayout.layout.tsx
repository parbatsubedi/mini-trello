import type { PropsWithChildren } from 'react'



// BoardLayout is only used by /boards/:boardId.
// It adds a board-specific toolbar ON TOP of RootLayout's shell.
// It receives children from withLayout, which is the actual page component.
export default function BoardLayout({ children }: PropsWithChildren) {
    return (
        <div className="board-shell">
            <div className="board-toolbar">
                <span>Board toolbar</span>
            </div>
            <div className="board-content">
                {children}
            </div>
        </div>
    )
}