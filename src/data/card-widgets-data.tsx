import {
  PiBankDuotone,
  PiFileTextDuotone,
  PiGiftDuotone,
  PiPulseDuotone,
} from 'react-icons/pi';

export const widgetCardStat = [
  {
    title: 'درآمد',
    metric: 'تومان2780.00',
    bgColor: 'bg-[#3872FA]',
    textColor: 'text-[#3872FA]',
    icon: <PiBankDuotone className="h-6 w-6" />,
  },
  {
    title: 'سود',
    metric: 'تومان2780.00',
    bgColor: 'bg-[#10b981]',
    textColor: 'text-[#10b981]',
    icon: <PiGiftDuotone className="h-6 w-6" />,
  },
  {
    title: 'فاکتور ها',
    metric: 'تومان2780.00',
    bgColor: 'bg-[#f1416c]',
    textColor: 'text-[#f1416c]',
    icon: <PiFileTextDuotone className="h-6 w-6" />,
  },
  {
    title: 'هزینه',
    metric: 'تومان2780.00',
    bgColor: 'bg-[#7928ca]',
    textColor: 'text-[#7928ca]',
    icon: <PiPulseDuotone className="h-6 w-6" />,
  },
];

export const widgetData = [
  {
    name: 'فروش',
    color: '#3872FA',
    stat: widgetCardStat,
  },
  {
    name: 'سود',
    color: '#10b981',
    statTitle: 'Profit',
    statMetric: 'تومان2780.00',
    stat: widgetCardStat,
  },
  {
    name: 'مشتری',
    color: '#f1416c',
    statTitle: 'Overdue Invoices',
    statMetric: 'تومان2780.00',
    stat: widgetCardStat,
  },
  {
    name: 'ایجاد',
    color: '#7928ca',
    statTitle: 'Expense',
    statMetric: 'تومان2780.00',
    stat: widgetCardStat,
  },
];

export const chartData = [
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
