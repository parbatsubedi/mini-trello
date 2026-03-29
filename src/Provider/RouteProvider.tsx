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

function withGuards(
  guards: ComponentType<PropsWithChildren>[] = [],
  element: JSX.Element
): JSX.Element {
  return guards.reduceRight<JSX.Element>(
    (children, Guard) => <Guard>{children}</Guard>,
    element
  )
}

function renderRoute(route: AppRoute) {
    const Page = lazy(route.lazy)

    // Step 1: apply layouts
    const layoutWrapped = withLayout(route.layouts, Page)

    // Step 2: wrap with guards (outside)
    const finalElement = withGuards(route.guards, layoutWrapped)
    return (
        <Route
            key={route.path}
            path={route.path}
            element={
                <Suspense fallback={<div className="loading-screen">Loading...</div>}>
                    {finalElement}
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