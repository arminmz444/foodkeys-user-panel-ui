import { routes } from '@/config/routes';

const pageHeader = {
  title: 'مدیریت اشتراک',
  breadcrumb: [
    {
      href: '/',
      name: 'خانه',
    },
    {
      href: routes.subscriptionList,
      name: 'مدیریت اشتراک',
    },
  ],
};

export default function ProfileSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
