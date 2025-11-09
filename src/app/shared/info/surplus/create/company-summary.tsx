import FormGroup from '@/app/shared/form-group';
import QuillLoader from '@/components/loader/quill-loader';
import SelectLoader from '@/components/loader/select-loader';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/datepicker';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import cn from '@/utils/class-names';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { PiTagBold, PiXBold } from 'react-icons/pi';

const Select = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => <SelectLoader />,
});
const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});

// const fetchSubcategories = async () => {
//   const { data } = await axios.get('https://back.agfo.ir/api/v1/category/1/subcategory');
//   return data;
// };

export default function CompanySummary({ className }: { className?: string }) {
  // const { data: subcategories, isLoading, error } = useQuery('subcategories', fetchSubcategories);
  const [keywords, setKeywords] = useState<string[]>([]);

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

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'brands',
  });

  return (
    <>
      <FormGroup
        title="اطلاعات کارخانه"
        description="شامل نام، محصولات، ظرفیت و ..."
        className={cn(className)}
      >
        <Input
          label="نام واحد تولیدی*"
          placeholder="نام واحد تولیدی"
          {...register('companyName')}
          error={errors.companyName?.message as string}
          required
          className="col-span-full"
          autoFocus
        />
        <Input
          label="محل کارخانه*"
          placeholder="محل کارخانه"
          {...register('companyName')}
          error={errors.companyName?.message as string}
          required
          className="col-span-full"
        />
        <Textarea
          label="محصولات تولیدی*"
          placeholder="محصولات تولیدی"
          {...register('products')}
          error={errors.products?.message as string}
          rows={2}
          className="col-span-full"
        />
        <Textarea
          label="میزان ظرفیت مازاد*"
          placeholder="میزان ظرفیت مازاد"
          {...register('surplusCapacity')}
          error={errors.surplusCapacity?.message as string}
          rows={2}
          className="col-span-full"
        />
        <Textarea
          label="شرایط واگذاری ظرفیت مازاد*"
          placeholder="شرایط واگذاری را بنویسید ..."
          {...register('conditions')}
          error={errors.conditions?.message as string}
          rows={5}
          className="col-span-full"
        />

        <Input
          label="نام درخواست کننده*"
          placeholder="نام درخواست کننده"
          {...register('requesterName')}
          error={errors.requesterName?.message as string}
          required
        />
        <Input
          label="سمت درخواست کننده*"
          placeholder="سمت درخواست کننده"
          {...register('requesterPosition')}
          error={errors.requesterPosition?.message as string}
          required
        />
        <Controller
          name="startDate"
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <DatePicker
              selected={value}
              onChange={onChange}
              onBlur={onBlur}
              dateFormat="yyyy/MM/dd"
              maxDate={new Date()}
              placeholderText="تاریخ شروع واگذاری"
              inputProps={{
                variant: 'outline',
                label: 'تاریخ شروع واگذاری*',
                inputClassName: 'p-4 border border-gray-300 rounded-md',
              }}
              popperPlacement="bottom-end"
              className="flex-grow"
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
            <DatePicker
              selected={value}
              onChange={onChange}
              onBlur={onBlur}
              dateFormat="yyyy/MM/dd"
              maxDate={new Date()}
              placeholderText="تاریخ پایان واگذاری"
              inputProps={{
                variant: 'outline',
                label: 'تاریخ پایان واگذاری*',
                inputClassName: 'p-4 border border-gray-300 rounded-md',
              }}
              popperPlacement="bottom-end"
              className="flex-grow"
            />
          )}
        />
        {errors.endDate && (
          <p className="text-red-500 text-sm">
            {errors.endDate.message as string}
          </p>
        )}
      </FormGroup>
      <FormGroup
        title="کلمات کلیدی"
        description="کلمات کلیدی دستگاه را وارد کنید"
        className={cn(className)}
      >
        <ItemCrud name="Keyword" items={keywords} setItems={setKeywords} />
      </FormGroup>
    </>
  );
}

interface ItemCrudProps {
  name: string;
  items: string[];
  setItems: React.Dispatch<React.SetStateAction<string[]>>;
}

function ItemCrud({ name, items, setItems }: ItemCrudProps): JSX.Element {
  const { register, setValue } = useFormContext();
  const [itemText, setItemText] = useState<string>('');

  function handleItemAdd(): void {
    if (itemText.trim() !== '') {
      const newItem: string = itemText;

      setItems([...items, newItem]);
      setValue('tags', [...items, newItem]);
      setItemText('');
    }
  }

  function handleItemRemove(text: string): void {
    const updatedItems = items.filter((item) => item !== text);
    setItems(updatedItems);
  }

  return (
    <div>
      <div className="flex items-center">
        <Input
          value={itemText}
          placeholder={`کلمه کلیدی خود را وارد کنید`}
          onChange={(e) => setItemText(e.target.value)}
          prefix={<PiTagBold className="h-4 w-4" />}
          className="w-full"
        />
        <input type="hidden" {...register('tags', { value: items })} />
        <Button
          onClick={handleItemAdd}
          className="ms-4 shrink-0 text-sm @lg:ms-5 dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
        >
          اضافه کردن کلمه کلیدی
        </Button>
      </div>

      {items.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {items.map((text, index) => (
            <div
              key={index}
              className="flex items-center rounded-full border border-gray-300 py-1 pe-2.5 ps-3 text-sm font-medium text-gray-700"
            >
              {text}
              <button
                onClick={() => handleItemRemove(text)}
                className="ps-2 text-gray-500 hover:text-gray-900"
              >
                <PiXBold className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
