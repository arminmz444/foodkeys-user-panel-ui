import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/bundle/navigation';



export default function ProfileSettingsLayout({
    params,
  children,
}: {
  params: number,
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
        href: routes.bundle(params?.id),
        name: 'مدیریت اشتراک',
      },
    ],
  };
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ProfileSettingsNav id={params?.id}/>
      {children}
    </>
  );
}
