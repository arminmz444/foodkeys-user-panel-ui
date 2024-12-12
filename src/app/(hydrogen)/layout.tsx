import HydrogenLayout from '@/layouts/hydrogen/layout';
import { checkAndRefreshTokens } from '@/utils/token-handler';
import { CONTEXT_ACTION } from '@/core/dto/enums/context-action';
import { redirect } from 'next/navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store/store';

export default async function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const tokenStatus = await checkAndRefreshTokens();
  // console.log('analyticsPage', tokenStatus);

  // if (tokenStatus.type === CONTEXT_ACTION.LOGOUT) {
  // redirect('/login');
  // }
  return <HydrogenLayout>{children}</HydrogenLayout>;
}
