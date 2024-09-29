'use client';

import { routes } from '@/config/routes';
import { orderData } from '@/data/order-data';
import { getColumns } from '@/app/shared/ecommerce/order/order-list/columns';
import BasicTableWidget from '@/components/controlled-table/basic-table-widget';
import { exportToCSV } from '@/utils/export-to-csv';
import { useState } from 'react';
import TableLayout from '../table-layout';

const pageHeader = {
  title: 'جدول جستجو',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'خانه',
    },
    {
      name: 'جدول ها',
    },
    {
      name: 'جستجو',
    },
  ],
};

export default function SearchTablePage() {
  const [pageSize, setPageSize] = useState(10);
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
      <BasicTableWidget
        title="جدول جستجو"
        variant="minimal"
        data={orderData}
        // @ts-ignore
        getColumns={getColumns}
        enablePagination
        pageSize={pageSize}
        setPageSize={setPageSize}
        searchPlaceholder="جستجوی محصول..."
        className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
      />
    </TableLayout>
  );
}
