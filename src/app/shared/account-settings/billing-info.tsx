'use client';

import React, { useState, useEffect } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from 'rizzui';
import HorizontalFormBlockWrapper from './horiozontal-block';
import toast from 'react-hot-toast';
import useAxiosPrivate from '@/hooks/use-axios-private';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ProfileHeader } from '@/app/shared/account-settings/profile-settings';
import dynamic from 'next/dynamic';
import Spinner from '@/components/ui/spinner';
import { 
  PiBuildings, 
  PiUser, 
  PiMapPin, 
  PiPhone,
  PiEnvelope,
  PiIdentificationCard,
  PiDownloadSimple,
  PiFilePdf
} from 'react-icons/pi';

const SelectBox = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => (
    <div className="grid h-10 place-content-center">
      <Spinner />
    </div>
  ),
});

// Billing info type enum
const billingInfoTypes = [
  {
    name: 'شخص حقیقی',
    value: 'INDIVIDUAL',
  },
  {
    name: 'شخص حقوقی',
    value: 'ORGANIZATION',
  },
];

// form zod validation schema
const billingInfoFormSchema = z.object({
  type: z.enum(['INDIVIDUAL', 'ORGANIZATION'], {
    required_error: 'نوع اطلاعات صورت‌حساب الزامی است',
  }),
  phoneNumber: z.string().optional(),
  postalCode: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  address: z.string().optional(),
  // Person fields
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  personEconomicCode: z.string().optional(),
  // Company fields
  companyName: z.string().optional(),
  registerNumber: z.string().optional(),
  nationalId: z.string().optional(),
  economicCode: z.string().optional(),
}).refine(
  (data) => {
    if (data.type === 'INDIVIDUAL') {
      return data.firstName && data.lastName;
    }
    return true;
  },
  {
    message: 'نام و نام خانوادگی برای شخص حقیقی الزامی است',
    path: ['firstName'],
  }
).refine(
  (data) => {
    if (data.type === 'ORGANIZATION') {
      return data.companyName;
    }
    return true;
  },
  {
    message: 'نام شرکت برای شخص حقوقی الزامی است',
    path: ['companyName'],
  }
);

type BillingInfoFormTypes = z.infer<typeof billingInfoFormSchema>;

interface BillingInfoDTO {
  id?: number;
  userId?: number;
  type: 'INDIVIDUAL' | 'ORGANIZATION';
  phoneNumber?: string;
  postalCode?: string;
  city?: string;
  province?: string;
  address?: string;
  firstName?: string;
  lastName?: string;
  personEconomicCode?: string;
  companyName?: string;
  registerNumber?: string;
  nationalId?: string;
  economicCode?: string;
}

