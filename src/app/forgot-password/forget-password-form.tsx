'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Password } from '@/components/ui/password';
import { PinCode } from '@/components/ui/pin-code';
import { Text } from '@/components/ui/text';
import CaptchaField from '@/components/auth/captcha-field';
import { routes } from '@/config/routes';
import { useAuth } from '@/context/AuthContext';
import { useCaptcha } from '@/hooks/use-captcha';
import { CAPTCHA_ERROR } from '@/utils/auth-captcha';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { PiArrowLeftBold, PiArrowRightBold } from 'react-icons/pi';
import * as z from 'zod';

type VerifyFormValues = {
  phoneNumber: string;
  otp: string;
};
type OtpFormValues = {
  phoneNumber: string;
};
type FormValues = {
  username: string;
  password: string;
  confirmPassword: string;
};
const otpInitialValues = {
  phoneNumber: '',
};
const verifyInitialValues = {
  phoneNumber: '',
  otp: '',
};

const initialValues = {
  username: '',
  password: '',
};

const otpFormSchema = z.object({
  phoneNumber: z
    .string({ required_error: 'این فیلد الزامی است' })
    .nonempty({ message: 'نام کاربری الزامی است' })
    .regex(/^0[0-9]{10}$/, { message: 'فرمت نام کاربری اشتباه است' }),
});

const verifyFormSchema = z.object({
  otp: z.string().min(6, 'این فیلد الزامی است'),
});
const formSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'رمز عبور باید حداقل ۸ یا بیشتر از کاراکترها باشد.' })
      .max(32, { message: 'رمز عبور باید حداکثر ۳۲ کاراکتر باشد.' })
      .regex(new RegExp('.*[A-Z].*'), {
        message: 'حداقل یک حرف بزرگ مورد استفاده قرار گیرد.',
      })
      .regex(new RegExp('.*[a-z].*'), {
        message: 'حداقل یک حرف کوچک مورد استفاده قرار گیرد.',
      })
      .regex(new RegExp('.*\\d.*'), {
        message: 'حداقل یک عدد مورد استفاده قرار گیرد.',
      }),
    confirmPassword: z
      .string()
      .min(8, { message: 'رمز عبور باید حداقل ۸ یا بیشتر از کاراکترها باشد.' })
      .max(32, { message: 'رمز عبور باید حداکثر ۳۲ کاراکتر باشد.' })
      .regex(new RegExp('.*[A-Z].*'), {
        message: 'حداقل یک حرف بزرگ مورد استفاده قرار گیرد.',
      })
      .regex(new RegExp('.*[a-z].*'), {
        message: 'حداقل یک حرف کوچک مورد استفاده قرار گیرد.',
      })
      .regex(new RegExp('.*\\d.*'), {
        message: 'حداقل یک عدد مورد استفاده قرار گیرد.',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'رمز عبور و تکرار آن باید یکسان باشند.',
    path: ['confirmPassword'],
  });

const STEPS = {
  INITIAL: 'INITIAL',
  OTP: 'OTP',
  UPDATE: 'UPDATE',
};

