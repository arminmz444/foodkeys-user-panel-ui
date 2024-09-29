'use client';

import z from 'zod';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { Form } from '@/components/ui/form';
import { useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import SelectBox from '@/components/ui/select';
import toast from 'react-hot-toast';

const role = [
  {
    name: 'طراح نرم افزار',
    value: 'product_designer',
  },
  {
    name: 'مهندس نرم افزار',
    value: 'software_engineer',
  },
];

const countries = [
  {
    name: 'امریکا',
    value: 'usa',
  },
  {
    name: 'بنگلادش',
    value: 'bd',
  },
];

const teams = [
  {
    name: 'طراحی',
    value: 'design',
  },
  {
    name: 'منابع انسانی',
    value: 'human_resource',
  },
  {
    name: 'اپراتور',
    value: 'operations',
  },
  {
    name: 'مالی',
    value: 'finance',
  },
  {
    name: 'محصول',
    value: 'product',
  },
];

// form zod validation schema
const personalInfoFormSchema = z.object({
  first_name: z.string().min(1, { message: 'نام الزامی میباشد' }),
  last_name: z.string().optional(),
  email: z.string().email({ message: 'آدرس ایمیل اشتباه میباشد' }),
  role: z.string({ required_error: 'نقش الزامی میباشد' }),
  country: z.string().optional(),
  teams: z.string({ required_error: 'تیم الزامی میباشد' }),
});

// generate form types from zod validation schema
type PersonalInfoFormTypes = z.infer<typeof personalInfoFormSchema>;

export default function AddTeamMemberModalView() {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<PersonalInfoFormTypes> = (data) => {
    toast.success(
      <Text tag="b" className="font-semibold">
        عضو جدید با موفقیت اضافه شد!
      </Text>
    );
    // set timeout ony required to display loading state of the create company button
    setLoading(true);
    closeModal();
    setTimeout(() => {
      setLoading(false);
      console.log(' data ->', data);
      setReset({
        first_name: '',
        last_name: '',
        email: '',
        role: '',
        country: '',
      });
    }, 600);
  };

  return (
    <div className="m-auto p-6">
      <Text tag="h3" className="mb-6 text-lg">
        اضافه کردن عضو جدید
      </Text>
      <Form<PersonalInfoFormTypes>
        validationSchema={personalInfoFormSchema}
        resetValues={reset}
        onSubmit={onSubmit}
      >
        {({ register, control, formState: { errors } }) => (
          <>
            <MemberForm control={control} register={register} errors={errors} />
            <div className="mt-8 flex justify-end gap-3">
              <Button
                className="w-auto"
                variant="outline"
                onClick={() => closeModal()}
              >
                انصراف
              </Button>
              <Button type="submit" isLoading={isLoading} className="w-auto">
                اضافه کردن
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
}

export function MemberForm({ register, control, errors }: any) {
  return (
    <div className="flex flex-col gap-4 text-gray-700">
      <div className="flex flex-col gap-4 xs:flex-row xs:items-center">
        <Input
          type="text"
          label="نام"
          placeholder="صادق"
          labelClassName="text-sm font-medium text-gray-900"
          {...register('first_name')}
          error={errors?.first_name?.message}
          className="flex-grow"
        />
        <Input
          type="text"
          label="فامیلی"
          placeholder="صادقی"
          labelClassName="text-sm font-medium text-gray-900"
          {...register('last_name')}
          error={errors?.last_name?.message}
          className="flex-grow"
        />
      </div>
      <Input
        type="email"
        label="ایمیل"
        labelClassName="text-sm font-medium text-gray-900"
        placeholder="john@doe.io"
        {...register('email')}
        error={errors.email?.message}
      />
      <Controller
        control={control}
        name="role"
        render={({ field: { value, onChange } }) => (
          <SelectBox
            label="نقش"
            labelClassName="text-sm font-medium text-gray-900"
            // @ts-ignore
            placeholder={role[0].name}
            options={role}
            onChange={onChange}
            value={value}
            getOptionValue={(option) => option.value}
            displayValue={(selected) =>
              role?.find((r) => r.value === selected)?.name ?? ''
            }
            error={errors?.role?.message as string}
          />
        )}
      />
      <Controller
        control={control}
        name="country"
        render={({ field: { onChange, value } }) => (
          <SelectBox
            label="کشور"
            labelClassName="text-sm font-medium text-gray-900"
            // @ts-ignore
            placeholder={countries[0].name}
            options={countries}
            onChange={onChange}
            value={value}
            getOptionValue={(option) => option.value}
            displayValue={(selected) =>
              countries?.find((con) => con.value === selected)?.name ?? ''
            }
            error={errors?.country?.message as string}
          />
        )}
      />
      <Controller
        control={control}
        name="teams"
        render={({ field: { value, onChange } }) => (
          <SelectBox
            label="متصل کردن به تیم"
            labelClassName="text-sm font-medium text-gray-900"
            // @ts-ignore
            placeholder={teams[0].name}
            options={teams}
            onChange={onChange}
            value={value}
            getOptionValue={(option) => option.value}
            displayValue={(selected) =>
              teams?.find((t) => t.value === selected)?.name ?? ''
            }
            error={errors?.teams?.message as string}
          />
        )}
      />
    </div>
  );
}
