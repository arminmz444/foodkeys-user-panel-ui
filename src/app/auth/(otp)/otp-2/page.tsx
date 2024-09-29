import AuthWrapperTwo from '@/app/shared/auth-layout/auth-wrapper-two';
import { Text } from '@/components/ui/text';
import OtpForm from './otp-form';

export default function OtpPage() {
  return (
    <AuthWrapperTwo title="اعتبار سنجی">
      <div className="max-w-md xl:pe-7">
        <Text className="-mt-1 mb-9 text-center text-[15px] leading-[1.85] text-gray-700 md:text-base md:!leading-loose lg:text-start xl:-mt-3">
          ما یک رمز یک‌بار مصرف به ایمیل شما ارسال کرده‌ایم. لطفا کد یکبار مصرف
          را وارد کنید
        </Text>
        <OtpForm />
      </div>
    </AuthWrapperTwo>
  );
}
