import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import {
  categoryOption,
  typeOption,
} from '@/app/shared/ecommerce/product/create/form-utils';
import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import QuillLoader from '@/components/loader/quill-loader';
const Select = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => <SelectLoader />,
});
const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});

export default function ProductSummary({ className }: { className?: string }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
      <FormGroup
          title="اطلاعات شرکت"
          description="اطلاعات کلی شرکت شامل دسته‌بندی، برند و ..."
          className={cn(className)}
      >
        <Input
            label="عنوان"
            placeholder="عنوان محصول"
            {...register('title')}
            error={errors.title?.message as string}
        />
        <Input
            label="SKU"
            placeholder="محصول sku"
            {...register('sku')}
            error={errors.sku?.message as string}
        />
        <Controller
            name="categories"
            control={control}
            render={({ field: { onChange, value } }) => (
                <Select
                    options={categoryOption}
                    value={value}
                    onChange={onChange}
                    label="دسته بندی"
                    error={errors?.categories?.message as string}
                    getOptionValue={(option) => option.name}
                    placeholder="انتخاب"
                />
            )}
        />
        <Controller
            name="type"
            control={control}
            render={({ field: { onChange, value } }) => (
                <Select
                    options={typeOption}
                    value={value}
                    onChange={onChange}
                    label="نوع محصول"
                    error={errors?.type?.message as string}
                    getOptionValue={(option) => option.name}
                    placeholder="انتخاب"
                />
            )}
        />

        <Controller
            name="categories"
            control={control}
            render={({ field: { onChange, value } }) => (
                <Select
                    options={categoryOption}
                    value={value}
                    onChange={onChange}
                    label="دسته بندی"
                    error={errors?.categories?.message as string}
                    getOptionValue={(option) => option.name}
                    placeholder="انتخاب"
                />
            )}
        />

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
