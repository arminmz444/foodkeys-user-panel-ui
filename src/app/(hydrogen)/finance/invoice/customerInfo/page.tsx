import CustomerInfoForm from '@/app/shared/finance/invoice/customerInfo/customerInfoForm';
import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import React from 'react';
const pageHeader = {
  title: 'اطلاعات لازم برای صدور فاکتور',
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
      name: 'اطلاعات صدور فاکتور',
    },
  ],
};
const InvoiceCustomerInfoPage = () => {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <section className=" mx-auto w-full max-w-4xl">
        <CustomerInfoForm />
      </section>
    </>
  );
};

export default InvoiceCustomerInfoPage;
