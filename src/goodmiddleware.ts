// import { NextRequest, NextResponse } from 'next/server'
// const protectedRoutes = [
//         '/',
//         '/analytics',
//         '/info/:path*',
//         '/logistics/:path*',
//         '/ecommerce/:path*',
//         '/support/:path*',
//         '/file/:path*',
//         '/file-manager',
//         '/invoice/:path*',
//         '/forms/profile-settings/:path*',
//     ]
// const publicRoutes = ['/login', '/signup', '/', 'loginOtp']
//
// export default async function middleware(req: NextRequest) {
//     console.log('middleware')
//
//     const path = req.nextUrl.pathname
//     const isProtectedRoute = protectedRoutes.includes(path)
//     const isPublicRoute = publicRoutes.includes(path)
//     // TODO: Use redux for state management
//     // TODO: Use nextJS builtin auth for authentication and session management
//     const token = req.cookies.get('token') || req.cookies.get('jwtToken');
//     const isLoggedIn = !!token;
//     // const isLoggedIn = !!getItem('token')
//     // console.log(isLoggedIn)
//     // console.log(getItem('token'))
//     // const hasAuthCookie = !!Cookies.get('jwtToken')
//     //
//     // if (!isLoggedIn && !hasAuthCookie) {
//     //     Cookies.remove('jwtToken')
//     //     return NextResponse.rewrite(new URL('/login', req.nextUrl))
//     // }
//     if (isProtectedRoute && !isLoggedIn) {
//         return NextResponse.redirect(new URL('/login', req.nextUrl));
//     }
//     // if (isProtectedRoute && !isLoggedIn) {
//     //     try {
//     //         const response = await axiosInstance.get('/auth/refresh', {
//     //             withCredentials: true,
//     //         });
//     //
//     //         const newToken = response.data.token;
//     //         if (newToken) {
//     //             console.log('token refreshed: ', newToken)
//     //             return NextResponse.redirect(new URL('/analytics', req.nextUrl))
//     //         }
//     //         // dispatch({type: CONTEXT_ACTION.SET_ACCESS_TOKEN, payload: newToken});
//     //
//     //         throw new Error('Error refreshing token: ', response.data)
//     //     } catch (error) {
//     //         console.error('Error refreshing token', error);
//     //         // dispatch({type: CONTEXT_ACTION.LOGOUT});
//     //     }
//     //     return NextResponse.redirect(new URL('/login', req.nextUrl))
//     // }
//
//     if (
//         isPublicRoute &&
//         isLoggedIn &&
//         !req.nextUrl.pathname.startsWith('/analytics')
//     ) {
//         return NextResponse.redirect(new URL('/analytics', req.nextUrl))
//     }
//
//     return NextResponse.next()
// }
//
// // Routes Middleware should not run on
// export const config = {
//     matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// }