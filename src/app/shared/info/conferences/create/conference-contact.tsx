import FormGroup from '@/app/shared/form-group';
import TrashIcon from '@/components/icons/trash';
import cn from '@/utils/class-names';
import { useCallback, useEffect, useState } from 'react';
import { ActionIcon } from '@/components/ui/action-icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { PiPlusBold } from 'react-icons/pi';

export default function ConferenceContact({
  className,
  resetAll,
}: {
  className?: string;
}) {
  const {
    register,
    control,
    watch,
    formState: { errors },
    setValue,
  } = useFormContext();
  const [conferencePhones, setConferencePhones] = useState<string[]>([]);
  const [conferenceFaxes, setConferenceFaxes] = useState<string[]>([]);
  const watchedTels = watch('tel', []);

  useEffect(() => {
    setConferenceFaxes([]);
    setConferencePhones([]);
  }, [resetAll]);
  useEffect(() => {
    if (watchedTels && watchedTels?.length) setConferencePhones(watchedTels);
  }, [watchedTels]);

  return (
    <FormGroup
      title="اطلاعات تماس همایش"
      description="شامل تلفن‌ها، سایت و ..."
      className={cn(className)}
    >
      <div className="flex flex-col space-y-2">
        <label className="font-medium text-gray-700 dark:text-gray-600">
          تلفن‌های ثابت همایش
        </label>
        {conferencePhones.map((phone, index) => (
          <div key={index} className="flex items-center gap-2 space-x-2">
            <Input
              value={phone}
              placeholder={`تلفن ${index + 1}`}
              onChange={(e) => {
                const updatedPhones = [...conferencePhones];
                updatedPhones[index] = e.target.value;
                setConferencePhones(updatedPhones);
                setValue('tel', updatedPhones);
              }}
              className="flex-grow"
            />
            <ActionIcon
              onClick={() => {
                let tmp = conferencePhones.filter((_, i) => i !== index);
                setConferencePhones(tmp);
                setValue('tel', tmp);
              }}
              variant="flat"
              color="danger"
            >
              <TrashIcon className="h-4 w-4 text-red-light" />
            </ActionIcon>
          </div>
        ))}
        {conferencePhones.length < 3 && (
          <Button
            variant="outline"
            onClick={() => setConferencePhones([...conferencePhones, ''])}
          >
            <PiPlusBold className="me-2 h-4 w-4" /> اضافه کردن تلفن جدید
          </Button>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="font-medium text-gray-700 dark:text-gray-600">
          فکس‌های همایش
        </label>
        {conferenceFaxes.map((phone, index) => (
          <div key={index} className="flex items-center gap-2 space-x-2">
            <Input
              value={phone}
              placeholder={`فکس ${index + 1}`}
              onChange={(e) => {
                const updatedFaxes = [...conferenceFaxes];
                updatedFaxes[index] = e.target.value;
                setConferenceFaxes(updatedFaxes);
                setValue('fax', updatedFaxes);
              }}
              className="flex-grow"
            />
            <ActionIcon
              onClick={() => {
                let tmp = conferenceFaxes.filter((_, i) => i !== index);
                setConferenceFaxes(tmp);
                setValue('fax', tmp);
              }}
              variant="flat"
              color="danger"
            >
              <TrashIcon className="h-4 w-4 text-red-light" />
            </ActionIcon>
          </div>
        ))}
        {conferenceFaxes.length < 3 && (
          <Button
            variant="outline"
            onClick={() => setConferenceFaxes([...conferenceFaxes, ''])}
          >
            <PiPlusBold className="me-2 h-4 w-4" /> اضافه کردن فکس جدید
          </Button>
        )}
      </div>

      <Input
        type="url"
        label="وب‌سایت"
        placeholder="وب‌سایت"
        {...register('website')}
        error={errors.website?.message as string}
        helperText="(مثال: https://www.foodkeys.com)"
      />
    </FormGroup>
  );
}
