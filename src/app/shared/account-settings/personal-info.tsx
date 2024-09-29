'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import z from 'zod';
import { SubmitHandler, Controller } from 'react-hook-form';
import {
  PiClock,
  PiEnvelopeSimple, PiPhone,
  PiQuestion,
  PiTrashBold,
} from 'react-icons/pi';
import cn from '@/utils/class-names';
import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Upload from '@/components/ui/upload';
import { ActionIcon } from '@/components/ui/action-icon';
import HorizontalFormBlockWrapper from './horiozontal-block';
import Spinner from '@/components/ui/spinner';
import { FieldError } from '@/components/ui/field-error';
import toast from 'react-hot-toast';
import {Textarea} from "rizzui";

const SelectBox = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => (
    <div className="grid h-10 place-content-center">
      <Spinner />
    </div>
  ),
});
const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
});

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
const timezones = [
  {
    name: 'ساعت استاندارد (PST) UTC-08:00 ',
    value: 'pst',
  },
  {
    name: 'ساعت استاندارد بنگلادش (BST) UTC+06:00 ',
    value: 'bst',
  },
];

// form zod validation schema
const personalInfoFormSchema = z.object({
  first_name: z.string().min(1, { message: 'نام الزامی میباشد' }),
  last_name: z.string().optional(),
  email: z.string().email({ message: 'آدرس ایمیل اشتباه میباشد' }),
  phone: z.string()
      .min(11, { message: "شماره تلفن باید ۱۱ رقم باشد" })
      .max(11, { message: "شماره تلفن باید ۱۱ رقم باشد"}),
  address: z.string().optional(),
  postalCode: z.string().optional(),
  provinceId: z.number({ required_error: 'استان الزامی میباشد' }),
  cityId: z.number({ required_error: 'شهر الزامی میباشد' }),
  role: z.string({ required_error: 'نقش الزامی میباشد' }),
  country: z.string({ required_error: 'کشور اجباری میباشد' }),
  timezone: z.string().optional(),
  description: z.string().optional(),
  individualType: z.string({ required_error: 'نوع شخص الزامی میباشد' }),
  pelak: z.number().optional()
});

// generate form types from zod validation schema
type PersonalInfoFormTypes = z.infer<typeof personalInfoFormSchema>;

