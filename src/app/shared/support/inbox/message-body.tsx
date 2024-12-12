'use client';

import Image from 'next/image';
// @ts-ignore
import {
  JSXElementConstructor,
  Key,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from 'react';
import isEmpty from 'lodash/isEmpty';
import { useAtomValue } from 'jotai';
import { FiExternalLink } from 'react-icons/fi';
import { HiOutlineClipboardDocument } from 'react-icons/hi2';
import { PiEye, PiDownloadSimpleBold, PiCheck } from 'react-icons/pi';
import { Avatar } from '@/components/ui/avatar';
import { Tooltip } from '@/components/ui/tooltip';
import { Text } from '@/components/ui/text';
import { getRelativeTime } from '@/utils/get-relative-time';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import {
  dataAtom,
  messageIdAtom,
} from '@/app/shared/support/inbox/message-list';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { DotSeparator } from '@/app/shared/support/inbox/message-details';
import pdfIcon from '@public/pdf-icon.svg';
import imageIcon from '@public/image-icon.svg';
import useAxiosPrivate from '@/hooks/use-axios-private';
import toast from 'react-hot-toast';
import DOMPurify from 'dompurify';
import PhotoPreview from './photo-preview';

const p1 = `'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.`;
const p2 = `'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به `;
const p3 = `'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با `;
const p4 = `'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.`;
const p5 = `'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.`;
const p6 = `'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و `;
const p7 = `'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.`;

// @ts-ignore
export default function MessageBody({ messages }) {
  const STATIC_FILES_URL = 'http://localhost:8080';
  const _axios = useAxiosPrivate();
  // const data = useAtomValue(dataAtom);
  const messageId = useAtomValue(messageIdAtom);
  // const [messages, setMessages] = useState([])
  const [isCopied, setIsCopied] = useState(false);
  const [state, copyToClipboard] = useCopyToClipboard();

  // const message = data.find((m) => m.id === messageId);
  // const initials = `${message?.firstName.charAt(0)}${message?.lastName.charAt(
  //   0
  // )}`;

  const handleCopyToClipboard = (id: string) => {
    copyToClipboard(id as string);
    if (!state.error && state.value) {
      setIsCopied(() => true);
      setTimeout(() => {
        setIsCopied(false);
      }, 3000); // 3 seconds
    }
  };

  return messages && messages.length > 0 ? (
    messages.map(
      (message: {
        fromEmployee: any;
        id:
          | boolean
          | ReactElement<any, string | JSXElementConstructor<any>>
          | Iterable<ReactNode>
          | PromiseLikeOfReactNode
          | Key
          | null
          | undefined;
        senderAvatar: string;
        senderName:
          | string
          | number
          | boolean
          | ReactElement<any, string | JSXElementConstructor<any>>
          | Iterable<ReactNode>
          | ReactPortal
          | PromiseLikeOfReactNode
          | null
          | undefined;
        senderUsername:
          | string
          | number
          | boolean
          | ReactElement<any, string | JSXElementConstructor<any>>
          | Iterable<ReactNode>
          | ReactPortal
          | PromiseLikeOfReactNode
          | null
          | undefined;
        createdAtStr:
          | string
          | number
          | boolean
          | ReactElement<any, string | JSXElementConstructor<any>>
          | Iterable<ReactNode>
          | ReactPortal
          | PromiseLikeOfReactNode
          | null
          | undefined;
        messageContent:
          | string
          | number
          | boolean
          | ReactElement<any, string | JSXElementConstructor<any>>
          | Iterable<ReactNode>
          | ReactPortal
          | PromiseLikeOfReactNode
          | null
          | undefined;
        ticketId:
          | string
          | number
          | boolean
          | ReactElement<any, string | JSXElementConstructor<any>>
          | Iterable<ReactNode>
          | ReactPortal
          | PromiseLikeOfReactNode
          | null
          | undefined;
        attachments: any[];
      }) => {
        const avatarAlignmentClass = !message.fromEmployee
          ? 'lg:grid-cols-[48px_1fr] grid-cols-[32px_1fr] text-right'
          : 'lg:grid-cols-[1fr_48px] grid-cols-[1fr_32px] text-left';

        const sanitizedContent = DOMPurify.sanitize(message.messageContent);
        const downloadFile = async () => {
          const fileUrl =
            // 'http://localhost:8080/files/TICKET_ATTACHMENT/6c5f09e1-37a1-49cc-b5dc-f2d775a930a0.jpg';
            'http://localhost:8080/files/RESELLER_SERVICE_FILE/1733819338012d7948648-8426-4f1f-901e-591f90172b08.pdf';
          const fileName = 'attachment.pdf';

          try {
            const response = await fetch(fileUrl);
            if (!response.ok) {
              throw new Error('Failed to download file');
            }
            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(link.href);
          } catch (error) {
            console.error('Error downloading the file:', error);
          }
        };
        // @ts-ignore
        // @ts-ignore
        return (
          // @ts-ignore
          <div key={message.id}>
            <div
              className={`grid items-start gap-3 lg:gap-4 ${avatarAlignmentClass}`}
            >
              {!message.fromEmployee && (
                <Avatar
                  name="John Doe"
                  src={STATIC_FILES_URL + message?.senderAvatar}
                  className="!h-8 !w-8 bg-[#70C5E0] font-medium text-white xl:!h-11 xl:!w-11"
                />
              )}
              {/*<Avatar*/}
              {/*    name="John Doe"*/}
              {/*    src={STATIC_FILES_URL + message?.senderAvatar}*/}
              {/*    // initials={initials}*/}
              {/*    className="!h-8 !w-8 bg-[#70C5E0] font-medium text-white xl:!h-11 xl:!w-11"*/}
              {/*/>*/}
              <div
                className={`-mt-1.5 lg:mt-0 ${
                  message.fromEmployee ? '' : 'order-2'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Text tag="h3" className="text-sm font-medium">
                    {message?.senderName}
                  </Text>
                </div>
                <div className="mt-1.5 items-center gap-2 text-xs text-gray-500 lg:flex">
                  <span className="flex items-center lowercase">
                    {message?.senderUsername}{' '}
                    <FiExternalLink className="mr-1 h-2.5 w-2.5" />
                  </span>
                  <DotSeparator className="hidden lg:block" />
                  {/* @ts-ignore */}

                  <span className="mt-1.5 flex items-center lg:mt-0">
                    {message?.ticketRefId}{' '}
                    <Tooltip
                      size="sm"
                      rounded="sm"
                      placement="top"
                      content={() => (isCopied ? 'کپی شده' : 'کپی شود')}
                    >
                      <button
                        type="button"
                        onClick={() => handleCopyToClipboard(message?.id)}
                      >
                        {isCopied ? (
                          <PiCheck className="mr-1 h-3 w-3" />
                        ) : (
                          <HiOutlineClipboardDocument className="mr-1 h-3 w-3" />
                        )}
                      </button>
                    </Tooltip>
                  </span>

                  <DotSeparator className="hidden lg:block" />
                  <span>ارسال شده در {message?.createdAtStr}</span>
                </div>
              </div>
              {message.fromEmployee && (
                <Avatar
                  name="John Doe"
                  src={STATIC_FILES_URL + message?.senderAvatar}
                  className="order-1 !h-8 !w-8 bg-[#70C5E0] font-medium text-white lg:order-2 xl:!h-11 xl:!w-11"
                />
              )}
            </div>

            <div className="ml-10 mt-3 grid gap-2 leading-relaxed xl:ml-16 2xl:mt-4">
              <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
              {/* {{message?.messageContent}} */}
              {/* <Text></Text> */}
              {/* <Text>
                شماره تیکت: <br />
                {message?.ticketId}
              </Text> */}

              {/*<Text>*/}
              {/*    با احترام, <br/>*/}
              {/*    {message?.senderName}, <br/>*/}
              {/*    {message?.ticketId}*/}
              {/*</Text>*/}

              {!isEmpty(message?.attachments) && (
                <div className="mt-2 grid gap-2 md:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-3">
                  {/* @ts-ignore */}
                  {message?.attachments.map((attachment: any) => (
                    <div
                      // @ts-ignore
                      key={attachment.id}
                      className="grid grid-cols-[40px_1fr] gap-2.5"
                    >
                      <figure className="relative h-10 w-10 overflow-hidden rounded">
                        {/*// @ts-ignore*/}
                        {attachment.contentType === 'image/jpeg' ? (
                          // <Image
                          //   fill
                          //   // @ts-ignore
                          //   alt={attachment.fileName}
                          //   // @ts-ignore
                          //   src={
                          //     process.env.NEXT_PUBLIC_STATIC_FILES_URL +
                          //     attachment.filePath
                          //   }
                          //   className="object-contain"
                          //   unoptimized
                          // />
                          <Image
                            src={imageIcon}
                            alt="pdf icon"
                            className="h-full w-full"
                            quality={100}
                          />
                        ) : (
                          <Image
                            src={pdfIcon}
                            alt="pdf icon"
                            className="h-full w-full"
                            quality={100}
                          />
                        )}
                      </figure>

                      <div className="text-xs">
                        <span className="font-iransans flex items-center gap-2 font-medium text-gray-700">
                          {/*// @ts-ignore*/}
                          {attachment.fileName}
                          {/*// @ts-ignore*/}
                          <span className="text-gray-500">
                            (
                            {Math.ceil((attachment.fileSize / 1024) * 100) / // TODO: Return fileSizeStr from backend
                              100}{' '}
                            + {' کیلوبایت'})
                          </span>
                        </span>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="flex items-center gap-2 text-gray-500 transition duration-300 hover:text-gray-900">
                            <PiEye className="h-3.5 w-3.5" />{' '}
                            {/* <button>مشاهده</button> */}
                            <PhotoPreview />
                          </span>
                          <DotSeparator />
                          <div className="flex items-center gap-2 text-gray-500 transition duration-300 hover:text-gray-900">
                            <PiDownloadSimpleBold className="h-3.5 w-3.5" />{' '}
                            <button onClick={downloadFile}>دانلود</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      }
    )
  ) : (
    <center>
      <Text>پیامی وجود ندارد</Text>
    </center>
  );
}
