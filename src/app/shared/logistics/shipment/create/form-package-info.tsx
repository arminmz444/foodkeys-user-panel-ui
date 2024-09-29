import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import { RadioGroup } from '@/components/ui/radio-group';
import { PiCheckCircleFill, PiGift } from 'react-icons/pi';
import FileInput from './file-input';
import { AdvancedRadio } from '@/components/ui/advanced-radio';
import { toCurrency } from '@/utils/to-currency';

interface FormPackageInfoProps {
  className?: string;
}

export default function FormPackageInfo({ className }: FormPackageInfoProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  // const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  // console.log('uploadedImage', uploadedImage);

  return (
    <FormGroup
      title="جزییات بسته"
      description="جزییات بسته را اینجا وارد کنید"
      className={cn(className)}
    >
      <Input
        label="مقدار"
        placeholder="0"
        className="col-span-full"
        labelClassName="font-medium text-gray-900"
        {...register('packageAmount')}
        error={errors.packageAmount?.message as string}
      />
      <div className="col-span-full grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Input
          label="عرض"
          placeholder="0"
          labelClassName="font-medium text-gray-900"
          {...register('packageWidth')}
          error={errors.packageWidth?.message as string}
        />
        <Input
          label="ارتفاع"
          placeholder="0"
          labelClassName="font-medium text-gray-900"
          {...register('packageHeight')}
          error={errors.packageHeight?.message as string}
        />
        <Input
          label="طول"
          placeholder="0"
          labelClassName="font-medium text-gray-900"
          {...register('packageLength')}
          error={errors.packageLength?.message as string}
        />
        <Input
          label="وزن"
          placeholder="0"
          labelClassName="font-medium text-gray-900"
          {...register('packageWeight')}
          error={errors.packageWeight?.message as string}
        />
      </div>
      <Textarea
        label="جزییات بسته"
        labelClassName="font-medium text-gray-900"
        placeholder="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و "
        className="col-span-full"
        {...register('packageDescription')}
        error={errors.packageDescription?.message as string}
      />
      <Controller
        control={control}
        name="packageInfoAttachment"
        render={({ field }) => (
          <FileInput className="col-span-full" {...field} />
        )}
      />
      <div className="mt-3">
        <h4 className="flex items-center gap-1 text-base font-bold text-gray-900 @7xl:text-lg">
          <PiGift className="h-6 w-6" />
          اضافه کردن بسته بندی
        </h4>
        <p className="mt-1">متن شخصی روی بسته</p>
      </div>
      <Controller
        name="giftType"
        control={control}
        render={({ field: { value, onChange } }) => (
          <RadioGroup
            value={value}
            setValue={onChange}
            className="col-span-full grid gap-4 @lg:grid-cols-2"
          >
            <AdvancedRadio
              value="giftWrap"
              className="grid gap-y-2 rounded-xl border border-gray-300 p-5 text-sm hover:cursor-pointer hover:border-gray-1000"
              inputClassName="[&:checked~span>div>.icon]:block [&:checked~span]:ring-1 [&:checked~span]:ring-offset-0 [&:checked~span]:ring-gray-1000 [&:checked~span]:!border-gray-1000"
            >
              <div className="flex justify-between">
                <span className="font-medium text-gray-900">هدیه</span>
                <PiCheckCircleFill className="icon hidden h-5 w-5 text-gray-900" />
              </div>
              <p className="text-gray-500">{toCurrency(5)}</p>
            </AdvancedRadio>
            <AdvancedRadio
              value="free"
              className="grid gap-y-2 rounded-xl border border-gray-300 p-5 text-sm hover:cursor-pointer hover:border-gray-1000"
              inputClassName="[&:checked~span>div>.icon]:block [&:checked~span]:ring-1 [&:checked~span]:ring-offset-0 [&:checked~span]:ring-gray-1000 [&:checked~span]:!border-gray-1000"
            >
              <div className="flex justify-between">
                <span className="font-medium text-gray-900">نوشتن متن</span>
                <PiCheckCircleFill className="icon hidden h-5 w-5 text-gray-900" />
              </div>
              <p className="text-gray-500">رایگان</p>
            </AdvancedRadio>
          </RadioGroup>
        )}
      />
      <Input
        label="از"
        placeholder="صادق صادقی"
        labelClassName="font-medium text-gray-900"
        {...register('giftFrom')}
        error={errors.giftFrom?.message as string}
      />
      <Input
        label="به"
        placeholder="مهسا امینی"
        labelClassName="font-medium text-gray-900"
        {...register('giftTo')}
        error={errors.giftTo?.message as string}
      />
      <Textarea
        {...register('giftMessage')}
        label="متن"
        className="col-span-full"
        labelClassName="font-medium text-gray-900"
        placeholder="متن خود را اینجا بنویسید"
        error={errors.giftMessage?.message as string}
      />
    </FormGroup>
  );
}
