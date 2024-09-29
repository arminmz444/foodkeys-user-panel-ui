'use client';

import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ComposedChart,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import WidgetCard from '@/components/cards/widget-card';
import { CustomTooltip } from '@/components/charts/custom-tooltip';

const data = [
  {
    month: 'دوشنبه',
    responseTime: 10,
  },
  {
    month: 'سه شنبه',
    responseTime: 40,
  },
  {
    month: 'چهار شنبه',
    responseTime: 48,
  },
  {
    month: 'پنج شنبه',
    responseTime: 33,
  },
  {
    month: 'جمعه',
    responseTime: 25,
  },
  {
    month: 'شنبه',
    responseTime: 25,
  },
  {
    month: 'یک شنبه',
    responseTime: 50,
  },
];

export default function ComplaintRate({ className }: { className?: string }) {
  return (
    <WidgetCard title="درصد شکایت" className={className}>
      <div className="h-80 w-full pt-9 @4xl:h-[22rem]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{
              left: 5,
              right: -5,
              bottom: 10,
            }}
            className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0"
          >
            <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tickMargin={20}
              className=" "
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={20}
              className=" "
            />
            <Tooltip
              content={
                <CustomTooltip persianTexts={{ responseTime: 'زمان پاسخ' }} />
              }
            />
            <Line
              type="step"
              dataKey="responseTime"
              stroke="#eab308"
              strokeWidth={2.3}
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
}
