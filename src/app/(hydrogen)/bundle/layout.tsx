import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/bundle/navigation';

const pageHeader = {
  title: 'مدیریت اشتراک',
  breadcrumb: [
    {
      href: '/',
      name: 'خانه',
    },
    {
      href: routes.bundle,
      name: 'مدیریت اشتراک',
    },
  ],
};

export default function ProfileSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ProfileSettingsNav />
      {children}
    </>
  );
}
