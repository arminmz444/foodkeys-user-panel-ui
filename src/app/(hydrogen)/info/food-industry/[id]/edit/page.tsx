import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { Button } from '@/components/ui/button';
import PageHeader from '@/app/shared/page-header';
import CreateCompany from '@/app/shared/info/food-industry/company/create';



const productData = {
  title: 'سیب',
  brands: [
    {
      name: 'میهن',
      isEnglish: true,
      isPrimary: true
    },
  ],
  companyName: "میهن",
  companyEnglishName: "Mihan",
  mainBrand: {
    persian: "میهن",
    english: "mihan"
  },
  description: 'مخلوط سالاد باغی ایسبرگ فرش اکسپرس',
  sku: 'SKU-28935',
  type: 'محصول دیجیتال',
  categories: 'خواربار',
  price: '10',
  costPrice: '20',
  retailPrice: '15',
  salePrice: '25',
  inventoryTracking: 'no',
  currentStock: '150',
  lowStock: '20',
  productAvailability: 'online',
  tradeNumber: '12345',
  manufacturerNumber: '154',
  brand: 'امینی',
  upcEan: 'Ean',
  customFields: [
    {
      label: 'رنگ',
      value: 'قرمز',
    },
  ],
  freeShipping: false,
  shippingPrice: '45',
  locationBasedShipping: true,
  locationShipping: [
    {
      name: 'USA',
      shippingCharge: '150',
    },
  ],
  pageTitle: 'سیب',
  metaDescription: 'سیب',
  metaKeywords: 'خواربار, غذا',
  productUrl: 'http://localhost:3000/',
  isPurchaseSpecifyDate: true,
  isLimitDate: true,
  dateFieldName: 'فیلد تاریخ',
  productVariants: [
    {
      name: 'صادق',
      value: '150',
    },
  ],
  tags: ['آیفون', 'موبایل'],
};

export default function EditCompanyPage({
  params,
}: {
  params: { id: string };
}) {
  const pageHeader = {
    title: 'ویرایش اطلاعات شرکت',
    breadcrumb: [
      {
        href: routes.info.dashboard,
        name: 'بانک صنعت غذا',
      },
      {
        href: routes.info.foodIndustryList,
        name: 'لیست شرکت‌ها',
      },
      {
        href: routes.info.foodIndustryEdit(Number(params.id)),
        name: 'ویرایش اطلاعات شرکت',
      },
      {
        name: params.id,
      },
    ],
  };
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.info.foodIndustryAdd}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button
            tag="span"
            className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
          >
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            ثبت شرکت جدید
          </Button>
        </Link>
      </PageHeader>

      <CreateCompany id={params.id} company={productData} />
    </>
  );
}
