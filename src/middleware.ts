import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Add '/auction' to the protected routes array
const isProtectedRoute = createRouteMatcher(['/dashboard', '/auction'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/:path*',
    '/auction/:path*',
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
}
