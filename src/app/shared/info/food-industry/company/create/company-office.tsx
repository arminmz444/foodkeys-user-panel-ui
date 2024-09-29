import {Controller, useFieldArray, useFormContext} from 'react-hook-form';
import { Input } from '@/components/ui/input';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import QuillLoader from '@/components/loader/quill-loader';
import {useQuery} from "react-query";
import {PiPlusBold} from "react-icons/pi";
import {Button} from "@/components/ui/button";
import {ActionIcon} from "@/components/ui/action-icon";
import TrashIcon from "@/components/icons/trash";
import {useCallback} from "react";
import {Radio} from "rizzui";
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

export default function CompanyOffice({ className }: { className?: string }) {
    // const { data: subcategories, isLoading, error } = useQuery('subcategories', fetchSubcategories);

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

    const addCustomField = useCallback(
        () => append([...brands]),
        [append, brands]
    );
    return (
        <FormGroup
            title="اطلاعات تماس دفتر مرکزی"
            description="شامل نام دسته‌بندی، تجاری و ..."
            className={cn(className)}
        >
            <Input
                label="نام شرکت*"
                placeholder="نام شرکت"
                {...register('companyName')}
                error={errors.companyName?.message as string}
            />
            <Input
                label="نام شرکت به انگلیسی*"
                placeholder="نام شرکت به انگلیسی"
                {...register('companyEnglishName')}
                error={errors.companyEnglishName?.message as string}
            />
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
                    />
                )}
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
                    {fields.length > 1 && (
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
            >
                <PiPlusBold className="me-2 h-4 w-4" strokeWidth={2} /> اضافه کردن نام تجاری جدید
            </Button>

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
