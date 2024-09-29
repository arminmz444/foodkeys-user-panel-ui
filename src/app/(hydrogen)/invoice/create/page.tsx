import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import ImportButton from '@/app/shared/import-button';
import CreateInvoice from '@/app/shared/invoice/create-invoice';

const pageHeader = {
  title: 'ایجاد فاکتور',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'خانه',
    },
    {
      href: routes.invoice.home,
      name: 'فاکتور',
    },
    {
      name: 'ایجاد',
    },
  ],
};

export default function InvoiceCreatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ImportButton title="Upload File" className="mt-4 @lg:mt-0" />
      </PageHeader>

      <CreateInvoice />
    </>
  );
}
