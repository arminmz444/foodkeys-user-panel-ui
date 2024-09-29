'use client';

import { Button, Input } from 'rizzui';
import { Form } from '@/components/ui/form';
import { SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';

type FormValues = {
  email: string;
};

const initialValues = {
  email: '',
};

const newsLetterFormSchema = z.object({
  email: z.string().email({ message: 'آدرس ایمیل اشتباه میباشد' }),
});

export default function NewsLetterForm() {
  const [reset, setReset] = useState({});

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    setReset(initialValues);
  };
  return (
    <>
      <Form<FormValues>
        validationSchema={newsLetterFormSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="relative">
            <Input
              placeholder="ایمیل را وارد کنید"
              inputClassName="w-full text-base pl-36"
              size="xl"
              rounded="pill"
              {...register('email')}
              error={errors.email?.message}
            />
            <Button
              type="submit"
              className="absolute left-1 top-1 text-base font-medium"
              size="lg"
              rounded="pill"
            >
              عضویت
            </Button>
          </div>
        )}
      </Form>
      <p className="mt-3 text-center text-sm font-medium text-gray-500 @2xl:mt-4 @2xl:text-base">
        ایمیل شما با ما ایمن است، ما اسپم نمی‌فرستیم.
      </p>
    </>
  );
}
