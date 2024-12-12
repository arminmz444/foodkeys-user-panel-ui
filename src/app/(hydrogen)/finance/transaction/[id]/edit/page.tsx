import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import CreateInvoice from '@/app/shared/invoice/create-invoice';
import { PiArrowLineUpBold } from 'react-icons/pi';
import ImportButton from '@/app/shared/import-button';

const pageHeader = {
  title: 'ویرایش فاکتور',
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
      name: 'ویرایش',
    },
  ],
};

const invoiceData = {
  fromName: 'صادق قاسم نژاد',
  fromAddress: 'شیراز',
  toName: 'کامپیژن',
  toAddress: 'تهران',
  shipping: 10,
  discount: 50,
  taxes: 15,
  createDate: new Date(),
  status: 'draft',
  dueDate: new Date(),
  invoiceNumber: 'INV-0071',
  items: [
    {
      item: 'لوگو دیزاین',
      description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت ',
      quantity: 3,
      price: 200,
    },
    {
      item: 'وب دیزاین',
      description: 'لورم ایپسوم متن ساختگی با ',
      quantity: 1,
      price: 1200,
    },
  ],
};

export default function InvoiceEditPage({ params }: any) {
  console.log('Invoice Edit Page ID', params.id);
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ImportButton title="Upload File" className="mt-4 @lg:mt-0" />
      </PageHeader>

      <CreateInvoice id={params.id} record={invoiceData} />
    </>
  );
}
