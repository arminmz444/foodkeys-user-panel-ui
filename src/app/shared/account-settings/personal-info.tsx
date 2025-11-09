// 'use client';
//
// import React, { useEffect, useRef, useState } from 'react';
// import Image from 'next/image';
// import { Controller, SubmitHandler } from 'react-hook-form';
// import {
//   PiClock,
//   PiEnvelopeSimple,
//   PiPhone,
//   PiQuestion,
//   PiTrashBold,
//   PiUser,
//   PiXBold,
// } from 'react-icons/pi';
// import { CiCirclePlus } from 'react-icons/ci';
// import cn from '@/utils/class-names';
// import { Form } from '@/components/ui/form';
// import { Text } from '@/components/ui/text';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import Upload from '@/components/ui/upload';
// import { ActionIcon } from '@/components/ui/action-icon';
// import HorizontalFormBlockWrapper from './horiozontal-block';
// import Spinner from '@/components/ui/spinner';
// import { FieldError } from '@/components/ui/field-error';
// import toast from 'react-hot-toast';
// import { Textarea } from 'rizzui';
// import { DatePicker } from '@/components/ui/datepicker';
// import useAxiosPrivate from '@/hooks/use-axios-private';
// import { z } from 'zod';
// import { useDispatch } from 'react-redux';
// import { setUserInfo } from '@/store/userSlice';
// import noPic from '@public/mockProfile.webp';
// import dynamic from 'next/dynamic';
//
// const SelectBox = dynamic(() => import('@/components/ui/select'), {
//   ssr: false,
//   loading: () => (
//       <div className="grid h-10 place-content-center">
//         <Spinner />
//       </div>
//   ),
// });
//
// const individualType = [
//   {
//     name: 'حقیقی',
//     value: 'PERSON',
//   },
//   {
//     name: 'حقوقی',
//     value: 'COMPANY',
//   },
// ];
//
// // form zod validation schema
// const personalInfoFormSchema = z.object({
//   firstName: z.string().min(1, { message: 'نام الزامی میباشد' }),
//   lastName: z.string().optional(),
//   email: z.string().email({ message: 'آدرس ایمیل اشتباه میباشد' }).optional(),
//   phone: z
//       .string()
//       .min(11, { message: 'شماره تلفن باید ۱۱ رقم باشد' })
//       .max(11, { message: 'شماره تلفن باید ۱۱ رقم باشد' })
//       .optional(),
//   username: z.string().optional(),
//   address: z.string().optional(),
//   postalCode: z.string().optional(),
//   province: z.any().optional(),
//   city: z.any().optional(),
//   jobPosition: z.string().optional(),
//   individualType: z.enum(['PERSON', 'COMPANY']).optional(),
//   pelak: z.string().optional(),
//   nationalCode: z
//       .string()
//       .min(10, { message: 'کد ملی باید ۱۰ رقم باشد' })
//       .max(10, { message: 'کد ملی باید ۱۰ رقم باشد' })
//       .optional(),
//   shenasCode: z
//       .string()
//       .min(4, { message: 'شماره شناسنامه باید ۴ یا ۱۰ رقم باشد' })
//       .max(10, { message: 'شماره شناسنامه باید ۴ یا ۱۰ رقم باشد' })
//       .optional(),
//   birthDate: z.date().optional(),
// });
//
// type PersonalInfoFormTypes = z.infer<typeof personalInfoFormSchema>;
//
// export default function PersonalInfoView({ user }) {
//   const dispatch = useDispatch();
//   const _axios = useAxiosPrivate();
//   const STATIC_FILE_PATH = process.env.NEXT_PUBLIC_STATIC_FILES_URL || 'https://back.agfo.ir';
//   const imageRef = useRef<HTMLInputElement>(null);
//   const [isLoading, setLoading] = useState(false);
//   const [images, setImages] = useState<Array<File>>([]);
//   const [profileImage, setProfileImage] = useState<File | null>(null);
//   const [reset, setReset] = useState({});
//   const [provinces, setProvinces] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [selectedProvince, setSelectedProvince] = useState(null);
//   const [selectedCity, setSelectedCity] = useState(null);
//   const [emails, setEmails] = useState<string[]>(user?.emails || []);
//   const [phones, setPhones] = useState<string[]>(user?.phoneNumbers || user?.phones || []);
//
//   useEffect(() => {
//     const fetchProvinces = async () => {
//       try {
//         const response = await _axios.get('/province');
//         if (response.data.status === 'SUCCESS') {
//           setProvinces(response.data.data);
//         }
//       } catch (error) {
//         console.error('Error fetching provinces:', error);
//       }
//     };
//     fetchProvinces();
//   }, [_axios]);
//
//   useEffect(() => {
//     if (selectedProvince) {
//       const fetchCities = async () => {
//         try {
//           const response = await _axios.get(
//               `/province/${selectedProvince.value}/city`
//           );
//           if (response.data.status === 'SUCCESS') {
//             setCities(response.data.data);
//           }
//         } catch (error) {
//           console.error('Error fetching cities:', error);
//         }
//       };
//       fetchCities();
//     }
//   }, [selectedProvince, _axios]);
//
//   const handleProfileImageUpload = (
//       event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files?.[0];
//     if (file && file.type.includes('image')) {
//       setProfileImage(file);
//     }
//   };
//
//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const uploadedFiles = (event.target as HTMLInputElement).files;
//     const newFiles = Object.entries(uploadedFiles as object)
//         .map((file) => {
//           if (file[1].type.includes('image')) return file[1];
//         })
//         .filter((file) => file !== undefined);
//     setImages((prevFiles) => [...prevFiles, ...newFiles]);
//   };
//
//   const handleImageDelete = (index: number) => {
//     const updatedFiles = images.filter((_, i) => i !== index);
//     setImages(updatedFiles);
//     (imageRef.current as HTMLInputElement).value = '';
//   };
//
//   const handleAddEmail = () => {
//     if (emails.length < 3) {
//       setEmails([...emails, '']);
//     } else {
//       toast.error('حداکثر 3 ایمیل می‌توانید اضافه کنید');
//     }
//   };
//
//   const handleRemoveEmail = (index: number) => {
//     const newEmails = emails.filter((_, i) => i !== index);
//     setEmails(newEmails);
//   };
//
//   const handleEmailChange = (index: number, value: string) => {
//     const newEmails = [...emails];
//     newEmails[index] = value;
//     setEmails(newEmails);
//   };
//
//   const handleAddPhone = () => {
//     if (phones.length < 3) {
//       setPhones([...phones, '']);
//     } else {
//       toast.error('حداکثر 3 شماره تلفن می‌توانید اضافه کنید');
//     }
//   };
//
//   const handleRemovePhone = (index: number) => {
//     const newPhones = phones.filter((_, i) => i !== index);
//     setPhones(newPhones);
//   };
//
//   const handlePhoneChange = (index: number, value: string) => {
//     const newPhones = [...phones];
//     newPhones[index] = value;
//     setPhones(newPhones);
//   };
//
//   const onSubmit: SubmitHandler<PersonalInfoFormTypes> = async (data) => {
//     try {
//       setLoading(true);
//
//       // Transform province and city to IDs
//       const updateData = {
//         ...data,
//         province: data.province?.value?.id,
//         city: data.city?.value?.id,
//         emails: emails.filter(email => email.trim() !== ''),
//         phones: phones.filter(phone => phone.trim() !== ''),
//       };
//
//       console.log('Profile settings data ->', updateData);
//
//       // Handle avatar upload first if exists
//       if (profileImage) {
//         const formData = new FormData();
//         formData.append('file', profileImage);
//         await _axios.put('/user/avatar', formData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });
//       }
//
//       // Update profile data
//       const response = await _axios.put('/user/profile', updateData);
//
//       if (response.data.statusCode === 200) {
//         dispatch(setUserInfo(response.data.data));
//         toast.success(<Text tag="b">پروفایل با موفقیت بروزرسانی شد!</Text>);
//       }
//     } catch (error) {
//       console.error('Error updating user data:', error);
//
//       if (
//           error.response &&
//           error.response.status === 400 &&
//           error.response.data.statusCode === 400 &&
//           error.response.data.error?.length
//       ) {
//         toast.error(error.response.data.message);
//         error.response.data.error.forEach((err) => {
//           // Handle specific field errors if needed
//         });
//       } else {
//         toast.error('خطا در بروزرسانی پروفایل');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   return (
//       <>
//         <Form<PersonalInfoFormTypes>
//             validationSchema={personalInfoFormSchema}
//             resetValues={reset}
//             onSubmit={onSubmit}
//             useFormProps={{
//               defaultValues: {
//                 firstName: user?.firstName || '',
//                 lastName: user?.lastName || '',
//                 email: user?.email || '',
//                 emails: user?.emails || [],
//                 phones: user?.phones || user?.phoneNumbers || [],
//                 phone: user?.phone || '',
//                 username: user?.username || '',
//                 address: user?.address || '',
//                 postalCode: user?.postalCode || '',
//                 province: user?.province ? {
//                   value: user.province,
//                   name: provinces.find(p => p.id === user.province)?.name
//                 } : null,
//                 city: user?.city ? {
//                   value: user.city,
//                   name: cities.find(c => c.id === user.city)?.name
//                 } : null,
//                 individualType: user?.individualType || 'PERSON',
//                 jobPosition: user?.jobPosition || '',
//                 pelak: user?.pelak || '',
//                 nationalCode: user?.nationalCode || '',
//                 shenasCode: user?.shenasCode || '',
//                 birthDate: user?.birthDate ? new Date(user?.birthDate) : undefined,
//               },
//             }}
//         >
//           {({
//               register,
//               control,
//               formState: { errors },
//               handleSubmit,
//               resetField,
//             }) => {
//             return (
//                 <>
//                   <div className="w-full max-w-screen-2xl">
//                     <HorizontalFormBlockWrapper
//                         title={
//                           <>
//                             عکس شما <PiQuestion className="h4 w-4 text-gray-500" />
//                           </>
//                         }
//                         titleClassName="flex gap-2 items-center"
//                         description="عکس پروفایل خود را انتخاب نمایید."
//                     >
//                       <div className="col-span-2 flex flex-col items-center gap-4 @xl:flex-row">
//                         <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border shadow-md dark:bg-white">
//                           <Image
//                               src={
//                                   (user?.avatar &&
//                                       STATIC_FILE_PATH + user?.avatar) ||
//                                   noPic
//                               }
//                               className="aspect-square border object-cover shadow-md"
//                               priority
//                               alt="Profile avatar"
//                               sizes="(max-width: 768px) 100vw"
//                               fill
//                               unoptimized
//                           />
//                         </div>
//                         <Button
//                             tag="button"
//                             variant="outline"
//                             onClick={() =>
//                                 document.getElementById('profileImg')?.click()
//                             }
//                         >
//                           تغییر
//                           <input
//                               id="profileImg"
//                               hidden
//                               accept="image/*"
//                               type="file"
//                               onChange={handleProfileImageUpload}
//                           />
//                         </Button>
//                       </div>
//                     </HorizontalFormBlockWrapper>
//
//                     <HorizontalFormBlockWrapper
//                         title="نام کاربری"
//                         titleClassName="text-base font-medium"
//                     >
//                       <Input
//                           prefix={<PiUser className="h-6 w-6 text-gray-500" />}
//                           placeholder="username"
//                           {...register('username')}
//                           disabled
//                           error={errors.username?.message}
//                       />
//                     </HorizontalFormBlockWrapper>
//
//                     <HorizontalFormBlockWrapper
//                         title="نام و نام خانوادگی"
//                         titleClassName="text-base font-medium"
//                     >
//                       <Input
//                           placeholder="نام"
//                           {...register('firstName')}
//                           error={errors.firstName?.message}
//                           className="flex-grow"
//                       />
//                       <Input
//                           placeholder="نام خانوادگی"
//                           {...register('lastName')}
//                           error={errors.lastName?.message}
//                           className="flex-grow"
//                       />
//                     </HorizontalFormBlockWrapper>
//
//                     <HorizontalFormBlockWrapper
//                         title="آدرس ایمیل"
//                         titleClassName="text-base font-medium"
//                         className=""
//                     >
//                       {emails.map((email, index) => (
//                           <div
//                               key={index}
//                               className="col-span-full flex flex-col items-center gap-2 sm:flex-row"
//                           >
//                             <Input
//                                 prefix={
//                                   <PiEnvelopeSimple className="h-6 w-6 text-gray-500" />
//                                 }
//                                 id={`email-${index}`}
//                                 type="email"
//                                 placeholder="example@foodkeys.com"
//                                 value={email}
//                                 onChange={(e) =>
//                                     handleEmailChange(index, e.target.value)
//                                 }
//                                 className="w-full sm:w-1/2"
//                             />
//                             <span className="flex w-full gap-2 sm:w-1/2">
//                         {emails.length !== 0 && emails.length !== 1 && (
//                             <Button
//                                 className="h-10 w-10"
//                                 size="sm"
//                                 rounded="lg"
//                                 color="danger"
//                                 onClick={() => handleRemoveEmail(index)}
//                             >
//                               <PiXBold className="h-4 w-4" />
//                             </Button>
//                         )}
//                               <Button className="h-10 w-20" size="sm" rounded="lg">
//                           تأیید ایمیل
//                         </Button>
//
//                               {emails.length === index + 1 && emails.length < 3 && (
//                                   <Button
//                                       className="h-10 w-auto gap-2 dark:text-white"
//                                       size="sm"
//                                       rounded="lg"
//                                       color="success"
//                                       onClick={handleAddEmail}
//                                   >
//                                     <span>افزودن ایمیل</span>
//                                     <CiCirclePlus className="h-6 w-6" />
//                                   </Button>
//                               )}
//                       </span>
//                           </div>
//                       ))}
//                     </HorizontalFormBlockWrapper>
//
//                     <HorizontalFormBlockWrapper
//                         title="شماره تلفن"
//                         titleClassName="text-base font-medium"
//                     >
//                       {phones.map((phone, index) => (
//                           <div
//                               key={index}
//                               className="col-span-full flex flex-col items-center gap-2 sm:flex-row"
//                           >
//                             <Input
//                                 prefix={<PiPhone className="h-6 w-6 text-gray-500" />}
//                                 id={`phone-${index}`}
//                                 placeholder="شماره تلفن"
//                                 value={phone}
//                                 onChange={(e) =>
//                                     handlePhoneChange(index, e.target.value)
//                                 }
//                                 className="w-full sm:w-1/2"
//                             />
//                             <span className="flex w-full gap-2 sm:w-1/2">
//                         {phones.length !== 0 && phones.length !== 1 && (
//                             <Button
//                                 className="h-10 w-10"
//                                 size="sm"
//                                 rounded="lg"
//                                 color="danger"
//                                 onClick={() => handleRemovePhone(index)}
//                             >
//                               <PiXBold className="h-4 w-4" />
//                             </Button>
//                         )}
//                               <Button className="h-10 w-20" size="sm" rounded="lg">
//                           تأیید تلفن
//                         </Button>
//
//                               {phones.length === index + 1 && phones.length < 3 && (
//                                   <Button
//                                       className="h-10 w-auto gap-2 dark:text-white"
//                                       size="sm"
//                                       rounded="lg"
//                                       color="success"
//                                       onClick={handleAddPhone}
//                                   >
//                                     <span>افزودن تلفن</span>
//                                     <CiCirclePlus className="h-6 w-6" />
//                                   </Button>
//                               )}
//                       </span>
//                           </div>
//                       ))}
//                     </HorizontalFormBlockWrapper>
//
//                     <HorizontalFormBlockWrapper
//                         title="اطلاعات هویتی"
//                         titleClassName="text-base font-medium"
//                     >
//                       <Input
//                           placeholder="کد ملی"
//                           {...register('nationalCode')}
//                           error={errors.nationalCode?.message}
//                           className="flex-grow"
//                       />
//                       <Input
//                           placeholder="شماره شناسنامه"
//                           {...register('shenasCode')}
//                           error={errors.shenasCode?.message}
//                           className="flex-grow"
//                       />
//                       <Controller
//                           control={control}
//                           name="individualType"
//                           render={({ field: { value, onChange } }) => (
//                               <SelectBox
//                                   placeholder="نوع شخص"
//                                   options={individualType}
//                                   onChange={onChange}
//                                   value={value}
//                                   getOptionValue={(option) => option.value}
//                                   displayValue={(selected) =>
//                                       individualType?.find((r) => r.value === selected)
//                                           ?.name ?? 'انتخاب نشده'
//                                   }
//                                   error={errors?.individualType?.message as string}
//                               />
//                           )}
//                       />
//                       <Controller
//                           name="birthDate"
//                           control={control}
//                           render={({field: {onChange, value, onBlur}}) => (
//                               <DatePicker
//                                   selected={value}
//                                   onChange={onChange}
//                                   onBlur={onBlur}
//                                   dateFormat="yyyy/MM/dd"
//                                   maxDate={new Date()}
//                                   helperText="تاریخ تولد"
//                                   placeholderText="تاریخ تولد"
//                                   inputProps={{
//                                     variant: 'outline',
//                                     inputClassName: 'p-4 border border-gray-300 rounded-md',
//                                   }}
//                                   popperPlacement="bottom-end"
//                                   className="flex-grow"
//                               />
//                           )}
//                       />
//                     </HorizontalFormBlockWrapper>
//
//                     <HorizontalFormBlockWrapper
//                         title="آدرس"
//                         titleClassName="text-base font-medium"
//                     >
//                       <Controller
//                           name="province"
//                           control={control}
//                           render={({ field: { onChange, value } }) => (
//                               <SelectBox
//                                   options={provinces.map((province) => ({
//                                     value: province.id,
//                                     name: province.name,
//                                   }))}
//                                   value={value}
//                                   onChange={(e) => {
//                                     onChange(e);
//                                     setSelectedProvince(e);
//                                     resetField('city');
//                                   }}
//                                   placeholder="انتخاب استان"
//                                   displayValue={(selected) =>
//                                       selected?.name ?? 'انتخاب نشده'
//                                   }
//                                   error={errors?.province?.message as string}
//                               />
//                           )}
//                       />
//
//                       <Controller
//                           name="city"
//                           control={control}
//                           render={({ field: { onChange, value } }) => (
//                               <SelectBox
//                                   options={cities.map((city) => ({
//                                     value: city.id,
//                                     name: city.nameFa,
//                                   }))}
//                                   value={value}
//                                   onChange={(e) => {
//                                     onChange(e);
//                                     setSelectedCity(e);
//                                   }}
//                                   placeholder="انتخاب شهر"
//                                   displayValue={(selected) =>
//                                       selected?.name ?? 'انتخاب نشده'
//                                   }
//                                   // getOptionValue={(option) => option.id}
//                                   error={errors?.city?.message as string}
//                               />
//                           )}
//                       />
//                       <Textarea
//                           maxLength={450}
//                           placeholder="آدرس خود را وارد کنید"
//                           {...register('address')}
//                           error={errors.address?.message}
//                           className="col-span-full"
//                       />
//                       <Input
//                           placeholder="کد پستی"
//                           {...register('postalCode')}
//                           error={errors.postalCode?.message}
//                       />
//                     </HorizontalFormBlockWrapper>
//
//                     <HorizontalFormBlockWrapper
//                         title="سمت در محل کار"
//                         titleClassName="text-base font-medium col-span-full"
//                     >
//                       <Controller
//                           control={control}
//                           name="jobPosition"
//                           render={({ field: { value, onChange } }) => (
//                               <Input
//                                   placeholder="سمت شغلی خود را وارد کنید"
//                                   {...register('jobPosition')}
//                                   error={errors?.jobPosition?.message}
//                                   className="col-span-full"
//                               />
//                           )}
//                       />
//                     </HorizontalFormBlockWrapper>
//
//                     <HorizontalFormBlockWrapper
//                         title="عکس پس زمینه پروفایل"
//                         description="عکس دلخواه خود را انتخاب کنید"
//                         className="border-0 pb-0"
//                     >
//                       <div className="mb-5 @3xl:col-span-2">
//                         {images.length ? (
//                             <div
//                                 className={cn(
//                                     'mb-5 grid gap-5',
//                                     images.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
//                                 )}
//                             >
//                               {images?.map((file: File, index: number) => (
//                                   <div
//                                       key={file.name}
//                                       className={cn(
//                                           'group relative min-h-[80px] w-full overflow-hidden rounded-md first:min-h-[300px] xs:min-h-[144px] xs:first:min-h-[424px]',
//                                           images.length !== 2 && 'first:col-span-3'
//                                       )}
//                                   >
//                                     <div className="absolute left-0 top-0 z-50 h-full w-full bg-black bg-opacity-40 opacity-0 backdrop-blur-md  transition-all group-hover:opacity-100 dark:bg-opacity-20"></div>
//                                     <Image
//                                         src={URL.createObjectURL(file)}
//                                         className="aspect-[193/144] object-cover"
//                                         priority
//                                         alt="Profile avatar"
//                                         sizes="(max-width: 768px) 100vw"
//                                         fill
//                                     />
//                                     <ActionIcon
//                                         onClick={() => handleImageDelete(index)}
//                                         size="sm"
//                                         variant="flat"
//                                         color="danger"
//                                         className="invisible absolute right-5 top-5 z-50 ms-auto flex-shrink-0 bg-gray-0 p-0 opacity-0 transition-all hover:enabled:bg-white group-hover:visible group-hover:opacity-100"
//                                     >
//                                       <PiTrashBold className="w-6" />
//                                     </ActionIcon>
//                                   </div>
//                               ))}
//                             </div>
//                         ) : null}
//                         <div>
//                           <Upload
//                               label={''}
//                               ref={imageRef}
//                               multiple
//                               accept="img"
//                               iconClassName="w-28 h-auto"
//                               onChange={handleImageUpload}
//                               className="mb-5 min-h-[200px] justify-center border-dashed bg-gray-50"
//                           />
//                         </div>
//                       </div>
//                     </HorizontalFormBlockWrapper>
//                   </div>
//
//                   <div className="border-gary-300 sticky bottom-0 z-40 -mx-6 -mb-7 flex items-center justify-end gap-3 border-t bg-gray-0/10 px-10 py-5 backdrop-blur @lg:gap-4 @xl:grid @xl:auto-cols-max @xl:grid-flow-col 3xl:-mx-8 4xl:-mx-10">
//                     <Button variant="outline" className="w-full @xl:w-auto">
//                       انصراف
//                     </Button>
//                     <Button
//                         type="submit"
//                         onClick={handleSubmit(onSubmit)}
//                         isLoading={isLoading}
//                         className="w-full @xl:w-auto dark:bg-gray-100 dark:text-white"
//                     >
//                       ذخیره
//                     </Button>
//                   </div>
//                 </>
//             );
//           }}
//         </Form>
//       </>
//   );
// }
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Controller, SubmitHandler } from 'react-hook-form';
import {
  PiClock,
  PiEnvelopeSimple,
  PiPhone,
  PiQuestion,
  PiTrashBold,
  PiUser,
  PiXBold,
} from 'react-icons/pi';
import { CiCirclePlus } from 'react-icons/ci';
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
import useAxiosPrivate from '@/hooks/use-axios-private';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/store/userSlice';
import noPic from '@public/mockProfile.webp';
import dynamic from 'next/dynamic';

