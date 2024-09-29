import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import CheckoutPageWrapper from '@/app/shared/ecommerce/checkout';

const pageHeader = {
  title: 'پرداخت',
  breadcrumb: [
    {
      name: 'خانه',
    },
    {
      href: routes.eCommerce.dashboard,
      name: 'ایکامرس',
    },
    {
      name: 'پرداخت',
    },
  ],
};

export default function CheckoutPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CheckoutPageWrapper />
    </>
  );
}
