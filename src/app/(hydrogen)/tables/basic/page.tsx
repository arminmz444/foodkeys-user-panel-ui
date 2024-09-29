'use client';

import { routes } from '@/config/routes';
import { orderData } from '@/data/order-data';
import { invoiceData } from '@/data/invoice-data';
import { productsData } from '@/data/products-data';
import { getColumns } from '@/app/shared/invoice/invoice-list/columns';
import { getColumns as getOrderColumns } from '@/app/shared/ecommerce/order/order-list/columns';
import { getColumns as getProductColumns } from '@/app/shared/ecommerce/product/product-list/columns';
import BasicTableWidget from '@/components/controlled-table/basic-table-widget';
import { exportToCSV } from '@/utils/export-to-csv';
import TableLayout from '../table-layout';

const pageHeader = {
  title: 'جدول ساده',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'خانه',
    },
    {
      name: 'جدول ها',
    },
    {
      name: 'ساده',
    },
  ],
};

export default function BasicTablePage() {
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
      <div className="grid grid-cols-1 gap-6 3xl:gap-8">
        <BasicTableWidget
          variant="classic"
          title="جدول کلاسیک"
          data={orderData}
          // @ts-ignore
          getColumns={getOrderColumns}
          enableSearch={false}
        />

        <BasicTableWidget
          title="جدول مدرن"
          variant="modern"
          data={productsData}
          // @ts-ignore
          getColumns={getProductColumns}
          enableSearch={false}
          className="[&_.rc-table-content_table_tbody_tr:last-child_td]:border-0"
        />

        <BasicTableWidget
          title="جدول مینیمال"
          variant="minimal"
          data={invoiceData}
          // @ts-ignore
          getColumns={getColumns}
          enableSearch={false}
        />

        <BasicTableWidget
          title="جدول شیک"
          variant="elegant"
          data={productsData}
          // @ts-ignore
          getColumns={getProductColumns}
          enableSearch={false}
          className="[&_.rc-table-content_table_tbody_tr:last-child_td]:border-0"
        />

        <BasicTableWidget
          variant="retro"
          title="جدول رترو"
          data={orderData}
          // @ts-ignore
          getColumns={getOrderColumns}
          enableSearch={false}
          className="[&_.rc-table-content_table_tbody_tr:last-child_td]:border-0"
        />
      </div>
    </TableLayout>
  );
}
