import { Controller } from 'react-hook-form';
import { Text } from '@/components/ui/text';
import { Radio } from '@/components/ui/radio';
import { Input } from '@/components/ui/input';
import { PhoneNumber } from '@/components/ui/phone-input';

export default function BillingForm({ register, errors, control }: any) {
  return (
    <>
      <Text tag="h3" className="mb-3 font-semibold @2xl:mb-5">
        جزییات خرید
      </Text>
      <div className="grid grid-cols-1 gap-3 @sm:grid-cols-2 @lg:gap-4 @2xl:gap-5">
        <Input
          label="نام"
          placeholder="نام"
          {...register('firstName')}
          error={errors.firstName?.message}
        />
        <Input
          label="فامیل"
          placeholder="فامیل"
          {...register('lastName')}
          error={errors.lastName?.message}
        />
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field: { value, onChange } }) => (
            <PhoneNumber
              label="شماره تماس"
              country="ir"
              value={value}
              onChange={onChange}
              className="rtl:[&>.selected-flag]:left-0"
              inputClassName="rtl:pr-12"
              buttonClassName="rtl:[&>.selected-flag]:left-2 rtl:[&>.selected-flag_.arrow]:-left-6"
            />
          )}
        />
        <Input
          label="نام شرکت"
          placeholder="نام شرکت"
          {...register('companyName')}
          error={errors.companyName?.message}
        />
        <Input
          label="آدرس اول"
          placeholder="آدرس اول"
          {...register('addressOne')}
          error={errors.addressOne?.message}
        />
        <Input
          label="آدرس دوم"
          placeholder="آدرس دوم"
          {...register('addressTwo')}
          error={errors.addressTwo?.message}
        />
        <Input
          label="شهر"
          placeholder="شهر"
          {...register('city')}
          error={errors.city?.message}
        />
        <Input
          label="کشور"
          placeholder="کشور"
          {...register('country')}
          error={errors.country?.message}
        />
        <Input
          label="کد پستی"
          placeholder="کد پستی"
          {...register('zip')}
          error={errors.zip?.message}
        />
        <Input
          label="منطقه"
          placeholder="منطقه"
          {...register('state')}
          error={errors.state?.message}
        />
        <div className="flex flex-col space-y-5 pt-1 @sm:col-span-full">
          <Radio
            label="آدرس پرداخت با آدرس ارسال برار است"
            value="SameShippingAddress"
            {...register('isSameShippingAddress')}
            inputClassName="dark:checked:!bg-gray-200 dark:checked:!border-gray-200 dark:focus:ring-gray-200 dark:focus:ring-offset-gray-0"
          />
          <Radio
            label="آدرس پرداخت متفاوت است"
            value="DifferentShippingAddress"
            {...register('isSameShippingAddress')}
            inputClassName="dark:checked:!bg-gray-200 dark:checked:!border-gray-200 dark:focus:ring-gray-200 dark:focus:ring-offset-gray-0"
          />
        </div>
      </div>
    </>
  );
}
