import FormGroup from '@/app/shared/form-group';
import TrashIcon from '@/components/icons/trash';
import cn from '@/utils/class-names';
import React, { useState } from 'react';
import { ActionIcon } from '@/components/ui/action-icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PiPlusBold } from 'react-icons/pi';
import { useFieldArray, useFormContext } from 'react-hook-form';

const JobContact = ({ className }: { className?: string }) => {
  const [jobPhone, setJobPhone] = useState<string[]>([]);
  const [jobEmail, setJobEmail] = useState<string[]>([]);

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
          تلفن‌های ثابت کارجو
        </label>
        {jobPhone.map((phone, index) => (
          <div key={index} className="flex items-center gap-2 space-x-2">
            <Input
              type="number"
              value={phone}
              placeholder={`تلفن کارجو ${index + 1}`}
              onChange={(e) => {
                const newPhones = [...jobPhone];
                newPhones[index] = e.target.value;
                setJobPhone(newPhones);
              }}
              className="flex-grow"
              helperText={index === 0 && '(مثال: 02632774306)'}
            />
            <ActionIcon
              onClick={() =>
                setJobPhone(jobPhone.filter((_, i) => i !== index))
              }
              variant="flat"
              color="danger"
              className={index === 0 ? 'mb-6' : ''}
            >
              <TrashIcon className="h-4 w-4 text-red-light" />
            </ActionIcon>
          </div>
        ))}
        {jobPhone.length < 3 && (
          <Button
            onClick={() => setJobPhone([...jobPhone, ''])}
            variant="outline"
          >
            <PiPlusBold className="me-2 h-4 w-4" /> اضافه کردن تلفن جدید
          </Button>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="font-medium text-gray-700 dark:text-gray-600">
          ایمیل های کارجو
        </label>
        {jobEmail.map((fax, index) => (
          <div key={index} className="flex items-center gap-2 space-x-2">
            <Input
              type="email"
              value={fax}
              placeholder={`ایمیل کارجو ${index + 1}`}
              onChange={(e) => {
                const newEmails = [...jobEmail];
                newEmails[index] = e.target.value;
                setJobEmail(newEmails);
              }}
              className="flex-grow"
            />
            <ActionIcon
              onClick={() =>
                setJobEmail(jobEmail.filter((_, i) => i !== index))
              }
              variant="flat"
              color="danger"
            >
              <TrashIcon className="h-4 w-4 text-red-light" />
            </ActionIcon>
          </div>
        ))}
        {jobEmail.length < 3 && (
          <Button
            onClick={() => setJobEmail([...jobEmail, ''])}
            variant="outline"
          >
            <PiPlusBold className="me-2 h-4 w-4" /> اضافه کردن ایمیل جدید
          </Button>
        )}
      </div>
      <Input
        type="number"
        label="موبایل همراه کارجو"
        placeholder="موبایل همراه"
        {...register('mobileNumber')}
        error={errors.mobileNumber?.message as string}
        helperText="(مثال: 09123456789)"
      />
    </FormGroup>
  );
};

export default JobContact;
