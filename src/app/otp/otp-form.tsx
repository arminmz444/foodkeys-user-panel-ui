'use client';

import {PinCode} from '@/components/ui/pin-code';
import {Button} from '@/components/ui/button';
import {Form} from '@/components/ui/form';
import {SubmitHandler} from 'react-hook-form';
import {PiArrowLeftBold, PiArrowRightBold} from "react-icons/pi";
import Link from "next/link";
import {useState} from "react";
import {Input} from "@/components/ui/input";
import {Text} from "@/components/ui/text";
import {useAuth} from "@/context/AuthContext";
import toast from "react-hot-toast";

type FormValues = {
    phoneNumber: string;
    otp: string;
};

type SendOtpFormValues = {
    phoneNumber: string;
};


export default function OtpForm() {
    // @ts-ignore
    const { loginOtp, requestOtp } = useAuth()
    const [loading, setLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isOtpSent, setOtpSent] = useState<boolean>(false);
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        console.log(phoneNumber);
        setLoading(true);
        const otpCode = data.otp;
        if (otpCode.length === 6) {
            setLoading(true);
            try {
                await loginOtp(phoneNumber, otpCode);
            } catch (error) {
                console.error('OTP login error:', error);
                toast.error('خطا در تایید کد یکبار مصرف')
            } finally {
                setLoading(false);
            }
        }
    };
    const onSendOtpSubmit: SubmitHandler<SendOtpFormValues> = async (data) => {
        try {
            console.log(data);
            setLoading(true);
            // setOtpSent(true);
            // setOtpValues(['', '', '', '', '', '']);
            const isOtpSent = await requestOtp(data.phoneNumber);
            if (isOtpSent) {
                setOtpSent(true);
                setPhoneNumber(data.phoneNumber);
            }
        } catch (error) {
            console.error(error);
            toast.error('خطا در ارسال کد یکبار مصرف')
        } finally {
            setLoading(false)
        }
    }
    // @ts-ignore
    return (
        isOtpSent ? (
            <>
                <Text
                    className="-mt-1 mb-9 text-center text-[15px] leading-[1.85] text-gray-700 md:text-base md:!leading-loose lg:text-start xl:-mt-6">
                    کد یکبار مصرف برای شما ارسال شد
                </Text>
                <Form<FormValues> onSubmit={onSubmit}>
                    {({setValue, register, setError}) => (
                        <div dir="rtl" className="space-y-10">
                            <div dir="ltr">
                                <PinCode
                                    dir="ltr"
                                    variant="outline"
                                    length={6}
                                    setValue={(value) => setValue('otp', String(value))}
                                    size="lg"
                                    color="info"
                                    className="lg:justify-end"
                                />
                            </div>
                            <Button isLoading={loading} className="w-full" type="submit" size="lg" color="info">
                                <span>ورود به حساب کاربری</span>{' '}
                                <PiArrowLeftBold className="ms-2 mt-0.5 h-5 w-5"/>
                            </Button>
                            <Link
                                href={'/login'}
                                className="start-0 hidden p-3 text-gray-500 hover:text-gray-700 lg:flex lg:items-center 2xl:-top-7 2xl:ps-5"
                            >
                                <PiArrowRightBold/>
                                <b className="ms-1 font-medium">ورود از طریق رمزعبور</b>
                            </Link>
                            <div className="">
                                <Button
                                    className="-mt-4 w-full p-0 text-base font-medium text-primary underline lg:inline-flex lg:w-auto"
                                    type="submit"
                                    variant="text"
                                >
                                    ارسال مجدد کد یکبار مصرف
                                </Button>
                            </div>
                        </div>
                    )}
                </Form>
            </>) : <Form<SendOtpFormValues> onSubmit={onSendOtpSubmit}>
            {({setValue, register,
                  setError, formState: {errors}}) => (
                <div dir="rtl" className="space-y-10">
                    <div dir="ltr" className="px-3">
                        <Input
                            dir="rtl"
                            type="number"
                            variant="outline"
                            placeholder="شماره خود را وارد کنید"
                            {...register('phoneNumber')}
                            // @ts-ignore
                            error={errors.phoneNumber}
                            size="lg"
                            color="info"
                            className="lg:justify-end"
                        />
                    </div>
                    <Button
                        className="w-full text-base font-medium"
                        type="submit"
                        size="lg"
                        color="info"
                        isLoading={loading}
                    >
                        ارسال کد یکبار مصرف
                    </Button>
                    <Link
                        href={'/login'}
                        className="start-0 hidden p-3 text-gray-500 hover:text-gray-700 lg:flex lg:items-center 2xl:-top-7 2xl:ps-5"
                    >
                        <PiArrowRightBold/>
                        <b className="ms-1 font-medium">ورود از طریق رمزعبور</b>
                    </Link>
                </div>
            )}
        </Form>
    );
}
