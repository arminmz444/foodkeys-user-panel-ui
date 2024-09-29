'use client';

import {Button, Password} from 'rizzui';
import { Input } from 'rizzui';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';  // Import AuthContext

// Validation schema using Zod
const forgotPasswordSchema = z.object({
    oldPassword: z.string().min(6, { message: 'رمز عبور فعلی باید حداقل 6 کاراکتر باشد' }),
    newPassword: z
        .string()
        .min(8, { message: 'رمز عبور جدید باید حداقل 8 کاراکتر باشد' })
        .regex(/[A-Z]/, { message: 'رمز عبور باید حداقل یک حرف بزرگ داشته باشد' })
        .regex(/[a-z]/, { message: 'رمز عبور باید حداقل یک حرف کوچک داشته باشد' })
        .regex(/[0-9]/, { message: 'رمز عبور باید حداقل یک عدد داشته باشد' }),
    confirmNewPassword: z
        .string()
        .min(8, { message: 'تکرار رمز عبور جدید الزامی است' })
        // @ts-ignore
        .refine((val, ctx) => val === ctx.parent.newPassword, { message: 'رمزهای عبور مطابقت ندارند' }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
    // @ts-ignore
    const { changePassword } = useAuth();  // Access changePassword function from context
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: ForgotPasswordFormValues) => {
        setLoading(true);
        try {
            await changePassword(data.oldPassword, data.newPassword, data.confirmNewPassword);
        } catch (error) {
            console.error('Error changing password:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Password
                label="رمز عبور فعلی"
                // @ts-ignore
                type="password"
                {...register('oldPassword')}
                error={errors.oldPassword?.message}
                placeholder="رمز عبور فعلی را وارد کنید"
            />

            <Password
                label="رمز عبور جدید"
                // @ts-ignore
                type="password"
                {...register('newPassword')}
                error={errors.newPassword?.message}
                placeholder="رمز عبور جدید را وارد کنید"
            />

            <Password
                label="تکرار رمز عبور جدید"
                type="password"
                {...register('confirmNewPassword')}
                // @ts-ignore
                error={errors.confirmNewPassword?.message}
                placeholder="تکرار رمز عبور جدید را وارد کنید"
            />

            <Button
                type="submit"
                size="lg"
                className="w-full"
                isLoading={loading}
            >
                تغییر رمز عبور
            </Button>
        </form>
    );
}
