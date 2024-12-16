// hooks/useRefreshToken.ts
import axiosInstance from '@/utils/axios-instance';
import {useAuth} from '@/context/AuthContext'
import {CONTEXT_ACTION} from '@/core/dto/enums/context-action';

const useRefreshToken = () => {
    // @ts-ignore
    const { dispatch, logout } = useAuth()

    return async () => {
        try {
            const response = await axiosInstance.get('/auth/refresh', {
                withCredentials: true,
            });

            const newToken = response.data.token;
            dispatch({type: CONTEXT_ACTION.SET_ACCESS_TOKEN, payload: newToken});

            return newToken;
        } catch (error) {
            console.error('Error refreshing token', error);
            // dispatch({type: CONTEXT_ACTION.LOGOUT});
            logout()
            throw error;
        }
    };
};

export default useRefreshToken;
