'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PiHouseLineBold } from 'react-icons/pi';
import { Text } from '@/components/ui/text';

// images and icons
import NotFoundImg from '@public/404page.gif';

export default function NotFoundPage() {
  const { push } = useRouter();
  return (
    <div className="flex grow items-center px-6 xl:px-10">
      <div className="mx-auto text-center">
        <Text tag="h1" className="relative top-10 text-7xl tracking-widest">
          404{' '}
        </Text>
        <Image
          src={NotFoundImg}
          alt="not found"
          className="mx-auto mb-8 max-w-[256px] xs:max-w-[420px] lg:mb-12 2xl:mb-16"
        />
        <Text
          tag="h1"
          className="relative bottom-10 text-[22px] font-bold leading-normal text-gray-1000 lg:text-3xl"
        >
          صفحه مورد نظر یافت نشد!
        </Text>

        <Button
          color="success"
          size="xl"
          className="relative bottom-10 mt-8 h-12 bg-[#129974] px-4 xl:h-14 xl:px-6"
          onClick={() => push('/')}
        >
          <PiHouseLineBold className="mr-1.5 text-lg" />
          برگشت به خانه
        </Button>
      </div>
    </div>
  );
}
