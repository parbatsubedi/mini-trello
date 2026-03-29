import type { ComponentType } from 'react'
import type { PropsWithChildren } from 'react'
import publicRoutes from './publicRoutes'
import authRoutes from './authRoutes'

export interface AppRoute {
    path: string
    lazy: () => Promise<{ default: ComponentType }>
    layouts?: ComponentType<PropsWithChildren>[],
    guards?: ComponentType<PropsWithChildren>[]
}

const routes: AppRoute[] = [
    ...publicRoutes,
    ...authRoutes,
    {
        path: '*',
        lazy: () => import('../pages/not-found'),
    },
]

export default routes