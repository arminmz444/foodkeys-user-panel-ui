'use client';

import {
  CreateProductInput,
  defaultValues,
  productFormSchema,
} from '@/app/shared/info/employment/create/form-utils';
import FormFooter from '@/components/form-footer';
import cn from '@/utils/class-names';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Element } from 'react-scroll';
import { Text } from 'rizzui';
import EmploymentDescription from './employment-description';
import EmploymentInfo from './employment-info';
import FormNav, { formParts } from './form-nav';
import EmploymentContact from './employment-contact';
import { useRouter } from 'next/navigation';
import useAxiosPrivate from '@/hooks/use-axios-private';
import { Button } from '@/components/ui/button';
import EmploymentGallery from './employment-gallery';

const MAP_STEP_TO_COMPONENT = {
  [formParts.intro]: EmploymentInfo,
  [formParts.description]: EmploymentDescription,
  [formParts.contact]: EmploymentContact,
  [formParts.logo]: EmploymentGallery,
};

interface IndexProps {
  id?: string;
  employment?: CreateProductInput;
  className?: string;
}

export default function CreateEmployment({
  id,
  employment,
  className,
}: IndexProps) {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const _axios = useAxiosPrivate();
  const [employmentData, setEmploymentData] = useState<any | null>(null);
  const methods = useForm<CreateProductInput>({
    defaultValues: defaultValues(employmentData),
    resolver: zodResolver(productFormSchema),
  });

  useEffect(() => {
    const fetchEmployment = async () => {
      try {
        const response = await _axios.get(`/service/${id}`);
        if (response.data.status === 'SUCCESS') {
          setEmploymentData(response.data.data);
          methods.reset(defaultValues(response.data.data));
        }
      } catch (error) {
        console.error('Error fetching employment:', error);
      }
    };

    if (id) {
      fetchEmployment();
    }
  }, [id, _axios]);

  const fetchSubscriptions = async () => {
    try {
      const response = await _axios.get(`/subscription`);
      if (response.data.status === 'SUCCESS') {
        if (!response.data?.data) {
          toast.success(
            <div>
              <Text tag="b">{'اطلاعات شما به طور موقت ثبت شد.\n\n'}</Text>
              <Text>
                {
                  'برای تایید نهایی و استفاده از خدمات سایت، لطفا اشتراک فعال جدیدی تهیه کنید.\n'
                }
              </Text>
              <Button
                className="mt-3"
                size="sm"
                onClick={() => console.log('DISMISS')}
              >
                خرید اشتراک
              </Button>
            </div>,
            { duration: 5000 }
          );
          router.replace('/bundle/buy');
        }
        return true;
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
      toast.error(
        <div>
          <Text tag="b">{'اطلاعات شما به طور موقت ثبت شد.\n\n'}</Text>
          <Text>
            {'اما هنگام دریافت وضعیت اشتراک شما، خطایی رخ داده است.\n' +
              'برای تایید نهایی و استفاده از خدمات سایت، لطفا اشتراک فعال جدیدی تهیه کنید.\n'}
          </Text>
          <Button
            className="mt-3"
            size="sm"
            onClick={() => console.log('DISMISS')}
          >
            خرید اشتراک
          </Button>
        </div>,
        { duration: 60000 }
      );
    }
  };

  const onSubmit: SubmitHandler<CreateEventInput> = async (data) => {
    setLoading(true);
    try {
      const payload = {
        name: data.title,
        subCategoryId: 24,
        serviceSchemaId: 16,
        serviceData: {
          fax: data.fax,
          tel: data.tel,
          logo: data.logo,
          type: data.type,
          title: data.title,
          venue: data.venue,
          address: data.address,
          country: data.country,
          endDate: data.endDate,
          website: data.website,
          category: data.category.value,
          keywords: data.keywords,
          organizer: data.organizer,
          startDate: data.startDate,
          description: data.description,
        },
        serviceAdditionalData: null,
        dataFileIds: data.dataFileIds,
        additionalDataFileIds: null,
      };

      console.log('data: ', JSON.stringify(data));
      console.log('payload: ', JSON.stringify(payload));

      const response = await _axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/service`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        // toast.success(
        //   <Text tag="b">
        //     {id ? 'بروزرسانی اطلاعات' : 'ثبت اطلاعات'} موفقیت آمیز بود
        //   </Text>
        // );
        methods.reset();
        // router.push('/info/service');
        let hasSubscription = await fetchSubscriptions();
        if (hasSubscription) router.push('/info/service');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      toast.error('خطا در ارسال اطلاعات');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="@container">
      <FormNav />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className={cn('[&_label.block>span]:font-medium', className)}
        >
          <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
            {Object.entries(MAP_STEP_TO_COMPONENT).map(([key, Component]) => (
              <Element
                key={key}
                name={formParts[key as keyof typeof formParts]}
              >
                {<Component className="pt-7 @2xl:pt-9 @3xl:pt-11" />}
              </Element>
            ))}
          </div>

          <FormFooter
            isLoading={isLoading}
            submitBtnText={id ? 'بروز رسانی همایش' : 'ثبت همایش'}
          />
        </form>
      </FormProvider>
    </div>
  );
}
