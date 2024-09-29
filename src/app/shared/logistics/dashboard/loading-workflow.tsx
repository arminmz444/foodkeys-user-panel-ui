'use client';

import cn from '@/utils/class-names';
import { useMedia } from '@/hooks/use-media';
import WidgetCard from '@/components/cards/widget-card';

const incomingVehicles = [
  {
    count: 10,
    label: 'در 12 ساعت',
  },
  {
    count: 25,
    label: 'در 24 ساعت',
  },
  {
    count: 60,
    label: 'در 48 ساعت',
  },
];
const atParking = [
  {
    count: 10,
    label: 'پارکینگ 1',
  },
  {
    count: 25,
    label: 'پارکینگ 1',
  },
];
const atDock = [
  {
    count: 10,
    label: 'محل بارگیری 1',
  },
  {
    count: 25,
    label: 'محل بارگیری 1',
  },
];

export default function LoadingWorkflow({ className }: { className?: string }) {
  const isTablet = useMedia('(max-width: 800px)', false);

  return (
    <WidgetCard
      title="جریان کار بارگیری"
      description={
        <p>
          <span className="font-iransans text-xl font-semibold text-gray-900 2xl:text-2xl">
            56,000
          </span>{' '}
          بارگیری کامیون‌ها
        </p>
      }
      titleClassName="font-normal text-gray-500 text-sm sm:text-sm 2xl:text-base  font-iransans"
      headerClassName="col-span-full"
      descriptionClassName=" mt-2"
      className={cn(
        'relative grid grid-cols-2 place-content-between gap-5 pb-0 @2xl:gap-8 @3xl:gap-5 lg:pb-0',
        className
      )}
    >
      <div className="col-span-full grid grid-cols-2 gap-4">
        <div className="col-span-full grid grid-cols-3 gap-3 rounded-md border border-gray-300 p-4">
          <p className="col-span-full">وسایل نقلیه ورودی - 70</p>
          {incomingVehicles.map((vehicle, index) => (
            <Card key={index} {...vehicle} />
          ))}
        </div>
        <div className="col-span-full grid grid-cols-2 gap-3 rounded-md border border-gray-300 p-4 sm:col-span-1">
          <p className="col-span-full">در پارکینگ - 17</p>
          {atParking.map((vehicle, index) => (
            <Card key={index} {...vehicle} />
          ))}
        </div>
        <div className="col-span-full grid grid-cols-2 gap-3 rounded-md border border-gray-300 p-4 sm:col-span-1">
          <p className="col-span-full">در داک (محل بارگیری یا تخلیه) - 20</p>
          {atDock.map((vehicle, index) => (
            <Card key={index} {...vehicle} />
          ))}
        </div>
      </div>
      <div className="col-span-full -mx-5 rounded-b-lg bg-gray-50 p-5 text-gray-700 lg:-mx-7 lg:p-7">
        <p>در مرحله مستندات - 200 وسیله</p>
      </div>
    </WidgetCard>
  );
}

function Card({ count, label }: { count: number; label: string }) {
  return (
    <div className="border-r-2 border-secondary ps-2 text-xs">
      <p className="font-semibold text-gray-900">{count}</p>
      <p>{label}</p>
    </div>
  );
}
