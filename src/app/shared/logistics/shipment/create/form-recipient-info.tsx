import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import { Checkbox } from '@/components/ui/checkbox';
import { PiEnvelopeSimple } from 'react-icons/pi';

interface FormRecipientInfoProps {
  className?: string;
}

export default function FormRecipientInfo({
  className,
}: FormRecipientInfoProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <FormGroup
      title="جزییات دریافت کننده"
      description="جزییات دریافت کننده را اینجا وارد کنید"
      className={cn(className)}
    >
      <Input
        label="نام"
        placeholder="آرمین مظفری"
        labelClassName="font-medium text-gray-900"
        {...register('recipientName')}
        error={errors.recipientName?.message as string}
      />
      <Input
        label="آدرس"
        labelClassName="font-medium text-gray-900"
        placeholder="شیراز فلکه گازو"
        {...register('recipientAddress')}
        error={errors.recipientAddress?.message as string}
      />
      <Input
        label="ایمیل"
        labelClassName="font-medium text-gray-900"
        placeholder="kenzi.lawson@example.com"
        {...register('recipientEmail')}
        error={errors.recipientEmail?.message as string}
      />
      <Input
        label="شماره تماس"
        labelClassName="font-medium text-gray-900"
        placeholder="09123456789"
        {...register('recipientPhone')}
        error={errors.recipientPhone?.message as string}
      />
      <Controller
        name="notifyRecipientViaSMS"
        render={({ field: { value, onChange } }) => (
          <Checkbox
            value={value}
            onChange={onChange}
            label={
              <span className="flex items-center gap-1">
                با SMS بهم اطلاع رسانی کن
                <PiEnvelopeSimple className="h-4 w-4" />
              </span>
            }
            size="sm"
            className="-mt-2"
          />
        )}
      />
    </FormGroup>
  );
}
