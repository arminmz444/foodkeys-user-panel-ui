import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';

const pageHeader = {
  title: 'رهگیری',
  breadcrumb: [
    {
      name: 'خانه',
    },
    {
      href: routes.eCommerce.dashboard,
      name: 'ایکامرس',
    },
    {
      name: 'رهگیری',
    },
  ],
};

export default function TrackingPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
    </>
  );
}
