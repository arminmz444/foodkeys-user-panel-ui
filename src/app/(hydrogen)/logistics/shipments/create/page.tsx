import { Metadata } from 'next';

import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import CreateShipment from '@/app/shared/logistics/shipment/create';
import { Button } from '@/components/ui/button';
import { PiUploadSimple } from 'react-icons/pi';
import ImportButton from '@/app/shared/import-button';

const pageHeader = {
  title: 'ساخت ارسالی',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'داشبورد',
    },
    {
      href: routes.logistics.shipmentList,
      name: 'ارسالی',
    },
    {
      name: 'ساخت ارسالی',
    },
  ],
};

export const metadata: Metadata = {
  title: 'Create Shipment | Isomorphic Furyroad',
};

export default function LogisticsListPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ImportButton title={'وتارد کردن فایل'} />
      </PageHeader>

      <CreateShipment />
    </>
  );
}
