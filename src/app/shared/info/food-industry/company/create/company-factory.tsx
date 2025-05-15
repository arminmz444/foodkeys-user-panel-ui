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
import useAxiosPrivate from '../../../../../../hooks/use-axios-private';
import { Textarea } from '@/components/ui/textarea';

const Select = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => <SelectLoader />,
});
const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});

interface FactoryTel {
  id: number;
  telType: string;
  telNumber: string;
  companyId: number;
}
export default function CompanyFactory({
  className,
  category,
  data,
}: {
  className?: string;
  category?: number;
  data?: any;
}) {
  const _axios = useAxiosPrivate();
  const [provinces, setProvinces] = useState<{ id: string; name: string }[]>(
    []
  );
  const [cities, setCities] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [factoryTels, setFactoryTels] = useState<string[]>([]);
  const [factoryFaxes, setFactoryFaxes] = useState<string[]>([]);
  const [contacts, setContacts] = useState<
    {
      name: string;
      lastName: string;
      position: string;
      phone: string;
      email: string;
    }[]
  >([]);

  const {
    register,
    control,
    formState: { errors },
    watch,
  } = useFormContext();

  const watchedTels = watch('factoryTels', []);
  const watchedFaxes = watch('factoryFaxes', []);
  const watchedContacts = watch('contacts', []);

  useEffect(() => {
    if (watchedTels && watchedTels.length) {
      setFactoryTels(watchedTels.map((tel: FactoryTel) => tel.telNumber));
    }
    if (watchedFaxes && watchedFaxes.length) {
      setFactoryFaxes(watchedFaxes.map((fax: FactoryTel) => fax.telNumber));
    }
    if (watchedContacts && watchedContacts) {
      setContacts(watchedContacts);
    }
  }, [watchedTels, watchedContacts, watchedFaxes]);

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
      {/*<Controller*/}
      {/*  name="factoryProvince"*/}
      {/*  control={control}*/}
      {/*  render={({ field: { onChange, value } }) => (*/}
      {/*    <Select*/}
      {/*      label="استان کارخانه"*/}
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
      {/*      error={errors?.factoryProvince?.message as string}*/}
      {/*      isRequired*/}
      {/*    />*/}
      {/*  )}*/}
      {/*/>*/}
      {/*<Controller*/}
      {/*  name="factoryCity"*/}
      {/*  control={control}*/}
      {/*  render={({ field: { onChange, value } }) => (*/}
      {/*    <Select*/}
      {/*      label="شهر کارخانه"*/}
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
      {/*      error={errors?.factoryCity?.message as string}*/}
      {/*      isRequired*/}
      {/*    />*/}
      {/*  )}*/}
      {/*/>*/}
      <Input
        label="استان کارخانه*"
        placeholder="استان کارخانه*"
        {...register('factoryState')}
        error={errors.factoryState?.message as string}
      />
      <Input
        label="شهر کارخانه*"
        placeholder="شهر کارخانه*"
        {...register('factoryCity')}
        error={errors.factoryCity?.message as string}
      />

      <Input
        label="نام شهرک صنعتی*"
        placeholder="نام شهرک صنعتی"
        {...register('industrialCity')}
        error={errors.industrialCity?.message as string}
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
        {factoryTels.map((phone, index) => (
          <div key={index} className="flex items-center gap-2 space-x-2">
            <Input
              type="number"
              value={phone}
              placeholder={`تلفن کارخانه ${index + 1}`}
              onChange={(e) => {
                const newPhones = [...factoryTels];
                newPhones[index] = e.target.value;
                setFactoryTels(newPhones);
              }}
              className="flex-grow"
            />
            <ActionIcon
              onClick={() =>
                setFactoryTels(factoryTels.filter((_, i) => i !== index))
              }
              variant="flat"
              color="danger"
            >
              <TrashIcon className="h-4 w-4 text-red-light" />
            </ActionIcon>
          </div>
        ))}
        {factoryTels.length < 3 && (
          <Button
            onClick={() => setFactoryTels([...factoryTels, ''])}
            variant="outline"
          >
            <PiPlusBold className="me-2 h-4 w-4" /> اضافه کردن تلفن جدید
          </Button>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="font-medium text-gray-700 dark:text-gray-600">
          فکس ثابت کارخانه
        </label>
        {factoryFaxes.map((phone, index) => (
          <div key={index} className="flex items-center gap-2 space-x-2">
            <Input
              type="number"
              value={phone}
              placeholder={`فکس کارخانه ${index + 1}`}
              onChange={(e) => {
                const newPhones = [...factoryTels];
                newPhones[index] = e.target.value;
                setFactoryFaxes(newPhones);
              }}
              className="flex-grow"
            />
            <ActionIcon
              onClick={() =>
                setFactoryTels(factoryTels.filter((_, i) => i !== index))
              }
              variant="flat"
              color="danger"
            >
              <TrashIcon className="h-4 w-4 text-red-light" />
            </ActionIcon>
          </div>
        ))}
        {factoryFaxes.length < 3 && (
          <Button
            onClick={() => setFactoryFaxes([...factoryFaxes, ''])}
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
              label="نام*"
              placeholder="نام*"
              value={contact.name}
              onChange={(e) => {
                const newContacts = [...contacts];
                newContacts[index].name = e.target.value;
                setContacts(newContacts);
              }}
              className="flex-grow"
            />

            <Input
              label="نام خانوادگی*"
              placeholder="نام خانوادگی*"
              value={contact.lastName}
              onChange={(e) => {
                const newContacts = [...contacts];
                newContacts[index].lastName = e.target.value;
                setContacts(newContacts);
              }}
              className="flex-grow"
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
              value={contact.phone}
              onChange={(e) => {
                const newContacts = [...contacts];
                newContacts[index].phone = e.target.value;
                setContacts(newContacts);
              }}
              className="flex-grow"
            />

            <Input
              label="ایمیل"
              type="email"
              placeholder="ایمیل"
              value={contact.email}
              onChange={(e) => {
                const newContacts = [...contacts];
                newContacts[index].email = e.target.value;
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
        {contacts.length < 10 && (
          <Button
            onClick={() =>
              setContacts([
                ...contacts,
                { name: '', lastName: '', email: '', position: '', phone: '' },
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
        placeholder="آدرس کارخانه"
        {...register('factoryLocation')}
        error={errors.factoryLocation?.message as string}
        rows={5}
        className="col-span-full"
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
