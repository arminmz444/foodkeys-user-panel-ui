'use client';

import Link from 'next/link';
import logoImg from '@public/fkLogo.png';
import logoImgText from '@public/logo-primary-text.svg';
import Image from 'next/image';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import {
  PiAppleLogo,
  PiArrowLeftBold,
  PiArrowRightBold,
  PiPasswordBold,
  PiPasswordFill,
} from 'react-icons/pi';
import { FcGoogle } from 'react-icons/fc';
import OrSeparation from './or-separation';
import toast from 'react-hot-toast';

export default function AuthWrapperOne({
  children,
  title,
  bannerTitle,
  bannerDescription,
  description,
  pageImage,
  isSocialLoginActive = false,
  isSignIn = false,
  setStep,
}: {
  children: React.ReactNode;
  title: React.ReactNode;
  description?: string;
  bannerTitle?: string;
  bannerDescription?: string;
  pageImage?: React.ReactNode;
  isSocialLoginActive?: boolean;
  isSignIn?: boolean;
  setStep: (arg: 'INITIAL' | 'PASSWORD' | 'SIGNUP') => void;
}) {
  function handleSignIn() {
    // toast.error(
    //   <Text>
    //     این مورد در مرحله آزمون است{' '}
    //     <Text tag="b" className="font-semibold text-gray-900">
    //       ورود
    //     </Text>{' '}
    //   </Text>
    // );
  }
  return (
    <>
      <Button
        // href={'/login'}
        onClick={() => setStep('PASSWORD')}
        className="sticky start-0 top-0 z-20 flex items-center justify-center bg-[#129974] p-3.5 text-sm font-medium text-white md:p-4 lg:hidden"
      >
        <PiArrowRightBold />
        <Text className="font-iransans font-iransans ms-1">
          ورود از طریق رمز عبور
        </Text>
      </Button>

      <div className="min-h-screen justify-between gap-x-8 px-4 py-8 pt-5 md:pt-6 lg:flex lg:p-6 xl:gap-x-10 xl:p-7 2xl:p-10 2xl:pt-5 [&>div]:min-h-[calc(100vh-80px)]">
        <div className="relative flex w-full items-center justify-center lg:w-5/12 2xl:justify-end 2xl:pe-24">
          <div className=" w-full max-w-sm md:max-w-md lg:py-7 lg:ps-3 lg:pt-16 2xl:w-[630px] 2xl:max-w-none 2xl:ps-20 2xl:pt-7">
            {/*<Link*/}
            {/*  href={'/'}*/}
            {/*  className="absolute -top-4 start-0 hidden p-3 text-gray-500 hover:text-gray-700 lg:flex lg:items-center 2xl:-top-7 2xl:ps-20 "*/}
            {/*>*/}
            {/*  <PiArrowRightBold />*/}
            {/*  <b className="ms-1 font-medium">برگشت به خانه</b>*/}
            {/*</Link>*/}
            <div className="mb-7 px-6 pt-3 text-center md:pt-0 lg:px-0 lg:text-start xl:mb-8 2xl:mb-10">
              <Link
                href={'/'}
                className="mb-6 inline-flex items-center justify-center xl:mb-8"
              >
                <Image
                  className="h-12 w-12"
                  src={logoImg}
                  alt="مرجع صنایع غذایی و کشاورزی ایران"
                />
                <h4 className="ps-2.5 font-black  dark:invert">
                  مرجع صنایع غذایی و کشاورزی ایران{' '}
                </h4>
                {/* <Image
                  src={logoImgText}
                  alt="Isomorphic"
                  className="ps-2.5 dark:invert"
                /> */}
              </Link>
              <Text
                tag="h2"
                className="mb-5 text-[26px] leading-snug md:text-3xl md:!leading-normal lg:mb-7 lg:pe-16 lg:text-[28px] xl:text-3xl 2xl:pe-8 2xl:text-4xl"
              >
                {title}
              </Text>
              <Text className=" leading-[1.85] text-gray-700 md:leading-loose lg:pe-8 2xl:pe-14">
                {description}
              </Text>
            </div>
            {isSocialLoginActive && (
              <>
                <div className="grid grid-cols-1 gap-4 pb-5 md:grid-cols-2 md:pb-6 xl:gap-5 xl:pb-7">
                  <Button
                    onClick={() => setStep('PASSWORD')}
                    className=":bg-orange-light h-11 w-full bg-[#129974]"
                    color="success"
                  >
                    <PiPasswordFill className="me-2 h-6 w-6 shrink-0" />
                    <span className="truncate">ورود با رمز عبور</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      // it should be signIn('google')
                      handleSignIn()
                    }
                    className="h-11 w-full"
                  >
                    <FcGoogle className="me-2 h-4 w-4 shrink-0" />
                    <span className="truncate">ورود با گوگل</span>
                  </Button>
                </div>
                <OrSeparation title="یا" className="mb-5 2xl:mb-7" isCenter />
              </>
            )}

            {children}
          </div>
        </div>
        <div className="relative hidden w-4/12 items-center justify-center rounded-[20px] bg-[#129974] px-6 dark:bg-gray-100/40 lg:flex xl:justify-start 2xl:px-16">
          <div className="pb-8 pt-10 text-center xl:pt-16 2xl:block 2xl:w-[1063px]">
            {/* <div className="mx-auto mb-10 max-w-sm pt-2 2xl:max-w-lg">
              <Text
                tag="h2"
                className="mb-5 font-semibold !leading-normal lg:text-[26px] 2xl:px-10 2xl:text-[32px]"
              >
                {bannerTitle}
              </Text>
              <Text className="leading-[1.85] text-gray-700 md:leading-loose 2xl:px-6">
                {bannerDescription}
              </Text>
            </div> */}
            {pageImage}
          </div>
        </div>
      </div>
    </>
  );
}
