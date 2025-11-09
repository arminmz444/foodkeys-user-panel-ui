'use client';

import React, {
  useState,
  useMemo,
  useCallback,
  ChangeEvent,
  useRef,
} from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useColumn } from '@/hooks/use-column';
import ControlledTable from '@/components/controlled-table';
import { getColumns } from './columns';
import { useQuery } from 'react-query';
import { Input } from 'rizzui';
import { PiBuildings, PiX } from 'react-icons/pi';
import { useTable } from '@/hooks/use-table';
import axiosInstance from '@/utils/axios-instance';
import Spinner from '@/components/ui/spinner';
import useAxiosPrivate from '@/hooks/use-axios-private';
import toast from 'react-hot-toast';

const FilterElement = dynamic(
  () => import('@/app/shared/ecommerce/product/product-list/filter-element'),
  { ssr: false }
);
const TableFooter = dynamic(() => import('@/app/shared/table-footer'), {
  ssr: false,
});

const filterState = {
  visit: [null, null],
  createdAt: [null, null],
  status: '',
};

export default function TransactionsTable() {
  const [revisionRequestLoading, setRevisionRequestLoading] =
    useState<boolean>(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [billDownloadLoading, setBillDownloadLoading] = useState<Record<string, boolean>>({});
  const searchInput = useRef<HTMLInputElement>(null);
  const _axios = useAxiosPrivate();
  const fetchPayments = async (
    searchTerm: string,
    currentPage: number,
    pageSize: number
  ) => {
    const API_URL = `/transaction?pageNumber=${currentPage}&pageSize=${pageSize}&filter=${searchTerm}`;

    const response = await _axios.get(API_URL);

    if (response.data.statusCode === 200) {
      return {
        data: response.data.data,
        totalItems: response.data.pagination.totalElements,
      };
    } else {
      throw new Error('Failed to fetch payments');
    }
  };
  const handleRequestRevision = useCallback(async (id: number) => {
    console.log(id);
    setRevisionRequestLoading(true);
    try {
      let response = await _axios.post('company/' + id + '/revision/', {});
      if (response.status === 200 && response.data.statusCode === 200)
        toast.success(response.data.message);
      else toast.error(response.data.message);
    } catch (e) {
      console.error(e);
      // @ts-ignore
      toast.error(e?.response?.data?.message || 'خطا در درخواست بازبینی');
    } finally {
      setRevisionRequestLoading(false);
    }
  }, [_axios]);

  const handleDownloadBill = useCallback(async (transactionId: string) => {
    if (!transactionId) {
      toast.error('شناسه تراکنش یافت نشد');
      return;
    }

    try {
      setBillDownloadLoading((prev) => ({ ...prev, [transactionId]: true }));
      const response = await _axios.post(
        '/billing-info/generate-bill/' + transactionId,
        { templateId: 1 },
        { responseType: 'blob' }
      );

      // Create a blob from the response
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `bill_${transactionId}_${new Date().getTime()}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success('فاکتور با موفقیت دانلود شد');
    } catch (error: any) {
      console.error('Error generating bill:', error);
      toast.error(error?.response?.data?.message || 'خطا در صدور فاکتور');
    } finally {
      setBillDownloadLoading((prev) => ({ ...prev, [transactionId]: false }));
    }
  }, [_axios]);

  const debounceSearch = useCallback((func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any) => {
      clearTimeout(timer);
      // @ts-ignore
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  }, []);

  const handleSearchInput = (val: string) => {
    setInputValue(val);
    debounceHandleSearch(val);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceHandleSearch = useCallback(
    debounceSearch((val: string) => {
      setSearchTerm(val);
      setCurrentPage(1);
    }, 500),
    []
  );

  const { data, isLoading, isError } = useQuery(
    ['payments', searchTerm, currentPage, pageSize],
    () => fetchPayments(searchTerm, currentPage, pageSize),
    {
      keepPreviousData: true,
    }
  );

  const handleClearSearch = () => {
    setInputValue('');
    setSearchTerm('');
    if (searchInput.current) searchInput.current.value = '';
    setCurrentPage(1);
  };

  const {
    filters,
    updateFilter,
    sortConfig,
    handleSort,
    selectedRowKeys,
    setSelectedRowKeys,
    handleRowSelect,
    handleSelectAll,
    handleDelete,
    handleReset,
    // handleRequestRevision
  } = useTable(data?.data || [], pageSize, filterState, isLoading);

  console.log(data?.data);
  const columns = useMemo(
    () =>
      getColumns({
        data: data?.data || [],
        sortConfig: (sortConfig && 'key' in sortConfig && 'direction' in sortConfig) ? sortConfig as { key: string; direction: 'asc' | 'desc' } : null,
        checkedItems: selectedRowKeys,
        onHeaderCellClick: (value: string) => handleSort(value),
        onChecked: handleRowSelect,
        handleSelectAll,
        handleDownloadBill: handleDownloadBill,
        billDownloadLoading: billDownloadLoading
      }),
    [data, selectedRowKeys, sortConfig, billDownloadLoading, handleDownloadBill, handleRowSelect, handleSelectAll, handleSort]
  );

  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);

  // if (isLoading) {
  //     return <div>Loading...</div>;
  // }

  if (isError) {
    return <div>خطا در دریافت اطلاعات</div>;
  }
  if (!data) {
    return <Spinner size="xl" />;
  }
  return (
    <>
      <div className="md:w-82 relative mb-4 max-w-md lg:w-72">
        {/*<Input*/}
        {/*    ref={searchInput}*/}
        {/*    size="lg"*/}
        {/*    value={inputValue} // Input value is directly controlled by inputValue*/}
        {/*    placeholder="جستجو براساس نام شرکت"*/}
        {/*    prefix={<PiBuildings className="text-lg" />}*/}
        {/*    onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearchInput(e.target.value)}*/}
        {/*/>*/}
        {inputValue && (
          <button
            onClick={handleClearSearch}
            className="absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <PiX className="text-xl text-gray-500" />
          </button>
        )}
      </div>
      <ControlledTable
        variant="modern"
        isLoading={isLoading}
        showLoadingText={true}
        data={data.data}
        columns={visibleColumns}
        paginatorOptions={{
          pageSize,
          setPageSize,
          total: data.totalItems,
          current: currentPage,
          onChange: (page: number) => setCurrentPage(page),
        }}
        filterOptions={{
          searchTerm,
          onSearchClear: handleClearSearch,
          onSearchChange: (event) => setSearchTerm(event.target.value),
          hasSearched: !!searchTerm,
          hideIndex: 1,
          columns,
          checkedColumns,
          setCheckedColumns,
          enableDrawerFilter: true,
        }}
        filterElement={
          <FilterElement
            filters={filters}
            isFiltered={!!filters}
            updateFilter={updateFilter}
            handleReset={handleReset}
          />
        }
        tableFooter={
          <TableFooter
            checkedItems={selectedRowKeys}
            handleDelete={(ids: string[]) => {
              setSelectedRowKeys([]);
              handleDelete(ids);
            }}
          />
        }
        className="overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm"
      />
    </>
  );
}
