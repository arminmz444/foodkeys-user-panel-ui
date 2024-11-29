'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { SubmitHandler } from 'react-hook-form';
import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover } from '@/components/ui/popover';
import { ActionIcon } from '@/components/ui/action-icon';
import { useRouter } from 'next/navigation';
import { PiTrashBold, PiTrashFill } from 'react-icons/pi';
import ProductCarousel from '@/components/product-carousel';
import { AddToWishList } from '@/components/wishlist-button';
import { routes } from '@/config/routes';
// import data
import { recentlyProducts, recommendationProducts } from '@/data/shop-products';
import QuantityInput from './quantity-input';
const TablePagination = dynamic(
  () => import('@/components/controlled-table/table-pagination'),
  { ssr: false }
);

const initialData = [
  {
    id: 1,
    productName: 'نام محصول: ساعت کاسیو',
    productDescription:
      'توضیحات محصول: الگانس تک رنگ. این شلوارها با پاهای گشاد و راحت تهیه شده‌اند و از پنبه ارگانیک نرم و پایدار تهیه شده‌اند.',
    color: '#C886A9',
    colorName: 'نام رنگ: ویولا',
    price: 'تومان175.00',
    quantity: 1,
    size: 6,
    productImage:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/modern/1.webp',
  },
  {
    id: 2,
    productName: 'نام محصول: هدفون بیتس',
    productDescription:
      'توضیحات محصول: الگانس تک رنگ. این شلوارها با پاهای گشاد و راحت تهیه شده‌اند و از پنبه ارگانیک نرم و پایدار تهیه شده‌اند.',
    color: '#6BDCFF',
    colorName: 'نام رنگ: مالیبو',
    price: 'تومان55.00',
    quantity: 1,
    size: 6,
    productImage:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/modern/2.webp',
  },
  {
    id: 3,
    productName: 'نام محصول: دیگری از مارک جیکوب',
    productDescription:
      'توضیحات محصول: الگانس تک رنگ. این شلوارها با پاهای گشاد و راحت تهیه شده‌اند و از پنبه ارگانیک نرم و پایدار تهیه شده‌اند.',
    color: '#6AA39C',
    colorName: 'نام رنگ: بریکر بی',
    price: 'تومان160.00',
    quantity: 2,
    size: 6,
    productImage:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/modern/3.webp',
  },
  {
    id: 4,
    productName: 'نام محصول: کفش مشکی',
    productDescription:
      'توضیحات محصول: الگانس تک رنگ. این شلوارها با پاهای گشاد و راحت تهیه شده‌اند و از پنبه ارگانیک نرم و پایدار تهیه شده‌اند.',
    color: '#C886A9',
    colorName: 'نام رنگ: ویولا',
    price: 'تومان160.00',
    quantity: 2,
    size: 6,
    productImage:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/modern/4.webp',
  },
  {
    id: 5,
    productName: 'نام محصول: ساعت کاسیو',
    productDescription:
      'توضیحات محصول: الگانس تک رنگ. این شلوارها با پاهای گشاد و راحت تهیه شده‌اند و از پنبه ارگانیک نرم و پایدار تهیه شده‌اند.',
    color: '#6AA39C',
    colorName: 'نام رنگ: بریکر بی',
    price: 'تومان160.00',
    quantity: 2,
    size: 6,
    productImage:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/modern/5.webp',
  },
];
type FormValues = {
  couponCode: string;
};

