import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import axiosInstance from '@/utils/axios-instance';
import { CONTEXT_ACTION } from '@/core/dto/enums/context-action';
import axios from 'axios';
import Cookies from 'js-cookie';
export async function checkAndRefreshTokens() {
  console.log('checkAndRefreshTokens');
  const cookieStore = cookies();
  let token
      = cookieStore.get('fkToken')?.value;
  console.log("Token value: " + token)
  const jwtToken = cookieStore.get('jwtToken')?.value;
  console.log("JWT Token value: " + jwtToken)
  const serverToken = cookieStore.get('token')?.value;
  console.log("Server Token value: " + serverToken)

  let retryCount = 0
  while (!token && retryCount < 3) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    token = cookieStore.get('fkToken')?.value;
    retryCount += 1
  }
  if (!token)
    return { type: CONTEXT_ACTION.LOGOUT };


  // if (token && !jwtToken) {
  //   let response = {}
  //   try {
  //     response = await axiosInstance.post("/dashboard")
  //     console.log("Checking auth")
  //     if (response.status === 200)
  //       return { type: 'AUTHENTICATED' };
  //   } catch (e) {
  //     console.error("Checking auth failed: " + e)
  //     // response.status = 401
  //   }
  //   if (response.status === 401)
  //     return { type: CONTEXT_ACTION.LOGOUT };
  // }

  if (!token) {
    try {
      // const response = await axios.post(
      //   '/auth/token',
      //   {},
      //   {
      //     headers: {
      //       Authorization: `Bearer ${jwtToken}`,
      //     },
      //     withCredentials: true,
      //   }
      // );

      const response = await axiosInstance.get(
          '/auth/refresh',
          { headers: { "Content-Type": "application/json" },}
      );



      // cookieStore.set('token', response.data.token, {
      //   httpOnly: false,
      //   secure: process.env.NODE_ENV === 'production',
      //   sameSite: 'none'//'strict',
      // });
      if (response.status !== 200)
        return { type: CONTEXT_ACTION.LOGOUT };
      return { type: 'TOKEN_REFRESHED', token: response.data.token };
    } catch (error) {
      // redirect('/login');
      return { type: CONTEXT_ACTION.LOGOUT };
    }
  }

  return { type: 'AUTHENTICATED' };
}
