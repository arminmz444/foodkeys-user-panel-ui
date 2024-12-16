'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { ActionIcon } from '@/components/ui/action-icon';
import RingBellSolidIcon from '@/components/icons/ring-bell-solid';
import ChatSolidIcon from '@/components/icons/chat-solid';
import SearchWidget from '@/components/search/search';
import MessagesDropdown from '@/layouts/messages-dropdown';
import NotificationDropdown from '@/layouts/notification-dropdown';
import ProfileMenu from '@/layouts/profile-menu';
import SettingsButton from '@/components/settings/settings-button';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { useWindowScroll } from '@/hooks/use-window-scroll';
import HamburgerButton from '@/layouts/hydrogen/hamburger-button';
import { siteConfig } from '@/config/site.config';
import cn from '@/utils/class-names';
import Logo from '@/components/logo';
import { BsWalletFill } from 'react-icons/bs';
import { Button, Modal } from 'rizzui';
import React, { RefObject, useEffect, useState } from 'react';
import { useMedia } from '@/hooks/use-media';
import { Popover } from '@/components/ui/popover';
import { PiArrowLeftBold, PiWalletFill } from 'react-icons/pi';
import walletImage from '@public/wallet.png';
import { HiXMark } from 'react-icons/hi2';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { atom, useAtom } from 'jotai';
import { updateNotificationsAtom } from '@/store/notificationStore';
import { useDispatch } from 'react-redux';
import { addCredit } from '@/store/walletSlice'; // Import atoms from the store
import PaymentSuccess from '../payment-success';
import PaymentReject from '../payment-reject';
import toast from 'react-hot-toast';
import useAxiosPrivate from '@/hooks/use-axios-private';

// export const notificationsAtom = atom([]);

function HeaderMenuRight() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useAtom(updateNotificationsAtom);

  useEffect(() => {
    const client = new Client({
      brokerURL: 'ws://foodkeys-api-dev.liara.run/ws',
      connectHeaders: {},
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      webSocketFactory: () => new SockJS('https://foodkeys-api-dev.liara.run/ws'),
    });

    client.onConnect = () => {
      client.subscribe('/topic/notifications', (message) => {
        const notification = JSON.parse(message.body);
        // const notification = message.body;
        console.log(notification);
        // @ts-ignore
        setMessages((prev) => [...prev, notification]);
        // setNo
      });
    };

    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);

  return (
    <div className="ms-auto grid shrink-0 grid-cols-4 items-center gap-2 text-gray-700 print:hidden xs:gap-3 xl:gap-4">
      {/*<MessagesDropdown>*/}
      {/*  <ActionIcon*/}
      {/*    aria-label="Messages"*/}
      {/*    variant="text"*/}
      {/*    className="relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9"*/}
      {/*  >*/}
      {/*    <ChatSolidIcon className="h-[18px] w-auto" />*/}
      {/*    <Badge*/}
      {/*      renderAsDot*/}
      {/*      color="success"*/}
      {/*      enableOutlineRing*/}
      {/*      className="absolute right-2.5 top-2.5 -translate-y-1/3 translate-x-1/2"*/}
      {/*    />*/}
      {/*  </ActionIcon>*/}
      {/*</MessagesDropdown>*/}
      {/*// @ts-ignore*/}
      <NotificationDropdown messages={messages}>
        <ActionIcon
          aria-label="Notification"
          variant="text"
          className="relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9"
        >
          <RingBellSolidIcon className="h-[18px] w-auto" />
          <Badge
            renderAsDot
            color="warning"
            enableOutlineRing
            className="absolute right-2.5 top-2.5 -translate-y-1/3 translate-x-1/2"
          />
        </ActionIcon>
      </NotificationDropdown>
      {/*// @ts-ignore*/}
      {/* <PaymentSuccess />*/}
      {/*<PaymentReject />*/}
      <WalletDropdown setIsOpen={setIsOpen} isOpen={isOpen}>
        <ActionIcon
          aria-label="Notification"
          onClick={() => setIsOpen(true)}
          variant="text"
          className="relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9"
        >
          <PiWalletFill className="h-[18px] w-auto" />
        </ActionIcon>
      </WalletDropdown>
      <SettingsButton />
      <ProfileMenu />
    </div>
  );
}

export default function Header() {
  const isMounted = useIsMounted();
  const windowScroll = useWindowScroll();
  return (
    <header
      className={cn(
        'sticky top-0 z-50 flex items-center bg-gray-0/80 px-4 py-4 backdrop-blur-xl dark:bg-gray-50/50 print:hidden md:px-5 lg:px-6 2xl:py-5 3xl:px-8 4xl:px-10',
        ((isMounted && windowScroll.y) as number) > 2 ? 'card-shadow' : ''
      )}
    >
      <div className="flex w-full max-w-2xl items-center">
        <HamburgerButton />
        <Link href={'/'} className="me-4 w-9 shrink-0 lg:me-5 xl:hidden">
          <Logo iconOnly={true} />
        </Link>
        <SearchWidget />
      </div>
      <HeaderMenuRight />
    </header>
  );
}

