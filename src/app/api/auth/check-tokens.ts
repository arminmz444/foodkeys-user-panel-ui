import { NextApiRequest, NextApiResponse } from 'next';
import axiosInstance from '@/utils/axios-instance';
// @ts-ignore
import Cookies from 'cookies';

export default async function checkTokens(req: NextApiRequest, res: NextApiResponse) {
    console.log('checkTokens')
    const cookies = new Cookies(req, res);
    const token = cookies.get('fkToken');
    // const jwtToken = cookies.get('jwtToken');

    // if (!token) {
    //     return res.status(401).json({ message: 'Unauthenticated' });
    // }

    // if (token && !jwtToken) {
    //     return res.status(403).json({ message: 'Logout' });
    // }

    if (!token) {
        try {
            // const response = await axiosInstance.post('/auth/token', {}, {
            //     headers: {
            //         'Authorization': `Bearer ${jwtToken}`
            //     },
            //     withCredentials: true,
            // });
            const response = await axiosInstance.get('/auth/refresh', {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const newAccessToken = response.data.token;

            // cookies.set('token', newAccessToken, {
            //     httpOnly: true,
            //     secure: process.env.NODE_ENV === 'production',
            //     sameSite: 'strict',
            // });

            return res.status(200).json({ message: 'Token refreshed', token: newAccessToken });
        } catch (error) {
            return res.status(401).json({ message: 'Failed to refresh token' });
        }
    }

    return res.status(200).json({ message: 'Authenticated' });
}
