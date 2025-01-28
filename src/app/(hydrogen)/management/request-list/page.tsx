'use client';

import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import RequestListTable from '@/app/shared/management/request-list/table';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import React, { useState } from 'react';

const queryClient = new QueryClient();

const pageHeader = {
  title: 'درخواست‌های کاربران',
  breadcrumb: [
    {
      href: routes.management.requestList,
      name: 'بخش مدیریت (موقت)',
    },
    {
      href: routes.management.requestList,
      name: 'درخواست‌های کاربران',
    },
  ],
};

export default function RequestListPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
      </PageHeader>

      <RequestListTable relatedEntity="company" relatedEntityTitle="شرکت‌های صنایع غذایی و کشاورزی"/>
      <RequestListTable relatedEntity="service" relatedEntityTitle="بانک خدمات"/>
        <RequestListTable relatedEntity="subscription" relatedEntityTitle="خرید اشتراک"/>
    </QueryClientProvider>
  );
}
