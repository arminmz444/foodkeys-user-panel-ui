'use client';

import WidgetCard from '@/components/cards/widget-card';
import { CustomTooltip } from '@/components/charts/custom-tooltip';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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

export default function SimpleLineChart({ className }: { className?: string }) {
  return (
    <WidgetCard title={'چارت خطی ساده'} className={className}>
      <div className="mt-5 aspect-[1060/660] w-full lg:mt-7">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              right: -10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickMargin={15} />
            <Tooltip
              content={
                <CustomTooltip persianTexts={{ pv: 'پی وی', uv: 'یو وی' }} />
              }
            />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#3b82f6"
              activeDot={{ r: 8 }}
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              strokeWidth={2}
              dataKey="uv"
              stroke="#10b981"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
}
