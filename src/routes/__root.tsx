import { createRootRoute, Outlet } from '@tanstack/react-router'
import { NotFound } from '@/components/not-found'
import { CursorDot } from '@/components/cursor-dot'
import { SiteFooter } from '@/components/site-footer'
import { SiteNav } from '@/components/site-nav'

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
})

function RootLayout() {
  return (
    <div className="relative isolate flex min-h-svh flex-col">
      <SiteNav />

      <main className="flex-1">
        <Outlet />
      </main>

      <SiteFooter />
      <CursorDot />
    </div>
  )
}
