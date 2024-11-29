import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import QuillLoader from '@/components/loader/quill-loader';
import TrashIcon from '@/components/icons/trash';
import {useRef, useState} from 'react';
import Upload from "@/components/ui/upload";
import Image from "next/image";
import {Radio} from "@/components/ui/radio";

const Select = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => <SelectLoader />,
});
const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});

interface FactoryTel {
  id: number,
  telType: string,
  telNumber: string,
  companyId: number
}
export default function CompanyGallery({ className, category, data }: { className?: string, category?: number, data?: any }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
      <FormGroup
          title="گالری شرکت"
          description="عکس‌های شرکت خود را اینجا آپلود کنید"
          className={cn(className)}
      >
        <MultipleFiles className="col-span-2" label="عکس‌های نمونه محصولات تولیدی" />
          <MultipleFiles className="col-span-2" label="عکس‌های افتخارات و گواهینامه‌ها" />
          <MultipleFiles className="col-span-2" label="عکس‌های مدیران و مسئولین" />
          <MultipleFiles className="col-span-2" label="اسلایدر شرکت" />
      </FormGroup>
  );
}

export const MultipleFiles = ({
                                className,
                                label,
                              }: {
  className?: string;
  label?: React.ReactNode;
}) => {
  const multiRef = useRef<HTMLInputElement>(null);
  const [multiImages, setMultiImages] = useState<Array<File>>([]);

  const handleMultiImageUpload = (
      event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const uploadedFiles = (event.target as HTMLInputElement).files;
    const newFiles = Object.entries(uploadedFiles as object)
        .map((file) => {
          if (file[1].type.includes('image')) return file[1];
        })
        .filter((file) => file !== undefined);
    setMultiImages((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleMultiImageDelete = (index: number) => {
    const updatedFiles = multiImages.filter((_, i) => i !== index);
    setMultiImages(updatedFiles);
    (multiRef.current as HTMLInputElement).value = '';
  };

  return (
      <div className={className}>
        <Upload
            label={label}
            ref={multiRef}
            accept="img"
            multiple
            onChange={handleMultiImageUpload}
        />
        <p className="pt-3 text-sm text-gray-500">
          عکس محصول خود را اینجا آپلود کنید حجم عکس باید کمتر از{' '}
          <strong className="font-medium text-gray-900">20 مگابایت باشد</strong>
        </p>

        {multiImages.length > 0 && (
            <div className="-mb-3 overflow-x-scroll @xl:mb-0 @xl:overflow-x-hidden">
              <div className="min-w-[600px] pb-5 @xl:pb-0">
                <div className="mt-7 flex items-center rounded-md border border-gray-300 @2xl:mt-10">
                  <div className="w-[20%] px-4 py-3.5 text-center text-sm font-semibold text-gray-700 @2xl:py-5">
                    Image
                  </div>
                  <div className="w-[55%] px-4 py-3.5 text-sm font-semibold text-gray-700 @2xl:py-5">
                    Description
                  </div>
                  <div className="w-28 px-4 py-3.5 text-center text-sm font-semibold text-gray-700 @2xl:py-5">
                    Thumbnail
                  </div>
                  <div className="w-20 shrink-0 px-4 py-3.5 text-center text-sm font-semibold text-gray-700 @2xl:py-5">
                    Delete
                  </div>
                </div>
                <div className="mt-7 flex flex-row flex-wrap gap-5">
                  {multiImages?.map((file: File, index: number) => (
                      <div className="flex w-full items-center" key={file.name}>
                        <div className="w-[20%] px-4">
                          <figure className="relative mx-auto aspect-square w-20 overflow-hidden rounded-xl border border-gray-300 @2xl:w-28">
                            <Image
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw"
                            />
                          </figure>
                        </div>
                        <div className="w-[55%] px-4">
                          <Input
                              label="Product Description"
                              placeholder="Write company description here..."
                              // {...register('title')}
                              // error={errors.title?.message}
                          />
                        </div>
                        <div className="flex w-28 items-center justify-center px-4">
                          <Radio
                              value="NotTrackInventoryProduct"
                              inputClassName="dark:checked:!bg-gray-200 dark:checked:!border-gray-200 dark:focus:ring-gray-200 dark:focus:ring-offset-gray-0"
                          />
                        </div>
                        <div className="flex w-20 shrink-0 items-center justify-center px-4">
                          <TrashIcon
                              onClick={() => handleMultiImageDelete(index)}
                              className="h-5 w-5 cursor-pointer transition duration-75"
                          />
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </div>
        )}
      </div>
  );
}
