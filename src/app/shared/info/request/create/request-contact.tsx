import FormGroup from '@/app/shared/form-group';
import TrashIcon from '@/components/icons/trash';
import cn from '@/utils/class-names';
import React, { useState } from 'react';
import { ActionIcon } from '@/components/ui/action-icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PiPlusBold } from 'react-icons/pi';
import { useFieldArray, useFormContext } from 'react-hook-form';

const RequestContact = ({ className }: { className?: string }) => {
  const [requestPhone, setRequestPhone] = useState<string[]>([]);
  const [requestFax, setRequestFax] = useState<string[]>([]);
  const [requestEmail, setRequestEmail] = useState<string[]>([]);

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
      title="اطلاعات تماس متقاضی"
      description="شامل تلفن ها، سایت و ..."
      className={cn(className)}
    >
      <div className="flex flex-col space-y-2">
        <label className="font-medium text-gray-700 dark:text-gray-600">
          تلفن‌های ثابت شرکت
        </label>
        {requestPhone.map((phone, index) => (
          <div key={index} className="flex items-center gap-2 space-x-2">
            <Input
              type="number"
              value={phone}
              placeholder={`تلفن شرکت ${index + 1}`}
              onChange={(e) => {
                const newPhones = [...requestPhone];
                newPhones[index] = e.target.value;
                setRequestPhone(newPhones);
              }}
              className="flex-grow"
              helperText={index === 0 && '(مثال: 09123456789)'}
            />
            <ActionIcon
              onClick={() =>
                setRequestPhone(requestPhone.filter((_, i) => i !== index))
              }
              variant="flat"
              color="danger"
              className={index === 0 ? 'mb-6' : ''}
            >
              <TrashIcon className="h-4 w-4 text-red-light" />
            </ActionIcon>
          </div>
        ))}
        {requestPhone.length < 3 && (
          <Button
            onClick={() => setRequestPhone([...requestPhone, ''])}
            variant="outline"
          >
            <PiPlusBold className="me-2 h-4 w-4" /> اضافه کردن تلفن جدید
          </Button>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <label className="font-medium text-gray-700 dark:text-gray-600">
          فکس های شرکت
        </label>
        {requestFax.map((fax, index) => (
          <div key={index} className="flex items-center gap-2 space-x-2">
            <Input
              type="number"
              value={fax}
              placeholder={`فکس شرکت ${index + 1}`}
              onChange={(e) => {
                const newFaxes = [...requestFax];
                newFaxes[index] = e.target.value;
                setRequestFax(newFaxes);
              }}
              className="flex-grow"
            />
            <ActionIcon
              onClick={() =>
                setRequestFax(requestFax.filter((_, i) => i !== index))
              }
              variant="flat"
              color="danger"
            >
              <TrashIcon className="h-4 w-4 text-red-light" />
            </ActionIcon>
          </div>
        ))}
        {requestFax.length < 3 && (
          <Button
            onClick={() => setRequestFax([...requestFax, ''])}
            variant="outline"
          >
            <PiPlusBold className="me-2 h-4 w-4" /> اضافه کردن فکس جدید
          </Button>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <label className="font-medium text-gray-700 dark:text-gray-600">
          ایمیل های شرکت
        </label>
        {requestEmail.map((email, index) => (
          <div key={index} className="flex items-center gap-2 space-x-2">
            <Input
              type="email"
              value={email}
              placeholder={`ایمیل شرکت ${index + 1}`}
              onChange={(e) => {
                const newEmails = [...requestEmail];
                newEmails[index] = e.target.value;
                setRequestEmail(newEmails);
              }}
              className="flex-grow"
              helperText={index === 0 && '(مثال: foodkeys@gmail.com)'}
            />
            <ActionIcon
              onClick={() =>
                setRequestEmail(requestEmail.filter((_, i) => i !== index))
              }
              variant="flat"
              color="danger"
              className={index === 0 ? 'mb-6' : ''}
            >
              <TrashIcon className="h-4 w-4 text-red-light" />
            </ActionIcon>
          </div>
        ))}
        {requestEmail.length < 3 && (
          <Button
            onClick={() => setRequestEmail([...requestEmail, ''])}
            variant="outline"
          >
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
};

export default RequestContact;
