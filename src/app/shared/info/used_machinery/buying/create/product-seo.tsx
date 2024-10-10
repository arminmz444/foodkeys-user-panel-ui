import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';

export default function ProductSeo({ className }: { className?: string }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="بهینه‌سازی موتورهای جستجو"
      description="اطلاعات بهینه‌سازی موتورهای جستجو محصول خود را در اینجا اضافه کنید"
      className={cn(className)}
    >
      <Input
        label="عنوان صفحه"
        placeholder="عنوان صفحه"
        {...register('pageTitle')}
        error={errors.pageTitle?.message as string}
      />
      <Input
        label="کلمه کلیدی"
        placeholder="کلمه کلیدی"
        {...register('metaKeywords')}
        error={errors.metaKeywords?.message as string}
      />
      <Input
        label="عنوان متا"
        placeholder="عنوان متا"
        {...register('metaDescription')}
        error={errors.metaDescription?.message as string}
      />
      <Input
        label="ادرس محصول"
        type="url"
        placeholder="https://"
        {...register('productUrl')}
        error={errors.productUrl?.message as string}
      />
    </FormGroup>
  );
}
