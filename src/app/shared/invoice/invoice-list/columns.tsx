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
import AvatarCard from '@/components/ui/avatar-card';
import { Button, Popover } from 'rizzui';
import HandWaveIcon from '@/components/icons/hand-wave';
import { PiHand } from 'react-icons/pi';
import { TbExclamationMark } from 'react-icons/tb';
import { BsLine } from 'react-icons/bs';
import { RxBorderSolid } from 'react-icons/rx';
import { FaRegClock } from 'react-icons/fa';
import { HiOutlineDownload } from 'react-icons/hi';
import Image from 'next/image';
import bankLogo from '@public/mellat.png';
const STATIC_FILE_URL = 'http://192.168.43.57:8080';
const companyStatusDict: any = {
  VERIFIED: 'تایید شده',
  PENDING: 'در انتظار تایید',
  DENIED: 'رد شده',
  DELETED: 'حذف شده',
  ARCHIVED: 'آرشیو شده',
};

function getStatusBadge(status: string, statusColor: String) {
  return (
    <div
      className={`flex max-w-max animate-pulse items-center rounded-lg   ${
        status === 'ناموفق'
          ? 'bg-[#f9c7c7]'
          : status === 'موفق'
          ? 'bg-[#c7f9cc]'
          : 'bg-[#ffbd00]'
      } px-3 py-1 text-xs `}
    >
      {/*// @ts-ignore*/}
      <Badge
        color={
          status === 'ناموفق'
            ? 'danger'
            : status === 'موفق'
            ? 'success'
            : 'warning'
        }
        renderAsDot
      />
      {/* <Badge color={statusColor || 'warning'} renderAsDot /> */}
      <Text className="ms-2 font-bold  text-black ">{status}</Text>
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
  // {
  //     title: <HeaderCell title="نام شرکت" />,
  //     dataIndex: 'companyName',
  //     key: 'companyName',
  //     width: 300,
  //     render: (companyName: string) => <Text>{companyName}</Text>,
  // },

  {
    title: <HeaderCell title="تاریخ" />,
    dataIndex: 'createdAtStr',
    key: 'createdAtStr',
    width: 50,
    render: (createdAtStr: string) => (
      <Text className="flex flex-col text-black ">
        {createdAtStr}
        <span className="flex items-center gap-1 text-sm text-gray-500">
          <FaRegClock className="text-gray-500" />
          18:20
        </span>
      </Text>
    ),
  },
  {
    title: <HeaderCell title="شماره فاکتور" />,
    dataIndex: 'invoiceId',
    key: 'invoiceId',
    width: 50,
    render: (invoiceId: number) => (
      <Text>
        {/* {gateway || <RxBorderSolid />} */}
        1526849658
      </Text>
    ),
  },
  // {
  //   title: <HeaderCell title="شناسه پرداخت" />,
  //   dataIndex: 'id',
  //   key: 'id',
  //   width: 250,
  //   hidden: 'id',

  //   render: (_: string, row: any) => (
  //     <div>
  //       <Text className="font-iransans text-sm font-medium text-gray-900 dark:text-gray-700">
  //         {row.id}
  //       </Text>
  //       {/* {row.createdAtStr ? (
  //         <Text className="text-[13px] text-gray-500">{row.createdAtStr}</Text>
  //       ) : (
  //         <></>
  //       )} */}
  //     </div>
  //   ),
  // },
  {
    title: <HeaderCell title="مبلغ" />,
    dataIndex: 'amount',
    key: 'amount',
    width: 80,
    render: (amount: number) => <Text>{amount.toLocaleString()} تومان</Text>,
  },

  {
    title: <HeaderCell title="درگاه" />,
    dataIndex: 'gateway',
    key: 'gateway',
    width: 50,
    render: (gateway: string) => (
      <Text className="flex items-center gap-1">
        <Image src={bankLogo} alt="bankMelat" width={20} height={20} />
        {/* {gateway || <RxBorderSolid />} */}
        بانک ملت
      </Text>
    ),
  },

  {
    title: <HeaderCell title="وضعیت" />,
    dataIndex: 'paymentStatus',
    key: 'paymentStatus',
    width: 80,
    render: (_: string, row: any) => {
      return getStatusBadge(row.paymentStatus, row.paymentStatusColor);
    },
  },
  {
    title: <HeaderCell title="کد رهگیری" />,
    dataIndex: 'refId',
    key: 'refId',
    width: 70,
    render: (refId: number) => <Text>{refId || <RxBorderSolid />}</Text>,
  },
  {
    title: <HeaderCell title="فاکتور" />,
    dataIndex: 'invoiceId',
    key: 'invoiceId',
    width: 70,
    render: (invoiceId: number) => (
      <Button variant="outline" size="sm" className="flex items-center gap-1">
        <HiOutlineDownload size={16} />
        دریافت فاکتور
      </Button>
    ),
  },
  // {
  //   title: <></>,
  //   dataIndex: 'action',
  //   key: 'action',
  //   width: 140,
  //   render: (_: string, row: any) => (
  //     <div className="flex items-center justify-end gap-3 pe-3">
  //       <Tooltip
  //         size="sm"
  //         content={() => 'ویرایش فاکتور'}
  //         placement="top"
  //         color="invert"
  //       >
  //         <Link href={routes.invoice.edit(row.id)}>
  //           <ActionIcon
  //             tag="span"
  //             size="sm"
  //             variant="outline"
  //             className="hover:!border-gray-900 hover:text-gray-700"
  //           >
  //             <PencilIcon className="h-4 w-4" />
  //           </ActionIcon>
  //         </Link>
  //       </Tooltip>
  //       <Tooltip
  //         size="sm"
  //         content={() => 'مشاهده فاکتور'}
  //         placement="top"
  //         color="invert"
  //       >
  //         <Link href={routes.invoice.details(row.id)}>
  //           <ActionIcon
  //             tag="span"
  //             size="sm"
  //             variant="outline"
  //             className="bg-red text-white hover:!border-gray-900 hover:text-gray-700"
  //           >
  //             <EyeIcon className="h-4 w-4" />
  //           </ActionIcon>
  //         </Link>
  //       </Tooltip>
  //       {/* <DeletePopover
  //         title={`حذف فاکتور`}
  //         description={`آیا مطمئنید که می‌خواهید این فاکتور را پاک کنید؟`}
  //         onDelete={() => onDeleteItem(row.id)}
  //       /> */}
  //     </div>
  //   ),
  // },
  // {
  //     title: <></>,
  //     dataIndex: 'action',
  //     key: 'action',
  //     width: 100,
  //     render: (_: any, row: any) => (
  //         <div className="flex items-center justify-end gap-3 pe-3">
  //             <Tooltip
  //                 size="sm"
  //                 content={() => 'درخواست تجدید رتبه'}
  //                 placement="top"
  //                 color="invert"
  //             >
  //                 {/*// @ts-ignore*/}
  //                 <Button isLoading={revisionRequestLoading} onClick={() => handleRequestRevision(row.id)}
  //                         color="secondary" size="sm"><PiHand className="h-4 w-4"/></Button>
  //                 {/*<RankRevisionPopover*/}
  //                 {/*    title={`درخواست تجدید رتبه`}*/}
  //                 {/*    description={`آیا می‌خواهید درخواست تجدید رتبه این شرکت را بدهید؟`}*/}
  //                 {/*    onDelete={() => onDeleteItem(row.id)}*/}
  //                 {/*/>*/}
  //             </Tooltip>
  //             <Tooltip
  //                 size="sm"
  //                 content={() => 'ویرایش اطلاعات'}
  //                 placement="top"
  //                 color="invert"
  //             >
  //                 <Link href={routes.info.foodIndustryEdit(row.id)}>
  //                     <ActionIcon
  //                         tag="span"
  //                         size="sm"
  //                         variant="outline"
  //                         className="hover:!border-gray-900 hover:text-gray-700 bg-orange text-white"
  //                     >
  //                         <PencilIcon className="h-4 w-4"/>
  //                     </ActionIcon>
  //                 </Link>
  //             </Tooltip>
  //             <Tooltip
  //                 size="sm"
  //                 content={() => 'مشاهده صفحه اختصاصی'}
  //                 placement="top"
  //                 color="invert"
  //             >
  //                 <a href={"http://localhost:3000/view/producers/details?id=" + row.id}>
  //                     <ActionIcon
  //                         tag="span"
  //                         size="sm"
  //                         variant="outline"
  //                         className="hover:!border-gray-900 hover:text-gray-700 bg-blue text-white"
  //                     >
  //                         <EyeIcon className="h-4 w-4"/>
  //                     </ActionIcon>
  //                 </a>
  //             </Tooltip>
  //             <DeletePopover
  //                 title={`جذف شرکت`}
  //                 description={`آیا می‌خواهید درخواست حذف این شرکت را بدهید؟`}
  //                 onDelete={() => onDeleteItem(row.id)}
  //             />
  //         </div>
  //     ),
  // },
];
type RankRevisionPopoverProps = {
  title: string;
  description: string;
  onDelete: () => void;
};

const RankRevisionPopover = ({
  title,
  description,
  onDelete,
}: RankRevisionPopoverProps) => {
  return (
    <Popover
      placement="left"
      className="z-50"
      content={({ setOpen }) => (
        <div className="w-56 pb-2 pt-1 text-left rtl:text-right">
          <Text
            tag="h6"
            className="mb-0.5 flex items-start text-sm text-gray-700 sm:items-center"
          >
            <PiHand className="me-1 h-[17px] w-[17px]" /> {title}
          </Text>
          <Text className="mb-2 leading-relaxed text-gray-500">
            {description}
          </Text>
          <div className="flex items-center justify-end">
            <Button size="sm" className="me-1.5 h-7" onClick={onDelete}>
              بله
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-7"
              onClick={() => setOpen(false)}
            >
              خیر
            </Button>
          </div>
        </div>
      )}
    >
      <ActionIcon
        size="sm"
        variant="outline"
        aria-label={'Delete Item'}
        className="cursor-pointer bg-red text-white hover:!border-gray-900 hover:text-gray-700"
      >
        <PiHand className="h-4 w-4" />
      </ActionIcon>
    </Popover>
  );
};
