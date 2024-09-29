import AuthWrapperFour from '@/app/shared/auth-layout/auth-wrapper-four';
import { Text } from '@/components/ui/text';
import OtpForm from './otp-form';

export default function OtpPage() {
  return (
    <AuthWrapperFour
      title="تأیید کد یکبار مصرف (OTP)"
      className="md:px-14 lg:px-20"
    >
      <Text className="pb-7 text-center text-[15px] leading-[1.85] text-gray-700 md:text-base md:!leading-loose lg:-mt-5">
        کد یکبار مصرف به +*********12 ارسال شد
      </Text>
      <OtpForm />
    </AuthWrapperFour>
  );
}
