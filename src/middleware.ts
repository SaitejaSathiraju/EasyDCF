import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/dashboard'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect()  // <-- removed extra closing parenthesis
  }
})

export const config = {
  matcher: [
    // Protect dashboard and API routes explicitly
    '/dashboard/:path*',
    '/api/:path*',
    // You can still keep this broad pattern if needed, but dashboard must be included explicitly
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
}
