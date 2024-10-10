import FormGroup from '@/app/shared/form-group';
import TrashIcon from '@/components/icons/trash';
import cn from '@/utils/class-names';
import React, { useState } from 'react';
import { ActionIcon } from '@/components/ui/action-icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PiPlusBold } from 'react-icons/pi';
import { useFieldArray, useFormContext } from 'react-hook-form';

const CompanyContact = ({ className }: { className?: string }) => {
  const [companyPhone, setCompanyPhone] = useState<string[]>([]);
  const [companyFax, setCompanyFax] = useState<string[]>([]);

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
      title="اطلاعات تماس دوره"
      description="شامل تلفن ها، سایت و ..."
      className={cn(className)}
    >
      <div className="flex flex-col space-y-2">
        <label className="font-medium text-gray-700 dark:text-gray-600">
          تلفن‌های دوره
        </label>
        {companyPhone.map((phone, index) => (
          <div key={index} className="flex items-center gap-2 space-x-2">
            <Input
              type="number"
              value={phone}
              placeholder={`تلفن  ${index + 1}`}
              onChange={(e) => {
                const newPhones = [...companyPhone];
                newPhones[index] = e.target.value;
                setCompanyPhone(newPhones);
              }}
              className="flex-grow"
            />
            <ActionIcon
              onClick={() =>
                setCompanyPhone(companyPhone.filter((_, i) => i !== index))
              }
              variant="flat"
              color="danger"
            >
              <TrashIcon className="h-4 w-4 text-red-light" />
            </ActionIcon>
          </div>
        ))}
        {companyPhone.length < 3 && (
          <Button
            onClick={() => setCompanyPhone([...companyPhone, ''])}
            variant="outline"
          >
            <PiPlusBold className="me-2 h-4 w-4" /> اضافه کردن تلفن جدید
          </Button>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <label className="font-medium text-gray-700 dark:text-gray-600">
          فکس های دوره
        </label>
        {companyFax.map((fax, index) => (
          <div key={index} className="flex items-center gap-2 space-x-2">
            <Input
              type="number"
              value={fax}
              placeholder={`فکس  ${index + 1}`}
              onChange={(e) => {
                const newFaxes = [...companyFax];
                newFaxes[index] = e.target.value;
                setCompanyFax(newFaxes);
              }}
              className="flex-grow"
            />
            <ActionIcon
              onClick={() =>
                setCompanyFax(companyFax.filter((_, i) => i !== index))
              }
              variant="flat"
              color="danger"
            >
              <TrashIcon className="h-4 w-4 text-red-light" />
            </ActionIcon>
          </div>
        ))}
        {companyFax.length < 3 && (
          <Button
            onClick={() => setCompanyFax([...companyFax, ''])}
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

export default CompanyContact;
