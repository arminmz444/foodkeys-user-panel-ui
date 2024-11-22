import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import Link from 'next/link';
import CreateOrder from '@/app/shared/ecommerce/order/create-order';

// TODO: Need added Order date default value

const pageHeader = {
  title: 'ویرایش سفارش',
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
      name: 'ویرایش',
    },
  ],
};

const orderData = {
  firstName: 'صادق',
  lastName: 'قاسمی',
  phoneNumber: '98',
  companyName: 'RedQ',
  city: 'شیراز',
  country: 'ایران',
  state: 'فارس',
  addressOne: 'فلکه گازو',
  addressTwo: '',
  zip: '1216',
  isSameShippingAddress: 'SameShippingAddress',
  shippingAddressOne: 'اطلسی',
  shippingAddressTwo: '',
  shippingCity: 'شیراز',
  shippingCountry: 'ایران',
  shippingState: 'فارس',
  shippingZip: '2016',
  paymentMethod: 'PayPal',
  shippingMethod: 'USPS',
};

export default function EditOrderPage({ params }: any) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.eCommerce.orders}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button tag="span" className="w-full @lg:w-auto" variant="outline">
            انصراف
          </Button>
        </Link>
      </PageHeader>
      <CreateOrder id={params.id} order={orderData} />
    </>
  );
}
