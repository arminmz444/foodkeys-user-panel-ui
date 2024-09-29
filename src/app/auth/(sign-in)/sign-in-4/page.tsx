import AuthWrapperFour from '@/app/shared/auth-layout/auth-wrapper-four';
import SignInForm from './sign-in-form';

export default function SignInPage() {
  return (
    <AuthWrapperFour
      title={
        <>
          خوش آمدید مجدد! <br /> با اطلاعات اعتباری خود وارد شوید.
        </>
      }
      isSignIn
      isSocialLoginActive={true}
    >
      <SignInForm />
    </AuthWrapperFour>
  );
}
