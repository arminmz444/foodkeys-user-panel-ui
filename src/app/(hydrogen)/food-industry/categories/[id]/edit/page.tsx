import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import CreateCategory from '@/app/shared/ecommerce/category/create-category';
import Link from 'next/link';

const pageHeader = {
  title: 'ویرایش دسته بندی',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'خانه',
    },
    {
      href: routes.eCommerce.categories,
      name: 'دسته بندی',
    },
    {
      name: 'ویرایش',
    },
  ],
};

const categoryData = {
  name: 'سبزیجات',
  slug: 'سبزیجات',
  type: 'غذای رژیمی',
  parentCategory: 'خواربار',
  description: 'گلوله گرانیت شگفت‌انگیز',
  image: '',
};

export default function EditCategoryPage({ params }: any) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.eCommerce.categories}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button tag="span" className="w-full @lg:w-auto" variant="outline">
            Cancel
          </Button>
        </Link>
      </PageHeader>
      <CreateCategory id={params.id} category={categoryData} />
    </>
  );
}
