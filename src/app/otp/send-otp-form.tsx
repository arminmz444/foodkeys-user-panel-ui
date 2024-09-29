'use client';

import { PinCode } from '@/components/ui/pin-code';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { SubmitHandler } from 'react-hook-form';

type FormValues = {
  otp: string;
};

export default function SendOtpForm() {
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };
  return (
    <Form<FormValues> onSubmit={onSubmit}>
      {({ setValue }) => (
        <div className="space-y-10">
          <PinCode
            variant="outline"
            setValue={(value) => setValue('otp', String(value))}
            size="lg"
            color="info"
            className="lg:justify-start"
          />
          <Button
            className="w-full text-base font-medium"
            type="submit"
            size="lg"
            color="info"
          >
            تأیید کد یکبار مصرف
          </Button>
          <Button
              className="text-base font-medium"
              type="submit"
              size="lg"
              color="info"
          >
            ورود از طریق نام کاربری
          </Button>
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
  );
}
