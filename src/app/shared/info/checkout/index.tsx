'use client';

import { z } from 'zod';
import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';
import { Textarea } from '@/components/ui/textarea';
import OrderSummery from './order-summery';
import ShippingMethod from './shipping-method';
import PaymentMethod from './payment-method';
import ShippingForm from './shipping-form';
import BillingForm from './billing-form';
import { toast } from 'react-hot-toast';

// form zod validation schema
const orderFormSchema = z.object({
  firstName: z.string().min(1, { message: 'این فیلد اجباری میباشد' }),
  lastName: z.string().min(1, { message: 'این فیلد اجباری میباشد' }),
  phoneNumber: z
    .string()
    .min(1, { message: 'شماره تماس اشتباه میباشد' })
    .optional(),
  companyName: z.string().min(1, { message: 'شرکت اجباری میباشد' }),
  city: z.string().min(1, { message: 'شهر اجباری میباشد' }),
  country: z.string().min(1, { message: 'کشور اجباری میباشد' }),
  state: z.string().min(1, { message: 'منطقه اجباری میباشد' }),
  addressOne: z.string().min(1, { message: 'آدرس اجباری میباشد' }),
  addressTwo: z.string().optional(),
  zip: z.string().min(1, { message: 'کد پستی اجباری میباشد' }),
  isSameShippingAddress: z.string().optional(),
  shippingAddressOne: z.string().optional(),
  shippingAddressTwo: z.string().optional(),
  shippingCity: z.string().optional(),
  shippingCountry: z.string().optional(),
  shippingState: z.string().optional(),
  shippingZip: z.string().optional(),
  note: z.string().optional(),
  paymentMethod: z.string().optional(),
  shippingMethod: z.string().optional(),
  shippingSpeed: z.string().optional(),
  cardPayment: z.object({
    cardNumber: z.string().optional(),
    expireMonth: z.number().or(z.string()).optional(),
    expireYear: z.number().or(z.string()).optional(),
    cardCVC: z.string().optional(),
    cardUserName: z.string().optional(),
    isSaveCard: z.boolean().optional(),
  }),
});

// generate form types from zod validation schema
type OrderFormTypes = z.infer<typeof orderFormSchema>;

// main order form component for create and update order
export default function CheckoutPageWrapper({
  id,
  order,
}: {
  id?: string;
  order?: OrderFormTypes;
}) {
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<OrderFormTypes> = (data) => {
    toast.success(<Text tag="b">سفارش با موفیت انجام شد!</Text>);
    // set timeout ony required to display loading state of the create order button
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('createOrder data ->', data);
      setReset({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        companyName: '',
        city: '',
        country: '',
        state: '',
        addressOne: '',
        addressTwo: '',
        zip: '',
        isSameShippingAddress: '',
        shippingAddressOne: '',
        shippingAddressTwo: '',
        shippingCity: '',
        shippingCountry: '',
        shippingState: '',
        shippingZip: '',
        note: '',
        paymentMethod: '',
        shippingMethod: '',
        shippingSpeed: '',
        cardPayment: {
          cardNumber: '',
          expireMonth: '',
          expireYear: '',
          cardCVC: '',
          cardUserName: '',
          isSaveCard: '',
        },
      });
    }, 600);
  };

  return (
    <Form<OrderFormTypes>
      validationSchema={orderFormSchema}
      resetValues={reset}
      onSubmit={onSubmit}
      useFormProps={{
        defaultValues: {
          ...order,
          isSameShippingAddress: 'SameShippingAddress',
          shippingSpeed: 'default',
        },
      }}
      className="isomorphic-form mx-auto flex w-full max-w-[1536px] flex-grow flex-col @container"
    >
      {({ register, control, watch, formState: { errors } }) => {
        const checkIsSameShippingAddress = watch('isSameShippingAddress');
        const checkShippingSpeed = watch('shippingMethod');
        return (
          <>
            <div className="items-start @5xl:grid @5xl:grid-cols-12 @5xl:gap-7 @6xl:grid-cols-10 @7xl:gap-10">
              <div className="border-gray-200 @container @5xl:col-span-8 @5xl:border-e @5xl:pb-12 @5xl:pe-7 @6xl:col-span-7 @7xl:pe-12">
                <div className="flex-grow @5xl:pb-10">
                  <div>
                    <BillingForm
                      control={control}
                      register={register}
                      errors={errors}
                    />

                    {checkIsSameShippingAddress ===
                      'DifferentShippingAddress' && (
                      <ShippingForm register={register} errors={errors} />
                    )}

                    <div className="mt-4 border-t border-gray-200 pt-4 @xs:mt-7 @xs:pt-6 @5xl:mt-9 @5xl:pt-7">
                      <Textarea
                        label="یادداشت خرید (اختیاری)"
                        placeholder="یادداشت خرید"
                        {...register('note')}
                        error={errors.note?.message}
                        textareaClassName="h-20"
                      />
                    </div>

                    <ShippingMethod
                      register={register}
                      checkShippingSpeed={checkShippingSpeed}
                    />

                    <PaymentMethod control={control} register={register} />
                  </div>
                </div>
              </div>

              <OrderSummery
                subtotal={'تومان140.00'}
                tax={'تومان0.18'}
                shipping={'تومان50.00'}
                total={'تومان190.18'}
              />
            </div>
          </>
        );
      }}
    </Form>
  );
}
