'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    Text,
    Button,
    Badge,
    Alert,
    Avatar
} from 'rizzui';
import {ChevronLeft, Edit, Calendar, Hash, Star, Tag, FileText, ChevronRight, User} from 'lucide-react';
import { useServiceApi, ServiceDTO } from '@/app/api/services';
import { routes } from '@/config/routes';
import Spinner from '@/components/ui/spinner';
import { useServiceSubcategories } from '@/hooks/use-service-subcategories';
import { FieldType, convertSchemaToFields } from '@/utils/schema-converter';
import {CustomAlert, Card, Title} from "@/components/ui/compatible-components";

export default function ServiceViewPage() {
    const { subcategory, id } = useParams();
    const router = useRouter();
    const serviceApi = useServiceApi();
    const { subcategories } = useServiceSubcategories();

    // Find subcategory display name
    const currentSubcategory = subcategories.find(
        subcat => subcat.subCategoryName === subcategory
    );

    // States
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [service, setService] = useState<ServiceDTO | null>(null);
    const [fields, setFields] = useState<FieldType[]>([]);

    // Fetch service data
    useEffect(() => {
        const fetchService = async () => {
            try {
                setIsLoading(true);
                const response = await serviceApi.getServiceById(Number(id));

                if (response && response.status === 'SUCCESS' && response.data) {
                    setService(response.data);

                    // Convert schema to fields if available
                    if (response.data.serviceSchemaDTO && response.data.serviceSchemaDTO.schemaDefinition) {
                        const fieldsFromSchema = convertSchemaToFields(
                            response.data.serviceSchemaDTO.schemaDefinition
                        );
                        setFields(fieldsFromSchema);
                    }
                } else {
                    setError('خطا در دریافت اطلاعات سرویس');
                }
            } catch (err) {
                console.error('Error fetching service:', err);
                setError('خطا در دریافت اطلاعات سرویس');
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchService();
        }
    }, [id, serviceApi]);

    // Format date
    const formatDate = (dateString?: string) => {
        if (!dateString) return 'نامشخص';

        try {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('fa-IR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).format(date);
        } catch (e) {
            return dateString;
        }
    };

    // Render field value based on type
    const renderFieldValue = (field: FieldType, value: any) => {
        if (value === undefined || value === null) {
            return <Text className="text-gray-500">-</Text>;
        }

        switch (field.type) {
            case 'checkbox':
                return value ? 'بله' : 'خیر';

            case 'date':
                return formatDate(value);

            case 'array':
                if (!Array.isArray(value)) return String(value);
                return value.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {value.map((item, index) => (
                            <Badge key={index} variant="flat">
                                {item}
                            </Badge>
                        ))}
                    </div>
                ) : (
                    <Text className="text-gray-500">-</Text>
                );

            case 'file':
                if (Array.isArray(value)) {
                    return value.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {value.map((file, index) => (
                                <a
                                    key={index}
                                    href={file.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline flex items-center"
                                >
                                    <FileText className="h-4 w-4 mr-1" />
                                    {file.name || `فایل ${index + 1}`}
                                </a>
                            ))}
                        </div>
                    ) : (
                        <Text className="text-gray-500">-</Text>
                    );
                } else if (value.url) {
                    return (
                        <a
                            href={value.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline flex items-center"
                        >
                            <FileText className="h-4 w-4 mr-1" />
                            {value.name || 'دانلود فایل'}
                        </a>
                    );
                }
                return <Text className="text-gray-500">-</Text>;

            default:
                return String(value);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-10">
                <Spinner size="xl" />
                <Text className="ms-3">در حال بارگذاری...</Text>
            </div>
        );
    }

    if (error || !service) {
        return (
            <div className="p-4 md:p-6 lg:p-8">
                <CustomAlert variant="danger">
                    {error || 'سرویس پیدا نشد'}
                </CustomAlert>
                <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => router.back()}
                >
                    بازگشت
                </Button>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 lg:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div className="flex items-center">
                    <Button
                        variant="text"
                        className="mr-2"
                        onClick={() => router.back()}
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                    <Title className="text-xl md:text-2xl">
                        {service.name}
                    </Title>
                </div>

                <div className="flex gap-3 mt-4 md:mt-0">
                    <Button
                        variant="outline"
                        onClick={() => router.push(
                            routes.info.serviceIndustryEdit(subcategory as string, service.id || 0)
                        )}
                    >
                        <Edit className="h-5 w-5 mr-1.5" />
                        ویرایش
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <Card className="mb-6">
                        <div className="p-6">
                            <Title className="text-lg mb-4">اطلاعات پایه</Title>

                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="rounded-md bg-primary-lighter p-2 mr-3">
                                        <Hash className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <Text className="text-sm text-gray-500 ms-2">نام</Text>
                                        <Text className="font-medium ms-2">{service.name}</Text>
                                    </div>
                                </div>

                                {service.nameEn && (
                                    <div className="flex items-start">
                                        <div className="rounded-md bg-primary-lighter p-2 mr-3">
                                            <Hash className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <Text className="text-sm text-gray-500 ms-2">نام انگلیسی</Text>
                                            <Text className="font-medium ms-2">{service.nameEn}</Text>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-start">
                                    <div className="rounded-md bg-orange-lighter p-2 mr-3">
                                        <Star className="h-5 w-5 text-orange-dark" />
                                    </div>
                                    <div>
                                        <Text className="text-sm text-gray-500 ms-2">رتبه</Text>
                                        <Text className="font-medium ms-2">{service.ranking || 0}</Text>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="rounded-md bg-orange-lighter p-2 mr-3">
                                        <Star className="h-5 w-5 text-orange-dark" />
                                    </div>
                                    <div>
                                        <Text className="text-sm text-gray-500 ms-2">رتبه کلی</Text>
                                        <Text className="font-medium ms-2">{service.rankingAll || 0}</Text>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="rounded-md bg-orange-lighter p-2 mr-3">
                                        <User className="h-5 w-5 text-orange-dark" />
                                    </div>
                                    <div>
                                        <Text className="text-sm text-gray-500 ms-2">بازدید در سایت اصلی</Text>
                                        <Text className="font-medium ms-2">{service.visit || 0}</Text>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="rounded-md bg-blue-lighter p-2 mr-3">
                                        <Tag className="h-5 w-5 text-blue-dark" />
                                    </div>
                                    <div>
                                        <Text className="text-sm text-gray-500 ms-2">دسته‌بندی</Text>
                                        <Text className="font-medium ms-2">
                                            {currentSubcategory?.subCategoryDisplayName || subcategory}
                                        </Text>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="rounded-md bg-green-lighter p-2 mr-3">
                                        <Calendar className="h-5 w-5 text-green-dark" />
                                    </div>
                                    <div>
                                        <Text className="text-sm text-gray-500 ms-2">تاریخ ثبت</Text>
                                        <Text className="font-medium ms-2">
                                            {/* Replace with actual creation date from your API */}
                                            {formatDate(service.additionalData?.createdAt || new Date().toISOString())}
                                        </Text>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {service.elasticFields && service.elasticFields.length > 0 && (
                        <Card className="mb-6">
                            <div className="p-6">
                                <Title className="text-lg mb-4">برچسب‌ها</Title>

                                <div className="flex flex-wrap gap-2">
                                    {service.elasticFields.map((tag, index) => (
                                        <Badge key={index} variant="flat">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    )}

                    {service.description && (
                        <Card className="mb-6">
                            <div className="p-6">
                                <Title className="text-lg mb-4">توضیحات</Title>

                                <Text className="whitespace-pre-line">
                                    {service.description}
                                </Text>
                            </div>
                        </Card>
                    )}
                </div>

                <div className="lg:col-span-2">
                    <Card>
                        <div className="p-6">
                            <Title className="text-lg mb-4">
                                {service.serviceSchemaDTO?.formTitle || 'اطلاعات تخصصی'}
                            </Title>

                            {service.serviceSchemaDTO?.formDescription && (
                                <Text className="text-gray-500 mb-6">
                                    {service.serviceSchemaDTO.formDescription}
                                </Text>
                            )}

                            {fields.length > 0 ? (
                                <div className="space-y-8">
                                    {fields.map((field) => (
                                        <div key={field.id} className="border-b pb-4 last:border-b-0">
                                            <Text className="font-medium mb-2">{field.label || field.name}</Text>
                                            <div>
                                                {renderFieldValue(field, service.data[field.name])}
                                            </div>
                                            {field.description && (
                                                <Text className="text-xs text-gray-500 mt-1">
                                                    {field.description}
                                                </Text>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <Text className="text-gray-500">
                                    اطلاعات تخصصی برای این سرویس ثبت نشده است
                                </Text>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}