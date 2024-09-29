import { Text } from '@/components/ui/text';
import OtpForm from './otp-form';
import AuthWrapperThree from '@/app/shared/auth-layout/auth-wrapper-three';

export default function ForgotPassword() {
  return (
    <AuthWrapperThree
      title={
        <>
          <span className="bg-gradient-to-r from-[#136A8A] to-[#267871] bg-clip-text text-transparent">
            تأیید کد یکبار مصرف (OTP)
          </span>
        </>
      }
      className="md:px-20 lg:px-36 lg:py-40"
    >
      <Text className="pb-7 text-center text-[15px] leading-[1.85] text-gray-700 md:text-base md:!leading-loose lg:-mt-1">
        ما یک رمز یک‌بار مصرف به ایمیل شما ارسال کرده‌ایم. لطفا کد یکبار مصرف را
        وارد کنید
      </Text>
      <OtpForm />
    </AuthWrapperThree>
  );
}
