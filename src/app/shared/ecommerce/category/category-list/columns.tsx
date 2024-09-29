'use client';

import Link from 'next/link';
import Image from 'next/image';
import { routes } from '@/config/routes';
import { Text } from '@/components/ui/text';
import { HeaderCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip } from '@/components/ui/tooltip';
import { ActionIcon } from '@/components/ui/action-icon';
import PencilIcon from '@/components/icons/pencil';
import DeletePopover from '@/app/shared/delete-popover';

type Columns = {
  sortConfig?: any;
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
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
    width: 30,
    render: (_: any, row: any) => (
      <div className="inline-flex ps-2">
        <Checkbox
          value={row.id}
          className="cursor-pointer"
          {...(onChecked && { onChange: (e) => onChecked(e, e.target.value) })}
        />
      </div>
    ),
  },
  {
    title: <HeaderCell title="عکس" />,
    dataIndex: 'image',
    key: 'image',
    width: 100,
    render: (image: any, row: any) => (
      <figure className="relative aspect-square w-12 overflow-hidden rounded-lg bg-gray-100">
        <Image
          alt={row.name}
          src={image}
          fill
          sizes="(max-width: 768px) 100vw"
          className="object-cover"
        />
      </figure>
    ),
  },
  {
    title: (
      <HeaderCell
        title="نام دسته بندی"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'name'
        }
      />
    ),
    dataIndex: 'name',
    key: 'name',
    width: 200,
    onHeaderCell: () => onHeaderCellClick('name'),
    render: (name: string) => (
      <Text tag="h6" className="!text-sm font-medium">
        {name}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="عنوان" />,
    dataIndex: 'description',
    key: 'description',
    width: 250,
    render: (description: string) => (
      <Text className="truncate !text-sm ">{description}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="عنوان منحصر به فرد (slug)"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'slug'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('slug'),
    dataIndex: 'slug',
    key: 'slug',
    width: 200,
    render: (slug: string) => <Text>{slug}</Text>,
  },
  {
    title: (
      <HeaderCell
        title="محصولات"
        align="center"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'products'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('products'),
    dataIndex: 'products',
    key: 'products',
    width: 120,
    render: (products: any) => <div className="text-center">{products}</div>,
  },
  {
    title: <></>,
    dataIndex: 'action',
    key: 'action',
    width: 100,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={() => 'ویرایش دسته بندی'}
          placement="top"
          color="invert"
        >
          <Link href={routes.eCommerce.editCategory(row.id)}>
            <ActionIcon size="sm" variant="outline">
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeletePopover
          title={`حذف دسته بندی`}
          description={`آیا مطمعنید که میخواهید این دسته بندی را حذف کنید?`}
          onDelete={() => onDeleteItem(row.id)}
        />
      </div>
    ),
  },
];
