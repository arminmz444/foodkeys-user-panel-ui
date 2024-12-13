import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import CreateOrder from '@/app/shared/ecommerce/order/create-order';
import ImportButton from '@/app/shared/import-button';

const pageHeader = {
  title: 'سفارش',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'ایکامرس',
    },
    {
      href: routes.eCommerce.orders,
      name: 'سفارشات',
    },
    {
      name: 'ایجاد',
    },
  ],
};

export default function CreateOrderPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ImportButton
          title="آپلود سفارش"
          modalBtnLabel="آپلود سفارش"
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        />
      </PageHeader>
      <CreateOrder />
    </>
  );
}
