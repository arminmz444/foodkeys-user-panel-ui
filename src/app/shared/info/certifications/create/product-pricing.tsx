import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';

export default function ProductPricing() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Input
        label="ثیمت"
        placeholder="10"
        {...register('price')}
        error={errors.price?.message as string}
        prefix={'تومان'}
        type="number"
      />
      <Input
        label="قیمت کل"
        placeholder="15"
        {...register('costPrice')}
        error={errors.costPrice?.message as string}
        prefix={'تومان'}
        type="number"
      />
      <Input
        label="قیمت جزیی"
        placeholder="10"
        {...register('retailPrice')}
        error={errors.retailPrice?.message as string}
        prefix={'تومان'}
        type="number"
      />
      <Input
        label="قیمت با تخفیف"
        placeholder="20"
        {...register('salePrice')}
        error={errors.salePrice?.message as string}
        prefix={'تومان'}
        type="number"
      />
    </>
  );
}
