'use client';

import React, { useState } from 'react';
import * as z from 'zod';
import {SubmitHandler, Controller, useForm, ErrorOption} from 'react-hook-form';
import {PiDesktop} from 'react-icons/pi';
import cn from '@/utils/class-names';
import {Form} from '@/components/ui/form';
import {Text} from '@/components/ui/text';
import {Button} from '@/components/ui/button';
import {ProfileHeader} from './profile-settings';
import {Password} from '@/components/ui/password';
import HorizontalFormBlockWrapper from './horiozontal-block';
import toast from "react-hot-toast";
import useAxiosPrivate from "@/hooks/use-axios-private";

// form zod validation schema
const passwordFormSchema = z.object({
  currentPassword: z
      .string()
      .min(8, {message: 'رمز عبور فعلی الزامی می‌باشد'}),
  newPassword: z.string().min(8, {message: 'رمز عبور جدید الزامی می‌باشد'}),
  confirmedPassword: z
      .string()
      .min(8, {message: 'تکرار رمز عبور الزامی می‌باشد'}),
});

// generate form types from zod validation schema
type PasswordFormTypes = z.infer<typeof passwordFormSchema>;

export default function PasswordSettingsView({
                                               settings,
                                             }: {
  settings?: PasswordFormTypes;
}) {
  const _axios = useAxiosPrivate()
  const [isLoading, setLoading] = useState(false);
  const [reset, setReset] = useState({});

  // @ts-ignore
  const onSubmit: SubmitHandler<PasswordFormTypes> = async (getValues: { (): { currentPassword: string; newPassword: string; confirmedPassword: string; }; (): any; }, setError: {
    (field: string, value: ErrorOption): void;
    (arg0: string, arg1: { type: any; message: any; }): void;
  }, reset: { (): void; (): void; }) => {
    // @ts-ignore
    const data = getValues()
    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    //   console.log('Password settings data ->', data);
    //
    //   setReset({
    //     currentPassword: '',
    //     newPassword: '',
    //     confirmedPassword: '',
    //   });
    // }, 600);
    if (data.newPassword !== data.confirmedPassword) {
      toast.error('رمز عبور جدید و تکرار رمز عبور مطابقت ندارند');
      return;
    }

    try {
      setLoading(true);
      const response = await _axios.post('/auth/change-password', {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      if (response.status === 200) {
        toast.success('رمز عبور با موفقیت تغییر کرد');
        reset()
        setReset({
          currentPassword: '',
          newPassword: '',
          confirmedPassword: '',
        });
      }
    } catch (error) {
      // @ts-ignore
      if (error.response && error.response.data) {
        // @ts-ignore
        const backendError = error.response.data;
        if (backendError.statusCode === 400 && backendError.error) {
          backendError.error.forEach((err: any) => {
            if (err.formikField === 'currentPassword') {
              console.log(err);
              // @ts-ignore
              setError('currentPassword', {
                type: err.type,
                message: err.message,
              });
            }
          });
        } else {
          toast.error('خطا در تغییر رمز عبور');
        }
      } else {
        toast.error('خطا در تغییر رمز عبور');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
      <>
        <Form<PasswordFormTypes>
            validationSchema={passwordFormSchema}
            resetValues={reset}
            onSubmit={onSubmit}
            useFormProps={{
              defaultValues: {
                ...settings,
              },
            }}
        >
          {({register, control, reset, setError, formState: {errors}, getValues}) => {
            return (
                <>
                  <ProfileHeader
                      title="صادق قاسم نژاد"
                      description="olivia@example.com"
                  />

                  <div className="mx-auto w-full max-w-screen-2xl">
                    <HorizontalFormBlockWrapper
                        title="رمز کنونی"
                        titleClassName="text-base font-medium"
                    >
                      <Controller
                          control={control}
                          name="currentPassword"
                          render={({field: {onChange, value}}) => (
                              <Password
                                  placeholder="رمز عبور خود را وارد کنید"
                                  value={value}
                                  onChange={onChange}
                                  error={errors.currentPassword?.message}
                              />
                          )}
                      />
                    </HorizontalFormBlockWrapper>

                    <HorizontalFormBlockWrapper
                        title="رمز جدید"
                        titleClassName="text-base font-medium"
                    >
                      <Controller
                          control={control}
                          name="newPassword"
                          render={({field: {onChange, value}}) => (
                              <Password
                                  placeholder="رمز عبور خود را وارد کنید"
                                  helperText={
                                      getValues().newPassword.length < 8 &&
                                      'رمز عبور باید بیشتر از 8 کاراکتر باشد'
                                  }
                                  onChange={onChange}
                                  error={errors.newPassword?.message}
                              />
                          )}
                      />
                    </HorizontalFormBlockWrapper>

                    <HorizontalFormBlockWrapper
                        title="تایید رمز جدید"
                        titleClassName="text-base font-medium"
                    >
                      <Controller
                          control={control}
                          name="confirmedPassword"
                          render={({field: {onChange, value}}) => (
                              <Password
                                  placeholder="رمز عبور خود را وارد کنید"
                                  onChange={onChange}
                                  error={errors.confirmedPassword?.message}
                              />
                          )}
                      />
                    </HorizontalFormBlockWrapper>

                    <div className="mt-6 flex w-auto items-center justify-end gap-3">
                      <Button type="button" variant="outline">
                        انصراف
                      </Button>
                      <Button
                          onClick={(e) => {
                            // @ts-ignore
                            onSubmit(() => getValues(), (field: string, value: ErrorOption) => setError(field, value), () => reset())
                      }}
                    type="submit"
                    variant="solid"
                    className="dark:bg-gray-100 dark:text-white"
                  >
                    بروز رسانی رمز عبور
                  </Button>
                </div>
              </div>
            </>
          );
        }}
      </Form>
      <LoggedDevices className="mt-10" />
    </>
  );
}

// Logged devices
function LoggedDevices({ className }: { className?: string }) {
  return (
    <div className={cn('mx-auto w-full max-w-screen-2xl', className)}>
      <div className="border-b border-dashed border-gray-200">
        <Text tag="h2" className="mb-3 text-xl font-bold text-gray-900">
          شما کجا ها لاگین شده اید
        </Text>
        <Text className="mb-6 text-sm text-gray-500">
          اگر در حساب کاربری شما فعالیت غیرمعمولی وجود داشته باشد، از طریق
          olivia@untitledui.com به شما هشدار خواهیم داد.
        </Text>
      </div>
      <div className="flex items-center gap-6 border-b border-dashed border-gray-200 py-6">
        <PiDesktop className="h-7 w-7 text-gray-500" />
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Text
              tag="h3"
              className="text-base font-medium text-gray-900 dark:text-gray-700"
            >
              2021 مک بوک پرو
            </Text>
            <Text
              tag="span"
              className="relative hidden rounded-md border border-gray-200 py-1.5 pe-2.5 ps-5 text-xs font-semibold text-gray-900 before:absolute before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:bg-green ltr:before:left-2.5 rtl:before:right-2.5 sm:block"
            >
              هم اکنون آنلاین است
            </Text>
          </div>
          <div className="flex items-center gap-2">
            <Text className="text-sm text-gray-500">ایران ، شیراز</Text>
            <span className="h-1 w-1 rounded-full bg-gray-600" />
            <Text className="text-sm text-gray-500">
              18 فروردین ساعت 2 بامداد
            </Text>
          </div>
          <Text
            tag="span"
            className="relative mt-2 inline-block rounded-md border border-gray-200 py-1.5 pe-2.5 ps-5 text-xs font-semibold text-gray-900 before:absolute before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:bg-green ltr:before:left-2.5 rtl:before:right-2.5 sm:hidden"
          >
            هم اکنون آنلاین است
          </Text>
        </div>
      </div>
    </div>
  );
}
