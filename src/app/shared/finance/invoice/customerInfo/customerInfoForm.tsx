'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { PiCheckCircleFill, PiWarehouseFill } from 'react-icons/pi';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { AdvancedRadio, Button, Input, Text } from 'rizzui';
import { z } from 'zod';
import { toast } from 'react-hot-toast';

const schema = z.object({
  companyName: z.string().min(1, 'نام ثبت شده شرکت الزامیست.'),
  registerNumber: z.string().min(1, 'شماره ثبت الزامیست.'),
  nationalId: z.string().min(1, 'شناسه ملی الزامیست.'),
  economicCode: z.string().min(1, 'شماره اقتصادی الزامیست.'),
  phoneNumber: z.string().min(1, 'شماره تماس الزامیست.'),
  postalCode: z.string().optional(),
  city: z.string().min(1, 'شهر الزامیست.'),
  province: z.string().min(1, 'استان الزامیست.'),
  address: z.string().min(1, 'آدرس الزامیست.'),
  firstName: z.string().min(1, 'نام الزامیست.'),
  lastName: z.string().min(1, 'نام خانوادگی الزامیست.'),
  personEconomicCode: z.string().optional(),
  personPhoneNumber: z.string().min(1, 'تلفن همراه الزامیست.'),
  personPostalCode: z.string().optional(),
  personCity: z.string().min(1, 'شهر الزامیست.'),
  personProvince: z.string().min(1, 'استان الزامیست.'),
  personAddress: z.string().min(1, 'آدرس الزامیست.'),
});

const CustomerInfoForm = () => {
  const [values, setValues] = React.useState<string[]>(['single']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [type, setType] = useState('company');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      companyName: '',
      registerNumber: '',
      nationalId: '',
      economicCode: '',
      phoneNumber: '',
      postalCode: '',
      city: '',
      province: '',
      address: '',
      firstName: '',
      lastName: '',
      personEconomicCode: '',
      personPhoneNumber: '',
      personPostalCode: '',
      personCity: '',
      personProvince: '',
      personAddress: '',
    },
  });

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      // TODO: Replace with your actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating API call

      toast.success('اطلاعات با موفقیت ثبت شد');
      reset();
    } catch (error) {
      toast.error('خطا در ثبت اطلاعات');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    reset();
    toast.success('اطلاعات فرم با موفقیت حذف شد');
  };

  return (
    <div className=" w-full rounded-lg border border-gray-200 px-6 py-10 shadow-md">
      <h2 className="text mb-6 text-sm font-bold text-gray-500 dark:text-white">
        در صورتی که برای پرداخت‌ها نیازمند دریافت فاکتور هستید، لازم است فرم زیر
        را تکمیل کنید.
      </h2>
      <div className="mb-10">
        <CardDetails setType={setType} type={type} />
      </div>
      <form
        className="grid grid-cols-2 gap-4 "
        onSubmit={handleSubmit(onSubmit)}
      >
        {type === 'company' ? (
          <>
            <Input
              {...register('companyName')}
              label="نام ثبت شده شرکت"
              error={errors.companyName?.message as string}
              labelClassName="font-bold text-black dark:text-white"
              className="col-span-2 xs:col-span-1"
            />
            <Input
              {...register('registerNumber')}
              label="شماره ثبت"
              error={errors.registerNumber?.message as string}
              labelClassName="font-bold text-black dark:text-white"
              className="col-span-2 xs:col-span-1"
            />
            <Input
              {...register('nationalId')}
              label="شناسه ملی"
              error={errors.nationalId?.message as string}
              labelClassName="font-bold text-black dark:text-white"
              className="col-span-2 xs:col-span-1"
            />
            <Input
              {...register('economicCode')}
              label="شماره اقتصادی"
              error={errors.economicCode?.message as string}
              labelClassName="font-bold text-black dark:text-white"
              className="col-span-2 xs:col-span-1"
            />
            <Input
              {...register('phoneNumber')}
              label="شماره تماس"
              error={errors.phoneNumber?.message as string}
              type="number"
              labelClassName="font-bold text-black dark:text-white"
              className="col-span-2 xs:col-span-1"
            />
            <Input
              {...register('postalCode')}
              label="کد پستی"
              error={errors.postalCode?.message as string}
              type="number"
              labelClassName="font-bold text-black dark:text-white"
              className="col-span-2 xs:col-span-1"
            />
            <Input
              {...register('province')}
              label="استان"
              error={errors.province?.message as string}
              labelClassName="font-bold text-black dark:text-white"
              className="col-span-2 xs:col-span-1"
            />
            <Input
              {...register('city')}
              label="شهر"
              error={errors.city?.message as string}
              labelClassName="font-bold text-black dark:text-white"
              className="col-span-2 xs:col-span-1"
            />
            <Input
              {...register('address')}
              label="آدرس"
              error={errors.address?.message as string}
              labelClassName="font-bold text-black dark:text-white"
              className="col-span-2"
            />
          </>
        ) : (
          <>
            <Input
              {...register('firstName')}
              label="نام"
              error={errors.firstName?.message as string}
              labelClassName="font-bold text-black dark:text-white"
              className="col-span-2 xs:col-span-1"
            />
            <Input
              {...register('lastName')}
              label="نام خانوادگی"
              error={errors.lastName?.message as string}
              labelClassName="font-bold text-black dark:text-white"
              className="col-span-2 xs:col-span-1"
            />
            <Input
              {...register('nationalId')}
              label="کدملی یا کدفراگیر"
              error={errors.nationalId?.message as string}
              labelClassName="font-bold text-black dark:text-white"
              className="col-span-2 xs:col-span-1"
            />
            <Input
              {...register('personEconomicCode')}
              label="کد اقتصادی"
              error={errors.personEconomicCode?.message as string}
              labelClassName="font-bold text-black dark:text-white"
              className="col-span-2 xs:col-span-1"
            />
            <Input
              {...register('personPhoneNumber')}
              label="تلفن همراه"
              error={errors.personPhoneNumber?.message as string}
              labelClassName="font-bold text-black dark:text-white"
              className="col-span-2 xs:col-span-1"
            />
            <Input
              {...register('personPostalCode')}
              label="کدپستی"
              error={errors.personPostalCode?.message as string}
              labelClassName="font-bold text-black dark:text-white"
              className="col-span-2 xs:col-span-1"
            />
            <Input
              {...register('personProvince')}
              label="استان"
              error={errors.personProvince?.message as string}
              labelClassName="font-bold text-black dark:text-white"
              className="col-span-2 xs:col-span-1"
            />
            <Input
              {...register('personCity')}
              label="شهر"
              error={errors.personCity?.message as string}
              labelClassName="font-bold text-black dark:text-white"
              className="col-span-2 xs:col-span-1"
            />
            <Input
              {...register('personAddress')}
              label="آدرس"
              error={errors.personAddress?.message as string}
              labelClassName="font-bold text-black dark:text-white"
              className="col-span-2"
            />
          </>
        )}
      </form>
      <div className="flex flex-col items-center justify-between md:flex-row">
        <Button
          className="mt-10 w-full xs:w-1/2 md:w-1/4"
          variant="outline"
          onClick={handleReset}
          disabled={isSubmitting}
        >
          <RiDeleteBin5Fill className="ml-2" size={20} />
          حذف اطلاعات فرم
        </Button>
        <Button
          className="mt-10 w-full md:w-1/3"
          variant="solid"
          color="primary"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'در حال ثبت...' : 'ثبت اطلاعات'}
        </Button>
      </div>
    </div>
  );
};

