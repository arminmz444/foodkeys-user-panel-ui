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
  Profit: number;
};

const data: DataType[] = [
  {
    name: 'روز 1',
    Profit: 682,
  },
  {
    name: 'روز 2',
    Profit: 690,
  },
  {
    name: 'روز 3',
    Profit: 910,
  },
  {
    name: 'روز 4',
    Profit: 656,
  },
  {
    name: 'روز 5',
    Profit: 804,
  },
  {
    name: 'روز 6',
    Profit: 747,
  },
  {
    name: 'روز 7',
    Profit: 902,
  },
  {
    name: 'روز 8',
    Profit: 820,
  },
  {
    name: 'روز 9',
    Profit: 582,
  },
  {
    name: 'روز 10',
    Profit: 775,
  },
  {
    name: 'روز 11',
    Profit: 615,
  },
  {
    name: 'روز 12',
    Profit: 973,
  },
  {
    name: 'روز 13',
    Profit: 873,
  },
  {
    name: 'روز 14',
    Profit: 696,
  },
  {
    name: 'روز 15',
    Profit: 977,
  },
];

const formatYAxisTick = (value: number): string => {
  if (value >= 1000) {
    return `$${value / 1000}k`; // Convert value to thousands (k)
  }
  return value.toString(); // Keep small values as is
};

export default function ProfitChart({ className }: { className?: string }) {
  const isTablet = useMedia('(max-width: 800px)', false);

  return (
    <WidgetCard title="" className={className}>
      <div className="grid grid-cols-10 gap-y-8">
        <div className="col-span-full flex flex-col @2xl:flex-row @2xl:justify-between @4xl:col-span-full @7xl:col-span-2 @7xl:flex-col">
          <div>
            <p className="text-sm 2xl:text-base">آمار بازدید‌های شرکت‌های شما</p>
            <Text tag="h3" className="mt-2 text-2xl font-semibold">
              105,000 بازدید
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
                  />
                  <Tooltip
                    content={
                      <CustomTooltip
                        persianTexts={{
                          Profit: 'سود',
                        }}
                      />
                    }
                    cursor={false}
                  />
                  <Area
                    strokeWidth={2}
                    type="monotone"
                    dataKey="Profit"
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
