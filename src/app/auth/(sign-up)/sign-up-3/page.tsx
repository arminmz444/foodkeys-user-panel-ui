import SignUpForm from './sign-up-form';
import AuthWrapperThree from '@/app/shared/auth-layout/auth-wrapper-three';

export default function SignUpPage() {
  return (
    <AuthWrapperThree
      title={
        <>
          <span className="bg-gradient-to-r from-[#136A8A] to-[#267871] bg-clip-text text-transparent">
            امروز به ما ملحق شوید !
          </span>{' '}
          مزایای ویژه را دریافت کرده و به روز بمانید.
        </>
      }
      isSocialLoginActive={true}
    >
      <SignUpForm />
    </AuthWrapperThree>
  );
}
