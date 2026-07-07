import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import NotificationDetailView from '@/app/shared/notifications/notification-detail';

const pageHeader = {
  title: 'جزئیات اعلان',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'خانه',
    },
    {
      href: routes.notificationCenter,
      name: 'اعلان‌ها',
    },
    {
      name: 'جزئیات',
    },
  ],
};

export default function NotificationDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <NotificationDetailView id={params.id} />
    </>
  );
}
