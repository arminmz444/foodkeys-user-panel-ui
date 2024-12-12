import ForgetPasswordForm from './forget-password-form';
import UnderlineShape from '@/components/shape/underline';
import Image from 'next/image';
import AuthWrapperOne from '@/app/shared/auth-layout/auth-wrapper-one';
import loginImage from 'public/foodkeysLogin.png';

export default function SignIn() {
  return (
    <AuthWrapperOne
      // setStep={}
      title={
        <>
          بازنشانی{' '}
          <span className="relative inline-block">
            رمز عبور!
            <UnderlineShape className="absolute -bottom-2 start-0 h-2.5 w-24 text-[#129974] md:w-28 xl:-bottom-1.5 xl:w-36" />
          </span>
        </>
      }
      bannerTitle="ساده‌ترین روش برای مدیریت فضای کاری خود."
      bannerDescription="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و "
      pageImage={
        <div className="absolute right-0 top-1/2 aspect-[3/1.484] w-[320px] -translate-y-1/2 translate-x-1/2 xl:w-[420px] 2xl:w-[520px]">
          <Image
            src={loginImage}
            alt="پنل مرجع صنایع غذایی و کشاورزی ایران"
            className="object-cover object-center"
          />
        </div>
      }
    >
      <ForgetPasswordForm />
    </AuthWrapperOne>
  );
}
