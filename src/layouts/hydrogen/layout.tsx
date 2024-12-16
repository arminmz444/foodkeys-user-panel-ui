import Header from '@/layouts/hydrogen/header';
import Sidebar from '@/layouts/hydrogen/sidebar';
import 'leaflet/dist/leaflet.css';
import 'react-photo-view/dist/react-photo-view.css';
export default function HydrogenLayout({
    // type,
    // token,
  children,
}: {
  children: React.ReactNode;
}) {
    // const { dispatch, isLoggedIn, fixToken } = useAuth();
    // useEffect(() => {
    //     console.log("Checking type and token")
    //
    //     if (type === 'TOKEN_REFRESHED')
    //         dispatch({ type: CONTEXT_ACTION.SET_ACCESS_TOKEN, payload: token });
    //     else if (type === 'LOGOUT') {
    //         // dispatch({ type: CONTEXT_ACTION.CHECK_LOGIN_STATUS });
    //         if (!isLoggedIn)
    //             redirect('/login')
    //         else fixToken()
    //     }
    // }, [type, token]);
  return (
    <main className="flex min-h-screen flex-grow">
      <Sidebar className="fixed hidden dark:bg-gray-50 xl:block" />
      <div className="flex w-full flex-col xl:ms-[270px] xl:w-[calc(100%-270px)] 2xl:ms-72 2xl:w-[calc(100%-288px)]">
        <Header />
        <div className="flex flex-grow flex-col px-4 pb-6 pt-2 @container md:px-5 lg:px-6 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-10 4xl:pb-9">
          {children}
        </div>
      </div>
    </main>
  );
}
