import AuthWrapperFour from '@/app/shared/auth-layout/auth-wrapper-four';
import SignUpForm from './sign-up-form';

export default function SignUpPage() {
  return (
    <AuthWrapperFour
      title="به ما بپیوندید! امروز عضو شوید و از مزایا ویژه بهره‌مند شوید و به‌روز باشید."
      isSocialLoginActive={true}
    >
      <SignUpForm />
    </AuthWrapperFour>
  );
}
