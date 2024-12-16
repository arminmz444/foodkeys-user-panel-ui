'use client';

import { useState } from 'react';
import WidgetCard from '@/components/cards/widget-card';
import { CustomTooltip } from '@/components/charts/custom-tooltip';
import { CustomYAxisTick } from '@/components/charts/custom-yaxis-tick';
import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
} from 'recharts';
import { RoundedTopBarFill } from '@/components/charts/rounded-topbar';
import SimpleBar from '@/components/ui/simplebar';
import DropdownAction from '@/components/charts/dropdown-action';

const dailyData = [
  {
    label: 'آرمین مظفری',
    delivered: 56,
    overdue: 49,
    assigned: 35,
  },
  {
    label: 'اکبر عبدی',
    delivered: 42,
    overdue: 67,
    assigned: 90,
  },
  {
    label: 'ملیحه شهابی',
    delivered: 56,
    overdue: 71,
    assigned: 76,
  },
  {
    label: 'امیر امیری',
    delivered: 93,
    overdue: 23,
    assigned: 67,
  },
  {
    label: 'یوسف یوسفی',
    delivered: 90,
    overdue: 97,
    assigned: 71,
  },
];

const monthlyData = [
  {
    label: 'آرمین مظفری',
    delivered: 685,
    overdue: 180,
    assigned: 1242,
  },
  {
    label: 'فرشته منصوری',
    delivered: 1052,
    overdue: 975,
    assigned: 1405,
  },
  {
    label: 'رقیه عبداللهی',
    delivered: 391,
    overdue: 1250,
    assigned: 287,
  },
  {
    label: 'نرگس نرگسی',
    delivered: 608,
    overdue: 1022,
    assigned: 1405,
  },
  {
    label: 'احسان احسانی',
    delivered: 1500,
    overdue: 136,
    assigned: 1471,
  },
];

const ticketStatus = [
  { name: 'Assigned', label: 'اساین شده' },
  { name: 'Delivered', label: 'رسیده' },
  { name: 'Overdue', label: 'در حال ارسال' },
];
const COLORS = ['#028ca6', '#10b981', '#7928ca'];

const viewOptions = [
  {
    value: 'Daily',
    name: 'روزانه',
  },
  {
    value: 'Monthly',
    name: 'ماهانه',
  },
];

export default function EmployeesActivity({
  className,
}: {
  className?: string;
}) {
  const [data, setData] = useState(dailyData);
  function handleChange(viewType: string) {
    if (viewType === 'Daily') {
      setData(monthlyData);
    } else {
      setData(dailyData);
    }
  }

  return (
    <WidgetCard
      title="پشتیبانی تکنولوژی همکاران"
      description={
        <>
          <div className="mb-2.5 mt-1.5 flex flex-wrap items-start">
            {ticketStatus.map((item, index) => (
              <div key={item.name} className="me-7">
                <div className="mb-1.5 flex items-center gap-1.5">
                  <span
                    className="h-3 w-3 rounded-[2px]"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span>{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      }
      action={<DropdownAction options={viewOptions} onChange={handleChange} />}
      className={className}
    >
      <SimpleBar>
        <div className="h-96 w-full @sm:pt-3 @lg:pt-8 2xl:h-80 3xl:h-[26rem]">
          <ResponsiveContainer width="100%" height="100%" minWidth="700px">
            <ComposedChart
              data={data}
              margin={{
                right: -30,
              }}
              barSize={14}
              className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12"
            >
              <CartesianGrid
                vertical={false}
                strokeOpacity={0.435}
                strokeDasharray="8 10"
              />
              <XAxis dataKey="label" axisLine={false} tickLine={false} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={<CustomYAxisTick />}
              />
              <Tooltip
                content={
                  <CustomTooltip
                    persianTexts={{
                      assigned: 'اساین شده',
                      delivered: 'رسیده',
                      overdue: 'در حال ارسال',
                    }}
                  />
                }
                cursor={false}
              />
              {ticketStatus.map((item, index) => (
                <Bar
                  key={item.name}
                  dataKey={item.name.toLowerCase()}
                  barSize={25}
                  fill={COLORS[index]}
                  shape={
                    <RoundedTopBarFill
                      cornerRadius={4}
                      className="dark:[fill-opacity:0.9]"
                    />
                  }
                />
              ))}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </SimpleBar>
    </WidgetCard>
  );
}
