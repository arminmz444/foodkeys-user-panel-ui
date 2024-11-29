'use client';

import { useEffect, useState } from 'react';
import { PiCaretDownBold, PiCaretRightBold } from 'react-icons/pi';
import { Popover } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { useMedia } from '@/hooks/use-media';
import { DatePicker } from '@/components/ui/datepicker';
import cn from '@/utils/class-names';
import { Text } from '@/components/ui/text';

const modifiedOptions = [
  {
    value: 'today',
    name: 'امروز',
    id: 1,
  },
  {
    value: 'yesterday',
    name: 'دیروز',
    id: 2,
  },
  {
    value: 'lastweek',
    name: 'هفته پیش',
    id: 3,
  },
  {
    value: 'thisYear',
    name: 'امسال',
    id: 4,
  },
  {
    value: 'lastYear',
    name: 'پارسال',
    id: 5,
  },
  {
    value: 'customDateRange',
    name: 'تاریخ سفارشی',
    icon: <PiCaretRightBold className="h-4 w-4 text-gray-500 rtl:rotate-180" />,
    id: 6,
  },
];

export default function FileSortbyDate() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [customDateRange, setCustomDateRange] = useState(false);
  const isMobile = useMedia('(max-width: 639px)', false);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    if (startDate && endDate) {
      setSelected(`${startDate} to ${endDate}`);
    }
  }, [startDate, endDate]);

  return (
    <Popover
      placement="bottom-start"
      className="z-50 px-3 dark:bg-gray-100 [&>svg]:dark:fill-gray-100"
      content={({ setOpen }) => (
        <div className="w-full max-w-[460px] pt-1 text-left rtl:text-right">
          <div className="flex">
            <ul className="w-full max-w-[200px]">
              {modifiedOptions.map(
                (item: {
                  name: string;
                  value: string;
                  id: number;
                  icon?: React.ReactNode;
                }) => (
                  <li key={item.id}>
                    <Button
                      type="button"
                      variant="text"
                      className={cn(
                        'flex w-full justify-between rounded-md px-2 text-sm font-normal leading-5 text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-50 dark:focus:bg-gray-50',
                        item.id === modifiedOptions.length && 'hidden sm:flex'
                      )}
                      onClick={() => {
                        item.id === modifiedOptions.length
                          ? setCustomDateRange((prev) => !prev)
                          : setSelected(item.value);
                      }}
                    >
                      {item.name}
                      {item?.icon}
                    </Button>
                  </li>
                )
              )}
            </ul>
            <div
              className={cn(
                customDateRange ? 'block' : 'hidden',
                isMobile && 'hidden',
                'flex-grow pl-4'
              )}
            >
              <div className="mb-5">
                <Text tag="span" className="mb-2 mt-2.5 block text-sm">
                  تاریخ شروع
                </Text>
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="انتخاب تاریخ"
                  className=""
                />
              </div>
              <div>
                <Text tag="span" className="mb-2 block text-sm">
                  تاریخ چایان
                </Text>
                <DatePicker
                  selected={endDate}
                  onChange={(date: Date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  placeholderText="انتخاب تاریخ"
                />
              </div>
            </div>
          </div>
          <div className="mt-2 flex justify-end border-t border-dashed border-gray-300 pt-2">
            <Button
              type="button"
              variant="text"
              className="text-gray-500"
              onClick={() => setOpen(false)}
            >
              انصراف
            </Button>
            <Button
              color="primary"
              type="button"
              variant="text"
              onClick={() => {
                console.log('Last modified =>', selected);
                setOpen(false);
              }}
            >
              اعمال
            </Button>
          </div>
        </div>
      )}
    >
      <Button
        size="sm"
        variant="outline"
        className="text-sm font-normal text-gray-600"
      >
        اخرین زمان ویرایش <PiCaretDownBold className="ms-2 h-4 w-4" />
      </Button>
    </Popover>
  );
}
