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
import { useCallback, useEffect, useRef, useState } from 'react';
import { Radio } from 'rizzui';
import Upload from '@/components/ui/upload';
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
//   const { data } = await axios.get('https://back.agfo.ir/api/v1/category/1/subcategory');
//   return data;
// };

export default function CompanyComplementary({
  className,
}: {
  className?: string;
}) {
  // const { data: subcategories, isLoading, error } = useQuery('subcategories', fetchSubcategories);
  const [tags, setTags] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const {
    register,
    control,
    formState: { errors },
    watch,
  } = useFormContext();
  const watchedTags = watch('companyTags', []);
  const watchedKeywords = watch('companyKeyWords', []);

  useEffect(() => {
    if (watchedTags && watchedTags.length) {
      setTags(watchedTags);
    }
    if (watchedKeywords && watchedKeywords.length) {
      setKeywords(watchedKeywords);
    }
  }, [watchedTags, watchedKeywords]);
  return (
    <FormGroup
      title="اطلاعات تکمیلی"
      description="شامل تگ، کلمات کلیدی و ..."
      className={cn(className)}
    >
      {/*<Input*/}
      {/*    label="نام شرکت*"*/}
      {/*    placeholder="نام شرکت"*/}
      {/*    {...register('companyName')}*/}
      {/*    error={errors.companyName?.message as string}*/}
      {/*/>*/}
      {/*<Input*/}
      {/*    label="نام شرکت به انگلیسی*"*/}
      {/*    placeholder="نام شرکت به انگلیسی"*/}
      {/*    {...register('companyEnglishName')}*/}
      {/*    error={errors.companyEnglishName?.message as string}*/}
      {/*/>*/}

      {/*<Input*/}
      {/*    label="نام تجاری اصلی*"*/}
      {/*    placeholder=""*/}
      {/*    className="flex-grow"*/}
      {/*    {...register(`mainBrand.persian`)}*/}
      {/*/>*/}
      {/*<Input*/}
      {/*    label="نام تجاری اصلی به انگلیسی*"*/}
      {/*    placeholder=""*/}
      {/*    className="flex-grow"*/}
      {/*    {...register(`mainBrand.english`)}*/}
      {/*/>*/}

      {/*<Input*/}
      {/*    type="number"*/}
      {/*    label="متراژ بنای کارخانه"*/}
      {/*    placeholder="متراژ بنای کارخانه"*/}
      {/*    {...register('factoryArea')}*/}
      {/*    error={errors.factoryArea?.message as string}*/}
      {/*/>*/}
      {/*<Input*/}
      {/*    type="number"*/}
      {/*    label="متراژ زمین کارخانه"*/}
      {/*    placeholder="متراژ زمین کارخانه"*/}
      {/*    {...register('landArea')}*/}
      {/*    error={errors.landArea?.message as string}*/}
      {/*/>*/}
      {/*<Input*/}
      {/*    label="نام مدیر عامل*"*/}
      {/*    placeholder="نام مدیر عامل"*/}
      {/*    {...register('ceoName')}*/}
      {/*    error={errors.ceoName?.message as string}*/}
      {/*/>*/}
      {/*<Input*/}
      {/*    type="number"*/}
      {/*    label="شماره تلفن مدیر عامل*"*/}
      {/*    placeholder="شماره تلفن مدیر عامل"*/}
      {/*    {...register('ceoPhoneNumber')}*/}
      {/*    error={errors.ceoPhoneNumber?.message as string}*/}
      {/*/>*/}
      {/*<div className="col-span-full grid grid-cols-1 gap-4 xl:grid-cols-2">*/}
      {/*    <div className="flex flex-col space-y-2">*/}
      {/*        <label className="font-medium text-gray-700 dark:text-gray-600">تاریخ تاسیس</label>*/}
      {/*        <Controller*/}
      {/*            name="establishmentDate"*/}
      {/*            control={control}*/}
      {/*            render={({field: {onChange, value}}) => (*/}
      {/*                <DatePicker*/}
      {/*                    selected={value}*/}
      {/*                    onChange={onChange}*/}
      {/*                    maxDate={new Date()}*/}
      {/*                    placeholderText="تاریخ تاسیس"*/}
      {/*                    inputProps={{*/}
      {/*                        variant: 'outline',*/}
      {/*                        inputClassName: 'p-4 border border-gray-300 rounded-md',*/}
      {/*                    }}*/}
      {/*                    popperPlacement="bottom-end"*/}
      {/*                    className="flex-grow"*/}
      {/*                />*/}
      {/*            )}*/}
      {/*        />*/}
      {/*        {errors.establishmentDate && (*/}
      {/*            // @ts-ignore*/}
      {/*            <p className="text-red-500 text-sm">{errors.establishmentDate.message}</p>*/}
      {/*        )}*/}
      {/*    </div>*/}

      {/*    <div className="flex flex-col space-y-2">*/}
      {/*        <label className="font-medium text-gray-700 dark:text-gray-600">تاریخ ثبت</label>*/}
      {/*        <Controller*/}
      {/*            name="submissionDate"*/}
      {/*            control={control}*/}
      {/*            render={({field: {onChange, value}}) => (*/}
      {/*                <DatePicker*/}
      {/*                    selected={value}*/}
      {/*                    onChange={onChange}*/}
      {/*                    maxDate={new Date()}*/}
      {/*                    placeholderText="تاریخ ثبت"*/}
      {/*                    inputProps={{*/}
      {/*                        variant: 'outline',*/}
      {/*                        inputClassName: 'p-4 border border-gray-300 rounded-md',*/}
      {/*                    }}*/}
      {/*                    popperPlacement="bottom-end"*/}
      {/*                    className="flex-grow"*/}
      {/*                />*/}
      {/*            )}*/}
      {/*        />*/}
      {/*        {errors.submissionDate && (*/}
      {/*            // @ts-ignore*/}
      {/*            <p className="text-red-500 text-sm">{errors.submissionDate.message}</p>*/}
      {/*        )}*/}
      {/*    </div>*/}
      {/*</div>*/}
      {/*<Controller*/}
      {/*    control={control}*/}
      {/*    name="history"*/}
      {/*    render={({field: {onChange, value}}) => (*/}
      {/*        <QuillEditor*/}
      {/*            value={value}*/}
      {/*            onChange={onChange}*/}
      {/*            label="تاریخچه فعالیت شرکت"*/}
      {/*            className="col-span-full [&_.ql-editor]:min-h-[100px]"*/}
      {/*            labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"*/}
      {/*        />*/}
      {/*    )}*/}
      {/*/>*/}
      {/*<div className="col-span-full grid grid-cols-1 gap-4">*/}
      {/*    <ItemCrud name="تگ" items={tags} setItems={setTags} registerName="tags"/>*/}
      {/*</div>*/}
      {/*<div className="col-span-full grid grid-cols-1 gap-4">*/}
      {/*    <ItemCrud name="کلمه کلیدی" items={keywords} setItems={setKeywords} registerName="keywords"/>*/}
      {/*</div>*/}
      <div className="col-span-full grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ItemCrud
          name="تگ"
          items={tags}
          setItems={setTags}
          registerName="companyTags"
        />
        <ItemCrud
          name="کلمه کلیدی"
          items={keywords}
          setItems={setKeywords}
          registerName="companyKeyWords"
        />
      </div>
    </FormGroup>
  );
}

