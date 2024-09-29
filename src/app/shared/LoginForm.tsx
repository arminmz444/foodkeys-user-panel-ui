'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Password } from '@/components/ui/password';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/context/AuthContext';  // Access AuthContext
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Text } from '@/components/ui/text';
import { PiArrowLeftBold } from 'react-icons/pi';
import Link from 'next/link';
import { routes } from '@/config/routes';

const loginSchema = z.object({
    username: z.string().email({ message: 'ایمیل اشتباه است' }),
    password: z.string().min(1, { message: 'رمز عبور الزامی است' }),
    remember: z.boolean(),
});

type LoginFormSchema = z.infer<typeof loginSchema>;

export default function SignInForm() {
    // @ts-ignore
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: 'admin@admin.com',
            password: 'admin',
            remember: true,
        },
    });

    const onSubmit = async (data: LoginFormSchema) => {
        try {
            setLoading(true);
            await login(data.username, data.password);
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
                label="ایمیل"
                size="lg"
                placeholder="ایمیل را وارد کنید"
                {...register('username')}
                error={errors.username?.message}
            />
            <Password
                label="رمز عبور"
                size="lg"
                placeholder="رمز عبور خود را وارد کنید"
                {...register('password')}
                error={errors.password?.message}
            />
            <div className="flex items-center justify-between pb-2">
                <Checkbox {...register('remember')} label="مرا به خاطر بسپر" />
                <Link href={routes.auth.forgotPassword1} className="text-sm font-semibold text-blue">
                    رمز عبور را فراموش کردید?
                </Link>
            </div>
            <Button type="submit" size="lg" color="info" isLoading={loading}>
                <span>ورود</span>
                <PiArrowLeftBold className="ml-2 h-6 w-6" />
            </Button>
        </form>
    );
}
