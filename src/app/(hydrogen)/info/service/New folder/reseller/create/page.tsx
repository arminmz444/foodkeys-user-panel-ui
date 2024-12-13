import Link from 'next/link';
import { routes } from '@/config/routes';
import { Button } from '@/components/ui/button';
import { PiPlusBold } from 'react-icons/pi';
import PageHeader from '@/app/shared/page-header';
import CreateProduct from '@/app/shared/info/reseller/create';

const pageHeader = {
  title: 'ثبت اطلاعات اعطاکننده جدید',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'بانک خدمات',
    },
    {
      href: routes.eCommerce.products,
      name: 'اعطاکنندگان نمایندگی فروش',
    },
    {
      name: 'ایجاد',
    },
  ],
};

export default function CreateProductPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.eCommerce.createProduct}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button
            tag="span"
            className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
          >
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            اضافه کردن محصول
          </Button>
        </Link>
      </PageHeader>

      <CreateProduct />
    </>
  );
}
