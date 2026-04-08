import type { ComponentType } from 'react'
import type { PropsWithChildren } from 'react'
import BoardLayout from '../layouts/BoardLayout.layout'
import AuthLayout from '../layouts/AuthLayout.layout'
import RequireAuth from '../middleware/requireAuth'

export interface AppRoute {
    path: string
    lazy: () => Promise<{ default: ComponentType }>
    layouts?: ComponentType<PropsWithChildren>[]
    guards?: ComponentType<PropsWithChildren>[]
}

const authRoutes: AppRoute[] = [
    {
        path: '/dashboard',
        lazy: () => import('../pages/(auth)/dashboard'),
        layouts: [AuthLayout],
        guards: [RequireAuth],
    },
    {
        path: '/projects',
        lazy: () => import('../pages/(auth)/projects'),
        layouts: [AuthLayout],
    },
    {
        path: '/projects/:projectId',
        lazy: () => import('../pages/(auth)/project-detail'),
        layouts: [AuthLayout],
        guards: [RequireAuth],
    },
    {
        path: '/activity',
        lazy: () => import('../pages/(auth)/activity'),
        layouts: [AuthLayout],
        guards: [RequireAuth],
    },
    {
        path: '/boards',
        lazy: () => import('../pages/(auth)/boards'),
        layouts: [AuthLayout],
    },
    {
        path: '/boards/:boardId',
        lazy: () => import('../pages/(auth)/board-detail'),
        layouts: [BoardLayout],
        guards: [RequireAuth],
    },
    {
        path: '/team',
        lazy: () => import('../pages/(auth)/team'),
        layouts: [AuthLayout],
        guards: [RequireAuth],
    },
    {
        path: '/departments',
        lazy: () => import('../pages/(auth)/departments'),
        layouts: [AuthLayout],
        guards: [RequireAuth],
    },
    {
        path: '/roles',
        lazy: () => import('../pages/(auth)/roles'),
        layouts: [AuthLayout],
        guards: [RequireAuth],
    },
    {
        path: '/tags',
        lazy: () => import('../pages/(auth)/tags'),
        layouts: [AuthLayout],
        guards: [RequireAuth],
    },
    {
        path: '/settings',
        lazy: () => import('../pages/(auth)/settings'),
        layouts: [AuthLayout],
        guards: [RequireAuth],
    },
    {
        path: '/clients',
        lazy: () => import('../pages/(auth)/clients'),
        layouts: [AuthLayout],
        guards: [RequireAuth],
    },
    {
        path: '/labels',
        lazy: () => import('../pages/(auth)/labels'),
        layouts: [AuthLayout],
        guards: [RequireAuth],
    },
]

export default authRoutes
