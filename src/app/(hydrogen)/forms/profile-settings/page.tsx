import { routes } from '@/config/routes';
import PersonalInfoView from '@/app/shared/account-settings/personal-info';
import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/account-settings/navigation';

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

export default function ProfileSettingsFormPage() {
  return <PersonalInfoView />;
}
