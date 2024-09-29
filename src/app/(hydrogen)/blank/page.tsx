import PageHeader from '@/app/shared/page-header';

const pageHeader = {
  title: 'صفحه خالی',
  breadcrumb: [
    {
      href: '/',
      name: 'خانه',
    },
    {
      name: 'خالی',
    },
  ],
};

export default function BlankPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
    </>
  );
}
