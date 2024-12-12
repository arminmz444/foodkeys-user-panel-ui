'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Element } from 'react-scroll';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Text } from 'rizzui';
import FormNav, { formParts } from './form-nav';
import {
  defaultValues,
  exhibitionFormSchema,
  CreateEventInput,
} from '@/app/shared/info/exhibitions/create/form-utils';
import ProductMedia from '@/app/shared/info/exhibitions/create/product-media';
import PricingInventory from '@/app/shared/info/exhibitions/create/pricing-inventory';
import ProductIdentifiers from '@/app/shared/info/exhibitions/create/product-identifiers';
import ShippingInfo from '@/app/shared/info/exhibitions/create/shipping-info';
import ProductSeo from '@/app/shared/info/exhibitions/create/product-seo';
import DeliveryEvent from '@/app/shared/info/exhibitions/create/delivery-event';
import ProductVariants from '@/app/shared/info/exhibitions/create/product-variants';
import ProductTaxonomies from '@/app/shared/info/exhibitions/create/product-tags';
import FormFooter from '@/components/form-footer';
import CompanyFactory from '@/app/shared/info/exhibitions/create/company-factory';
import CompanyOffice from '@/app/shared/info/exhibitions/create/company-office';
import CompanySocial from '@/app/shared/info/exhibitions/create/company-social';
import CompanyComplementary from '@/app/shared/info/exhibitions/create/company-complementary';
import CompanyHistory from './company-history';
import cn from '@/utils/class-names';
import ExhibitionContact from './exhibition-contact';
import ExhibitionDescription from './exhibition-description';
import ExhibitionSummary from './exhibition-summary';

const MAP_STEP_TO_COMPONENT = {
  [formParts.intro]: ExhibitionSummary,
  [formParts.contact]: ExhibitionContact,
  [formParts.description]: ExhibitionDescription,
  [formParts.logo]: ExhibitionDescription,
};

interface IndexProps {
  id?: string;
  exhibition?: CreateEventInput;
  className?: string;
}

export default function CreateExhibition({
  id,
  exhibition,
  className,
}: IndexProps) {
  const [isLoading, setLoading] = useState(false);
  const methods = useForm<CreateEventInput>({
    defaultValues: defaultValues(exhibition),
    resolver: zodResolver(exhibitionFormSchema),
  });

  const onSubmit: SubmitHandler<CreateEventInput> = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('exhibition_data', data);
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
            submitBtnText={id ? 'بروز رسانی نمایشگاه' : 'ثبت نمایشگاه'}
          />
        </form>
      </FormProvider>
    </div>
  );
}
