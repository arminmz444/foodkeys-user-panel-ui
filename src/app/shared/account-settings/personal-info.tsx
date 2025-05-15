'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import z from 'zod';
import { SubmitHandler, Controller } from 'react-hook-form';
import {
  PiClock,
  PiEnvelopeSimple,
  PiPhone,
  PiQuestion,
  PiTrashBold,
  PiXBold,
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
import { Textarea } from 'rizzui';
import { DatePicker } from '@/components/ui/datepicker';
import SelectLoader from '@/components/loader/select-loader';
import useAxiosPrivate from '@/hooks/use-axios-private';
import { AuthContext } from '@/context/AuthContext';
import { CONTEXT_ACTION } from '@/core/dto/enums/context-action';
import { CLIENT_STATIC_FILES_PATH } from 'next/constants';
import { setUserInfo } from '@/store/userSlice';
import noPic from '@public/mockProfile.webp';
import { login } from '@/store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { FaPlusCircle } from 'react-icons/fa';
import { CiCirclePlus } from 'react-icons/ci';
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
const individualType = [
  {
    name: 'حقیقی',
    value: 0,
  },
  {
    name: 'حقوقی',
    value: 1,
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
  firstName: z.string().min(1, { message: 'نام الزامی میباشد' }),
  lastName: z.string().optional(),
  // email:     z.string().email({ message: 'آدرس ایمیل اشتباه میباشد' }),
  phone: z
    .string()
    .min(11, { message: 'شماره تلفن باید ۱۱ رقم باشد' })
    .max(11, { message: 'شماره تلفن باید ۱۱ رقم باشد' }),
  address: z.string().optional(),
  postalCode: z.string().optional(),
  provinceId: z.any({ required_error: 'استان الزامی میباشد' }),
  cityId: z.any({ required_error: 'شهر الزامی میباشد' }),
  jobPosition: z.string({ required_error: 'نقش الزامی میباشد' }),
  // country: z.string({required_error: 'کشور اجباری میباشد'}),
  // timezone: z.string().optional(),
  // description: z.string().optional(),
  individualType: z.number({ required_error: 'نوع شخص الزامی میباشد' }),
  pelak: z.string().optional(),
  nationalCode: z
    .string()
    .min(10, { message: 'کد ملی باید ۱۰ رقم باشد' })
    .max(10, { message: 'کد ملی باید ۱۰ رقم باشد' }),
  shenasCode: z
    .string()
    .min(4, { message: 'شماره شناسنامه باید ۴ یا ۱۰ رقم باشد' })
    .max(10, { message: 'شماره شناسنامه باید ۴ یا ۱۰ رقم باشد' }),
  //   birthDate: z.date(),
});

// generate form types from zod validation schema
type PersonalInfoFormTypes = z.infer<typeof personalInfoFormSchema>;

// @ts-ignore
export default function PersonalInfoView({ user }) {
  const dispatch = useDispatch();
  // @ts-ignore
  // const dispatch = useDispatch()
  // const user = useSelector((state: RootState) => state.user);
  const _axios = useAxiosPrivate();
  const STATIC_FILE_PATH = 'http://192.168.43.57:8080';
  const imageRef = useRef<HTMLInputElement>(null);
  const userImgRef = useRef<HTMLInputElement>(null);
  const [isLoading, setLoading] = useState(false);
  const [images, setImages] = useState<Array<File>>([]);
  const [profileImage, setProfileImage] = useState(null);
  const [reset, setReset] = useState({});
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [emails, setEmails] = useState<string[]>([user?.email]);
  // const {user} = state;
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
          console.log(selectedProvince);
          const response = await _axios.get(
            `/province/${selectedProvince?.value}/city`
            // `/province/${selectedProvince.value}/city`
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

  const handleProfileImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && file.type.includes('image')) {
      // @ts-ignore
      setProfileImage(file);
    }
  };

  // const handleProfileImageUpload = (
  //     event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //     const uploadedFiles = (event.target as HTMLInputElement).files;
  //     const newFiles = Object.entries(uploadedFiles as object)
  //         .map((file) => {
  //             if (file[1].type.includes('image')) return file[1];
  //         })
  //         .filter((file) => file !== undefined);
  //     setProfileImage((prevFiles) => [...prevFiles, ...newFiles]);
  // };

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

  const handleAddEmail = () => {
    setEmails([...emails, '']);
  };

  const handleRemoveEmail = (index: number) => {
    const newEmails = emails.filter((_, i) => i !== index);
    setEmails(newEmails);
  };

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const onSubmit: SubmitHandler<PersonalInfoFormTypes> = async (data) => {
    try {
      setLoading(true);
      console.log('Profile settings data ->', {
        ...data,
        profileImages: images,
      });
      if (profileImage) {
        const formData = new FormData();
        // @ts-ignore
        formData.append('file', profileImage);
        await _axios.put('/user/avatar', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      data['provinceId'] = data['provinceId']['value'];
      data['cityId'] = data['cityId']['value'];
      const response = await _axios.put('/user/profile', data);
      if (response.data.statusCode === 200) {
        dispatch(setUserInfo(response.data.data));
        toast.success(<Text tag="b">پروفایل با موفقیت بروزرسانی شد!</Text>);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      if (
        // @ts-ignore
        error.response &&
        // @ts-ignore
        error.response.status === 400 &&
        // @ts-ignore
        error.response.data.statusCode === 400 &&
        // @ts-ignore
        error.response.data.error?.length
      ) {
        // @ts-ignore
        toast.error(error.response.data.message);
        // @ts-ignore
        error.response.data.error.forEach((err) => {
          if (err.formikField !== 'GENERAL') {
            // Assuming you can map formikField to the zod fields
          }
        });
      } else {
        toast.error('خطا در بروزرسانی پروفایل');
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Form<PersonalInfoFormTypes>
        validationSchema={personalInfoFormSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: {
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || '',
            phone: user?.phone || '',
            address: user?.address || '',
            postalCode: user?.postalCode || '',
            provinceId: user?.provinceId || '',
            cityId: user?.cityId || '',
            individualType: user?.individualType === 'PERSON' ? 0 : 1 || 0,
            jobPosition: user?.jobPosition || '',
            // description: '',
            pelak: user?.pelak || '',
            nationalCode: user?.nationalCode || '',
            shenasCode: user?.shenasCode || '',
            birthDate: user?.birthDate ? new Date(user?.birthDate) : undefined,
          },
        }}
      >
        {({
          register,
          control,
          formState: { errors },
          handleSubmit,
          resetField,
        }) => {
          return (
            <>
              {/*<div*/}
              {/*    className={cn(*/}
              {/*        '-mx-5 flex items-center justify-between border-b border-gray-100 px-5 py-10 lg:-mx-8 lg:px-8 4xl:-mx-10 4xl:px-10'*/}
              {/*    )}*/}
              {/*>*/}
              {/*    <div>*/}
              {/*        <Text*/}
              {/*            tag="h2"*/}
              {/*            className="mb-2 text-xl font-semibold text-gray-900"*/}
              {/*        >*/}
              {/*            اطلاعات شخصی*/}
              {/*        </Text>*/}
              {/*        <Text className="text-sm text-gray-500">*/}
              {/*            ویرایش عکس و اطلاعات شخصی*/}
              {/*        </Text>*/}
              {/*    </div>*/}
              {/*</div>*/}

              <div className="w-full max-w-screen-2xl">
                <HorizontalFormBlockWrapper
                  title={
                    <>
                      عکس شما <PiQuestion className="h4 w-4 text-gray-500" />
                    </>
                  }
                  titleClassName="flex gap-2 items-center"
                  description="عکس پروفایل خود را انتخاب نمایید."
                >
                  <div className="col-span-2 flex flex-col items-center gap-4 @xl:flex-row">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border shadow-md dark:bg-white">
                      <Image
                        src={
                          (user?.avatar &&
                            process.env.NEXT_PUBLIC_STATIC_FILES_URL +
                              user?.avatar) ||
                          noPic
                        }
                        className="aspect-square border object-cover shadow-md"
                        priority
                        alt="Profile avatar"
                        sizes="(max-width: 768px) 100vw"
                        fill
                        unoptimized
                      />
                    </div>
                    <Button
                      tag="button"
                      variant="outline"
                      onClick={() =>
                        document.getElementById('profileImg')?.click()
                      }
                    >
                      تغییر
                      <input
                        id="profileImg"
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={handleProfileImageUpload}
                      />
                    </Button>
                  </div>
                  {/*<div className="flex flex-col gap-6 @container @3xl:col-span-2 @7xl:flex-row">*/}
                  {/*    <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-full">*/}
                  {/*        <Image*/}
                  {/*            src={user?.avatar?.filePath && STATIC_FILE_PATH + user?.avatar?.filePath || "https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/profile-image.jpg"}*/}
                  {/*            className="aspect-square object-cover"*/}
                  {/*            priority*/}
                  {/*            alt="Profile avatar"*/}
                  {/*            sizes="(max-width: 768px) 100vw"*/}
                  {/*            fill*/}
                  {/*            unoptimized*/}
                  {/*        />*/}
                  {/*    </div>*/}
                  {/*    <Button type="button" variant="outline">*/}
                  {/*        تغییر*/}
                  {/*        <input hidden accept="image/*" type="file"*/}
                  {/*               onChange={handleProfileImageUpload}/>*/}
                  {/*    </Button>*/}
                  {/*<Upload*/}
                  {/*    iconClassName="w-28 h-auto"*/}
                  {/*    label={''}*/}
                  {/*    ref={userImgRef}*/}
                  {/*    accept="img"*/}
                  {/*    onChange={handleProfileImageUpload}*/}
                  {/*    wrapperClassName="flex-grow"*/}
                  {/*    className="mb-5 min-h-[170px] justify-center border-dashed bg-gray-50"*/}
                  {/*/>*/}
                  {/*</div>*/}
                </HorizontalFormBlockWrapper>
                <HorizontalFormBlockWrapper
                  title="نام و نام خانوادگی"
                  titleClassName="text-base font-medium"
                >
                  <Input
                    placeholder="نام"
                    {...register('firstName')}
                    error={errors.firstName?.message}
                    className="flex-grow"
                  />
                  <Input
                    placeholder="نام خانوادگی"
                    {...register('lastName')}
                    error={errors.lastName?.message}
                    className="flex-grow"
                  />
                </HorizontalFormBlockWrapper>

                <HorizontalFormBlockWrapper
                  title="آدرس ایمیل"
                  titleClassName="text-base font-medium"
                  className=""
                >
                  {/* <div className="col-span-full flex items-center gap-2">
                    <Input
                      prefix={
                        <PiEnvelopeSimple className="h-6 w-6 text-gray-500" />
                      }
                      id="email-0"
                      type="email"
                      placeholder="example@foodkeys.com"
                      value={emails[0]}
                      onChange={(e) => handleEmailChange(0, e.target.value)}
                      className="w-1/2"
                    />
                    <span className="flex gap-2">
                      <Button className="h-10 w-20" size="sm" rounded="lg">
                        تأیید ایمیل
                      </Button>
                      {emails.length === 0 && (
                        <Button
                          className="h-10 w-auto gap-2 dark:text-white"
                          size="sm"
                          rounded="lg"
                          color="success"
                          onClick={handleAddEmail}
                        >
                          <span className="">افزودن ایمیل</span>
                          <CiCirclePlus className="h-6 w-6" />
                        </Button>
                      )}
                    </span>
                  </div> */}
                  {emails.map((email, index) => (
                    <div
                      key={index}
                      className="col-span-full flex flex-col items-center gap-2 sm:flex-row"
                    >
                      <Input
                        prefix={
                          <PiEnvelopeSimple className="h-6 w-6 text-gray-500" />
                        }
                        id={`email-${index}`}
                        type="email"
                        placeholder="example@foodkeys.com"
                        value={email}
                        onChange={(e) =>
                          handleEmailChange(index, e.target.value)
                        }
                        className="w-full sm:w-1/2"
                      />
                      <span className="flex w-full gap-2 sm:w-1/2">
                        {emails.length !== 0 && emails.length !== 1 && (
                          <Button
                            className="h-10 w-10"
                            size="sm"
                            rounded="lg"
                            color="danger"
                            onClick={() => handleRemoveEmail(index)}
                          >
                            <PiXBold className="h-4 w-4" />
                          </Button>
                        )}
                        <Button className="h-10 w-20" size="sm" rounded="lg">
                          تأیید ایمیل
                        </Button>

                        {emails.length === index + 1 && (
                          <Button
                            className="h-10 w-auto gap-2 dark:text-white"
                            size="sm"
                            rounded="lg"
                            color="success"
                            onClick={handleAddEmail}
                          >
                            <span>افزودن ایمیل</span>
                            <CiCirclePlus className="h-6 w-6" />
                          </Button>
                        )}
                      </span>
                    </div>
                  ))}
                </HorizontalFormBlockWrapper>

                <HorizontalFormBlockWrapper
                  title="شماره تلفن"
                  titleClassName="text-base font-medium"
                >
                  <Input
                    prefix={<PiPhone className="h-6 w-6 text-gray-500" />}
                    placeholder="شماره تلفن"
                    {...register('phone')}
                    error={errors.phone?.message}
                  />
                  <Button className="h-10 w-32" size="sm" rounded="lg">
                    تأیید شماره تلفن
                  </Button>
                </HorizontalFormBlockWrapper>

                <HorizontalFormBlockWrapper
                  title="اطلاعات هویتی"
                  titleClassName="text-base font-medium"
                >
                  <Input
                    placeholder="کد ملی"
                    {...register('nationalCode')}
                    error={errors.nationalCode?.message}
                    className="flex-grow"
                  />
                  <Input
                    placeholder="شماره شناسنامه"
                    {...register('shenasCode')}
                    error={errors.shenasCode?.message}
                    className="flex-grow"
                  />
                  <Controller
                    control={control}
                    name="individualType"
                    render={({ field: { value, onChange } }) => (
                      <SelectBox
                        // @ts-ignore
                        placeholder="نوع شخص"
                        options={individualType}
                        onChange={onChange}
                        value={value}
                        getOptionValue={(option) => option.value}
                        displayValue={(selected) =>
                          individualType?.find((r) => r.value === selected)
                            ?.name ?? 'انتخاب نشده'
                        }
                        error={errors?.individualType?.message as string}
                      />
                    )}
                  />
                  {/*<Controller*/}
                  {/*    name="birthDate"*/}
                  {/*    control={control}*/}
                  {/*    render={({field: {onChange, value, onBlur}}) => (*/}
                  {/*        <DatePicker*/}
                  {/*            selected={value}*/}
                  {/*            onChange={onChange}*/}
                  {/*            onBlur={onBlur}*/}
                  {/*            dateFormat="yyyy/MM/dd"*/}
                  {/*            maxDate={new Date()}*/}
                  {/*            // @ts-ignore*/}
                  {/*            helperText="تاریخ تولد"*/}
                  {/*            placeholderText="تاریخ تولد"*/}
                  {/*            inputProps={{*/}
                  {/*                variant: 'outline',*/}
                  {/*                inputClassName: 'p-4 border border-gray-300 rounded-md',*/}
                  {/*            }}*/}
                  {/*            popperPlacement="bottom-end"*/}
                  {/*            className="flex-grow"*/}
                  {/*        />*/}
                  {/*    )}*/}
                  {/*/>*/}
                  {/*{errors.birthDate && (*/}
                  {/*    <p className="text-red-500 text-sm">{errors.birthDate.message}</p>*/}
                  {/*)}*/}
                </HorizontalFormBlockWrapper>

                <HorizontalFormBlockWrapper
                  title="آدرس"
                  titleClassName="text-base font-medium"
                >
                  <Controller
                    name="provinceId"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <SelectBox
                        // @ts-ignore
                        options={provinces.map((province) => ({
                          // @ts-ignore
                          value: province.id,
                          // @ts-ignore
                          name: province.name,
                        }))}
                        value={value}
                        onChange={(e) => {
                          onChange(e);
                          // @ts-ignore
                          setSelectedProvince(e);
                          resetField('cityId');
                        }}
                        placeholder="انتخاب استان"
                        displayValue={(selected) =>
                          selected?.name ?? 'انتخاب نشده'
                        }
                        error={errors?.provinceId?.message as string}
                      />
                    )}
                  />

                  <Controller
                    name="cityId"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <SelectBox
                        // @ts-ignore
                        options={cities.map((city) => ({
                          value: city.id,
                          name: city.nameFa,
                        }))}
                        value={value}
                        onChange={(e) => {
                          onChange(e);
                          // @ts-ignore
                          setSelectedCity(e);
                        }}
                        placeholder="انتخاب شهر"
                        getOptionValue={(option) => option.name}
                        error={errors?.cityId?.message as string}
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
                </HorizontalFormBlockWrapper>

                {/*<HorizontalFormBlockWrapper title="کد پستی" titleClassName="text-base font-medium">*/}
                {/*  <Input*/}
                {/*      placeholder="کد پستی"*/}
                {/*      {...register('postalCode')}*/}
                {/*      error={errors.postalCode?.message}*/}
                {/*  />*/}
                {/*</HorizontalFormBlockWrapper>*/}

                <HorizontalFormBlockWrapper
                  title="سمت در محل کار"
                  titleClassName="text-base font-medium col-span-full"
                >
                  {/* <Controller
                    control={control}
                    name="jobPosition"
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
                        error={errors?.jobPosition?.message as string}
                      />
                    )}
                  /> */}
                  <Controller
                    control={control}
                    name="jobPosition"
                    render={({ field: { value, onChange } }) => (
                      <Input
                        placeholder="سمت شغلی خود را وارد کنید"
                        {...register('jobPosition')}
                        error={errors?.jobPosition?.message}
                        className="col-span-full"
                      />
                    )}
                  />
                </HorizontalFormBlockWrapper>

                {/*<HorizontalFormBlockWrapper*/}
                {/*  title="کشور"*/}
                {/*  titleClassName="text-base font-medium"*/}
                {/*>*/}
                {/*  <Controller*/}
                {/*    control={control}*/}
                {/*    name="country"*/}
                {/*    render={({ field: { onChange, value } }) => (*/}
                {/*      <SelectBox*/}
                {/*        // @ts-ignore*/}
                {/*        placeholder={countries[0].name}*/}
                {/*        options={countries}*/}
                {/*        onChange={onChange}*/}
                {/*        value={value}*/}
                {/*        className="col-span-full"*/}
                {/*        getOptionValue={(option) => option.value}*/}
                {/*        displayValue={(selected) =>*/}
                {/*          countries?.find((con) => con.value === selected)*/}
                {/*            ?.name ?? ''*/}
                {/*        }*/}
                {/*        error={errors?.country?.message as string}*/}
                {/*      />*/}
                {/*    )}*/}
                {/*  />*/}
                {/*</HorizontalFormBlockWrapper>*/}

                {/*<HorizontalFormBlockWrapper*/}
                {/*  title={*/}
                {/*    <>*/}
                {/*      منطقه زمانی{' '}*/}
                {/*      <PiQuestion className="h4 w-4 text-gray-500" />*/}
                {/*    </>*/}
                {/*  }*/}
                {/*  titleClassName="flex gap-2 items-center"*/}
                {/*>*/}
                {/*  <Controller*/}
                {/*    control={control}*/}
                {/*    name="timezone"*/}
                {/*    render={({ field: { onChange, value } }) => (*/}
                {/*      <SelectBox*/}
                {/*        prefix={<PiClock className="h-6 w-6 text-gray-500" />}*/}
                {/*        // @ts-ignore*/}
                {/*        placeholder={timezones[0].name}*/}
                {/*        options={timezones}*/}
                {/*        onChange={onChange}*/}
                {/*        value={value}*/}
                {/*        className="col-span-full"*/}
                {/*        getOptionValue={(option) => option.value}*/}
                {/*        displayValue={(selected) =>*/}
                {/*          timezones?.find((tmz) => tmz.value === selected)*/}
                {/*            ?.name ?? ''*/}
                {/*        }*/}
                {/*        error={errors?.timezone?.message as string}*/}
                {/*      />*/}
                {/*    )}*/}
                {/*  />*/}
                {/*</HorizontalFormBlockWrapper>*/}

                {/*<HorizontalFormBlockWrapper*/}
                {/*    title="بیوگرافی"*/}
                {/*    titleClassName="text-base font-medium"*/}
                {/*>*/}
                {/*    <Controller*/}
                {/*        control={control}*/}
                {/*        name="description"*/}
                {/*        render={({field: {onChange, value}}) => (*/}
                {/*            <QuillEditor*/}
                {/*                value={value}*/}
                {/*                onChange={onChange}*/}
                {/*                className="@3xl:col-span-2 [&>.ql-container_.ql-editor]:min-h-[100px] [&>.ql-toolbar]:3xl:overflow-x-auto"*/}
                {/*                labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"*/}
                {/*            />*/}
                {/*        )}*/}
                {/*    />*/}
                {/*</HorizontalFormBlockWrapper>*/}

                <HorizontalFormBlockWrapper
                  title="عکس پس زمینه پروفایل"
                  description="عکس دلخواه خود را انتخاب کنید"
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
                  onClick={handleSubmit(onSubmit)}
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
