'use client';

import { Element } from 'react-scroll';
import { PiCheckCircle, PiCaretDownBold } from 'react-icons/pi';
import { Collapse } from '@/components/ui/collapse';
import Timeline from '@/app/shared/logistics/tracking/timeline';
import cn from '@/utils/class-names';

const timelineData = [
  {
    title: 'دریافت سفارش',
    text: '',
    hightlightedText: '',
    date: '26 فروردین 1402',
    time: '12:30 بعد از ظهر',
    icon: '',
    status: '',
  },
  {
    title: 'فروشگاه شروع به بسته‌بندی کرده است',
    text: '',
    hightlightedText: 'بسته‌بندی شروع شده است. انتظار داریم شما صبور باشید.',
    date: '28 فروردین 1402',
    time: '8:00 صبح',
    icon: '',
    status: '',
  },
  {
    title: 'از فروشگاه خارج شد',
    text: '',
    hightlightedText: '',
    date: '29 فروردین 1402',
    time: '05:31 صبح',
    icon: '',
    status: '',
  },
  {
    title: 'در حال انتقال به تسهیلات بعدی',
    text: '',
    hightlightedText: '',
    date: '01 خرداد 1402',
    time: '09:00 صبح',
    icon: '',
    status: '',
  },
  {
    title: 'در حال انتقال',
    text: 'در حال انتقال به محل تحویل.',
    hightlightedText: 'اینگلوود، مین 98380',
    date: '02 خرداد 1402',
    time: '10:05 صبح',
    icon: '',
    status: '',
  },
  {
    title: 'در حال تحویل',
    text: 'هنوز تحویل نشده، فردی از تاسیسات پستی برداشته شد',
    hightlightedText: 'تهران، آزادی',
    date: '02 خرداد 1402',
    time: '11:00 صبح',
    icon: '',
    status: '',
  },
  {
    title: 'تحویل داده شد',
    text: 'تحویل داده شده، فردی از تاسیسات پستی برداشته شد',
    hightlightedText: 'تهران، آزادی',
    date: '02 خرداد 1402',
    time: '11:30 صبح',
    icon: <PiCheckCircle className="h-6 w-6 text-green" />,
    status: 'success',
  },
];
export default function TrackingHistory({ className }: { className?: string }) {
  return (
    <>
      <Collapse
        className="mx-0 py-5 md:py-7 lg:mx-8"
        defaultOpen={true}
        panelClassName="mb-7"
        header={({ open, toggle }) => (
          <button
            type="button"
            onClick={toggle}
            className="font-iransans flex w-full cursor-pointer items-center justify-between text-left text-xl font-semibold text-gray-700"
          >
            تاریخچه پیگیری
            <PiCaretDownBold
              className={cn(
                'h-5 w-5 -rotate-90 transform transition-transform duration-300 rtl:rotate-90',
                open && '-rotate-0 rtl:rotate-0'
              )}
            />
          </button>
        )}
      >
        <Element name="tracking_history">
          <Timeline className="mt-10" data={timelineData} />
        </Element>
      </Collapse>
    </>
  );
}