// @ts-ignore
function WalletDropdown({
  children,
  // @ts-ignore
  setIsOpen,
  // @ts-ignore
  isOpen,
}: {
  children: JSX.Element & { ref?: RefObject<any> };
}) {
  const dispatch = useDispatch();
  const _axios = useAxiosPrivate();
  const [loading, setLoading] = useState(false);

  const isMobile = useMedia('(max-width: 480px)', false);

  const [amount, setAmount] = useState<number>(0);

  const handleDefaultAmountClick = (value: number) => {
    setAmount(value);
  };

  const handleSubmit = async () => {
    if (amount <= 0) {
      alert('لطفا مبلغ معتبری وارد کنید');
      return;
    }
    const startPayment = async () => {
      const API_URL = '/payment/start/3';
      try {
        const response = await _axios.post(API_URL, {
          amount: amount * 10,
          redirectUrl: '/api/v1/client/panel/payment/callback',
          description: 'افزایش شارژ کیف پول',
          mobile: '09352388350',
          email: 'arminm4@gmail.com',
        });

        if (response.data.statusCode === 200) {
          return {
            data: response.data.data,
          };
        } else {
          toast.error('خطا در افزایش اعتبار');
          // throw new Error('Failed to start payment');
        }
      } catch (error) {
        toast.error('خطا در افزایش اعتبار');
        console.error('Failed to start payment', error);
      }
    };
    setLoading(true);
    let response = await startPayment();
    if (response?.data?.url) window.location.href = response?.data?.url;
    else toast.error('خطا در افزایش اعتبار');
    setLoading(false);
    // dispatch(addCredit(amount));
    // alert(`در حال هدایت به درگاه بانکی برای پرداخت مبلغ ${amount} تومان`);
  };
  const defaultAmounts = [50000, 100000, 250000, 500000];

  return (
    <>
      <Modal size="lg" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="m-auto px-7 pt-6 dark:bg-gray-100 dark:text-white">
          <div className="flex items-center justify-between">
            <h3>افزایش اعتبار کیف پول</h3>
            <ActionIcon
              size="sm"
              variant="text"
              onClick={() => setIsOpen(false)}
            >
              <HiXMark className="h-auto w-6" strokeWidth={1.8} />
            </ActionIcon>
          </div>
          <div className="from-blue-500 to-indigo-700 flex min-h-screen flex-col items-center justify-center bg-gradient-to-br p-4 text-black dark:bg-gray-100">
            <div
              // style={{ backgroundColor: "#f5deb369" }}
              className="w-full max-w-lg transform rounded-lg bg-white p-6 text-center shadow-lg transition-all duration-300 hover:scale-105 dark:bg-gray-200 dark:text-white"
            >
              <div className="flex flex-col items-center gap-4">
                <PiWalletFill className="text-indigo-600 animate-pulse text-7xl" />
                <h1 className="text-2xl font-bold text-gray-800">
                  اعتبار خود را افزایش دهید
                </h1>
                <Image
                  src={walletImage || null}
                  alt="Wallet"
                  width={150}
                  height={150}
                  className="transform transition-all duration-500 hover:rotate-6"
                />
                <div className="mt-4 flex w-full flex-col items-center">
                  <label
                    htmlFor="amount"
                    className="mb-2 font-medium text-gray-700"
                  >
                    مقدار اعتبار مورد نظر (به تومان)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="focus:ring-indigo-500 text-black-800 mb-4 w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 dark:text-black"
                    placeholder="مبلغ را وارد کنید"
                  />
                  <div className="mb-4 flex gap-3">
                    {defaultAmounts.map((value) => (
                      <Button
                        key={value}
                        onClick={() => handleDefaultAmountClick(value)}
                        variant="outline"
                        className="hover:bg-indigo-600 border-gray-300 p-6 transition-all duration-300 hover:text-black"
                      >
                        {value.toLocaleString()} تومان
                      </Button>
                    ))}
                  </div>
                  <Button
                    onClick={handleSubmit}
                    size="lg"
                    className="group/btn hover:bg-indigo-700 w-full transform rounded-lg bg-orange py-3 font-semibold text-black transition-transform duration-300 hover:scale-105 dark:text-white"
                    isLoading={loading}
                  >
                    <span>افزایش اعتبار و رفتن به صفحه پرداخت</span>{' '}
                    <PiArrowLeftBold className="ms-2 mt-0.5 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {children}
      {/*<Popover*/}
      {/*    isOpen={isOpen}*/}
      {/*    setIsOpen={setIsOpen}*/}
      {/*    content={() => <NotificationsList setIsOpen={setIsOpen} />}*/}
      {/*    shadow="sm"*/}
      {/*    placement={isMobile ? 'bottom' : 'bottom-end'}*/}
      {/*    className="z-50 px-0 pb-4 pe-6 pt-5 dark:bg-gray-100 [&>svg]:hidden [&>svg]:dark:fill-gray-100 sm:[&>svg]:inline-flex"*/}
      {/*>*/}
      {/*  {children}*/}
      {/*</Popover>*/}
    </>
  );
}

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'solid' | 'outline';
  className?: string;
};

// const Button: React.FC<ButtonProps> = ({
//                                            children,
//                                            onClick,
//                                            variant = 'solid',
//                                            className,
//                                        }) => {
//     const baseStyle =
//         'px-6 py-2 rounded-lg font-medium transition duration-200 ease-in-out focus:outline-none';
//     const styles = {
//         solid: `bg-indigo-600 text-white hover:bg-indigo-700 ${baseStyle}`,
//         outline: `border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white ${baseStyle}`,
//     };
//
//     return (
//         <button onClick={onClick} className={cn(styles[variant], className)}>
//             {children}
//         </button>
//     );
// };
