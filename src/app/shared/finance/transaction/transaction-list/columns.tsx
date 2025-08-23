import { HeaderCell } from '@/components/ui/table';
import { Text } from '@/components/ui/text';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from 'rizzui';
import { PiDownload } from 'react-icons/pi';

const statusColorMap: Record<string, string> = {
    SUCCESS: 'success',
    IN_PROGRESS: 'warning',
    FAIL: 'destructive',
    PENDING_REVIEW: 'muted',
    ARCHIVED: 'secondary',
};

const statusLabelMap: Record<string, string> = {
    SUCCESS: 'موفق',
    IN_PROGRESS: 'در انتظار تأیید',
    FAIL: 'ناموفق',
    PENDING_REVIEW: 'در انتظار بازبینی',
    ARCHIVED: 'آرشیو شده',
};

export const getColumns = ({
                               data,
                               checkedItems,
                               onChecked,
                               handleSelectAll,
                               sortConfig,
                               onHeaderCellClick,
                               handleDownloadBill,
                               billDownloadLoading,
                           }: {
    data: any[];
    checkedItems: string[];
    onChecked: (id: string) => void;
    handleSelectAll: (checked: boolean) => void;
    sortConfig: { key: string; direction: 'asc' | 'desc' } | null;
    onHeaderCellClick: (key: string) => void;
    handleDownloadBill: (id: string) => void;
    billDownloadLoading: Record<string, boolean>;
}) => [
    {
        title: (
            <div className="ps-3.5">
                <Checkbox
                    title="انتخاب همه"
                    onChange={e => handleSelectAll(e.currentTarget.checked)}
                    checked={checkedItems.length === data.length && data.length > 0}
                    className="cursor-pointer"
                />
            </div>
        ),
        key: 'select',
        width: 30,
        render: (_: any, row: any) => (
            <div className="inline-flex ps-3.5">
                <Checkbox
                    className="cursor-pointer"
                    checked={checkedItems.includes(row.id)}
                    onChange={() => onChecked(row.id)}
                />
            </div>
        ),
    },
    {
        title: <HeaderCell title="تاریخ" sortKey="createdStr" {...{ sortConfig, onHeaderCellClick }} />,
        dataIndex: 'createdStr',
        key: 'createdStr',
        width: 140,
        render: (_: string, row: any) => (
            <div className="flex flex-col">
                <Text>{row.createdStr}</Text>
                <Text className="text-xs text-gray-500">{"ساعت: " + row.createdAtTimeStr}</Text>
            </div>
        ),
    },
    // {
    //     title: <HeaderCell title="تاریخ بروزرسانی" sortKey="updatedStr" {...{ sortConfig, onHeaderCellClick }} />,
    //     dataIndex: 'updatedStr',
    //     key: 'updatedStr',
    //     width: 140,
    //     render: (_: string, row: any) => (
    //         <div className="flex flex-col">
    //             <Text>{row.updatedStr}</Text>
    //             <Text className="text-xs text-gray-500">{row.updatedAtTime}</Text>
    //         </div>
    //     ),
    // },

    {
        title: <HeaderCell title="شماره فاکتور" sortKey="billId" {...{ sortConfig, onHeaderCellClick }} />,
        dataIndex: 'billId',
        key: 'billId',
        width: 180,
        render: (svc: string) => <Text>{svc}</Text>,
    },
    {
        title: <HeaderCell title="نوع تراکنش" sortKey="serviceNameFa" {...{ sortConfig, onHeaderCellClick }} />,
        dataIndex: 'serviceNameFa',
        key: 'serviceNameFa',
        width: 180,
        render: (svc: string) => <Text>{svc}</Text>,
    },
    // {
    //     title: <HeaderCell title="نوع تراکنش" sortKey="transactionType" {...{ sortConfig, onHeaderCellClick }} />,
    //     dataIndex: 'transactionType',
    //     key: 'transactionType',
    //     width: 140,
    //     render: (type: string) => <Text>{type}</Text>,
    // },
    {
        title: <HeaderCell title="مبلغ" sortKey="amount" {...{ sortConfig, onHeaderCellClick }} />,
        dataIndex: 'amount',
        key: 'amount',
        width: 100,
        render: (amt: number) => <Text>{amt?.toLocaleString()}</Text>,
    },
    {
        title: <HeaderCell title="کد پیگیری" sortKey="referenceCode" {...{ sortConfig, onHeaderCellClick }} />,
        dataIndex: 'referenceCode',
        key: 'referenceCode',
        width: 140,
        render: (ref: string) => <Text>{ref || '—'}</Text>,
    },
    {
        title: <HeaderCell title="وضعیت" sortKey="status" {...{ sortConfig, onHeaderCellClick }} />,
        dataIndex: 'status',
        key: 'status',
        width: 120,
        render: (_: any, row: any) => {
            const color = statusColorMap[row.status] || 'default';
            const label = statusLabelMap[row.status] || row.statusStr;
            return (
                <div className="flex items-center">
                    <Badge color={color} renderAsDot />
                    <Text className="ms-2">{label}</Text>
                </div>
            );
        },
    },
    {
        title: <HeaderCell title="فاکتور" />,
        dataIndex: 'hasBill',
        key: 'hasBill',
        width: 100,
        render: (_: any, row: any) =>

                <Button
                    size="sm"
                    isLoading={billDownloadLoading[row.id]}
                    onClick={() => handleDownloadBill(row.id)}
                >
                    <PiDownload className="me-1" />
                    دریافت فاکتور
                </Button>

    },
];
