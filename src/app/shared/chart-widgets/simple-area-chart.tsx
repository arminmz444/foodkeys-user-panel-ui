'use client';

import WidgetCard from '@/components/cards/widget-card';
import { CustomTooltip } from '@/components/charts/custom-tooltip';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'مورد 1',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'مورد 2',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'مورد 3',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'مورد 4',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'مورد 5',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'مورد 6',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'مورد 7',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function SimpleAreaChart({ className }: { className?: string }) {
  return (
    <WidgetCard title={'نمودار حجمی ساده'} className={className}>
      <div className="mt-5 aspect-[1060/660] w-full lg:mt-7">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              right: -20,
            }}
            className="[&_.recharts-cartesian-grid-vertical]:opacity-0"
          >
            <defs>
              <linearGradient id="simpleAreaChart" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#3872FA"
                  className="[stop-opacity:0.3] dark:[stop-opacity:0.2]"
                />
                <stop offset="95%" stopColor={'#3872FA'} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickMargin={15} />
            <Tooltip
              content={
                <CustomTooltip
                  persianTexts={{ pv: 'پی وی', uv: 'یو وی', amt: 'ای ام تی' }}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#3872FA"
              fill="url(#simpleAreaChart)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
}
