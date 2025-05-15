// pages/increase-credit.tsx
// 'use client';

// import Link from 'next/link';
// import { routes } from '@/config/routes';
// import { Button } from '@/components/ui/button';
// import PageHeader from '@/app/shared/page-header';
// import InvoiceTable from '@/app/shared/finance/payment/payment-list/table';
// import { PiPlusBold } from 'react-icons/pi';
// import { exportToCSV } from '@/utils/export-to-csv';
// import ExportButton from '@/app/shared/export-button';
// import PaymentTable from '@/app/shared/finance/payment/payment-list/table';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import useAxiosPrivate from '@/hooks/use-axios-private';

// const pageHeader = {
//   title: 'لیست پرداختی‌ها',
//   breadcrumb: [
//     {
//       href: routes.finance.dashboard,
//       name: 'مدیریت مالی',
//     },
//     {
//       href: routes.invoice.home,
//       name: 'پرداختی‌ها',
//     },
//     {
//       name: 'لیست',
//     },
//   ],
// };

// export default function PaymentListPage() {
//   const _axios = useAxiosPrivate();
//   const [paymentData, setPaymentData] = useState([]);
//   const [totalItems, setTotalItems] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     const fetchPaymentData = async () => {
//       try {
//         const response = await _axios.get(`/payment/`, {
//           params: {
//             page: currentPage,
//             size: pageSize,
//           },
//         });
//         if (response.data.status === 'SUCCESS') {
//           setPaymentData(response.data.data);
//           setTotalItems(response.data.pagination.totalElements);
//         }
//       } catch (error) {
//         console.error('Error fetching payment data:', error);
//       }
//     };

//     fetchPaymentData();
//   }, [_axios, currentPage, pageSize]);

//   function handleExportData() {
//     exportToCSV(
//       paymentData,
//       'ID,Description,Amount,Status,Transaction ID,Created At,Updated At',
//       'invoice_data'
//     );
//   }

//   return (
//     <>
//       <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
//         <div className="mt-4 flex items-center gap-3 @lg:mt-0">
//           <ExportButton onClick={() => handleExportData()} />
//           <Link href={routes.invoice.create} className="w-full @lg:w-auto">
//             <Button
//               tag="span"
//               className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
//             >
//               <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
//               ایجاد فاکتور
//             </Button>
//           </Link>
//         </div>
//       </PageHeader>

//       <PaymentTable
//         data={paymentData}
//         totalItems={totalItems}
//         pageSize={pageSize}
//         currentPage={currentPage}
//         setPageSize={setPageSize}
//         setCurrentPage={setCurrentPage}
//       />
//     </>
//   );
// }

// ('use client');

// import Link from 'next/link';
// import { routes } from '@/config/routes';
// import { Button } from '@/components/ui/button';
// import PageHeader from '@/app/shared/page-header';
// import InvoiceTable from '@/app/shared/invoice/invoice-list/table';
// import { PiPlusBold } from 'react-icons/pi';
// import { invoiceData } from '@/data/invoice-data';
// import { exportToCSV } from '@/utils/export-to-csv';
// import ExportButton from '@/app/shared/export-button';
// import { QueryClient, QueryClientProvider } from 'react-query';
// const queryClient = new QueryClient();

// const pageHeader = {
//   title: 'لیست سفارش',
//   breadcrumb: [
//     {
//       href: routes.finance.dashboard,
//       name: 'مدیریت مالی',
//     },
//     {
//       href: routes.invoice.home,
//       name: 'فاکتور',
//     },
//     {
//       name: 'لیست',
//     },
//   ],
// };

// export default function InvoiceListPage() {
//   function handleExportData() {
//     exportToCSV(
//       invoiceData,
//       'ID,Name,Username,Avatar,Email,تاریخ آخرین تراکنش,Amount,Status,Created At',
//       'invoice_data'
//     );
//   }

//   return (
//     <>
//       <QueryClientProvider client={queryClient}>
//         <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
//           <div className="mt-4 flex items-center gap-3 @lg:mt-0">
//             <ExportButton onClick={() => handleExportData()} />
//             <Link href={routes.invoice.create} className="w-full @lg:w-auto">
//               <Button
//                 tag="span"
//                 className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
//               >
//                 <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
//                 ایجاد فاکتور
//               </Button>
//             </Link>
//           </div>
//         </PageHeader>
//         {/*// @ts-ignore*/}
//         <InvoiceTable data={invoiceData} />
//       </QueryClientProvider>
//     </>
//   );
// }

'use client';

import Link from 'next/link';
import { routes } from '@/config/routes';
import { Button } from '@/components/ui/button';
import PageHeader from '@/app/shared/page-header';
import InvoiceTable from '@/app/shared/invoice/invoice-list/table';
import { PiPlusBold } from 'react-icons/pi';
import { invoiceData } from '@/data/invoice-data';
import { exportToCSV } from '@/utils/export-to-csv';
import ExportButton from '@/app/shared/export-button';
import { QueryClient, QueryClientProvider } from 'react-query';
import PaymentTransactionsTable from '@/app/shared/invoice/invoice-list/table';
const queryClient = new QueryClient();

const pageHeader = {
  title: 'لیست سفارش',
  breadcrumb: [
    {
      href: routes.finance.dashboard,
      name: 'مدیریت مالی',
    },
    {
      href: routes.invoice.home,
      name: 'فاکتور',
    },
    {
      name: 'لیست',
    },
  ],
};

export default function InvoiceListPage() {
  function handleExportData() {
    exportToCSV(
      invoiceData,
      'ID,Name,Username,Avatar,Email,تاریخ آخرین تراکنش,Amount,Status,Created At',
      'invoice_data'
    );
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
          <div className="mt-4 flex items-center gap-3 @lg:mt-0">
            <ExportButton onClick={() => handleExportData()} />
            {/* <Link href={routes.invoice.create} className="w-full @lg:w-auto">
              <Button
                tag="span"
                className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
              >
                <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
                ایجاد فاکتور
              </Button>
            </Link> */}
          </div>
        </PageHeader>
        {/*// @ts-ignore*/}
        <PaymentTransactionsTable data={invoiceData} />
      </QueryClientProvider>
    </>
  );
}
