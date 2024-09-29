'use client';

import { Button } from '@/components/ui/button';
import { HeaderCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip } from '@/components/ui/tooltip';
import { ActionIcon } from '@/components/ui/action-icon';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import { Badge } from '@/components/ui/badge';
import { PriorityType, StatusType } from '@/data/tickets-data';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';

type Columns = {
  sortConfig?: any;
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
};

const colors = {
  Low: 'success',
  Medium: 'warning',
  High: 'danger',
};

const statusColors = {
  'In Progress': 'info',
  Completed: 'success',
  Open: 'secondary',
  Closed: 'danger',
};

export const getColumns = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
}: Columns) => [
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="شناسه" className="opacity-0" />,
    dataIndex: 'checked',
    key: 'checked',
    width: 28,
    render: () => (
      <div className="inline-flex w-7 justify-end lg:w-9">
        <Checkbox variant="flat" aria-label="Id" className="cursor-pointer" />
      </div>
    ),
  },
  {
    title: (
      <HeaderCell
        title="مساله"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'issue'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('issue'),
    dataIndex: 'issue',
    key: 'issue',
    width: 500,
    render: (issue: string) => <p className="line-clamp-1">{issue}</p>,
  },
  {
    title: (
      <HeaderCell
        title="مشتری"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'author'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('author'),
    dataIndex: 'author',
    key: 'author',
    width: 400,
    render: ({ name, avatar }: { name: string; avatar: string }) => (
      <AvatarCard src={avatar} name={name} />
    ),
  },
  {
    title: (
      <HeaderCell
        title="متصل شده به "
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'assignedTo'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('agent'),
    dataIndex: 'agent',
    key: 'agent',
    width: 400,
    render: ({ name, avatar }: { name: string; avatar: string }) => (
      <AvatarCard src={avatar} name={name} />
    ),
  },
  {
    title: (
      <HeaderCell
        title="تاریخ ایجاد"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'createdAt'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('createdAt'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 250,
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    title: (
      <HeaderCell
        title="تاریخ انجام"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'dueDate'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('dueDate'),
    dataIndex: 'dueDate',
    key: 'dueDate',
    width: 250,
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    title: (
      <HeaderCell
        title="اولویت"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'priority'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('priority'),
    dataIndex: 'priority',
    key: 'priority',
    width: 200,
    render: (priority: PriorityType) => {
      const prorityDict: any = {
        medium: 'معمولی',
        low: 'کم',
        high: 'زیاد',
      };
      return (
        <div className="flex items-center gap-2">
          <Badge renderAsDot color={colors[priority] as any} />
          <span>{prorityDict[priority.toLocaleLowerCase()]}</span>
        </div>
      );
    },
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
    width: 200,
    render: (status: StatusType) => {
      const statusDict = {
        'In Progress': 'در حال انجام',
        Completed: 'انجام شده',
        Open: 'باز',
        Closed: 'بسته',
      };
      return (
        <Button
          size="sm"
          tag="span"
          variant="outline"
          className="w-[90px] font-medium"
          color={statusColors[status] as any}
        >
          {statusDict[status]}
        </Button>
      );
    },
  },
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="عملیات" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 120,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip size="sm" content={() => 'ویرایش تیکت'} placement="top">
          <ActionIcon size="sm" variant="outline" aria-label={'ویرایش تیکت'}>
            <PencilIcon className="h-4 w-4" />
          </ActionIcon>
        </Tooltip>
        <Tooltip size="sm" content={() => 'نمایش تیکت'} placement="top">
          <ActionIcon size="sm" variant="outline" aria-label={'نمایش تیکت'}>
            <EyeIcon className="h-4 w-4" />
          </ActionIcon>
        </Tooltip>
        <DeletePopover
          title={`حذف تیکت`}
          description={`آیا مطمعنید که میخواهید این تیکت را پاک کنید؟`}
          onDelete={() => onDeleteItem(row.id)}
        />
      </div>
    ),
  },
];
