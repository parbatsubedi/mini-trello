import type { ComponentType } from 'react'
import type { PropsWithChildren } from 'react'
import BoardLayout from '../layouts/BoardLayout.layout'
import AuthLayout from '../layouts/AuthLayout.layout'

export interface AppRoute {
    path: string
    lazy: () => Promise<{ default: ComponentType }>
    layouts?: ComponentType< PropsWithChildren>[]
}

const authRoutes: AppRoute[] = [
    {
        path: '/dashboard',
        lazy: () => import('../pages/(auth)/dashboard'),
        layouts: [AuthLayout],
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
    },
    {
        path: '/activity',
        lazy: () => import('../pages/(auth)/activity'),
        layouts: [AuthLayout],
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
    },
    {
        path: '/team',
        lazy: () => import('../pages/(auth)/team'),
        layouts: [AuthLayout],
    },
    {
        path: '/departments',
        lazy: () => import('../pages/(auth)/departments'),
        layouts: [AuthLayout],
    },
    {
        path: '/roles',
        lazy: () => import('../pages/(auth)/roles'),
        layouts: [AuthLayout],
    },
    {
        path: '/tags',
        lazy: () => import('../pages/(auth)/tags'),
        layouts: [AuthLayout],
    },
    {
        path: '/settings',
        lazy: () => import('../pages/(auth)/settings'),
        layouts: [AuthLayout],
    },
]

export default authRoutes
