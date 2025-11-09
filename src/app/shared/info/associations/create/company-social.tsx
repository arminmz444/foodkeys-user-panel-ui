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
        label="آی دی اینستاگرام"
        placeholder="آی دی اینستاگرام"
        {...register('instagram')}
        error={errors.instagram?.message as string}
        helperText="(مثال: foodkeys@)"
      />
      <Input
        label="آی دی لینکدین"
        placeholder="آی دی لینکدین"
        {...register('instagram')}
        error={errors.instagram?.message as string}
        helperText="(مثال: foodkeys)"
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
      <div className="flex flex-col space-y-2">
        <label className="font-medium text-gray-700 dark:text-gray-600">
          ایمیل ها{' '}
        </label>
        {emails.map((email, index) => (
          <div key={index} className="flex items-center gap-2 space-x-2">
            <Input
              type="email"
              value={email}
              placeholder={`ایمیل ${index + 1}`}
              onChange={(e) => {
                const newEmails: string[] = [...emails];
                newEmails[index] = e.target.value;
                setEmails(newEmails);
              }}
              className="flex-grow"
              helperText={index === 0 && '(مثال: foodkeys@gmail.com)'}
            />
            <ActionIcon
              onClick={() => setEmails(emails.filter((_, i) => i !== index))}
              variant="flat"
              color="danger"
              className={index === 0 ? 'mb-6' : ''}
            >
              <TrashIcon className="h-4 w-4 text-red-light" />
            </ActionIcon>
          </div>
        ))}
        {emails.length < 3 && (
          <Button onClick={() => setEmails([...emails, ''])} variant="outline">
            <PiPlusBold className="me-2 h-4 w-4" /> اضافه کردن ایمیل جدید
          </Button>
        )}
      </div>
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
