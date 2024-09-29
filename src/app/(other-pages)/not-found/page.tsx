'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PiHouseLineBold } from 'react-icons/pi';
import { Text } from '@/components/ui/text';

// images and icons
import NotFoundImg from '@public/not-found.png';

export default function NotFoundPage() {
  const { push } = useRouter();
  return (
    <div className="flex grow items-center px-6 xl:px-10">
      <div className="mx-auto text-center">
        <Image
          src={NotFoundImg}
          alt="not found"
          className="mx-auto mb-8 aspect-[360/326] max-w-[256px] xs:max-w-[370px] lg:mb-12 2xl:mb-16"
        />
        <Text
          tag="h1"
          className="text-[22px] font-bold leading-normal text-gray-1000 lg:text-3xl"
        >
          ببخشید، صفحه یافت نشد.
        </Text>
        <p className="mt-3 text-sm leading-loose text-gray-500 lg:mt-6 lg:text-base lg:leading-loose">
          ما ساعت‌های زیادی را صرف کرده‌ایم تا وب‌سایت جدیدمان را راه‌اندازی
          کنیم. به ما بپیوندید.
          <br className="hidden sm:inline-block" />
          برای دریافت آخرین به‌روزرسانی‌ها، از فهرست ایمیل ما استفاده کنید یا ما
          را در فیسبوک دنبال کنید.
        </p>
        <Button
          color="primary"
          size="xl"
          className="mt-8 h-12 px-4 xl:h-14 xl:px-6"
          onClick={() => push('/')}
        >
          <PiHouseLineBold className="mr-1.5 text-lg" />
          برگشت به خانه
        </Button>
      </div>
    </div>
  );
}