interface ItemCrudProps {
  name: string;
  items: string[];
  setItems: React.Dispatch<React.SetStateAction<string[]>>;
  registerName: string;
}

function ItemCrud({
  name,
  items,
  setItems,
  registerName,
}: ItemCrudProps): JSX.Element {
  const { register, setValue } = useFormContext();
  const [itemText, setItemText] = useState<string>('');

  function handleItemAdd(): void {
    if (itemText.trim() !== '') {
      const newItem: string = itemText;

      setItems([...items, newItem]);
      setValue(registerName, [...items, newItem]);
      setItemText('');
    }
  }

  function handleItemRemove(text: string): void {
    const updatedItems = items.filter((item) => item !== text);
    setItems(updatedItems);
    setValue(registerName, updatedItems);
  }

  return (
    <div>
      <div className="flex items-center">
        <Input
          value={itemText}
          placeholder={`${name} جدید وارد کنید`}
          onChange={(e) => setItemText(e.target.value)}
          prefix={<PiTagBold className="h-4 w-4" />}
          className="w-full"
        />
        <input type="hidden" {...register(registerName, { value: items })} />
        <Button
          onClick={handleItemAdd}
          className="ms-4 shrink-0 text-sm @lg:ms-5 dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
        >
          افزودن {name}
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
