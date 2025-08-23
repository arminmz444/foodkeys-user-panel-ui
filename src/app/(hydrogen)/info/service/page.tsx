// 'use client';
//
// import Link from 'next/link';
// import { routes } from '@/config/routes';
// import { Button } from '@/components/ui/button';
// import PageHeader from '@/app/shared/page-header';
// import { PiArrowLineDownBold, PiPlusBold } from 'react-icons/pi';
// import { productsData } from '@/data/products-data';
// import { exportToCSV } from '@/utils/export-to-csv';
// import CompaniesTable from '@/app/shared/info/service-bank/service/service-list/table';
// import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
// import dynamic from 'next/dynamic';
// import React, { useState } from 'react';
// import Spinner from '@/components/ui/spinner';
// import ServicesTable from "@/app/shared/info/service-bank/service/service-list/table";
// import {Input} from "@/components/ui/input";
//
// const queryClient = new QueryClient();
//
// const pageHeader = {
//   title: 'شرکت‌های ثبت شده شما در بانک خدمات',
//   breadcrumb: [
//     {
//       href: routes.info.dashboard,
//       name: 'مدیریت اطلاعات',
//     },
//     {
//       href: routes.info.foodIndustryList,
//       name: 'بانک خدمات',
//     },
//     {
//       name: 'لیست',
//     },
//   ],
// };
//
// export default function ServiceBankPage() {
//   function handleExportData() {
//     exportToCSV(
//       productsData,
//       'ID,Name,Category,Product Thumbnail,SKU,Stock,Price,Status,Rating',
//       'product_data'
//     );
//   }
//
//   const MapSelector = dynamic(() => import('@/components/MapSelector'), {
//     ssr: false,
//     loading: () => <Spinner className="col-span-full h-[143px]" />,
//   });
//   const [selectedLocation, setSelectedLocation] = useState<{
//     lat: number;
//     lng: number;
//   } | null>(null);
//
//   const handleLocationSelect = (coords: { lat: number; lng: number }) => {
//     setSelectedLocation(coords);
//   };
//
//   const saveLocation = () => {
//     if (selectedLocation) {
//       console.log('Saved Location:', selectedLocation);
//     }
//   };
//
//   return (
//     <QueryClientProvider client={queryClient}>
//       <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
//         <div className="mt-4 flex items-center gap-3 @lg:mt-0">
//           {/*<Button*/}
//           {/*  variant="outline"*/}
//           {/*  className="w-full @lg:w-auto"*/}
//           {/*  onClick={() => handleExportData()}*/}
//           {/*>*/}
//           {/*  <PiArrowLineDownBold className="me-1.5 h-[17px] w-[17px]" />*/}
//           {/*  استخراج*/}
//           {/*</Button>*/}
//           {/*<Link*/}
//           {/*  href={routes.info.serviceIndustryAdd}*/}
//           {/*  className="w-full @lg:w-auto"*/}
//           {/*>*/}
//           {/*  <Button*/}
//           {/*    tag="span"*/}
//           {/*    className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"*/}
//           {/*  >*/}
//           {/*    <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />*/}
//           {/*    ثبت شرکت جدید*/}
//           {/*  </Button>*/}
//           {/*</Link>*/}
//           {/*<Input*/}
//           {/*    className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"*/}
//           {/*  >*/}
//           {/*    <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />*/}
//           {/*    ثبت شرکت جدید*/}
//           {/*  </Input>*/}
//         </div>
//       </PageHeader>
//
//       <ServicesTable category={4} />
//     </QueryClientProvider>
//   );
// }

'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Badge, ActionIcon } from 'rizzui';
import { Plus, Edit, Eye, Search as SearchIcon, ArrowRight } from 'lucide-react';
import { useServiceApi, ServiceDTO } from '@/app/api/services';
import { routes } from '@/config/routes';
import Spinner from '@/components/ui/spinner';
import { useServiceSubcategories } from '@/hooks/use-service-subcategories';
import { Card, Title, Table, Pagination, Search, Select } from '@/components/ui/compatible-components';

// Custom alert just as before
const CustomAlert = ({ children, variant = "default", className = "" }) => {
    const baseStyles = "p-4 rounded-md mb-4 text-sm";
    const variantStyles = {
        default: "bg-gray-100 text-gray-800",
        info:    "bg-blue-50 text-blue-800",
        success: "bg-green-50 text-green-800",
        warning: "bg-yellow-50 text-yellow-800",
        danger:  "bg-red-50 text-red-800"
    };
    return (
        <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
            {children}
        </div>
    );
};

