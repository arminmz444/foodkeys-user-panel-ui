import { Controller, useFormContext } from 'react-hook-form';
import FormGroup from '@/app/shared/form-group';
import Select from '@/components/ui/select';
import NoSSR from '@/components/no-ssr';
import FileInput from './file-input';
import {
  offices,
  agencies,
  countries,
  deliveryTimes,
  packagingTypes,
  shippingMethods,
  courierCompanies,
} from '@/app/shared/logistics/shipment/create/select-options';

export default function FormShippingInfo() {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <FormGroup title="جزییات ارسال" description="اضافه کردن اطلاعات مهم ارسال">
      <NoSSR>
        <Controller
          control={control}
          name="country"
          render={({ field: { value, onChange } }) => (
            <Select
              label="نام کشور"
              className="col-span-full"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid"
              value={value}
              onChange={onChange}
              options={countries}
              getOptionValue={(option) => option.value}
              displayValue={(selected: string) =>
                countries?.find((c) => c.value === selected)?.name ?? ''
              }
              error={errors?.country?.message as string}
              placeholder="انتخاب"
            />
          )}
        />
        <Controller
          control={control}
          name="agency"
          render={({ field: { value, onChange } }) => (
            <Select
              label="لیست آژانس ها"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid"
              value={value}
              onChange={onChange}
              options={agencies}
              getOptionValue={(option) => option.value}
              displayValue={(selected: string) =>
                agencies?.find((c) => c.value === selected)?.name
              }
              error={errors?.agency?.message as string}
              placeholder="انتخاب"
            />
          )}
        />
        <Controller
          control={control}
          name="officeOrigin"
          render={({ field: { value, onChange } }) => (
            <Select
              label="محل دفتر"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid"
              value={value}
              onChange={onChange}
              options={offices}
              getOptionValue={(option) => option.value}
              displayValue={(selected: string) =>
                offices?.find((c) => c.value === selected)?.name ?? ''
              }
              error={errors?.officeOrigin?.message as string}
              placeholder="انتخاب"
            />
          )}
        />
        <Controller
          control={control}
          name="shippingMethod"
          render={({ field: { value, onChange } }) => (
            <Select
              label="نحوه ارسال"
              dropdownClassName="p-2 gap-1 grid"
              value={value}
              onChange={onChange}
              options={shippingMethods}
              getOptionValue={(option) => option.value}
              displayValue={(selected: string) =>
                shippingMethods?.find((c) => c.value === selected)?.name ??
                selected
              }
              error={errors?.officeOrigin?.message as string}
              placeholder="انتخاب"
            />
          )}
        />
        <Controller
          control={control}
          name="packagingType"
          render={({ field: { value, onChange } }) => (
            <Select
              label="نوع بسته"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid"
              value={value}
              onChange={onChange}
              options={packagingTypes}
              getOptionValue={(option) => option.value}
              displayValue={(selected: string) =>
                packagingTypes?.find((c) => c.value === selected)?.name ?? ''
              }
              error={errors?.officeOrigin?.message as string}
              placeholder="انتخاب"
            />
          )}
        />
        <Controller
          control={control}
          name="courierCompany"
          render={({ field: { value, onChange } }) => (
            <Select
              label="کشور مقصد"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid"
              value={value}
              onChange={onChange}
              options={courierCompanies}
              getOptionValue={(option) => option.value}
              displayValue={(selected: string) =>
                courierCompanies?.find((c) => c.value === selected)?.name ?? ''
              }
              error={errors?.officeOrigin?.message as string}
              placeholder="انتخاب"
            />
          )}
        />
        <Controller
          control={control}
          name="deliveryTime"
          render={({ field: { value, onChange } }) => (
            <Select
              label="زمان دریافت"
              labelClassName="text-gray-900"
              dropdownClassName="p-2 gap-1 grid"
              value={value}
              onChange={onChange}
              options={deliveryTimes}
              getOptionValue={(option) => option.value}
              displayValue={(selected: string) =>
                deliveryTimes?.find((c) => c.value === selected)?.name ?? ''
              }
              error={errors?.officeOrigin?.message as string}
              placeholder="انتخاب"
            />
          )}
        />
      </NoSSR>
      <Controller
        control={control}
        name="shippingInfoAttachment"
        render={({ field }) => (
          <FileInput className="col-span-full" {...field} />
        )}
      />
    </FormGroup>
  );
}
