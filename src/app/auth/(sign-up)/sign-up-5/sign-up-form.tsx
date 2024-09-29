'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Password } from '@/components/ui/password';
import { SubmitHandler } from 'react-hook-form';
import { Switch } from '@/components/ui/switch';
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
  const [reset, setReset] = useState({});
  const isMedium = useMedia('(max-width: 1200px)', false);
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    setReset({ ...initialValues, isAgreed: false });
  };

  return (
    <div className="xl:pe-12 2xl:pe-20">
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
              color="info"
              className="[&>label>span]:font-medium"
              placeholder="ایمیل را وارد کنید"
              {...register('email')}
              error={errors.email?.message}
            />
            <Password
              label="رمز عبور"
              placeholder="رمز عبور خود را وارد کنید"
              size={isMedium ? 'lg' : 'xl'}
              color="info"
              className="[&>label>span]:font-medium"
              {...register('password')}
              error={errors.password?.message}
            />
            <div className="col-span-2 -my-1 flex items-start text-gray-700">
              <Switch
                variant="active"
                {...register('isAgreed')}
                color="info"
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
              color="info"
            >
              ساخت حساب کاربری
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center text-[15px] leading-loose text-gray-500 lg:mt-9 xl:text-base">
        هم اکنون حساب دارید?{' '}
        <Link
          href={routes.auth.signIn5}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          ورود
        </Link>
      </Text>
    </div>
  );
}
