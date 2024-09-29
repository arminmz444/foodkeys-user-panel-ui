'use client';

import cn from '@/utils/class-names';
import TicketIcon from '@/components/icons/ticket';
import TagIcon from '@/components/icons/tag';
import MetricCard from '@/components/cards/metric-card';
import TagIcon2 from '@/components/icons/tag-2';
import TagIcon3 from '@/components/icons/tag-3';

const ticketStats = [
  {
    id: 1,
    icon: <TicketIcon className="h-full w-full" />,
    title: 'تعدا کل تیکت ها',
    metric: '12,450',
  },
  {
    id: 2,
    icon: <TagIcon className="h-full w-full" />,
    title: 'تیکت های وصل نشده',
    metric: '3,590',
  },
  {
    id: 3,
    icon: <TagIcon2 className="h-full w-full" />,
    title: 'تیکت های باز',
    metric: '7,890',
  },
  {
    id: 3,
    icon: <TagIcon3 className="h-full w-full" />,
    title: 'تیکت های حل شده',
    metric: '1,160',
  },
];

export default function StatCards({ className }: { className?: string }) {
  return (
    <div
      className={cn('grid grid-cols-1 gap-5 3xl:gap-8 4xl:gap-9', className)}
    >
      {ticketStats.map((stat) => (
        <MetricCard
          key={stat.title + stat.id}
          title={stat.title}
          metric={stat.metric}
          icon={stat.icon}
          iconClassName="bg-transparent w-11 h-11"
        />
      ))}
    </div>
  );
}
