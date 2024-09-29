'use client';

import { routes } from '@/config/routes';
import { orderData } from '@/data/order-data';
import { exportToCSV } from '@/utils/export-to-csv';
import OrderTable from '@/app/shared/ecommerce/order/order-list/table';
import TableLayout from '../table-layout';

const pageHeader = {
  title: 'جدول قابل جمع شدن',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'خانه',
    },
    {
      name: 'جدول ها',
    },
    {
      name: 'قابل جمع شدن',
    },
  ],
};

export default function CollapsibleTablePage() {
  function handleExportData() {
    exportToCSV(
      orderData,
      'Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At',
      'order_data'
    );
  }

  return (
    <TableLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      onExport={() => handleExportData()}
    >
      <OrderTable
        data={orderData}
        variant="elegant"
        className="[&_.table-filter]:hidden [&_.table-pagination]:hidden"
      />
    </TableLayout>
  );
}
