import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/account-settings/navigation';
import PasswordSettingsView from '@/app/shared/account-settings/password-settings';

const pageHeader = {
  title: 'تنطیمات حساب کاربری',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'مدیریت اطلاعات',
    },
    {
      href: routes.forms.profileSettings,
      name: 'حساب کاربری',
    },
    {
      name: 'رمز عبور',
    },
  ],
};

export default function ProfileSettingsFormPage() {
  return (
    <PasswordSettingsView
      settings={{
        currentPassword: '',
        newPassword: '',
        confirmedPassword: '',
      }}
    />
  );
}