export default function ForgetPasswordForm() {
  const [reset, setReset] = useState({});
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState<string>(STEPS.INITIAL);
  // @ts-ignore
  const { forgotPassword, forgotPasswordOtp, forgotPasswordVerify } = useAuth();
  const captcha = useCaptcha({ autoFetch: true });

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

  const onOtpSubmit: SubmitHandler<OtpFormValues> = async (data) => {
    console.log(data);
    setLoading(true);
    setPhoneNumber(data.phoneNumber);

    if (!captcha.answer.trim()) {
      captcha.setError('کد کپچا الزامی است');
      setLoading(false);
      return;
    }

    const result = await forgotPasswordOtp(data.phoneNumber, captcha.getPayload());
    if (result?.success) {
      setStep(STEPS.OTP);
      await captcha.refresh();
    } else {
      await handleCaptchaFailure(result || {});
    }
    setLoading(false);
  };

  const onVerifySubmit: SubmitHandler<VerifyFormValues> = async (data) => {
    console.log(data);
    setLoading(true);
    let isVerified = await forgotPasswordVerify(data.otp, phoneNumber);
    if (isVerified) setStep(STEPS.UPDATE);
    setLoading(false);
  };

  const onResendOtp = async () => {
    if (!phoneNumber) return;
    if (!captcha.answer.trim()) {
      captcha.setError('کد کپچا الزامی است');
      return;
    }
    setLoading(true);
    const result = await forgotPasswordOtp(phoneNumber, captcha.getPayload());
    if (result?.success) {
      await captcha.refresh();
    } else {
      await handleCaptchaFailure(result || {});
    }
    setLoading(false);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    setLoading(true);
    await forgotPassword(data.password, phoneNumber);
    setLoading(false);
  };

  return (
    <>
      {step === STEPS.OTP ? (
        <>
          <Text className="-mt-1 mb-9 text-center text-[15px] leading-[1.85] text-gray-700 md:text-base md:!leading-loose lg:text-start xl:-mt-6">
            کد یکبار مصرف برای شما ارسال شد
          </Text>
          <Form<VerifyFormValues>
            // @ts-ignore
            validationSchema={verifyFormSchema}
            resetValues={reset}
            onSubmit={onVerifySubmit}
            useFormProps={{
              defaultValues: verifyInitialValues,
            }}
          >
            {({ setValue }) => (
              <div dir="rtl" className="space-y-10">
                <div dir="ltr">
                  <PinCode
                    dir="ltr"
                    variant="outline"
                    length={6}
                    setValue={(value) => setValue('otp', String(value))}
                    size="lg"
                    color="success"
                    className="lg:justify-end"
                  />
                </div>
                <CaptchaField
                  imageSrc={captcha.imageSrc}
                  answer={captcha.answer}
                  onAnswerChange={captcha.setAnswer}
                  onRefresh={captcha.refresh}
                  loading={captcha.loading}
                  error={captcha.error}
                  color="success"
                />
                <Button
                  isLoading={loading}
                  className="w-full"
                  type="submit"
                  size="lg"
                  color="success"
                >
                  <span>بازنشانی رمزعبور</span>{' '}
                  <PiArrowLeftBold className="ms-2 mt-0.5 h-5 w-5" />
                </Button>
                <Link
                  href={'/login'}
                  className="start-0 hidden p-3 text-gray-500 hover:text-gray-700 lg:flex lg:items-center 2xl:-top-7 2xl:ps-5"
                >
                  <PiArrowRightBold />
                  <b className="ms-1 font-medium">ورود از طریق رمزعبور</b>
                </Link>
                <div className="">
                  <Button
                    className="-mt-4 w-full p-0 text-base font-medium text-primary underline lg:inline-flex lg:w-auto"
                    type="button"
                    variant="text"
                    onClick={onResendOtp}
                    disabled={loading}
                  >
                    ارسال مجدد کد یکبار مصرف
                  </Button>
                </div>
              </div>
            )}
          </Form>
        </>
      ) : step === STEPS.UPDATE ? (
        <Form<FormValues>
          // @ts-ignore
          validationSchema={formSchema}
          resetValues={reset}
          onSubmit={onSubmit}
          useFormProps={{
            defaultValues: initialValues,
          }}
          className="pt-1.5"
        >
          {({ register, formState: { errors } }) => (
            <div className="space-y-6">
              <Password
                label="رمز عبور"
                placeholder="رمز عبور خود را وارد کنید"
                size="lg"
                className="[&>label>span]:font-medium"
                color="success"
                inputClassName="text-sm"
                {...register('password')}
                error={errors.password?.message}
              />
              <Password
                label="تکرار رمز عبور"
                placeholder="تکرار رمز عبور را وارد کنید"
                size="lg"
                className="[&>label>span]:font-medium"
                color="success"
                inputClassName="text-sm"
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
              />
              <Button
                className="mt-2 w-full"
                type="submit"
                size="lg"
                color="success"
                isLoading={loading}
              >
                بازنشانی رمز عبور
              </Button>
            </div>
          )}
        </Form>
      ) : (
        <Form<OtpFormValues>
          validationSchema={otpFormSchema}
          resetValues={reset}
          onSubmit={onOtpSubmit}
          useFormProps={{
            defaultValues: otpInitialValues,
          }}
          className="pt-1.5"
        >
          {({ register, formState: { errors } }) => (
            <div className="space-y-6">
              <Input
                type="email"
                size="lg"
                label="نام کاربری"
                placeholder="نام کاربری خود را وارد کنید"
                className="[&>label>span]:font-medium"
                color="success"
                inputClassName="text-sm"
                {...register('phoneNumber')}
                error={errors.phoneNumber?.message}
              />
              <CaptchaField
                imageSrc={captcha.imageSrc}
                answer={captcha.answer}
                onAnswerChange={captcha.setAnswer}
                onRefresh={captcha.refresh}
                loading={captcha.loading}
                error={captcha.error}
                color="success"
              />
              <Button
                className="mt-2 w-full"
                type="submit"
                size="lg"
                color="success"
                isLoading={loading}
              >
                بازنشانی رمز عبور
              </Button>
            </div>
          )}
        </Form>
      )}
      <Text className="mt-6 text-center text-[15px] leading-loose text-gray-500 lg:mt-8 lg:text-start xl:text-base">
        نمی‌خواهید رمز عبور خود را بازنشانی کنید{' '}
        <Link
          href={routes.signIn}
          className="font-bold text-gray-700 transition-colors hover:text-blue"
        >
          ورود
        </Link>
      </Text>
    </>
  );
}
