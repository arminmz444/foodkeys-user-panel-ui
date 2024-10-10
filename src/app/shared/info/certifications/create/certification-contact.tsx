import FormGroup from '@/app/shared/form-group';
import TrashIcon from '@/components/icons/trash';
import cn from '@/utils/class-names';
import React, { useState } from 'react';
import { ActionIcon } from '@/components/ui/action-icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PiPlusBold } from 'react-icons/pi';
import { useFieldArray, useFormContext } from 'react-hook-form';

const CertificationContact = ({ className }: { className?: string }) => {
  const [certificationPhone, setCertificationPhone] = useState<string[]>([]);
  const [certificationFax, setCertificationFax] = useState<string[]>([]);
  const [certificationEmail, setCertificationEmail] = useState<string[]>([]);

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
      title="اطلاعات تماس شرکت"
      description="شامل تلفن ها، سایت و ..."
      className={cn(className)}
    >
      <div className="flex flex-col space-y-2">
        <label className="font-medium text-gray-700 dark:text-gray-600">
          تلفن‌های ثابت شرکت
        </label>
        {certificationPhone.map((phone, index) => (
          <div key={index} className="flex items-center gap-2 space-x-2">
            <Input
              type="number"
              value={phone}
              placeholder={`تلفن شرکت ${index + 1}`}
              onChange={(e) => {
                const newPhones = [...certificationPhone];
                newPhones[index] = e.target.value;
                setCertificationPhone(newPhones);
              }}
              className="flex-grow"
              helperText={index === 0 && '(مثال: 09123456789)'}
            />
            <ActionIcon
              onClick={() =>
                setCertificationPhone(
                  certificationPhone.filter((_, i) => i !== index)
                )
              }
              variant="flat"
              color="danger"
              className={index === 0 ? 'mb-6' : ''}
            >
              <TrashIcon className="h-4 w-4 text-red-light" />
            </ActionIcon>
          </div>
        ))}
        {certificationPhone.length < 3 && (
          <Button
            onClick={() => setCertificationPhone([...certificationPhone, ''])}
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
        {certificationFax.map((fax, index) => (
          <div key={index} className="flex items-center gap-2 space-x-2">
            <Input
              type="number"
              value={fax}
              placeholder={`فکس شرکت ${index + 1}`}
              onChange={(e) => {
                const newFaxes = [...certificationFax];
                newFaxes[index] = e.target.value;
                setCertificationFax(newFaxes);
              }}
              className="flex-grow"
            />
            <ActionIcon
              onClick={() =>
                setCertificationFax(
                  certificationFax.filter((_, i) => i !== index)
                )
              }
              variant="flat"
              color="danger"
            >
              <TrashIcon className="h-4 w-4 text-red-light" />
            </ActionIcon>
          </div>
        ))}
        {certificationFax.length < 3 && (
          <Button
            onClick={() => setCertificationFax([...certificationFax, ''])}
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
        {certificationEmail.map((email, index) => (
          <div key={index} className="flex items-center gap-2 space-x-2">
            <Input
              type="email"
              value={email}
              placeholder={`ایمیل شرکت ${index + 1}`}
              onChange={(e) => {
                const newEmails = [...certificationEmail];
                newEmails[index] = e.target.value;
                setCertificationEmail(newEmails);
              }}
              className="flex-grow"
              helperText={index === 0 && '(مثال: foodkeys@gmail.com)'}
            />
            <ActionIcon
              onClick={() =>
                setCertificationEmail(
                  certificationEmail.filter((_, i) => i !== index)
                )
              }
              variant="flat"
              color="danger"
              className={index === 0 ? 'mb-6' : ''}
            >
              <TrashIcon className="h-4 w-4 text-red-light" />
            </ActionIcon>
          </div>
        ))}
        {certificationEmail.length < 3 && (
          <Button
            onClick={() => setCertificationEmail([...certificationEmail, ''])}
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

export default CertificationContact;
