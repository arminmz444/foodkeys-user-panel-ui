import { Text } from '@/components/ui/text';
import OtpForm from './otp-form';
import AuthWrapperOne from '@/app/shared/auth-layout/auth-wrapper-one';
import UnderlineShape from '@/components/shape/underline';
import Image from 'next/image';
import {redirectIfAuthenticated} from "@/utils/auth-redirect-handler";
import {siteConfig} from "@/config/site.config";

export default async function OtpPage() {
    await redirectIfAuthenticated()
    return (
        <AuthWrapperOne
            title={
                <>
                    ورود از طریق{' '}
                    <span className="relative inline-block">
            کد یکبار مصرف
            <UnderlineShape className="absolute -bottom-2 end-0 h-2.5 w-16 text-green xl:-bottom-1 xl:w-24"/>
          </span>
                </>
            }
            bannerTitle="ساده‌ترین روش برای مدیریت فضای کاری خود."
            bannerDescription="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که "
            pageImage={
                <div className="relative mx-auto aspect-[3/1.484] w-[500px] xl:w-[620px] 2xl:w-[820px]">
                    <Image
                        src={
                            siteConfig.foodkeysLogo
                        }
                        alt="تصویر صفحه احرازهویت"
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw"
                        className="object-cover"
                    />
                </div>
            }
        >
            <OtpForm/>
        </AuthWrapperOne>
    );
}
