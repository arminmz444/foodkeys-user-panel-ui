'use client';

import WidgetCard from '@/components/cards/widget-card';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const colors = [
  '#5a5fd7',
  '#10b981',
  '#eab308',
  '#FF8042',
  'red',
  'pink',
  '#d946ef',
];

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

type PathData = (x: number, y: number, width: number, height: number) => string;

const getPath: PathData = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
  Z`;
};

const TriangleBar = (props: any) => {
  const { fill, x, y, width, height } = props;
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

export default function CustomShapeBarChart({
  className,
}: {
  className?: string;
}) {
  return (
    <WidgetCard title={'نمئار حجمی شکلی سفارشی'} className={className}>
      <div className="mt-5 aspect-[1060/660] w-full lg:mt-7">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barSize={32}
            margin={{
              right: -20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis tickLine={false} dataKey="name" />
            <YAxis tickLine={false} tickMargin={15} />
            <Bar
              dataKey="uv"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: 'top' }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
}
