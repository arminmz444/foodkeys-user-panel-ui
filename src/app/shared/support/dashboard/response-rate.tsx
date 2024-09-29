'use client';

import { useState } from 'react';
import WidgetCard from '@/components/cards/widget-card';
import { DatePicker } from '@/components/ui/datepicker';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { CustomTooltip } from '@/components/charts/custom-tooltip';
import { useMedia } from '@/hooks/use-media';
import SimpleBar from '@/components/ui/simplebar';

const data = [
  {
    month: 'فروردین',
    creationTime: 4,
    responseTime: 5,
  },
  {
    month: 'اردیبهشت',
    creationTime: 2,
    responseTime: 3,
  },
  {
    month: 'خرداد',
    creationTime: 3,
    responseTime: 2,
  },
  {
    month: 'تیر',
    creationTime: 4,
    responseTime: 3,
  },
  {
    month: 'مرداد',
    creationTime: 4,
    responseTime: 3,
  },
  {
    month: 'شهریور',
    creationTime: 6,
    responseTime: 5,
  },
  {
    month: 'مهر',
    creationTime: 3,
    responseTime: 2,
  },
  {
    month: 'آبان',
    creationTime: 4,
    responseTime: 3,
  },
  {
    month: 'آذر',
    creationTime: 5,
    responseTime: 4,
  },
  {
    month: 'دی',
    creationTime: 5,
    responseTime: 4,
  },
  {
    month: 'بهمن',
    creationTime: 6,
    responseTime: 5,
  },
  {
    month: 'اسفند',
    creationTime: 7,
    responseTime: 6,
  },
];

export default function ResponseRate({ className }: { className?: string }) {
  const isTablet = useMedia('(max-width: 820px)', false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  return (
    <WidgetCard
      title="نرخ پاسخدهی"
      className={className}
      description={
        <>
          <span className="flex items-center gap-1">
            <span className="inline-flex h-3 w-3 rounded-[2px] bg-[#3872FA]" />
            زمان ایجاد
          </span>
          <span className="flex items-center gap-1">
            <span className="ms-1 inline-flex h-3 w-3 rounded-[2px] bg-[#10b981]" />
            زمان پاسخ
          </span>
        </>
      }
      descriptionClassName="text-gray-500 mt-1.5 flex flex-col md:flex-row items-center gap-2"
      action={
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          dateFormat="yyyy"
          placeholderText="انتخاب سال"
          showYearPicker
          maxDate={new Date()}
          inputProps={{ variant: 'text', inputClassName: 'p-0 px-1 h-auto' }}
          popperPlacement="bottom-end"
          className="w-[100px]"
        />
      }
    >
      <SimpleBar>
        <div className="h-96 w-full pt-9">
          <ResponsiveContainer
            width="100%"
            height="100%"
            {...(isTablet && { minWidth: '700px' })}
          >
            <AreaChart
              data={data}
              margin={{
                left: 5,
                right: -5,
                bottom: 10,
              }}
              className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0"
            >
              <defs>
                <linearGradient id="newCustomer" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffdadf" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="oldCustomer" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dbeafe" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#3872FA" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tickMargin={20}
              />
              <YAxis axisLine={false} tickLine={false} unit="ساعت" />
              <Tooltip
                content={
                  <CustomTooltip
                    persianTexts={{
                      responseTime: 'زمان پاسخدهی',
                      creationTime: 'زمان ایجاد',
                    }}
                  />
                }
              />
              <Area
                type="natural"
                dataKey="responseTime"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#newCustomer)"
              />
              <Area
                type="natural"
                dataKey="creationTime"
                stroke="#3872FA"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#oldCustomer)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </SimpleBar>
    </WidgetCard>
  );
}
