import { Text } from '@/components/ui/text';
import OtpForm from './otp-form';
import AuthWrapperOne from '@/app/shared/auth-layout/auth-wrapper-one';
import UnderlineShape from '@/components/shape/underline';
import Image from 'next/image';

export default function OtpPage() {
  return (
    <AuthWrapperOne
      title={
        <>
          وارد کنید{' '}
          <span className="relative inline-block">
            کد اعتبار سنجی.
            <UnderlineShape className="absolute -bottom-2 end-0 h-2.5 w-16 text-blue xl:-bottom-1 xl:w-24" />
          </span>
        </>
      }
      bannerTitle="ساده‌ترین روش برای مدیریت فضای کاری خود."
      bannerDescription="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که "
      pageImage={
        <div className="relative mx-auto aspect-[3/1.484] w-[500px] xl:w-[620px] 2xl:w-[820px]">
          <Image
            src={
              'https://www.foodkeys.com/Images/theme/2.jpg'
            }
            alt="Sign Up Thumbnail"
            fill
            priority
            sizes="(max-width: 768px) 100vw"
            className="object-cover"
          />
        </div>
      }
    >
      <Text className="-mt-1 mb-9 text-center text-[15px] leading-[1.85] text-gray-700 md:text-base md:!leading-loose lg:text-start xl:-mt-6">
        ما یک رمز یک‌بار مصرف به ایمیل شما ارسال کرده‌ایم.
      </Text>
      <OtpForm />
    </AuthWrapperOne>
  );
}
