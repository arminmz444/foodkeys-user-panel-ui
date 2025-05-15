import FormGroup from '@/app/shared/form-group';
import QuillLoader from '@/components/loader/quill-loader';
import SelectLoader from '@/components/loader/select-loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import cn from '@/utils/class-names';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
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
//   const { data } = await axios.get('http://localhost:8080/api/v1/category/1/subcategory');
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
        title="اطلاعات دستگاه"
        description="شامل نام دستگاه، مدل، ظرفیت و ..."
        className={cn(className)}
      >
        <Input
          label="نام دستگاه درخواستی*"
          placeholder="نام دستگاه درخواستی"
          {...register('machineName')}
          error={errors.machineName?.message as string}
          required
          className="col-span-full"
          autoFocus
        />
        <Textarea
          label="کاربرد دستگاه*"
          placeholder="کاربرد دستگاه"
          {...register('usage')}
          error={errors.usage?.message as string}
          rows={2}
          className="col-span-full"
        />
        <Input
          label="شرکت سازنده*"
          placeholder="شرکت سازنده"
          {...register('manufacturer')}
          error={errors.manufacturer?.message as string}
          required
        />
        <Input
          label="مدل دستگاه"
          placeholder="مدل دستگاه"
          {...register('machineModel')}
          error={errors.machineModel?.message as string}
        />
        <Input
          label="نام شرکت / شخص خریدار*"
          placeholder="نام شرکت / شخص خریدار*"
          {...register('buyerName')}
          error={errors.buyerName?.message as string}
          className="col-span-full"
        />

        <Input
          label="ظرفیت دستگاه*"
          placeholder="ظرفیت دستگاه"
          {...register('machineCapacity')}
          error={errors.machineCapacity?.message as string}
          required
        />

        <Input
          label="قیمت"
          placeholder="10"
          {...register('buyerPrice')}
          error={errors.buyerPrice?.message as string}
          prefix={'تومان'}
          type="number"
        />

        <Input
          label="نام فرد پاسخگو*"
          placeholder="نام فرد پاسخگو"
          {...register('respondent')}
          error={errors.respondent?.message as string}
          required
        />
        <Input
          label="تلفن همراه فرد پاسخگو*"
          placeholder="تلفن همراه فرد پاسخگو"
          {...register('respondent')}
          error={errors.respondent?.message as string}
          required
          helperText="(مثال: 09123456789)"
        />
        <Input
          label="موقعیت مکانی*"
          placeholder="موقعیت مکانی"
          {...register('address')}
          error={errors.address?.message as string}
          required
          className="col-span-full"
        />
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
