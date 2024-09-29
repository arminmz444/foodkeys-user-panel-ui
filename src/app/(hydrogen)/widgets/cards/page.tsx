import { routes } from '@/config/routes';
import { Text } from '@/components/ui/text';
import PageHeader from '@/app/shared/page-header';
import MetricCardsWithIcon from '@/app/shared/support/dashboard/stat-cards';
import MetricCardWithBarChart from '@/app/shared/analytics-dashboard/stat-cards';
import { FileStatGrid } from '@/app/shared/file/dashboard/file-stats';
import cn from '@/utils/class-names';
import ParticipantsList from './participants-list';
import TransactionsList from './transactions-list';
import TopProductList from './top-product-list';
import RecentAppList from './recent-app-list';
import CircleProgressBars from './circle-progressbars';
import AreaChartList from './area-chart-list';
import BarChartList from './bar-chart-list';
// import ProductCardsList from '@/app/shared/company/cards/company-cards-list';
// import ProductMinimalCard from '@/components/cards/company-minimal-card';
// import { minimalProducts } from '@/app/shared/company/cards/company-cards.data';

const pageHeader = {
  title: 'کارت ها',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'خانه',
    },
    {
      href: routes.widgets.cards,
      name: 'ویجت ها',
    },
    {
      name: 'کارت ها',
    },
  ],
};

function SectionBlock({
  title,
  titleClassName,
  children,
  className,
}: React.PropsWithChildren<{
  title?: string;
  titleClassName?: string;
  className?: string;
}>) {
  return (
    <section className={className}>
      <header className="mb-2.5 lg:mb-3">
        <Text
          tag="h5"
          className={cn(
            'mb-2 text-sm font-normal text-gray-700 sm:text-base',
            titleClassName
          )}
        >
          {title}
        </Text>
      </header>

      {children}
    </section>
  );
}

export default function CardsPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className="grid grid-cols-1 gap-6 @container 3xl:gap-8">
        <SectionBlock title={'متریک کارت + آیکون'}>
          <MetricCardsWithIcon className="@2xl:grid-cols-2 @6xl:grid-cols-4 4xl:gap-8" />
        </SectionBlock>

        <SectionBlock title={'متریک کارت + نمودار'}>
          <div className="grid grid-cols-1 gap-5 @xl:grid-cols-2 @6xl:grid-cols-4 3xl:gap-8">
            <FileStatGrid />
          </div>
        </SectionBlock>

        <SectionBlock title={'متریک کارت + چارت'}>
          <MetricCardWithBarChart className="grid-cols-1 @xl:grid-cols-2 @6xl:grid-cols-4 4xl:gap-8" />
        </SectionBlock>

        <SectionBlock title={'ویجت کارت + لیست + نمودار'}>
          <div className="grid grid-cols-1 gap-5 @2xl:grid-cols-2 @[90rem]:grid-cols-4 3xl:gap-8">
            <BarChartList />
            <ParticipantsList />
            <RecentAppList />
            <TransactionsList />
            <TopProductList />
            <AreaChartList />
            <CircleProgressBars />
          </div>
        </SectionBlock>

        {/* <SectionBlock title={'Ecommerce Product Card'}>
          <div className="grid grid-cols-1 gap-5 @2xl:grid-cols-2 @[90rem]:grid-cols-5 3xl:gap-8">
            {minimalProducts.map((company) => (
              <ProductMinimalCard key={company.id} company={company} />
            ))}
          </div>
        </SectionBlock> */}
      </div>
    </>
  );
}
