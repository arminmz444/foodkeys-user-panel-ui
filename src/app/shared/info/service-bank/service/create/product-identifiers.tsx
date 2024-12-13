import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import CustomFields from '@/app/shared/ecommerce/product/create/custom-fields';

interface ProductIdentifiersProps {
  className?: string;
}

export default function ProductIdentifiers({
  className,
}: ProductIdentifiersProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="شناسه‌های محصول"
      description="شناسه های محصول خود را اینجا ویریاش کنید"
      className={cn(className)}
    >
      <Input
        label="شماره مورد تجاری جهانی"
        placeholder="12345"
        {...register('tradeNumber')}
        error={errors.tradeNumber?.message as string}
      />
      <Input
        label="شماره قطعه تولید کننده"
        placeholder="145782"
        {...register('manufacturerNumber')}
        error={errors.manufacturerNumber?.message as string}
      />
      <Input
        label="نام برند"
        placeholder="نام برند"
        {...register('brand')}
        error={errors.brand?.message as string}
      />
      <Input
        label="کد محصول UPC/EAN"
        placeholder="145782"
        {...register('upcEan')}
        error={errors.upcEan?.message as string}
      />
      <CustomFields />
    </FormGroup>
  );
}
