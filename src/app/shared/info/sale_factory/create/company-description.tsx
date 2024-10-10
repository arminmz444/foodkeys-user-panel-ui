import FormGroup from '@/app/shared/form-group';
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import cn from '@/utils/class-names';

const CompanyDescription = ({ className }: { className?: string }) => {
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
      title="توضیحات تکمیلی"
      description="شامل توضیحات تکمیلی کارخانه ..."
      className={cn(className)}
    >
      <Textarea
        label="توضیحات"
        placeholder="توضیحات دستگاه"
        {...register('otherBrands')}
        error={errors.otherBrands?.message as string}
        rows={5}
        className="col-span-full"
      />
    </FormGroup>
  );
};

export default CompanyDescription;
