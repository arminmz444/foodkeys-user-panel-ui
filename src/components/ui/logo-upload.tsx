import {ForwardedRef, forwardRef} from 'react';
import cn from '@/utils/class-names';
import UploadIcon from '../shape/upload';
import Image from 'next/image';
import {Progressbar} from "rizzui";
import {PhotoProvider, PhotoView} from "react-photo-view";

const STATIC_FILE_URL = "http://localhost:8080";
const inputClasses = {
    base: 'p-5 md:ps-10 relative border rounded-xl cursor-pointer duration-75 ease-in-out focus:ring',
    flex: 'flex flex-col items-center gap-4',
    disabled: '!text-gray-500 !bg-gray-100 !border-gray-200 hover:border-gray-200',
};

export interface LogoUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: React.ReactNode;
    className?: string;
    wrapperClassName?: string;
    logoPreview?: string | null;
    loading?: boolean;
    progress?: number;
    error?: string | null;
    success?: boolean;
}

/** Upload component allows user to upload a single logo file in avatar-like circular display */
function LogoUpload(
    {
        label,
        className,
        wrapperClassName,
        logoPreview,
        loading,
        progress,
        error,
        success,
        ...props
    }: LogoUploadProps,
    ref: ForwardedRef<HTMLInputElement>
) {
    return (
        <div className={cn(wrapperClassName)}>
            {label && (
                <label className={cn('mb-2 block text-sm font-medium')}>{label}</label>
            )}
            <div className={cn(inputClasses.base, inputClasses.flex, className)}>
                <input
                    ref={ref}
                    title=""
                    type="file"
                    accept="image/*"
                    className="absolute top-0 h-full w-full opacity-0 disabled:cursor-not-allowed"
                    {...props}
                />
                {loading ? (
                    <Progressbar rounded="md" value={progress} size="lg"/>
                ) : success ? (
                    <div className="relative w-24 h-24 overflow-hidden rounded-full border border-gray-300">

                        <Image
                            // @ts-ignore
                            src={logoPreview}
                            alt="Uploaded Logo"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                ) : (
                    <div
                        className="relative w-24 h-24 overflow-hidden rounded-full border border-gray-300 flex items-center justify-center">
                        <UploadIcon className="text-gray-300 w-12 h-12"/>
                    </div>
                )}
            </div>
            {error && <p role="alert" className="mt-10 text-xs text-red">{error}</p>}
        </div>
    );
}

export default forwardRef(LogoUpload);
LogoUpload.displayName = 'LogoUpload';
