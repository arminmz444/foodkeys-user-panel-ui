'use client';

import {
  CreateProductInput,
  defaultValues,
  productFormSchema,
} from '@/app/shared/info/associations/create/form-utils';
import FormFooter from '@/components/form-footer';
import cn from '@/utils/class-names';
import { zodResolver } from '@hookform/resolvers/zod';
import {useEffect, useState} from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Element } from 'react-scroll';
import { Text } from 'rizzui';
import FormNav, { formParts } from './form-nav';
import CompanyInfo from './company-info';
import CompanyDescription from './company-description';
import CompanyContact from './company-contact';
import {useRouter} from "next/navigation";
import useAxiosPrivate from "@/hooks/use-axios-private";
import AssociationGallery from "@/app/shared/info/associations/create/association-gallery";

const MAP_STEP_TO_COMPONENT = {
  [formParts.intro]: CompanyInfo,
  [formParts.description]: CompanyDescription,
  [formParts.contact]: CompanyContact,
  [formParts.logo]: AssociationGallery,
};

interface IndexProps {
  id?: string;
  association?: CreateProductInput;
  className?: string;
}

export default function CreateAssociation({ id, association, className }: IndexProps) {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const _axios = useAxiosPrivate();
  const [associationData, setAssociationData] = useState<any | null>(null);

  const methods = useForm<CreateProductInput>({
    defaultValues: defaultValues(associationData),
    resolver: zodResolver(productFormSchema),
  });

  const onSubmit: SubmitHandler<CreateProductInput> = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('product_data', data);
      toast.success(
        <Text tag="b">
          {id ? 'بروزرسانی اطلاعات' : 'ثبت اطلاعات'} موفقیت آمیز بود
        </Text>
      );
      methods.reset();
    }, 600);
  };

  useEffect(() => {
    const fetchAssociation = async () => {
      try {
        const response = await _axios.get(`/service/${id}`);
        if (response.data.status === 'SUCCESS') {
          setAssociationData(response.data.data);
          methods.reset(defaultValues(response.data.data));
        }
      } catch (error) {
        console.error('Error fetching exhibition:', error);
      }
    };

    if (id) {
      fetchAssociation();
    }
  }, [id, _axios]);
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
            submitBtnText={id ? 'بروز رسانی انجمن' : 'ثبت انجمن'}
          />
        </form>
      </FormProvider>
    </div>
  );
}
