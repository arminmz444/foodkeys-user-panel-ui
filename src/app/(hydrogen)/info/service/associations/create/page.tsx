import Link from 'next/link';
import { routes } from '@/config/routes';
import { Button } from '@/components/ui/button';
import { PiPlusBold } from 'react-icons/pi';
import PageHeader from '@/app/shared/page-header';
import CreateAssociation from "@/app/shared/info/associations/create";

const pageHeader = {
  title: 'ثبت اطلاعات انجمن جدید',
  breadcrumb: [
    {
      href: routes.info.serviceIndustryList,
      name: 'بانک خدمات',
    },
    {
      href: routes.info.associationsCreate,
      name: 'انجمن های عملی و صنفی',
    },
    {
      name: 'ایجاد',
    },
  ],
};

export default function CreateProductPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.info.associationsCreate}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button
            tag="span"
            className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
          >
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            ثبت انجمن جدید
          </Button>
        </Link>
      </PageHeader>

      <CreateAssociation />
    </>
  );
}
