import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import Table from '@/components/ui/table';
import { usePathname } from 'next/navigation';
import farmLogo from 'public/farmLogo.webp';
import farmSign from 'public/farmSignature.png';

const invoiceItems = [
  {
    id: '1',
    product: {
      title: 'پلن 1',
      description: 'خرید اشتراک رایگان 2 ماهه بانک صنعت غذا ',
    },
    quantity: 2,
    unitPrice: 1_000_000,
    total: 2_000_000,
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
    title: 'شرح کالا یا خدمات',
    dataIndex: 'product',
    key: 'product',
    width: 300,
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
    title: 'مبلغ واحد',
    dataIndex: 'unitPrice',
    key: 'unitPrice',
    width: 200,
    render: (value: string) => (
      <Text className="font-medium">
        {parseInt(value).toLocaleString()} ریال
      </Text>
    ),
  },
  {
    title: 'مبلغ کل',
    dataIndex: 'total',
    key: 'total',
    width: 200,
    render: (value: string) => (
      <Text className="font-medium">
        {parseInt(value).toLocaleString()} ریال
      </Text>
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

export default function InvoiceDetails({ printRef }) {
  const path = usePathname();
  const discount = 100_000;
  const total = invoiceItems[0].total * invoiceItems[0].quantity;
  const tax = (total - discount) * 0.1;
  const totalPrice = total - discount + tax;
  return (
    <div
      ref={printRef}
      className="w-full rounded-xl border border-gray-200 p-5 text-sm sm:p-6 lg:p-8 2xl:p-10"
    >
      <div className="mb-12 flex flex-col-reverse items-start justify-between md:mb-16 md:flex-row">
        <div className="flex items-center justify-center gap-4">
          <Image
            src={farmLogo}
            alt="فرآیند آرا رسم مهر"
            className="w-24 dark:invert"
            priority
          />
          <div className="flex flex-col items-center justify-center">
            <h3 className=" font-extrabold">
              شرکت فرآیند آرا رسم مهر{' '}
              <span className="font-thin">(سهامی خاص)</span>
            </h3>
            <div className="h-[.1rem] w-full bg-black" />
            <h6 className="font-thin">.Farayand Ara Rasme Mehr Co</h6>
          </div>
        </div>
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
          <Text tag="h5" className="mb-3.5 font-semibold">
            مشخصات فروشنده:
          </Text>
          <span>
            <Text tag="h6" className="mb-1.5 text-sm font-semibold uppercase">
              فروشنده:
            </Text>
            <Text tag="sup" className="mb-1.5 text-sm  uppercase">
              شرکت فرآیند آرا رسم مهر (سهامی خاص){' '}
            </Text>
          </span>
          <span>
            <Text tag="h6" className="mb-1.5 text-sm font-semibold uppercase">
              ش.اقتصادی:
            </Text>
            <Text tag="sup" className="mb-1.5 text-sm uppercase">
              14011180241
            </Text>
          </span>
          <span>
            <Text tag="h6" className="mb-1.5 text-sm font-semibold uppercase">
              ش.ثبت / ملی:
            </Text>
            <Text tag="sup" className="mb-1.5 text-sm  uppercase">
              14011180241
            </Text>
          </span>
          <span>
            <Text tag="h6" className="mb-1.5 text-sm font-semibold uppercase">
              استان:
            </Text>
            <Text tag="sup" className="mb-1.5 text-sm  uppercase">
              البرز
            </Text>
          </span>
          <span>
            <Text tag="h6" className="mb-1.5 text-sm font-semibold uppercase">
              شهر:
            </Text>
            <Text tag="sup" className="mb-1.5 text-sm  uppercase">
              کرج
            </Text>
          </span>
          <span>
            <Text tag="h6" className="mb-1.5 text-sm font-semibold uppercase">
              کدپستی:
            </Text>
            <Text tag="sup" className="mb-1.5 text-sm  uppercase">
              3136994769
            </Text>
          </span>
          <span>
            <Text tag="h6" className="mb-1.5 text-sm font-semibold uppercase">
              تلفن/نمابر:
            </Text>
            <Text tag="sup" className="mb-1.5 text-sm  uppercase">
              02632774346 / 02632774306
            </Text>
          </span>
          <span>
            <Text tag="h6" className="mb-1.5 text-sm font-semibold uppercase">
              نشانی:
            </Text>
            <Text tag="sup" className="mb-4 text-sm  uppercase sm:mb-6 md:mb-8">
              کرج، میدان مادر، ساختمان 431
            </Text>
          </span>
        </div>

        <div className="mt-4 xs:mt-0">
          <Text tag="h5" className="mb-3.5 font-semibold">
            مشخصات خریدار:
          </Text>
          <span>
            <Text tag="h6" className="mb-1.5 text-sm font-semibold uppercase">
              خریدار:
            </Text>
            <Text tag="sup" className="mb-1.5 text-sm  uppercase">
              شرکت شیرین عسل
            </Text>
          </span>
          <span>
            <Text tag="h6" className="mb-1.5 text-sm font-semibold uppercase">
              ش.اقتصادی:
            </Text>
            <Text tag="sup" className="mb-1.5 text-sm uppercase">
              14011180241
            </Text>
          </span>
          <span>
            <Text tag="h6" className="mb-1.5 text-sm font-semibold uppercase">
              ش.ثبت / ملی:
            </Text>
            <Text tag="sup" className="mb-1.5 text-sm  uppercase">
              14011180241
            </Text>
          </span>
          <span>
            <Text tag="h6" className="mb-1.5 text-sm font-semibold uppercase">
              استان:
            </Text>
            <Text tag="sup" className="mb-1.5 text-sm  uppercase">
              البرز
            </Text>
          </span>
          <span>
            <Text tag="h6" className="mb-1.5 text-sm font-semibold uppercase">
              شهر:
            </Text>
            <Text tag="sup" className="mb-1.5 text-sm  uppercase">
              کرج
            </Text>
          </span>
          <span>
            <Text tag="h6" className="mb-1.5 text-sm font-semibold uppercase">
              کدپستی:
            </Text>
            <Text tag="sup" className="mb-1.5 text-sm  uppercase">
              3136994769
            </Text>
          </span>
          <span>
            <Text tag="h6" className="mb-1.5 text-sm font-semibold uppercase">
              تلفن/نمابر:
            </Text>
            <Text tag="sup" className="mb-1.5 text-sm  uppercase">
              02632774346 / 02632774306
            </Text>
          </span>
          <span>
            <Text tag="h6" className="mb-1.5 text-sm font-semibold uppercase">
              نشانی:
            </Text>
            <Text tag="sup" className="mb-4 text-sm  uppercase sm:mb-6 md:mb-8">
              کرج، میدان مادر، ساختمان 431
            </Text>
          </span>
        </div>

        <div className="mt-4 flex items-end gap-5 sm:mt-6 sm:flex-col sm:gap-0 md:mt-0 md:justify-start">
          <QRCodeSVG
            value={'localhost:3000' + path}
            className="h-28 w-28 lg:h-32 lg:w-32"
          />

          <span className="mt-10">
            <Text tag="h6" className="mb-1.5 text-sm font-semibold uppercase">
              تاریخ:
            </Text>
            <Text tag="sup" className="mb-4 text-sm  uppercase sm:mb-6 md:mb-8">
              1402/02/14
            </Text>
          </span>
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
            اشتراک پلن درخواستی از تاریخ فاکتور تا مدت زمان یک سال می‌باشد.
          </Text>
        </div>
        <div className=" w-full max-w-sm">
          <Text className="flex items-center justify-between border-b border-gray-200 pb-3.5 lg:pb-5">
            جمع کل:{' '}
            <Text tag="span" className="font-semibold">
              {total.toLocaleString()} ریال
            </Text>
          </Text>

          <Text className="flex items-center justify-between border-b border-gray-200 py-3.5 text-red-light lg:py-5">
            تخفیف:{' '}
            <Text tag="span" className="font-semibold">
              {discount.toLocaleString()} ریال
            </Text>
          </Text>
          <Text className="flex items-center justify-between border-b border-gray-200 py-3.5 lg:py-5">
            مالیات:
            <Text tag="span" className="font-semibold">
              10%
            </Text>
          </Text>
          <Text className="flex items-center justify-between  pt-4 text-base font-semibold text-gray-900 lg:py-5">
            خالص پرداختی:{' '}
            <Text tag="span">{totalPrice.toLocaleString()} ریال</Text>
          </Text>
        </div>
      </div>
      <hr className="my-5" />
      <div className="relative mt-10 flex h-40 w-full items-center justify-center border text-center">
        <div className="w-1/2">
          مهر و امضا فروشنده:
          <Image
            className="absolute left-1/2 top-1/2 w-36 -translate-y-1/2 translate-x-1/2 rotate-6"
            src={farmSign}
            alt=""
          />
        </div>
        <div className="w-1/2">مهر و امضا خریدار:</div>
      </div>
    </div>
  );
}
