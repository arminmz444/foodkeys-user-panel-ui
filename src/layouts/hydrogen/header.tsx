'use client';
import { numberToWords } from '@persian-tools/persian-tools';

import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ActionIcon } from '@/components/ui/action-icon';
import RingBellSolidIcon from '@/components/icons/ring-bell-solid';
import SearchWidget from '@/components/search/search';
import NotificationDropdown from '@/layouts/notification-dropdown';
import ProfileMenu from '@/layouts/profile-menu';
import SettingsButton from '@/components/settings/settings-button';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { useWindowScroll } from '@/hooks/use-window-scroll';
import HamburgerButton from '@/layouts/hydrogen/hamburger-button';
import cn from '@/utils/class-names';
import Logo from '@/components/logo';
import { Button, Modal } from 'rizzui';
import React, { RefObject, useState } from 'react';
import { PiWalletFill } from 'react-icons/pi';
import { HiXMark } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import useAxiosPrivate from '@/hooks/use-axios-private';
import addCreditImg2 from 'public/addCreditLogo.webp';
import { useNotifications } from '@/context/NotificationContext';

function HeaderMenuRight() {
  const [isOpen, setIsOpen] = useState(false);
  const { unreadCount } = useNotifications();

  return (
    <div className="ms-auto grid shrink-0 grid-cols-4 items-center gap-2 text-gray-700 print:hidden xs:gap-3 xl:gap-4">
      {/* Notification Bell with unread badge (polling-driven) */}
      <NotificationDropdown>
        <ActionIcon
          aria-label="Notification"
          variant="text"
          className="relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9"
        >
          <RingBellSolidIcon className="h-[18px] w-auto" />
          {unreadCount > 0 ? (
            <Badge
              size="sm"
              color="danger"
              enableOutlineRing
              className="absolute -right-1 -top-1 min-w-[18px] justify-center px-1 text-[10px] leading-none"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          ) : null}
        </ActionIcon>
      </NotificationDropdown>

      {/* Wallet */}
      <WalletDropdown setIsOpen={setIsOpen} isOpen={isOpen}>
        <ActionIcon
          aria-label="Wallet"
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
  setIsOpen,
  isOpen,
}: {
  children: JSX.Element & { ref?: RefObject<any> };
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}) {
  const _axios = useAxiosPrivate();
  const [loading, setLoading] = useState(false);

  const [amount, setAmount] = useState<number>(1_000_000);

  const handleDefaultAmountClick = (value: number) => {
    setAmount(value * 1_000_000);
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
  };
  const defaultAmounts = [1, 5, 10];

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} customSize="1080px">
        <div className="m-auto rounded-xl bg-gray-50 px-7 pt-8 dark:bg-gray-100 dark:text-white">
          <div className="flex items-center justify-between">
            <h3>افزایش اعتبار کیف پول</h3>
            <ActionIcon size="sm" variant="text" onClick={() => setIsOpen(false)}>
              <HiXMark className="h-auto w-6" strokeWidth={1.8} />
            </ActionIcon>
          </div>
          <div className="from-blue-500 to-indigo-700 flex max-h-screen items-center justify-center gap-5 bg-gradient-to-br px-1 py-6 text-black dark:bg-gray-100 sm:px-4 lg:gap-20">
            <div className="flex w-full flex-col items-start justify-center md:w-3/5">
              <Input
                label="مبلغ"
                suffix="تومان"
                placeholder="10,000,000"
                inputClassName="text-center"
                dir="ltr"
                className="w-full  dark:text-white"
                value={amount !== 0 ? amount : amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
              <div className="flex w-full items-center justify-center gap-1">
                {defaultAmounts.map((value) => (
                  <button
                    key={value}
                    className="mt-7 w-full rounded-md border border-black px-[2px] py-2 text-xs shadow-lg transition-all duration-100 ease-in-out hover:bg-gray-200 active:scale-95 dark:bg-[#fff1] dark:text-white dark:hover:bg-[#ffffff34] sm:px-2 sm:text-base lg:px-5"
                    onClick={() => handleDefaultAmountClick(value)}
                  >
                    {value} میلیون تومان
                  </button>
                ))}
              </div>
              <hr className="mt-7 h-[2px] w-full bg-gray-100 " />
              <div className="mt-7 flex items-center justify-center gap-3">
                <Badge color="success" rounded="md">
                  به حروف
                </Badge>
                <p className="font-bold dark:text-white">
                  {String(numberToWords(Number(amount)))} تومان
                </p>
              </div>
              <Button
                className="mt-7 w-full  rounded-md  bg-gradient-to-r from-[#a8ff78] to-[#78ffd6] px-5 py-2 text-xl text-black transition-all duration-200 ease-in-out hover:scale-105 active:scale-100"
                onClick={handleSubmit}
                isLoading={loading}
              >
                پرداخت
              </Button>
            </div>
            <div className="hidden w-2/5 items-center justify-center md:flex">
              <Image
                src={addCreditImg2 || null}
                alt="افزایش اعتبار"
                className="w-64"
              />
            </div>
          </div>
        </div>
      </Modal>
      {children}
    </>
  );
}
