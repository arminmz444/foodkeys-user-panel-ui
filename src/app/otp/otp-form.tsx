'use client';

import { PinCode } from '@/components/ui/pin-code';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { SubmitHandler } from 'react-hook-form';
import { PiArrowLeftBold } from 'react-icons/pi';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { SEND_OTP_SCENARIOS } from '@/core/dto/enums/send-otp-scenarios';
import CaptchaField from '@/components/auth/captcha-field';
import { useCaptcha } from '@/hooks/use-captcha';
import { CAPTCHA_ERROR } from '@/utils/auth-captcha';

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
  const [resendTimer, setResendTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const captcha = useCaptcha({ autoFetch: true });

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

  useEffect(() => {
    if (canResend && isOtpSent) {
      void captcha.refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canResend, isOtpSent]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCaptchaFailure = async (result?: {
    errorType?: string;
    captchaRequired?: boolean;
  }) => {
    if (result?.errorType === CAPTCHA_ERROR.INVALID) {
      captcha.setError('کپچا نامعتبر');
    } else if (
      result?.errorType === CAPTCHA_ERROR.REQUIRED ||
      result?.captchaRequired
    ) {
      captcha.setError(undefined);
    }
    await captcha.refresh();
  };

  const handleResendOtp = async () => {
    if (!canResend || isResending) return;

    setIsResending(true);
    try {
      const result = await requestOtp(phoneNumber, captcha.getPayload());
      if (result?.success) {
        setResendTimer(120);
        setCanResend(false);
        toast.success('رمز یکبار مصرف مجددا ارسال شد');
        await captcha.refresh();
      } else {
        await handleCaptchaFailure(result || {});
      }
    } catch (error) {
      console.error('Failed to resend OTP:', error);
      toast.error('خطا در ارسال مجدد رمز یکبار مصرف');
      await captcha.refresh();
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
      if (!captcha.answer.trim()) {
        captcha.setError('کد کپچا الزامی است');
        return;
      }
      const result = await requestOtp(data.phoneNumber, captcha.getPayload());
      const sendOtpScenario = result?.scenario;

      if (sendOtpScenario === SEND_OTP_SCENARIOS.REGISTERED) {
        setOtpSent(true);
        setPhoneNumber(data.phoneNumber);
        setResendTimer(120);
        setCanResend(false);
        await captcha.refresh();
      } else if (sendOtpScenario === SEND_OTP_SCENARIOS.NEED_TO_REGISTER) {
        if (setParentPhoneNumber) {
          setParentPhoneNumber(data.phoneNumber);
        }
        setStep('SIGNUP');
      } else if (sendOtpScenario === SEND_OTP_SCENARIOS.IS_BLOCKED) {
        setOtpSent(true);
        setPhoneNumber(data.phoneNumber);
        setStep('BLOCKED');
      } else {
        await handleCaptchaFailure(result || {});
        if (!result?.message) {
          toast.error('خطا در ارسال کد یکبار مصرف\n لطفا از طریق رمزعبور وارد شوید');
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('خطا در ارسال کد یکبار مصرف\n لطفا از طریق رمزعبور وارد شوید');
      await captcha.refresh();
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
        {({ setValue }) => (
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

              <div className="flex w-full flex-col items-center gap-2">
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
                    ${
                      canResend
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                  `}
                >
                  {isResending ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="h-5 w-5 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      در حال ارسال...
                    </span>
                  ) : canResend ? (
                    'ارسال مجدد رمز یکبار مصرف'
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <span className="font-mono font-bold">
                        {formatTime(resendTimer)}
                      </span>
                      ارسال مجدد در
                    </span>
                  )}
                </Button>
                {!canResend && resendTimer > 0 && (
                  <Text className="text-center text-sm text-gray-500">
                    لطفاً تا پایان زمان صبر کنید
                  </Text>
                )}
              </div>

              {canResend && (
                <CaptchaField
                  className="w-full max-w-md"
                  imageSrc={captcha.imageSrc}
                  answer={captcha.answer}
                  onAnswerChange={captcha.setAnswer}
                  onRefresh={captcha.refresh}
                  loading={captcha.loading}
                  error={captcha.error}
                  color="success"
                />
              )}
            </div>

            <Button
              isLoading={loading}
              className="mt-6 w-full"
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
      {({ register, formState: { errors } }) => (
        <div className="space-y-6">
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
          <div className="px-3">
            <CaptchaField
              imageSrc={captcha.imageSrc}
              answer={captcha.answer}
              onAnswerChange={captcha.setAnswer}
              onRefresh={captcha.refresh}
              loading={captcha.loading}
              error={captcha.error}
              color="success"
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
