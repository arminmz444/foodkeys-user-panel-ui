'use client';

import Link from 'next/link';
import { routes } from '@/config/routes';
import { Text } from '@/components/ui/text';
import { Badge } from '@/components/ui/badge';
import { Tooltip } from '@/components/ui/tooltip';
import { HeaderCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { ActionIcon } from '@/components/ui/action-icon';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import DeletePopover from '@/app/shared/delete-popover';
import { PiWallet } from 'react-icons/pi';
import {MdOutlinePayments, MdPayment, MdPayments} from "react-icons/md"; // Icon for payment

function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case 'pending':
      return (
          <div className="flex items-center">
            <Badge color="warning" renderAsDot />
            <Text className="ms-2 font-medium text-orange-dark">پردازش</Text>
          </div>
      );
    case 'completed':
      return (
          <div className="flex items-center">
            <Badge color="success" renderAsDot />
            <Text className="ms-2 font-medium text-green-dark">پرداخت شده</Text>
          </div>
      );
    case 'failed':
      return (
          <div className="flex items-center">
            <Badge color="danger" renderAsDot />
            <Text className="ms-2 font-medium text-red-dark">ناموفق</Text>
          </div>
      );
    default:
      return (
          <div className="flex items-center">
            <Badge renderAsDot className="bg-gray-400" />
            <Text className="ms-2 font-medium text-gray-600">پیش نویس</Text>
          </div>
      );
  }
}

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
                             data,
                             sortConfig,
                             checkedItems,
                             onDeleteItem,
                             onHeaderCellClick,
                             handleSelectAll,
                             onChecked,
                           }: Columns) => [
  {
    title: (
        <div className="ps-2">
          <Checkbox
              title={'انتخاب همه'}
              onChange={handleSelectAll}
              checked={checkedItems.length === data.length}
              className="cursor-pointer"
          />
        </div>
    ),
    dataIndex: 'checked',
    key: 'checked',
    width: 30,
    render: (_: any, row: any) => (
        <div className="inline-flex ps-2">
          <Checkbox
              className="cursor-pointer"
              checked={checkedItems.includes(row.id)}
              {...(onChecked && { onChange: () => onChecked(row.id) })}
          />
        </div>
    ),
  },
  {
    title: <HeaderCell title="" />,
    dataIndex: 'icon',
    key: 'icon',
    width: 50,
    render: () => (
        <div className="flex items-center justify-center">
          <PiWallet className="h-6 w-6 text-blue-500" />
        </div>
    ),
  },
  {
    title: <HeaderCell title="توضیحات" />,
    dataIndex: 'description',
    key: 'description',
    width: 250,
    render: (description: string) => description,
  },
  {
    title: <HeaderCell title="شناسه تراکنش" />,
    dataIndex: 'transactionId',
    key: 'transactionId',
    width: 250,
    render: (transactionId: string) => transactionId,
  },
  {
    title: (
        <HeaderCell
            title="تاریخ ایجاد"
            sortable
        />
    ),
    onHeaderCell: () => onHeaderCellClick('createdAtStr'),
    dataIndex: 'createdAtStr',
    key: 'createdAtStr',
    width: 200,
    render: (value: string) => value,
  },
  {
    title: (
        <HeaderCell
            title="تاریخ آخرین تغییر"
            sortable
        />
    ),
    onHeaderCell: () => onHeaderCellClick('updatedAtStr'),
    dataIndex: 'updatedAtStr',
    key: 'updatedAtStr',
    width: 200,
    render: (value: string) => value,
  },
  {
    title: (
        <HeaderCell
            title="هزینه"
            sortable
            ascending={
                sortConfig?.direction === 'asc' && sortConfig?.key === 'amount'
            }
        />
    ),
    onHeaderCell: () => onHeaderCellClick('amount'),
    dataIndex: 'amount',
    key: 'amount',
    width: 200,
    render: (value: number) => (
        <Text className="font-medium text-gray-700 dark:text-gray-600">
          {value} تومان
        </Text>
    ),
  },
  {
    title: <HeaderCell title="وضعیت" />,
    dataIndex: 'status',
    key: 'status',
    width: 120,
    render: (value: string) => getStatusBadge(value),
  },
  {
    title: <></>,
    dataIndex: 'action',
    key: 'action',
    width: 140,
    render: (_: string, row: any) => (
        <div className="flex items-center justify-end gap-3 pe-3">
          <Tooltip
              size="sm"
              content={() => 'ویرایش فاکتور'}
              placement="top"
              color="invert"
          >
            <Link href={routes.invoice.edit(row.id)}>
              <ActionIcon
                  tag="span"
                  size="sm"
                  variant="outline"
                  className="hover:!border-gray-900 hover:text-gray-700"
              >
                <PencilIcon className="h-4 w-4" />
              </ActionIcon>
            </Link>
          </Tooltip>
          <Tooltip
              size="sm"
              content={() => 'مشاهده فاکتور'}
              placement="top"
              color="invert"
          >
            <Link href={routes.invoice.details(row.id)}>
              <ActionIcon
                  tag="span"
                  size="sm"
                  variant="outline"
                  className="hover:!border-gray-900 hover:text-gray-700"
              >
                <EyeIcon className="h-4 w-4" />
              </ActionIcon>
            </Link>
          </Tooltip>
          <DeletePopover
              title={`حذف فاکتور`}
              description={`آیا مطمئنید که می‌خواهید این فاکتور را پاک کنید؟`}
              onDelete={() => onDeleteItem(row.id)}
          />
        </div>
    ),
  },
];
