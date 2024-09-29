'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Password } from '@/components/ui/password';
import { Checkbox } from '@/components/ui/checkbox';
import { SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { Text } from '@/components/ui/text';
import { Form } from '@/components/ui/form';
import * as z from 'zod';
import { useState } from 'react';
import { useMedia } from '@/hooks/use-media';

const initialValues = {
  email: '',
  password: '',
  isAgreed: false,
};

const signUpFormSchema = z.object({
  email: z.string().email({ message: 'آدرس ایمیل اشتباه میباشد' }),
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
  isAgreed: z.boolean(),
});

type FormValues = z.infer<typeof signUpFormSchema>;

export default function SignUpForm() {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const [reset, setReset] = useState({});
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('sign up form data', data);
    setReset({ ...initialValues, isAgreed: false });
  };

  return (
    <>
      <Form<FormValues>
        validationSchema={signUpFormSchema}
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
              size={isMedium ? 'lg' : 'xl'}
              label="ایمیل"
              placeholder="ایمیل را وارد کنید"
              rounded="pill"
              color="info"
              className="[&>label>span]:font-medium"
              {...register('email')}
              error={errors.email?.message}
            />
            <Password
              label="رمز عبور"
              placeholder="رمز عبور خود را وارد کنید"
              size={isMedium ? 'lg' : 'xl'}
              rounded="pill"
              color="info"
              className="[&>label>span]:font-medium"
              {...register('password')}
              error={errors.password?.message}
            />
            <div className="flex items-start pb-2 text-gray-700">
              <Checkbox {...register('isAgreed')} color="info" variant="flat" />
              <p className="-mt-0.5 ps-2 text-sm leading-relaxed">
                با عضویت، شما به قوانین و مقررات ما موافقت کرده‌اید.{' '}
                <Link
                  href="/"
                  className="font-semibold text-blue transition-colors hover:text-gray-1000"
                >
                  قوانین
                </Link>{' '}
                &{' '}
                <Link
                  href="/"
                  className="font-semibold text-blue transition-colors hover:text-gray-1000"
                >
                  سیاست حفظ حریم خصوصی
                </Link>
              </p>
            </div>
            <Button
              className="w-full border-2 border-primary-light text-base font-medium"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
              color="info"
              rounded="pill"
            >
              ساخت حساب کاربری
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-5 text-center text-[15px] leading-loose text-gray-500 lg:text-start xl:mt-7 xl:text-base">
        هم اکنون حساب دارید?{' '}
        <Link
          href={routes.auth.signIn2}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          ورود
        </Link>
      </Text>
    </>
  );
}
