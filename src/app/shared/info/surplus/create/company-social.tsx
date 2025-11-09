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
import { useCallback, useState } from 'react';
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
//   const { data } = await axios.get('https://back.agfo.ir/api/v1/category/1/subcategory');
//   return data;
// };

export default function CompanySocial({ className }: { className?: string }) {
  const [emails, setEmails] = useState<string[]>([]);
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
    <FormGroup
      title="اطلاعات شبکه های اجتماعی و اینترنت"
      description="شامل اینستاگرام، ایتا و ..."
      className={cn(className)}
    >
      <Input
        type="number"
        label="شماره تلگرام"
        placeholder="شماره تلگرام"
        {...register('telegram')}
        error={errors.telegram?.message as string}
        helperText="(مثال: 09123456789)"
      />
      <Input
        type="number"
        label="شماره واتساپ"
        placeholder="شماره واتساپ"
        {...register('whatsapp')}
        error={errors.whatsapp?.message as string}
        helperText="(مثال: 09123456789)"
      />

      <Input
        type="number"
        label="شماره ایتا"
        placeholder="شماره ایتا"
        {...register('eitaa')}
        error={errors.eitaa?.message as string}
        helperText="(مثال: 09123456789)"
      />
      <Input
        type="number"
        label="شماره روبیکا"
        placeholder="شماره روبیکا"
        {...register('rubika')}
        error={errors.rubika?.message as string}
        helperText="(مثال: 09123456789)"
      />

      <Input
        type="email"
        label="ایمیل"
        placeholder="ایمیل"
        {...register('email')}
        error={errors.email?.message as string}
        helperText="(مثال: foodkeys@gmail.com)"
      />
      <Input
        type="url"
        label="وبسایت"
        placeholder="وبسایت"
        {...register('website')}
        error={errors.website?.message as string}
        helperText="(مثال: https://www.foodkeys.com)"
        className="col-span-full"
      />
    </FormGroup>
  );
}
