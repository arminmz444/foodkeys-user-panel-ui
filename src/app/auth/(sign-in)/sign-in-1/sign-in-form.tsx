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
import { signIn } from 'next-auth/react';
import { SubmitHandler } from 'react-hook-form';

const loginSchema = z.object({
  username: z.string().email({ message: 'یوزرنیم اشتباه' }),
  password: z.string().min(1, { message: 'رمز عبور الزامی میباشد' }),
  remember: z.boolean(),
});

type Login = z.infer<typeof loginSchema>;

const initialValues: Login = {
  username: 'admin@admin.com',
  password: 'admin',
  remember: true,
};

export default function SignInForm() {
  //TODO: why we need to reset it here
  const [reset, setReset] = useState({});

  const onSubmit: SubmitHandler<Login> = (data) => {
    console.log(data);
    signIn('credentials', {
      ...data,
    });
    // setReset({ email: "", password: "", isRememberMe: false });
  };

  return (
    <>
      <Form<Login>
        validationSchema={loginSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <Input
              type="email"
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
            />
            <div className="flex items-center justify-between pb-2">
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
            >
              <span>ورود</span>{' '}
              <PiArrowLeftBold className="ms-2 mt-0.5 h-6 w-6 transition-all group-hover/btn:-translate-x-2" />
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
        آیا حساب کاربری ندارید?{' '}
        <Link
          href={routes.auth.signUp1}
          className="font-semibold text-gray-700 transition-colors hover:text-[#129974]"
        >
          ثبت نام
        </Link>
      </Text>
    </>
  );
}
