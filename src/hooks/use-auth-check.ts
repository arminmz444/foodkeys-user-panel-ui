import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

export const useAuthCheck = () => {
    console.log('useAuthCheck');
    const [loading, setLoading] = useState(true);
    // @ts-ignore
    const { logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const checkTokens = async () => {
            try {
                const response = await axios.get('/api/auth/check-tokens', { withCredentials: true });
                if (response.data.message === 'Logout') {
                    logout();
                }
            } catch (error) {
                await router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        checkTokens();
    }, [logout, router]);

    return { loading };
};
