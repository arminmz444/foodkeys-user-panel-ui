'use client';
import SelectBox, { SelectOption } from '@/components/ui/select';
import { useState } from 'react';

const customOptions = [
  {
    name: 'همه',
    value: 'all',
  },
  {
    name: 'بانک تولیدکنندگان',
    value: 'producers',
  },
  {
    name: 'بانک صادرکنندگان',
    value: 'importers',
  },
];

const sortOptions = [
  {
    name: 'همه',
    value: 'all',
  },
  {
    name: 'فعال',
    value: 'active',
  },
  {
    name: 'در انتظار تایید',
    value: 'pending',
  },
  {
    name: 'غیرفعال',
    value: 'disable',
  },
];

interface PageHeaderFilterProps {
  sortValue: string;
  setSortValue: (val: 'فعال' | 'در انتظار تایید' | 'غیرفعال' | 'همه') => void;
  value: SelectOption[];
  setValue: (val: SelectOption[]) => void;
  filterValue: string;
}

const PageHeaderFilter = ({
  setSortValue,
  setValue,
  sortValue,
  value,
  filterValue,
}: PageHeaderFilterProps) => {
  return (
    <div className="mb-5 flex w-full flex-col items-end justify-end gap-2 xs:flex-row md:mb-2">
      <SelectBox
        label="مرتب سازی بر اساس ..."
        options={sortOptions}
        value={sortValue}
        onChange={(selected: SelectOption) => {
          if (
            selected.name === 'همه' ||
            selected.name === 'فعال' ||
              selected.name === 'در انتظار تایید' ||
            selected.name === 'غیرفعال'
          ) {
            setSortValue(selected.name);
          }
        }}
        className="w-full sm:w-1/2 lg:w-1/4"
        placeholder="مرتب سازی بر اساس ..."
        labelClassName="font-bold text-black"
      />
      <SelectBox
        label="فیلتر بر اساس بانک ..."
        options={[{name: "همه", value: ''}, ...value]}
        value={filterValue}
        onChange={setValue}
        className="w-full sm:w-1/2 lg:w-1/4"
        placeholder="فیلتر بر اساس بانک..."
        labelClassName="font-bold text-black"
      />
    </div>
  );
};

export default PageHeaderFilter;
