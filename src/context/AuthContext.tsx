"use client"
import React, {createContext, useReducer, useCallback, useEffect} from 'react';
import axiosInstance from '@/utils/axios-instance';
import { toast } from 'react-hot-toast';
import {setItem, removeItem, setJsonItem, getJsonItem, getItem} from '@/utils/storage';
import { useRouter } from 'next/navigation';
import {CONTEXT_ACTION} from "@/core/dto/enums/context-action";
import ErrorEvent = google.maps.ErrorEvent;
import {undefined} from "zod";
import {signIn} from "next-auth/react";
import {da, ro} from "date-fns/locale";
import {useLocation} from "react-use";
import Cookies from "js-cookie";

const initialState = {
    user: null,
    token: '',
    isLoggedIn: false,
};

export const AuthContext = createContext(null);

const authReducer = (state: any, action: { type: any; payload: { token: any; user: any; }; }) => {
    let token;
    switch (action.type) {
        case CONTEXT_ACTION.CHECK_LOGIN_STATUS:
            token = Cookies.get('token');
            return { ...state, isLoggedIn: token && !!getItem('token') || !!initialState.token };
        case CONTEXT_ACTION.SET_ACCESS_TOKEN:
            token = action.payload;
            if (!token) return { ...state, isLoggedIn: false, token: initialState.token };
            setItem('token', action.payload);
            Cookies.set('token', action.payload, { secure: false, httpOnly: false }); // TODO: In production, set to true
            return { ...state, isLoggedIn: true, token: action.payload };
        case CONTEXT_ACTION.LOGOUT:
            removeItem('token');
            removeItem('user');
            Cookies.remove('token');
            return { ...state, isLoggedIn: false, user: initialState.user, token: initialState.token };
        case CONTEXT_ACTION.SET_USER:
            setJsonItem('user', action.payload);
            return { ...state, user: action.payload };
        // case 'SET_TOKEN':
        //     return { ...state, token: action.payload };
        default:
            return state;
    }
};

// @ts-ignore
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState, (initial) => {
        const savedToken = getItem('token') || initialState.token;
        const savedUser = getJsonItem('user');

        return {
            ...initial,
            user: savedUser || initialState.user,
            token: savedToken,
            isLoggedIn: Boolean(savedToken),
        };
    });
    const router = useRouter();
    useEffect(() => {
        const token = Cookies.get('token');
        if (token)
            // @ts-ignore
            dispatch({ type: 'SET_ACCESS_TOKEN', payload: token });

    }, []);


    const login = useCallback(async (username: any, password: any) => {
        try {
            const response = await axiosInstance.post('/auth/login', { username, password });
            const data = response.data;
            // const data = await signIn('credentials', {
            //     username: username, password: password,
            // });
            if (data) {
                console.log(data)
                // @ts-ignore
                dispatch({type: CONTEXT_ACTION.SET_ACCESS_TOKEN, payload: data.data?.token});
                // @ts-ignore
                dispatch({type: CONTEXT_ACTION.SET_USER, payload: data.data?.user});
                toast.success('با موفقیت وارد شدید');
                router.push('/analytics');
            } else // @ts-ignore
                throw new Error(data?.message || 'خطا در ورود')
        } catch (error) {
            console.error('Login failed:', error);
            // handleFormikError(error, formik);
            toast.error(
                // @ts-ignore
            (error?.response?.data?.message &&
                // @ts-ignore
                error?.response?.data?.message === 'Unauthorized' &&
                    'نام کاربری یا رمزعبور اشتباه است') ||
                'خطا در ورود'
            );
            // throw error;
        }
    }, []);

    const loginOtp = useCallback(async (phoneNumber: any, otp: any) => {
        try {
            const response = await axiosInstance.post('/auth/verify-otp', { phoneNumber, otp });
            const { data } = response;
            if (data.statusCode === 200) {
                // Cookies.set('token', data.data?.token, { secure: true, httpOnly: false });
                dispatch({ type: CONTEXT_ACTION.SET_USER, payload: data.data.user });
                dispatch({ type: CONTEXT_ACTION.SET_ACCESS_TOKEN, payload: data.data.token });
                toast.success(data.message || 'با موفقیت وارد شدید');
            } else {
                toast.error(data.message || 'خطا در ورود');
            }
            toast.success('OTP login successful');
            router.push('/');
        } catch (error) {
            console.error('OTP login error:', error);
            // handleFormikError(error, formik);
            toast.error(
                // @ts-ignore
            (error?.response?.data?.message &&
                // @ts-ignore
                error?.response?.data?.message === 'Unauthorized' &&
                    'رمز یکبارمصرف اشتباه است') ||
                // @ts-ignore
                error?.response?.data?.message ||
                'خطا در تایید رمز یکبارمصرف'
            );
            // throw error;
        }
    }, []);

    const requestOtp = useCallback(async (phoneNumber: any) => {
        try {
            await axiosInstance.post('/auth/send-otp', { phoneNumber });
            toast.success('رمز یکبار مصرف با موفقیت ارسال شد');
            return true;
        } catch (error) {
            toast.error('خطا در ارسال رمز یکبار مصرف');
            return false;
        }
    }, []);

    const changePassword = useCallback(async (oldPassword: any, newPassword: any, confirmNewPassword: any, formHook: any) => {
        try {
            const response = await axiosInstance.post('/auth/change-password', {
                oldPassword,
                newPassword,
                confirmNewPassword,
            });
            if (response?.data?.status === 'SUCCESS')
                toast.success(response.data.message || 'خطا در تغییر رمزعبور');

        } catch (error: any) {
            toast.error('Password change failed');
            console.log(JSON.stringify(error.response?.data));
            if (
                error.response &&
                error.response.status === 400 &&
                error.response.data.statusCode === 400 &&
                error.response.data.error?.length
            ) {
                toast.error(error.response.data.message);
                error.response.data.error.forEach((err: { formikField: string; message: any; }) => {
                    if (err.formikField !== 'GENERAL') formHook.setFieldError(err.formikField, err.message);
                });
            } else {
                toast.error('خطا در تغییر رمز عبور');
            }
            // throw error;
        }
    }, []);

    const logout = useCallback(() => {
        // removeItem('token');
        // removeItem('user');
        // dispatch({
        //     type: 'LOGOUT',
        //     payload: {
        //         token: undefined,
        //         user: undefined
        //     }
        // });
        dispatch({payload: {token: undefined, user: undefined}, type: CONTEXT_ACTION.LOGOUT });
        router.push('/login');
    }, []);

    // const location = useLocation();
    // // useEffect(() => {
    // //     if (state.isLoggedIn) router.push('/');
    // //     else router.replace('/login');
    // // }, [state.isLoggedIn]);
    // // useEffect(() => {
    // //     dispatch({payload: {token: undefined, user: undefined}, type: CONTEXT_ACTION.CHECK_LOGIN_STATUS });
    // // }, [location]);
    // @ts-ignore
    return (
        // @ts-ignore
        <AuthContext.Provider value={{ state, login, loginOtp, requestOtp, changePassword, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => React.useContext(AuthContext);
