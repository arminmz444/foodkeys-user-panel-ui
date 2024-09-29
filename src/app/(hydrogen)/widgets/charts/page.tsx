import { routes } from '@/config/routes';
import { Button } from '@/components/ui/button';
import PageHeader from '@/app/shared/page-header';
import ChartWidgets from '@/app/shared/chart-widgets';

const pageHeader = {
  title: 'نمودار ها',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'خانه',
    },
    {
      name: 'ویجت ها',
    },
    {
      name: 'نمودار ها',
    },
  ],
};

export default function ChartsPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <a
            target="_blank"
            href="https://recharts.org/en-US"
            rel="nofollow noopener noreferrer"
            className="inline-flex w-full @lg:w-auto"
          >
            <Button
              tag="span"
              className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white"
            >
              بیشتر بدانید
            </Button>
          </a>
        </div>
      </PageHeader>

      <ChartWidgets />
    </>
  );
}
