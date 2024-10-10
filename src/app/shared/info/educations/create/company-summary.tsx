import FormGroup from '@/app/shared/form-group';
import QuillLoader from '@/components/loader/quill-loader';
import SelectLoader from '@/components/loader/select-loader';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/datepicker';
import { Input } from '@/components/ui/input';
import { RadioGroup } from '@/components/ui/radio-group';
import cn from '@/utils/class-names';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { PiTagBold, PiXBold } from 'react-icons/pi';
import { Radio } from 'rizzui';

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

const placementType = [
  {
    value: '1',
    label: 'حضوری',
  },
  {
    value: '2',
    label: 'مجازی',
  },
  {
    value: '3',
    label: 'حضوری / مجازی',
  },
];
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
  const [keywords, setKeywords] = useState<string[]>([]);

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

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'brands',
  });

  // const addCustomField = useCallback(() => {
  //   if (fields.length < 3) append([...brands]);
  // }, [append, brands, fields.length]);
  return (
    <>
      <FormGroup
        title="معرفی دوره"
        description="شامل عنوان، تاریخ و ..."
        className={cn(className)}
      >
        <Input
          label="عنوان یا تیتر*"
          placeholder="عنوان یا تیتر"
          {...register('title')}
          error={errors.title?.message as string}
          required
          className="col-span-full"
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

        <Input
          label="برگزارکننده*"
          placeholder="برگزارکننده"
          {...register('organizer')}
          error={errors.organizer?.message as string}
          required
          className="col-span-full"
        />
        <Input
          label="کشور / شهر*"
          placeholder="کشور / شهر"
          {...register('country')}
          error={errors.country?.message as string}
          required
          helperText="(مثال: ایران، تهران)"
        />
        <Input
          label="مکان برگزاری*"
          placeholder="مکان برگزاری"
          {...register('venue')}
          error={errors.venue?.message as string}
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
              placeholderText="تاریخ شروع"
              inputProps={{
                label: 'تاریخ شروع',
                variant: 'outline',
                inputClassName: 'p-4 border border-gray-300 rounded-md',
              }}
              popperPlacement="bottom-end"
              className="flex-grow"
            />
          )}
        />
        {errors.startDate && (
          // @ts-ignore
          <p className="text-red-500 text-sm">{errors.startDate.message}</p>
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
              placeholderText="تاریخ پایان"
              inputProps={{
                label: 'تاریخ پایان',
                variant: 'outline',
                inputClassName: 'p-4 border border-gray-300 rounded-md',
              }}
              popperPlacement="bottom-end"
              className="flex-grow"
            />
          )}
        />
        {errors.endDate && (
          // @ts-ignore
          <p className="text-red-500 text-sm">{errors.endDate.message}</p>
        )}
        {/* <Controller
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
      /> */}
      </FormGroup>
      <FormGroup
        title="کلمات کلیدی"
        description="کلمات کلیدی همایش را وارد کنید"
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
