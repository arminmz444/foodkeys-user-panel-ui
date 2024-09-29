// "use client"
// import React, {useContext} from 'react'
// import { pagesOptions } from '@/app/api/auth/[...nextauth]/pages-options';
// import withAuth from 'next-auth/middleware';
// import {useAuth} from "@/context/AuthContext";
// import {useRouter} from "next/navigation";
// import {CONTEXT_ACTION} from "@/core/dto/enums/context-action";
// import {signIn} from "next-auth/react";
// import {useLocation} from "react-use";
//
// // export default withAuth({
// //   pages: {
// //     ...pagesOptions,
// //   },
// // });
//
// export default withAuth((next) => {
//   // @ts-ignore
//   const { state, dispatch } = useContext(AuthContext);
//   const location = useLocation()
//   let isInLoginPage = false
//   if (location.pathname?.indexOf('/login') !== -1) isInLoginPage = true;
//   const router = useRouter();
//   dispatch({ type: CONTEXT_ACTION.CHECK_LOGIN_STATUS })
//   if (!state.isLoggedIn) {
//     console.log("here")
//     router.push('/login')
//     // signIn()
//   }
//   else router.push('/analytics');
// }, {pages: {...pagesOptions}, });
//
// export const config = {
//   // restricted routes
//   matcher: [
//     // '/',
//     // // '/analytics',
//     // '/logistics/:path*',
//     // '/ecommerce/:path*',
//     // '/support/:path*',
//     // '/file/:path*',
//     // '/file-manager',
//     // '/invoice/:path*',
//     // '/forms/profile-settings/:path*',
//   ],
// };
