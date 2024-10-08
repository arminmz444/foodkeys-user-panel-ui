'use client';
// pages/increase-credit.tsx
import cn from '@/utils/class-names';
import {routes} from '@/config/routes';
import React, {useState} from 'react';
import Image from 'next/image';
import {PiWalletFill} from 'react-icons/pi';
import walletImage from '../../../../../public/wallet.png';
import PageHeader from "@/app/shared/page-header";

const defaultAmounts = [50000, 100000, 250000, 500000];
const pageHeader = {
    title: 'کیف پول',
    breadcrumb: [
        {
            href: routes.finance.dashboard,
            name: 'مدیریت مالی',
        },
        {
            href: routes.wallet.main,
            name: 'کیف پول',
        },
    ],
};
export default function IncreaseCreditPage() {


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

    return (
        <>
            <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}/>
            <div
                className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700 p-4 text-black">
                <div style={{backgroundColor: "#c1bfbd69"}}
                    // style={{ backgroundColor: "#f5deb369" }}
                     className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6 text-center transform transition-all duration-300 hover:scale-105">
                    <div className="flex flex-col items-center gap-4">
                        <PiWalletFill className="text-indigo-600 text-7xl animate-pulse"/>
                        <h1 className="text-2xl font-bold text-gray-800">
                            افزایش اعتبار کیف پول
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

