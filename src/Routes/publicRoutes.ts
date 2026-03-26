import type { ComponentType } from 'react'
import type { PropsWithChildren } from 'react'
import RootLayout from '../layouts/RootLayout..layout'

export interface AppRoute {
    path: string
    lazy: () => Promise<{ default: ComponentType }>
    layouts?: ComponentType<PropsWithChildren>[]
}

const publicRoutes: AppRoute[] = [
    {
        path: '/',
        lazy: () => import('../pages/(public)/home'),
        layouts: [RootLayout],
    },
    {
        path: '/login',
        lazy: () => import('../pages/(public)/auth/login'),
    },
    {
        path: '/register',
        lazy: () => import('../pages/(public)/auth/register'),
    },
]

export default publicRoutes
