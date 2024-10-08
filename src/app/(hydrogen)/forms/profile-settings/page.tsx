import { routes } from '@/config/routes';
import PersonalInfoView from '@/app/shared/account-settings/personal-info';
import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/account-settings/navigation';

const pageHeader = {
  title: 'تنطیمات حساب کاربری',
  breadcrumb: [
    {
      href: routes.info.dashboard,
      name: 'مدیریت اطلاعات',
    },
    {
      href: routes.info.profile,
      name: 'حساب کاربری',
    },
    {
      name: 'تنطیمات حساب کاربری',
    },
  ],
};

export default function ProfileSettingsFormPage() {
  return <PersonalInfoView />;
}
