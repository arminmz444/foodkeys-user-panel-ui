import { PiPlusBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { Button } from '@/components/ui/button';
import PageHeader from '@/app/shared/page-header';
import { TabList } from '@/app/shared/support/inbox/inbox-tabs';
import SupportInbox from '@/app/shared/support/inbox';

const pageHeader = {
  title: 'صندوق پشتیبانی',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'خانه',
    },
    {
      href: routes.support.dashboard,
      name: 'پشتیبانی',
    },
    {
      name: 'صندوق',
    },
  ],
};

export default function SupportInboxPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Button className="mt-4 w-full @lg:mt-0 @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100">
          <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
          ساخت تیکت
        </Button>
      </PageHeader>

      <TabList />

      <SupportInbox />
    </>
  );
}
