import { z } from 'zod';
import { useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Text } from '@/components/ui/text';
import { Form } from '@/components/ui/form';
import Select from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Password } from '@/components/ui/password';
import cn from '@/utils/class-names';
import { regions, customerStatus, customerSources } from './data';
import { countries } from '@/app/shared/logistics/shipment/create/select-options';
import toast from 'react-hot-toast';
import Upload from '@/components/ui/upload';
import { ActionIcon } from '@/components/ui/action-icon';
import { PiX } from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';

interface EditProfileFormProps {
  className?: string;
}

const initialValues = {
  avatar: '',
  coverPhoto: '',
  fullName: '',
  email: '',
  phone: '',
  password: '',
  company: '',
  region: '',
  country: '',
  city: '',
  street: '',
  status: '',
  customerSource: '',
};

const signInFormSchema = z.object({
  avatar: z.string(),
  coverPhoto: z.string(),
  fullName: z.string().min(5, {
    message: 'نام مشتری الزامی میباشد',
  }),
  email: z.string().email({ message: 'آدرس ایمیل اشتباه میباشد' }),
  phone: z.string(),
  password: z.string(),
  company: z.string(),
  region: z.string(),
  country: z.string(),
  city: z.string(),
  street: z.string(),
  status: z.string(),
  customerSource: z.string(),
});

type FormType = z.infer<typeof signInFormSchema>;

