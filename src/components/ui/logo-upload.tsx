import { ForwardedRef, forwardRef, useRef, useState } from 'react';
import cn from '@/utils/class-names';
import UploadIcon from '../shape/upload';
import Image from 'next/image';
import { Progressbar } from 'rizzui';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { PiPencilBold, PiUploadSimpleBold, PiTrashBold } from 'react-icons/pi';

const inputClasses = {
    base: 'relative border rounded-xl duration-75 ease-in-out focus:ring',
    flex: 'flex flex-col items-center gap-4',
    disabled: '!text-gray-500 !bg-gray-100 !border-gray-200 hover:border-gray-200',
};

export interface LogoUploadProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: React.ReactNode;
    className?: string;
    wrapperClassName?: string;
    logoPreview?: string | null;
    loading?: boolean;
    progress?: number;
    error?: string | null;
    success?: boolean;
    onRemove?: () => void;
}

/** Enhanced logo upload component with improved visual design */
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
        onRemove,
        ...props
    }: LogoUploadProps,
    ref: ForwardedRef<HTMLInputElement>
) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [hover, setHover] = useState(false);

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    return (
        <div className={cn('flex flex-col', wrapperClassName)}>
            {label && (
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            <div
                className={cn(
                    'relative flex flex-col items-center justify-center',
                    'transition duration-200',
                    className
                )}
            >
                <input
                    ref={(e) => {
                        if (ref) typeof ref === 'function' ? ref(e) : (ref.current = e);
                        inputRef.current = e;
                    }}
                    title=""
                    type="file"
                    accept="image/*"
                    className="absolute top-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
                    {...props}
                />

                {loading ? (
                    <div className="flex h-40 w-40 flex-col items-center justify-center rounded-full border-2 border-dashed border-gray-200 bg-gray-50 p-4">
                        <Progressbar
                            value={progress}
                            size="lg"
                            label={`${progress}%`}
                            className="w-full"
                        />
                        <span className="mt-2 text-xs text-gray-500">در حال آپلود...</span>
                    </div>
                ) : (
                    <div
                        className={cn(
                            'group relative overflow-hidden transition-all duration-200',
                            logoPreview
                                ? 'h-40 w-40 rounded-full border-2 border-solid'
                                : 'h-40 w-40 cursor-pointer rounded-full border-2 border-dashed',
                            error
                                ? 'border-red-300 bg-red-50'
                                : (logoPreview
                                        ? 'border-blue-300'
                                        : 'border-gray-300 bg-gray-50 hover:border-blue-300 hover:bg-blue-50'
                                )
                        )}
                        onClick={handleClick}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                    >
                        {logoPreview ? (
                            <>
                                <PhotoProvider>
                                    <PhotoView src={logoPreview}>
                                        <Image
                                            src={logoPreview}
                                            alt="تصویر لوگو"
                                            layout="fill"
                                            objectFit="cover"
                                            className={cn(
                                                'transition-opacity duration-300',
                                                hover ? 'opacity-70' : 'opacity-100'
                                            )}
                                        />
                                    </PhotoView>
                                </PhotoProvider>

                                <div className={cn(
                                    'absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 transition-opacity duration-300',
                                    hover ? 'opacity-100' : 'opacity-0'
                                )}>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-600 hover:bg-blue-100 hover:text-blue-700"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleClick();
                                            }}
                                        >
                                            <PiPencilBold size={18} />
                                        </button>
                                        {onRemove && (
                                            <button
                                                type="button"
                                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-600 hover:bg-red-100 hover:text-red-700"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onRemove();
                                                }}
                                            >
                                                <PiTrashBold size={18} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex h-full w-full flex-col items-center justify-center p-4">
                                <div className="mb-3 rounded-full bg-blue-100 p-3 text-blue-600">
                                    <PiUploadSimpleBold size={28} />
                                </div>
                                <span className="text-center text-sm font-medium text-gray-500 group-hover:text-blue-600">
                                    کلیک کنید تا لوگو را آپلود کنید
                                </span>
                                <span className="mt-2 text-center text-xs text-gray-400">
                                    JPG یا PNG (حداکثر ۸ مگابایت)
                                </span>
                            </div>
                        )}
                    </div>
                )}

                {error && (
                    <p role="alert" className="mt-2 text-xs text-red-500">
                        {error}
                    </p>
                )}

                {success && !error && (
                    <p className="mt-2 text-xs text-green-500">
                        لوگو با موفقیت آپلود شد
                    </p>
                )}
            </div>
        </div>
    );
}

export default forwardRef(LogoUpload);
LogoUpload.displayName = 'LogoUpload';