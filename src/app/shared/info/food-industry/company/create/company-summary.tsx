import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import QuillLoader from '@/components/loader/quill-loader';
import { PiPlusBold } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import { ActionIcon } from '@/components/ui/action-icon';
import TrashIcon from '@/components/icons/trash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import LogoUpload from '@/components/ui/logo-upload';
import JalaliDatePicker from '@/components/ui/react-shamsi-date-picker';
import { DatePicker } from '@/components/ui/datepicker';
import useAxiosPrivate from '@/hooks/use-axios-private';
import toast from 'react-hot-toast';

const Select = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => <SelectLoader />,
});

export default function CompanySummary({
  className,
  category,
}: {
  className?: string;
  category: number;
}) {
  const _axios = useAxiosPrivate();
  const [subcategories, setSubcategories] = useState<
    { value: number; name: string }[]
  >([]);
  const [companyTypeOptions, setCompanyTypeOptions] = useState<
    { value: string; name: string }[]
  >([]);

  const [logo, setLogo] = useState<File | null>(null);
  const [logoLoading, setLogoLoading] = useState<boolean>(false);
  const [logoProgress, setLogoProgress] = useState<number>(0);
  const [logoError, setLogoError] = useState<string | null>(null);
  const [logoSuccess, setLogoSuccess] = useState<boolean>(false);
  const [establishDateValue, setEstablishDateValue] = useState<any>('');

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await _axios.get(`/category/${category}/subcategory`);
        if (response.data.status === 'SUCCESS') {
          setSubcategories(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };
    fetchSubCategories();
  }, [_axios, category]);

  useEffect(() => {
    const fetchCompanyTypes = async () => {
      try {
        const response = await _axios.get(`/company/fetch/type`);
        if (response.data.status === 'SUCCESS') {
          setCompanyTypeOptions(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching company types:', error);
      }
    };
    fetchCompanyTypes();
  }, [_axios]);

  const {
    register,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const watchedLogo = watch('currentLogo', '');
  const watchedCompanyType = watch('companyType', '');
  const watchedEstablishDate = watch('establishDate', '');

  useEffect(() => {
    if (watchedEstablishDate)
      setEstablishDateValue(new Date(watchedEstablishDate));
  }, [watchedEstablishDate]);

  // Logo preview URL handling
  const logoPreview = logo
    ? URL.createObjectURL(logo)
    : watchedLogo
    ? process.env.NEXT_PUBLIC_STATIC_FILES_URL + watchedLogo
    : null;

  // Handle logo upload
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogoError(null);
    setLogoSuccess(false);

    const uploadedFile = (event.target as HTMLInputElement).files?.[0];
    if (!uploadedFile) return;

    if (!checkFileSizeAndType(uploadedFile)) {
      setLogoError(
        'فرمت فایل اشتباه است. تنها فایل‌های با پسوند .JPG، .PNG مجاز هستند و حداکثر حجم مجاز ۸ مگابایت است'
      );
      return;
    }

    setLogoLoading(true);
    setLogoProgress(0);
    setLogo(uploadedFile);
    setValue('logo', uploadedFile);

    // Simulate upload process
    const interval = setInterval(() => {
      setLogoProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLogoLoading(false);
          setLogoSuccess(true);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  // Handle logo removal
  const handleLogoRemove = () => {
    setLogo(null);
    setValue('logo', null);
    setValue('currentLogo', null);
    setLogoSuccess(false);
  };

  // File validation
  const checkFileSizeAndType = (file: File) => {
    const validTypes = ['image/jpeg', 'image/png'];
    const maxSize = 8 * 1024 * 1024; // 8MB
    return validTypes.includes(file.type) && file.size <= maxSize;
  };

  // Brand field array handling
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'brands',
  });

  const addCustomField = useCallback(() => {
    if (fields.length < 3) {
      append({
        name: '',
        nameEn: '',
      });
    } else {
      toast.error('حداکثر ۳ برند میتوانید وارد کنید');
    }
  }, [append, fields.length]);

  return (
    <FormGroup
      title="معرفی شرکت"
      description="شامل نام شرکت، برندها و ..."
      className={cn(className)}
    >
      {/* Logo upload in its own row */}
      <div className="w-full col-span-full mb-6">
        <LogoUpload
          label="آپلود لوگو شرکت"
          accept="image/*"
          onChange={handleLogoUpload}
          logoPreview={logoPreview}
          loading={logoLoading}
          progress={logoProgress}
          error={logoError}
          success={logoSuccess}
          wrapperClassName="w-full"
          onRemove={logoPreview ? handleLogoRemove : undefined}
        />
        {logoError && (
          <p className="text-red-500 text-sm mt-2 text-center">{logoError}</p>
        )}
      </div>

      {/* Subcategory field */}
      <div className="w-full col-span-full mb-6">
        <Controller
          name="subcategory"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              options={subcategories.map((subcategory) => ({
                value: subcategory.value,
                name: subcategory.name,
              }))}
              onChange={onChange}
              value={value}
              label="دسته بندی"
              error={errors?.subcategory?.message as string}
              placeholder="انتخاب"
              className="w-full"
            />
          )}
        />
      </div>

      {/* Company Name Row */}
      {/* <div className="w-full flex flex-col md:flex-row gap-6 mb-6">
        <div className="w-full md:w-1/2"> */}
          <Input
            label="نام شرکت*"
            placeholder="نام شرکت"
            {...register('companyName')}
            error={errors.companyName?.message as string}
            className="w-full"
          />
        {/* </div> */}

        {/* <div className="w-full md:w-1/2"> */}
          <Input
            label="نام شرکت به انگلیسی*"
            placeholder="نام شرکت به انگلیسی"
            {...register('companyNameEn')}
            error={errors.companyNameEn?.message as string}
            className="w-full"
          />
        {/* </div> */}
      {/* </div> */}

      {/* Brand Name Row */}
      {/* <div className="w-full flex flex-col md:flex-row gap-6 mb-6"> */}
        {/* <div className="w-full md:w-1/2"> */}
          <Input
            label="نام تجاری (برند) اصلی*"
            placeholder="نام تجاری (برند) اصلی"
            {...register('primaryBrand')}
            error={errors.primaryBrand?.message as string}
            className="w-full"
          />
        {/* </div> */}

        {/* <div className="w-full md:w-1/2"> */}
          <Input
            label="نام تجاری (برند) اصلی به انگلیسی*"
            placeholder="نام تجاری (برند) اصلی به انگلیسی"
            {...register('mainBrandEn')}
            error={errors.mainBrandEn?.message as string}
            className="w-full"
          />
        {/* </div> */}
      {/* </div> */}

      {/* Company Type Row */}
      <div className="w-full flex flex-col md:flex-row gap-6 mb-6">
        <div className="w-full md:w-1/2">
          <Controller
            name="companyType"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                options={companyTypeOptions}
                value={value}
                onChange={onChange}
                label="نوع شرکت"
                error={errors?.companyType?.message as string}
                placeholder="انتخاب"
                isRequired
                className="w-full"
              />
            )}
          />
        </div>

        {watchedCompanyType && watchedCompanyType.value === 'OTHER' ? (
          <div className="w-full md:w-1/2">
            <Input
              label="نوع شرکت"
              placeholder="نوع شرکت خود را بنویسید"
              {...register('companyTypeOther')}
              error={errors.companyTypeOther?.message as string}
              className="w-full"
            />
          </div>
        ) : null}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="establishDate"
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <JalaliDatePicker
              selected={establishDateValue}
              onChange={(e: any) => {
                setEstablishDateValue(e);
                setValue('establishDate', e);
              }}
              dateFormat="yyyy-MM-dd'T'HH:mm:ss"
              maxDate={new Date()}
              placeholderText="تاریخ تاسیس"
              inputProps={{
                variant: 'outline',
                label: 'تاریخ تاسیس',
                inputClassName: 'p-4 border border-gray-300 rounded-md',
              }}
              popperPlacement="bottom-end"
              className="rmdp-mobile custom-calendar flex-grow"
            />
          )}
        />

        <Input
          label="تعداد کارکنان"
          placeholder="تعداد کارکنان"
          {...register('employeesCount')}
          error={errors.employeesCount?.message as string}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="متراژ بنای کارخانه"
          placeholder="متراژ بنای کارخانه"
          {...register('buildingArea')}
          error={errors.buildingArea?.message as string}
        />

        <Input
          label="متراژ زمین کارخانه"
          placeholder="متراژ زمین کارخانه"
          {...register('landArea')}
          error={errors.landArea?.message as string}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="نام و نام خانوادگی مدیر عامل*"
          placeholder="نام مدیر عامل"
          {...register('ceo')}
          error={errors.ceo?.message as string}
        />

        <Input
        dir='rtl'
          type="tel"
          label="تلفن همراه مدیر عامل"
          placeholder="تلفن همراه مدیر عامل"
          {...register('ceoPhoneNumber')}
          error={errors.ceoPhoneNumber?.message as string}
          helperText="(مثال: 09123456789)"
        />
      </div>

      <Textarea
        label="نام مالک یا سهامداران"
        placeholder="نام مالک یا سهامداران"
        {...register('companyStakeHolders')}
        error={errors.companyStakeHolders?.message as string}
        className="col-span-full"
        rows={2}
      />

      {fields.map((item, index) => (
        <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 relative border border-gray-200 rounded-lg p-6 pt-10">
          <Input
            label="نام تجاری"
            placeholder="نام تجاری"
            className="flex-grow"
            {...register(`brands.${index}.name`)}
          />

          <Input
            label="نام تجاری به انگلیسی"
            placeholder="نام تجاری به انگلیسی"
            className="flex-grow"
            {...register(`brands.${index}.nameEn`)}
          />

          <ActionIcon
            onClick={() => remove(index)}
            variant="flat"
            className="absolute top-3 left-3"
            color="danger"
          >
            <TrashIcon className="h-4 w-4 text-red-500" />
          </ActionIcon>
        </div>
      ))}

      <Button
        onClick={addCustomField}
        variant="outline"
        className="col-span-full ml-auto w-auto"
        disabled={fields.length >= 3}
      >
        <PiPlusBold className="me-2 h-4 w-4" strokeWidth={2} />
        اضافه کردن نام تجاری جدید
      </Button>

      <Textarea
        label="توضیحات شرکت"
        placeholder="توضیحات شرکت"
        {...register('description')}
        error={errors.description?.message as string}
        className="col-span-full"
        rows={4}
      />

      <Input
      className='w-full col-span-full'
        label="شعار تبلیغاتی شرکت"
        placeholder="شعار تبلیغاتی شرکت"
        {...register('advertisingSlogan')}
        error={errors.advertisingSlogan?.message as string}
      />
    </FormGroup>
  );
}