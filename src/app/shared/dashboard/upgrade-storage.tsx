import BannerCard from '@/components/banners/banner-card';
import Link from 'next/link';
import { Text } from '@/components/ui/text';
import { PiCheckCircleFill } from 'react-icons/pi';

const features = [
  'امکانات ویژه با امکان سفارشی‌سازی.',
  'دسترسی چند کاربره.',
  'آسان برای دسترسی و ویرایش.',
];

export default function UpgradeStorage({ className }: { className?: string }) {
  return (
    <div className={className}>
      <BannerCard
        title="ارتقا حافظه"
        className="min-h-[280px] overflow-hidden rounded-lg"
      >
        <div className="my-5">
          {features.map((feature, index) => (
            <Text
              key={`feature-${index}`}
              className="flex items-center gap-2 py-1 text-sm font-medium text-white"
            >
              <PiCheckCircleFill className="h-5 w-5 text-xl text-white" />
              {feature}
            </Text>
          ))}
        </div>
        <Link
          href={'/file'}
          className="inline-block rounded-md bg-white px-4 py-2.5 text-sm font-medium text-gray-900 dark:bg-gray-100"
        >
          ارتقا حافظه
        </Link>
      </BannerCard>
    </div>
  );
}
