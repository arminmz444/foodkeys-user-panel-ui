'use client';

import MetricCard from '@/components/cards/metric-card';
import { RoundedTopBarFill } from '@/components/charts/rounded-topbar';
import { Text } from '@/components/ui/text';
import cn from '@/utils/class-names';
import { BarChart, Bar, ResponsiveContainer } from 'recharts';

const trafficData = [
  {
    day: 'یکشنبه',
    sale: 4000,
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

const conventionRateData = [
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

const barData = [
  {
    day: 'یکشنبه',
    sale: 2000,
    cost: 2400,
  },
  {
    day: 'دوشنبه',
    sale: 2800,
    cost: 1398,
  },
  {
    day: 'سه شنبه',
    sale: 3500,
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

const analyticsStatData = [
  {
    id: '1',
    title: 'نرافیک سایت',
    metric: '91.6 هزار',
    info: 'تعداد بازدید گننده های سایت.',
    increased: true,
    decreased: false,
    percentage: '+32.40',
    fill: '#015DE1',
    chart: trafficData,
  },
  {
    id: '2',
    title: 'نرخ تبدیل',
    metric: '12.56%',
    info: 'تعداد بازدید کننده هایی که ثبت نام کرده اند',
    increased: false,
    decreased: true,
    percentage: '-4.40',
    fill: '#048848',
    chart: conventionRateData,
  },
  {
    id: '3',
    title: 'نرخ تغییر',
    metric: '45.33%',
    info: 'تعداد بازدید کندده هایی که بدون بازدید خارج شده اند',
    increased: true,
    decreased: false,
    percentage: '+32.40',
    fill: '#B92E5D',
    chart: barData,
  },
  {
    id: '4',
    title: 'زمان ماندن',
    metric: '2.30 ساعت',
    info: 'مقدار زمانی که بازدید کنندگان در سایت ما گذراندن.',
    increased: true,
    decreased: false,
    percentage: '+32.40',
    fill: '#8200E9',
    chart: barData,
  },
];

export default function StatCards({ className }: { className?: string }) {
  return (
    <div
      className={cn('grid grid-cols-1 gap-5 3xl:gap-8 4xl:gap-9', className)}
    >
      {analyticsStatData.map((stat) => (
        <MetricCard
          key={stat.title + stat.id}
          title={stat.title}
          metric={stat.metric}
          rounded="lg"
          metricClassName="text-2xl mt-1"
          info={
            <Text className="mt-4 max-w-[150px] text-sm text-gray-500">
              {stat.info}
            </Text>
          }
          chart={
            <>
              <div
                style={{ color: stat.fill }}
                className="mb-3 text-sm font-medium"
              >
                {stat.percentage}%
              </div>
              <div className="h-12 w-20 @[16.25rem]:h-16 @[16.25rem]:w-24 @xs:h-20 @xs:w-28">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart barSize={6} barGap={5} data={stat.chart}>
                    <Bar
                      dataKey="sale"
                      fill={stat.fill}
                      shape={<RoundedTopBarFill cornerRadius={2} />}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          }
          chartClassName="flex flex-col w-auto h-auto text-center"
          className="@container @7xl:text-[15px] [&>div]:items-end"
        />
      ))}
    </div>
  );
}
