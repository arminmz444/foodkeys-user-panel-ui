'use client';

import { PinCode } from '@/components/ui/pin-code';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { SubmitHandler } from 'react-hook-form';
import { PiArrowLeftBold, PiArrowRightBold } from 'react-icons/pi';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import {SEND_OTP_SCENARIOS} from "@/core/dto/enums/send-otp-scenarios";

type FormValues = {
  phoneNumber: string;
  otp: string;
};

type SendOtpFormValues = {
  phoneNumber: string;
};

// @ts-ignore
export default function OtpForm({ setStep, setPhoneNumber: setParentPhoneNumber }) {
  // @ts-ignore
  const { loginOtp, requestOtp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isOtpSent, setOtpSent] = useState<boolean>(false);
  const [resendTimer, setResendTimer] = useState(120); // 2 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // Timer countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0 && isOtpSent) {
      interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resendTimer, isOtpSent]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle resend OTP
  const handleResendOtp = async () => {
    if (!canResend || isResending) return;
    
    setIsResending(true);
    try {
      await requestOtp(phoneNumber);
      setResendTimer(120); // Reset timer to 2 minutes
      setCanResend(false);
      toast.success('رمز یکبار مصرف مجددا ارسال شد');
    } catch (error) {
      console.error('Failed to resend OTP:', error);
      toast.error('خطا در ارسال مجدد رمز یکبار مصرف');
    } finally {
      setIsResending(false);
    }
  };

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
        toast.error('خطا در تایید کد یکبار مصرف');
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
      const sendOtpScenario = await requestOtp(data.phoneNumber);
      if (sendOtpScenario === SEND_OTP_SCENARIOS.REGISTERED) {
        setOtpSent(true);
        setPhoneNumber(data.phoneNumber);
        setResendTimer(120); // Start 2 minute timer
        setCanResend(false);
      } else if (sendOtpScenario === SEND_OTP_SCENARIOS.NEED_TO_REGISTER) {
        if (setParentPhoneNumber) {
          setParentPhoneNumber(data.phoneNumber);
        }
        setStep("SIGNUP");
      }
      else if (sendOtpScenario === SEND_OTP_SCENARIOS.IS_BLOCKED) {
        setOtpSent(true);
        setPhoneNumber(data.phoneNumber);
        setStep("BLOCKED")
      } else throw new Error("Failed to send otp");
    } catch (error) {
      console.error(error);
      toast.error('خطا در ارسال کد یکبار مصرف\n لطفا از طریق رمزعبور وارد شوید');
    } finally {
      setLoading(false);
    }
  };
  // @ts-ignore
  return isOtpSent ? (
    <>
      <Text className="-mt-1 mb-9 text-center text-[15px] leading-[1.85] text-gray-700 md:text-base md:!leading-loose lg:text-start xl:-mt-6">
        کد یکبار مصرف برای شما ارسال شد
      </Text>
      <Form<FormValues> onSubmit={onSubmit}>
        {({ setValue, register, setError }) => (
          <div dir="rtl" className="space-y-6">
            <div dir="ltr" className="flex flex-col items-center gap-4">
              <PinCode
                dir="ltr"
                variant="outline"
                length={6}
                setValue={(value) => setValue('otp', String(value))}
                size="lg"
                color="success"
                className="w-full justify-center"
              />
              
              {/* Resend OTP Button */}
              <div className="flex flex-col items-center gap-2 w-full">
                <Button 
                  type="button"
                  onClick={handleResendOtp}
                  disabled={!canResend || isResending}
                  className={`
                    w-full max-w-xs
                    px-6 py-3
                    text-base font-semibold
                    rounded-lg
                    transition-all duration-300
                    shadow-md hover:shadow-lg
                    ${canResend 
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                  `}
                >
                  {isResending ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      در حال ارسال...
                    </span>
                  ) : canResend ? (
                    'ارسال مجدد رمز یکبار مصرف'
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <span className="font-mono font-bold">{formatTime(resendTimer)}</span>
                      ارسال مجدد در
                    </span>
                  )}
                </Button>
                {!canResend && resendTimer > 0 && (
                  <Text className="text-sm text-gray-500 text-center">
                    لطفاً تا پایان زمان صبر کنید
                  </Text>
                )}
              </div>
            </div>

            <Button
              isLoading={loading}
              className="w-full mt-6"
              type="submit"
              size="lg"
              color="success"
            >
              <span>ورود به حساب کاربری</span>{' '}
              <PiArrowLeftBold className="ms-2 mt-0.5 h-5 w-5" />
            </Button>
          </div>
        )}
      </Form>
    </>
  ) : (
    <Form<SendOtpFormValues> onSubmit={onSendOtpSubmit}>
      {({ setValue, register, setError, formState: { errors } }) => (
        <div className="space-y-10">
          <div className="px-3">
            <Input
              type="number"
              variant="outline"
              label="شماره خود را وارد کنید"
              placeholder="********* 09"
              // @ts-ignore
              {...register('phoneNumber')}
              // @ts-ignore
              error={errors.phoneNumber}
              size="lg"
              color="success"
              className="lg:justify-end"
              max={11}
              maxLength={11}
            />
          </div>
          <Button
            className="w-full text-base font-medium"
            type="submit"
            size="lg"
            color="success"
            isLoading={loading}
          >
            ارسال کد یکبار مصرف
          </Button>
        </div>
      )}
    </Form>
  );
}