const SelectBox = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => (
      <div className="grid h-10 place-content-center">
        <Spinner />
      </div>
  ),
});

const individualType = [
  {
    name: 'حقیقی',
    value: 'PERSON',
  },
  {
    name: 'حقوقی',
    value: 'COMPANY',
  },
];

// form zod validation schema
const personalInfoFormSchema = z.object({
  firstName: z.string().min(1, { message: 'نام الزامی میباشد' }),
  lastName: z.string().optional(),
  email: z.string().email({ message: 'آدرس ایمیل اشتباه میباشد' }).optional(),
  phone: z
      .string()
      .min(11, { message: 'شماره تلفن باید ۱۱ رقم باشد' })
      .max(11, { message: 'شماره تلفن باید ۱۱ رقم باشد' })
      .optional(),
  username: z.string().optional(),
  address: z.string().optional(),
  postalCode: z.string().optional(),
  province: z.any().optional(),
  city: z.any().optional(),
  jobPosition: z.string().optional(),
  individualType: z.enum(['PERSON', 'COMPANY']).optional(),
  pelak: z.string().optional(),
  nationalCode: z
      .string()
      .min(10, { message: 'کد ملی باید ۱۰ رقم باشد' })
      .max(10, { message: 'کد ملی باید ۱۰ رقم باشد' })
      .optional(),
  shenasCode: z
      .string()
      .min(4, { message: 'شماره شناسنامه باید ۴ یا ۱۰ رقم باشد' })
      .max(10, { message: 'شماره شناسنامه باید ۴ یا ۱۰ رقم باشد' })
      .optional(),
  birthDate: z.date().optional(),
});

