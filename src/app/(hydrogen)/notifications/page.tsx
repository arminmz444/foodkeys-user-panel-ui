import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import NotificationsListView from '@/app/shared/notifications/notifications-list';

const pageHeader = {
  title: 'اعلان‌ها',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'خانه',
    },
    {
      name: 'اعلان‌ها',
    },
  ],
};

export default function NotificationsPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <NotificationsListView />
    </>
  );
}
