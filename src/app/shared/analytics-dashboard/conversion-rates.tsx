'use client';

import WidgetCard from '@/components/cards/widget-card';
import ButtonGroupAction from '@/components/charts/button-group-action';
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { CustomTooltip } from '@/components/charts/custom-tooltip';

const data = [
  {
    country: 'ایتالیا',
    amount: 590,
  },
  {
    country: 'ژاپن',
    amount: 868,
  },
  {
    country: 'چین',
    amount: 1397,
  },
  {
    country: 'کانادا',
    amount: 1480,
  },
  {
    country: 'امریکا',
    amount: 1520,
  },
  {
    country: 'انگلیس',
    amount: 1400,
  },
];

const filterOptions = ['هفته', 'ماه', 'سال'];

export default function ConversionRates({ className }: { className?: string }) {
  function handleFilterBy(data: string) {
    console.log('Conversion Rates Filter:', data);
  }

  return (
    <WidgetCard
      title={'نرخ تبدیل'}
      description={'+43.4% پارسال'}
      rounded="lg"
      action={
        <ButtonGroupAction
          options={filterOptions}
          onChange={(data) => handleFilterBy(data)}
          className="-ms-2 mb-3 @lg:mb-0 @lg:ms-0"
        />
      }
      descriptionClassName="text-gray-500 mt-1.5 mb-3 @md:mb-0"
      headerClassName="flex-col @md:flex-row"
      className={className}
    >
      <div className="h-96 w-full @sm:py-3">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            layout="vertical"
            margin={{ right: -2 }}
            data={data}
            className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12"
          >
            <XAxis type="number" axisLine={false} tickLine={false} />
            <YAxis
              dataKey="country"
              type="category"
              axisLine={false}
              tickLine={false}
              // tickMargin={15}
            />
            <Tooltip
              content={<CustomTooltip persianTexts={{ amount: 'مقدار' }} />}
            />
            <Bar dataKey="amount" barSize={16} radius={4} fill="#3872FA" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
}
