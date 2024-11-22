import SignInForm from './sign-in-form';
import AuthWrapperOne from '@/app/shared/auth-layout/auth-wrapper-one';
import Image from 'next/image';
import UnderlineShape from '@/components/shape/underline';
import loginImage from 'public/foodkeysLogin.png';

export default function SignIn() {
  return (
    <AuthWrapperOne
      title={
        <>
          <span className="relative inline-block">
            خوش آمدید!{' '}
            <UnderlineShape className="absolute -bottom-2 start-0 h-2.5 w-24 text-[#129974] md:w-28 xl:-bottom-1.5 xl:w-36" />
          </span>
        </>
      }
      description="با حضور موثر کسب و کارتان در سایت مرجع صنایع غذایی و کشاورزی، یک قدم از رقبایتان جلوتر باشید."
      bannerTitle="ساده‌ترین روش برای مدیریت فضای کاری خود."
      bannerDescription="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ است."
      isSocialLoginActive={true}
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
      <SignInForm />
    </AuthWrapperOne>
  );
}
