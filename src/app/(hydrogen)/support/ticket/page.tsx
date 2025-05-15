'use client';

import { routes } from '@/config/routes';
import { Button } from '@/components/ui/button';
import PageHeader from '@/app/shared/page-header';
import { TabList } from '@/app/shared/support/inbox/inbox-tabs';
import SupportInbox from '@/app/shared/support/inbox';
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { Input } from '@/components/ui/input';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import QuillLoader from '@/components/loader/quill-loader';
import { PiCaretDownBold, PiPaperclipLight, PiPlusBold } from 'react-icons/pi';
import { ActionIcon } from '@/components/ui/action-icon';
import TrashIcon from '@/components/icons/trash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import LogoUpload from '@/components/ui/logo-upload';
import JalaliDatePicker from '@/components/ui/react-shamsi-date-picker';
import { DatePicker } from '@/components/ui/datepicker';
import useAxiosPrivate from '@/hooks/use-axios-private';
import toast from 'react-hot-toast';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { FaHeading, FaPlus, FaXmark } from 'react-icons/fa6';
import { Avatar, Badge, Checkbox, FileInput, Modal, Text } from 'rizzui';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { any, shape } from 'prop-types';
import QuillEditor from '@/components/ui/quill-editor';
import { MdAttachFile } from 'react-icons/md';

const priorityOptions = [
  {
    value: 'LOW',
    name: 'کم',
    label: (
      <div className="flex items-center gap-2 text-xs sm:text-sm">
        <Badge renderAsDot color="success" />
        <span>کم</span>
      </div>
    ),
  },
  {
    value: 'MEDIUM',
    name: 'متوسط',
    label: (
      <div className="flex items-center gap-2 text-xs sm:text-sm">
        <Badge renderAsDot color="warning" />
        <span>متوسط</span>
      </div>
    ),
  },
  {
    value: 'HIGH',
    name: 'بالا',
    label: (
      <div className="flex items-center gap-2 text-xs sm:text-sm">
        <Badge renderAsDot color="danger" />
        <span>بالا</span>
      </div>
    ),
  },
];

const agents = [
  {
    value: 'MANAGEMENT',
    name: 'مدیریت',
    label: (
      <div className="flex items-center gap-2">
        <Avatar
          src="https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-10.webp"
          name="John Doe"
          className="!h-6 !w-6 rounded-full"
        />
        <span className="whitespace-nowrap text-xs sm:text-sm">مدیریت</span>
      </div>
    ),
  },
  // {
  //   value: 2,
  //   name: '',
  //   label: (
  //     <div className="flex items-center gap-2">
  //       <Avatar
  //         src="https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-11.webp"
  //         name="John Doe"
  //         className="!h-6 !w-6 rounded-full"
  //       />
  //       <span className="whitespace-nowrap text-xs sm:text-sm">زهرا</span>
  //     </div>
  //   ),
  // },
  {
    value: 'SUPPORT',
    name: 'پشتیبانی فنی',
    label: (
      <div className="flex items-center gap-2">
        <Avatar
          src="https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-13.webp"
          name="John Doe"
          className="!h-6 !w-6 rounded-full"
        />
        <span className="whitespace-nowrap text-xs sm:text-sm">
          پشتیبانی فنی
        </span>
      </div>
    ),
  },
  {
    value: 'FINANCE',
    name: 'مالی',
    label: (
      <div className="flex items-center gap-2">
        <Avatar
          src="https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-04.webp"
          name="John Doe"
          className="!h-6 !w-6 rounded-full"
        />
        <span className="whitespace-nowrap text-xs sm:text-sm">مالی</span>
      </div>
    ),
  },
];

const contactStatuses = [
  {
    value: 'GENERAL',
    name: 'عمومی',
  },
  {
    value: 'TECHNICAL',
    name: 'فنی',
  },
  {
    value: 'FINANCIAL',
    name: 'مالی و اعتباری',
  },
];

const categoryOptions = [
  {
    value: 'GENERAL',
    name: 'عمومی',
  },
  {
    value: 'TECHNICAL',
    name: 'فنی',
  },
  {
    value: 'FINANCIAL',
    name: 'مالی و اعتباری',
  },
];
const departmentOptions = [
  {
    value: 'MANAGEMENT',
    name: 'مدیریت',
  },
  {
    value: 'SUPPORT',
    name: 'پشتیبانی',
  },
  {
    value: 'FINANCE',
    name: 'مالی',
  },
];
// const priorityOptions = [
//   {
//     value: 'LOW',
//     name: 'پایین',
//   },
//   {
//     value: 'MEDIUM',
//     name: 'متوسط',
//   },
//   {
//     value: 'HIGH',
//     name: 'بالا',
//   },
//   {
//     value: 'URGENT',
//     name: 'اضطراری',
//   },
// ];

