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
import { Textarea } from '@/components/ui/textarea';

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

export default function CompanyContact({ className }: { className?: string }) {
  const [provinces, setProvinces] = useState<{ id: string; name: string }[]>(
    []
  );
  const [factoryPhones, setFactoryPhones] = useState<string[]>([]);
  const [officeFaxes, setOfficeFaxes] = useState<string[]>([]);
  const [contacts, setContacts] = useState<
    { name: string; lastName: string; position: string; phoneNumber: string }[]
  >([]);

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
      title="اطلاعات تماس "
      description="شامل تلفن های تماس، ایمیل و ..."
      className={cn(className)}
    >
      <div className="flex flex-col space-y-2">
        <label className="font-medium text-gray-700 dark:text-gray-600">
          تلفن‌های ثابت
        </label>
        {factoryPhones.map((phone, index) => (
          <div key={index} className="flex items-center gap-2 space-x-2">
            <Input
              type="number"
              value={phone}
              placeholder={`تلفن  ${index + 1}`}
              onChange={(e) => {
                const newPhones = [...factoryPhones];
                newPhones[index] = e.target.value;
                setFactoryPhones(newPhones);
              }}
              className="flex-grow"
            />
            <ActionIcon
              onClick={() =>
                setFactoryPhones(factoryPhones.filter((_, i) => i !== index))
              }
              variant="flat"
              color="danger"
            >
              <TrashIcon className="h-4 w-4 text-red-light" />
            </ActionIcon>
          </div>
        ))}
        {factoryPhones.length < 3 && (
          <Button
            onClick={() => setFactoryPhones([...factoryPhones, ''])}
            variant="outline"
          >
            <PiPlusBold className="me-2 h-4 w-4" /> اضافه کردن تلفن جدید
          </Button>
        )}
      </div>
    </FormGroup>
  );
}
