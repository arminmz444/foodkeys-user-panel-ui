import AuthWrapperFour from '@/app/shared/auth-layout/auth-wrapper-four';
import ForgetPasswordForm from './forgot-password-form';

export default function ForgotPassword() {
  return (
    <AuthWrapperFour
      title={
        <>
          با ورود مشکل دارید? <br className="hidden sm:inline-block" /> باز
          نشانی رمز عبور
        </>
      }
    >
      <ForgetPasswordForm />
    </AuthWrapperFour>
  );
}
