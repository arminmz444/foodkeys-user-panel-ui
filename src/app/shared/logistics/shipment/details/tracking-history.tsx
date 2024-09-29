'use client';

import Image from 'next/image';
import cn from '@/utils/class-names';
import { Text } from '@/components/ui/text';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/utils/format-date';
import BasicTableWidget from '@/components/controlled-table/basic-table-widget';

export const data = [
  {
    id: 4,
    date: '2023-08-23T14:49:10.954Z',
    updatedAt: '2023-08-23T14:49:10.954Z',
    currentLocation: { country: 'فیجی', countryCode: 'FJ' },
    status: 'Delivered',
    remarks: 'لورم ایپسوم متن ساختگی با ',
  },
  {
    id: 3,
    date: '2023-08-22T14:49:10.954Z',
    updatedAt: '2023-08-22T14:49:10.954Z',
    currentLocation: { country: 'اوکراین', countryCode: 'UA' },
    status: 'Out For Delivery',
    remarks: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت ',
  },
  {
    id: 2,
    date: '2023-08-21T14:49:10.954Z',
    updatedAt: '2023-08-21T14:49:10.954Z',
    currentLocation: { country: 'جبل‌الطارق', countryCode: 'GI' },
    status: 'In Transit',
    remarks: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت ',
  },
  {
    id: 1,
    date: '2023-08-20T14:49:10.954Z',
    updatedAt: '2023-08-20T14:49:10.954Z',
    currentLocation: { country: 'فیجی', countryCode: 'FJ' },
    status: 'Accepted',
    remarks: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت ',
  },
];
const statusColors = {
  Accepted: 'info',
  'In Transit': 'secondary',
  'Out For Delivery': 'primary',
  Delivered: 'success',
};

export const getColumns = () => [
  {
    title: <span className="ml-6 block">تاریخ</span>,
    dataIndex: 'date',
    key: 'date',
    width: 200,
    render: (date: Date) => (
      <div className="ml-6">
        <Text className="mb-1 text-gray-700">
          {new Date(date)?.toLocaleDateString('fa-ir')}
        </Text>
        <Text className="text-[13px] text-gray-500">
          {new Date(date)?.toLocaleTimeString('fa-ir')}
        </Text>
      </div>
    ),
  },
  {
    title: 'ویرایش شده در',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    width: 200,
    render: (updatedAt: Date) => (
      <>
        <Text className="mb-1 text-gray-700">
          {new Date(updatedAt)?.toLocaleDateString('fa-ir')}
        </Text>
        <Text className="text-[13px] text-gray-500">
          {new Date(updatedAt)?.toLocaleTimeString('fa-ir')}
        </Text>
      </>
    ),
  },
  {
    title: 'موقعیت کنونی',
    dataIndex: 'currentLocation',
    key: 'currentLocation',
    width: 200,
    render: ({
      country,
      countryCode,
    }: {
      country: string;
      countryCode: string;
    }) => (
      <div className="flex items-center gap-2">
        <figure className="relative h-10 w-10">
          <Image
            fill
            quality={100}
            alt={`${country} Flag icon`}
            className="object-contain"
            src={`https://flagcdn.com/${countryCode.toLowerCase()}.svg`}
          />
        </figure>

        <span className="whitespace-nowrap">{country}</span>
      </div>
    ),
  },
  {
    title: 'وضعیت',
    dataIndex: 'status',
    key: 'status',
    width: 200,
    render: (status: string) => {
      const statusDict: any = {
        Delivered: 'ارسال شده',
        Approved: 'قیول شده',
        DeliveryFailed: 'ارسال نا موفق',
        InTransit: 'در حال ارسال',
        OutForDelivery: 'بسته بندی برای ارسال',
      };
      return (
        // @ts-ignore
        <Badge color={statusColors[status]} rounded="md">
          {statusDict[status.split(' ').join('')]}
        </Badge>
      );
    },
  },
  {
    title: 'یادداشت ها',
    dataIndex: 'remarks',
    key: 'remarks',
    width: 200,
    render: (remarks: string) => <p>{remarks}</p>,
  },
];

export default function TrackingHistoryTable({
  className,
}: {
  className?: string;
}) {
  return (
    <BasicTableWidget
      title="تاریخچه ارسال"
      className={cn('pb-0 lg:pb-0 [&_.rc-table-row:last-child_td]:border-b-0')}
      data={data}
      getColumns={getColumns}
      noGutter
      enableSearch={false}
      scroll={{
        x: 900,
      }}
    />
  );
}
