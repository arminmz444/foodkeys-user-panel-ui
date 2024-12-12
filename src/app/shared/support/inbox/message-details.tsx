'use client';

import { useAtomValue } from 'jotai';
import { z } from 'zod';
import { LuReply } from 'react-icons/lu';
import { useState, useEffect } from 'react';
import { PiCaretDownBold, PiPaperclipLight, PiXCircle } from 'react-icons/pi';
import { Text } from '@/components/ui/text';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  dataAtom,
  messageIdAtom,
} from '@/app/shared/support/inbox/message-list';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Empty } from '@/components/ui/empty';
import ActionDropdown from '@/app/shared/support/inbox/action-dropdown';
import Select from '@/components/ui/select';
import MessageBody from '@/app/shared/support/inbox/message-body';
import cn from '@/utils/class-names';
import SimpleBar from '@/components/ui/simplebar';
import { useElementSize } from '@/hooks/use-element-size';
import { useMedia } from '@/hooks/use-media';
import dynamic from 'next/dynamic';
import { SupportType, supportTypes } from '@/data/support-inbox';
import Spinner from '@/components/ui/spinner';
import { toast } from 'react-hot-toast';
import useAxiosPrivate from '@/hooks/use-axios-private';
import ticketSelectionImg from '@public/ticketSelection.jpg';
import Image from 'next/image';
import { isUUID } from '@/utils/is-uuid';
const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
});

const FormSchema = z.object({
  message: z.string({ required_error: 'پیام نمی‌تواند خالی باشد' }),
});

type FormValues = {
  message: string;
};

const MAX_ATTACHMENTS = 3;
const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB

