import { HeaderCell } from '@/components/ui/table';
import { Text } from '@/components/ui/text';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { shippingStatuses, StatusType } from '@/data/shipment-data';
import DateCell from '@/components/ui/date-cell';
import AvatarCard from '@/components/ui/avatar-card';

type Columns = {
  sortConfig?: any;
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
};

export const statusColors = (status: StatusType) => {
  if (shippingStatuses.Approved === status) {
    return 'primary';
  }
  if (shippingStatuses.InTransit === status) {
    return 'secondary';
  }
  if (shippingStatuses.OutForDelivery === status) {
    return 'info';
  }
  if (shippingStatuses.Delivered === status) {
    return 'success';
  }
  if (shippingStatuses.DeliveryFailed === status) {
    return 'danger';
  }
};

export const getColumns = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
  onChecked,
}: Columns) => [
  {
    title: <></>,
    dataIndex: 'checked',
    key: 'checked',
    width: 28,
    render: () => (
      <div className="inline-flex w-7 justify-end lg:w-9">
        <Checkbox variant="flat" className="cursor-pointer" />
      </div>
    ),
  },
  {
    title: (
      <HeaderCell
        title="شناسه تراکنش"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'trackingId'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('trackingId'),
    dataIndex: 'trackingId',
    key: 'trackingId',
    width: 180,
    render: (trackingId: string) => <span>{trackingId}</span>,
  },
  {
    title: (
      <HeaderCell
        title="تاریخ"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'date'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('date'),
    dataIndex: 'date',
    key: 'date',
    width: 250,
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    title: (
      <HeaderCell
        title="ارسال کننده"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'sender'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('sender'),
    dataIndex: 'sender',
    key: 'sender',
    width: 400,
    render: ({ name, avatar }: { name: string; avatar: string }) => (
      <AvatarCard src={avatar} name={name} />
    ),
  },
  {
    title: (
      <HeaderCell
        title="دریافت کننده"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'receiver'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('receiver'),
    dataIndex: 'receiver',
    key: 'receiver',
    width: 400,
    render: ({ name, avatar }: { name: string; avatar: string }) => (
      <AvatarCard src={avatar} name={name} />
    ),
  },
  {
    title: (
      <HeaderCell
        title="منطقه"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'origin'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('origin'),
    dataIndex: 'origin',
    key: 'origin',
    width: 250,
    render: (origin: string) => origin,
  },
  {
    title: (
      <HeaderCell
        title="مقصد"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'destination'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('destination'),
    dataIndex: 'destination',
    key: 'destination',
    width: 250,
    render: (destination: string) => destination,
  },
  {
    title: (
      <HeaderCell
        title="روش پرداخت"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'paymentMethod'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('paymentMethod'),
    dataIndex: 'paymentMethod',
    key: 'paymentMethod',
    width: 350,
    render: (paymentMethod: string) => paymentMethod,
  },
  {
    title: (
      <HeaderCell
        title="وضعیت"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'status'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('status'),
    dataIndex: 'status',
    key: 'status',
    width: 300,
    render: (status: StatusType) => {
      const statusDict: any = {
        Delivered: 'ارسال شده',
        Approved: 'قیول شده',
        DeliveryFailed: 'ارسال نا موفق',
        InTransit: 'در حال ارسال',
        OutForDelivery: 'بسته بندی برای ارسال',
      };
      return (
        <div className="flex items-center gap-1.5">
          <Badge renderAsDot color={statusColors(status)} />
          {statusDict[status.split(' ').join('')]}
        </div>
        // <Button
        //   size="sm"
        //   tag="span"
        //   variant="outline"
        //   className="w-full font-medium"
        //   color={statusColors(status)}
        // >
        //   {status}
        // </Button>
      );
    },
  },
];
