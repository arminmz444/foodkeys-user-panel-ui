import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { Button } from '@/components/ui/button';
import PageHeader from '@/app/shared/page-header';
import CreateCompany from '@/app/shared/info/food-industry/company/create';

export default function EditCompanyPage({
  params,
}: {
  params: { id: string };
}) {
  const pageHeader = {
    title: 'ویرایش اطلاعات شرکت',
    breadcrumb: [
      {
        href: routes.info.dashboard,
        name: 'مدیریت اطلاعات',
      },
      {
        href: routes.info.foodIndustryList,
        name: 'بانک صنعت غذا',
      },
      {
        href: routes.info.foodIndustryList,
        name: 'لیست شرکت‌ها',
      },
      {
        href: routes.info.foodIndustryEdit(Number(params.id)),
        name: 'ویرایش اطلاعات شرکت',
      },
      // {
      //   name: params.id,
      // },
    ],
  };
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.info.foodIndustryAdd}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button
            tag="span"
            className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
          >
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            ثبت شرکت جدید
          </Button>
        </Link>
      </PageHeader>

      <CreateCompany id={params.id} category={1} />
    </>
  );
}
