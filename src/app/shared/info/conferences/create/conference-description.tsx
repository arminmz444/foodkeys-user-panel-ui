import FormGroup from '@/app/shared/form-group';
import ItemCrud from '@/app/shared/item-crud';
import cn from '@/utils/class-names';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Textarea } from 'rizzui';

export default function ConferenceDescription({
  className,
}: {
  className?: string;
}) {
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const [keywords, setKeywords] = useState<string[]>([]);
  const watchedKeywords = watch('keywords', []);

  useEffect(() => {
    if (watchedKeywords && watchedKeywords?.length)
      setKeywords(watchedKeywords);
  }, [watchedKeywords]);
  return (
    <FormGroup
      title="توضیحات همایش"
      description="شامل توضیحات همایش و کلمات کلیدی ..."
      className={cn(className)}
    >
      <Textarea
        label="توضیحات*"
        placeholder="توضیحات همایش"
        {...register('description')}
        error={errors.description?.message as string}
        rows={5}
        className="col-span-full"
      />
      <div className="col-span-full grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ItemCrud
          name="کلمه کلیدی"
          items={keywords}
          setItems={setKeywords}
          registerName="keywords"
        />
      </div>
    </FormGroup>
  );
}
