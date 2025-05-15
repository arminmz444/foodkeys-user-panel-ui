import { HeaderCell } from '@/components/ui/table';
import { Text } from '@/components/ui/text';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tooltip } from '@/components/ui/tooltip';
import DeletePopover from '@/app/shared/delete-popover';
import noImageTemplate from '/public/noImageTemplate.png';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { ActionIcon } from '@/components/ui/action-icon';
import PencilIcon from '@/components/icons/pencil';
import EyeIcon from '@/components/icons/eye';
import type { Invoice } from '@/data/invoice-data';
import AvatarCard from '@/components/ui/avatar-card';

const STATIC_FILE_URL = 'http://192.168.43.57:8080'; //process.env.STATIC_FILES_URL;
const companyStatusDict: any = {
  VERIFIED: 'تایید شده',
  PENDING: 'در انتظار',
  DENIED: 'رد شده',
  DELETED: 'حذف شده',
  ARCHIVED: 'آرشیو شده',
};

function getStatusBadge(status: string) {
  return (
    <div className="flex items-center">
      <Badge
        color={
          status === 'VERIFIED'
            ? 'success'
            : status === 'PENDING'
            ? 'warning'
            : 'danger'
        }
        renderAsDot
      />
      <Text className="ms-2 font-medium">{companyStatusDict[status]}</Text>
    </div>
  );
}

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
}: any) => [
  {
    title: (
      <div className="ps-3.5">
        <Checkbox
          title="انتخاب همه"
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
      <div className="inline-flex ps-3.5">
        <Checkbox
          className="cursor-pointer"
          checked={checkedItems.includes(row.id)}
          onChange={() => onChecked && onChecked(row.id)}
        />
      </div>
    ),
  },
  {
    title: <HeaderCell title="نام شرکت" />,
    dataIndex: 'companyName',
    key: 'companyName',
    width: 240,
    hidden: 'companyName',

    render: (_: string, row: any) => (
      <AvatarCard
        src={(row.logo && STATIC_FILE_URL + row.logo) || noImageTemplate}
        name={row.companyName}
        description={`COMPANY-LOGO-${row.id}`}
      />
    ),
  },
  {
    title: <HeaderCell title="نام شرکت" />,
    dataIndex: 'companyName',
    key: 'companyName',
    width: 300,
    render: (companyName: string) => <Text>{companyName}</Text>,
  },
  {
    title: <HeaderCell title="مدیر عامل" />,
    dataIndex: 'ceo',
    key: 'ceo',
    width: 200,
    render: (ceo: string) => <Text>{ceo}</Text>,
  },
  {
    title: <HeaderCell title="بازدیدها" />,
    dataIndex: 'visit',
    key: 'visit',
    width: 100,
    render: (visit: number) => <Text>{visit}</Text>,
  },
  {
    title: <HeaderCell title="وضعیت" />,
    dataIndex: 'companyStatus',
    key: 'companyStatus',
    width: 120,
    render: (status: string) => getStatusBadge(status),
  },
  {
    title: <HeaderCell title="عملیات" />,
    dataIndex: 'action',
    key: 'action',
    width: 150,
    render: (_: any, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <Tooltip
          size="sm"
          content={() => 'ویرایش اطلاعات'}
          placement="top"
          color="invert"
        >
          <Link href={routes.info.foodIndustryEdit(row.id)}>
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
          content={() => 'مشاهده اطلاعات'}
          placement="top"
          color="invert"
        >
          <Link href={routes.info.foodIndustryView(row.id)}>
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
          title={`جذف شرکت`}
          description={`آیا می‌خواهید درخواست حذف این شرکت را بدهید؟`}
          onDelete={() => onDeleteItem(row.id)}
        />
      </div>
    ),
  },
];
