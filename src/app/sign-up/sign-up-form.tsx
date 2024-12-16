'use client';

import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Password} from '@/components/ui/password';
import {Checkbox} from '@/components/ui/checkbox';
import {ErrorOption, SubmitHandler, useForm, useFormContext} from 'react-hook-form';
import {Text} from '@/components/ui/text';
import Link from 'next/link';
import {Form} from '@/components/ui/form';
import * as z from 'zod';
import React, {useState} from 'react';
import {PiArrowLeftBold} from 'react-icons/pi';
import {routes} from '@/config/routes';
import {PinCode} from "@/components/ui/pin-code";
import axios from "axios";
import * as process from "node:process";
import {login as reduxLogin} from "@/store/userSlice";
import {useAuth} from "@/context/AuthContext";
import {da} from "date-fns/locale";
import {companyFormSchema, defaultValues} from "@/app/shared/info/food-industry/company/create/form-utils";
import {zodResolver} from "@hookform/resolvers/zod";
import {Company} from "@/app/shared/info/food-industry/company/create";
import toast from "react-hot-toast";

type FormValues = {
    firstName: string;
    lastName?: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    isAgreed: boolean;
    otp: string;
};

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    isAgreed: false,
    otp: ''
};

const signUpFormSchema = z.object({
    firstName: z.string().min(1, {message: 'نام الزامی می‌باشد'}),
    lastName: z.string().min(1, {message: 'نام خانوادگی الزامی می‌باشد'}),
    email: z.string().email({message: 'آدرس ایمیل اشتباه می‌باشد'}),
    phone: z
        .string()
        .regex(/^\d+$/, 'شماره همراه فقط شامل اعداد میباشد')
        .length(11, 'شماره همراه باید 11 عدد باشد'),
    password: z
        .string()
        .min(8, {message: 'رمز عبور باید حداقل ۸ یا بیشتر از کاراکترها باشد.'})
        .max(32, {message: 'رمز عبور باید حداکثر ۳۲ کاراکتر باشد.'})
        .regex(new RegExp('.*[A-Z].*'), {
            message: 'حداقل یک حرف بزرگ مورد استفاده قرار گیرد.',
        })
        .regex(new RegExp('.*[a-z].*'), {
            message: 'حداقل یک حرف کوچک مورد استفاده قرار گیرد.',
        })
        .regex(new RegExp('.*\\d.*'), {
            message: 'حداقل یک عدد مورد استفاده قرار گیرد.',
        }),
    confirmPassword: z
        .string()
        .regex(new RegExp('.*[A-Z].*'), {
            message: 'حداقل یک حرف بزرگ مورد استفاده قرار گیرد.',
        })
        .regex(new RegExp('.*[a-z].*'), {
            message: 'حداقل یک حرف کوچک مورد استفاده قرار گیرد.',
        })
        .regex(new RegExp('.*\\d.*'), {
            message: 'حداقل یک عدد مورد استفاده قرار گیرد.',
        })
        .min(8, {message: 'رمز عبور باید حداقل ۸ یا بیشتر از کاراکترها باشد.'})
        .max(32, {message: 'رمز عبور باید حداکثر ۳۲ کاراکتر باشد.'}),
    isAgreed: z.boolean(),
    otp: z.string().min(1, {message: 'رمز یکبار مصرف ارسالی به خود را وارد کنید'}),
});