export default function PersonalInfoView() {
  const imageRef = useRef<HTMLInputElement>(null);
  const userImgRef = useRef<HTMLInputElement>(null);
  const [isLoading, setLoading] = useState(false);
  const [images, setImages] = useState<Array<File>>([]);
  const [profileImage, setProfileImage] = useState<Array<File>>([]);
  const [reset, setReset] = useState({});

  const handleProfileImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const uploadedFiles = (event.target as HTMLInputElement).files;
    const newFiles = Object.entries(uploadedFiles as object)
      .map((file) => {
        if (file[1].type.includes('image')) return file[1];
      })
      .filter((file) => file !== undefined);
    setProfileImage((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = (event.target as HTMLInputElement).files;
    const newFiles = Object.entries(uploadedFiles as object)
      .map((file) => {
        if (file[1].type.includes('image')) return file[1];
      })
      .filter((file) => file !== undefined);
    setImages((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleImageDelete = (index: number) => {
    const updatedFiles = images.filter((_, i) => i !== index);
    setImages(updatedFiles);
    (imageRef.current as HTMLInputElement).value = '';
  };

  const onSubmit: SubmitHandler<PersonalInfoFormTypes> = (data) => {
    toast.success(<Text tag="b">با موفقیت اضافه شد!</Text>);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('Profile settings data ->', {
        ...data,
        profileImages: images,
      });
      setReset({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        postalCode: '',
        provinceId: 0,
        cityId: 0,
        individualType: '',
        role: '',
        country: '',
        timezone: '',
        description: '',
        pelak: 0,
      });
    }, 600);
  };

  return (
    <>
      <Form<PersonalInfoFormTypes>
        validationSchema={personalInfoFormSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            address: '',
            postalCode: '',
            provinceId: 0,
            cityId: 0,
            individualType: '',
            role: '',
            country: '',
            timezone: '',
            description: '',
            pelak: 0
          },
        }}
      >
        {({ register, control, formState: { errors } }) => {
          return (
            <>
              {console.log('errors', errors)}
              <div
                className={cn(
                  '-mx-5 flex items-center justify-between border-b border-gray-100 px-5 py-10 lg:-mx-8 lg:px-8 4xl:-mx-10 4xl:px-10'
                )}
              >
                <div>
                  <Text
                    tag="h2"
                    className="mb-2 text-xl font-semibold text-gray-900"
                  >
                    اطلاعات شخصی
                  </Text>
                  <Text className="text-sm text-gray-500">
                    ویرایش عکس و اطلاعات شخصی
                  </Text>
                </div>
              </div>

              <div className="w-full max-w-screen-2xl">
                <HorizontalFormBlockWrapper
                    title={
                      <>
                        عکس شما <PiQuestion className="h4 w-4 text-gray-500" />
                      </>
                    }
                    titleClassName="flex gap-2 items-center"
                    description="عکس پروفایل شما را نشان میدهد."
                >
                  <div className="flex flex-col gap-6 @container @3xl:col-span-2 @7xl:flex-row">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full">
                      <Image
                          src="https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/profile-image.jpg"
                          className="aspect-square object-cover"
                          priority
                          alt="Profile avatar"
                          sizes="(max-width: 768px) 100vw"
                          fill
                      />
                    </div>
                    <Upload
                        iconClassName="w-28 h-auto"
                        label={''}
                        ref={userImgRef}
                        accept="img"
                        onChange={handleProfileImageUpload}
                        wrapperClassName="flex-grow"
                        className="mb-5 min-h-[170px] justify-center border-dashed bg-gray-50"
                    />
                  </div>
                </HorizontalFormBlockWrapper>
                <HorizontalFormBlockWrapper
                  title="نام و نام خانوادگی"
                  titleClassName="text-base font-medium"
                >
                  <Input
                    placeholder="نام"
                    {...register('first_name')}
                    error={errors.first_name?.message}
                    className="flex-grow"
                  />
                  <Input
                    placeholder="نام خانوادگی"
                    {...register('last_name')}
                    error={errors.last_name?.message}
                    className="flex-grow"
                  />
                </HorizontalFormBlockWrapper>

                <HorizontalFormBlockWrapper
                    title="آدرس ایمیل"
                    titleClassName="text-base font-medium"
                >
                  <Input
                      // className="col-span-full"
                      prefix={
                        <PiEnvelopeSimple className="h-6 w-6 text-gray-500" />
                      }
                      type="email"
                      placeholder="georgia.young@example.com"
                      {...register('email')}
                      error={errors.email?.message}
                  />
                  <Button
                      className="w-20 h-10"
                      size="sm"
                      rounded="lg"
                  >
                    تأیید ایمیل
                  </Button>

                </HorizontalFormBlockWrapper>


                <HorizontalFormBlockWrapper title="شماره تلفن" titleClassName="text-base font-medium">
                  <Input
                      prefix={
                        <PiPhone className="h-6 w-6 text-gray-500" />
                      }
                      placeholder="شماره تلفن"
                      {...register('phone')}
                      error={errors.phone?.message}
                  />
                  <Button
                      className="w-32 h-10"
                      size="sm"
                      rounded="lg"
                  >
                    تأیید شماره تلفن
                  </Button>
                </HorizontalFormBlockWrapper>

                <HorizontalFormBlockWrapper title="آدرس" titleClassName="text-base font-medium">
                  <Controller
                      control={control}
                      name="role"
                      render={({ field: { value, onChange } }) => (
                          <SelectBox
                              // @ts-ignore
                              placeholder="انتخاب استان"
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
                      name="role"
                      render={({ field: { value, onChange } }) => (
                          <SelectBox
                              // @ts-ignore
                              placeholder="انتخاب شهر"
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
                  <Textarea
                      maxLength={450}
                      // renderCharacterCount={({ characterCount, maxLength }) => (
                      //     <div className="text-right text-sm opacity-70 rtl:text-left">
                      //       {characterCount}/{maxLength}
                      //     </div>
                      // )}
                      placeholder="آدرس خود را وارد کنید"
                      {...register('address')}
                      error={errors.address?.message}
                      className="col-span-full"
                  />
                  <Input
                      placeholder="کد پستی"
                      {...register('postalCode')}
                      error={errors.postalCode?.message}
                  />
                  <Input
                      placeholder="شماره پلاک"
                      {...register('pelak')}
                      error={errors.pelak?.message}
                  />
                </HorizontalFormBlockWrapper>

                {/*<HorizontalFormBlockWrapper title="کد پستی" titleClassName="text-base font-medium">*/}
                {/*  <Input*/}
                {/*      placeholder="کد پستی"*/}
                {/*      {...register('postalCode')}*/}
                {/*      error={errors.postalCode?.message}*/}
                {/*  />*/}
                {/*</HorizontalFormBlockWrapper>*/}




                <HorizontalFormBlockWrapper
                  title="نقش"
                  titleClassName="text-base font-medium"
                >
                  <Controller
                    control={control}
                    name="role"
                    render={({ field: { value, onChange } }) => (
                      <SelectBox
                        // @ts-ignore
                        placeholder={role[0].name}
                        options={role}
                        onChange={onChange}
                        value={value}
                        className="col-span-full"
                        getOptionValue={(option) => option.value}
                        displayValue={(selected) =>
                          role?.find((r) => r.value === selected)?.name ?? ''
                        }
                        error={errors?.role?.message as string}
                      />
                    )}
                  />
                </HorizontalFormBlockWrapper>

                <HorizontalFormBlockWrapper
                  title="کشور"
                  titleClassName="text-base font-medium"
                >
                  <Controller
                    control={control}
                    name="country"
                    render={({ field: { onChange, value } }) => (
                      <SelectBox
                        // @ts-ignore
                        placeholder={countries[0].name}
                        options={countries}
                        onChange={onChange}
                        value={value}
                        className="col-span-full"
                        getOptionValue={(option) => option.value}
                        displayValue={(selected) =>
                          countries?.find((con) => con.value === selected)
                            ?.name ?? ''
                        }
                        error={errors?.country?.message as string}
                      />
                    )}
                  />
                </HorizontalFormBlockWrapper>

                <HorizontalFormBlockWrapper
                  title={
                    <>
                      منطقه زمانی{' '}
                      <PiQuestion className="h4 w-4 text-gray-500" />
                    </>
                  }
                  titleClassName="flex gap-2 items-center"
                >
                  <Controller
                    control={control}
                    name="timezone"
                    render={({ field: { onChange, value } }) => (
                      <SelectBox
                        prefix={<PiClock className="h-6 w-6 text-gray-500" />}
                        // @ts-ignore
                        placeholder={timezones[0].name}
                        options={timezones}
                        onChange={onChange}
                        value={value}
                        className="col-span-full"
                        getOptionValue={(option) => option.value}
                        displayValue={(selected) =>
                          timezones?.find((tmz) => tmz.value === selected)
                            ?.name ?? ''
                        }
                        error={errors?.timezone?.message as string}
                      />
                    )}
                  />
                </HorizontalFormBlockWrapper>

                <HorizontalFormBlockWrapper
                  title="بیوگرافی"
                  titleClassName="text-base font-medium"
                >
                  <Controller
                    control={control}
                    name="description"
                    render={({ field: { onChange, value } }) => (
                      <QuillEditor
                        value={value}
                        onChange={onChange}
                        className="@3xl:col-span-2 [&>.ql-container_.ql-editor]:min-h-[100px] [&>.ql-toolbar]:3xl:overflow-x-auto"
                        labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                      />
                    )}
                  />
                </HorizontalFormBlockWrapper>

                <HorizontalFormBlockWrapper
                  title="پورتفولیو"
                  description="چند تا از نمونه کار هاتو به اشتراک بذار"
                  className="border-0 pb-0"
                >
                  <div className="mb-5 @3xl:col-span-2">
                    {images.length ? (
                      <div
                        className={cn(
                          'mb-5 grid gap-5',
                          images.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
                        )}
                      >
                        {images?.map((file: File, index: number) => (
                          <div
                            key={file.name}
                            className={cn(
                              'group relative min-h-[80px] w-full overflow-hidden rounded-md first:min-h-[300px] xs:min-h-[144px] xs:first:min-h-[424px]',
                              images.length !== 2 && 'first:col-span-3'
                            )}
                          >
                            <div className="absolute left-0 top-0 z-50 h-full w-full bg-black bg-opacity-40 opacity-0 backdrop-blur-md  transition-all group-hover:opacity-100 dark:bg-opacity-20"></div>
                            <Image
                              src={URL.createObjectURL(file)}
                              className="aspect-[193/144] object-cover"
                              priority
                              alt="Profile avatar"
                              sizes="(max-width: 768px) 100vw"
                              fill
                            />
                            <ActionIcon
                              onClick={() => handleImageDelete(index)}
                              size="sm"
                              variant="flat"
                              color="danger"
                              className="invisible absolute right-5 top-5 z-50 ms-auto flex-shrink-0 bg-gray-0 p-0 opacity-0 transition-all hover:enabled:bg-white group-hover:visible group-hover:opacity-100"
                            >
                              <PiTrashBold className="w-6" />
                            </ActionIcon>
                          </div>
                        ))}
                      </div>
                    ) : null}
                    <div>
                      <Upload
                        label={''}
                        ref={imageRef}
                        multiple
                        accept="img"
                        iconClassName="w-28 h-auto"
                        onChange={handleImageUpload}
                        className="mb-5 min-h-[200px] justify-center border-dashed bg-gray-50"
                      />

                      {images.length > 0 ? (
                        <FieldError error={'این فیلد اجباری میباشد'} />
                      ) : null}
                    </div>
                  </div>
                </HorizontalFormBlockWrapper>
              </div>

              <div className="border-gary-300 sticky bottom-0 z-40 -mx-6 -mb-7 flex items-center justify-end gap-3 border-t bg-gray-0/10 px-10 py-5 backdrop-blur @lg:gap-4 @xl:grid @xl:auto-cols-max @xl:grid-flow-col 3xl:-mx-8 4xl:-mx-10">
                <Button variant="outline" className="w-full @xl:w-auto">
                  انصراف
                </Button>
                <Button
                  type="submit"
                  isLoading={isLoading}
                  className="w-full @xl:w-auto dark:bg-gray-100 dark:text-white"
                >
                  ذخیره
                </Button>
              </div>
            </>
          );
        }}
      </Form>
    </>
  );
}
