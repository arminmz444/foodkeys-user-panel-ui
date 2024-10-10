import CreateCategory from '@/app/shared/ecommerce/category/create-category';
import PageHeader from '@/app/shared/page-header';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';
import Link from 'next/link';

const pageHeader = {
  title: 'ایجاد دسته بندی',
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
      name: 'ایجاد',
    },
  ],
};

export default function CreateCategoryPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.eCommerce.categories}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button tag="span" className="w-full @lg:w-auto" variant="outline">
            انضراف
          </Button>
        </Link>
      </PageHeader>
      <CreateCategory />
    </>
  );
}
