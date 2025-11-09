import {HeaderCell} from '@/components/ui/table';
import {Text} from '@/components/ui/text';
import {Checkbox} from '@/components/ui/checkbox';
import {Badge} from '@/components/ui/badge';
import {Tooltip} from '@/components/ui/tooltip';
import DeletePopover from '@/app/shared/delete-popover';
import noImageTemplate from '/public/noImageTemplate.png';
import Link from 'next/link';
import {routes} from '@/config/routes';
import {ActionIcon} from '@/components/ui/action-icon';
import PencilIcon from '@/components/icons/pencil';
import EyeIcon from '@/components/icons/eye';
import AvatarCard from '@/components/ui/avatar-card';
import {Button, Popover} from 'rizzui';
import HandWaveIcon from '@/components/icons/hand-wave';
import {PiHand} from 'react-icons/pi';
import {TbExclamationMark} from 'react-icons/tb';
import {FaRankingStar} from 'react-icons/fa6';

const STATIC_FILE_URL = 'https://back.agfo.ir';
const companyStatusDict: any = {
    PENDING: 'در انتظار تایید',
    VERIFIED: 'تایید شده',
    DENIED: 'رد شده',
    ARCHIVED: 'آرشیو شده',
    DELETED: 'حذف شده',
    UPDATED: 'بروزرسانی شده',
    PUBLISHED: 'منتشر شده',
    REVISION: 'درخواست بازبینی',
    SUBMIT: 'ثبت شده',
};

function getStatusBadge(status: string) {
    return (
        <div
            className={`inline-flex animate-pulse items-center justify-center gap-2 rounded-full ${
                status === 'PUBLISHED' ? 'bg-blue-lighter' :
                    status === 'VERIFIED' || status === 'SUBMIT'
                        ? 'bg-green-lighter'
                        : status === 'DENIED' || status === 'ARCHIVED' || status === "DELETED"
                            ? 'bg-red-lighter'
                            : status === 'PENDING'
                                ? 'bg-orange-lighter'
                                : 'bg-gray-200'
            }  px-2.5 py-1`}
        >
            <Badge
                renderAsDot
                className={`${
                    status === 'PUBLISHED' ? 'bg-blue-dark' :
                        status === 'VERIFIED' || status === 'SUBMIT'
                            ? 'bg-green-dark'
                            : status === 'DENIED' || status === 'ARCHIVED' || status === "DELETED"
                                ? 'bg-red-dark'
                                : status === 'PENDING'
                                    ? 'bg-orange-dark'
                                    : null
                }`}
            />
            <span
                className={`text-xs font-semibold ${
                    status === 'PUBLISHED' ? 'text-blue-dark' :
                        status === 'VERIFIED' || status === 'SUBMIT'
                            ? 'text-green-dark'
                            : status === 'DENIED' || status === 'ARCHIVED' || status === "DELETED"
                                ? 'text-red-dark'
                                : status === 'PENDING'
                                    ? 'text-orange-dark'
                                    : null
                }`}
            >
        {companyStatusDict[status]}
      </span>
        </div>
        // <div className="flex items-center">
        //   <Badge
        //     color={
        //       status === 'VERIFIED'
        //         ? 'success'
        //         : status === 'PENDING'
        //         ? 'warning'
        //         : 'danger'
        //     }
        //     renderAsDot
        //   />
        //   <Text className="ms-2 font-medium">{companyStatusDict[status]}</Text>
        // </div>
    );
}

const handleRequestRevision = (id: number) => {
    console.log(id);
};

