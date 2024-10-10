import FormGroup from '@/app/shared/form-group';
import TrashIcon from '@/components/icons/trash';
import cn from '@/utils/class-names';
import React, { useState } from 'react';
import { ActionIcon } from '@/components/ui/action-icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PiPlusBold } from 'react-icons/pi';
import { useFieldArray, useFormContext } from 'react-hook-form';

const ResellerContact = ({ className }: { className?: string }) => {
  const [resellerPhone, setResellerPhone] = useState<string[]>([]);
  const [resellerFax, setResellerFax] = useState<string[]>([]);
  const [resellerEmail, setResellerEmail] = useState<string[]>([]);

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
      title="اطلاعات تماس اعطاکننده"
      description="شامل تلفن ها، سایت و ..."
      className={cn(className)}
    >
      <div className="flex flex-col space-y-2">
        <label className="font-medium text-gray-700 dark:text-gray-600">
          تلفن‌های ثابت
        </label>
        {resellerPhone.map((phone, index) => (
          <div key={index} className="flex items-center gap-2 space-x-2">
            <Input
              type="number"
              value={phone}
              placeholder={`تلفن ثابت ${index + 1}`}
              onChange={(e) => {
                const newPhones = [...resellerPhone];
                newPhones[index] = e.target.value;
                setResellerPhone(newPhones);
              }}
              className="flex-grow"
              helperText={index === 0 && '(مثال: 09123456789)'}
            />
            <ActionIcon
              onClick={() =>
                setResellerPhone(resellerPhone.filter((_, i) => i !== index))
              }
              variant="flat"
              color="danger"
              className={index === 0 ? 'mb-6' : ''}
            >
              <TrashIcon className="h-4 w-4 text-red-light" />
            </ActionIcon>
          </div>
        ))}
        {resellerPhone.length < 3 && (
          <Button
            onClick={() => setResellerPhone([...resellerPhone, ''])}
            variant="outline"
          >
            <PiPlusBold className="me-2 h-4 w-4" /> اضافه کردن تلفن جدید
          </Button>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <label className="font-medium text-gray-700 dark:text-gray-600">
          فکس های اعطاکننده
        </label>
        {resellerFax.map((fax, index) => (
          <div key={index} className="flex items-center gap-2 space-x-2">
            <Input
              type="number"
              value={fax}
              placeholder={`فکس  ${index + 1}`}
              onChange={(e) => {
                const newFaxes = [...resellerFax];
                newFaxes[index] = e.target.value;
                setResellerFax(newFaxes);
              }}
              className="flex-grow"
            />
            <ActionIcon
              onClick={() =>
                setResellerFax(resellerFax.filter((_, i) => i !== index))
              }
              variant="flat"
              color="danger"
            >
              <TrashIcon className="h-4 w-4 text-red-light" />
            </ActionIcon>
          </div>
        ))}
        {resellerFax.length < 3 && (
          <Button
            onClick={() => setResellerFax([...resellerFax, ''])}
            variant="outline"
          >
            <PiPlusBold className="me-2 h-4 w-4" /> اضافه کردن فکس جدید
          </Button>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <label className="font-medium text-gray-700 dark:text-gray-600">
          ایمیل های اعطاکننده
        </label>
        {resellerEmail.map((email, index) => (
          <div key={index} className="flex items-center gap-2 space-x-2">
            <Input
              type="email"
              value={email}
              placeholder={`ایمیل  ${index + 1}`}
              onChange={(e) => {
                const newEmails = [...resellerEmail];
                newEmails[index] = e.target.value;
                setResellerEmail(newEmails);
              }}
              className="flex-grow"
              helperText={index === 0 && '(مثال: foodkeys@gmail.com)'}
            />
            <ActionIcon
              onClick={() =>
                setResellerEmail(resellerEmail.filter((_, i) => i !== index))
              }
              variant="flat"
              color="danger"
              className={index === 0 ? 'mb-6' : ''}
            >
              <TrashIcon className="h-4 w-4 text-red-light" />
            </ActionIcon>
          </div>
        ))}
        {resellerEmail.length < 3 && (
          <Button
            onClick={() => setResellerEmail([...resellerEmail, ''])}
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

export default ResellerContact;
