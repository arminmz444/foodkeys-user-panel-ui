'use client';
import React, {
    createContext,
    useReducer,
    useCallback,
    useEffect,
} from 'react';
import axiosInstance from '@/utils/axios-instance';
import {toast} from 'react-hot-toast';
import {
    setItem,
    removeItem,
    setJsonItem,
    getJsonItem,
    getItem,
} from '@/utils/storage';
import {redirect, useRouter, usePathname } from 'next/navigation';
import {CONTEXT_ACTION} from '@/core/dto/enums/context-action';
import ErrorEvent = google.maps.ErrorEvent;
import {undefined} from 'zod';
import {signIn} from 'next-auth/react';
import {da, ro} from 'date-fns/locale';
import {useLocation} from 'react-use';
import Cookies from 'js-cookie';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from '@/store/store';
import {SEND_OTP_SCENARIOS} from "@/core/dto/enums/send-otp-scenarios";
import {handleFormikError} from "@/utils/handle-formik-error";

const initialState = {
    user: null,
    token: '',
    isLoggedIn: false,
};

export const AuthContext = createContext(null);

const authReducer = (
    state: any,
    action: { type: any; payload: { token: any; user: any } }
) => {
    let token;
    switch (action.type) {
        case CONTEXT_ACTION.CHECK_LOGIN_STATUS:
            token = Cookies.get('fkToken') || !getItem('token')
            console.log("Checking login status: ", !!token)
            if (!token) {
                console.log("Logging out user")
                removeItem('token');
                removeItem('user');
                Cookies.remove('token');
                Cookies.remove('token', {secure: true, httpOnly: false});
                Cookies.remove('jwtToken');
                Cookies.remove('jwtToken', {secure: true, httpOnly: true});
                Cookies.remove('fkToken', {secure: true, httpOnly: false, sameSite: "strict"});
                return {
                    ...state,
                    isLoggedIn: false,
                    user: initialState.user,
                    token: initialState.token,
                };
            }
            console.log("User is logged in")
            return {
                ...state,
                isLoggedIn: (token && !!getItem('token')) || !!initialState.token,
            };
        case CONTEXT_ACTION.SET_ACCESS_TOKEN:
            token = action.payload;
            if (!token)
                return {...state, isLoggedIn: false, token: initialState.token};
            setItem('token', action.payload);
            Cookies.set('fkToken', action.payload, {secure: true, httpOnly: false, sameSite: "strict"}); // TODO: In production, set to true
            // Cookies.set('jwtToken', action.payload, { secure: true, httpOnly: false, sameSite: "none" }); // TODO: This is a temporary fix

            return {...state, isLoggedIn: true, token: action.payload};
        case CONTEXT_ACTION.LOGOUT:
            removeItem('token');
            removeItem('user');
            // Cookies.remove('token');
            Cookies.remove('token', {secure: true, httpOnly: false});
            Cookies.remove('jwtToken');
            Cookies.remove('jwtToken', {secure: true, httpOnly: true});
            Cookies.remove('fkToken', {secure: true, httpOnly: false, sameSite: "strict"});
            return {
                ...state,
                isLoggedIn: false,
                user: initialState.user,
                token: initialState.token,
            };
        case CONTEXT_ACTION.SET_USER:
            setJsonItem('user', action.payload);
            return {...state, user: action.payload};
        // case 'SET_TOKEN':
        //     return { ...state, token: action.payload };
        default:
            return state;
    }
};

