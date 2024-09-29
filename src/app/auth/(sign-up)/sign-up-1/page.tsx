import Image from 'next/image';
import UnderlineShape from '@/components/shape/underline';
import SignUpForm from './sign-up-form';
import AuthWrapperOne from '@/app/shared/auth-layout/auth-wrapper-one';

export default function SignUp() {
  return (
    <AuthWrapperOne
      title={
        <>
          بپیوندید و هیچ چیزی را از دست ندهید. -{' '}
          <span className="relative inline-block">
            عضو شوید!
            <UnderlineShape className="absolute -bottom-2 start-0 h-2.5 w-28 text-blue xl:-bottom-1.5 xl:w-36" />
          </span>
        </>
      }
      description="با عضویت، به محتوای اختصاصی دسترسی پیدا خواهید کرد، پیشنهادهای ویژه را دریافت خواهید کرد و اولین نفری خواهید بود که از اخبار جذاب و به‌روزرسانی‌ها مطلع می‌شوید."
      bannerTitle="ساده‌ترین روش برای مدیریت فضای کاری خود."
      bannerDescription="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و "
      isSocialLoginActive={true}
      pageImage={
        <div className="relative mx-auto aspect-[3/1.484] w-[500px] xl:w-[620px] 2xl:w-[820px]">
          <Image
            src={
              'https://www.uplooder.net/img/image/23/78ad7b87c531491386626d5515d0d808/1.png'
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
      <SignUpForm />
    </AuthWrapperOne>
  );
}
