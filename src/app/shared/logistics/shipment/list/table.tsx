'use client';

import { PiTrashDuotone } from 'react-icons/pi';
import { useCallback, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { getColumns, statusColors } from './columns';
import ControlledTable from '@/components/controlled-table';
import DateFiled from '@/components/controlled-table/date-field';
import { useMedia } from '@/hooks/use-media';
import { useTable } from '@/hooks/use-table';
import { getDateRangeStateValues } from '@/utils/get-formatted-date';
import StatusField from '@/components/controlled-table/status-field';
import { useColumn } from '@/hooks/use-column';
import { Badge } from '@/components/ui/badge';
import {
  shipmentData,
  paymentMethods,
  shippingStatuses,
  StatusType,
} from '@/data/shipment-data';

const paymentStatusOptions = Object.entries(shippingStatuses).map(
  ([value, name]) => ({
    label: (
      <div className="flex items-center">
        <Badge renderAsDot color={statusColors(name as StatusType)} />
        <Text className="ms-2">{name}</Text>
      </div>
    ),
    name,
    value,
  })
);

const paymentMethodOptions = Object.entries(paymentMethods).map(
  ([value, name]) => ({ name, value })
);

const filterState = {
  date: [null, null],
  status: '',
  paymentMethod: '',
};

export default function ShipmentListTable() {
  const [pageSize, setPageSize] = useState(10);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const isMediumScreen = useMedia('(max-width: 1860px)', false);
  const isLargeScreen = useMedia('(min-width: 1861px)', false);

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback((id: string) => {
    handleDelete(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChecked = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (event.target.checked) {
      setCheckedItems((prevItems) => [...prevItems, id]);
    } else {
      setCheckedItems((prevItems) => prevItems.filter((item) => item !== id));
    }
  };

  const {
    isLoading,
    isFiltered,
    tableData,
    currentPage,
    totalItems,
    handlePaginate,
    filters,
    updateFilter,
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
    handleDelete,
    handleReset,
    // } = useTable(data, pageSize, filterState);
  } = useTable(shipmentData, pageSize, filterState);

  const columns = useMemo(
    () =>
      getColumns({ sortConfig, onHeaderCellClick, onDeleteItem, onChecked }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      onChecked,
    ]
  );

  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);

  return (
    <div>
      <ControlledTable
        variant="modern"
        isLoading={isLoading}
        showLoadingText={true}
        data={tableData}
        // @ts-ignore
        columns={visibleColumns}
        paginatorOptions={{
          pageSize,
          setPageSize,
          total: totalItems,
          current: currentPage,
          onChange: (page: number) => handlePaginate(page),
        }}
        filterOptions={{
          searchTerm,
          onSearchClear: () => {
            handleSearch('');
          },
          onSearchChange: (event) => {
            handleSearch(event.target.value);
          },
          hasSearched: isFiltered,
          columns,
          checkedColumns,
          setCheckedColumns,
        }}
        className="overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
        filterElement={
          <>
            <DateFiled
              selected={getDateRangeStateValues(filters['date'][0])}
              startDate={getDateRangeStateValues(filters['date'][0])}
              endDate={getDateRangeStateValues(filters['date'][1])}
              onChange={(date: any) => {
                updateFilter('date', date);
              }}
              placeholderText="انتخاب تاریخ ساخت"
              {...(isMediumScreen && {
                inputProps: {
                  label: 'تاریخ ایجاد',
                  labelClassName: 'font-medium text-gray-700',
                },
              })}
              maxDate={new Date()}
            />
            <StatusField
              options={paymentStatusOptions}
              value={filters['status']}
              onChange={(value: string) => {
                console.log('value', value);
                updateFilter('status', value);
              }}
              getOptionValue={(option) => option.name}
              displayValue={(selected: string) =>
                paymentStatusOptions.find((option) => option.name === selected)
                  ?.label ?? ''
              }
              {...(isMediumScreen && {
                label: 'Status',
                labelClassName: 'font-medium text-gray-700',
              })}
              {...(isLargeScreen && {
                dropdownClassName: 'w-44',
              })}
              placement="bottom-start"
              useContainerWidth={isLargeScreen ? false : true}
            />
            <StatusField
              options={paymentMethodOptions}
              value={filters['paymentMethod']}
              onChange={(value: string) => {
                updateFilter('paymentMethod', value);
              }}
              getOptionValue={(option) => option.name}
              displayValue={(selected: string) =>
                paymentMethodOptions.find((option) => option.name === selected)
                  ?.name ?? ''
              }
              {...(isMediumScreen && {
                label: 'نحوه پرداخت',
                labelClassName: 'font-medium text-gray-700',
              })}
              {...(isLargeScreen && {
                dropdownClassName: 'w-44',
              })}
              placement="bottom-start"
              placeholder="انتخاب روش پرداخت"
              useContainerWidth={isLargeScreen ? false : true}
            />
            {isFiltered ? (
              <Button
                size="sm"
                onClick={() => {
                  handleReset();
                }}
                className="h-8 bg-gray-200/70"
                variant="flat"
              >
                <PiTrashDuotone className="me-1.5 h-[17px] w-[17px]" /> Clear
              </Button>
            ) : null}
          </>
        }
        tableFooter={
          <>
            {checkedItems.length > 0 ? (
              <div className="sticky bottom-0 left-0 z-10 mt-2.5 flex w-full items-center justify-between rounded-md border border-gray-300 bg-gray-0 px-5 py-3.5 text-gray-900 shadow-sm dark:border-gray-300 dark:bg-gray-100 dark:text-white dark:active:bg-gray-100">
                <div>
                  <Text tag="strong">{checkedItems.length}</Text> انتخاب شده{' '}
                  <Button
                    size="sm"
                    variant="text"
                    className="underline"
                    color="danger"
                    onClick={() => {
                      handleDelete(checkedItems);
                      setCheckedItems([]);
                    }}
                  >
                    حذف آنها
                  </Button>
                </div>
                <Button
                  size="sm"
                  className="dark:bg-gray-300 dark:text-gray-800"
                >
                  Re-send {checkedItems.length}{' '}
                  {checkedItems.length > 1 ? 'Invoices' : 'Invoice'}{' '}
                </Button>
              </div>
            ) : null}
          </>
        }
      />
    </div>
  );
}
