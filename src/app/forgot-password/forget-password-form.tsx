'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Password } from '@/components/ui/password';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Password } from '@/components/ui/password';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import * as z from 'zod';
import { useState } from 'react';
import { Text } from '@/components/ui/text';
import { routes } from '@/config/routes';
import { useState } from 'react';
import { Text } from '@/components/ui/text';
import { routes } from '@/config/routes';
import Link from 'next/link';
import { PinCode } from '@/components/ui/pin-code';
import { PiArrowLeftBold, PiArrowRightBold } from 'react-icons/pi';
import { login as reduxLogin } from '@/store/userSlice';
import { useAuth } from '@/context/AuthContext';
import { PinCode } from '@/components/ui/pin-code';
import { PiArrowLeftBold, PiArrowRightBold } from 'react-icons/pi';
import { login as reduxLogin } from '@/store/userSlice';
import { useAuth } from '@/context/AuthContext';

type VerifyFormValues = {
  phoneNumber: string;
  otp: string;
  phoneNumber: string;
  otp: string;
};
type OtpFormValues = {
  phoneNumber: string;
  phoneNumber: string;
};
type FormValues = {
  username: string;
  password: string;
  confirmPassword: string;
  username: string;
  password: string;
  confirmPassword: string;
};
const otpInitialValues = {
  phoneNumber: '',
  // password: '',
  // confirmPassword: '',
  phoneNumber: '',
  // password: '',
  // confirmPassword: '',
};
const verifyInitialValues = {
  phoneNumber: '',
  otp: '',
};
  phoneNumber: '',
  otp: '',
};
const initialValues = {
  username: '',
  password: '',
};
  username: '',
  password: '',
};

const otpFormSchema = z.object({
  phoneNumber: z
    .string({ required_error: 'این فیلد الزامی است' })
    .nonempty({ message: 'نام کاربری الزامی است' })
    .regex(/^0[0-9]{10}$/, { message: 'فرمت نام کاربری اشتباه است' }),
  // password: z
  //   .string()
  //   .min(8, { message: 'رمز عبور باید حداقل ۸ یا بیشتر از کاراکترها باشد.' })
  //   .max(32, { message: 'رمز عبور باید حداکثر ۳۲ کاراکتر باشد.' })
  //   .regex(new RegExp('.*[A-Z].*'), {
  //     message: 'حداقل یک حرف بزرگ مورد استفاده قرار گیرد.',
  //   })
  //   .regex(new RegExp('.*[a-z].*'), {
  //     message: 'حداقل یک حرف کوچک مورد استفاده قرار گیرد.',
  //   })
  //   .regex(new RegExp('.*\\d.*'), {
  //     message: 'حداقل یک عدد مورد استفاده قرار گیرد.',
  //   }),
  // confirmPassword: z
  //   .string()
  //   .regex(new RegExp('.*[A-Z].*'), {
  //     message: 'حداقل یک حرف بزرگ مورد استفاده قرار گیرد.',
  //   })
  //   .regex(new RegExp('.*[a-z].*'), {
  //     message: 'حداقل یک حرف کوچک مورد استفاده قرار گیرد.',
  //   })
  //   .regex(new RegExp('.*\\d.*'), {
  //     message: 'حداقل یک عدد مورد استفاده قرار گیرد.',
  //   })
  //   .min(8, { message: 'رمز عبور باید حداقل ۸ یا بیشتر از کاراکترها باشد.' })
  //   .max(32, { message: 'رمز عبور باید حداکثر ۳۲ کاراکتر باشد.' }),
  phoneNumber: z
    .string({ required_error: 'این فیلد الزامی است' })
    .nonempty({ message: 'نام کاربری الزامی است' })
    .regex(/^0[0-9]{10}$/, { message: 'فرمت نام کاربری اشتباه است' }),
  // password: z
  //   .string()
  //   .min(8, { message: 'رمز عبور باید حداقل ۸ یا بیشتر از کاراکترها باشد.' })
  //   .max(32, { message: 'رمز عبور باید حداکثر ۳۲ کاراکتر باشد.' })
  //   .regex(new RegExp('.*[A-Z].*'), {
  //     message: 'حداقل یک حرف بزرگ مورد استفاده قرار گیرد.',
  //   })
  //   .regex(new RegExp('.*[a-z].*'), {
  //     message: 'حداقل یک حرف کوچک مورد استفاده قرار گیرد.',
  //   })
  //   .regex(new RegExp('.*\\d.*'), {
  //     message: 'حداقل یک عدد مورد استفاده قرار گیرد.',
  //   }),
  // confirmPassword: z
  //   .string()
  //   .regex(new RegExp('.*[A-Z].*'), {
  //     message: 'حداقل یک حرف بزرگ مورد استفاده قرار گیرد.',
  //   })
  //   .regex(new RegExp('.*[a-z].*'), {
  //     message: 'حداقل یک حرف کوچک مورد استفاده قرار گیرد.',
  //   })
  //   .regex(new RegExp('.*\\d.*'), {
  //     message: 'حداقل یک عدد مورد استفاده قرار گیرد.',
  //   })
  //   .min(8, { message: 'رمز عبور باید حداقل ۸ یا بیشتر از کاراکترها باشد.' })
  //   .max(32, { message: 'رمز عبور باید حداکثر ۳۲ کاراکتر باشد.' }),
});

