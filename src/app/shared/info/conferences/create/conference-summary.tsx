import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import { useEffect, useState } from 'react';
import { RadioGroup } from '@/components/ui/radio-group';
import { Radio, Textarea } from 'rizzui';
import { DatePicker } from '@/components/ui/datepicker';
import JalaliDatePicker from '@/components/ui/react-shamsi-date-picker';

const Select = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => <SelectLoader />,
});

const placementType = [
  { value: '1', label: 'حضوری' },
  { value: '2', label: 'مجازی' },
  { value: '3', label: 'حضوری / مجازی' },
];

const categoryOption = [
  { value: 0, name: 'همایش داخلی' },
  { value: 1, name: 'همایش خارجی' },
];

export default function ConferenceSummary({
  className,
  resetAll,
}: {
  className?: string;
}) {
  const {
    register,
    control,
    watch,
    formState: { errors },
    setValue,
  } = useFormContext();

  const [startDateValue, setStartDateValue] = useState<any>('');
  const [endDateValue, setEndDateValue] = useState<any>('');

  const watchedLogo = watch('logo', '');
  const watchedStartDate = watch('startDate', '');
  const watchedEndDate = watch('endDate', '');

  useEffect(() => {
    setStartDateValue('');
    setEndDateValue('');
  }, [resetAll]);
  useEffect(() => {
    if (watchedStartDate) setStartDateValue(new Date(watchedStartDate));
  }, [watchedStartDate]);

  useEffect(() => {
    if (watchedEndDate) setEndDateValue(new Date(watchedEndDate));
  }, [watchedEndDate]);

  return (
    <>
      <FormGroup
        title="معرفی همایش"
        description="شامل عنوان، تاریخ و ..."
        className={cn(className)}
      >
        <Controller
          name="category"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              // options={categoryOption}
              options={categoryOption.map((category) => ({
                value: category.value,
                name: category.name,
              }))}
              onChange={onChange}
              value={value}
              label="دسته‌بندی"
              error={errors?.category?.message as string}
              // getOptionValue={(option) => option.name}
              placeholder="انتخاب"
              className="col-span-full"
            />
          )}
        />

        <Controller
          name="placementType"
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <label htmlFor="placementType" className="col-span-full">
                نحوه برگذاری*
              </label>
              <RadioGroup
                id="placementType"
                value={value}
                setValue={onChange}
                className="col-span-full grid gap-4"
              >
                {placementType.map((item) => (
                  <Radio
                    required
                    key={item.value}
                    value={item.value}
                    label={item.label}
                    inputClassName="dark:checked:!bg-gray-200 dark:checked:!border-gray-200 dark:focus:ring-gray-200 dark:focus:ring-offset-gray-0"
                  />
                ))}
              </RadioGroup>
            </>
          )}
        />
        {/* <Controller
          name="placementType"
          control={control}
          render={({ field: { onChange, value } }) => (
            <RadioGroup
              value={value}
              setValue={onChange}
              className="col-span-full grid gap-4"
            >
              {placementType.map((item) => (
                <Radio key={item.value} value={item.value} label={item.label} />
              ))}
            </RadioGroup>
          )}
        /> */}

        <Input
          label="عنوان همایش*"
          placeholder="عنوان همایش"
          {...register('title')}
          error={errors.title?.message as string}
        />
        <Input
          label="برگزارکننده*"
          placeholder="برگزارکننده"
          {...register('organizer')}
          error={errors.organizer?.message as string}
        />
        <Input
          label="کشور / شهر*"
          placeholder="کشور / شهر"
          {...register('country')}
          error={errors.country?.message as string}
        />
        <Input
          label="مکان برگزاری*"
          placeholder="مکان برگزاری"
          {...register('venue')}
          error={errors.venue?.message as string}
          helperText="(مثال: نمایشگاه بین المللی تهران)"
        />

        {/* <Controller
          name="startDate"
          control={control}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              selected={value}
              onChange={onChange}
              placeholderText="تاریخ شروع"
              inputProps={{ label: 'تاریخ شروع' }}
            />
          )}
        />
        {errors.startDate && (
          <p className="text-red-500">{errors.startDate?.message as string}</p>
        )}

        <Controller
          name="endDate"
          control={control}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              selected={value}
              onChange={onChange}
              placeholderText="تاریخ پایان"
              inputProps={{ label: 'تاریخ پایان' }}
            />
          )}
        />
        {errors.endDate && (
          <p className="text-red-500">{errors.endDate?.message as string}</p>
        )} */}
        <Controller
          name="startDate"
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            // @ts-ignore
            <JalaliDatePicker
              selected={startDateValue}
              onChange={(e: any) => {
                setStartDateValue(e);
                setValue('startDate', e);
              }}
              dateFormat="YYYY-MM-DDTHH:mm"
              maxDate={new Date()} //new Date().setDate(new Date().getDate() + 1)
              placeholderText="تاریخ شروع"
              inputProps={{
                variant: 'outline',
                label: 'تاریخ شروع',
                inputClassName: 'p-4 border border-gray-300 rounded-md',
              }}
              popperPlacement="bottom-end"
              className="rmdp-mobile custom-calendar flex-grow"
            />
          )}
        />
        {errors.startDate && (
          <p className="text-red-500 text-sm">
            {errors.startDate.message as string}
          </p>
        )}
        <Controller
          name="endDate"
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            // @ts-ignore
            <JalaliDatePicker
              selected={endDateValue}
              onChange={(e: any) => {
                setEndDateValue(e);
                setValue('endDate', e);
              }}
              dateFormat="YYYY-MM-DDTHH:mm"
              // maxDate={new Date()}
              placeholderText="تاریخ پایان"
              inputProps={{
                variant: 'outline',
                label: 'تاریخ پایان',
                inputClassName: 'p-4 border border-gray-300 rounded-md',
              }}
              popperPlacement="bottom-end"
              className="rmdp-mobile custom-calendar flex-grow"
            />
          )}
        />
        {errors.endDate && (
          <p className="text-red-500 text-sm">
            {errors.endDate.message as string}
          </p>
        )}
        <Textarea
          label="آدرس*"
          placeholder="آدرس"
          {...register('address')}
          error={errors.address?.message as string}
          rows={5}
          className="col-span-full"
        />
      </FormGroup>
    </>
  );
}
