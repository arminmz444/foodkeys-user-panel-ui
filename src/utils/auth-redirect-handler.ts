import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function redirectIfAuthenticated() {
    const cookieStore = cookies();
    const token = cookieStore.get('fkToken')?.value;
    // const jwtToken = cookieStore.get('jwtToken')?.value;

    if (token)
        redirect('/');

    return null;
}