const categorySchema = z.object({
  name: z
    .string({ required_error: 'دسته‌بندی الزامی است' })
    .min(1, 'دسته‌بندی الزامی است'),
  value: z
    .string({ required_error: 'دسته‌بندی الزامی است' })
    .min(1, 'دسته‌بندی الزامی است'),
});
const prioritySchema = z.object({
  name: z.string(),
  value: z.string(),
  label: z.any(),
});
const departmentSchema = z.object({
  name: z
    .string({ required_error: 'دپارتمان الزامی است' })
    .min(1, 'دپارتمان الزامی است'),
  value: z
    .string({ required_error: 'دپارتمان الزامی است' })
    .min(1, 'دپارتمان الزامی است'),
  label: z.any(),
});

const ticketSchema = z.object({
  category: categorySchema.required({ name: true, value: true }),
  priority: prioritySchema,
  subject: z.string().min(1, 'موضوع تیکت الزامی است'),
  message: z.string().min(1, 'متن تیکت الزامی است'),
  department: departmentSchema.required({ name: true, value: true }),
});

const Select = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => <SelectLoader />,
});

const pageHeader = {
  title: 'تیکت‌های پشتیبانی',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'خانه',
    },
    {
      href: routes.support.dashboard,
      name: 'پشتیبانی',
    },
    {
      name: 'تیکت‌های پشتیبانی',
    },
  ],
};

