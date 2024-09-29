'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Password } from '@/components/ui/password';
import { Switch } from '@/components/ui/switch';
import { SubmitHandler } from 'react-hook-form';
import { Text } from '@/components/ui/text';
import { Form } from '@/components/ui/form';
import * as z from 'zod';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { useMedia } from '@/hooks/use-media';

const initialValues = {
  email: 'demo@demo.com',
  password: 'password',
  isRememberMe: true,
};

const signInFormSchema = z.object({
  email: z.string().email({ message: 'آدرس ایمیل اشتباه میباشد' }),
  password: z.string().min(1, { message: 'Password is required' }),
  isRememberMe: z.boolean(),
});

type FormValues = z.infer<typeof signInFormSchema>;

export default function SignInForm() {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('Sign in form data', data);
  };

  return (
    <>
      <Form<FormValues>
        validationSchema={signInFormSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5 lg:space-y-6">
            <Input
              type="email"
              size={isMedium ? 'lg' : 'xl'}
              label="ایمیل"
              placeholder="ایمیل را وارد کنید"
              className="[&>label>span]:font-medium"
              {...register('email')}
              error={errors.email?.message}
            />
            <Password
              label="رمز عبور"
              placeholder="رمز عبور خود را وارد کنید"
              size={isMedium ? 'lg' : 'xl'}
              className="[&>label>span]:font-medium"
              {...register('password')}
              error={errors.password?.message}
            />
            <div className="flex items-center justify-between lg:pb-2">
              <Switch
                variant="active"
                label="مرا به خاطر بسپر"
                {...register('isRememberMe')}
              />
              <Link
                href={routes.auth.forgotPassword3}
                className="h-auto p-0 text-sm font-semibold text-gray-600 underline transition-colors hover:text-primary hover:no-underline"
              >
                رمز عبور را فراموش کردید?
              </Link>
            </div>

            <Button
              className="w-full"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
            >
              ورود
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-5 text-center text-[15px] leading-loose text-gray-500 md:mt-7 lg:mt-9 lg:text-base">
        آیا حساب کاربری ندارید?{' '}
        <Link
          href={routes.auth.signUp3}
          className="font-semibold text-gray-700 transition-colors hover:text-gray-1000"
        >
          ثبت نام
        </Link>
      </Text>
    </>
  );
}