type PersonalInfoFormTypes = z.infer<typeof personalInfoFormSchema>;

export default function PersonalInfoView({ user }) {
  const dispatch = useDispatch();
  const _axios = useAxiosPrivate();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://back.agfo.ir';
  const STATIC_FILE_PATH = process.env.NEXT_PUBLIC_STATIC_FILES_URL || 'https://back.agfo.ir';
  const profileImageRef = useRef<HTMLInputElement>(null);
  const backgroundImageRef = useRef<HTMLInputElement>(null);
  const [isLoading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
  const [avatarFileId, setAvatarFileId] = useState<string | null>(null);
  const [backgroundAvatarFileId, setBackgroundAvatarFileId] = useState<string | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
      user?.avatar ? STATIC_FILE_PATH + user.avatar : null
  );
  const [backgroundImagePreview, setBackgroundImagePreview] = useState<string | null>(
      user?.backgroundAvatar ? STATIC_FILE_PATH + user.backgroundAvatar : null
  );
  const [reset, setReset] = useState({});
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(
      user?.province ? { value: user.province.id, name: user.province.name } : null
  );
  const [selectedCity, setSelectedCity] = useState(
      user?.city ? { value: user.city.id, name: user.city.nameFa } : null
  );
  const [emails, setEmails] = useState<string[]>(user?.emails || []);
  const [phones, setPhones] = useState<string[]>(user?.phoneNumbers || user?.phones || []);

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
          const response = await _axios.get(
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

  const uploadFile = async (file: File, fileServiceType: string) => {
    try {
      const formData = new FormData();
      formData.append('files', file);
      formData.append('fileServiceType', fileServiceType);

      const response = await _axios.post('/file', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.status === 'SUCCESS' && response.data.data?.length > 0) {
        return response.data.data[0];
      }

      throw new Error('File upload failed');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('خطا در آپلود فایل');
      throw error;
    }
  };

  const handleProfileImageUpload = async (
      event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && file.type.includes('image')) {
      setProfileImage(file);
      setProfileImagePreview(URL.createObjectURL(file));

      try {
        // Upload the file immediately
        const uploadedFile = await uploadFile(file, 'USER_AVATAR');
        console.log('Profile image uploaded:', uploadedFile);
        // Store the file ID for form submission
        setAvatarFileId(uploadedFile.id);
      } catch (error) {
        // Reset preview if upload fails
        setProfileImagePreview(user?.avatar ? STATIC_FILE_PATH + user.avatar : null);
        setProfileImage(null);
        setAvatarFileId(null);
      }
    }
  };

  const handleBackgroundImageUpload = async (
      event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && file.type.includes('image')) {
      setBackgroundImage(file);
      setBackgroundImagePreview(URL.createObjectURL(file));

      try {
        // Upload the file immediately
        const uploadedFile = await uploadFile(file, 'USER_BACKGROUND_AVATAR');
        console.log('Background image uploaded:', uploadedFile);
        // Store the file ID for form submission
        setBackgroundAvatarFileId(uploadedFile.id);
      } catch (error) {
        // Reset preview if upload fails
        setBackgroundImagePreview(user?.backgroundAvatar ? STATIC_FILE_PATH + user.backgroundAvatar : null);
        setBackgroundImage(null);
        setBackgroundAvatarFileId(null);
      }
    }
  };

  const handleBackgroundImageDelete = () => {
    setBackgroundImagePreview(null);
    setBackgroundImage(null);
    setBackgroundAvatarFileId(null);
    if (backgroundImageRef.current) {
      backgroundImageRef.current.value = '';
    }
  };

  const handleAddEmail = () => {
    if (emails.length < 3) {
      setEmails([...emails, '']);
    } else {
      toast.error('حداکثر 3 ایمیل می‌توانید اضافه کنید');
    }
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

  const handleAddPhone = () => {
    if (phones.length < 3) {
      setPhones([...phones, '']);
    } else {
      toast.error('حداکثر 3 شماره تلفن می‌توانید اضافه کنید');
    }
  };

  const handleRemovePhone = (index: number) => {
    const newPhones = phones.filter((_, i) => i !== index);
    setPhones(newPhones);
  };

  const handlePhoneChange = (index: number, value: string) => {
    const newPhones = [...phones];
    newPhones[index] = value;
    setPhones(newPhones);
  };

  const onSubmit: SubmitHandler<PersonalInfoFormTypes> = async (data) => {
    try {
      setLoading(true);

      // Transform province and city to IDs
      const updateData = {
        ...data,
        province: data.province?.value,
        city: data.city?.value,
        emails: emails.filter(email => email.trim() !== ''),
        phones: phones.filter(phone => phone.trim() !== ''),
        // Include file IDs if they exist
        ...(avatarFileId && { avatar: avatarFileId }),
        ...(backgroundAvatarFileId && { backgroundAvatar: backgroundAvatarFileId })
      };

      console.log('Profile settings data ->', updateData);

      // Update profile data
      const response = await _axios.put('/user/profile', updateData);

      if (response.data.statusCode === 200) {
        dispatch(setUserInfo(response.data.data));
        setAvatarFileId(null)
        setBackgroundAvatarFileId(null)
        toast.success(<Text tag="b">پروفایل با موفقیت بروزرسانی شد!</Text>);
      }
    } catch (error) {
      console.error('Error updating user data:', error);

      if (
          error.response &&
          error.response.status === 400 &&
          error.response.data.statusCode === 400 &&
          error.response.data.error?.length
      ) {
        toast.error(error.response.data.message);
        error.response.data.error.forEach((err) => {
          // Handle specific field errors if needed
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
                emails: user?.emails || [],
                phones: user?.phones || user?.phoneNumbers || [],
                phone: user?.phone || '',
                username: user?.username || '',
                address: user?.address || '',
                postalCode: user?.postalCode || '',
                province: user?.province ? {
                  value: user.province.id,
                  name: user.province.name
                } : null,
                city: user?.city ? {
                  value: user.city.id,
                  name: user.city.nameFa
                } : null,
                individualType: user?.individualType || 'PERSON',
                jobPosition: user?.jobPosition || '',
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
                              src={profileImagePreview || noPic}
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
                                profileImageRef.current?.click()
                            }
                        >
                          تغییر
                          <input
                              ref={profileImageRef}
                              id="profileImg"
                              hidden
                              accept="image/*"
                              type="file"
                              onChange={handleProfileImageUpload}
                          />
                        </Button>
                      </div>
                    </HorizontalFormBlockWrapper>

                    <HorizontalFormBlockWrapper
                        title="نام کاربری"
                        titleClassName="text-base font-medium"
                    >
                      <Input
                          prefix={<PiUser className="h-6 w-6 text-gray-500" />}
                          placeholder="username"
                          {...register('username')}
                          disabled
                          error={errors.username?.message}
                      />
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
                        {/*      <Button className="h-10 w-20" size="sm" rounded="lg">*/}
                        {/*  تأیید ایمیل*/}
                        {/*</Button>*/}

                              {emails.length === index + 1 && emails.length < 3 && (
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
                      {phones.map((phone, index) => (
                          <div
                              key={index}
                              className="col-span-full flex flex-col items-center gap-2 sm:flex-row"
                          >
                            <Input
                                prefix={<PiPhone className="h-6 w-6 text-gray-500" />}
                                id={`phone-${index}`}
                                placeholder="شماره تلفن"
                                value={phone}
                                onChange={(e) =>
                                    handlePhoneChange(index, e.target.value)
                                }
                                className="w-full sm:w-1/2"
                            />
                            <span className="flex w-full gap-2 sm:w-1/2">
                        {phones.length !== 0 && phones.length !== 1 && (
                            <Button
                                className="h-10 w-10"
                                size="sm"
                                rounded="lg"
                                color="danger"
                                onClick={() => handleRemovePhone(index)}
                            >
                              <PiXBold className="h-4 w-4" />
                            </Button>
                        )}
                        {/*      <Button className="h-10 w-20" size="sm" rounded="lg">*/}
                        {/*  تأیید تلفن*/}
                        {/*</Button>*/}

                              {phones.length === index + 1 && phones.length < 3 && (
                                  <Button
                                      className="h-10 w-auto gap-2 dark:text-white"
                                      size="sm"
                                      rounded="lg"
                                      color="success"
                                      onClick={handleAddPhone}
                                  >
                                    <span>افزودن تلفن</span>
                                    <CiCirclePlus className="h-6 w-6" />
                                  </Button>
                              )}
                      </span>
                          </div>
                      ))}
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
                      <Controller
                          name="birthDate"
                          control={control}
                          render={({field: {onChange, value, onBlur}}) => (
                              <DatePicker
                                  selected={value}
                                  onChange={onChange}
                                  onBlur={onBlur}
                                  dateFormat="yyyy/MM/dd"
                                  maxDate={new Date()}
                                  helperText="تاریخ تولد"
                                  placeholderText="تاریخ تولد"
                                  inputProps={{
                                    variant: 'outline',
                                    inputClassName: 'p-4 border border-gray-300 rounded-md',
                                  }}
                                  popperPlacement="bottom-end"
                                  className="flex-grow"
                              />
                          )}
                      />
                    </HorizontalFormBlockWrapper>

                    <HorizontalFormBlockWrapper
                        title="آدرس"
                        titleClassName="text-base font-medium"
                    >
                      <Controller
                          name="province"
                          control={control}
                          render={({ field: { onChange, value } }) => (
                              <SelectBox
                                  options={provinces.map((province) => ({
                                    value: province.id,
                                    name: province.name,
                                  }))}
                                  value={value}
                                  onChange={(e) => {
                                    onChange(e);
                                    setSelectedProvince(e);
                                    resetField('city');
                                  }}
                                  placeholder="انتخاب استان"
                                  displayValue={(selected) =>
                                      selected?.name ?? 'انتخاب نشده'
                                  }
                                  error={errors?.province?.message as string}
                              />
                          )}
                      />

                      <Controller
                          name="city"
                          control={control}
                          render={({ field: { onChange, value } }) => (
                              <SelectBox
                                  options={cities.map((city) => ({
                                    value: city.id,
                                    name: city.nameFa,
                                  }))}
                                  value={value}
                                  onChange={(e) => {
                                    onChange(e);
                                    setSelectedCity(e);
                                  }}
                                  placeholder="انتخاب شهر"
                                  displayValue={(selected) =>
                                      selected?.name ?? 'انتخاب نشده'
                                  }
                                  error={errors?.city?.message as string}
                              />
                          )}
                      />
                      <Textarea
                          maxLength={450}
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

                    <HorizontalFormBlockWrapper
                        title="سمت در محل کار"
                        titleClassName="text-base font-medium col-span-full"
                    >
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

                    <HorizontalFormBlockWrapper
                        title="عکس پس زمینه پروفایل"
                        description="عکس دلخواه خود را انتخاب کنید"
                        className="border-0 pb-0"
                    >
                      <div className="mb-5 @3xl:col-span-2">
                        {backgroundImagePreview ? (
                            <div className="mb-5 grid gap-5">
                              <div className="group relative min-h-[300px] w-full overflow-hidden rounded-md">
                                <div className="absolute left-0 top-0 z-50 h-full w-full bg-black bg-opacity-40 opacity-0 backdrop-blur-md transition-all group-hover:opacity-100 dark:bg-opacity-20"></div>
                                <Image
                                    src={backgroundImagePreview}
                                    className="aspect-[193/144] object-cover"
                                    priority
                                    alt="Background image"
                                    sizes="(max-width: 768px) 100vw"
                                    fill
                                    unoptimized
                                />
                                <ActionIcon
                                    onClick={handleBackgroundImageDelete}
                                    size="sm"
                                    variant="flat"
                                    color="danger"
                                    className="invisible absolute right-5 top-5 z-50 ms-auto flex-shrink-0 bg-gray-0 p-0 opacity-0 transition-all hover:enabled:bg-white group-hover:visible group-hover:opacity-100"
                                >
                                  <PiTrashBold className="w-6" />
                                </ActionIcon>
                              </div>
                            </div>
                        ) : (
                            <div>
                              <Upload
                                  label={''}
                                  ref={backgroundImageRef}
                                  multiple={false}
                                  accept="img"
                                  iconClassName="w-28 h-auto"
                                  onChange={handleBackgroundImageUpload}
                                  className="mb-5 min-h-[200px] justify-center border-dashed bg-gray-50"
                              />
                            </div>
                        )}
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