import { Badge } from '@/components/ui/badge';

const data = [
  {
    Agency: 'دپریکسا میامی',
    Office: 'میامی - فلوریدا',
    'Logistics Service': 'حمل و نقل اقیانوسی',
  },
  {
    'Invoice date': '18 فروردین 1402',
    'Package Type': 'جعبه کوچک و تخت',
    'Courier Company': 'کارگوس',
  },
  {
    'Delivery time': 'TNT 10-14 روز',
    'Payment Method': 'پرداخت نقدی در هنگام تحویل',
    'Shipping Mode': 'روز بعد',
  },
];
const translatedObject: any = {
  Agency: 'نمایندگی',
  Office: 'دفتر',
  'Logistics Service': 'خدمات حمل و نقل',
  'Invoice date': 'تاریخ فاکتور',
  'Package Type': 'نوع بسته‌بندی',
  'Courier Company': 'شرکت پیک',
  'Delivery time': 'زمان تحویل',
  'Payment Method': 'روش پرداخت',
  'Shipping Mode': 'حالت حمل و نقل',
};

export default function InvoiceDetails() {
  return (
    <div className="grid items-start rounded-xl border border-gray-300 p-5 @2xl:grid-cols-2 @3xl:grid-cols-3 @3xl:p-8 @5xl:grid-cols-4">
      <ul className="grid gap-3 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
        <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
          <span className="font-semibold text-gray-900">شماره فاکتور :</span>
          <span className="text-base font-semibold text-gray-900">
            #AWB235740
          </span>
        </li>
        <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
          <span className="font-semibold text-gray-900">وضعیت بسته :</span>
          <Badge color="primary" rounded="md">
            قبول شده
          </Badge>
        </li>
        <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
          <span className="font-semibold text-gray-900">وضعیت فاکتور :</span>
          <Badge color="success" rounded="md">
            پرداخت شده
          </Badge>
        </li>
      </ul>
      {data.map((item, index) => (
        <ul key={index} className="mt-3 grid gap-3 @5xl:mt-0">
          {Object.entries(item).map(([key, value]) => (
            <li key={key} className="flex items-center gap-3">
              <span className="font-semibold text-gray-900">
                {translatedObject[key]} :
              </span>
              <span>{value}</span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
