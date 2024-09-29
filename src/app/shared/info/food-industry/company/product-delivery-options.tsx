'use client';

import { Text } from '@/components/ui/text';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Collapse } from '@/components/ui/collapse';
import { useState } from 'react';
import { PiCaretDownBold } from 'react-icons/pi';
import cn from '@/utils/class-names';

type FormValues = {
  pinCode: string;
};

function CheckDelivery() {
  const [reset, setReset] = useState({});
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    setReset({ pinCode: '' });
  };

  return (
    <Form<FormValues>
      resetValues={reset}
      onSubmit={onSubmit}
      useFormProps={{
        defaultValues: { pinCode: '' },
      }}
    >
      {({ register, formState: { errors } }) => (
        <>
          <div className="relative max-w-sm">
            <Input
              type="text"
              placeholder="کد رهگیری را وارد کنید"
              inputClassName="text-sm"
              {...register('pinCode')}
              error={errors.pinCode?.message}
            />
            <Button
              className="absolute end-0 top-0 text-sm font-normal"
              type="submit"
              variant="text"
            >
              بررسی
            </Button>
          </div>
          <p className="pt-1.5 text-xs leading-relaxed text-gray-500">
            کد رهگیری خود را وارد کنید تا محصول مورد نظر پیگیری شود
          </p>
        </>
      )}
    </Form>
  );
}

export default function ProductDeliveryOptions() {
  return (
    <Collapse
      className="border-t last-of-type:border-t-0"
      defaultOpen={true}
      header={({ open, toggle }) => (
        <div
          role="button"
          onClick={toggle}
          className="font-iransans font-iransans flex w-full cursor-pointer items-center justify-between py-6 text-lg font-semibold text-gray-900"
        >
          نحوه ارسال
          <div className="flex shrink-0 items-center justify-center">
            <PiCaretDownBold
              className={cn(
                'h-[18px] w-[18px] transform transition-transform duration-300',
                open && 'rotate-180'
              )}
            />
          </div>
        </div>
      )}
    >
      <div className="-mt-2 pb-7">
        <div className="mb-5">
          <CheckDelivery />
        </div>
        <Text className="mb-3 last:mb-0" tag="p">
          100% محصول اصل
        </Text>
        <Text className="mb-3 last:mb-0" tag="p">
          امکان پرداخت درب منزل
        </Text>
        <Text className="mb-3 last:mb-0" tag="p">
          14 روز امکان تست و تعویض
        </Text>
        <Text className="mb-3 last:mb-0" tag="p">
          امتحان کنید و خرید کنید
        </Text>
      </div>
    </Collapse>
  );
}
