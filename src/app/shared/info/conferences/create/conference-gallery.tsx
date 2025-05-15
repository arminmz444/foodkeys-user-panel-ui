import FormGroup from '@/app/shared/form-group';
import TrashIcon from '@/components/icons/trash';
import QuillLoader from '@/components/loader/quill-loader';
import SelectLoader from '@/components/loader/select-loader';
import { Input } from '@/components/ui/input';
import Upload from '@/components/ui/upload';
import { AuthContext } from '@/context/AuthContext';
import { CONTEXT_ACTION } from '@/core/dto/enums/context-action';
import useAxiosPrivate from '@/hooks/use-axios-private';
import cn from '@/utils/class-names';
import { uploadServiceTempFile } from '@/utils/upload-service-temp-file';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useContext, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import { PiTrashBold } from 'react-icons/pi';
import { ActionIcon, FieldError } from 'rizzui';

export default function ConferenceGallery({
  className,
  category,
  data,
}: {
  className?: string;
  category?: number;
  data?: any;
}) {
  const {
    register,
    control,
    formState: { errors },
    setValue,
  } = useFormContext();

  const _axios = useAxiosPrivate();
  const [error, setError] = useState('');

  const [images, setImages] = useState<File[]>([]);
  const [dataFileIds, setDataFileIds] = useState<any>([]);
  const imageRef = useRef<HTMLInputElement>(null);

  const checkFileSizeAndType = (file: File) => {
    const validTypes = ['image/jpeg', 'image/png'];
    const maxSize = 8 * 1024 * 1024; // 8MB
    return validTypes.includes(file.type) && file.size <= maxSize;
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const uploadedFile = event.target.files?.[0];
    if (!uploadedFile) return;

    if (!checkFileSizeAndType(uploadedFile)) {
      toast.error(
        'فرمت یا حجم فایل مجاز نیست. فقط JPG و PNG با حداکثر حجم 8 مگابایت مجاز است.'
      );
      return;
    }

    try {
      const serviceName = 'SERVICE_FILE';
      const fileIds = await uploadServiceTempFile(_axios, serviceName, [
        uploadedFile,
      ]);
      if (fileIds.length > 0) {
        setValue('logo', fileIds[0]);
        setDataFileIds((prev) => [...prev, ...fileIds]);
        setValue('dataFileIds', [...dataFileIds, ...fileIds]);
        setImages((prev) => [...prev, uploadedFile]);
        // toast.success('فایل با موفقیت آپلود شد.');
      } else toast.error('خطا در آپلود فایل.');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('خطا در آپلود فایل.');
    }
  };

  const handleImageDelete = (index: number) => {
    const updatedFiles = images.filter((_, i) => i !== index);
    const removedFileId = dataFileIds[index];

    setImages(updatedFiles);
    setDataFileIds((prev) => prev.filter((_, i) => i !== index));
    setValue(
      'dataFileIds',
      dataFileIds.filter((_, i) => i !== index)
    );
    if (imageRef.current) {
      imageRef.current.value = '';
    }
    setValue('logo', '');
  };

  return (
    <FormGroup
      title="لوگو همایش"
      description="لوگو همایش خود را اینجا آپلود کنید"
      className={cn(className)}
    >
      <div className="mb-5 @3xl:col-span-2">
        {images.length ? (
          <div
            className={cn(
              'mb-5 grid gap-5',
              images.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
            )}
          >
            {images?.map((file: File, index: number) => (
              <div
                key={file.name}
                className={cn(
                  'group relative min-h-[80px] w-full overflow-hidden rounded-md first:min-h-[300px] xs:min-h-[144px] xs:first:min-h-[424px]',
                  images.length !== 2 && 'first:col-span-3'
                )}
              >
                <div className="absolute left-0 top-0 z-50 h-full w-full bg-black bg-opacity-40 opacity-0 backdrop-blur-md  transition-all group-hover:opacity-100 dark:bg-opacity-20"></div>
                <Image
                  src={URL.createObjectURL(file)}
                  className="aspect-[193/144] object-cover"
                  priority
                  alt="Profile avatar"
                  sizes="(max-width: 768px) 100vw"
                  fill
                />
                <ActionIcon
                  onClick={() => handleImageDelete(index)}
                  size="sm"
                  variant="flat"
                  color="danger"
                  className="invisible absolute right-5 top-5 z-50 ms-auto flex-shrink-0 bg-gray-0 p-0 opacity-0 transition-all hover:enabled:bg-white group-hover:visible group-hover:opacity-100"
                >
                  <PiTrashBold className="w-6" />
                </ActionIcon>
              </div>
            ))}
          </div>
        ) : null}
        {images && images?.length > 0 ? (
          <></>
        ) : (
          <div>
            <Upload
              label={''}
              ref={imageRef}
              // multiple
              accept="img"
              iconClassName="w-28 h-auto"
              onChange={handleImageUpload}
              className="mb-5 min-h-[200px] justify-center border-dashed bg-gray-50"
            />
          </div>
        )}
      </div>
    </FormGroup>
  );
}
