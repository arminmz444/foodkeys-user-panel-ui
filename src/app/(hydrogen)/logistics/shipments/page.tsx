import { Metadata } from 'next';
import ShipmentStats from '@/app/shared/logistics/shipment/shipment-stats';
import ShipmentListTable from '@/app/shared/logistics/shipment/list/table';
import ShipmentPageHeader from '@/app/(hydrogen)/logistics/shipments/page-header';

export const metadata: Metadata = {
  title: 'لیست ارسالی ها | Isomorphic Furyroad',
};

export default function LogisticsListPage() {
  return (
    <>
      <ShipmentPageHeader />
      <div className="flex flex-col gap-10">
        <ShipmentStats />
        <ShipmentListTable />
      </div>
    </>
  );
}
