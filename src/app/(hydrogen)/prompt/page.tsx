"use client"
import React from "react";
import axios from "axios";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
    title: z.string().min(1, "عنوان الزامی است"),
    summary: z.string().min(1, "خلاصه الزامی است"),
    body: z.string().min(1, "متن اصلی الزامی است"),
    description: z.string().min(1, "توضیحات الزامی است"),
    link: z
        .string()
        .min(1, "لینک الزامی است")
        .url("آدرس لینک نامعتبر است"),
    // در صورت نیاز به تبدیل شدن به آرایه در مرحله ارسال فرم، کافیست در onSubmit آن را split کنید
    keyword: z.string().min(1, "کلمات کلیدی الزامی است"),
    author: z.string().min(1, "نام نویسنده الزامی است"),
});

export default function PromptPage() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data) => {
        // اگر لازم است کلمات کلیدی را قبل از ارسال در همین‌جا تبدیل به آرایه کنید:
        // const keywordsArray = data.keyword.split("،").map((item) => item.trim());
        // console.log({ ...data, keyword: keywordsArray });

        console.log("ارسال فرم:", data);
        // اینجا هر عملیاتی که برای ثبت نهایی (انتشار) لازم است را انجام دهید
    };

    const handleAiGenerate = async () => {
        // این تابع با کلیک روی دکمه "ایجاد متن با هوش مصنوعی" صدا زده می‌شود
        try {
            // مثال از یک GET ساده (با مسیر دلخواه)
            const {data} = await axios.post("http://localhost:8000/generate-article", {}, {headers: {"Content-Type": "application/json"}});

            // فرض بر این است که data دارای فیلدهای زیر است:
            // { title, summary, body, description, link, keyword, author }
            const {title, summary, body, description, link, keyword, author} = data;

            // مقادیر برگشتی از API را در فرم قرار می‌دهیم
            setValue("title", title || "");
            setValue("body", body || "");
            setValue("description", description || "");
            setValue("link", link || "");
            setValue("keyword", keyword || "");
            setValue("author", author || "");
        } catch (error) {
            console.error("AI Generate Error:", error);
            // در صورت بروز خطا، می‌توانید اینجا ارور هندلینگ انجام دهید
        }
    };

    // این توابع صرفاً برای نمایش دکمه‌ها و رزرو جای خالی هستند
    const handleDraft = () => {
        // اینجا هر کاری که با کلیک روی "ایجاد نسخه پیش‌نویس" نیاز است انجام دهید
        console.log("Draft button clicked");
    };

    return (
        <div className="min-h-screen text-white p-4 flex items-center justify-center">
            <div className="max-w-3xl w-full bg-[#129974] p-8 rounded-lg">
                <h1 className="text-2xl text-white font-bold mb-6 text-center">
                    فرم ایجاد/ویرایش متن
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* عنوان */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold">عنوان</label>
                        <input
                            type="text"
                            className="px-3 py-2 rounded text-black"
                            {...register("title")}
                        />
                        {errors.title && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    {/* خلاصه */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold">خلاصه</label>
                        <input
                            type="text"
                            className="px-3 py-2 rounded text-black"
                            {...register("description")}
                        />
                        {errors.description && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    {/* متن اصلی (بدنه) */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold">محتوا</label>
                        <textarea
                            rows={4}
                            className="px-3 py-2 rounded text-black"
                            {...register("body")}
                        />
                        {errors.body && (
                            <p className="text-red-400 text-sm mt-1">{errors.body.message}</p>
                        )}
                    </div>

                    {/* لینک */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold">لینک</label>
                        <input
                            type="text"
                            className="px-3 py-2 rounded text-black"
                            {...register("link")}
                        />
                        {errors.link && (
                            <p className="text-red-400 text-sm mt-1">{errors.link.message}</p>
                        )}
                    </div>

                    {/* کلمات کلیدی */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold">
                            کلمات کلیدی
                        </label>
                        <input
                            type="text"
                            className="px-3 py-2 rounded text-black"
                            {...register("keyword")}
                        />
                        {errors.keyword && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.keyword.message}
                            </p>
                        )}
                    </div>

                    {/* نویسنده */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold">نویسنده</label>
                        <input
                            type="text"
                            className="px-3 py-2 rounded text-black"
                            {...register("author")}
                        />
                        {errors.author && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.author.message}
                            </p>
                        )}
                    </div>

                    {/* دکمه‌ها */}
                    <div className="flex flex-wrap gap-4 justify-center mt-6">
                        <button
                            type="button"
                            onClick={handleAiGenerate}
                            className="bg-[#d438ef] bg-blue hover:bg-blue-700 px-4 py-2 rounded"
                        >
                            ایجاد متن با هوش مصنوعی
                        </button>
                        <button
                            type="button"
                            onClick={handleDraft}
                            className="bg-white hover:bg-yellow px-4 py-2 rounded text-black"
                        >
                            ایجاد نسخه پیش‌نویس
                        </button>
                        <button
                            type="submit"
                            className="bg-blue hover:bg-green-700 px-4 py-2 rounded"
                        >
                            انتشار
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