export default function SignUpForm() {
    const [reset, setReset] = useState({});
    const [otpValue, setOtpValue] = useState('');
    const [loading, setLoading] = useState(false)
    // @ts-ignore
    const {signUp} = useAuth()

    // @ts-ignore
    const onSubmit: SubmitHandler<any> = async (getValues: {
        (): { phone: string; email: string; firstName: string; lastName: string; password: string; otp: string; };
        (): any;
    }, setError: {
        (field: string, value: ErrorOption): void;
        (arg0: string, arg1: { type: any; message: any; }): void;
    }, reset: { (): void; (): void; }) => {
        // @ts-ignore
        const data = getValues()
        console.log(data);
        setLoading(true);
        console.log(data);
        let m = {token: '', user: ''};
        let hasSignedUp = await signUp(data.phone, data.email, data.firstName, data.lastName, data.password, data.otp, m, (field: string, value: ErrorOption) => setError(field, value));

        console.log(m);
        if (hasSignedUp !== false)
            reduxDispatch(reduxLogin(m));
        setLoading(false);
        setReset({...initialValues, isAgreed: false});
    }

    return (
        <>
            <Form<FormValues>
                validationSchema={signUpFormSchema}
                resetValues={reset}
                onSubmit={onSubmit}
                useFormProps={{
                    defaultValues: initialValues,
                }}
            >
                {({register, getValues, reset, setValue, setError, formState: {errors}}) => (
                    <div className="flex flex-col gap-x-4 gap-y-5 md:grid md:grid-cols-2 lg:gap-5">
                        <div dir="rtl" className="col-span-2 flex flex-col items-center justify-center mx-auto">
                            <div dir="ltr" className="space-y-10 justify-items-center justify-center">
                            {/*<label className="mt-1 mb-2 text-sm font-medium text-gray-700">رمز یکبارمصرف</label>*/}
                            <PinCode
                                dir="ltr"
                                variant="outline"
                                length={6}
                                setValue={(value) => setValue('otp', String(value))}
                                size="lg"
                                color="success"
                                className="w-full max-w-xs lg:justify-end"
                                error={errors.otp?.message}
                            />
                            <Button className="mt-3 bg-orange-dark self-center text-center mx-auto content-center">ارسال مجدد رمز یکبار مصرف</Button>
                        </div>
                        </div>
                        <div className="col-span-2"></div>
                        <Input
                            type="text"
                            size="lg"
                            label="نام*"
                            placeholder="نام را وارد کنید"
                            className="[&>label>span]:font-medium"
                            color="success"
                            inputClassName="text-sm"
                            {...register('firstName')}
                            error={errors.firstName?.message}
                            required
                        />
                        <Input
                            type="text"
                            size="lg"
                            label="نام خانوادگی*"
                            placeholder="نام خانوادگی را وارد کنید"
                            className="[&>label>span]:font-medium"
                            color="success"
                            inputClassName="text-sm"
                            {...register('lastName')}
                            error={errors.lastName?.message}
                            required
                        />
                        <Input
                            type="email"
                            size="lg"
                            label="ایمیل*"
                            className="col-span-2 [&>label>span]:font-medium"
                            inputClassName="text-sm"
                            color="success"
                            placeholder="مثال: info@foodkeys.com"
                            {...register('email')}
                            error={errors.email?.message}
                            required
                        />
                        <Input
                            type="number"
                            size="lg"
                            label="شماره همراه*"
                            className="col-span-2 [&>label>span]:font-medium"
                            inputClassName="text-sm"
                            color="success"
                            placeholder="مثال: 09123456789"
                            {...register('phone')}
                            error={errors.phone?.message}
                            required
                        />
                        <Password
                            label="رمز عبور"
                            placeholder="رمز عبور خود را وارد کنید"
                            size="lg"
                            className="[&>label>span]:font-medium"
                            color="success"
                            inputClassName="text-sm"
                            {...register('password')}
                            error={errors.password?.message}
                        />
                        <Password
                            label="تکرار رمز عبور"
                            placeholder="تکرار رمز عبور را وارد کنید"
                            size="lg"
                            className="[&>label>span]:font-medium"
                            color="success"
                            inputClassName="text-sm"
                            {...register('confirmPassword')}
                            error={errors.confirmPassword?.message}
                        />
                        <div className="col-span-2 flex items-start ">
                            <Checkbox
                                {...register('isAgreed')}
                                className="[&>label>span]:font-medium [&>label]:items-start"
                                label={
                                    <>
                                        با عضویت، شما به قوانین و مقررات ما موافقت کرده‌اید.{' '}
                                        <Link
                                            href="/"
                                            className="font-medium text-[#129974] transition-colors hover:underline"
                                        >
                                            قوانین
                                        </Link>{' '}
                                        &{' '}
                                        <Link
                                            href="/"
                                            className="font-medium text-[#129974] transition-colors hover:underline"
                                        >
                                            سیاست حفظ حریم خصوصی
                                        </Link>
                                    </>
                                }
                            />
                        </div>
                        <Button
                            onClick={(e) => {
                                // @ts-ignore
                                onSubmit(() => getValues(), (field: string, value: ErrorOption) => setError(field, value), () => reset())
                            }}
                            size="lg"
                            color="success"
                            type="submit"
                            className="group/btn col-span-2 mt-2"
                        >
                            <span>ثبت نام</span>{' '}
                            <PiArrowLeftBold
                                className="ms-2 mt-0.5 h-5 w-5 transition-all group-hover/btn:-translate-x-2"/>
                        </Button>
                    </div>
                )}
            </Form>
            {/*<Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">*/}
            {/*    آیا حساب کاربری دارید?{' '}*/}
            {/*    <Link*/}
            {/*        href={routes.signIn}*/}
            {/*        className="font-semibold text-gray-700 transition-colors hover:text-[#129974]"*/}
            {/*    >*/}
            {/*        ورود*/}
            {/*    </Link>*/}
            {/*</Text>*/}
        </>
    );
}
