import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import Table from '@/components/ui/table';
import { siteConfig } from '@/config/site.config';

const invoiceItems = [
  {
    id: '1',
    product: {
      title: 'لاراول',
      description:
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و ',
    },
    quantity: 2,
    unitPrice: 100,
    total: 200,
  },
  {
    id: '2',
    product: {
      title: 'ری اکت',
      description:
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که ',
    },
    quantity: 2,
    unitPrice: 100,
    total: 200,
  },
  {
    id: '3',
    product: {
      title: 'نکست',
      description:
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و ',
    },
    quantity: 3,
    unitPrice: 100,
    total: 300,
  },
];

const columns = [
  {
    title: '#',
    dataIndex: 'id',
    key: 'id',
    width: 50,
  },
  {
    title: 'آیتم',
    dataIndex: 'product',
    key: 'product',
    width: 250,
    render: (product: any) => (
      <>
        <Text tag="h6" className="mb-0.5 text-sm font-medium">
          {product.title}
        </Text>
        <Text
          tag="p"
          className=" max-w-[250px] overflow-hidden truncate text-sm text-gray-500"
        >
          {product.description}
        </Text>
      </>
    ),
  },

  {
    title: 'تعداد',
    dataIndex: 'quantity',
    key: 'quantity',
    width: 200,
  },
  {
    title: 'قیمت جز',
    dataIndex: 'unitPrice',
    key: 'unitPrice',
    width: 200,
    render: (value: string) => (
      <Text className="font-medium">تومان{value}</Text>
    ),
  },
  {
    title: 'قیمت کل',
    dataIndex: 'total',
    key: 'total',
    width: 200,
    render: (value: string) => (
      <Text className="font-medium">تومان{value}</Text>
    ),
  },
];

function InvoiceDetailsListTable() {
  return (
    <Table
      data={invoiceItems}
      columns={columns}
      variant="minimal"
      rowKey={(record) => record.id}
      scroll={{ x: 660 }}
      className="mb-11"
    />
  );
}

export default function InvoiceDetails() {
  return (
    <div className="w-full rounded-xl border border-gray-200 p-5 text-sm sm:p-6 lg:p-8 2xl:p-10">
      <div className="mb-12 flex flex-col-reverse items-start justify-between md:mb-16 md:flex-row">
        <Image
          src={siteConfig.logo}
          alt={siteConfig.title}
          className="dark:invert"
          priority
        />
        <div className="mb-4 md:mb-0">
          <Badge
            variant="flat"
            color="success"
            rounded="md"
            className="mb-3 md:mb-2"
          >
            پرداخت شده
          </Badge>
          <Text tag="h6">INV - #246098</Text>
          <Text className="mt-0.5 text-gray-500">شماره فاکتور</Text>
        </div>
      </div>

      <div className="mb-12 grid gap-4 xs:grid-cols-2 sm:grid-cols-3 sm:grid-rows-1">
        <div className="">
          <Text tag="h6" className="mb-3.5 font-semibold">
            از
          </Text>
          <Text tag="h6" className="mb-1.5 text-sm font-semibold uppercase">
            شرکت کامپیژن
          </Text>
          <Text className="mb-1.5">صادق قاسم نژاد</Text>
          <Text className="mb-1.5">شیراز</Text>
          <Text className="mb-4 sm:mb-6 md:mb-8">09123456789</Text>
          <div>
            <Text tag="h6" className="mb-2 text-sm font-semibold">
              تاریخ ایجاد
            </Text>
            <Text>24 فروردین 1402</Text>
          </div>
        </div>

        <div className="mt-4 xs:mt-0">
          <Text tag="h6" className="mb-3.5 font-semibold">
            پرداخت
          </Text>
          <Text tag="h6" className="mb-1.5 text-sm font-semibold uppercase">
            دیجی کالا
          </Text>
          <Text className="mb-1.5">فرهاد مجیدی</Text>
          <Text className="mb-1.5">تهران آزادی</Text>
          <Text className="mb-4 sm:mb-6 md:mb-8">09123456789</Text>
          <div>
            <Text tag="h6" className="mb-2 text-sm font-semibold">
              تاریخ آخرین تراکنش
            </Text>
            <Text>24 فروردین 1402</Text>
          </div>
        </div>

        <div className="mt-4 flex sm:mt-6 md:mt-0 md:justify-end">
          <QRCodeSVG
            value="https://reactjs.org/"
            className="h-28 w-28 lg:h-32 lg:w-32"
          />
        </div>
      </div>

      <InvoiceDetailsListTable />

      <div className="flex flex-col-reverse items-start justify-between border-t border-gray-200 pb-4 pt-8 xs:flex-row">
        <div className="mt-6 max-w-md pe-4 xs:mt-0">
          <Text
            tag="h6"
            className="mb-1 text-xs font-semibold uppercase xs:mb-2 xs:text-sm"
          >
            یادداشت
          </Text>
          <Text className="leading-[1.7]">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که{' '}
          </Text>
        </div>
        <div className=" w-full max-w-sm">
          <Text className="flex items-center justify-between border-b border-gray-200 pb-3.5 lg:pb-5">
            قیمت:{' '}
            <Text tag="span" className="font-semibold">
              تومان700
            </Text>
          </Text>
          <Text className="flex items-center justify-between border-b border-gray-200 py-3.5 lg:py-5">
            ارسال:{' '}
            <Text tag="span" className="font-semibold">
              تومان142
            </Text>
          </Text>
          <Text className="flex items-center justify-between border-b border-gray-200 py-3.5 lg:py-5">
            تخفیف:{' '}
            <Text tag="span" className="font-semibold">
              تومان250
            </Text>
          </Text>
          <Text className="flex items-center justify-between border-b border-gray-200 py-3.5 lg:py-5">
            مالیات:
            <Text tag="span" className="font-semibold">
              15%
            </Text>
          </Text>
          <Text className="flex items-center justify-between pt-4 text-base font-semibold text-gray-900 lg:pt-5">
            کل: <Text tag="span">تومان659.5</Text>
          </Text>
        </div>
      </div>
    </div>
  );
}
