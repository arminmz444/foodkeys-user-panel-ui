import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import ProductDetails from '@/app/shared/ecommerce/product/product-details';

export default function ProductDetailsPage({ params }: any) {
  const pageHeader = {
    title: 'اطلاعات شرکت',
    breadcrumb: [
      {
        href: routes.info.foodIndustryList,
        name: 'بانک صنعت کشاورزی',
      },
      {
        href: routes.info.foodIndustryView(params.id),
        name: 'نمایش اطلاعات شرکت',
      },
      {
        name: params.id,
      },
    ],
  };
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ProductDetails />
    </>
  );
}
