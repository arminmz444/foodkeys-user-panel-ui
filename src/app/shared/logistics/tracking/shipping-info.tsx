'use client';

import { Collapse } from '@/components/ui/collapse';
import { Text } from '@/components/ui/text';
import cn from '@/utils/class-names';
import { PiCaretDownBold, PiPackageFill } from 'react-icons/pi';
import DeliveryTruckIcon from '@/components/icons/delivery-truck';
import PackageOpenIcon from '@/components/icons/package-open';

const shippingInformation = [
  {
    title: 'مرور ارسال',
    icon: <PiPackageFill className="h-6 w-6 text-primary" />,
    data: [
      {
        name: 'شماره تراکنش',
        value: 'FC6723757651DB74',
      },
      {
        name: 'ارسال به',
        value: 'تهران آزادی',
      },
      {
        name: 'تاریخ ارسال',
        value: '18 فروردین 1402',
      },
      {
        name: 'ارسال عادی',
        value: '18 فروردین 1402 قبل از 12 ظهر',
      },
      {
        name: 'تحویل',
        value: '18 فروردین 1402 قبل از 12 ظهر',
      },
    ],
  },
  {
    title: 'سرویس ها',
    icon: <DeliveryTruckIcon className="h-5 w-6 text-primary" />,
    data: [
      {
        name: 'سرویس ها',
        value: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت ',
      },
      {
        name: 'قوانین',
        value: 'قانون',
      },
      {
        name: 'آیتم ویژه',
        value: 'روز های تعطیل',
      },
    ],
  },
  {
    title: 'جزییات بسته',
    icon: <PackageOpenIcon className="h-5 w-5 text-primary" />,
    data: [
      {
        name: 'وزن',
        value: '0.25 کیلوگرم',
      },
      {
        name: 'جچم',
        value: '16x19x5 اینچ',
      },
      {
        name: 'تعداد کل',
        value: '1',
      },
      {
        name: 'وزن کل',
        value: '0.25 کیلوگرم',
      },
      {
        name: 'بسته',
        value: 'بسته نمونه',
      },
    ],
  },
];

export default function ShippingInfo({ className }: { className?: string }) {
  return (
    <>
      <Collapse
        defaultOpen={true}
        className={cn('mx-0 py-5 md:py-7 lg:mx-8', className)}
        header={({ open, toggle }) => (
          <button
            type="button"
            onClick={toggle}
            className="font-iransans flex w-full cursor-pointer items-center justify-between text-left text-xl font-semibold text-gray-700"
          >
            جزییات ارسال
            <PiCaretDownBold
              className={cn(
                'h-5 w-5 -rotate-90 transform transition-transform duration-300 rtl:rotate-90',
                open && '-rotate-0 rtl:rotate-0'
              )}
            />
          </button>
        )}
      >
        {shippingInformation.map((item, index) => (
          <div
            className={cn(
              'my-10 flex gap-4',
              index === shippingInformation.length - 1 && 'mb-3'
            )}
            key={`shipping-block-${index}`}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-lighter">
              {item.icon}
            </span>

            <div className="flex flex-col gap-y-3">
              <Text tag="h3" className="text-base font-semibold">
                {item.title}
              </Text>
              {item.data.map((info, index) => (
                <div
                  className="flex flex-col sm:flex-row sm:items-center"
                  key={`info-${index}`}
                >
                  <Text
                    tag="h4"
                    className="text-sm font-normal capitalize text-gray-700 sm:min-w-[244px] md:min-w-[424px]"
                  >
                    {info.name}:
                  </Text>
                  <Text className="gap-3 text-sm text-gray-500">
                    {info.value}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Collapse>
    </>
  );
}
