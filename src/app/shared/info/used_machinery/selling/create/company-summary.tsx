import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import QuillLoader from '@/components/loader/quill-loader';
import { useQuery } from 'react-query';
import { PiPlusBold, PiTagBold, PiXBold } from 'react-icons/pi';
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
import {} from '@/components/ui/text';
import CustomModalSelling from '../customModal';
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
      <FormGroup title="راهنمای سامانه FUM" className={cn(className)}>
        <p className="col-span-full">
          خواهشمند است قبل ازاقدام به تکمیل فرم، با کلیک بر دکمه زیر راهنمای
          سامانه را مطالعه بفرمایید.
        </p>
        <div>
          <CustomModalSelling />
        </div>
      </FormGroup>
      <FormGroup
        title="اطلاعات دستگاه"
        description="شامل نام دستگاه، مدل، ظرفیت و ..."
        className={cn(className)}
      >
        <Input
          label="نام دستگاه،خط تولید یا بسته بندی*"
          placeholder="نام دستگاه،خط تولید یا بسته بندی"
          {...register('machineName')}
          error={errors.machineName?.message as string}
          required
          className="col-span-full"
        />
        <Input
          label="وضعیت فعلی دستگاه*"
          placeholder="وضعیت فعلی دستگاه"
          {...register('machineCondition')}
          error={errors.machineCondition?.message as string}
          required
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
          label="کشور سازنده"
          placeholder="کشور سازنده"
          {...register('manufacturerCountry')}
          error={errors.manufacturerCountry?.message as string}
        />
        <Input
          type="number"
          label="سال ساخت"
          placeholder="سال ساخت"
          {...register('manufacturerYear')}
          error={errors.manufacturerYear?.message as string}
          helperText="(مثال: 2012)"
        />
        <Input
          label="مدل دستگاه"
          placeholder="مدل دستگاه"
          {...register('machineModel')}
          error={errors.machineModel?.message as string}
        />
        <Input
          label="ظرفیت دستگاه*"
          placeholder="ظرفیت دستگاه"
          {...register('machineCapacity')}
          error={errors.machineCapacity?.message as string}
          required
        />
        <Input
          label="میزان کارکرد"
          placeholder="میزان کارکرد"
          {...register('machineCapacity')}
          error={errors.machineCapacity?.message as string}
        />
        <Input
          label="قیمت پایه فروشنده*"
          placeholder="10"
          {...register('sellerPrice')}
          error={errors.sellerPrice?.message as string}
          prefix={'تومان'}
          type="number"
        />
        <Input
          label="موقعیت مکانی*"
          placeholder="موقعیت مکانی"
          {...register('address')}
          error={errors.address?.message as string}
          required
          className="col-span-full"
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
        <Textarea
          label="کاربرد دستگاه (حداکثر 4 خط)*"
          placeholder="کاربرد دستگاه"
          {...register('usage')}
          error={errors.usage?.message as string}
          rows={3}
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
