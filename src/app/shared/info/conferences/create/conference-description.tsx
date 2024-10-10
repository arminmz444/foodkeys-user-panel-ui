import FormGroup from '@/app/shared/form-group';
import QuillLoader from '@/components/loader/quill-loader';
import cn from '@/utils/class-names';
import dynamic from 'next/dynamic';
import React from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});

const ConferenceDescription = ({ className }: { className?: string }) => {
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
      title="توضیحات"
      description="شامل توضیحات همایش"
      className={cn(className)}
    >
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <QuillEditor
            value={value}
            onChange={onChange}
            label="توضیحات همایش*"
            className="col-span-full [&_.ql-editor]:min-h-[100px]"
            labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
          />
        )}
      />
    </FormGroup>
  );
};

export default ConferenceDescription;
