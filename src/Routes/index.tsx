import type { ComponentType } from 'react'
import type { PropsWithChildren } from 'react'
import BoardLayout from '../layouts/BoardLayout.layout'
import RootLayout from '../layouts/RootLayout..layout'

// ComponentType<PropsWithChildren> means "a component that accepts children".
// This is the correct type for layout components.
export interface AppRoute {
    path: string
    lazy: () => Promise<{ default: ComponentType }>
    layouts?: ComponentType<PropsWithChildren>[]  // <-- was ComponentType[]
}

const routes: AppRoute[] = [
    {
        path: '/',
        lazy: () => import('../pages/home'),
        layouts: [RootLayout],
    },
    {
        path: '/boards',
        lazy: () => import('../pages/boards'),
        layouts: [RootLayout],
    },
    {
        path: '/boards/:boardId',
        lazy: () => import('../pages/board-detail'),
        layouts: [RootLayout, BoardLayout],
    },
    {
        path: '/settings',
        lazy: () => import('../pages/settings'),
        layouts: [RootLayout],
    },
    {
        path: '*',
        lazy: () => import('../pages/not-found'),
    },
]

export default routes