const priorityOptions = [
  {
    value: 'Low',
    name: 'Low',
    label: (
      <div className="flex items-center gap-2 text-xs sm:text-sm">
        <Badge renderAsDot color="success" />
        <span>کم</span>
      </div>
    ),
  },
  {
    value: 'Medium',
    name: 'Medium',
    label: (
      <div className="flex items-center gap-2 text-xs sm:text-sm">
        <Badge renderAsDot color="warning" />
        <span>متوسط</span>
      </div>
    ),
  },
  {
    value: 'High',
    name: 'High',
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
    value: 1,
    name: '',
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
  {
    value: 2,
    name: '',
    label: (
      <div className="flex items-center gap-2">
        <Avatar
          src="https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-11.webp"
          name="John Doe"
          className="!h-6 !w-6 rounded-full"
        />
        <span className="whitespace-nowrap text-xs sm:text-sm">زهرا</span>
      </div>
    ),
  },
  {
    value: 3,
    name: '',
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
    value: 4,
    name: '',
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
    value: 'جدید',
    name: 'عمومی',
  },
  {
    value: 'منتظر مخاطب',
    name: 'فنی',
  },
  {
    value: 'منتظر ما',
    name: 'مالی',
  },
  {
    value: 'بسته شده',
    name: 'بسته شده',
  },
];

const supportOptionTypes = [
  {
    value: supportTypes.Chat.value,
    name: supportTypes.Chat.name,
  },
  {
    value: supportTypes.Email.value,
    name: supportTypes.Email.name,
  },
];

export default function MessageDetails({ className }: { className?: string }) {
  const data = useAtomValue(dataAtom);
  const [agent, setAgent] = useState();
  const [priority, setPriority] = useState('');
  const messageId = useAtomValue(messageIdAtom);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [sendBtnLoading, setSendBtnLoading] = useState(false);
  const [changed, setChanged] = useState<boolean>(false);
  const _axios = useAxiosPrivate();
  const [showMessages, setShowMessages] = useState(false);
  const [supportType, setSupportType] = useState<SupportType | string>(
    supportTypes.Chat.value
  );
  const [contactStatus, setContactStatus] = useState(contactStatuses[0].value);
  const [ref, { width }] = useElementSize();
  const isWide = useMedia('(min-width: 1280px) and (max-width: 1440px)', false);

  useEffect(() => {
    const fetchTicketMessages = async () => {
      if (!messageId) return;
      try {
        const response = await _axios.get(`/ticket/${messageId}/messages`);
        if (response.data.status === 'SUCCESS') {
          setMessages(response.data.data);
          setShowMessages(true);
          // setTotalItems(response.data.pagination.totalElements);
        }
      } catch (error) {
        setShowMessages(false);
        console.error('Error fetching ticket data:', error);
        toast.error('خطا در دریافت تیکت‌ها');
      }
      return () => setShowMessages(false);
    };
    if (isUUID(messageId)) fetchTicketMessages();
  }, [messageId, changed]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      const totalFiles = [...attachments, ...newFiles];
      if (totalFiles.length > MAX_ATTACHMENTS) {
        toast.error('شما فقط مجاز به ارسال ۳ فایل هستید!');
        return;
      }
      for (const file of newFiles) {
        if (file.size > MAX_FILE_SIZE) {
          toast.error(`${file.name} دارای حجمی بیشتر از ۸ مگابایت است.`);
          return;
        }
      }
      setAttachments(totalFiles);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  function formWidth() {
    if (isWide) return width - 64;
    return width - 44;
  }

  // const message = data.find((m) => m.id === messageId) ?? data[0];
  // const initials = `${message?.firstName.charAt(0)}${message?.lastName.charAt(
  //   0
  // )}`;

  // set default selected message when render complete
  useEffect(() => {
    // setFormWidth(width);
    console.log('data = ' + JSON.stringify(data));
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // 500 milliseconds
    return () => clearTimeout(timer);
  }, []);

  // set active message id
  // useEffect(() => {
  //     setSupportType(message?.supportType);
  // }, [message]);

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    console.log(formData);
    setSendBtnLoading(true);
    try {
      const formDataPayload = new FormData();
      formDataPayload.append('messageContent', formData.message);
      attachments.forEach((file, index) => {
        formDataPayload.append(`attachments`, file);
      });

      const response = await _axios.post(
        `/ticket/${messageId}/messages`,
        formDataPayload
      );

      if (response.data.status === 'SUCCESS') {
        toast.success('پیام با موفقیت ارسال شد');
        setAttachments([]);
        setChanged(!changed);
      } else {
        throw new Error('Failed to send message: ', response?.data?.message);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('خطا در ارسال پیام');
    } finally {
      setSendBtnLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div
        className={cn(
          '!grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center',
          className
        )}
      >
        <Spinner size="xl" />
      </div>
    );
  }

  if (!messages) {
    return (
      <div
        className={cn(
          '!grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center',
          className
        )}
      >
        <Empty
          text="No conversations selected"
          textClassName="mt-4 text-base text-gray-500"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative pt-6 lg:rounded-lg lg:border lg:border-gray-200 lg:px-4 lg:py-7 xl:px-5 xl:py-5 2xl:pb-7 2xl:pt-6',
        className
      )}
    >
      <div>
        <header className="flex flex-col justify-between gap-4 border-b border-gray-200 pb-5 3xl:flex-row 3xl:items-center">
          <div className="flex flex-col items-start justify-between gap-3 xs:flex-row xs:items-center xs:gap-6 lg:justify-normal">
            {data?.subject ? (
              <Text tag="h4" className="font-semibold">
                {/*@ts-ignore*/}
                {data?.subject}
              </Text>
            ) : (
              <Input
                placeholder="موضوع *"
                inputClassName="border-2"
                className="col-span-full"
                size="lg"
                // value="مشکل نرم افزار"
              />
            )}
            {/* <Badge variant="outline" color="danger" size="sm">
                            مشکل نرم افزار
                        </Badge> */}
          </div>

          <div className="jus flex flex-wrap items-center gap-2.5 sm:justify-end">
            <Select
              value={agent}
              variant="text"
              options={agents}
              onChange={setAgent}
              placeholder="دپارتمان"
              placement="bottom-end"
              useContainerWidth={false}
              dropdownClassName="w-60 p-2 gap-1 grid"
              suffix={<PiCaretDownBold className="h-3 w-3" />}
            />
            <Select
              variant="text"
              value={contactStatus}
              options={contactStatuses}
              onChange={setContactStatus}
              placeholder="انتخاب وضعیت"
              placement="bottom-end"
              useContainerWidth={false}
              selectClassName="text-xs sm:text-sm"
              optionClassName="text-xs sm:text-sm"
              dropdownClassName="w-48 p-2 gap-1 grid"
              suffix={<PiCaretDownBold className="h-3 w-3" />}
            />
            <Select
              // size="sm"
              variant="text"
              value={priority}
              onChange={setPriority}
              options={priorityOptions}
              placeholder="تعریف اولویت"
              placement="bottom-end"
              useContainerWidth={false}
              dropdownClassName="w-32 p-2 gap-1 grid"
              suffix={<PiCaretDownBold className="h-3 w-3" />}
            />
            <Button
              variant="outline"
              color="secondary"
              type="submit"
              size="sm"
              className="col-span-2 ms-3"
            >
              شروع مکالمه با پشتیبان
            </Button>
          </div>
        </header>
        {showMessages ? (
          <>
            <div className="[&_.simplebar-content]:grid [&_.simplebar-content]:gap-8 [&_.simplebar-content]:py-5">
              <SimpleBar className="@3xl:max-h-[calc(100dvh-29rem)] @4xl:max-h-[calc(100dvh-27rem)] @7xl:max-h-[calc(100dvh-26rem)]">
                {/* <SimpleBar className="@3xl:max-h-[calc(100dvh-34rem)] @4xl:max-h-[calc(100dvh-32rem)] @7xl:max-h-[calc(100dvh-31rem)]"> */}
                <MessageBody messages={messages} />
              </SimpleBar>
            </div>

            <div
              ref={ref}
              className="grid grid-cols-[32px_1fr] items-start gap-3 rounded-b-lg bg-white @3xl:pt-4 dark:bg-transparent lg:gap-4 lg:pl-0 dark:lg:pt-0 xl:grid-cols-[48px_1fr]"
            >
              <figure className="dark:mt-4">
                <Avatar
                  name="صادق"
                  // initials={initials}
                  src="https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-14.webp"
                  className="!h-8 !w-8 bg-[#70C5E0] font-medium text-white xl:!h-12 xl:!w-12"
                />
              </figure>
              <div
                className="relative rounded-lg border border-gray-200 bg-gray-50 p-4 2xl:p-5"
                style={{
                  maxWidth: formWidth(),
                }}
              >
                <Form<FormValues>
                  onSubmit={onSubmit}
                  validationSchema={FormSchema}
                >
                  {({ control, watch, formState: { errors } }) => {
                    return (
                      <>
                        <div className="relative mb-2.5 flex items-center justify-between">
                          <Select
                            size="sm"
                            variant="outline"
                            value={supportType}
                            options={supportOptionTypes}
                            onChange={setSupportType}
                            getOptionValue={(option) => option.value}
                            displayValue={(selected: string) => {
                              return supportTypes[selected].name;
                            }}
                            suffix={
                              <PiCaretDownBold className="ml-1 h-3 w-3" />
                            }
                            placement="bottom-start"
                            useContainerWidth={false}
                            dropdownClassName="p-2 gap-1 grid w-20"
                            selectClassName="bg-gray-0 dark:bg-gray-50"
                            placeholder="پبام"
                          />
                          {/* <Button
                        isLoading={sendBtnLoading}
                        type="submit"
                        className="dark:bg-gray-200 dark:text-white"
                      >
                        ارسال
                      </Button> */}
                        </div>
                        {supportType === supportTypes.Email.value && (
                          <div className="mb-2.5 flex items-center gap-2">
                            <LuReply />
                            <span className="rounded border border-gray-200 px-1.5 py-1 lowercase">
                              {/*@ts-ignore*/}
                              {messages?.email}
                            </span>
                          </div>
                        )}

                        <Controller
                          control={control}
                          name="message"
                          render={({ field: { onChange, value } }) => (
                            <QuillEditor
                              value={value}
                              onChange={onChange}
                              className="rounded-md bg-gray-0 dark:bg-gray-50 [&>.ql-container_.ql-editor]:min-h-[100px] [&>.ql-toolbar]:3xl:overflow-x-auto"
                            />
                          )}
                        />
                        <div className="mt-4">
                          <input
                            type="file"
                            multiple
                            accept=".png,.jpg,.jpeg,.pdf,.docx,.xlsx,.txt,.zip,.rar"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="attachment-upload"
                          />
                          <label
                            htmlFor="attachment-upload"
                            className="cursor-pointer"
                          >
                            <PiPaperclipLight className="h-6 w-6 text-gray-600" />
                            افزودن فایل
                          </label>
                        </div>
                        <div>
                          <Button
                            isLoading={sendBtnLoading}
                            type="submit"
                            className="mt-6 dark:bg-gray-200 dark:text-white"
                          >
                            ارسال
                          </Button>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-2">
                          {attachments.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 rounded border border-gray-200 p-2"
                            >
                              <span>{file.name}</span>
                              <button
                                type="button"
                                onClick={() => removeAttachment(index)}
                                className="text-red-500"
                              >
                                <PiXCircle className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </>
                    );
                  }}
                </Form>
              </div>
            </div>
          </>
        ) : (
          <div className="h-100 mt-2 flex flex-col items-center justify-center">
            <Image
              src={ticketSelectionImg}
              alt="ticket selection image"
              className="mb-4 h-64 w-auto"
            />
            <p className="text-center text-lg">
              لطفا یکی از تیکت‌های باز خود را برای نمایش انتخاب کنید
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function DotSeparator({ ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="4"
      height="4"
      viewBox="0 0 4 4"
      fill="none"
      {...props}
    >
      <circle cx="2" cy="2" r="2" fill="#D9D9D9" />
    </svg>
  );
}