// @ts-ignore
export const AuthProvider = ({children}) => {
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
    const pathname = usePathname()

    useEffect(() => {
        const token = Cookies.get('fkToken');
        if (token)
            // @ts-ignore
            dispatch({type: 'SET_ACCESS_TOKEN', payload: token});
    }, []);

    useEffect(() => {
        const checkPathName = () => {
            console.log("Path Name: " + pathname)
            let token = Cookies.get('fkToken')
            console.log("User token: " + token)
            let localToken = getItem('token');
            if (!token && !localToken) {
                if (pathname !== '/login' && pathname !== '/sign-up' && pathname !== '/forgot-password') {
                    console.log("User not logged in, redirecting to login");
                    router.replace('/login');
                }
                console.log("User not logged in, redirecting to login");
            } else if ((token || localToken) && pathname === '/login') {
                console.log("User logged in, redirecting to dashboard");
                router.push('/');
            }
        }
        checkPathName()
    }, [pathname]);

    // useEffect(() => {
    //     console.log("Checking whether user is logged in or not");
    //     if (state.isLoggedIn) {
    //         console.log("User logged in, redirecting to dashboard");
    //         router.push('/');
    //     }
    // }, [state.isLoggedIn]);
    //
    // useEffect(() => {
    //     const refreshTokens = async () => {
    //         try {
    //             const token = Cookies.get('fkToken');
    //             if (!token) {
    //                 dispatch({ type: CONTEXT_ACTION.LOGOUT });
    //                 return;
    //             }
    //
    //             const response = await axiosInstance.get('/auth/refresh', {
    //                 headers: { 'Content-Type': 'application/json' },
    //             });
    //
    //             if (response.status === 200) {
    //                 dispatch({
    //                     type: CONTEXT_ACTION.SET_ACCESS_TOKEN,
    //                     payload: response.data.token,
    //                 });
    //                 Cookies.set('fkToken', response.data.token, { secure: true, httpOnly: false });
    //             } else {
    //                 dispatch({ type: CONTEXT_ACTION.LOGOUT });
    //             }
    //         } catch (error) {
    //             dispatch({ type: CONTEXT_ACTION.LOGOUT });
    //         }
    //     };
    //
    //     refreshTokens();
    // }, []);

    const login = useCallback(async (username: any, password: any, m: any) => {
        try {
            const response = await axiosInstance.post('/auth/login', {
                username,
                password,
            });
            const data = response.data;
            // const data = await signIn('credentials', {
            //     username: username, password: password,
            // });
            if (data) {
                console.log(data);
                // @ts-ignore
                dispatch({
                    type: CONTEXT_ACTION.SET_ACCESS_TOKEN,
                    payload: data.data?.token,
                });
                // @ts-ignore
                dispatch({type: CONTEXT_ACTION.SET_USER, payload: data.data?.user});
                toast.success('با موفقیت وارد شدید');
                m.token = data.data?.token;
                m.user = data.data?.user;
                router.push('/');
            } // @ts-ignore
            else throw new Error(data?.message || 'خطا در ورود');
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

    const signUp = useCallback(async (username: any, email: any, firstName: any, lastName: any, password: any, otp: any, m: any, setError: any) => {
        try {
            const response = await axiosInstance.post('/auth/register', {
                username,
                phone: username,
                password,
                email,
                firstName,
                lastName,
                otp
            });
            const data = response.data;
            // const data = await signIn('credentials', {
            //     username: username, password: password,
            // });
            if (data) {
                console.log(data);
                // @ts-ignore
                dispatch({
                    type: CONTEXT_ACTION.SET_ACCESS_TOKEN,
                    payload: data.data?.token,
                });
                // @ts-ignore
                dispatch({type: CONTEXT_ACTION.SET_USER, payload: data.data?.user});
                toast.success('با موفقیت ثبت‌نام شدید');
                m.token = data.data?.token;
                m.user = data.data?.user;
                router.push('/');
                return true;
            } // @ts-ignore
            else throw new Error(data?.message || 'خطا در ثبت‌نام');
        } catch (error) {
            console.error('Sign up failed:', error);
            handleFormikError(error, setError, "خطا در ثبت نام");
            toast.error(
                // @ts-ignore
                (error?.response?.data?.message &&
                    // @ts-ignore
                    error?.response?.data?.message === 'Unauthorized' &&
                    'اطلاعات ورودی معتبر نمی‌باشد') ||
                'خطا در ثبت نام'
            );
            return false;
            // throw error;
        }
    }, []);

    const loginOtp = useCallback(async (phoneNumber: any, otp: any) => {
        try {
            const response = await axiosInstance.post('/auth/verify-otp', {
                phoneNumber,
                otp,
            });
            const {data} = response;
            if (data.statusCode === 200) {
                // Cookies.set('token', data.data?.token, { secure: true, httpOnly: false });
                dispatch({type: CONTEXT_ACTION.SET_USER, payload: data.data.user});
                dispatch({
                    type: CONTEXT_ACTION.SET_ACCESS_TOKEN,
                    payload: data.data.token,
                });
                toast.success(data.message || 'با موفقیت وارد شدید');
            } else {
                toast.error(data.message || 'خطا در ورود');
            }
            // toast.success('OTP login successful');
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
            let response = await axiosInstance.post('/auth/send-otp', {phoneNumber});
            if (response.data?.blocked) return SEND_OTP_SCENARIOS.IS_BLOCKED;
            toast.success('رمز یکبار مصرف با موفقیت ارسال شد');
            return response.data?.registered ? SEND_OTP_SCENARIOS.REGISTERED : SEND_OTP_SCENARIOS.NEED_TO_REGISTER

        } catch (error) {
            // toast.error('خطا در ارسال رمز یکبار مصرف');
            return SEND_OTP_SCENARIOS.ERROR
        }
    }, []);

    const forgotPasswordOtp = useCallback(async (phoneNumber: any) => {
        try {
            await axiosInstance.post('/auth/forgot-password/otp', {phoneNumber});
            toast.success('رمز یکبار مصرف با موفقیت ارسال شد');
            return true;
        } catch (error) {
            toast.error('خطا در ارسال رمز یکبار مصرف');
            return false;
        }
    }, []);

    const forgotPasswordVerify = useCallback(
        async (otp: any, phoneNumber: any) => {
            try {
                await axiosInstance.post('/auth/forgot-password/verify', {
                    otp,
                    phoneNumber,
                });
                return true;
            } catch (error) {
                console.log(error);
                // @ts-ignore
                toast.error(
                    error?.response?.data?.message || 'خطا در بررسی رمز یکبارمصرف'
                );
                return false;
            }
        },
        []
    );

    const forgotPassword = useCallback(
        async (password: any, username: any, formHook: any) => {
            try {
                const response = await axiosInstance.post('/auth/forgot-password', {
                    password,
                    username,
                });
                if (response?.data?.status === 'SUCCESS') {
                    toast.success(response.data.message);
                    router.push('/login');
                } else
                    toast.error(response?.data?.message || 'خطا در بازنشانی رمزعبور');
            } catch (error: any) {
                console.log(
                    'Error in forgotPassword' + JSON.stringify(error.response?.data)
                );
                if (
                    error.response &&
                    error.response.status === 400 &&
                    error.response.data.statusCode === 400 &&
                    error.response.data.error?.length
                ) {
                    toast.error(error.response.data.message);
                    error.response.data.error.forEach(
                        (err: { formikField: string; message: any }) => {
                            if (err.formikField !== 'GENERAL')
                                formHook.setFieldError(err.formikField, err.message);
                        }
                    );
                } else {
                    toast.error('خطا در بازنشانی رمز عبور');
                }
                // throw error;
            }
        },
        []
    );
    const isLoggedIn = useCallback(
        () => {
            return Boolean(Cookies.get("fkToken") || getItem("token"))
        },
        []
    );
    const fixToken = useCallback(
        () => {
            let token = Cookies.get("fkToken") || getItem('token');
            Cookies.set("fkToken", token);
            setItem("token", token);
        },
        []
    );

    const changePassword = useCallback(
        async (
            oldPassword: any,
            newPassword: any,
            confirmNewPassword: any,
            formHook: any
        ) => {
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
                    error.response.data.error.forEach(
                        (err: { formikField: string; message: any }) => {
                            if (err.formikField !== 'GENERAL')
                                formHook.setFieldError(err.formikField, err.message);
                        }
                    );
                } else {
                    toast.error('خطا در تغییر رمز عبور');
                }
                // throw error;
            }
        },
        []
    );

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
        dispatch({
            payload: {token: undefined, user: undefined},
            type: CONTEXT_ACTION.LOGOUT,
        });
        router.replace('/login');
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
        <AuthContext.Provider
            value={{
                state,
                login,
                loginOtp,
                requestOtp,
                changePassword,
                logout,
                dispatch,
                forgotPasswordOtp,
                forgotPasswordVerify,
                forgotPassword,
                signUp,
                isLoggedIn,
                fixToken
            }}
        >
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    {children}
                </PersistGate>
            </Provider>
        </AuthContext.Provider>
    );
};
export const useAuth = () => React.useContext(AuthContext);
