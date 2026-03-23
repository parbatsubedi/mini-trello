import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import type { ComponentType, JSX, PropsWithChildren } from 'react'
import type { AppRoute } from '../Routes'
import appRoutes from '../Routes'

function withLayout(
    layouts: ComponentType<PropsWithChildren>[] = [],
    Page: ComponentType
): JSX.Element {
    const pageElement = <Page />

    return layouts.reduceRight<JSX.Element>(
        (children, Layout) => <Layout>{children}</Layout>,
        pageElement
    )
}

function renderRoute(route: AppRoute) {
    const Page = lazy(route.lazy)

    return (
        <Route
            key={route.path}
            path={route.path}
            element={
                <Suspense fallback={<div className="loading-screen">Loading...</div>}>
                    {withLayout(route.layouts, Page)}
                </Suspense>
            }
        />
    )
}

export default function RouteProvider() {
    return (
        <Routes>
            {appRoutes.map(renderRoute)}
        </Routes>
    )
}