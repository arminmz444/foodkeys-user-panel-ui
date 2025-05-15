'use client';

import Link from 'next/link';
import { routes } from '@/config/routes';
import { Button } from '@/components/ui/button';
import PageHeader from '@/app/shared/page-header';
import InvoiceTable from '@/app/shared/invoice/invoice-list/table';
import { PiPlusBold } from 'react-icons/pi';
import { invoiceData } from '@/data/invoice-data';
import { exportToCSV } from '@/utils/export-to-csv';
import ExportButton from '@/app/shared/export-button';
import { QueryClient, QueryClientProvider } from 'react-query';
import TransactionsTable from '@/app/shared/finance/transaction/transaction-list/table';
const queryClient = new QueryClient();

const pageHeader = {
  title: 'لیست تراکنشات',
  breadcrumb: [
    {
      href: routes.finance.dashboard,
      name: 'مدیریت مالی',
    },
    {
      href: routes.finance.transactionList,
      name: 'تراکنش',
    },
    {
      name: 'لیست',
    },
  ],
};

export default function InvoiceListPage() {
  function handleExportData() {
    exportToCSV(
      invoiceData,
      'ID,Name,Username,Avatar,Email,تاریخ آخرین تراکنش,Amount,Status,Created At',
      'invoice_data'
    );
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
          <div className="mt-4 flex items-center gap-3 @lg:mt-0">
            <ExportButton onClick={() => handleExportData()} />
            <Link href={routes.invoice.create} className="w-full @lg:w-auto">
              <Button
                tag="span"
                className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
              >
                <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
                ایجاد فاکتور
              </Button>
            </Link>
          </div>
        </PageHeader>
        {/*// @ts-ignore*/}
        <TransactionsTable data={invoiceData} />
      </QueryClientProvider>
    </>
  );
}
