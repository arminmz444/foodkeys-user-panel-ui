import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import QuillLoader from '@/components/loader/quill-loader';
import { useQuery } from 'react-query';
import { PiPlusBold } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import { ActionIcon } from '@/components/ui/action-icon';
import TrashIcon from '@/components/icons/trash';
import { useCallback, useState } from 'react';
import { Radio } from 'rizzui';
import { Textarea } from '@/components/ui/textarea';

const Select = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => <SelectLoader />,
});
const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});

// const fetchSubcategories = async () => {
//   const { data } = await axios.get('http://localhost:8080/api/v1/category/1/subcategory');
//   return data;
// };

export default function CompanyOffice({ className }: { className?: string }) {
  const [provinces, setProvinces] = useState<{ id: string; name: string }[]>(
    []
  );
  const [cities, setCities] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [factoryPhones, setFactoryPhones] = useState<string[]>([]);
  const [officeFaxes, setOfficeFaxes] = useState<string[]>([]);
  const [contacts, setContacts] = useState<
    { name: string; lastName: string; position: string; phoneNumber: string }[]
  >([]);

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'brands',
  });

  //   const addCustomField = useCallback(
  //     () => append([...brands]),
  //     [append, brands]
  //   );
  return (
      <FormGroup
          title="اطلاعات تماس دفتر مرکزی"
          description="شامل تلفن های تماس، آدرس و ..."
          className={cn(className)}
      >
        {/*<Controller*/}
        {/*  name="officeProvince"*/}
        {/*  control={control}*/}
        {/*  render={({ field: { onChange, value } }) => (*/}
        {/*    <Select*/}
        {/*      label="استان دفتر مرکزی"*/}
        {/*      options={provinces.map((province) => ({*/}
        {/*        value: province.id,*/}
        {/*        name: province.name,*/}
        {/*      }))}*/}
        {/*      value={value}*/}
        {/*      onChange={(e) => {*/}
        {/*        onChange(e);*/}
        {/*        //@ts-ignore*/}
        {/*        setSelectedProvince(e);*/}
        {/*      }}*/}
        {/*      placeholder="انتخاب استان"*/}
        {/*      error={errors?.officeProvince?.message as string}*/}
        {/*      isRequired*/}
        {/*    />*/}
        {/*  )}*/}
        {/*/>*/}
        {/*<Controller*/}
        {/*  name="officeCity"*/}
        {/*  control={control}*/}
        {/*  render={({ field: { onChange, value } }) => (*/}
        {/*    <Select*/}
        {/*      label="شهر دفتر مرکزی"*/}
        {/*      // @ts-ignore*/}
        {/*      options={cities.map((city) => ({*/}
        {/*        //@ts-ignore*/}
        {/*        value: city.id,*/}
        {/*        //@ts-ignore*/}
        {/*        name: city.nameFa,*/}
        {/*      }))}*/}
        {/*      value={value}*/}
        {/*      onChange={onChange}*/}
        {/*      placeholder="انتخاب شهر"*/}
        {/*      error={errors?.officeCity?.message as string}*/}
        {/*      isRequired*/}
        {/*    />*/}
        {/*  )}*/}
        {/*/>*/}

          <Input
                label="استان دفتر مرکزی"
                placeholder="استان دفتر مرکزی"
                {...register('officeState')}
                error={errors.officeState?.message as string}
                className="w-full
          "
            />
            <Input
                label="شهر دفتر مرکزی"
                placeholder="شهر دفتر مرکزی"
                {...register('officeCity')}
                error={errors.officeCity?.message as string}
                className="w-full"
            />
          <div className="col-span-2">
            <Input
                label="کد پستی دفتر مرکزی"
                type="number"
                placeholder="کد پستی دفتر مرکزی"
                {...register('officePoBox')}
                error={errors.officePoBox?.message as string}
                className="w-full
          "
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-medium text-gray-700 dark:text-gray-600">
              تلفن‌های ثابت دفتر مرکزی
            </label>
            {factoryPhones.map((phone, index) => (
                <div key={index} className="flex items-center gap-2 space-x-2">
                  <Input
                      type="number"
                      value={phone}
                      placeholder={`تلفن دفتر مرکزی ${index + 1}`}
                      onChange={(e) => {
                        const newPhones = [...factoryPhones];
                        newPhones[index] = e.target.value;
                        setFactoryPhones(newPhones);
                      }}
                      className="flex-grow"
                  />
                  <ActionIcon
                      onClick={() =>
                          setFactoryPhones(factoryPhones.filter((_, i) => i !== index))
                      }
                      variant="flat"
                      color="danger"
                  >
                    <TrashIcon className="h-4 w-4 text-red-light"/>
                  </ActionIcon>
                </div>
            ))}
            {factoryPhones.length < 3 && (
                <Button
                    onClick={() => setFactoryPhones([...factoryPhones, ''])}
                    variant="outline"
                >
                  <PiPlusBold className="me-2 h-4 w-4"/> اضافه کردن تلفن جدید
                </Button>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-medium text-gray-700 dark:text-gray-600">
              فکس های دفتر مرکزی
            </label>
            {officeFaxes.map((phone, index) => (
                <div key={index} className="flex items-center gap-2 space-x-2">
                  <Input
                      type="number"
                      value={phone}
                      placeholder={`تلفن دفتر مرکزی ${index + 1}`}
                      onChange={(e) => {
                        const newFaxes = [...officeFaxes];
                        newFaxes[index] = e.target.value;
                        setOfficeFaxes(newFaxes);
                      }}
                      className="flex-grow"
                  />
                  <ActionIcon
                      onClick={() =>
                          setOfficeFaxes(officeFaxes.filter((_, i) => i !== index))
                      }
                      variant="flat"
                      color="danger"
                  >
                    <TrashIcon className="h-4 w-4 text-red-light"/>
                  </ActionIcon>
                </div>
            ))}
            {officeFaxes.length < 3 && (
                <Button
                    onClick={() => setOfficeFaxes([...officeFaxes, ''])}
                    variant="outline"
                >
                  <PiPlusBold className="me-2 h-4 w-4"/> اضافه کردن تلفن جدید
                </Button>
            )}
          </div>

          <Input
              label="سامانه پیام کوتاه"
              type="number"
              placeholder="سامانه پیام کوتاه"
              {...register('smsNumber')}
              error={errors.smsNumber?.message as string}
          />
          <Input
              label="شماره خط ویژه"
              type="number"
              placeholder="شماره خط ویژه"
              {...register('hotlineNumber')}
              error={errors.hotlineNumber?.message as string}
          />
          <Textarea
              label="آدرس دفتر مرکزی*"
              placeholder="آدرس دفتر مرکزی"
              {...register('officeLocation')}
              error={errors.officeLocation?.message as string}
              rows={5}
              className="col-span-full"
          />
      </FormGroup>
);
}
