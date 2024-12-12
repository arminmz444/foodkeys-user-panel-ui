'use client';

import Link from 'next/link';
import { routes } from '@/config/routes';
import { Button } from '@/components/ui/button';
import PageHeader from '@/app/shared/page-header';
import { PiArrowLineDownBold, PiPlusBold } from 'react-icons/pi';
import { productsData } from '@/data/products-data';
import { exportToCSV } from '@/utils/export-to-csv';
import CompaniesTable from '@/app/shared/info/food-industry/company/company-list/table';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import MapSelector from '@/components/MapSelector';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import QuillLoader from '@/components/loader/quill-loader';
import Spinner from '@/components/ui/spinner';

const queryClient = new QueryClient();

const pageHeader = {
  title: 'شرکت‌های ثبت شده شما در بانک صنعت غذا',
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
      name: 'لیست',
    },
  ],
};

export default function FoodIndustryPage() {
  function handleExportData() {
    exportToCSV(
      productsData,
      'ID,Name,Category,Product Thumbnail,SKU,Stock,Price,Status,Rating',
      'product_data'
    );
  }

  const MapSelector = dynamic(() => import('@/components/MapSelector'), {
    ssr: false,
    loading: () => <Spinner className="col-span-full h-[143px]" />,
  });
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const handleLocationSelect = (coords: { lat: number; lng: number }) => {
    setSelectedLocation(coords);
  };

  const saveLocation = () => {
    if (selectedLocation) {
      console.log('Saved Location:', selectedLocation);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Button
            variant="outline"
            className="w-full @lg:w-auto"
            onClick={() => handleExportData()}
          >
            <PiArrowLineDownBold className="me-1.5 h-[17px] w-[17px]" />
            استخراج
          </Button>
          <Link
            href={routes.info.foodIndustryAdd}
            className="w-full @lg:w-auto"
          >
            <Button
              tag="span"
              className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            >
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              ثبت شرکت جدید
            </Button>
          </Link>
        </div>
      </PageHeader>

      <CompaniesTable category={1} />
      <MapSelector onLocationSelect={handleLocationSelect} />
    </QueryClientProvider>
  );
}