export default function ServiceBankPage() {
    const router = useRouter();
    const serviceApi = useServiceApi();
    const { subcategories } = useServiceSubcategories();

    // Loading & error
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Data
    const [services, setServices] = useState<ServiceDTO[]>([]);

    // Pagination _inputs_ (what the user controls)
    const [pageNumber, setPageNumber] = useState(1);  // 0-based
    const [pageSize]   = useState(10);

    // Pagination _outputs_ (what comes back from the API)
    const [totalPages, setTotalPages]       = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string>('');

    // Memoize the API call
    const getServices = useCallback(
        (subCategoryId?: number, page?: number, size?: number) =>
            serviceApi.getServices(subCategoryId, page, size),
        [serviceApi]
    );

    // Fetch whenever _inputs_ change
    // useEffect(() => {
    //     let isCancelled = false;
    //
    //     const fetchServices = async () => {
    //         setIsLoading(true);
    //         setError(null);
    //
    //         try {
    //             const subCatId = selectedSubcategoryId
    //                 ? Number(selectedSubcategoryId)
    //                 : undefined;
    //
    //             const resp = await getServices(subCatId, pageNumber, pageSize);
    //
    //             if (isCancelled) return;
    //
    //             if (resp?.status === 'SUCCESS') {
    //                 setServices(resp.data);
    //                 // Only update the OUTPUTs here:
    //                 setTotalPages(resp.pagination.totalPages);
    //                 setTotalElements(resp.pagination.totalElements);
    //             } else {
    //                 setError('خطا در دریافت لیست سرویس‌ها');
    //                 setServices([]);
    //             }
    //         } catch (err) {
    //             console.error(err);
    //             if (!isCancelled) {
    //                 setError('خطا در دریافت لیست سرویس‌ها');
    //                 setServices([]);
    //             }
    //         } finally {
    //             if (!isCancelled) {
    //                 setIsLoading(false);
    //             }
    //         }
    //     };
    //
    //     fetchServices();
    //     return () => { isCancelled = true; };
    // }, [getServices, selectedSubcategoryId, pageNumber, pageSize]);

    useEffect(() => {
        let cancelled = false;
        setIsLoading(true);
        setError(null);

        serviceApi.getServices(
            selectedSubcategoryId ? +selectedSubcategoryId : undefined,
            pageNumber,
            pageSize
        ).then(resp => {
            if (cancelled) return;
            if (resp.status === 'SUCCESS') {
                setServices(resp.data);
                setTotalElements(resp.pagination.totalElements);
            } else {
                setError('خطا در دریافت لیست سرویس‌ها');
            }
        }).catch(() => {
            if (!cancelled) {
                setError('خطا در دریافت لیست سرویس‌ها');
                setServices([]);
            }
        }).finally(() => {
            if (!cancelled) setIsLoading(false);
        });

        return () => { cancelled = true; };
    }, [serviceApi, selectedSubcategoryId, pageNumber, pageSize]);
    // Whenever you pick a new subcategory, go back to page 0:
    useEffect(() => {
        setPageNumber(1);
    }, [selectedSubcategoryId]);

    // Handlers
    const handlePageChange = (page: number) => {
        // Pagination component is 1-based
        setPageNumber(page - 1);
    };

    const handleSearch = () => {
        setPageNumber(1);
        // TODO: wire `searchTerm` into your API call
    };

    // Helpers (unchanged)
    const getSubcategoryName = useCallback(
        (id: number) =>
            subcategories.find((s) => s.subCategoryId === id)
                ?.subCategoryDisplayName ?? 'نامشخص',
        [subcategories]
    );

    const getSubcategoryRouteName = useCallback(
        (id: number) =>
            subcategories.find((s) => s.subCategoryId === id)
                ?.subCategoryName ?? '',
        [subcategories]
    );

    const formatDate = (iso?: string) => {
        if (!iso) return 'نامشخص';
        try {
            return new Intl.DateTimeFormat('fa-IR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }).format(new Date(iso));
        } catch {
            return iso;
        }
    };

    const selectOptions = useMemo(
        () => [
            { label: 'همه زیرشاخه‌ها', value: '' },
            ...subcategories.map((s) => ({
                label: s.subCategoryDisplayName,
                value: s.subCategoryId.toString(),
            })),
        ],
        [subcategories]
    );

    return (
        <div className="p-4 md:p-6 lg:p-8">
            {/* Header + Filters */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <Title className="text-xl md:text-2xl mb-4 md:mb-0">
                    بانک خدمات
                </Title>
                <div className="flex flex-col md:flex-row gap-3">
                    <Select
                        placeholder="انتخاب زیرشاخه"
                        value={selectedSubcategoryId}
                        onChange={(e) => setSelectedSubcategoryId(e.target.value)}
                        options={selectOptions}
                        className="max-w-full md:w-[200px]"
                    />
                    <div className="relative">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Search
                            placeholder="جستجو..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            className="max-w-full md:w-[280px]"
                            inputClassName="pl-10"
                        />
                    </div>
                </div>
            </div>

            {/* Subcategory Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {subcategories.map((subcat) => (
                    <Card
                        key={subcat.subCategoryId}
                        className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() =>
                            router.push(
                                routes.info.serviceIndustrySubCategoryList(
                                    subcat.subCategoryName
                                )
                            )
                        }
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <Title className="text-lg mb-1">
                                    {subcat.subCategoryDisplayName}
                                </Title>
                                <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                                    {subcat.subCategoryDescription ||
                                        `مدیریت ${subcat.subCategoryDisplayName}`}
                                </p>
                                <Button variant="text" size="sm" className="p-0 h-auto">
                                    مشاهده لیست
                                    <ArrowRight className="h-4 w-4 mr-1 rtl:rotate-180" />
                                </Button>
                            </div>
                            <Badge rounded="full" color="success" className="px-3 py-1">
                                {subcat.latestSubmissions?.length || 0}
                            </Badge>
                        </div>
                    </Card>
                ))}
            </div>

            {error && (
                <CustomAlert variant="danger" className="mb-6">
                    {error}
                </CustomAlert>
            )}

            {/* Service List */}
            <Card>
                <div className="p-4 border-b">
                    <Title className="text-lg">آخرین سرویس‌های ثبت شده</Title>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center p-10">
                        <Spinner size="xl" />
                        <p className="ms-3">در حال بارگذاری...</p>
                    </div>
                ) : services.length === 0 ? (
                    <div className="text-center p-10">
                        <Title className="text-lg mb-2">هیچ سرویسی یافت نشد</Title>
                        <p className="text-gray-500 mb-6">
                            برای افزودن سرویس، ابتدا زیرشاخه مورد نظر را انتخاب کنید
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <Table>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>#</Table.HeaderCell>
                                        <Table.HeaderCell>نام</Table.HeaderCell>
                                        <Table.HeaderCell>زیرشاخه</Table.HeaderCell>
                                        <Table.HeaderCell>تاریخ ایجاد</Table.HeaderCell>
                                        <Table.HeaderCell>وضعیت</Table.HeaderCell>
                                        <Table.HeaderCell>عملیات</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {services.map((service, idx) => {
                                        const routeName = getSubcategoryRouteName(
                                            service.subCategoryId
                                        );
                                        return (
                                            <Table.Row key={service.id}>
                                                <Table.Cell>
                                                    {pageNumber * pageSize + idx + 1}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <p className="font-medium">{service.name}</p>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {getSubcategoryName(service.subCategoryId)}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {formatDate(
                                                        service.additionalData?.createdAt ??
                                                        new Date().toISOString()
                                                    )}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Badge variant="flat" color="success">
                                                        فعال
                                                    </Badge>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <div className="flex items-center gap-3">
                                                        <ActionIcon
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                router.push(
                                                                    `/info/service/${routeName}/${service.id}/view`
                                                                );
                                                            }}
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </ActionIcon>
                                                        <ActionIcon
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                router.push(
                                                                    `/info/service/${routeName}/${service.id}/edit`
                                                                );
                                                            }}
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </ActionIcon>
                                                    </div>
                                                </Table.Cell>
                                            </Table.Row>
                                        );
                                    })}
                                </Table.Body>
                            </Table>
                        </div>

                        <div className="flex justify-center py-5">
                            <Pagination
                                pageSize={pageSize}
                                total={totalElements}
                                current={pageNumber}
                                onChange={handlePageChange}
                            />
                        </div>
                    </>
                )}
            </Card>
        </div>
    );
}
