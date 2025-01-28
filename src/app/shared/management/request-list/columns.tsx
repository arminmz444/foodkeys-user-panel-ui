import { HeaderCell } from '@/components/ui/table';
import { Text } from '@/components/ui/text';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tooltip } from '@/components/ui/tooltip';
import noImageTemplate from '/public/noImageTemplate.png';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { ActionIcon } from '@/components/ui/action-icon';
import PencilIcon from '@/components/icons/pencil';
import EyeIcon from '@/components/icons/eye';
import AvatarCard from '@/components/ui/avatar-card';
import { Button, Popover } from 'rizzui';
import HandWaveIcon from '@/components/icons/hand-wave';
import { PiHand, PiTrashFill } from 'react-icons/pi';
import { TbExclamationMark } from 'react-icons/tb';
import { FaRankingStar } from 'react-icons/fa6';
import TrashIcon from '@/components/icons/trash';
import { TiTick } from 'react-icons/ti';
import { HiXMark } from 'react-icons/hi2';
import { HiUpload } from 'react-icons/hi';

const STATIC_FILE_URL = 'https://foodkeys-api-dev.liara.run';
const companyStatusDict: any = {
  PENDING: 'در انتظار تایید',
  APPROVED: 'تایید شده',
  DENIED: 'رد شده',
};

