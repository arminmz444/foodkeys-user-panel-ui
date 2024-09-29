'use client';

import { Text } from '@/components/ui/text';
import WidgetCard from '@/components/cards/widget-card';
import { CustomTooltip } from '@/components/charts/custom-tooltip';
import { CustomYAxisTick } from '@/components/charts/custom-yaxis-tick';
import {
  Area,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ComposedChart,
  ResponsiveContainer,
} from 'recharts';
import { RoundedTopBarFill } from '@/components/charts/rounded-topbar';

const data = [
  {
    day: 'دوشنبه',
    mobile: 32,
    desktop: 100,
    others: 100,
  },
  {
    day: 'سه شنبه',
    mobile: 90,
    desktop: 50,
    others: 50,
  },
  {
    day: 'پنج شنبه',
    mobile: 86,
    desktop: 63,
    others: 63,
  },
  {
    day: 'چهار شنبه',
    mobile: 99,
    desktop: 50,
    others: 50,
  },
  {
    day: 'جمعه',
    mobile: 56,
    desktop: 90,
    others: 90,
  },
  {
    day: 'یک شنبه',
    mobile: 60,
    desktop: 85,
    others: 85,
  },
];

const deviceData = [
  { name: 'موبایل', value: 9690 },
  { name: 'کامپیوتر', value: 6780 },
  { name: 'بقیه', value: 2150 },
];
const COLORS = ['#422F8A', '#b5adec', '#d4dcfa'];

export default function DeviceSessions({ className }: { className?: string }) {
  return (
    <WidgetCard
      title={'دستگاه های متصل به سایت'}
      description={
        'نشون میده که بازدید کنندگان معمولا از چه دستگاهایی برای متصل شده به سایت شما استفاده میکنند'
      }
      descriptionClassName="text-gray-500 mt-0.5 leading-relaxed"
      rounded="lg"
      // action={}
      className={className}
    >
      <div className="mb-2.5 mt-4 flex items-start">
        {deviceData.map((item, index) => (
          <div key={item.name} className="me-7">
            <div className="mb-1.5 flex items-center">
              <span
                className="me-2 h-2 w-2"
                style={{ backgroundColor: COLORS[index] }}
              />
              <Text tag="span">{item.name}</Text>
            </div>
            <Text tag="h5">{item.value}</Text>
          </div>
        ))}
      </div>

      <div className="h-80 w-full @sm:pt-3 @lg:pt-8">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{
              right: -28,
            }}
            barSize={14}
            className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500  [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12"
          >
            <defs>
              <linearGradient
                id="deviceSessionsMobile"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#F0F1FF"
                  className=" [stop-opacity:0.25] dark:[stop-opacity:0.2]"
                />
                <stop offset="95%" stopColor={COLORS[0]} stopOpacity={0} />
              </linearGradient>
              <linearGradient
                id="deviceSessionsDesktop"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#F0F1FF"
                  className="[stop-opacity:0.25] dark:[stop-opacity:0.2]"
                />
                <stop offset="95%" stopColor={COLORS[1]} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" axisLine={false} tickLine={false} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={<CustomYAxisTick />}
              // tickMargin={15}
            />
            <Tooltip
              content={
                <CustomTooltip
                  persianTexts={{
                    mobile: 'موبایل',
                    desktop: 'کامپویتر',
                    others: 'بقیه',
                  }}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="mobile"
              stroke={COLORS[0]}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#deviceSessionsMobile)"
            />
            <Area
              type="monotone"
              dataKey="desktop"
              stroke={COLORS[1]}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#deviceSessionsDesktop)"
            />
            <Bar
              dataKey="others"
              fill={COLORS[2]}
              shape={
                <RoundedTopBarFill
                  cornerRadius={4}
                  className="dark:[fill-opacity:0.6]"
                />
              }
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
}
