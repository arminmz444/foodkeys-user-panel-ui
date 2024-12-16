import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/account-settings/navigation';
import NotificationSettingsView from '@/app/shared/account-settings/notification-settings';

const pageHeader = {
  title: 'تنطیمات حساب کاربری',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'خانه',
    },
    {
      href: routes.notifications,
      name: 'پیام‌ها و اعلانات',
    },
    {
      name: 'تنطیمات حساب کاربری',
    },
  ],
};

export default function IntegrationSettingsFormPage() {
  return <NotificationSettingsView />;
}
