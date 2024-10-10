import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import QuillLoader from '@/components/loader/quill-loader';
import { useQuery } from 'react-query';
import { PiPlusBold } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import { ActionIcon } from '@/components/ui/action-icon';
import TrashIcon from '@/components/icons/trash';
import { useCallback, useRef, useState } from 'react';
import { Radio } from 'rizzui';
import Upload from '@/components/ui/upload';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import LogoUpload from '@/components/ui/logo-upload';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { DatePicker } from '@/components/ui/datepicker';

const Select = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => <SelectLoader />,
});
const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});

// const fetchSubcategories = async () => {
//   const { data } = await axios.get('http://localhost:8080/api/v1/category/1/subcategory');
//   return data;
// };

export default function CompanySummary({ className }: { className?: string }) {
  // const { data: subcategories, isLoading, error } = useQuery('subcategories', fetchSubcategories);

  const [logo, setLogo] = useState<File | null>(null);
  const [logoLoading, setLogoLoading] = useState<boolean>(false);
  const [logoProgress, setLogoProgress] = useState<number>(0);
  const [logoError, setLogoError] = useState<string | null>(null);
  const [logoSuccess, setLogoSuccess] = useState<boolean>(false);
  const logoPreview = logo ? URL.createObjectURL(logo) : null;

  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
  const [backgroundLoading, setBackgroundLoading] = useState<boolean>(false);
  const [backgroundProgress, setBackgroundProgress] = useState<number>(0);
  const [backgroundError, setBackgroundError] = useState<string | null>(null);
  const [backgroundSuccess, setBackgroundSuccess] = useState<boolean>(false);
  const backgroundPreview = backgroundImage
    ? URL.createObjectURL(backgroundImage)
    : null;

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(
      event,
      setLogo,
      setLogoLoading,
      setLogoProgress,
      setLogoError,
      setLogoSuccess
    );
  };

  const handleBackgroundUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleFileUpload(
      event,
      setBackgroundImage,
      setBackgroundLoading,
      setBackgroundProgress,
      setBackgroundError,
      setBackgroundSuccess
    );
  };

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setProgress: React.Dispatch<React.SetStateAction<number>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setError(null);
    setSuccess(false);
    const uploadedFile = (event.target as HTMLInputElement).files?.[0];
    if (!uploadedFile) return;

    if (!checkFileSizeAndType(uploadedFile)) {
      setError(
        'فرمت فایل اشتباه است. تنها فایل‌های با پسوند .JPG، .PNG مجاز هستند و حداکثر حجم مجاز ۸ مگابایت است'
      );
      return;
    }

    setLoading(true);
    setProgress(0);
    setFile(uploadedFile);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          setSuccess(true);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };
  const checkFileSizeAndType = (file: File) => {
    const validTypes = ['image/jpeg', 'image/png'];
    const maxSize = 8 * 1024 * 1024; // 8MB
    return validTypes.includes(file.type) && file.size <= maxSize;
  };
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  //
  // if (error) {
  //   return <div>Error fetching subcategories</div>;
  // }
  const companyTypeOptions = [
    {
      value: 1,
      name: 'سهامی خاص',
    },
    {
      value: 2,
      name: 'سهامی عام',
    },
    {
      value: 3,
      name: 'با مسئولیت محدود',
    },
    {
      value: 4,
      name: 'تضامنی',
    },
    {
      value: 5,
      name: 'مختلط سهامی',
    },
    {
      value: 6,
      name: 'مختلط غیرسهامی',
    },
    {
      value: 7,
      name: 'نسبی',
    },
    {
      value: 8,
      name: 'تعاونی تولید و مصرف',
    },
  ];

  const brands = [
    {
      persian: '',
      english: '',
    },
  ];
  const categoryOption = [
    {
      value: 1,
      name: 'بانک تولیدکنندگان',
    },
    {
      value: 2,
      name: 'بانک ماشین‌آلات',
    },
    {
      value: 3,
      name: 'بانک ملزومات بسته بندی',
    },
    {
      value: 4,
      name: 'بانک مواد اولیه و افزودنی',
    },
    {
      value: 5,
      name: 'بانک واردکنندگان و صادرکنندگان',
    },
    {
      value: 6,
      name: 'بانک پخش کنندگان',
    },
    {
      value: 7,
      name: 'بانک مواد اولیه خام (دامی ، باغی ، زراعی و آبزی)',
    },
    {
      value: 8,
      name: 'بانک تجهیزات و لوازم آزمایشگاهی و تحقیقاتی',
    },
  ];
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'brands',
  });

  const addCustomField = useCallback(() => {
    if (fields.length < 3) append([...brands]);
  }, [append, brands, fields.length]);
  return (
    <FormGroup
      title="معرفی شرکت"
      description="شامل نام شرکت، برندها و ..."
      className={cn(className)}
    >
      {/* <div className="flex flex-col gap-6 xl:flex-row">
        <LogoUpload
          label="آپلود لوگو"
          accept="image/*"
          onChange={handleLogoUpload}
          logoPreview={logoPreview}
          loading={logoLoading}
          progress={logoProgress}
          error={logoError}
          success={logoSuccess}
          wrapperClassName="flex-grow"
        />

        <LogoUpload
          label="آپلود پس زمینه"
          accept="image/*"
          onChange={handleBackgroundUpload}
          logoPreview={backgroundPreview}
          loading={backgroundLoading}
          progress={backgroundProgress}
          error={backgroundError}
          success={backgroundSuccess}
          wrapperClassName="flex-grow"
          // className="w-full xl:w-auto h-44 xl:h-60"
        />
      </div> */}
      {/* {(logoError && backgroundError && '') || ( */}
      {/* <p className="pt-3 text-sm text-gray-500"> */}
      {/*لوگوی شرکت خود را اینجا آپلود کنید حجم عکس باید کمتر از{' '}*/}
      {/*<strong className="font-medium text-gray-900">8 مگابایت باشد</strong>*/}
      {/* </p> */}
      {/* //   )} */}
      {/*<LogoUpload*/}
      {/*    label="آپلود لوگو"*/}
      {/*    ref={multiRef}*/}
      {/*    accept="img"*/}
      {/*    placeholderText={multiImages.length > 0 && (multiImages?.map((file: File, index: number) => (*/}
      {/*        <div className="flex w-full items-center" key={file.name}>*/}
      {/*            <div className="w-[20%] px-4">*/}
      {/*                <figure*/}
      {/*                    className="relative mx-auto aspect-square w-20 overflow-hidden rounded-xl border border-gray-300 @2xl:w-28">*/}
      {/*                    <PhotoProvider>*/}
      {/*                        <PhotoView*/}
      {/*                            src={*/}
      {/*                                URL.createObjectURL(file) || '/assets/noImageTemplate.png'*/}
      {/*                            }*/}
      {/*                        >*/}
      {/*                            <Image*/}
      {/*                                src={URL.createObjectURL(file)}*/}
      {/*                                alt={file.name}*/}
      {/*                                fill*/}
      {/*                                priority*/}
      {/*                                sizes="(max-width: 768px) 100vw"*/}
      {/*                            />*/}
      {/*                        </PhotoView></PhotoProvider>*/}
      {/*                </figure>*/}
      {/*            </div>*/}
      {/*        </div>*/}
      {/*    )))}*/}
      {/*    onChange={handleMultiImageUpload}*/}
      {/*/>*/}
      <Controller
        name="categories"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            options={categoryOption}
            // options={subcategories.map((subcategory) => ({
            //   value: subcategory.value,
            //   name: subcategory.name,
            // }))}
            // value={1}
            // onChange={onChange}
            label="دسته بندی"
            error={errors?.categories?.message as string}
            getOptionValue={(option) => option.name}
            placeholder="انتخاب"
            className="col-span-full"
            isRequired
          />
        )}
      />
      <Input
        label="نام شرکت*"
        placeholder="نام شرکت"
        {...register('companyName')}
        error={errors.companyName?.message as string}
        required
      />
      <Input
        label="نام شرکت به انگلیسی*"
        placeholder="نام شرکت به انگلیسی"
        {...register('companyEnglishName')}
        error={errors.companyEnglishName?.message as string}
        required
      />
      <Input
        label="نام تجاری (برند) اصلی*"
        placeholder="نام تجاری (برند) اصلی"
        {...register('brandName')}
        error={errors.brandName?.message as string}
        required
      />
      <Input
        label="نام تجاری (برند) اصلی به انگلیسی*"
        placeholder="نام تجاری (برند) اصلی به انگلیسی"
        {...register('brandNameEn')}
        error={errors.brandNameEn?.message as string}
        required
      />
      <Textarea
        label="سایر برندها"
        placeholder="سایر برندها"
        {...register('otherBrands')}
        error={errors.otherBrands?.message as string}
        rows={2}
      />
      <Textarea
        label="برندهای لاتین"
        placeholder="برندهای لاتین"
        {...register('latinBrands')}
        error={errors.latinBrands?.message as string}
        rows={2}
      />

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
            getOptionValue={(option) => option.name}
            placeholder="انتخاب"
            isRequired
          />
        )}
      />
      <Controller
        name="establishmentDate"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <DatePicker
            selected={value}
            onChange={onChange}
            onBlur={onBlur}
            dateFormat="yyyy/MM/dd"
            maxDate={new Date()}
            placeholderText="تاریخ تاسیس"
            inputProps={{
              variant: 'outline',
              label: 'تاریخ تاسیس',
              inputClassName: 'p-4 border border-gray-300 rounded-md',
            }}
            popperPlacement="bottom-end"
            className="flex-grow"
          />
        )}
      />
      {errors.establishmentDate && (
        <p className="text-red-500 text-sm">
          {errors.establishmentDate.message as string}
        </p>
      )}
      <Input
        type="number"
        label="متراژ بنای کارخانه"
        placeholder="متراژ بنای کارخانه"
        {...register('factoryArea')}
        error={errors.factoryArea?.message as string}
      />
      <Input
        type="number"
        label="متراژ زمین کارخانه"
        placeholder="متراژ زمین کارخانه"
        {...register('landArea')}
        error={errors.landArea?.message as string}
      />

      <Input
        label="نام و نام خانوادگی مدیر عامل*"
        placeholder="نام مدیر عامل"
        {...register('ceoName')}
        error={errors.ceoName?.message as string}
      />
      <Input
        type="number"
        label="تلفن همراه مدیر عامل"
        placeholder="تلفن همراه مدیر عامل"
        {...register('ceoPhoneNumber')}
        error={errors.ceoPhoneNumber?.message as string}
        helperText="(مثال: 09123456789)"
      />

      <Textarea
        label="نام مالک یا سهامداران"
        placeholder="نام مالک یا سهامداران"
        {...register('shareholders')}
        error={errors.shareholders?.message as string}
        className="col-span-full"
        rows={2}
      />
      <Textarea
        label="عنوان محصولات (خدمات)"
        placeholder="عنوان محصولات (خدمات)"
        {...register('productsTitle')}
        error={errors.productsTitle?.message as string}
        className="col-span-full"
        rows={3}
      />
      <Input
        label="نام تجاری اصلی*"
        placeholder=""
        className="flex-grow"
        {...register(`mainBrand.persian`)}
      />
      <Input
        label="نام تجاری اصلی به انگلیسی*"
        placeholder=""
        className="flex-grow"
        {...register(`mainBrand.english`)}
      />
      {fields.map((item, index) => (
        <div key={item.id} className="col-span-full flex gap-4 xl:gap-7">
          <Input
            label="نام تجاری"
            placeholder=""
            className="flex-grow"
            {...register(`brands.${index}.persian`)}
          />
          <Input
            label="نام تجاری به انگلیسی"
            placeholder=""
            className="flex-grow"
            {...register(`brands.${index}.english`)}
          />
          {fields.length >= 1 && (
            <ActionIcon
              onClick={() => remove(index)}
              variant="flat"
              className="mt-7 shrink-0"
            >
              <TrashIcon className="h-4 w-4" />
            </ActionIcon>
          )}
        </div>
      ))}
      <Button
        onClick={addCustomField}
        variant="outline"
        className="col-span-full ml-auto w-auto"
        disabled={fields.length >= 3}
      >
        <PiPlusBold className="me-2 h-4 w-4" strokeWidth={2} /> اضافه کردن نام
        تجاری جدید
      </Button>
      {/*<div className="flex flex-col space-y-2 col-span-full">*/}
      {/*    <label className="font-medium text-gray-700 dark:text-gray-600">تاریخ تاسیس</label>*/}
      {/*    <Controller*/}
      {/*        name="establishmentDate"*/}
      {/*        control={control}*/}
      {/*        render={({field: {onChange, value}}) => (*/}
      {/*            <DatePicker*/}
      {/*                selected={value}*/}
      {/*                onChange={onChange}*/}
      {/*                maxDate={new Date()}*/}
      {/*                placeholderText="تاریخ تاسیس"*/}
      {/*                inputProps={{variant: 'text', inputClassName: 'p-0 px-1 py-2 h-auto'}}*/}
      {/*                popperPlacement="bottom-end"*/}
      {/*                className="flex-grow"*/}
      {/*            />*/}
      {/*        )}*/}
      {/*    />*/}
      {/*    {errors.establishmentDate && (*/}
      {/*        // @ts-ignore*/}
      {/*        <p className="text-red-500 text-sm">{errors.establishmentDate.message}</p>*/}
      {/*    )}*/}
      {/*</div>*/}

      <Controller
        name="submissionDate"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <DatePicker
            selected={value}
            onChange={onChange}
            onBlur={onBlur}
            dateFormat="yyyy/MM/dd"
            maxDate={new Date()}
            placeholderText="تاریخ ثبت"
            inputProps={{
              label: 'تاریخ ثبت',
              variant: 'outline',
              inputClassName: 'p-4 border border-gray-300 rounded-md',
            }}
            popperPlacement="bottom-end"
            className="flex-grow"
          />
        )}
      />
      {errors.submissionDate && (
        // @ts-ignore
        <p className="text-red-500 text-sm">{errors.submissionDate.message}</p>
      )}
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <QuillEditor
            value={value}
            onChange={onChange}
            label="توضیحات"
            className="col-span-full [&_.ql-editor]:min-h-[100px]"
            labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
          />
        )}
      />
    </FormGroup>
  );
}
