// 'use client';
// import { numberToWords } from '@persian-tools/persian-tools';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Badge } from '@/components/ui/badge';
// import { Input } from '@/components/ui/input';
// import { ActionIcon } from '@/components/ui/action-icon';
// import RingBellSolidIcon from '@/components/icons/ring-bell-solid';
// import ChatSolidIcon from '@/components/icons/chat-solid';
// import SearchWidget from '@/components/search/search';
// import MessagesDropdown from '@/layouts/messages-dropdown';
// import NotificationDropdown from '@/layouts/notification-dropdown';
// import ProfileMenu from '@/layouts/profile-menu';
// import SettingsButton from '@/components/settings/settings-button';
// import { useIsMounted } from '@/hooks/use-is-mounted';
// import { useWindowScroll } from '@/hooks/use-window-scroll';
// import HamburgerButton from '@/layouts/hydrogen/hamburger-button';
// import { siteConfig } from '@/config/site.config';
// import cn from '@/utils/class-names';
// import Logo from '@/components/logo';
// import { Button, Modal } from 'rizzui';
// import React, { RefObject, useEffect, useState, useCallback, useRef } from 'react';
// import { useMedia } from '@/hooks/use-media';
// import { PiWalletFill } from 'react-icons/pi';
// import { HiXMark } from 'react-icons/hi2';
// import { Client } from '@stomp/stompjs';
// import SockJS from 'sockjs-client';
// import { atom, useAtom } from 'jotai';
// import { updateNotificationsAtom } from '@/store/notificationStore';
// import { useDispatch } from 'react-redux';
// import { addCredit } from '@/store/walletSlice';
// import { login as reduxLogin } from "@/store/userSlice";
// import { addNotification } from "@/store/notificationSlice";
// import PaymentSuccess from '../payment-success';
// import PaymentReject from '../payment-reject';
// import toast from 'react-hot-toast';
// import useAxiosPrivate from '@/hooks/use-axios-private';
// import addCreditImg2 from 'public/addCreditLogo.webp';
//
// // WebSocket Hook
// export const useWebSocket = () => {
//   const [client, setClient] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [connectionStatus, setConnectionStatus] = useState('Disconnected');
//   const dispatch = useDispatch();
//   const clientRef = useRef(null);
//   const reconnectTimeoutRef = useRef(null);
//   const maxReconnectAttempts = 5;
//   const reconnectAttemptRef = useRef(0);
//
//   const getWebSocketUrl = useCallback(() => {
//     const isDevelopment = process.env.NODE_ENV === 'development';
//     return isDevelopment
//       ? 'https://back.agfo.ir/ws'
//       : 'https://back.agfo.ir/ws';
//   }, []);
//
//   const connect = useCallback(() => {
//     const token = localStorage.getItem('access_token');
//
//     if (!token) {
//       console.warn('No access token found, skipping WebSocket connection');
//       setConnectionStatus('No Token');
//       return;
//     }
//
//     // Clear any existing connection
//     if (clientRef.current?.connected) {
//       clientRef.current.deactivate();
//     }
//
//     const wsUrl = getWebSocketUrl();
//     console.log('Attempting WebSocket connection to:', wsUrl);
//     setConnectionStatus('Connecting...');
//
//     const newClient = new Client({
//       webSocketFactory: () => new SockJS(wsUrl),
//
//       connectHeaders: {
//         'Authorization': `Bearer ${token}`,
//       },
//
//       debug: function (str) {
//         console.log('STOMP Debug:', str);
//       },
//
//       reconnectDelay: 5000,
//       heartbeatIncoming: 4000,
//       heartbeatOutgoing: 4000,
//       connectionTimeout: 10000,
//     });
//
//     newClient.onConnect = (frame) => {
//       console.log('✅ WebSocket connected successfully:', frame.headers);
//       setIsConnected(true);
//       setConnectionStatus('Connected');
//       reconnectAttemptRef.current = 0;
//
//       try {
//         // Subscribe to notifications
//         const subscription = newClient.subscribe('/topic/notifications', (message) => {
//           try {
//             const notification = JSON.parse(message.body);
//             console.log('📨 Received notification:', notification);
//             dispatch(addNotification(notification));
//
//             // Show toast notification
//             toast.success(notification.content || 'New notification received');
//           } catch (error) {
//             console.error('Error parsing notification:', error);
//           }
//         });
//
//         // Subscribe to user-specific notifications
//         const userSubscription = newClient.subscribe('/user/queue/notifications', (message) => {
//           try {
//             const notification = JSON.parse(message.body);
//             console.log('📨 Received user notification:', notification);
//             dispatch(addNotification(notification));
//
//             toast.success(notification.content || 'New personal notification');
//           } catch (error) {
//             console.error('Error parsing user notification:', error);
//           }
//         });
//
//         // Store subscriptions for cleanup
//         newClient._subscriptions = [subscription, userSubscription];
//
//       } catch (error) {
//         console.error('Error setting up subscriptions:', error);
//       }
//     };
//
//     newClient.onStompError = (frame) => {
//       console.error('❌ STOMP error:', frame.headers['message']);
//       console.error('Error details:', frame.body);
//       setIsConnected(false);
//       setConnectionStatus('Error');
//
//       // Handle specific authorization errors
//       if (frame.headers['message']?.includes('Authentication') ||
//           frame.headers['message']?.includes('Authorization')) {
//         console.error('🔐 WebSocket authorization failed - token may be invalid');
//         setConnectionStatus('Auth Failed');
//         toast.error('WebSocket authorization failed. Please refresh the page.');
//         // Optionally redirect to login or refresh token
//       }
//     };
//
//     newClient.onWebSocketError = (error) => {
//       console.error('🔌 WebSocket error:', error);
//       setIsConnected(false);
//       setConnectionStatus('Connection Error');
//     };
//
//     newClient.onDisconnect = (frame) => {
//       console.log('🔌 WebSocket disconnected:', frame);
//       setIsConnected(false);
//       setConnectionStatus('Disconnected');
//
//       // Attempt to reconnect if not intentionally disconnected
//       if (reconnectAttemptRef.current < maxReconnectAttempts) {
//         reconnectAttemptRef.current++;
//         console.log(`🔄 Attempting to reconnect... (${reconnectAttemptRef.current}/${maxReconnectAttempts})`);
//
//         reconnectTimeoutRef.current = setTimeout(() => {
//           connect();
//         }, 5000 * reconnectAttemptRef.current); // Exponential backoff
//       } else {
//         console.log('❌ Max reconnection attempts reached');
//         setConnectionStatus('Connection Failed');
//       }
//     };
//
//     newClient.onWebSocketClose = (event) => {
//       console.log('🔌 WebSocket closed:', event);
//       setIsConnected(false);
//     };
//
//     try {
//       newClient.activate();
//       clientRef.current = newClient;
//       setClient(newClient);
//     } catch (error) {
//       console.error('❌ Failed to activate WebSocket client:', error);
//       setConnectionStatus('Activation Failed');
//     }
//   }, [dispatch, getWebSocketUrl]);
//
//   const disconnect = useCallback(() => {
//     if (reconnectTimeoutRef.current) {
//       clearTimeout(reconnectTimeoutRef.current);
//     }
//
//     if (clientRef.current?.connected) {
//       // Unsubscribe from all subscriptions
//       if (clientRef.current._subscriptions) {
//         clientRef.current._subscriptions.forEach(subscription => {
//           try {
//             subscription.unsubscribe();
//           } catch (error) {
//             console.error('Error unsubscribing:', error);
//           }
//         });
//       }
//
//       clientRef.current.deactivate();
//     }
//
//     setClient(null);
//     setIsConnected(false);
//     setConnectionStatus('Disconnected');
//     clientRef.current = null;
//   }, []);
//
//   const sendMessage = useCallback((destination, message) => {
//     if (clientRef.current?.connected) {
//       try {
//         clientRef.current.publish({
//           destination,
//           body: JSON.stringify(message)
//         });
//         console.log('📤 Message sent:', { destination, message });
//         return true;
//       } catch (error) {
//         console.error('❌ Failed to send message:', error);
//         return false;
//       }
//     } else {
//       console.warn('⚠️ WebSocket not connected, cannot send message');
//       return false;
//     }
//   }, []);
//
//   useEffect(() => {
//     connect();
//
//     return () => {
//       disconnect();
//     };
//   }, [connect, disconnect]);
//
//   return {
//     client,
//     isConnected,
//     connectionStatus,
//     connect,
//     disconnect,
//     sendMessage
//   };
// };


