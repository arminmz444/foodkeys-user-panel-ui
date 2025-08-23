// providers/WebSocketProvider.jsx
'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useWebSocketConnection } from '@/hooks/use-websocket';
import { useDispatch } from 'react-redux';
import { addNotification } from '@/store/notificationSlice';
import toast from 'react-hot-toast';
import { getItem } from '@/utils/storage';
import Cookies from 'js-cookie';

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const { state, isLoggedIn } = useAuth();
    const dispatch = useDispatch();
    const [shouldConnect, setShouldConnect] = useState(false);

    // Check if user is authenticated using your auth system
    useEffect(() => {
        const checkAuthStatus = () => {
            const token = Cookies.get('fkToken') || getItem('token');
            const userLoggedIn = isLoggedIn();
            const hasValidState = state?.isLoggedIn && state?.token;

            console.log('WebSocket Auth Check:', {
                token: !!token,
                userLoggedIn,
                hasValidState,
                stateToken: !!state?.token
            });

            setShouldConnect(token && userLoggedIn && hasValidState);
        };

        checkAuthStatus();
    }, [state?.isLoggedIn, state?.token, isLoggedIn]);

    const webSocket = useWebSocketConnection({
        onNotification: (notification) => {
            console.log('📨 Received notification:', notification);

            // Add to Redux store
            dispatch(addNotification(notification));

            // Show toast notification based on type
            if (notification.type !== 'silent') {
                const message = notification.content || 'شما پیام جدیدی دارید';

                switch (notification.type) {
                    case 'success':
                        toast.success(message, {
                            duration: 4000,
                            style: {
                                background: '#10B981',
                                color: '#fff',
                            },
                        });
                        break;
                    case 'warning':
                        toast.error(message, {
                            duration: 5000,
                            style: {
                                background: '#F59E0B',
                                color: '#fff',
                            },
                        });
                        break;
                    case 'error':
                        toast.error(message, {
                            duration: 6000,
                            style: {
                                background: '#EF4444',
                                color: '#fff',
                            },
                        });
                        break;
                    case 'payment':
                        toast.success(message, {
                            duration: 8000,
                            icon: '💳',
                            style: {
                                background: '#8B5CF6',
                                color: '#fff',
                            },
                        });
                        break;
                    case 'wallet':
                        toast.success(message, {
                            duration: 6000,
                            icon: '💰',
                            style: {
                                background: '#06B6D4',
                                color: '#fff',
                            },
                        });
                        break;
                    default:
                        toast(message, {
                            duration: 4000,
                            icon: '🔔',
                            style: {
                                background: '#363636',
                                color: '#fff',
                                direction: 'rtl',
                            },
                        });
                }
            }
        },
        autoConnect: shouldConnect,
        maxReconnectAttempts: 5,
        reconnectDelay: 5000,
        getToken: () => {
            // Use your auth token retrieval logic
            return Cookies.get('fkToken') || getItem('token');
        }
    });

    const contextValue = {
        ...webSocket,
        user: state?.user,
        isAuthenticated: state?.isLoggedIn,
        token: state?.token
    };

    return (
        <WebSocketContext.Provider value={contextValue}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket must be used within WebSocketProvider');
    }
    return context;
};