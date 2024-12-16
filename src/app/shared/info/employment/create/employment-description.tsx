import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Textarea } from 'rizzui';

const EmploymentDescription = ({ className }: { className?: string }) => {
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
      title="توضیحات آگهی"
      description="شامل متن آگهی"
      className={cn(className)}
    >
      <Textarea
        label="توضیحات*"
        placeholder="توضیحات"
        {...register('description')}
        error={errors.description?.message as string}
        rows={5}
        className="col-span-full"
      />
    </FormGroup>
  );
};

export default EmploymentDescription;
