'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Password } from '@/components/ui/password';
import { Switch } from '@/components/ui/switch';
import { SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { Form } from '@/components/ui/form';
import * as z from 'zod';
import { useState } from 'react';
import { Text } from '@/components/ui/text';
import { routes } from '@/config/routes';
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
    console.log(data);
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
            <div className="col-span-2 flex items-start pb-1 text-gray-700">
              <Switch
                variant="active"
                {...register('isAgreed')}
                className="[&>label>span.transition]:shrink-0 [&>label>span]:font-medium"
                label={
                  <Text className="ps-1 text-gray-500">
                    با عضویت، شما به قوانین و مقررات ما موافقت کرده‌اید.{' '}
                    <Link
                      href="/"
                      className="font-semibold text-gray-700 transition-colors hover:text-primary"
                    >
                      قوانین
                    </Link>{' '}
                    &{' '}
                    <Link
                      href="/"
                      className="font-semibold text-gray-700 transition-colors hover:text-primary"
                    >
                      سیاست حفظ حریم خصوصی
                    </Link>
                  </Text>
                }
              />
            </div>
            <Button
              className="w-full"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
            >
              ساخت حساب کاربری
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-5 text-center text-[15px] leading-loose text-gray-500 md:mt-7 lg:mt-9 lg:text-base">
        نمی‌خواهید بازنشانی کنید؟{' '}
        <Link
          href={routes.auth.signIn3}
          className="font-semibold text-gray-700 transition-colors hover:text-gray-1000"
        >
          ورود
        </Link>
      </Text>
    </>
  );
}
