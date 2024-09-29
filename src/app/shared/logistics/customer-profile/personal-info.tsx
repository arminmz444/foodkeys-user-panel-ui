'use client';

import Image from 'next/image';
import cn from '@/utils/class-names';
import { HeaderCell } from '@/components/ui/table';
import BasicTableWidget from '@/components/controlled-table/basic-table-widget';

interface PersonalInfoProps {
  className?: string;
}

const data = [
  {
    id: 1,
    country: {
      name: 'Iran',
      code: 'ir',
    },
    address: 'تهران آزادی',
    phone: '09123456789',
    company: 'دیجی کالا',
    source: 'ایمیل',
    grade: 1,
  },
];

export const getColumns = () => [
  {
    title: <HeaderCell title="کشور" className="ms-6" />,
    dataIndex: 'country',
    key: 'country',
    width: 100,
    render: ({ name, code }: { name: string; code: string }) => (
      <div className="ms-6 flex items-center gap-2">
        <figure className="relative h-10 w-10">
          <Image
            fill
            quality={100}
            alt={`${name} Flag icon`}
            className="object-contain"
            src={`https://flagcdn.com/${code.toLowerCase()}.svg`}
          />
        </figure>

        <span className="whitespace-nowrap">{name}</span>
      </div>
    ),
  },
  {
    title: <HeaderCell title="ـدرس" />,
    dataIndex: 'address',
    key: 'address',
    width: 300,
    render: (address: string) => <p>{address}</p>,
  },
  {
    title: <HeaderCell title="شماره تماس" />,
    dataIndex: 'phone',
    key: 'phone',
    width: 200,
    render: (phone: string) => <p>{phone}</p>,
  },
  {
    title: <HeaderCell title="شزکت" />,
    dataIndex: 'company',
    key: 'company',
    width: 200,
    render: (company: string) => <p>{company}</p>,
  },
  {
    title: <HeaderCell title="منبع" />,
    dataIndex: 'source',
    key: 'source',
    width: 150,
    render: (source: string) => <p>{source}</p>,
  },
  {
    title: <HeaderCell title="مقطع" className="me-6 justify-end" />,
    dataIndex: 'grade',
    key: 'grade',
    align: 'left',
    width: 150,
    render: (grade: number) => <p className="me-6">{grade}</p>,
  },
];

export default function PersonalInformation({ className }: PersonalInfoProps) {
  return (
    <BasicTableWidget
      title="جزییات شخص"
      className={cn(
        'mt-14 pb-0 lg:pb-0 [&_.rc-table-row:last-child_td]:border-b-0',
        className
      )}
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
