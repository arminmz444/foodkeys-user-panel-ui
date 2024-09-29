import { routes } from '@/config/routes';
import { PagesOptions } from 'next-auth';

export const pagesOptions: Partial<PagesOptions> = {
  signIn: routes.signIn,
  // verifyRequest: routes.otp,
  error: routes.signIn,
};
