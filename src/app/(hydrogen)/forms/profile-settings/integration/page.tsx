import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/account-settings/navigation';
import IntegrationSettingsView from '@/app/shared/account-settings/integration-settings';

const pageHeader = {
  title: 'تنطیمات حساب کاربری',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'ایکامرس',
    },
    {
      href: routes.forms.profileSettings,
      name: 'فرم',
    },
    {
      name: 'تنطیمات حساب کاربری',
    },
  ],
};

export default function IntegrationSettingsFormPage() {
  return <IntegrationSettingsView />;
}
