'use client';

import { routes } from '@/config/routes';
import { invoiceData } from '@/data/invoice-data';
import { exportToCSV } from '@/utils/export-to-csv';
import InvoiceTable from '@/app/shared/invoice/invoice-list/table';
import TableLayout from '../table-layout';

const pageHeader = {
  title: 'جدول بهبود یافته',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'خانه',
    },
    {
      name: 'جدول ها',
    },
    {
      name: 'بهبود یافته',
    },
  ],
};

export default function EnhancedTablePage() {
  function handleExportData() {
    exportToCSV(
      invoiceData,
      'ID,Name,Username,Avatar,Email,تاریخ آخرین تراکنش,Amount,Status,Created At',
      'invoice_data'
    );
  }
  return (
    <TableLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      onExport={() => handleExportData()}
    >
      <InvoiceTable data={invoiceData} />
    </TableLayout>
  );
}
