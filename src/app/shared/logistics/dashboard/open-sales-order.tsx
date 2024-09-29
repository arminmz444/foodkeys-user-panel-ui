'use client';

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import WidgetCard from '@/components/cards/widget-card';
import { Progressbar } from '@/components/ui/progressbar';
import { useMedia } from '@/hooks/use-media';
import SimpleBar from '@/components/ui/simplebar';
import { CustomTooltip } from '@/components/charts/custom-tooltip';

const data = [
  {
    month: 'دوشنبه',
    pending: 5,
  },
  {
    month: 'سه شنبه',
    pending: 30,
  },
  {
    month: 'چهارشنبه',
    pending: 60,
  },
  {
    month: 'پنج شنبه',
    pending: 70,
  },
  {
    month: 'جمعه',
    pending: 90,
  },
  {
    month: 'شنبه',
    pending: 30,
  },
  {
    month: 'یکشنبه',
    pending: 35,
  },
];

export default function OpenSalesOrder({ className }: { className?: string }) {
  const isTablet = useMedia('(max-width: 800px)', false);

  return (
    <WidgetCard
      title="سفارش باز"
      description={880770}
      titleClassName="font-normal text-gray-500 text-sm sm:text-sm 2xl:text-base font-inter font-iransans"
      descriptionClassName="text-xl font-semibold text-gray-900 mt-1.5 font-iransans 2xl:text-2xl"
      className={className}
    >
      <div className="mt-5">
        <p className="text-base">85.5% از جعبه‌ها به بار تبدیل شده‌اند.</p>
        <Progressbar
          value={85.5}
          rounded="md"
          color="primary"
          aria-label={'Progress bar'}
          className="mt-2 h-5"
        />
        <p className="mt-4">
          جعبه های منتظر:{' '}
          <span className="font-semibold text-gray-900">78,000</span>
        </p>
      </div>
      <div className="mt-5">
        <p>جعبه های در انتظار:</p>
        <SimpleBar className="mt-4 h-40">
          <div className="h-40 w-full">
            <ResponsiveContainer
              width="100%"
              height="100%"
              {...(isTablet && { minWidth: '700px' })}
            >
              <AreaChart
                data={data}
                margin={{
                  right: -30,
                }}
                className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0"
              >
                <defs>
                  <linearGradient id="pending" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#eab308" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  className=" "
                />
                <YAxis tickLine={false} />
                <Tooltip
                  content={
                    <CustomTooltip persianTexts={{ pending: 'منتظر' }} />
                  }
                />
                <Area
                  type="monotone"
                  dataKey="pending"
                  stroke="#eab308"
                  strokeWidth={2}
                  fill="url(#pending)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SimpleBar>
      </div>
    </WidgetCard>
  );
}
