import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/bundle/subscription-list/navigation';



export default function ProfileSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ProfileSettingsNav />
      {children}
    </>
  );
}
