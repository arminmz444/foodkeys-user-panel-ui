import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import QuillLoader from '@/components/loader/quill-loader';
import { PiPlusBold, PiXBold } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import { ActionIcon } from '@/components/ui/action-icon';
import TrashIcon from '@/components/icons/trash';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import useAxiosPrivate from '../../../../../hooks/use-axios-private';
import { Textarea } from '@/components/ui/textarea';

const Select = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => <SelectLoader />,
});
const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});

export default function CompanyFactory({ className }: { className?: string }) {
  const _axios = useAxiosPrivate();
  const [provinces, setProvinces] = useState<{ id: string; name: string }[]>(
    []
  );
  const [cities, setCities] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [factoryPhones, setFactoryPhones] = useState<string[]>([]);
  const [contacts, setContacts] = useState<
    { name: string; lastName: string; position: string; phoneNumber: string }[]
  >([]);

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  // Fetch provinces
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await _axios.get('/province');
        if (response.data.status === 'SUCCESS') {
          setProvinces(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };
    fetchProvinces();
  }, [_axios]);

  useEffect(() => {
    if (selectedProvince) {
      const fetchCities = async () => {
        try {
          // @ts-ignore
          const response = await _axios.get(
            //@ts-ignore
            `/province/${selectedProvince.value}/city`
          );
          if (response.data.status === 'SUCCESS') {
            setCities(response.data.data);
          }
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      };
      fetchCities();
    }
  }, [selectedProvince, _axios]);

  return (
    <FormGroup
      title="اطلاعات تماس کارخانه"
      description="شامل تلفن های تماس، آدرس و ..."
      className={cn(className)}
    >
      <Controller
        name="factoryProvince"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            label="استان کارخانه"
            options={provinces.map((province) => ({
              value: province.id,
              name: province.name,
            }))}
            value={value}
            onChange={(e) => {
              onChange(e);
              //@ts-ignore
              setSelectedProvince(e);
            }}
            placeholder="انتخاب استان"
            error={errors?.factoryProvince?.message as string}
            isRequired
          />
        )}
      />
      <Controller
        name="factoryCity"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            label="شهر کارخانه"
            // @ts-ignore
            options={cities.map((city) => ({
              //@ts-ignore
              value: city.id,
              //@ts-ignore
              name: city.nameFa,
            }))}
            value={value}
            onChange={onChange}
            placeholder="انتخاب شهر"
            error={errors?.factoryCity?.message as string}
            isRequired
          />
        )}
      />

      <Input
        label="نام شهرک صنعتی*"
        placeholder="نام شهرک صنعتی"
        {...register('industrialCityName')}
        error={errors.industrialCityName?.message as string}
        required
      />
      <Input
        label="کد پستی کارخانه"
        type="number"
        placeholder="کد پستی کارخانه"
        {...register('factoryPoBox')}
        error={errors.factoryPoBox?.message as string}
      />

      <div className="flex flex-col space-y-2">
        <label className="font-medium text-gray-700 dark:text-gray-600">
          تلفن‌های ثابت کارخانه
        </label>
        {factoryPhones.map((phone, index) => (
          <div key={index} className="flex items-center gap-2 space-x-2">
            <Input
              type="number"
              value={phone}
              placeholder={`تلفن کارخانه ${index + 1}`}
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
              <TrashIcon className="h-4 w-4 text-red-light" />
            </ActionIcon>
          </div>
        ))}
        {factoryPhones.length < 3 && (
          <Button
            onClick={() => setFactoryPhones([...factoryPhones, ''])}
            variant="outline"
          >
            <PiPlusBold className="me-2 h-4 w-4" /> اضافه کردن تلفن جدید
          </Button>
        )}
      </div>

      <div className="col-span-full flex flex-col space-y-2">
        <label className="mb-4 font-medium text-gray-700 dark:text-gray-600">
          اطلاعات موبایل های شرکت
        </label>
        {contacts.map((contact, index) => (
          <div
            key={index}
            className="grid grid-cols-1 items-center gap-4 xl:grid-cols-4"
          >
            <Input
              label="نام و نام خانوادگی*"
              placeholder="نام و نام خانوادگی"
              value={contact.name}
              onChange={(e) => {
                const newContacts = [...contacts];
                newContacts[index].name = e.target.value;
                setContacts(newContacts);
              }}
              className="flex-grow"
              required
            />

            <Input
              label="سمت*"
              placeholder="سمت"
              value={contact.position}
              onChange={(e) => {
                const newContacts = [...contacts];
                newContacts[index].position = e.target.value;
                setContacts(newContacts);
              }}
              className="flex-grow"
            />
            <Input
              label="شماره موبایل*"
              type="number"
              placeholder="شماره موبایل*"
              value={contact.phoneNumber}
              onChange={(e) => {
                const newContacts = [...contacts];
                newContacts[index].phoneNumber = e.target.value;
                setContacts(newContacts);
              }}
              className="flex-grow"
            />
            <ActionIcon
              onClick={() =>
                setContacts(contacts.filter((_, i) => i !== index))
              }
              variant="flat"
              color="danger"
              className="mt-6"
            >
              <TrashIcon className="h-4 w-4 text-red-light" />
            </ActionIcon>
          </div>
        ))}
        {contacts.length < 3 && (
          <Button
            onClick={() =>
              setContacts([
                ...contacts,
                { name: '', lastName: '', position: '', phoneNumber: '' },
              ])
            }
            variant="outline"
          >
            <PiPlusBold className="me-2 h-4 w-4" /> اضافه کردن تماس جدید
          </Button>
        )}
      </div>
      <Textarea
        label="آدرس کارخانه*"
        placeholder="آدرس"
        {...register('companyAddress')}
        error={errors.companyAddress?.message as string}
        rows={5}
        className="col-span-full"
        required
      />

      {/* Factory Address */}
      {/* <Controller
        control={control}
        name="factoryAddress"
        render={({ field: { onChange, value } }) => (
          <QuillEditor
            value={value}
            onChange={onChange}
            label="آدرس کارخانه"
            className="col-span-full [&_.ql-editor]:min-h-[100px]"
            labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
          />
        )}
      /> */}
    </FormGroup>
  );
}
