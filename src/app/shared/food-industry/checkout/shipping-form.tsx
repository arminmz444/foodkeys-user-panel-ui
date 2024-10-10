import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';

export default function ShippingForm({ register, errors }: any) {
  return (
    <>
      <Text tag="h4" className="mb-3 pt-9 font-medium @2xl:mb-5">
        جزییات ارسال
      </Text>
      <div className="grid grid-cols-1 gap-3 @sm:grid-cols-2 @lg:gap-4 @2xl:gap-5">
        <Input
          label="آدرس اول"
          placeholder="آدرس اول"
          {...register('shippingAddressOne')}
          error={errors.shippingAddressOne?.message}
        />
        <Input
          label="آدرس دوم"
          placeholder="آدرس دوم"
          {...register('shippingAddressTwo')}
          error={errors.shippingAddressTwo?.message}
        />
        <Input
          label="شهر"
          placeholder="شهر"
          {...register('shippingCity')}
          error={errors.shippingCity?.message}
        />
        <Input
          label="کشور"
          placeholder="کشور"
          {...register('shippingCountry')}
          error={errors.shippingCountry?.message}
        />
        <Input
          label="کد پستی"
          placeholder="کد پستی"
          {...register('shippingZip')}
          error={errors.shippingZip?.message}
        />
        <Input
          label="State"
          placeholder="state"
          {...register('shippingState')}
          error={errors.shippingState?.message}
        />
      </div>
    </>
  );
}
