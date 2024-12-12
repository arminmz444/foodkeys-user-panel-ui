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
import { PiCaretDoubleUpDuotone, PiDownloadSimpleBold } from 'react-icons/pi';
import WidgetCard from '@/components/cards/widget-card';
import SimpleBar from '@/components/ui/simplebar';
import { useMedia } from '@/hooks/use-media';
import { CustomTooltip } from '@/components/charts/custom-tooltip';
import { toCurrency } from '@/utils/to-currency';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';

type DataType = {
  name: string;
  Visit: number;
};

const data: DataType[] = [
  {
    name: 'ماه 1',
    Visit: 682,
  },
  {
    name: 'ماه 2',
    Visit: 690,
  },
  {
    name: 'ماه 3',
    Visit: 910,
  },
  {
    name: 'ماه 4',
    Visit: 656,
  },
  {
    name: 'ماه 5',
    Visit: 804,
  },
  {
    name: 'ماه 6',
    Visit: 747,
  },
  {
    name: 'ماه 7',
    Visit: 902,
  },
  {
    name: 'ماه 8',
    Visit: 820,
  },
  {
    name: 'ماه 9',
    Visit: 582,
  },
  {
    name: 'ماه 10',
    Visit: 775,
  },
  {
    name: 'ماه 11',
    Visit: 615,
  },
  {
    name: 'ماه 12',
    Visit: 973,
  },
];

const formatYAxisTick = (value: number): string => {
  if (value >= 1000) {
    return `$${value / 1000}k`; // Convert value to thousands (k)
  }
  return value.toString(); // Keep small values as is
};

export default function VisitChart({ className }: { className?: string }) {
  const isTablet = useMedia('(max-width: 800px)', false);

  return (
    <WidgetCard title="" className={className}>
      <div className="grid grid-cols-10 gap-y-8">
        <div className="col-span-full flex flex-col @2xl:flex-row @2xl:justify-between @4xl:col-span-full @7xl:col-span-2 @7xl:flex-col">
          <div>
            <p className="text-sm 2xl:text-base">
              آمار بازدید‌های شرکت‌های شما
            </p>
            <Text tag="h3" className="mt-2 text-2xl font-semibold">
              105,000 کل بازدید
            </Text>
            <p className="font-iransans mt-2 flex items-center gap-1 font-normal text-green 2xl:text-base">
              <PiCaretDoubleUpDuotone className="me-1 h-4 w-4" />
              1400 بازدید
            </p>
            <p className="mt-2">میانگین ماهانه</p>
          </div>

          <Button
            variant="outline"
            className="mt-6 gap-2 @2xl:mt-0 @5xl:mt-auto"
          >
            <PiDownloadSimpleBold /> دانلود گزارش
          </Button>
        </div>
        <div className="col-span-full @3xl:col-span-full @7xl:col-span-8">
          <SimpleBar>
            <div className="h-[400px] w-full @4xl:h-[260px] @7xl:h-[24rem]">
              <ResponsiveContainer
                width="100%"
                height="100%"
                {...(isTablet && { minWidth: '700px' })}
              >
                <AreaChart
                  data={data}
                  margin={{
                    right: -10,
                    left: 15,
                    bottom: 25,
                  }}
                >
                  <defs>
                    <linearGradient
                      id="colorGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="0 0"
                    strokeOpacity={0.435}
                    vertical={false}
                  />
                  <XAxis
                    axisLine={false}
                    dataKey="name"
                    tickMargin={10}
                    tickLine={false}
                    angle={-45}
                    textAnchor="end"
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tickMargin={15}
                    tickFormatter={formatYAxisTick}
                    ticks={[0, 50, 100, 500, 1000]}
                  />
                  <Tooltip
                    content={
                      <CustomTooltip
                        persianTexts={{
                          Visit: 'بازدید',
                        }}
                      />
                    }
                    cursor={false}
                  />
                  <Area
                    strokeWidth={2}
                    type="monotone"
                    dataKey="Visit"
                    stroke="#10b981"
                    fill="url(#colorGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </SimpleBar>
        </div>
      </div>
    </WidgetCard>
  );
}
