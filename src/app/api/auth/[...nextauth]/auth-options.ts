import {NextAuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import {env} from '@/env.mjs';
import isEqual from 'lodash/isEqual';
import {pagesOptions} from './pages-options';
import {useAuth} from "@/context/AuthContext";
import {mockProviders, mockSession} from "next-auth/client/__tests__/helpers/mocks";
// import user = mockSession.user;
// import credentials = mockProviders.credentials;
// import credentials = mockProviders.credentials;
import user = mockSession.user;
import axiosInstance from "@/utils/axios-instance";
import {da} from "date-fns/locale";

export const authOptions: NextAuthOptions = {
    // debug: true,
    pages: {
        ...pagesOptions,
    },
    session: {
        strategy: 'jwt',
        maxAge: 5 * 60, // 5 min
    },
    callbacks: {
        async session({session, token}) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.idToken as string,
                },
            };
        },
        async jwt({token, user}) {
            if (user) {
                // return user as JWT
                token.user = user;
            }
            return token;
        },
        async redirect({url, baseUrl}) {
            const parsedUrl = new URL(url, baseUrl);
            if (parsedUrl.searchParams.has('callbackUrl')) {
                return `${baseUrl}${parsedUrl.searchParams.get('callbackUrl')}`;
            }
            if (parsedUrl.origin === baseUrl) {
                return url;
            }
            return baseUrl;
        },
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            id: 'credentials',
            name: 'Credentials',
            credentials: {},
            async authorize(credentials: any) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid
                const username = credentials.username;
                const password = credentials.password;
                const otp = credentials.otp;
                let response
                if (otp) response = await axiosInstance.post('/auth/verify-otp', {username, password});
                else response = await axiosInstance.post('/auth/login', {username, password});
                console.log(response.data)
                const {data} = response;
                if (data?.statusCode === 200) {
                    console.log(data)
                    return data;
                }
                else return null;
            }
        }),
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID || '',
            clientSecret: env.GOOGLE_CLIENT_SECRET || '',
            allowDangerousEmailAccountLinking: true,
        }),
    ],
};
