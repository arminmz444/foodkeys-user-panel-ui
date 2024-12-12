'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Password } from '@/components/ui/password';
import * as z from 'zod';
import { useState } from 'react';
import { PiArrowLeftBold } from 'react-icons/pi';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { Text } from '@/components/ui/text';
import { SubmitHandler } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';
import { login as reduxLogin } from '@/store/userSlice';
import { useDispatch } from 'react-redux';

const loginSchema = z.object({
  username: z
    .string({})
    .min(11, 'فرمت نام کاربری اشتباه است')
    .max(11, 'فرمت نام کاربری اشتباه است'),
  password: z.string().min(1, { message: 'رمزعبور اشتباه است' }),
  remember: z.boolean(),
});

type Login = z.infer<typeof loginSchema>;

const initialValues: Login = {
  username: '09144226139',
  password: '1234567890',
  remember: true,
};

export default function SignInForm({
  step,
}: {
  step: 'INITIAL' | 'PASSWORD' | 'SIGNUP';
}) {
  //TODO: why we need to reset it here
  const [reset, setReset] = useState({});
  const reduxDispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  // @ts-ignore
  const { login, loginOtp } = useAuth();

  const onSubmit: SubmitHandler<Login> = async (data) => {
    setLoading(true);
    console.log(data);
    let m = { token: '', user: '' };
    await login(data.username, data.password, m);
    console.log(m);
    // @ts-ignore
    reduxDispatch(reduxLogin(m));
    setLoading(false);
    //
    // signIn('credentials', {
    //   ...data,
    // });
    // setReset({ email: "", password: "", isRememberMe: false });
  };

  return (
    <>
      {step === 'INITIAL' && (
        <Form<Login>
          validationSchema={loginSchema}
          resetValues={reset}
          onSubmit={onSubmit}
          useFormProps={{
            defaultValues: initialValues,
          }}
        >
          {({ register, setError, formState: { errors } }) => (
            <div className="space-y-5">
              <Input
                dir="rtl"
                type="number"
                variant="outline"
                label="شماره خود را وارد کنید"
                placeholder="********* 09"
                //   {...register('phoneNumber')}
                // @ts-ignore
                error={errors.phoneNumber}
                size="lg"
                color="info"
                className="lg:justify-end"
                //   helperText="(مثال: 09123456789)"
                max={11}
                maxLength={11}
              />
              {/* <Input
              type="number"
              size="lg"
              label="نام کاربری"
              placeholder="نام کاربری خود را وارد کنید"
              color="info"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('username')}
              error={errors.username?.message}
            />
            <Password
              label="رمز عبور"
              placeholder="رمز عبور خود را وارد کنید"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              color="info"
              {...register('password')}
              error={errors.password?.message}
            /> */}
              <div className="flex items-center justify-between pb-2">
                <Checkbox
                  {...register('remember')}
                  label="مرا به خاطر بسپر"
                  // color="success"
                  variant="flat"
                  className="[&>label>span]:font-medium"
                />
                <Link
                  href={routes.auth.forgotPassword1}
                  className="h-auto p-0 text-sm font-semibold text-[#129974] underline transition-colors hover:text-gray-900 hover:no-underline"
                >
                  رمز عبور را فراموش کردید؟
                </Link>
              </div>
              <Button
                className="group/btn w-full bg-[#129974]"
                type="submit"
                size="lg"
                color="success"
                isLoading={loading}
              >
                <span>ورود</span>{' '}
                <PiArrowLeftBold className="ms-2 mt-0.5 h-5 w-5" />
              </Button>
            </div>
          )}
        </Form>
      )}
      {step === 'SIGNUP' && (
        <Form<Login>
          validationSchema={loginSchema}
          resetValues={reset}
          onSubmit={onSubmit}
          useFormProps={{
            defaultValues: initialValues,
          }}
        >
          {({ register, setError, formState: { errors } }) => (
            <div className="space-y-5">
              <Input
                dir="rtl"
                type="number"
                variant="outline"
                label="شماره خود را وارد کنید"
                placeholder="********* 09"
                //   {...register('phoneNumber')}
                // @ts-ignore
                error={errors.phoneNumber}
                size="lg"
                color="info"
                className="lg:justify-end"
                //   helperText="(مثال: 09123456789)"
                max={11}
                maxLength={11}
              />
              {/* <Input
              type="number"
              size="lg"
              label="نام کاربری"
              placeholder="نام کاربری خود را وارد کنید"
              color="info"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('username')}
              error={errors.username?.message}
            />
            <Password
              label="رمز عبور"
              placeholder="رمز عبور خود را وارد کنید"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              color="info"
              {...register('password')}
              error={errors.password?.message}
            /> */}
              <div className="flex items-center justify-between pb-2">
                <Checkbox
                  {...register('remember')}
                  label="مرا به خاطر بسپر"
                  // color="success"
                  variant="flat"
                  className="[&>label>span]:font-medium"
                />
                <Link
                  href={routes.auth.forgotPassword1}
                  className="h-auto p-0 text-sm font-semibold text-[#129974] underline transition-colors hover:text-gray-900 hover:no-underline"
                >
                  رمز عبور را فراموش کردید؟
                </Link>
              </div>
              <Button
                className="group/btn w-full bg-[#129974]"
                type="submit"
                size="lg"
                color="success"
                isLoading={loading}
              >
                <span>ورود</span>{' '}
                <PiArrowLeftBold className="ms-2 mt-0.5 h-5 w-5" />
              </Button>
            </div>
          )}
        </Form>
      )}
      {/* <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
        آیا حساب کاربری ندارید?{' '}
        <Link
          href={routes.auth.signUp1}
          className="font-semibold text-gray-700 transition-colors hover:text-[#129974]"
        >
          ثبت نام
        </Link>
      </Text> */}
    </>
  );
}