export const getColumns = ({
                               data,
                               sortConfig,
                               checkedItems,
                               onDeleteItem,
                               onHeaderCellClick,
                               handleSelectAll,
                               onChecked,
                               handleRequestRevision,
                               revisionRequestLoading,
                               category,
                           }: any) => [
    // {
    //   title: (
    //     <div className="ps-3.5">
    //       <Checkbox
    //         title="انتخاب همه"
    //         onChange={handleSelectAll}
    //         checked={checkedItems.length === data.length}
    //         className="cursor-pointer"
    //       />
    //     </div>
    //   ),
    //   dataIndex: 'checked',
    //   key: 'checked',
    //   width: 30,
    //   render: (_: any, row: any) => (
    //     <div className="inline-flex ps-3.5">
    //       <Checkbox
    //         className="cursor-pointer"
    //         checked={checkedItems.includes(row.id)}
    //         onChange={() => onChecked && onChecked(row.id)}
    //       />
    //     </div>
    //   ),
    // },
    {
        title: <HeaderCell title="نام شرکت"/>,
        dataIndex: 'companyName',
        key: 'companyName',
        width: 150,
        hidden: 'companyName',

        render: (_: string, row: any) => (
            <AvatarCard
                src={(row.logo && STATIC_FILE_URL + row.logo) || noImageTemplate}
                name={row.companyName}
                description={`تاریخ ثبت: ${row.createdAtStr}`}
            />
        ),
    },
    // {
    //     title: <HeaderCell title="نام شرکت" />,
    //     dataIndex: 'companyName',
    //     key: 'companyName',
    //     width: 300,
    //     render: (companyName: string) => <Text>{companyName}</Text>,
    // },
    {
        title: <HeaderCell title="دسته‌بندی"/>,
        dataIndex: 'subCategory',
        key: 'subCategory',
        width: 150,
        render: (subCategory: string) => <Text>{subCategory}</Text>,
    },
    // {
    //     title: <HeaderCell title="مدیر عامل" />,
    //     dataIndex: 'ceo',
    //     key: 'ceo',
    //     width: 200,
    //     render: (ceo: string) => <Text>{ceo}</Text>,
    // },
    {
        title: <HeaderCell title="وضعیت"/>,
        dataIndex: 'companyStatus',
        key: 'companyStatus',
        width: 30,
        render: (status: string) => getStatusBadge(status),
    },
    {
        title: <HeaderCell title="بازدیدها"/>,
        dataIndex: 'visit',
        key: 'visit',
        width: 5,
        render: (visit: number) => <Text>{visit}</Text>,
    },
    {
        title: <HeaderCell title="رتبه"/>,
        dataIndex: 'ranking',
        key: 'ranking',
        width: 5,
        render: (_: string, row: any) => <Text>{(row.ranking || 0) + ' / ' + (row.rankingAll || 0)}</Text>,
    },
    {
        title: <></>,
        dataIndex: 'action',
        key: 'action',
        width: 20,
        render: (_: any, row: any) => (
            <div className="flex h-full w-full flex-shrink-0 flex-grow-0 items-center justify-end gap-3 pe-3">
                <Tooltip
                    size="sm"
                    content={() => 'درخواست تجدید رتبه'}
                    placement="top"
                    color="invert"
                >
                    {/*// @ts-ignore*/}
                    <Button
                        isLoading={revisionRequestLoading}
                        onClick={() => handleRequestRevision(row.id)}
                        color="danger"
                        size="DEFAULT"
                        className="h-full"
                    >
                        <FaRankingStar className="h-4 w-4 shrink-0 grow-0"/>
                    </Button>
                    {/*<RankRevisionPopover*/}
                    {/*    title={`درخواست تجدید رتبه`}*/}
                    {/*    description={`آیا می‌خواهید درخواست تجدید رتبه این شرکت را بدهید؟`}*/}
                    {/*    onDelete={() => onDeleteItem(row.id)}*/}
                    {/*/>*/}
                </Tooltip>
                <Tooltip
                    size="sm"
                    content={() => 'ویرایش اطلاعات'}
                    placement="top"
                    color="invert"
                >
                    <Link
                        href={
                            category === 1
                                ? routes.info.foodIndustryEdit(row.id)
                                : routes.info.agricultureIndustryEdit(row.id)
                        }
                    >
                        <Button
                            tag="span"
                            size="sm"
                            variant="outline"
                            className="bg-white text-black hover:!bg-black hover:text-white"
                        >
                            ویرایش
                            {/* <PencilIcon /> */}
                        </Button>
                    </Link>
                </Tooltip>
                <Tooltip
                    size="sm"
                    content={() => 'مشاهده صفحه اختصاصی'}
                    placement="top"
                    color="invert"
                >
                    <a
                        href={
                            `${process.env.NEXT_PUBLIC_CLIENT_WEBSITE_URL}/view/${row.subCategoryNameEn}/details?id=` +
                            row.id
                        }
                    >
                        <Button
                            tag="span"
                            size="sm"
                            variant="outline"
                            className="bg-white text-black hover:!bg-black hover:text-white"
                        >
                            مشاهده
                            {/* <EyeIcon className="h-4 w-4" /> */}
                        </Button>
                    </a>
                </Tooltip>
                {/*<DeletePopover*/}
                {/*    title={`جذف شرکت`}*/}
                {/*    description={`آیا می‌خواهید درخواست حذف این شرکت را بدهید؟`}*/}
                {/*    onDelete={() => onDeleteItem(row.id)}*/}
                {/*/>*/}
            </div>
        ),
    },
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
            content={({setOpen}) => (
                <div className="w-56 pb-2 pt-1 text-left rtl:text-right">
                    <Text
                        tag="h6"
                        className="mb-0.5 flex items-start text-sm text-gray-700 sm:items-center"
                    >
                        <PiHand className="me-1 h-[17px] w-[17px]"/> {title}
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
                <PiHand className="h-4 w-4"/>
            </ActionIcon>
        </Popover>
    );
};
