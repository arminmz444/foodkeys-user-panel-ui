'use client';

import cn from '@/utils/class-names';
import { toCurrency } from '@/utils/to-currency';
import BasicTableWidget from '@/components/controlled-table/basic-table-widget';

interface DeliveryDetailsProps {
  className?: string;
}

const data = [
  {
    id: 1,
    amount: 1.0,
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت ',
    weight: '1 کیلوگرم',
    dimensions: '16x19x5 cm.',
    actualValue: 190.0,
    discountedValue: 190.0,
    tax: 15.0,
    total: 210.0,
  },
];

export const getColumns = () => [
  {
    title: <span className="ms-6 block">مقدار</span>,
    dataIndex: 'amount',
    key: 'amount',
    width: 100,
    render: (amount: number) => <span className="ms-6 block">{amount}</span>,
  },
  {
    title: <span className="block">توضیحات</span>,
    dataIndex: 'description',
    key: 'description',
    width: 300,
    render: (description: string) => <p>{description}</p>,
  },
  {
    title: <span className="block">وزن</span>,
    dataIndex: 'weight',
    key: 'weight',
    width: 200,
    render: (weight: string) => <p>{weight}</p>,
  },
  {
    title: <span className="block">حجم</span>,
    dataIndex: 'weight',
    key: 'weight',
    width: 200,
    render: (weight: string) => <p>{weight}</p>,
  },
  {
    title: <span className="block">ارزش واقعی</span>,
    dataIndex: 'actualValue',
    key: 'actualValue',
    align: 'right',
    width: 150,
    render: (actualValue: number) => <p>{toCurrency(actualValue)}</p>,
  },
  {
    title: <span className="block">ارزش با تخفیف</span>,
    dataIndex: 'discountedValue',
    key: 'discountedValue',
    align: 'right',
    width: 200,
    render: (discountedValue: number) => <p>{toCurrency(discountedValue)}</p>,
  },
  {
    title: <span className="block">مالیات</span>,
    dataIndex: 'tax',
    key: 'tax',
    align: 'right',
    width: 100,
    render: (tax: number) => <p>{toCurrency(tax)}</p>,
  },
  {
    title: <span className="me-6 block">کل</span>,
    dataIndex: 'total',
    key: 'total',
    align: 'right',
    width: 150,
    render: (total: number) => <p className="me-6">{toCurrency(total)}</p>,
  },
];

export default function ShippingDetails({ className }: DeliveryDetailsProps) {
  return (
    <BasicTableWidget
      title="جزییات ارسال"
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
