import { NextResponse, NextRequest } from 'next/server';
 

export default function middleware(request: NextRequest) {

//   console.log("bvc", request.nextUrl.pathname, "bvc");
//   const path = request.nextUrl.pathname;

//   const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail' || path === '/';

//   const token = request.cookies.get('token')?.value || ''

//   if(isPublicPath && token) {
//     return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
//   }

//   if (!isPublicPath && !token) {
//     return NextResponse.redirect(new URL('/', request.nextUrl))
//   }
    
}

export const config = {
    matcher: [
    /*
    * Match all request paths except for the ones starting with:
    * - api (API routes)
    * - _next/static (static files)
    * - _next/image (image optimization files)
    * - favicon.ico (favicon file)
    */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}