function getStatusBadge(status: string) {
  return (
    <div
      className={`inline-flex animate-pulse items-center justify-center gap-2 rounded-full ${
        status === 'APPROVED' ||
        status === 'VERIFIED' ||
        status === 'SUBMIT' ||
        status === 'PUBLISHED'
          ? 'bg-green-lighter'
          : status === 'DENIED' || status === 'ARCHIVED'
          ? 'bg-red-lighter'
          : status === 'PENDING'
          ? 'bg-orange-lighter'
          : 'bg-gray-200'
      }  px-2.5 py-1`}
    >
      <Badge
        renderAsDot
        className={`${
          status === 'APPROVED' ||
          status === 'VERIFIED' ||
          status === 'SUBMIT' ||
          status === 'PUBLISHED'
            ? 'bg-green-dark'
            : status === 'DENIED' || status === 'ARCHIVED'
            ? 'bg-red-dark'
            : status === 'PENDING'
            ? 'bg-orange-dark'
            : null
        }`}
      />
      <span
        className={`text-xs font-semibold ${
          status === 'APPROVED' ||
          status === 'VERIFIED' ||
          status === 'SUBMIT' ||
          status === 'PUBLISHED'
            ? 'text-green-dark'
            : status === 'DENIED' || status === 'ARCHIVED'
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

function getRelatedEntityPersianMapping(relatedEntity: string) {
  let relatedEntityPersian;
  switch (relatedEntity) {
    case 'company':
      relatedEntityPersian = 'شرکت';
      break;
    case 'service':
      relatedEntityPersian = 'خدمت';
      break;
    case 'subscription':
      relatedEntityPersian = 'اشتراک';
      break;
    default:
      relatedEntityPersian = 'شرکت';
      break;
  }
  return relatedEntityPersian;
}

function getRequestTypePersianMapping(requestType: string) {
  let requestTypePersian;
  switch (requestType) {
    case 'SUBMIT_COMPANY':
      requestTypePersian = 'ثبت شرکت';
      break;
    case 'SUBMIT_SERVICE':
      requestTypePersian = 'ثبت خدمت';
      break;
    case 'ASK_FOR_REVISION':
      requestTypePersian = 'درخواست بازبینی';
      break;
    default:
      requestTypePersian = 'ثبت شرکت';
      break;
  }
  return requestTypePersian;
}

const handleRequestRevision = (id: number) => {
  console.log(id);
};

const isDeployable = (requestType: string, requestStatus: string) => {
  if (
    requestType === 'SUBMIT_COMPANY' ||
    requestType === 'SUBMIT_SERVICE' ||
    requestType === 'UPDATE_COMPANY' ||
    requestType === 'UPDATE_SERVICE'
  ) {
    return requestStatus === 'APPROVED';
  }
};

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
  answerRequest,
  answerRequestLoading,
  relatedEntity,
  publishEntity,
  publishEntityLoading,
}: any) => [
  {
    title: <HeaderCell title="نوع درخواست" />,
    dataIndex: 'requestType',
    key: 'requestType',
    width: 150,
    hidden: 'requestType',

    render: (_: string, row: any) => (
      <AvatarCard
        src={(row.logo && STATIC_FILE_URL + row.logo) || noImageTemplate}
        name={getRequestTypePersianMapping(row.requestType)}
        description={`تاریخ ثبت: ${row.createdAtStr}`}
      />
    ),
  },
  {
    title: <HeaderCell title="شناسه درخواست" />,
    dataIndex: 'requestId',
    key: 'requestId',
    width: 100,
    render: (requestId: string) => <Text>{requestId}</Text>,
  },
  // {
  //   title: <HeaderCell title="کاربر ثبت کننده" />,
  //   dataIndex: 'registrantUserFullName',
  //   key: 'registrantUserFullName',
  //   width: 150,
  //   render: (registrantUserFullName: string) => <Text>{registrantUserFullName}</Text>,
  // },
  {
    title: (
      <HeaderCell
        title={'شناسه ' + getRelatedEntityPersianMapping(relatedEntity)}
      />
    ),
    dataIndex: `${relatedEntity}Id`,
    key: `${relatedEntity}Id`,
    width: 30,
    render: (_: string, row: any) => <Text>{row[`${relatedEntity}Id`]}</Text>,
  },
  // {
  //   title: <HeaderCell title="نام شرکت" />,
  //   dataIndex: 'companyName',
  //   key: 'companyName',
  //   width: 150,
  //   render: (companyName: string) => <Text>{companyName}</Text>,
  // },
  // {
  //     title: <HeaderCell title="مدیر عامل" />,
  //     dataIndex: 'ceo',
  //     key: 'ceo',
  //     width: 200,
  //     render: (ceo: string) => <Text>{ceo}</Text>,
  // },
  {
    title: <HeaderCell title="وضعیت درخواست" />,
    dataIndex: 'requestStatus',
    key: 'requestStatus',
    width: 30,
    render: (requestStatus: string) => getStatusBadge(requestStatus),
  },
  {
    title: (
      <HeaderCell
        title={
          'وضعیت ' +
          getRelatedEntityPersianMapping(relatedEntity) +
          ' هنگام درخواست'
        }
      />
    ),
    dataIndex: `${relatedEntity}StatusFa`,
    key: `${relatedEntity}StatusFa`,
    width: 30,
    render: (companyStatus: number) => <Text>{companyStatus}</Text>,
  },
  // {
  //   title: <HeaderCell title="رتبه"/>,
  //   dataIndex: 'ranking',
  //   key: 'ranking',
  //   width: 5,
  //   render: (_: string, row: any) => <Text>{(row.ranking || 0) + ' / ' + (row.rankingAll || 0)}</Text>,
  // },
  {
    title: <></>,
    dataIndex: 'action',
    key: 'action',
    width: 20,
    render: (_: any, row: any) => (
      <div className="flex h-full w-full flex-shrink-0 flex-grow-0 items-center justify-end gap-3 pe-3">
        <ActionPopover
          title={`تایید شرکت`}
          description={`آیا می‌خواهید این شرکت را تایید کنید؟`}
          onDelete={() =>
            answerRequest('ACCEPTED', row.requestId, row[`${relatedEntity}Id`])
          }
          icon={<TiTick className="h-[17px] w-[17px]" />}
          iconAriaLabel="تایید شرکت"
          iconBgColorClass={'bg-green'}
          confirmBtnDisabled={
            publishEntityLoading ||
            answerRequestLoading ||
            ((row.requestType === 'SUBMIT_SERVICE' ||
              row.requestType === 'SUBMIT_COMPANY') &&
              row.requestStatus === 'APPROVED')
          }
        />
        <ActionPopover
          title={`رد شرکت`}
          description={`آیا می‌خواهید این شرکت را رد کنید؟`}
          onDelete={() =>
            answerRequest('DENIED', row.requestId, row[`${relatedEntity}Id`])
          }
          icon={<HiXMark className="h-[17px] w-[17px]" />}
          iconAriaLabel="رد شرکت"
          iconBgColorClass={'bg-red'}
          confirmBtnDisabled={
            publishEntityLoading ||
            answerRequestLoading ||
            ((row.requestType === 'SUBMIT_SERVICE' ||
              row.requestType === 'SUBMIT_COMPANY') &&
              row.requestStatus === 'DENIED')
          }
        />
        <ActionPopover
          title={`انتشار شرکت`}
          description={`آیا می‌خواهید این شرکت را در سایت منتشر کنید؟`}
          onDelete={() => publishEntity(row[`${relatedEntity}Id`])}
          icon={<HiUpload className="h-[17px] w-[17px]" />}
          iconAriaLabel="انتشار شرکت"
          iconBgColorClass={'bg-blue'}
          confirmBtnDisabled={
            publishEntityLoading ||
            answerRequestLoading ||
            !isDeployable(row.requestType, row.requestStatus)
          }
        />
      </div>
    ),
  },
];
type DeletePopoverProps = {
  title: string;
  description: string;
  onDelete: () => void;
  icon: any;
  iconBgColorClass: any;
  iconAriaLabel: string;
  confirmBtnDisabled: boolean;
};

export default function ActionPopover({
  title,
  description,
  onDelete,
  icon,
  iconAriaLabel,
  iconBgColorClass,
  confirmBtnDisabled,
}: DeletePopoverProps) {
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
            <ActionIcon
              size="sm"
              variant="outline"
              aria-label={'Delete Item'}
              className={`me-2 cursor-pointer hover:!border-gray-900 hover:text-gray-700 ${
                iconBgColorClass ?? 'bg-red'
              } text-white`}
            >
              {icon}
            </ActionIcon>{' '}
            {title}
          </Text>
          <Text className="mb-2 leading-relaxed text-gray-500">
            {description}
          </Text>
          <div className="flex items-center justify-end">
            <Button
              disabled={confirmBtnDisabled}
              size="sm"
              className="me-1.5 h-7"
              onClick={onDelete}
            >
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
        disabled={confirmBtnDisabled}
        size="sm"
        variant="outline"
        aria-label={'Delete Item'}
        className={`cursor-pointer hover:!border-gray-900 hover:text-gray-700 ${
          iconBgColorClass || 'bg-red'
        } text-white`}
      >
        {icon}
      </ActionIcon>
    </Popover>
  );
}
