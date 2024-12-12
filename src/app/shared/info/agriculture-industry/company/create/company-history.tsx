import FormGroup from '@/app/shared/form-group';
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import cn from '@/utils/class-names';

const CompanyHistory = ({ className }: { className?: string }) => {
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
      title="تاریخچه شرکت"
      description="شامل تاریخچه فعالیت شرکت ..."
      className={cn(className)}
    >
      <Textarea
        label="تاریخچه فعالیت شرکت"
        placeholder="تاریخچه فعالیت شرکت"
        {...register('history')}
        error={errors.history?.message as string}
        rows={5}
        className="col-span-full"
      />
    </FormGroup>
  );
};

export default CompanyHistory;
