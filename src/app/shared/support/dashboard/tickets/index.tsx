import TicketsTable from '@/app/shared/support/dashboard/tickets/table';
import WidgetCard from '@/components/cards/widget-card';
import cn from '@/utils/class-names';

interface IndexProps {
  className?: string;
}

export default function PendingShipments({ className }: IndexProps) {
  return (
    <WidgetCard
      title="تیکت ها"
      description="خلاصه ای از تیکت ها که به شما اساین شده است...."
      descriptionClassName="mb-6 mt-2"
      className={cn(className)}
    >
      <TicketsTable />
    </WidgetCard>
  );
}
