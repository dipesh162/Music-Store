import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
const allowedOrigins = ['https://music-store-dipesh162.vercel.app', 'https://music-store-swart.vercel.app', 'http://localhost:3000', 'https://www.google.com']

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
//   return NextResponse.redirect(new URL('/home', request.url))
    const origin = request.headers.get('origin')
    if(origin && !allowedOrigins.includes(origin)){
      return new NextResponse(null, {
        status:400,
        statusText: 'Bad Request',
        headers: {
            'Content-Type': 'text/plain'
        }
      })
    }

    const path = request.nextUrl.pathname
    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'

    const token = request.cookies.get('token')?.value || ''

    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
//   matcher: '/about/:path*',
  matcher: [
    // '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail'
  ]
} 