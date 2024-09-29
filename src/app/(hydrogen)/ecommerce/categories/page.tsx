import { routes } from '@/config/routes';
import CategoryTable from '@/app/shared/ecommerce/category/category-list/table';
import CategoryPageHeader from './category-page-header';

const pageHeader = {
  title: 'دسته بندی',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'ایکامرس',
    },
    {
      href: routes.eCommerce.categories,
      name: 'دسته بندی',
    },
    {
      name: 'لیست',
    },
  ],
};

export default function CategoriesPage() {
  return (
    <>
      <CategoryPageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      />
      <CategoryTable />
    </>
  );
}
