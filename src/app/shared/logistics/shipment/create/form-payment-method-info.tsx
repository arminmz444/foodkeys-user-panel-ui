import { PiCheckCircleFill } from 'react-icons/pi';
import { Controller, useFormContext } from 'react-hook-form';
import cn from '@/utils/class-names';
import NoSSR from '@/components/no-ssr';
import Select from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { RadioGroup } from '@/components/ui/radio-group';
import { AdvancedRadio } from '@/components/ui/advanced-radio';
import FormGroup from '@/app/shared/form-group';
import {
  paidBy,
  countries,
  paymentMethods,
} from '@/app/shared/logistics/shipment/create/select-options';

interface FormPaymentMethodInfoProps {
  className?: string;
}

export default function FormPaymentMethodInfo({
  className,
}: FormPaymentMethodInfoProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <FormGroup
      title="جزییات نحوه ارسال"
      description="جزییات نحوه ارسال را اینجا وارد کنید"
      className={cn(className)}
    >
      <NoSSR>
        <Controller
          name="paidBy"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label="پرداخت توسط"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid"
              value={value}
              onChange={onChange}
              options={paidBy}
              getOptionValue={(option) => option.value}
              displayValue={(selected) =>
                paidBy?.find((c) => c.value === selected)?.name ?? ''
              }
              error={errors?.paidBy?.message as string}
              placeholder="انتخاب"
            />
          )}
        />
        <Controller
          control={control}
          name="paymentMethod"
          render={({ field: { value, onChange } }) => (
            <Select
              label="روش پرداخت"
              dropdownClassName="p-2 gap-1 grid"
              value={value}
              onChange={onChange}
              options={paymentMethods}
              getOptionValue={(option) => option.value}
              displayValue={(selected) =>
                paymentMethods?.find((c) => c.value === selected)?.name ?? ''
              }
              error={errors?.paymentMethod?.message as string}
              placeholder="انتخاب"
            />
          )}
        />
      </NoSSR>
      <Controller
        name="paymentType"
        control={control}
        render={({ field: { value, onChange } }) => (
          <RadioGroup
            value={value}
            setValue={onChange}
            className="col-span-full grid gap-4 @lg:grid-cols-2"
          >
            <AdvancedRadio
              value="payNow"
              className="grid gap-y-2 rounded-xl border border-gray-300 p-5 text-sm hover:cursor-pointer hover:border-gray-1000"
              inputClassName="[&:checked~span>div>.icon]:block [&:checked~span]:ring-1 [&:checked~span]:ring-offset-0 [&:checked~span]:ring-gray-1000 [&:checked~span]:!border-gray-1000"
            >
              <div className="flex justify-between">
                <span className="font-medium text-gray-900">
                  الان پرداخت کن
                </span>
                <PiCheckCircleFill className="icon hidden h-5 w-5 text-gray-900" />
              </div>
              <p className="text-gray-500">پرداخت توسط کارت اعتباری</p>
            </AdvancedRadio>
            <AdvancedRadio
              value="payLater"
              className="grid gap-y-2 rounded-xl border border-gray-300 p-5 text-sm hover:cursor-pointer hover:border-gray-1000"
              inputClassName="[&:checked~span>div>.icon]:block [&:checked~span]:ring-1 [&:checked~span]:ring-offset-0 [&:checked~span]:ring-gray-1000 [&:checked~span]:!border-gray-1000"
            >
              <div className="flex justify-between">
                <span className="font-medium text-gray-900">
                  بعدا پرداخت کن
                </span>
                <PiCheckCircleFill className="icon hidden h-5 w-5 text-gray-900" />
              </div>
              <p className="text-gray-500">پرداخت درب منزل</p>
            </AdvancedRadio>
          </RadioGroup>
        )}
      />
      <Input
        label="پرداخت کننده"
        placeholder="آرمین مظفری"
        labelClassName="font-medium text-gray-900"
        {...register('payeeName')}
        error={errors.payeeName?.message as string}
      />
      <NoSSR>
        <Controller
          control={control}
          name="payeeCountry"
          render={({ field: { value, onChange } }) => (
            <Select
              label="کشور"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid"
              value={value}
              onChange={onChange}
              options={countries}
              getOptionValue={(option) => option.value}
              displayValue={(selected) =>
                countries?.find((c) => c.value === selected)?.name ?? ''
              }
              error={errors?.payeeCountry?.message as string}
              placeholder="انتخاب"
            />
          )}
        />
      </NoSSR>
      <Input
        label="شهر"
        placeholder="شهر"
        labelClassName="font-medium text-gray-900"
        {...register('payeeCity')}
        error={errors.payeeCity?.message as string}
      />
      <Input
        label="آدرس"
        labelClassName="font-medium text-gray-900"
        placeholder="آدرس"
        {...register('payeeStreetAddress')}
        error={errors.payeeStreetAddress?.message as string}
      />
    </FormGroup>
  );
}
