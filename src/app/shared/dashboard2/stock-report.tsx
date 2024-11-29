import { productsData } from '@/data/products-data';
import { getColumns } from '@/app/shared/ecommerce/product/product-list/columns';
import BasicTableWidget from '@/components/controlled-table/basic-table-widget';

export default function StockReport({ className }: { className?: string }) {
  return (
    <BasicTableWidget
      title={'گزارش محصولات'}
      data={productsData}
      // @ts-ignore
      getColumns={getColumns}
      pageSize={6}
      enablePagination
      noGutter
      paginatorClassName="pe-0 lg:pe-2 font-iransans"
      searchPlaceholder="جستجو در محصولات..."
      variant="modern"
      className={className}
    />
  );
}
