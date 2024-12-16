import HydrogenLayout from '@/layouts/hydrogen/layout';
import { checkAndRefreshTokens } from '@/utils/token-handler';
import {AuthProvider, useAuth} from "@/context/AuthContext";
import {CONTEXT_ACTION} from "@/core/dto/enums/context-action";
import {redirect} from "next/navigation";

export default async function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // @ts-ignore
  // const tokenStatus = await checkAndRefreshTokens();
  // console.log('analyticsPage', tokenStatus ? JSON.stringify(tokenStatus) : "No token status");
  //
  // if (tokenStatus.type === CONTEXT_ACTION.LOGOUT)
  //   redirect('/login');
  // else if (tokenStatus.type === 'TOKEN_REFRESHED')
    // dispatch({ type: CONTEXT_ACTION.SET_ACCESS_TOKEN, payload: tokenStatus });
  return <AuthProvider><HydrogenLayout>{children}</HydrogenLayout></AuthProvider>
}
