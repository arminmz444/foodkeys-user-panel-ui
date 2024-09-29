'use client';

import WidgetCard from '@/components/cards/widget-card';
import { PiChartBarLight } from 'react-icons/pi';
import { Text } from '@/components/ui/text';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { CustomTooltip } from '@/components/charts/custom-tooltip';

const data = [
  {
    day: 'دوشنبه',
    bounceRate: 40,
    pageSession: 40,
  },
  {
    day: 'سه شنبه',
    bounceRate: 90,
    pageSession: 30,
  },
  {
    day: 'پنج شنبه',
    bounceRate: 64,
    pageSession: 43,
  },
  {
    day: 'چهار شنبه',
    bounceRate: 99,
    pageSession: 50,
  },
  {
    day: 'جمعه',
    bounceRate: 50,
    pageSession: 70,
  },
  {
    day: 'یک شنبه',
    bounceRate: 70,
    pageSession: 80,
  },
];

export default function Acquisition({ className }: { className?: string }) {
  return (
    <WidgetCard
      title={'تحصیل'}
      description={
        'به شما میگه بازدید کنندگان معمولا از کجا هستن . برای موتور جستجو گر عالیه'
      }
      rounded="lg"
      descriptionClassName="text-gray-500 mt-0.5 leading-relaxed"
      // action={}
      className={className}
    >
      <div className="mb-6 mt-5 flex items-start">
        <div className="ml-9 flex items-start">
          <div className="me-3 rounded bg-primary-lighter p-2 text-primary dark:bg-primary-dark dark:text-primary-lighter/90">
            <PiChartBarLight className="h-6 w-6" />
          </div>
          <div>
            <Text tag="h6" className="font-semibold">
              13.89%
            </Text>
            <Text className="text-gray-500">نرخ تغییر</Text>
          </div>
        </div>
        <div className="flex items-start">
          <div className="me-3 rounded bg-primary-lighter p-2 text-primary dark:bg-primary-dark dark:text-primary-lighter/90">
            <PiChartBarLight className="h-6 w-6" />
          </div>
          <div>
            <Text tag="h6" className="font-semibold">
              19,065
            </Text>
            <Text className="text-gray-500">زمان ماندن</Text>
          </div>
        </div>
      </div>

      <div className="h-80 w-full @sm:pt-3">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              right: -30,
            }}
          >
            <XAxis dataKey="day" tickLine={false} />
            <YAxis tickLine={false} tickMargin={15} />
            <Tooltip
              content={
                <CustomTooltip
                  persianTexts={{
                    bounceRate: 'نرخ تغییر',
                    pageSession: 'زمان ماندن',
                  }}
                />
              }
            />
            <Area
              type="natural"
              dataKey="bounceRate"
              stackId="acquisitionStackID"
              stroke="#015DE1"
              fill="#015DE1"
              strokeWidth={1.5}
              fillOpacity={0.7}
            />
            <Area
              type="natural"
              dataKey="pageSession"
              stackId="acquisitionStackID"
              stroke="#69B2F8"
              fill="#69B2F8"
              strokeWidth={1.5}
              fillOpacity={0.7}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
}
