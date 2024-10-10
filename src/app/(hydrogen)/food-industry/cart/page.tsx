import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import CartTemplate from '@/app/shared/ecommerce/cart';

const pageHeader = {
  title: 'سبد خرید',
  breadcrumb: [
    {
      name: 'خانه',
    },
    {
      href: routes.eCommerce.dashboard,
      name: 'ایکامرس',
    },
    {
      name: 'سبد خرید',
    },
  ],
};

export default function CartPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CartTemplate />
    </>
  );
}
