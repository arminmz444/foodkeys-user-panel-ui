'use client';

import { API_BASE_URL } from '@/config/api.config';
import {
  CreateEventInput,
  defaultValues,
  conferenceFormSchema,
} from '@/app/shared/info/conferences/create/form-utils';
import FormFooter from '@/components/form-footer';
import cn from '@/utils/class-names';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Element } from 'react-scroll';
import { Button, Text } from 'rizzui';
import ConferenceSummary from './conference-summary';
import ConferenceContact from './conference-contact';
import ConferenceDescription from './conference-description';
import FormNav, { formParts } from './form-nav';
import { useRouter } from 'next/navigation';
import useAxiosPrivate from '@/hooks/use-axios-private';
import ConferenceGallery from './conference-gallery';

const MAP_STEP_TO_COMPONENT = {
  [formParts.intro]: ConferenceSummary,
  [formParts.contact]: ConferenceContact,
  [formParts.description]: ConferenceDescription,
  [formParts.logo]: ConferenceGallery,
};

interface IndexProps {
  id?: string;
  conference?: CreateEventInput;
  className?: string;
}

export default function CreateConference({
  id,
  conference,
  className,
}: IndexProps) {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const _axios = useAxiosPrivate();
  const [conferenceData, setConferenceData] = useState<any | null>(null);
  const methods = useForm<CreateEventInput>({
    defaultValues: defaultValues(conference),
    resolver: zodResolver(conferenceFormSchema),
  });

  useEffect(() => {
    const fetchConference = async () => {
      try {
        const response = await _axios.get(`/service/${id}`);
        if (response.data.status === 'SUCCESS') {
          setConferenceData(response.data.data);
          methods.reset(defaultValues(response.data.data));
        }
      } catch (error) {
        console.error('Error fetching conference:', error);
      }
    };

    if (id) {
      fetchConference();
    }
  }, [id, _axios]);

  const fetchSubscriptions = async (subCategoryId: number) => {
    try {
      const response = await _axios.get(`/subscription/${subCategoryId}`);
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
        subCategoryId: 23,
        serviceSchemaId: 14,
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
        `${API_BASE_URL}/service`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        methods.reset();
        let hasSubscription = await fetchSubscriptions(data.subcategory?.value);
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
          <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 dark:divide-gray-300 @2xl:gap-9 @3xl:gap-11">
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
