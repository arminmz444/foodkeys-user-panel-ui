'use client';

import {
  CreateProductInput,
  defaultValues,
  productFormSchema,
} from '@/app/shared/info/food-industry/company/create/form-utils';
import FormFooter from '@/components/form-footer';
import cn from '@/utils/class-names';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Element } from 'react-scroll';
import { Text } from 'rizzui';
import FormNav, { formParts } from './form-nav';
import RequestInfo from './request-info';
import RequestDescription from './request-description';
import RequestContact from './request-contact';

const MAP_STEP_TO_COMPONENT = {
  [formParts.intro]: RequestInfo,
  [formParts.description]: RequestDescription,
  [formParts.contact]: RequestContact,
  [formParts.logo]: RequestDescription,
};

interface IndexProps {
  id?: string;
  company?: CreateProductInput;
  className?: string;
}

export default function CreateProduct({ id, company, className }: IndexProps) {
  const [isLoading, setLoading] = useState(false);
  const methods = useForm<CreateProductInput>({
    defaultValues: defaultValues(company),
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
            submitBtnText={id ? 'بروز رسانی محصول' : 'ثبت شرکت'}
          />
        </form>
      </FormProvider>
    </div>
  );
}