export default CustomerInfoForm;

const cardsOptions = [
  {
    icon: <PiWarehouseFill size={25} />,
    title: 'حقوقی',
    default: false,
    value: 'company',
  },
  {
    icon: <IoPersonCircleOutline size={25} />,
    title: 'حقیقی',
    default: true,
    value: 'personal',
  },
];
export function CardDetails({
  setType,
  type,
}: {
  setType: (type: string) => void;
  type: string;
}) {
  return (
    <div>
      <p className="mb-2 font-bold text-black dark:text-white">شخصیت</p>
      <div className="flex flex-col gap-4 xs:flex-row">
        {cardsOptions.map((cards, index) => (
          <AdvancedRadio
            key={`cards-${index}`}
            name="card_details"
            onChange={() => setType(cards.value)}
            defaultChecked={cards.value === type}
            value={cards.value}
            className="flex gap-3 rounded-xl border border-gray-300 p-5 text-sm hover:cursor-pointer hover:border-gray-900"
            inputClassName="[&:checked~span_div>.icon]:block [&:checked~span]:ring-1 [&:checked~span]:ring-offset-0 [&:checked~span]:ring-gray-900 [&:checked~span]:!border-gray-900"
          >
            <div className="flex items-center justify-center">
              <div className="flex h-8 w-12 shrink-0 items-center justify-center rounded-md px-2 py-1.5">
                {/*// @ts-ignore*/}
                {cards.icon}
              </div>
              <div className="block">
                <Text tag="h6" className="mb-1 text-sm font-medium">
                  {cards.title}
                </Text>
              </div>
            </div>
            {cards.value === type ? (
              <PiCheckCircleFill className="icon ms-auto h-6 w-6 flex-shrink-0 text-gray-900" />
            ) : (
              <div className="relative ms-auto flex h-5 w-5 items-center justify-center rounded-full border border-gray-300"></div>
            )}
          </AdvancedRadio>
        ))}
      </div>
    </div>
  );
}
