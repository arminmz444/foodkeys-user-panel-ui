'use client';

import Link from 'next/link';
import { routes } from '@/config/routes';
import { Button } from '@/components/ui/button';
import { exportToCSV } from '@/utils/export-to-csv';
import { shipmentData } from '@/data/shipment-data';
import PageHeader from '@/app/shared/page-header';
import ExportButton from '@/app/shared/export-button';
import { PiPlusBold } from 'react-icons/pi';

const pageHeader = {
  title: 'همه ارسال ها',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'داشبورد',
    },
    {
      name: 'لیست ارسالی ها',
    },
  ],
};

interface HeaderProps {
  className?: string;
}

export default function ShipmentPageHeader({ className }: HeaderProps) {
  function handleExportData() {
    exportToCSV(
      shipmentData,
      'ID,Tracking ID,Date,Sender,Receiver,Origin,Destination,Payment Method,Status',
      'shipment_data'
    );
  }

  return (
    <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
      <div className="mt-4 flex items-center gap-3 @lg:mt-0">
        <ExportButton onClick={() => handleExportData()} />
        <Link
          href={routes.logistics.createShipment}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button
            tag="span"
            className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
          >
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            ایجاد ارسالی
          </Button>
        </Link>
      </div>
    </PageHeader>
  );
}
