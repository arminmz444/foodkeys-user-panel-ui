import AnalyticsDashboard from '@/app/shared/analytics-dashboard';
import {redirect} from "next/navigation";
import {checkAndRefreshTokens} from "@/utils/token-handler";
import {CONTEXT_ACTION} from "@/core/dto/enums/context-action";

export default async function AnalyticsPage() {
    // const tokenStatus = await checkAndRefreshTokens();
    // console.log('analyticsPage', tokenStatus);
    //
    // if (tokenStatus.type === CONTEXT_ACTION.LOGOUT) {
    //     // redirect('/login');
    // }
    return (
        <>
            <AnalyticsDashboard/>
        </>
    );
}
// const { loading } = useAuthCheck();
//
//     if (loading) return <div>Loading...</div>;
//
//     return <div>Protected Content</div>;


// // @ts-ignore
//
// // @ts-ignore
// export const getServerSideProps: GetServerSideProps = async (context) => {
//     const { req, res } = context;
//     const token = req.cookies.token;
//
//     if (!token) {
//         return {
//             redirect: {
//                 destination: '/login',
//                 permanent: false,
//             },
//         };
//     }
//
//     try {
//         await axiosInstance.get('/auth/verify', {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//
//         return { props: {} };
//     } catch (error) {
//         return {
//             redirect: {
//                 destination: '/login',
//                 permanent: false,
//             },
//         };
//     }
// };