export default function EditProfileForm({ className }: EditProfileFormProps) {
  const [reset, setReset] = useState({});
  const { closeModal } = useModal();
  const [isLoading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FormType> = (data) => {
    // set timeout ony required to display loading state of the create company button
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('editProfile', data);
      setReset(initialValues);
      toast.success('عکس پروفایل با موفقیت ویرایش شد');
    }, 600);
  };

  return (
    <div className="w-[1100px] max-w-full rounded-md p-6">
      <div className="flex items-center justify-between">
        <Text tag="h3">ویرایش پروفایل</Text>
        <ActionIcon variant="text" onClick={() => closeModal()}>
          <PiX className="h-5 w-5" />
        </ActionIcon>
      </div>

      <Form<FormType>
        onSubmit={onSubmit}
        resetValues={reset}
        validationSchema={signInFormSchema}
        useFormProps={{
          defaultValues: initialValues,
        }}
        className="mt-7 grid gap-4 md:grid-cols-2 md:gap-7"
      >
        {({ register, control, formState: { errors } }) => {
          console.log('errors', errors);
          return (
            <>
              <Controller
                name="avatar"
                control={control}
                render={({ field }) => (
                  <Upload
                    accept="img"
                    label="آواتار"
                    wrapperClassName="col-span-full"
                    placeholderText={
                      <>
                        <div className="@5xl::ps-10 pt-2 text-center @2xl:ps-5 @2xl:text-left">
                          <h5 className="mb-2 text-sm font-bold text-gray-900 @2xl:text-base @3xl:mb-3 @3xl:text-lg">
                            عکس خود را اینجا بیندازید یا انتخاب کنید
                          </h5>
                          <p className="text-sm leading-relaxed text-gray-900">
                            ساز آواتار باید 200x200 باشد
                          </p>
                        </div>
                      </>
                    }
                    {...field}
                  />
                )}
              />
              <Controller
                name="coverPhoto"
                control={control}
                render={({ field }) => (
                  <Upload
                    accept="img"
                    label="عکس کاور"
                    wrapperClassName="col-span-full"
                    placeholderText={
                      <>
                        <div className="@5xl::ps-10 pt-2 text-center @2xl:ps-5 @2xl:text-left">
                          <h5 className="mb-2 text-sm font-bold text-gray-900 @2xl:text-base @3xl:mb-3 @3xl:text-lg">
                            عکس خود را اینجا بیندازید یا انتخاب کنید
                          </h5>
                          <p className="text-sm leading-relaxed text-gray-900">
                            سایز کاور باید 1500x1500 باشد
                          </p>
                        </div>
                      </>
                    }
                    {...field}
                  />
                )}
              />
              <Input
                label="نام کامل *"
                placeholder="نام خود را وارد کنید..."
                labelClassName="font-medium text-gray-900 dark:text-white"
                {...register('fullName')}
                error={errors.fullName?.message}
              />
              <Input
                type="email"
                label="ایمیل"
                placeholder="ایمیل را وارد کنید"
                labelClassName="font-medium text-gray-900 dark:text-white"
                {...register('email')}
                error={errors.email?.message}
              />
              <Password
                label="رمز عبور"
                placeholder="رمز عبور خود را وارد کنید"
                labelClassName="font-medium text-gray-900 dark:text-white"
                {...register('password')}
                error={errors.password?.message}
              />
              <Input
                label="نام شرکت"
                placeholder="نام شرکت را وارد کنید..."
                labelClassName="font-medium text-gray-900 dark:text-white"
                {...register('company')}
                error={errors.company?.message}
              />
              <Input
                label="شماره تماس"
                placeholder="شماره تماس خود را وارد کنید..."
                labelClassName="font-medium text-gray-900 dark:text-white"
                {...register('phone')}
                error={errors.phone?.message}
              />
              <Controller
                control={control}
                name="region"
                render={({ field: { value, onChange } }) => (
                  <Select
                    label="محل دفتر"
                    labelClassName="font-medium text-gray-900 dark:text-white"
                    dropdownClassName="p-2 gap-1 grid"
                    value={value}
                    onChange={onChange}
                    options={regions}
                    getOptionValue={(option) => option.value}
                    displayValue={(selected: string) =>
                      regions?.find((c) => c.value === selected)?.name ?? ''
                    }
                    error={errors?.region?.message as string}
                    placeholder="انتخاب"
                  />
                )}
              />
              <Controller
                control={control}
                name="country"
                render={({ field: { value, onChange } }) => (
                  <Select
                    label="نام کشور"
                    labelClassName="font-medium text-gray-900 dark:text-white"
                    dropdownClassName="p-2 gap-1 grid"
                    value={value}
                    onChange={onChange}
                    options={countries}
                    getOptionValue={(option) => option.value}
                    displayValue={(selected: string) =>
                      countries?.find((c) => c.value === selected)?.name ?? ''
                    }
                    error={errors?.country?.message as string}
                    placeholder="انتخاب"
                  />
                )}
              />
              <Controller
                control={control}
                name="status"
                render={({ field: { value, onChange } }) => (
                  <Select
                    label="وضعیت مشتری"
                    labelClassName="font-medium text-gray-900 dark:text-white"
                    dropdownClassName="p-2 gap-1 grid"
                    value={value}
                    onChange={onChange}
                    options={customerStatus}
                    getOptionValue={(option) => option.value}
                    displayValue={(selected: string) =>
                      customerStatus?.find((c) => c.value === selected)?.name ??
                      ''
                    }
                    error={errors?.status?.message as string}
                    placeholder="انتخاب"
                  />
                )}
              />
              <Controller
                control={control}
                name="customerSource"
                render={({ field: { value, onChange } }) => (
                  <Select
                    label="منبع مشتری"
                    labelClassName="font-medium text-gray-900 dark:text-white"
                    dropdownClassName="p-2 gap-1 grid"
                    value={value}
                    onChange={onChange}
                    options={customerSources}
                    getOptionValue={(option) => option.value}
                    displayValue={(selected: string) =>
                      customerSources?.find((c) => c.value === selected)
                        ?.name ?? ''
                    }
                    error={errors?.customerSource?.message as string}
                    placeholder="انتخاب"
                  />
                )}
              />
              <Input
                label="شهر"
                placeholder="شهر را وارد کنید"
                labelClassName="font-medium text-gray-900 dark:text-white"
                {...register('city')}
                error={errors.city?.message}
              />
              <Input
                label="خیابان"
                placeholder="آدرس خیابان را وارد کنید"
                className="col-span-full"
                labelClassName="font-medium text-gray-900 dark:text-white"
                {...register('street')}
                error={errors.street?.message}
              />
              <div className="col-span-full mt-2 flex items-center justify-end">
                <Button
                  type="submit"
                  className="dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
                  isLoading={isLoading}
                >
                  ویرایش پروفایل
                </Button>
              </div>
            </>
          );
        }}
      </Form>
    </div>
  );
}
