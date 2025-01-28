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
import { Lekton } from 'next/font/google';

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

export default function RequestListTable({
  relatedEntity,
  relatedEntityTitle,
}: {
  relatedEntity: string;
  relatedEntityTitle: string;
}) {
  const fetchRequests = async (
    searchTerm: string,
    currentPage: number,
    pageSize: number
  ) => {
    let API_URL = searchTerm
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/search/request/${relatedEntity}?query=${searchTerm}&page=${currentPage}&size=${pageSize}`
      : `${process.env.NEXT_PUBLIC_API_BASE_URL}/request/${relatedEntity}?pageNumber=${currentPage}&pageSize=${pageSize}`;

    const response = await axiosInstance.get(API_URL);

    if (response.data.statusCode === 200) {
      return {
        data: response.data.data,
        totalItems: response.data.pagination.totalElements,
      };
    } else {
      throw new Error('Failed to fetch requests');
    }
  };
  const [revisionRequestLoading, setRevisionRequestLoading] =
    useState<boolean>(false);
  const [publishEntityLoading, setPublishEntityLoading] =
    useState<boolean>(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState('');
  const searchInput = useRef<HTMLInputElement>(null);
  const _axios = useAxiosPrivate();
  const handleRequestRevision = async (
    status: string,
    requestId: any,
    id: any
  ) => {
    console.log(id);
    setRevisionRequestLoading(true);
    try {
      let response = await _axios.post(
        `/request/${requestId}/${relatedEntity}/${id}`,
        {
          answer: status,
          description: '',
          additionalInfo: '',
          ranking: 0,
          rankingAll: 0,
          finalStatus: 'VERIFIED',
        }
      );
      if (response.status === 200 && response.data.statusCode === 200) {
        toast.success(response.data.message);
        let nowTimestamp = new Date().getTime();
        setSearchTerm(nowTimestamp.toString());
      } else toast.error(response.data.message);
    } catch (e) {
      console.error(e);
      // @ts-ignore
      toast.error(e?.response?.data?.message || 'خطا پاسخ به درخواست');
    } finally {
      setRevisionRequestLoading(false);
    }
  };

  const publishEntity = async (id: any) => {
    console.log(id);
    setPublishEntityLoading(true);
    try {
      let response = await _axios.post(`/${relatedEntity}/${id}/publish`, {});
      if (response.status === 200 && response.data.statusCode === 200) {
        toast.success(response.data.message);
        let nowTimestamp = new Date().getTime();
        setSearchTerm(nowTimestamp.toString());
      } else toast.error(response.data.message);
    } catch (e) {
      console.error(e);
      // @ts-ignore
      toast.error(e?.response?.data?.message || 'خطا در انتشار شرکت');
    } finally {
      setPublishEntityLoading(false);
    }
  };

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
    [relatedEntity + 'RequestList', searchTerm, currentPage, pageSize],
    () => fetchRequests(searchTerm, currentPage, pageSize),
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

  const columns = useMemo(
    () =>
      getColumns({
        data: data?.data || [],
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick: (value: string) => handleSort(value),
        onDeleteItem: (id: string) => handleDelete(id),
        onChecked: handleRowSelect,
        handleSelectAll,
        answerRequest: handleRequestRevision,
        answerRequestLoading: revisionRequestLoading,
        relatedEntity: relatedEntity,
        publishEntity: publishEntity,
        publishEntityLoading: publishEntityLoading,
      }),
    [data, selectedRowKeys, sortConfig]
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
      <h2 className="mb-5 mt-10">
        {'لیست درخواست‌های ثبت شده توسط کاربران ' +
          '(' +
          relatedEntityTitle +
          ')'}
      </h2>
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