export default function SupportInboxPage() {
  const [attachments, setAttachments] = useState<File[]>([]);
  const _axios = useAxiosPrivate();
  const [refetchTickets, setRefetchTickets] = useState(0);
  const [modalState, setModalState] = useState({
    isOpen: false,
    size: 'lg',
  });

  const methods = useForm({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      category: {},
      priority: {},
      subject: '',
      message: '',
      department: {},
    },
  });
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      const totalFiles = [...attachments, ...newFiles];
      if (totalFiles.length > 3) {
        toast.error('شما فقط مجاز به ارسال ۳ فایل هستید!');
        return;
      }
      for (const file of newFiles) {
        if (file.size > 8 * 1024 * 1024) {
          toast.error(`${file.name} دارای حجمی بیشتر از ۸ مگابایت است.`);
          return;
        }
      }
      setAttachments(totalFiles);
    }
  };

  // useEffect(() => {
  //   setRefetchTickets(false);
  // }, []);

  const onSubmit = async (data: any) => {
    try {
      let payload = {
        category: data.category.value,
        department: data.department.value,
        priority: data.priority.value,
        message: data.message,
        subject: data.subject,
      };
      const response = await _axios.post('/ticket', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.status === 'SUCCESS') {
        toast.success('تیکت با موفقیت ایجاد شد');
        setModalState({ ...modalState, isOpen: false });
        setRefetchTickets(refetchTickets + 1);
        methods.reset();
      } else {
        toast.error('خطا در ارسال تیکت');
      }
    } catch (error) {
      toast.error('خطا در ارتباط با سرور');
    }
  };
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Button
          variant="solid"
          color="success"
          // size="lg"
          onClick={() =>
            setModalState((prevState) => ({
              ...prevState,
              isOpen: true,
              size: 'lg',
            }))
          }
          className="mt-4 w-full gap-2 @lg:mt-0 @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
        >
          تیکت جدید
          <FaPlus size={15} />
        </Button>
        {/* <Button
          onClick={() =>
            setModalState((prevState) => ({
              ...prevState,
              isOpen: true,
              size: 'lg',
            }))
          }
          className="mt-4 w-full @lg:mt-0 @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
        >
          <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
          ثبت تیکت جدید
        </Button> */}
      </PageHeader>

      <TabList />

      <SupportInbox refetchTickets={refetchTickets} />
      <Modal
        isOpen={modalState.isOpen}
        size={modalState.size}
        onClose={() =>
          setModalState((prevState) => ({ ...prevState, isOpen: false }))
        }
      >
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="p-6">
            <div className="m-auto px-7 pb-8 pt-6">
              <div className="mb-7 flex items-center justify-between">
                <Text tag="h3">ثبت تیکت جدید</Text>
                <ActionIcon
                  size="sm"
                  variant="text"
                  onClick={() =>
                    setModalState((prevState) => ({
                      ...prevState,
                      isOpen: false,
                    }))
                  }
                >
                  <FaXmark className="h-auto w-6" strokeWidth={1.8} />
                </ActionIcon>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-6 [&_label>span]:font-medium">
                <div className="col-span-full">
                  {/* <label htmlFor="subject">موضوع *</label> */}
                  <Input
                    label="موضوع *"
                    {...methods.register('subject')}
                    variant="outline"
                    labelClassName="text-black font-extrabold"
                    placeholder="موضوع تیکت خود را وارد کنید"
                    inputClassName=""
                    size="DEFAULT"
                    multiple
                    min={2}
                    className="col-span-full mt-2 "
                    prefix={<FaHeading />}
                  />
                  {methods.formState.errors.subject && (
                    <Text className="text-sm text-red-light">
                      {methods.formState.errors.subject.message}
                    </Text>
                  )}
                </div>
                <Controller
                  name="category"
                  control={methods.control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      variant="outline"
                      // value={contactStatus}
                      // options={contactStatuses}
                      options={contactStatuses.map((subcategory) => ({
                        value: subcategory.value,
                        name: subcategory.name,
                      }))}
                      onChange={onChange}
                      value={value}
                      error={
                        methods.formState.errors?.category?.name
                          ?.message as string
                      }
                      // onChange={setContactStatus}
                      placeholder="انتخاب دسته‌بندی"
                      placement="bottom-end"
                      // useContainerWidth={false}
                      className="col-span-full sm:col-span-1"
                      selectClassName="text-xs sm:text-sm"
                      optionClassName="text-xs sm:text-sm"
                      // dropdownClassName="w-48 p-2 gap-1 grid"
                      suffix={<PiCaretDownBold className="h-3 w-3" />}
                    />
                  )}
                />
                {/* {methods.formState.errors.category?.name && (
                    <Text className="text-sm text-red-light">
                      {methods.formState.errors.category?.name?.message}
                    </Text>
                  )} */}
                {/* <div className="mb-4 xs:col-span-full sm:col-span-full md:col-span-full lg:col-span-full xl:col-span-full"> */}
                <Controller
                  name="department"
                  control={methods.control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      className="col-span-full sm:col-span-1"
                      {...methods.register('department')}
                      // value={agent}
                      variant="outline"
                      options={agents}
                      // onChange={setAgent}

                      placeholder="انتخاب دپارتمان"
                      placement="bottom-end"
                      // options={agents.map((department) => ({
                      //   value: department.value,
                      //   name: department.name,
                      // }))}
                      onChange={onChange}
                      value={value}
                      error={
                        methods.formState.errors?.department?.name
                          ?.message as string
                      }
                      // useContainerWidth={false}
                      // dropdownClassName="w-60 p-2 gap-1 grid"
                      suffix={<PiCaretDownBold className="h-3 w-3" />}
                    />
                  )}
                />
                {/* {methods.formState.errors.department && (
                    <Text className="text-sm text-red-light">
                      {methods.formState.errors.department.message}
                    </Text>
                  )} */}
                {/* </div> */}

                {/* <div className="mb-4"> */}
                <Controller
                  name="priority"
                  control={methods.control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      // size="sm"
                      variant="outline"
                      // value={priority}
                      // onChange={setPriority}
                      options={priorityOptions}
                      // options={priorityOptions.map((priority) => ({
                      //   value: priority.value,
                      //   name: priority.name,
                      // }))}
                      onChange={onChange}
                      value={value}
                      // error={
                      //   methods.formState.errors?.priority?.name
                      //     ?.message as string
                      // }
                      selectClassName="text-xs sm:text-sm"
                      optionClassName="text-xs sm:text-sm"
                      placeholder="تعریف اولویت"
                      placement="bottom-end"
                      className="col-span-full sm:col-span-1"
                      useContainerWidth={false}
                      dropdownClassName="w-30 p-2 gap-1 grid"
                      suffix={<PiCaretDownBold className="h-3 w-3" />}
                    />
                  )}
                />
                {/* {methods.formState.errors.priority && (
                  <Text className="text-sm text-red-light">
                    {methods.formState.errors.priority?.name?.message}
                  </Text>
                )} */}
                {/* </div> */}
                {/* <div className="mb-4"> */}
                <div className="col-span-full mb-4">
                  <Controller
                    name="message"
                    control={methods.control}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <>
                        <QuillEditor
                          label="متن تیکت *"
                          labelClassName="text-black"
                          value={value}
                          onChange={onChange}
                          className="rounded-md bg-gray-0 dark:bg-gray-50 [&>.ql-container_.ql-editor]:min-h-[100px] [&>.ql-toolbar]:3xl:overflow-x-auto"
                        />
                        {error && (
                          <Text className="mt-1 text-sm text-red-light">
                            {error.message}
                          </Text>
                        )}
                      </>
                    )}
                  />
                </div>
                <div className="col-span-full flex w-full flex-col items-start justify-center gap-1">
                  <Button
                    variant="solid"
                    size="DEFAULT"
                    className="gap-2"
                    onClick={() =>
                      document.getElementById('attachment-upload')?.click()
                    }
                  >
                    انتخاب فایل
                    <MdAttachFile className="h-4 w-4" />
                  </Button>
                  <input
                    type="file"
                    multiple
                    accept=".png,.jpg,.jpeg,.pdf,.docx,.xlsx,.txt,.zip,.rar"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="attachment-upload"
                  />
                  {attachments.length > 0 && (
                    <span className="gap-2">
                      نام فایل: {attachments.map((file) => file.name)}
                    </span>
                  )}
                </div>
                {/* {methods.formState.errors.message && (
                    <Text className="text-sm text-red-light">
                      {methods.formState.errors.message.message}
                    </Text>
                  )} */}
                {/* </div> */}

                {/* <div className="col-span-full"></div> */}
                <Button
                  variant="solid"
                  type="submit"
                  size="lg"
                  color="success"
                  className="col-span-2"
                >
                  ثبت تیکت جدید
                </Button>
              </div>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
}
