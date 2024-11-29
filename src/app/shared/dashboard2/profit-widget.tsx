'use client';

import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import WidgetCard from '@/components/cards/widget-card';
import ButtonGroupAction from '@/components/charts/button-group-action';
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { CustomTooltip } from '@/components/charts/custom-tooltip';
import cn from '@/utils/class-names';
import { PiInfoFill } from 'react-icons/pi';

const data = [
  {
    month: 'فروردین',
    totalSales: 95,
  },
  {
    month: 'خرداد',
    totalSales: 70,
  },
  {
    month: 'مرداد',
    totalSales: 113,
  },
  {
    month: 'مهر',
    totalSales: 159,
  },
  {
    month: 'آذر',
    totalSales: 105,
  },
  {
    month: 'بهمن',
    totalSales: 140,
  },
];

const filterOptions = ['5 روز', '2 هفته', '1 ماه', '6 ماه', '1 سال'];

export default function ProfitWidget({ className }: { className?: string }) {
  function handleFilterBy(data: string) {
    console.log('Profit Filter:', data);
  }

  return (
    <WidgetCard
      title={'سود کلی'}
      description={'895000 تومان'}
      titleClassName="text-gray-500 font-normal font-inter !text-sm"
      descriptionClassName="text-lg font-semibold sm:text-xl 3xl:text-2xl text-gray-900 font-iransans mt-1 font-iransans"
      action={
        <Button variant="outline" size="sm" className="text-sm">
          جزییات
        </Button>
      }
      headerClassName="mb-6"
      className={cn('flex flex-col', className)}
    >
      <div className="grid flex-grow grid-cols-1 gap-3">
        <ButtonGroupAction
          options={filterOptions}
          defaultActive={filterOptions[0]}
          onChange={(data) => handleFilterBy(data)}
          btnClassName="@sm:px-5"
          className="justify-between self-start rounded-lg border border-gray-200 p-1.5"
        />
        <div className="mt-auto h-64 w-full pb-5 @sm:h-72 @sm:pt-3 @7xl:h-[240px] lg:pb-7">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 6,
                bottom: 30,
              }}
            >
              <defs>
                <linearGradient id="totalSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.125} />
                  <stop offset="95%" stopColor="#ffdadf" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="8 10"
                strokeOpacity={0.5}
                vertical={false}
              />
              <Tooltip
                content={
                  <CustomTooltip
                    persianTexts={{
                      totalSales: 'فروش کل',
                    }}
                  />
                }
              />
              <Area
                type="bump"
                dataKey="totalSales"
                stroke="#10b981"
                strokeWidth={2.3}
                fillOpacity={1}
                fill="url(#totalSales)"
              />
            </AreaChart>
          </ResponsiveContainer>
          <Text className="text-gray-500 @sm:mt-2.5 ">
            <PiInfoFill className="inline-flex h-auto w-4 text-gray-500/80 dark:text-gray-600" />{' '}
            کل سود بدون مالیات در محاسبات گنجانده شده.
          </Text>
        </div>
      </div>
    </WidgetCard>
  );
}
