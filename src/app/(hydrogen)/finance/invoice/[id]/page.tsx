'use client';

import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';
import InvoiceDetails from '@/app/shared/invoice/invoice-details';
import PageHeader from '@/app/shared/page-header';
import { PiDownloadSimpleBold, PiPrinterBold } from 'react-icons/pi';
import { useRef } from 'react';

const pageHeader = {
  title: 'جزییات فاکتور',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'خانه',
    },
    {
      href: routes.invoice.home,
      name: 'فاکتور',
    },
    {
      name: 'جزیییات',
    },
  ],
};

export default function InvoiceDetailsPage({ params }: any) {
  const invoiceRef = useRef<HTMLDivElement>();

  function handlePrint() {
    console.log('write print logic');
  }
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        className="print:hidden"
      >
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Button
            onClick={() => {
              window.print();
            }}
            variant="outline"
            className="w-full @lg:w-auto"
          >
            <PiPrinterBold className="me-1.5 h-[17px] w-[17px]" />
            پرینت
          </Button>
          <Button className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100">
            <PiDownloadSimpleBold className="me-1.5 h-[17px] w-[17px]" />
            دانلود
          </Button>
        </div>
      </PageHeader>

      <InvoiceDetails ref={invoiceRef} />
    </>
  );
}
