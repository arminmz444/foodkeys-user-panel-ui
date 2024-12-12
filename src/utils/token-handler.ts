import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import axiosInstance from '@/utils/axios-instance';
import { CONTEXT_ACTION } from '@/core/dto/enums/context-action';
import axios from 'axios';

export async function checkAndRefreshTokens() {
  console.log('checkAndRefreshTokens');
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  const jwtToken = cookieStore.get('jwtToken')?.value;

  if (!token && !jwtToken) {
    redirect('/login');
  }

  if (token && !jwtToken) {
    return { type: CONTEXT_ACTION.LOGOUT };
  }

  if (!token && jwtToken) {
    try {
      const response = await axios.post(
        '/auth/token',
        {},
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          withCredentials: true,
        }
      );

      cookieStore.set('token', response.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      return { type: 'TOKEN_REFRESHED', token: response.data.token };
    } catch (error) {
      redirect('/login');
    }
  }

  return { type: 'AUTHENTICATED' };
}
