// hooks/useAxiosPrivate.ts
import { useEffect, useContext } from 'react';
import { useAuth } from '@/context/AuthContext'; // Updated import
import axiosInstance from '@/utils/axios-instance';
import useRefreshToken from '@/hooks/use-refresh-token';
import {CONTEXT_ACTION} from "@/core/dto/enums/context-action";

const useAxiosPrivate = () => {
    // @ts-ignore
    const { state, dispatch } = useAuth();
    const refresh = useRefreshToken();

    useEffect(() => {
        // @ts-ignore
        // @ts-ignore

        const requestIntercept = axiosInstance.interceptors.request.use(
            // @ts-ignore
            (config: { headers: { Authorization: string; }; }) => {
                if (!config.headers.Authorization && state.token) {
                    config.headers.Authorization = `Bearer ${state.token}`;
                }
                return config;
            },
            (error: any) => Promise.reject(error)
        );

        const responseIntercept = axiosInstance.interceptors.response.use(
            (response: any) => response,
            async (error: { config: any; response: { status: number; }; }) => {
                const originalRequest = error.config;
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    try {
                        const newToken = await refresh();
                        dispatch({ type: CONTEXT_ACTION.SET_ACCESS_TOKEN, payload: newToken });
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        return axiosInstance(originalRequest);
                    } catch (err) {
                        dispatch({ type: 'LOGOUT' });
                        return Promise.reject(err);
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosInstance.interceptors.request.eject(requestIntercept);
            axiosInstance.interceptors.response.eject(responseIntercept);
        };
    }, [refresh, state.token, dispatch]);

    return axiosInstance;
};

export default useAxiosPrivate;