const verifyFormSchema = z.object({
  otp: z.string().min(6, 'این فیلد الزامی است'),
  // password: z
  //   .string()
  //   .min(8, { message: 'رمز عبور باید حداقل ۸ یا بیشتر از کاراکترها باشد.' })
  //   .max(32, { message: 'رمز عبور باید حداکثر ۳۲ کاراکتر باشد.' })
  //   .regex(new RegExp('.*[A-Z].*'), {
  //     message: 'حداقل یک حرف بزرگ مورد استفاده قرار گیرد.',
  //   })
  //   .regex(new RegExp('.*[a-z].*'), {
  //     message: 'حداقل یک حرف کوچک مورد استفاده قرار گیرد.',
  //   })
  //   .regex(new RegExp('.*\\d.*'), {
  //     message: 'حداقل یک عدد مورد استفاده قرار گیرد.',
  //   }),
  otp: z.string().min(6, 'این فیلد الزامی است'),
  // password: z
  //   .string()
  //   .min(8, { message: 'رمز عبور باید حداقل ۸ یا بیشتر از کاراکترها باشد.' })
  //   .max(32, { message: 'رمز عبور باید حداکثر ۳۲ کاراکتر باشد.' })
  //   .regex(new RegExp('.*[A-Z].*'), {
  //     message: 'حداقل یک حرف بزرگ مورد استفاده قرار گیرد.',
  //   })
  //   .regex(new RegExp('.*[a-z].*'), {
  //     message: 'حداقل یک حرف کوچک مورد استفاده قرار گیرد.',
  //   })
  //   .regex(new RegExp('.*\\d.*'), {
  //     message: 'حداقل یک عدد مورد استفاده قرار گیرد.',
  //   }),
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
  const onOtpSubmit: SubmitHandler<OtpFormValues> = async (data) => {
    console.log(data);
    setLoading(true);
    // let m = { token: "", user: "" }
    setPhoneNumber(data.phoneNumber);
    let isOtpSent = await forgotPasswordOtp(data.phoneNumber);
    if (isOtpSent) setStep(STEPS.OTP);
    // @ts-ignore
    // reduxDispatch(reduxLogin(m))
    setLoading(false);
  };
  const onVerifySubmit: SubmitHandler<VerifyFormValues> = async (data) => {
    console.log(data);
    setLoading(true);
    // let m = { token: "", user: "" }
    let isVerified = await forgotPasswordVerify(data.otp, phoneNumber);
    if (isVerified) setStep(STEPS.UPDATE);
    // @ts-ignore
    // reduxDispatch(reduxLogin(m))
    setLoading(false);
  };
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    setLoading(true);
    // let m = { token: "", user: "" }
    await forgotPassword(data.password, phoneNumber);
    // @ts-ignore
    // reduxDispatch(reduxLogin(m))
    setLoading(false);
  };
  const [reset, setReset] = useState({});
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState<string>(STEPS.INITIAL);
  // @ts-ignore
  const { forgotPassword, forgotPasswordOtp, forgotPasswordVerify } = useAuth();
  const onOtpSubmit: SubmitHandler<OtpFormValues> = async (data) => {
    console.log(data);
    setLoading(true);
    // let m = { token: "", user: "" }
    setPhoneNumber(data.phoneNumber);
    let isOtpSent = await forgotPasswordOtp(data.phoneNumber);
    if (isOtpSent) setStep(STEPS.OTP);
    // @ts-ignore
    // reduxDispatch(reduxLogin(m))
    setLoading(false);
  };
  const onVerifySubmit: SubmitHandler<VerifyFormValues> = async (data) => {
    console.log(data);
    setLoading(true);
    // let m = { token: "", user: "" }
    let isVerified = await forgotPasswordVerify(data.otp, phoneNumber);
    if (isVerified) setStep(STEPS.UPDATE);
    // @ts-ignore
    // reduxDispatch(reduxLogin(m))
    setLoading(false);
  };
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    setLoading(true);
    // let m = { token: "", user: "" }
    await forgotPassword(data.password, phoneNumber);
    // @ts-ignore
    // reduxDispatch(reduxLogin(m))
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
            {({ setValue, register, setError }) => (
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
                <Button
                  isLoading={loading}
                  className="w-full"
                  type="submit"
                  size="lg"
                  color="info"
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
                    type="submit"
                    variant="text"
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
                color="info"
                inputClassName="text-sm"
                {...register('password')}
                error={errors.password?.message}
              />
              <Password
                label="تکرار رمز عبور"
                placeholder="تکرار رمز عبور را وارد کنید"
                size="lg"
                className="[&>label>span]:font-medium"
                color="info"
                inputClassName="text-sm"
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
              />
              <Button
                className="mt-2 w-full"
                type="submit"
                size="lg"
                color="info"
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
                color="info"
                inputClassName="text-sm"
                {...register('phoneNumber')}
                error={errors.phoneNumber?.message}
              />
              <Button
                className="mt-2 w-full"
                type="submit"
                size="lg"
                color="info"
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
