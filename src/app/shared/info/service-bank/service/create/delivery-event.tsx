import FormGroup from '@/app/shared/form-group';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePicker } from '@/components/ui/datepicker';
import { Input } from '@/components/ui/input';
import cn from '@/utils/class-names';
import { Controller, useFormContext } from 'react-hook-form';

export default function DeliveryEvent({ className }: { className?: string }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <FormGroup
      title="تاریخ تحویل"
      description="تاریخ تحویل خود را اینجا اضافه کنید"
      className={cn(className)}
    >
      <Controller
        name="isPurchaseSpecifyDate"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            value={value}
            checked={value}
            onChange={onChange}
            label="بله، مشتریان برای خرید این محصول باید یک تاریخ مشخص کنند."
            className="col-span-full"
          />
        )}
      />
      <Input
        label="نام تاریخ"
        placeholder="نام تاریخ"
        className="col-span-full"
        {...register('dateFieldName')}
        error={errors.dateFieldName?.message as string}
      />
      <Controller
        name="isLimitDate"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            value={value}
            checked={value}
            onChange={onChange}
            label="می‌خواهم محدوده تاریخ را محدود کنم."
            className="col-span-full"
          />
        )}
      />
      <Controller
        name="availableDate"
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <DatePicker
            inputProps={{ label: 'تاریخ موجود' }}
            placeholderText="انتخاب تاریخ"
            dateFormat="dd/MM/yyyy"
            onChange={onChange}
            onBlur={onBlur}
            selected={value}
          />
        )}
      />
      <Controller
        name="endDate"
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <DatePicker
            inputProps={{ label: 'تاریخ پایان' }}
            placeholderText="انتخاب تاریخ"
            dateFormat="dd/MM/yyyy"
            onChange={onChange}
            onBlur={onBlur}
            selected={value}
          />
        )}
      />
    </FormGroup>
  );
}
