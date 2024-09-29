import { Metadata } from 'next';

import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import CustomerProfile from '@/app/shared/logistics/customer-profile';
import EditProfileButton from '@/app/shared/logistics/customer-profile/edit-profile';

const pageHeader = {
  title: 'پروفایل مشتری',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'داشبورد',
    },
    {
      href: routes.logistics.dashboard,
      name: 'مالی',
    },
    {
      name: 'پروفایل مشتری',
    },
  ],
};

export const metadata: Metadata = {
  title: 'Customer Profile | Isomorphic Furyroad',
};

export default function CustomerProfilePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <EditProfileButton className="mt-5 md:mt-0" />
      </PageHeader>

      <CustomerProfile />
    </>
  );
}
