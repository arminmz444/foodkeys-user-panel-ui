import { ForwardedRef, forwardRef, useRef } from 'react';
import cn from '@/utils/class-names';
import UploadIcon from '../shape/upload';
import Image from 'next/image';
import { Progressbar } from "rizzui";

const inputClasses = {
    base: 'p-5 w-full relative border rounded-xl cursor-pointer duration-75 ease-in-out focus:ring',
    flex: 'flex flex-col items-center gap-4',
    disabled: '!text-gray-500 !bg-gray-100 !border-gray-200 hover:border-gray-200',
};

export interface BackgroundImageUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: React.ReactNode;
    className?: string;
    wrapperClassName?: string;
    imagePreview?: string | null;
    loading?: boolean;
    progress?: number;
    error?: string | null;
    success?: boolean;
}

/** Upload component allows user to upload a background image */
function BackgroundImageUpload(
    {
        label = "عکس پس زمینه را آپلود کنید",
        className,
        wrapperClassName,
        imagePreview,
        loading,
        progress,
        error,
        success,
        ...props
    }: BackgroundImageUploadProps,
    ref: ForwardedRef<HTMLInputElement>
) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    return (
        <div className={cn(wrapperClassName)}>
            {label && (
                <label className={cn('mb-2 block text-sm font-medium w-full')}>{label}</label>
            )}
            <div className={cn(inputClasses.base, inputClasses.flex, className)}>
                <input
                    ref={(e) => {
                        if (ref) typeof ref === 'function' ? ref(e) : ref.current = e;
                        inputRef.current = e;
                    }}
                    title=""
                    type="file"
                    accept="image/*"
                    className="absolute top-0 h-full w-full opacity-0 disabled:cursor-not-allowed"
                    {...props}
                />
                {loading ? (
                    <Progressbar rounded="md" value={progress} size="lg" />
                ) : success ? (
                    <div onClick={handleClick} className="relative w-full h-48 overflow-hidden rounded-xl border border-gray-300">
                        <Image
                            // @ts-ignore
                            src={imagePreview}
                            alt="Uploaded Background"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                ) : (
                    <div
                        onClick={handleClick}
                        className="relative w-full h-48 overflow-hidden rounded-xl border border-gray-300 flex items-center justify-center"
                    >
                        <UploadIcon className="text-gray-300 w-16 h-16" />
                    </div>
                )}
            </div>
            {error && <p role="alert" className="mt-10 text-xs text-red">{error}</p>}
        </div>
    );
}

export default forwardRef(BackgroundImageUpload);
BackgroundImageUpload.displayName = 'BackgroundImageUpload';
