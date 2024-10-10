'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Element } from 'react-scroll';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import cn from '../../../../../../utils/class-names';
import { Text } from 'rizzui';
import FormNav, { formParts } from './form-nav';
import {
  defaultValues,
  productFormSchema,
  CreateProductInput,
} from '@/app/shared/info/food-industry/company/create/form-utils';
import ProductMedia from '@/app/shared/info/food-industry/company/create/product-media';
import PricingInventory from '@/app/shared/info/food-industry/company/create/pricing-inventory';
import ProductIdentifiers from '@/app/shared/info/food-industry/company/create/product-identifiers';
import ShippingInfo from '@/app/shared/info/food-industry/company/create/shipping-info';
import ProductSeo from '@/app/shared/info/food-industry/company/create/product-seo';
import DeliveryEvent from '@/app/shared/info/food-industry/company/create/delivery-event';
import ProductVariants from '@/app/shared/info/food-industry/company/create/product-variants';
import ProductTaxonomies from '@/app/shared/info/food-industry/company/create/product-tags';
import FormFooter from '@/components/form-footer';
import CompanyFactory from '@/app/shared/info/food-industry/company/create/company-factory';
import CompanyOffice from '@/app/shared/info/food-industry/company/create/company-office';
import CompanyComplementary from '@/app/shared/info/food-industry/company/create/company-complementary';
import CompanySummary from './company-summary';
import CompanyContact from './company-contact';
import CompanySocial from './company-social';
import CompanyDescription from './company-description';

const MAP_STEP_TO_COMPONENT = {
  [formParts.intro]: CompanySummary,
  [formParts.contact]: CompanyContact,
  [formParts.social]: CompanySocial,
  [formParts.description]: CompanyDescription,

  [formParts.media]: ProductMedia,
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
            submitBtnText={id ? 'بروز رسانی دستگاه' : 'ثبت دستگاه'}
          />
        </form>
      </FormProvider>
    </div>
  );
}
