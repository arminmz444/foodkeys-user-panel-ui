'use client';

import Link from 'next/link';
import Image from 'next/image';
import {Badge} from '@/components/ui/badge';
import {ActionIcon} from '@/components/ui/action-icon';
import RingBellSolidIcon from '@/components/icons/ring-bell-solid';
import ChatSolidIcon from '@/components/icons/chat-solid';
import SearchWidget from '@/components/search/search';
import MessagesDropdown from '@/layouts/messages-dropdown';
import NotificationDropdown from '@/layouts/notification-dropdown';
import ProfileMenu from '@/layouts/profile-menu';
import SettingsButton from '@/components/settings/settings-button';
import {useIsMounted} from '@/hooks/use-is-mounted';
import {useWindowScroll} from '@/hooks/use-window-scroll';
import HamburgerButton from '@/layouts/hydrogen/hamburger-button';
import {siteConfig} from '@/config/site.config';
import cn from '@/utils/class-names';
import Logo from '@/components/logo';
import {BsWalletFill} from "react-icons/bs";
import {Modal} from "rizzui";
import React, {RefObject, useEffect, useState} from "react";
import {useMedia} from "@/hooks/use-media";
import {Popover} from "@/components/ui/popover";
import {PiWalletFill} from "react-icons/pi";
import walletImage from "@public/wallet.png";
import {HiXMark} from "react-icons/hi2";
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {atom, useAtom} from "jotai";
import { updateNotificationsAtom } from '@/store/notificationStore'; // Import atoms from the store

// export const notificationsAtom = atom([]);

function HeaderMenuRight() {
    const [isOpen, setIsOpen] = useState(false);

    const [messages, setMessages] = useAtom(updateNotificationsAtom);


    useEffect(() => {
        const client = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            connectHeaders: {},
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
        });

        client.onConnect = () => {
            client.subscribe('/topic/notifications', message => {
                const notification = JSON.parse(message.body);
                // const notification = message.body;
                console.log(notification);
                // @ts-ignore
                setMessages(prev => [...prev, notification]);
                // setNo
            });
        };

        client.activate();

        return () => {
            client.deactivate();
        };
    }, []);

    return (
        <div className="ms-auto grid shrink-0 grid-cols-4 items-center gap-2 text-gray-700 xs:gap-3 xl:gap-4">
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
                    <RingBellSolidIcon className="h-[18px] w-auto"/>
                    <Badge
                        renderAsDot
                        color="warning"
                        enableOutlineRing
                        className="absolute right-2.5 top-2.5 -translate-y-1/3 translate-x-1/2"
                    />
                </ActionIcon>
            </NotificationDropdown>
            {/*// @ts-ignore*/}
            <WalletDropdown setIsOpen={setIsOpen} isOpen={isOpen}>
                <ActionIcon
                    aria-label="Notification"
                    onClick={() => setIsOpen(true)}
                    variant="text"
                    className="relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9"
                >
                    <PiWalletFill className="h-[18px] w-auto"/>
                </ActionIcon>
            </WalletDropdown>
            <SettingsButton/>
            <ProfileMenu/>
        </div>
    );
}

export default function Header() {
    const isMounted = useIsMounted();
    const windowScroll = useWindowScroll();
    return (
        <header
            className={cn(
                'sticky top-0 z-50 flex items-center bg-gray-0/80 px-4 py-4 backdrop-blur-xl dark:bg-gray-50/50 md:px-5 lg:px-6 2xl:py-5 3xl:px-8 4xl:px-10',
                ((isMounted && windowScroll.y) as number) > 2 ? 'card-shadow' : ''
            )}
        >
            <div className="flex w-full max-w-2xl items-center">
                <HamburgerButton/>
                <Link href={'/'} className="me-4 w-9 shrink-0 lg:me-5 xl:hidden">
                    <Logo iconOnly={true}/>
                </Link>
                <SearchWidget/>
            </div>
            <HeaderMenuRight/>
        </header>
    );
}

// @ts-ignore
function WalletDropdown({
                            children,
                            // @ts-ignore
                            setIsOpen,
                            // @ts-ignore
                            isOpen
                        }: {
    children: JSX.Element & { ref?: RefObject<any> };
}) {
    const isMobile = useMedia('(max-width: 480px)', false);

    const [amount, setAmount] = useState<number>(0);

    const handleDefaultAmountClick = (value: number) => {
        setAmount(value);
    };

    const handleSubmit = () => {
        if (amount <= 0) {
            alert('لطفا مبلغ معتبری وارد کنید');
            return;
        }
        alert(`در حال هدایت به درگاه بانکی برای پرداخت مبلغ ${amount} تومان`);
    };
    const defaultAmounts = [50000, 100000, 250000, 500000];

    return (
        <>
            <Modal size="lg" isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div className="m-auto px-7 pt-6 pb-8">
                    <div className="flex items-center justify-between">
                        <h3>افزایش اعتبار کیف پول</h3>
                        <ActionIcon
                            size="sm"
                            variant="text"
                            onClick={() => setIsOpen(false)}
                        >
                            <HiXMark className="h-auto w-6" strokeWidth={1.8}/>
                        </ActionIcon>
                    </div>
                    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700 p-4 text-black">
                        <div style={{backgroundColor: "#c1bfbd69"}}
                            // style={{ backgroundColor: "#f5deb369" }}
                             className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6 text-center transform transition-all duration-300 hover:scale-105">
                            <div className="flex flex-col items-center gap-4">
                                <PiWalletFill className="text-indigo-600 text-7xl animate-pulse"/>
                                <h1 className="text-2xl font-bold text-gray-800">
                                    اعتبار خود را افزایش دهید
                                </h1>
                                <Image
                                    src={walletImage}
                                    alt="Wallet"
                                    width={150}
                                    height={150}
                                    className="transform transition-all duration-500 hover:rotate-6"
                                />
                                <div className="w-full flex flex-col items-center mt-4">
                                    <label
                                        htmlFor="amount"
                                        className="text-gray-700 font-medium mb-2"
                                    >
                                        مقدار اعتبار مورد نظر (به تومان)
                                    </label>
                                    <input
                                        type="number"
                                        id="amount"
                                        value={amount}
                                        onChange={(e) => setAmount(Number(e.target.value))}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black-800 mb-4"
                                        placeholder="مبلغ را وارد کنید"
                                    />
                                    <div className="flex gap-3 mb-4">
                                        {defaultAmounts.map((value) => (
                                            <Button
                                                key={value}
                                                onClick={() => handleDefaultAmountClick(value)}
                                                variant="outline"
                                                className="hover:bg-indigo-600 hover:text-black transition-all duration-300"
                                            >
                                                {value.toLocaleString()} تومان
                                            </Button>
                                        ))}
                                    </div>
                                    <Button
                                        onClick={handleSubmit}
                                        variant="solid"
                                        className="bg-orange text-black w-full py-3 rounded-lg font-semibold hover:bg-indigo-700 transform transition-transform duration-300 hover:scale-105"
                                    >
                                        افزایش اعتبار و رفتن به صفحه پرداخت
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

const Button: React.FC<ButtonProps> = ({
                                           children,
                                           onClick,
                                           variant = 'solid',
                                           className,
                                       }) => {
    const baseStyle =
        'px-6 py-2 rounded-lg font-medium transition duration-200 ease-in-out focus:outline-none';
    const styles = {
        solid: `bg-indigo-600 text-white hover:bg-indigo-700 ${baseStyle}`,
        outline: `border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white ${baseStyle}`,
    };

    return (
        <button onClick={onClick} className={cn(styles[variant], className)}>
            {children}
        </button>
    );
};

