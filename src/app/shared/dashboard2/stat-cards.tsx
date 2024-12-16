'use client';

import MetricCard from '@/components/cards/metric-card';
import { Text } from '@/components/ui/text';
import cn from '@/utils/class-names';
import { ReactNode } from 'react';
import { IconType } from 'react-icons';
import {
  PiCaretDoubleUpDuotone,
  PiCaretDoubleDownDuotone,
  PiGiftDuotone,
  PiBankDuotone,
  PiChartPieSliceDuotone,
  PiBuildings,
  PiPerson,
  PiEye,
  PiWallet,
} from 'react-icons/pi';
import { BarChart, Bar, ResponsiveContainer, Tooltip } from 'recharts';

const orderData = [
  {
    day: 'یکشنبه',
    count: 2000,
  },
  {
    day: 'دوشنبه',
    count: 3000,
  },
  {
    day: 'سه شنبه',
    count: 2000,
  },
  {
    day: 'چهار شنبه',
    count: 2780,
  },
  {
    day: 'پنج شنبه',
    count: 1890,
  },
  {
    day: 'جمعه',
    count: 2390,
  },
  {
    day: 'شنبه',
    count: 3490,
  },
];

const salesData = [
  {
    day: 'یکشنبه',
    sale: 2000,
    cost: 2400,
  },
  {
    day: 'دوشنبه',
    sale: 3000,
    cost: 1398,
  },
  {
    day: 'سه شنبه',
    sale: 2000,
    cost: 9800,
  },
  {
    day: 'چهار شنبه',
    sale: 2780,
    cost: 3908,
  },
  {
    day: 'پنج شنبه',
    sale: 1890,
    cost: 4800,
  },
  {
    day: 'جمعه',
    sale: 2390,
    cost: 3800,
  },
  {
    day: 'شنبه',
    sale: 3490,
    cost: 4300,
  },
];
const salesData2 = [
  {
    day: 'یکشنبه',
    count: 2000,
  },
  {
    day: 'دوشنبه',
    count: 3000,
  },
  {
    day: 'سه شنبه',
    count: 2000,
  },
  {
    day: 'چهار شنبه',
    count: 2780,
  },
  {
    day: 'پنج شنبه',
    count: 1890,
  },
  {
    day: 'جمعه',
    count: 2390,
  },
  {
    day: 'شنبه',
    count: 3490,
  },
];

const revenueData = [
  {
    day: 'یکشنبه',
    count: 2000,
  },
  {
    day: 'دوشنبه',
    count: 3000,
  },
  {
    day: 'سه شنبه',
    count: 2000,
  },
  {
    day: 'چهار شنبه',
    count: 2780,
  },
  {
    day: 'پنج شنبه',
    count: 1890,
  },
  {
    day: 'جمعه',
    count: 2390,
  },
  {
    day: 'شنبه',
    count: 3490,
  },
];

const eComDashboardStatData = [
  {
    id: 'companyCount',
    icon: <PiBuildings className="h-6 w-6" />,
    title: 'تعداد شرکت‌ها',
    metric: '2',
    increased: true,
    decreased: false,
    percentage: '+32.40',
    style: 'text-[#3872FA]',
    fill: '#3872FA',
    chart: orderData,
    countName: 'شرکت‌ها',
  },
  {
    id: 'visitCount',
    icon: <PiEye className="h-6 w-6" />,
    title: 'تعداد بازدید‌ها',
    metric: '57,890',
    increased: false,
    decreased: true,
    percentage: '-4.40',
    style: 'text-[#10b981]',
    fill: '#10b981',
    chart: salesData2,
    countName: 'بازدید',
  },
  {
    id: 'credit',
    icon: <PiWallet className="h-6 w-6" />,
    title: 'اعتبار کیف پول',
    metric: '12,390 تومان',
    style: 'text-[#7928ca]',
    fill: '#7928ca',
    chart: revenueData,
    countName: 'اعتبار',
  },
];

export default function StatCards({
  className,
  dashboardStatsData,
}: {
  className?: string;
  dashboardStatsData: {
    companyCount: number,
    visitCount: number,
    credit: number
    // id: string;
    // Icon: ReactNode;
    // title: string;
    // metric: string;
    // style: string;
    // fill: string;
    // chart: { day: string; count: number }[];
    // countName: string;
  }[];
}) {
  return (
    <div
      className={cn('grid grid-cols-1 gap-5 3xl:gap-8 4xl:gap-9', className)}
    >
      {eComDashboardStatData.map((stat) => (
        <MetricCard
          key={stat.title}
          title={stat.title}
          metric={dashboardStatsData[stat.id] || 'در حال بروزرسانی ...'}
          metricClassName="lg:text-[22px]"
          icon={stat.icon}
          // icon={stat.Icon}
          iconClassName={cn(
            '[&>svg]:w-10 [&>svg]:h-8 lg:[&>svg]:w-11 lg:[&>svg]:h-9 w-auto h-auto p-0 bg-transparent -mx-1.5',
            stat.id === 'companyCount' &&
              '[&>svg]:w-9 [&>svg]:h-7 lg:[&>svg]:w-[42px] lg:[&>svg]:h-[34px]',
            stat.style
          )}
          chart={
            <ResponsiveContainer width="100%" height="100%">
              <BarChart barSize={5} barGap={2} data={stat.chart}>
                <Tooltip
                  cursor={{ fill: 'rgba(200,200,200,0.3)' }}
                  // formatter={(value) => `بازدید: ${value} units`}
                  labelStyle={{ fontWeight: 'bold' }}
                  wrapperClassName="relative top-10"
                  content={<CustomTooltip countName={stat.countName} />}
                />
                <Bar
                  dataKey="count"
                  fill={stat.fill}
                  radius={[5, 5, 0, 0]}
                  className="hover:cursor-pointer"
                />
              </BarChart>
            </ResponsiveContainer>
          }
          chartClassName="hidden @[200px]:flex @[200px]:items-center h-14 w-24"
          className="@container [&>div]:items-center"
        >
          {/*<Text className="mt-5 flex items-center border-t border-dashed border-gray-200 pt-4 leading-none text-gray-500">*/}
          {/*  <Text*/}
          {/*    tag="span"*/}
          {/*    className={cn(*/}
          {/*      'me-2 inline-flex items-center font-medium',*/}
          {/*      stat.increased ? 'text-green' : 'text-red'*/}
          {/*    )}*/}
          {/*  >*/}
          {/*    {stat.increased ? (*/}
          {/*      <PiCaretDoubleUpDuotone className="me-1 h-4 w-4" />*/}
          {/*    ) : (*/}
          {/*      <PiCaretDoubleDownDuotone className="me-1 h-4 w-4" />*/}
          {/*    )}*/}
          {/*    {stat.percentage}%*/}
          {/*  </Text>*/}
          {/*  <Text tag="span" className="me-1 hidden @[240px]:inline-flex">*/}
          {/*    {stat.increased ? 'افزایش یافته' : 'کاهش یافته'}*/}
          {/*  </Text>{' '}*/}
          {/*  ماه پیش*/}
          {/*</Text>*/}
        </MetricCard>
      ))}
    </div>
  );
}
// @ts-ignore
const CustomTooltip = ({ active, payload, label, countName }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: 'white',
          border: '1px solid #ccc',
          padding: '10px',
          borderRadius: '5px',
          fontSize: '12px',
          textAlign: 'right',
          position: 'relative',
          bottom: '3rem',
        }}
      >
        <p style={{ margin: 0, fontWeight: 'bold' }}>{`روز: ${label}`}</p>
        <p style={{ margin: 0 }}>{`${countName}: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};
