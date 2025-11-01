import { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Upload from '@/components/ui/upload';
import { TrashIcon } from '@/components/icons/trash';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const Swiper = dynamic(() => import('swiper/react').then((mod) => mod.Swiper), { ssr: false });
const SwiperSlide = dynamic(() => import('swiper/react').then((mod) => mod.SwiperSlide), { ssr: false });

interface MultipleFilesProps {
  className?: string;
  label?: React.ReactNode;
  registerName: string;
  onUpload: Function;
}

export default function MultipleFiles({
  className,
  label,
  registerName,
  onUpload,
}: MultipleFilesProps) {
  const { register, setValue, watch } = useFormContext();
  const multiRef = useRef<HTMLInputElement>(null);
  const [multiImages, setMultiImages] = useState<Array<any>>(
    watch(registerName) || []
  );

  const handleMultiImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const uploadedFiles = Array.from(event.target.files || []);
    const imageFiles = uploadedFiles.filter((file) =>
      file.type.includes('image')
    );
    const newFiles = [...multiImages, ...imageFiles];
    setMultiImages(newFiles);
    setValue(registerName, newFiles);
    if (onUpload) {
      await onUpload(imageFiles);
    }
  };

  const handleMultiImageDelete = (index: number) => {
    const updatedFiles = multiImages.filter((_, i) => i !== index);
    setMultiImages(updatedFiles);
    setValue(registerName, updatedFiles);
    if (multiRef.current) {
      multiRef.current.value = '';
    }
  };

  return (
    <div className={className}>
      <Upload
        label={label}
        ref={multiRef}
        accept="image/*"
        multiple
        onChange={handleMultiImageUpload}
      />
      <p className="pt-3 text-sm text-gray-500">
        عکس محصول خود را اینجا آپلود کنید حجم عکس باید بیشتر از{' '}
        <strong className="font-medium text-gray-900">2 مگابایت باشد</strong>
      </p>

      {multiImages.length > 0 && (
        <div className="mt-4">
          <Swiper
            spaceBetween={16}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {multiImages.map((file, index) => (
              <SwiperSlide
                key={file?.name || file?.id || Math.random().toString()}
              >
                <div className="relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center">
                  <Image
                    src={
                      file instanceof File || file instanceof Blob
                        ? URL.createObjectURL(file)
                        : file &&
                          file.filePath &&
                          process.env.NEXT_PUBLIC_STATIC_FILES_URL +
                            file.filePath
                    }
                    alt={file?.name || 'عکس محصول'}
                    width={300}
                    height={300}
                    className="object-contain w-full h-full"
                  />
                  <button
                    onClick={() => handleMultiImageDelete(index)}
                    type="button"
                    className="absolute right-2 top-2 rounded-full bg-white bg-opacity-70 p-1.5 text-gray-700 shadow-sm hover:bg-red-500 hover:text-white transition-colors"
                    aria-label="حذف تصویر"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <input type="hidden" {...register(registerName)} />
        </div>
      )}
    </div>
  );
}