function CheckCoupon() {
  const [reset, setReset] = useState({});

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    setReset({ couponCode: '' });
  };

  return (
    <Form<FormValues>
      resetValues={reset}
      onSubmit={onSubmit}
      useFormProps={{
        defaultValues: { couponCode: '' },
      }}
      className="w-full"
    >
      {({ register, formState: { errors }, watch }) => (
        <>
          <div className="relative flex items-end">
            <Input
              type="text"
              placeholder="کد تخفیف را وارد کنید"
              inputClassName="text-sm"
              className="w-full"
              label={<Text>کد تخفیف دارید?</Text>}
              {...register('couponCode')}
              error={errors.couponCode?.message}
            />
            <Button
              type="submit"
              className="ms-3 dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
              disabled={watch('couponCode') ? false : true}
            >
              اعمال
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}

// remove item
function RemoveItem({ placement = 'bottom' }: { placement?: any }) {
  return (
    <Popover
      placement={placement}
      className="z-50 dark:bg-gray-100 dark:[&>svg]:fill-gray-100"
      content={({ setOpen }) => (
        <div className="w-56 pb-2 pt-1 text-left rtl:text-right">
          <Text
            tag="h6"
            className="mb-0.5 flex items-start text-sm sm:items-center"
          >
            <PiTrashFill className="me-1 h-5 w-5" /> حذف سفارش
          </Text>
          <Text className="mb-2 leading-relaxed">
            آیا مطمعنید که میخواهید حذف کنید?
          </Text>
          <div className="flex items-center justify-end">
            <Button size="sm" className="me-1.5 h-7">
              بله
            </Button>
            <Button size="sm" variant="outline" className="h-7">
              خیر
            </Button>
          </div>
        </div>
      )}
    >
      <ActionIcon
        variant="text"
        rounded="full"
        className="h-auto w-auto border border-gray-200 p-2 hover:border-red-light"
      >
        <PiTrashBold className="h-4 w-4 text-red-light" />
      </ActionIcon>
    </Popover>
  );
}

type ProductCardTypes = {
  data: {
    id: number;
    productName: string;
    productDescription: string;
    productImage: string | StaticImageData;
    color: string;
    colorName: string;
    size: number;
    price: string;
    quantity: number;
  };
};

// cart company card
function ProductCard({ data }: ProductCardTypes) {
  return (
    <div className="grid grid-cols-12 items-start gap-4 border-b border-gray-200 py-6 first:pt-0 sm:flex sm:gap-6 2xl:py-8">
      <div className="col-span-4 sm:max-w-[180px]">
        <Image
          src={data.productImage}
          alt={data.productName}
          width={180}
          height={180}
          className="aspect-square w-full rounded-lg bg-gray-100 object-cover"
        />
      </div>
      <div className="col-span-8 sm:block sm:w-full">
        <div className="flex flex-col-reverse gap-1 sm:flex-row sm:items-center sm:justify-between">
          <Text
            tag="h3"
            className="truncate text-base font-medium transition-colors hover:text-primary 3xl:text-lg"
          >
            <Link href={'#'}>{data.productName}</Link>
          </Text>
          <span className="inline-block text-sm font-semibold text-gray-1000 sm:font-medium md:text-base 3xl:text-lg">
            {data.price}
          </span>
        </div>
        <Text className="mt-1 w-full max-w-xs truncate leading-6 2xl:max-w-lg">
          {data.productDescription}
        </Text>
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-3 sm:mt-4 sm:gap-x-8">
          <li className="flex items-center gap-3 text-gray-500">
            <span>سایز :</span>
            <span className="text-gray-1000">{data.size}</span>
          </li>
          <li className="flex items-center gap-3 text-gray-500">
            <span>رنگ :</span>
            <div className="flex items-center gap-2">
              <div
                className="inline-block h-4 w-4 rounded-full"
                style={{
                  backgroundColor: data.color,
                }}
              ></div>
              <span className="text-gray-1000">{data.colorName}</span>
            </div>
          </li>
        </ul>
        <div className="mt-3 hidden items-center justify-between xs:flex sm:mt-6">
          <QuantityInput />
          <div className="flex items-center gap-4">
            <AddToWishList />
            <RemoveItem placement="bottom-end" />
          </div>
        </div>
      </div>
      <div className="col-span-full flex items-center justify-between xs:hidden">
        <div className="flex items-center gap-4">
          <AddToWishList />
          <RemoveItem placement="bottom-start" />
        </div>
        <QuantityInput />
      </div>
    </div>
  );
}

function CartCalculations() {
  const router = useRouter();
  return (
    <div>
      <Text
        tag="h2"
        className="border-b border-gray-200 pb-4 text-lg font-medium"
      >
        قیمت کل
      </Text>
      <div className="mt-6 grid grid-cols-1 gap-4 @md:gap-6">
        <div className="flex items-center justify-between">
          جزییات
          <span className="font-medium text-gray-1000">تومان140.00</span>
        </div>
        <div className="flex items-center justify-between">
          مالیت
          <span className="font-medium text-gray-1000">تومان0.18</span>
        </div>
        <div className="flex items-center justify-between">
          ارسال
          <span className="font-medium text-gray-1000">تومان50.00</span>
        </div>
        <CheckCoupon />
        <div className="mt-3 flex items-center justify-between border-t border-gray-200 py-4 font-semibold text-gray-1000">
          کل
          <span className="font-medium text-gray-1000">تومان190.18</span>
        </div>
        <Button
          size="xl"
          rounded="pill"
          onClick={() => router.push(routes.eCommerce.checkout)}
          className="w-full dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
        >
          نهایی کردن خرید
        </Button>
        <Button
          size="xl"
          variant="outline"
          rounded="pill"
          className="w-full dark:bg-gray-100 dark:active:bg-gray-100"
        >
          <Image
            src={
              'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/payment/paypal.png'
            }
            alt="paypal-icon"
            width={80}
            height={10}
            className="object-contain"
          />
        </Button>
      </div>
    </div>
  );
}

export default function CartPageWrapper() {
  return (
    <>
      <div className="mx-auto w-full max-w-[1536px] items-start @5xl:grid @5xl:grid-cols-12 @5xl:gap-7 @6xl:grid-cols-10 @7xl:gap-10">
        <div className="@5xl:col-span-8 @6xl:col-span-7">
          {initialData.map((item) => (
            <ProductCard key={`product-cart-تومان{item.id}`} data={item} />
          ))}
          <TablePagination
            total={25}
            current={1}
            defaultCurrent={1}
            pageSize={6}
          />
        </div>
        <div className="sticky top-24 mt-10 @container @5xl:col-span-4 @5xl:mt-0 @5xl:px-4 @6xl:col-span-3 2xl:top-28">
          <CartCalculations />
        </div>
      </div>

      <ProductCarousel title={'پیشنهادات'} data={recommendationProducts} />
      <ProductCarousel title={'اخرین مشاهدات'} data={recentlyProducts} />
    </>
  );
}
