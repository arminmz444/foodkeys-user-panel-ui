import FormGroup from '@/app/shared/form-group';
import TrashIcon from '@/components/icons/trash';
import cn from '@/utils/class-names';
import React, { useState } from 'react';
import { ActionIcon } from '@/components/ui/action-icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PiPlusBold } from 'react-icons/pi';
import { useFieldArray, useFormContext } from 'react-hook-form';

const EmploymentContact = ({ className }: { className?: string }) => {
  const [employmentPhone, setEmploymentPhone] = useState<string[]>([]);
  const [employmentFax, setEmploymentFax] = useState<string[]>([]);
  const [emplooymentEmail, setEmploymentEmail] = useState<string[]>([]);

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
      title="اطلاعات تماس آگهی"
      description="شامل تلفن ها، سایت و ..."
      className={cn(className)}
    >
      <div className="flex flex-col space-y-2">
        <label className="font-medium text-gray-700 dark:text-gray-600">
          تلفن‌های ثابت شرکت
        </label>
        {employmentPhone.map((phone, index) => (
          <div key={index} className="flex items-center gap-2 space-x-2">
            <Input
              type="number"
              value={phone}
              placeholder={`تلفن شرکت ${index + 1}`}
              onChange={(e) => {
                const newPhones = [...employmentPhone];
                newPhones[index] = e.target.value;
                setEmploymentPhone(newPhones);
              }}
              className="flex-grow"
            />
            <ActionIcon
              onClick={() =>
                setEmploymentPhone(
                  employmentPhone.filter((_, i) => i !== index)
                )
              }
              variant="flat"
              color="danger"
            >
              <TrashIcon className="h-4 w-4 text-red-light" />
            </ActionIcon>
          </div>
        ))}
        {employmentPhone.length < 3 && (
          <Button
            onClick={() => setEmploymentPhone([...employmentPhone, ''])}
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
        {employmentFax.map((fax, index) => (
          <div key={index} className="flex items-center gap-2 space-x-2">
            <Input
              type="number"
              value={fax}
              placeholder={`فکس شرکت ${index + 1}`}
              onChange={(e) => {
                const newFaxes = [...employmentFax];
                newFaxes[index] = e.target.value;
                setEmploymentFax(newFaxes);
              }}
              className="flex-grow"
            />
            <ActionIcon
              onClick={() =>
                setEmploymentFax(employmentFax.filter((_, i) => i !== index))
              }
              variant="flat"
              color="danger"
            >
              <TrashIcon className="h-4 w-4 text-red-light" />
            </ActionIcon>
          </div>
        ))}
        {employmentFax.length < 3 && (
          <Button
            onClick={() => setEmploymentFax([...employmentFax, ''])}
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
        {emplooymentEmail.map((fax, index) => (
          <div key={index} className="flex items-center gap-2 space-x-2">
            <Input
              type="email"
              value={fax}
              placeholder={`ایمیل شرکت ${index + 1}`}
              onChange={(e) => {
                const newEmails = [...emplooymentEmail];
                newEmails[index] = e.target.value;
                setEmploymentEmail(newEmails);
              }}
              className="flex-grow"
            />
            <ActionIcon
              onClick={() =>
                setEmploymentEmail(
                  emplooymentEmail.filter((_, i) => i !== index)
                )
              }
              variant="flat"
              color="danger"
            >
              <TrashIcon className="h-4 w-4 text-red-light" />
            </ActionIcon>
          </div>
        ))}
        {emplooymentEmail.length < 3 && (
          <Button
            onClick={() => setEmploymentEmail([...emplooymentEmail, ''])}
            variant="outline"
          >
            <PiPlusBold className="me-2 h-4 w-4" /> اضافه کردن فکس جدید
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

export default EmploymentContact;