// hooks/useWebSocketConnection.js
import { useState, useEffect, useCallback, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import toast from 'react-hot-toast';
import { getItem } from '@/utils/storage';
import Cookies from 'js-cookie';

export const useWebSocketConnection = (options = {}) => {
  const {
    onNotification = () => {},
    autoConnect = true,
    maxReconnectAttempts = 5,
    reconnectDelay = 5000,
    getToken = () => Cookies.get('fkToken') || getItem('token') // Use your token logic
  } = options;

  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const clientRef = useRef(null);
  const reconnectAttemptRef = useRef(0);
  const reconnectTimeoutRef = useRef(null);

  const getWebSocketUrl = useCallback(() => {
    const isDevelopment = process.env.NODE_ENV === 'development';
    return isDevelopment
        ? 'https://back.agfo.ir/ws'
        : 'https://back.agfo.ir/ws';
  }, []);

  const connect = useCallback(() => {
    const token = getToken();

    if (!token) {
      console.warn('No access token found for WebSocket connection');
      setConnectionStatus('No Token');
      return Promise.reject(new Error('No access token'));
    }

    return new Promise((resolve, reject) => {
      // Clean up existing connection
      if (clientRef.current?.connected) {
        clientRef.current.deactivate();
      }

      const wsUrl = getWebSocketUrl();
      console.log(`🔌 Connecting to WebSocket: ${wsUrl}`);
      setConnectionStatus('Connecting...');

      const client = new Client({
        webSocketFactory: () => new SockJS(wsUrl),
        connectHeaders: {
          'Authorization': `Bearer ${token}`,
        },
        debug: (str) => {
          if (process.env.NODE_ENV === 'development') {
            console.log('STOMP:', str);
          }
        },
        reconnectDelay: 0, // We handle reconnection manually
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        connectionTimeout: 10000,
      });

      client.onConnect = (frame) => {
        console.log('✅ WebSocket connected:', frame.headers);
        setIsConnected(true);
        setConnectionStatus('Connected');
        reconnectAttemptRef.current = 0;

        // Set up subscriptions
        try {
          const subscriptions = [];

          // General notifications
          const notificationSub = client.subscribe('/topic/notifications', (message) => {
            try {
              const notification = JSON.parse(message.body);
              console.log('📨 Notification:', notification);
              onNotification(notification);
            } catch (error) {
              console.error('Error parsing notification:', error);
            }
          });
          subscriptions.push(notificationSub);

          // User-specific notifications
          const userNotificationSub = client.subscribe('/user/queue/notifications', (message) => {
            try {
              const notification = JSON.parse(message.body);
              console.log('📨 User notification:', notification);
              onNotification(notification);
            } catch (error) {
              console.error('Error parsing user notification:', error);
            }
          });
          subscriptions.push(userNotificationSub);

          // Wallet-specific notifications
          // const walletNotificationSub = client.subscribe('/user/queue/wallet', (message) => {
          //   try {
          //     const notification = JSON.parse(message.body);
          //     console.log('💰 Wallet notification:', notification);
          //     onNotification({
          //       ...notification,
          //       type: 'wallet'
          //     });
          //   } catch (error) {
          //     console.error('Error parsing wallet notification:', error);
          //   }
          // });
          // subscriptions.push(walletNotificationSub);

          // Payment notifications
          // const paymentNotificationSub = client.subscribe('/user/queue/payment', (message) => {
          //   try {
          //     const notification = JSON.parse(message.body);
          //     console.log('💳 Payment notification:', notification);
          //     onNotification({
          //       ...notification,
          //       type: 'payment'
          //     });
          //   } catch (error) {
          //     console.error('Error parsing payment notification:', error);
          //   }
          // });
          // subscriptions.push(paymentNotificationSub);

          client._subscriptions = subscriptions;
          resolve(client);
        } catch (error) {
          console.error('Error setting up subscriptions:', error);
          reject(error);
        }
      };

      client.onStompError = (frame) => {
        console.error('❌ STOMP Error:', frame.headers['message']);
        setIsConnected(false);
        setConnectionStatus('Error');

        if (frame.headers['message']?.includes('Authentication') ||
            frame.headers['message']?.includes('Authorization')) {
          setConnectionStatus('Auth Failed');
          toast.error('خطا در احراز هویت. لطفا مجددا وارد شوید.');
        }

        reject(new Error(frame.headers['message'] || 'STOMP Error'));
      };

      client.onWebSocketError = (error) => {
        console.error('🔌 WebSocket Error:', error);
        setIsConnected(false);
        setConnectionStatus('Connection Error');
        reject(error);
      };

      client.onDisconnect = () => {
        console.log('🔌 WebSocket disconnected');
        setIsConnected(false);
        setConnectionStatus('Disconnected');

        // Auto-reconnect logic
        if (autoConnect && reconnectAttemptRef.current < maxReconnectAttempts) {
          reconnectAttemptRef.current++;
          const delay = reconnectDelay * reconnectAttemptRef.current;

          console.log(`🔄 Reconnecting in ${delay}ms (attempt ${reconnectAttemptRef.current}/${maxReconnectAttempts})`);

          reconnectTimeoutRef.current = setTimeout(() => {
            // Check if token is still valid before reconnecting
            const currentToken = getToken();
            if (currentToken) {
              connect().catch(console.error);
            } else {
              console.log('No token available for reconnection');
              setConnectionStatus('No Token');
            }
          }, delay);
        } else {
          setConnectionStatus('Connection Failed');
        }
      };

      client.activate();
      clientRef.current = client;
    });
  }, [getWebSocketUrl, onNotification, autoConnect, maxReconnectAttempts, reconnectDelay, getToken]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (clientRef.current) {
      if (clientRef.current._subscriptions) {
        clientRef.current._subscriptions.forEach(sub => {
          try {
            sub.unsubscribe();
          } catch (error) {
            console.error('Error unsubscribing:', error);
          }
        });
      }

      if (clientRef.current.connected) {
        clientRef.current.deactivate();
      }
    }

    setIsConnected(false);
    setConnectionStatus('Disconnected');
    clientRef.current = null;
    reconnectAttemptRef.current = 0;
  }, []);

  const sendMessage = useCallback((destination, payload) => {
    if (!clientRef.current?.connected) {
      console.warn('⚠️ Cannot send message: WebSocket not connected');
      return false;
    }

    try {
      clientRef.current.publish({
        destination,
        body: JSON.stringify(payload)
      });
      console.log(`📤 Message sent to ${destination}:`, payload);
      return true;
    } catch (error) {
      console.error('❌ Error sending message:', error);
      return false;
    }
  }, []);

  const sendNotification = useCallback((content, type = 'info', recipient = null) => {
    const notification = {
      content,
      type,
      timestamp: new Date().toISOString(),
      recipient
    };

    const destination = recipient
        ? '/app/notification.private'
        : '/app/notification.send';

    return sendMessage(destination, notification);
  }, [sendMessage]);

  useEffect(() => {
    if (autoConnect) {
      connect().catch(console.error);
    }

    return disconnect;
  }, [connect, disconnect, autoConnect]);

  return {
    isConnected,
    connectionStatus,
    connect,
    disconnect,
    sendMessage,
    sendNotification,
    client: clientRef.current
  };
};