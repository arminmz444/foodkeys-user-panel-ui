import AuthWrapperTwo from '@/app/shared/auth-layout/auth-wrapper-two';
import SignInForm from './sign-in-form';

export default function SignIn() {
  return (
    <AuthWrapperTwo title="ورود" isSignIn isSocialLoginActive={true}>
      <SignInForm />
    </AuthWrapperTwo>
  );
}