export default function BillingInfoView() {
  const userInfo = useSelector((state: RootState) => state.user);
  const _axios = useAxiosPrivate();
  const [isLoading, setLoading] = useState(false);
  const [isFetching, setFetching] = useState(true);
  const [isGenerating, setGenerating] = useState(false);
  const [billingInfo, setBillingInfo] = useState<BillingInfoDTO | null>(null);
  const [selectedType, setSelectedType] = useState<'INDIVIDUAL' | 'ORGANIZATION'>('INDIVIDUAL');
  const [reset, setReset] = useState({});

  useEffect(() => {
    const fetchBillingInfo = async () => {
      if (!userInfo?.id) return;

      try {
        setFetching(true);
        const response = await _axios.get(`/billing-info`);
        if (response.data.status === 'SUCCESS' && response.data.data) {
          const data = response.data.data;
          setBillingInfo(data);
          setSelectedType(data.type);
        }
      } catch (error: any) {
        // If 404, no billing info exists yet
        if (error?.response?.status !== 404) {
          console.error('Error fetching billing info:', error);
          toast.error('خطا در دریافت اطلاعات صورت‌حساب');
        }
      } finally {
        setFetching(false);
      }
    };

    fetchBillingInfo();
  }, [userInfo?.id, _axios]);

  const handleGenerateBill = async () => {
    if (!userInfo?.id) {
      toast.error('کاربر یافت نشد');
      return;
    }

    try {
      setGenerating(true);
      const response = await _axios.post(
        '/billing-info/generate-bill/' + "4e6e9d31-33ea-4011-8666-b267962e081e",
        { userId: userInfo.id, templateId: 1 },
        { responseType: 'blob' }
      );

      // Create a blob from the response
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `bill_${new Date().getTime()}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success('فاکتور با موفقیت دانلود شد');
    } catch (error: any) {
      console.error('Error generating bill:', error);
      toast.error('خطا در صدور فاکتور');
    } finally {
      setGenerating(false);
    }
  };

  const onSubmit: SubmitHandler<BillingInfoFormTypes> = async (data) => {
    if (!userInfo?.id) {
      toast.error('کاربر یافت نشد');
      return;
    }

    try {
      setLoading(true);

      const submitData = {
        type: data.type,
        phoneNumber: data.phoneNumber,
        postalCode: data.postalCode,
        city: data.city,
        province: data.province,
        address: data.address,
        ...(data.type === 'INDIVIDUAL' ? {
          firstName: data.firstName,
          lastName: data.lastName,
          personEconomicCode: data.personEconomicCode,
        } : {
          companyName: data.companyName,
          registerNumber: data.registerNumber,
          nationalId: data.nationalId,
          economicCode: data.economicCode,
        }),
      };

      let response;
      if (billingInfo?.id) {
        // Update existing billing info
        response = await _axios.put(`/billing-info`, submitData);
      } else {
        // Create new billing info
        response = await _axios.post(`/billing-info`, submitData);
      }

      if (response.data.status === 'SUCCESS') {
        setBillingInfo(response.data.data);
        toast.success(
          <Text tag="b">
            {billingInfo?.id 
              ? 'اطلاعات صورت‌حساب با موفقیت به‌روزرسانی شد' 
              : 'اطلاعات صورت‌حساب با موفقیت ثبت شد'}
          </Text>
        );
      }
    } catch (error: any) {
      console.error('Error submitting billing info:', error);
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('خطا در ثبت اطلاعات صورت‌حساب');
      }
    } finally {
      setLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="grid h-32 flex-grow place-content-center items-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <>
      <ProfileHeader
        userInfo={userInfo}
        description="مدیریت اطلاعات صورت‌حساب برای دریافت فاکتور"
      />

      <Form<BillingInfoFormTypes>
        validationSchema={billingInfoFormSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: {
            type: billingInfo?.type || 'INDIVIDUAL',
            phoneNumber: billingInfo?.phoneNumber || '',
            postalCode: billingInfo?.postalCode || '',
            city: billingInfo?.city || '',
            province: billingInfo?.province || '',
            address: billingInfo?.address || '',
            firstName: billingInfo?.firstName || '',
            lastName: billingInfo?.lastName || '',
            personEconomicCode: billingInfo?.personEconomicCode || '',
            companyName: billingInfo?.companyName || '',
            registerNumber: billingInfo?.registerNumber || '',
            nationalId: billingInfo?.nationalId || '',
            economicCode: billingInfo?.economicCode || '',
          },
        }}
      >
        {({ register, control, watch, formState: { errors } }) => {
          const watchedType = watch('type');

          return (
            <>
              <div className="mx-auto w-full max-w-screen-2xl">
                <HorizontalFormBlockWrapper
                  title="نوع شخص"
                  titleClassName="text-base font-medium"
                  description="نوع صورت‌حساب را انتخاب کنید"
                >
                  <Controller
                    control={control}
                    name="type"
                    render={({ field: { value, onChange } }) => (
                      <SelectBox
                        placeholder="انتخاب نوع"
                        options={billingInfoTypes}
                        onChange={(selected) => {
                          onChange(selected);
                          setSelectedType(selected);
                        }}
                        value={value}
                        getOptionValue={(option) => option.value}
                        displayValue={(selected) =>
                          billingInfoTypes?.find((r) => r.value === selected)
                            ?.name ?? 'انتخاب نشده'
                        }
                        error={errors?.type?.message as string}
                      />
                    )}
                  />
                </HorizontalFormBlockWrapper>

                {watchedType === 'INDIVIDUAL' ? (
                  <>
                    <HorizontalFormBlockWrapper
                      title="نام و نام خانوادگی"
                      titleClassName="text-base font-medium"
                      description="نام و نام خانوادگی خود را وارد کنید"
                    >
                      <Input
                        prefix={<PiUser className="h-6 w-6 text-gray-500" />}
                        placeholder="نام"
                        {...register('firstName')}
                        error={errors.firstName?.message}
                        className="flex-grow"
                      />
                      <Input
                        prefix={<PiUser className="h-6 w-6 text-gray-500" />}
                        placeholder="نام خانوادگی"
                        {...register('lastName')}
                        error={errors.lastName?.message}
                        className="flex-grow"
                      />
                    </HorizontalFormBlockWrapper>

                    <HorizontalFormBlockWrapper
                      title="کد اقتصادی"
                      titleClassName="text-base font-medium"
                      description="کد اقتصادی خود را وارد کنید (اختیاری)"
                    >
                      <Input
                        prefix={<PiIdentificationCard className="h-6 w-6 text-gray-500" />}
                        placeholder="کد اقتصادی"
                        {...register('personEconomicCode')}
                        error={errors.personEconomicCode?.message}
                      />
                    </HorizontalFormBlockWrapper>
                  </>
                ) : (
                  <>
                    <HorizontalFormBlockWrapper
                      title="اطلاعات شرکت"
                      titleClassName="text-base font-medium"
                      description="اطلاعات شرکت را وارد کنید"
                    >
                      <Input
                        prefix={<PiBuildings className="h-6 w-6 text-gray-500" />}
                        placeholder="نام شرکت"
                        {...register('companyName')}
                        error={errors.companyName?.message}
                        className="col-span-full"
                      />
                      <Input
                        prefix={<PiIdentificationCard className="h-6 w-6 text-gray-500" />}
                        placeholder="شماره ثبت"
                        {...register('registerNumber')}
                        error={errors.registerNumber?.message}
                      />
                      <Input
                        prefix={<PiIdentificationCard className="h-6 w-6 text-gray-500" />}
                        placeholder="شناسه ملی"
                        {...register('nationalId')}
                        error={errors.nationalId?.message}
                      />
                      <Input
                        prefix={<PiIdentificationCard className="h-6 w-6 text-gray-500" />}
                        placeholder="کد اقتصادی"
                        {...register('economicCode')}
                        error={errors.economicCode?.message}
                        className="col-span-full"
                      />
                    </HorizontalFormBlockWrapper>
                  </>
                )}

                <HorizontalFormBlockWrapper
                  title="اطلاعات تماس"
                  titleClassName="text-base font-medium"
                  description="شماره تماس خود را وارد کنید"
                >
                  <Input
                    prefix={<PiPhone className="h-6 w-6 text-gray-500" />}
                    placeholder="شماره تلفن"
                    {...register('phoneNumber')}
                    error={errors.phoneNumber?.message}
                  />
                </HorizontalFormBlockWrapper>

                <HorizontalFormBlockWrapper
                  title="آدرس"
                  titleClassName="text-base font-medium"
                  description="آدرس کامل خود را وارد کنید"
                >
                  <Input
                    prefix={<PiMapPin className="h-6 w-6 text-gray-500" />}
                    placeholder="استان"
                    {...register('province')}
                    error={errors.province?.message}
                  />
                  <Input
                    prefix={<PiMapPin className="h-6 w-6 text-gray-500" />}
                    placeholder="شهر"
                    {...register('city')}
                    error={errors.city?.message}
                  />
                  <Input
                    prefix={<PiEnvelope className="h-6 w-6 text-gray-500" />}
                    placeholder="کد پستی"
                    {...register('postalCode')}
                    error={errors.postalCode?.message}
                    className="col-span-full"
                  />
                  <Textarea
                    placeholder="آدرس کامل"
                    {...register('address')}
                    error={errors.address?.message}
                    className="col-span-full"
                    rows={3}
                  />
                </HorizontalFormBlockWrapper>

                <div className="mt-6 flex w-auto items-center justify-end gap-3">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => window.history.back()}
                  >
                    انصراف
                  </Button>
                  <Button
                    type="submit"
                    variant="solid"
                    isLoading={isLoading}
                    className="dark:bg-gray-100 dark:text-white"
                  >
                    {billingInfo?.id ? 'بروزرسانی اطلاعات' : 'ثبت اطلاعات'}
                  </Button>
                </div>
              </div>
            </>
          );
        }}
      </Form>

      {/*{billingInfo?.id && (*/}
      {/*  <div className="mx-auto mt-10 w-full max-w-screen-2xl">*/}
      {/*    <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900/50">*/}
      {/*      <div className="mb-4 flex items-start justify-between">*/}
      {/*        <div>*/}
      {/*          <Text tag="h3" className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">*/}
      {/*            دریافت فاکتور*/}
      {/*          </Text>*/}
      {/*          <Text className="text-sm text-gray-500 dark:text-gray-400">*/}
      {/*            فاکتور خرید خود را با اطلاعات ثبت شده دریافت کنید*/}
      {/*          </Text>*/}
      {/*        </div>*/}
      {/*        <PiFilePdf className="h-10 w-10 text-gray-400 dark:text-gray-600" />*/}
      {/*      </div>*/}
      {/*      <Button*/}
      {/*        variant="outline"*/}
      {/*        onClick={handleGenerateBill}*/}
      {/*        isLoading={isGenerating}*/}
      {/*        className="mt-4 w-full dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 sm:w-auto"*/}
      {/*      >*/}
      {/*        <PiDownloadSimple className="ml-2 h-5 w-5" />*/}
      {/*        دانلود فاکتور*/}
      {/*      </Button>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*)}*/}
    </>
  );
}

