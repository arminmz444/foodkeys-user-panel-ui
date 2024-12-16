import { useFormContext, useFieldArray } from 'react-hook-form';
import { useState } from 'react';
import { Button } from 'rizzui';
import Upload from '@/components/ui/upload';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import _axios from '@/utils/axios-instance';

interface GalleryUploadProps {
  fileServiceType: string; // e.g. 'CONTACT_PICTURE', 'CERTIFICATE', etc.
  registerName: string; // e.g. 'gallery.contacts', 'gallery.catalog'
  isArray?: boolean; // true if it's an array field (like contacts)
}

async function uploadGalleryFile(
  fileServiceType: string,
  files: File[]
): Promise<any[]> {
  const tempUploadFormData = new FormData();
  files.forEach((file) => tempUploadFormData.append('files', file));
  tempUploadFormData.append('fileServiceType', fileServiceType);

  const response = await _axios.post(
    'https://foodkeys-api-dev.liara.run/api/v1/client/panel/company/file/temp',
    tempUploadFormData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  if (response.status === 200 && response.data?.data) {
    return response.data.data;
  }

  return [];
}

function GalleryItemUpload({
  registerName,
  index,
  fileServiceType,
  onUpload,
}: {
  registerName: string;
  index: number;
  fileServiceType: string;
  onUpload: (index: number, files: File[]) => Promise<void>;
}) {
  const { watch, register } = useFormContext();
  const currentItem = watch(`${registerName}.${index}`);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter((f) =>
      f.type.includes('image')
    );
    if (files.length > 0) {
      await onUpload(index, files);
    }
  };

  return (
    <div className="my-2">
      <Upload
        label="آپلود تصویر"
        accept="image/*"
        multiple={false}
        onChange={handleFileChange}
      />
      {currentItem?.uploadedFileId && (
        <p className="text-green-500 text-sm">تصویر با موفقیت آپلود شد.</p>
      )}
      <input
        type="hidden"
        {...register(`${registerName}.${index}.uploadedFileId`)}
      />
    </div>
  );
}

function GallerySingleUpload({
  registerName,
  fileServiceType,
  onUpload,
}: {
  registerName: string;
  fileServiceType: string;
  onUpload: (files: File[]) => Promise<void>;
}) {
  const { watch, register, setValue } = useFormContext();
  const currentItem = watch(registerName);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter((f) =>
      f.type.includes('image')
    );
    if (files.length > 0) {
      await onUpload(files);
    }
  };

  return (
    <div className="my-2">
      <Upload
        label="آپلود تصویر کاتالوگ"
        accept="image/*"
        multiple={false}
        onChange={handleFileChange}
      />
      {currentItem?.uploadedFileId && (
        <p className="text-green-500 text-sm">
          تصویر کاتالوگ با موفقیت آپلود شد.
        </p>
      )}
      <input type="hidden" {...register(`${registerName}.uploadedFileId`)} />
    </div>
  );
}

export default function GalleryForm() {
  const { control, setValue, getValues, register } = useFormContext();

  const { fields: contactFields, append: appendContact } = useFieldArray({
    control,
    name: 'gallery.contacts',
  });

  const { fields: certificateFields, append: appendCertificate } =
    useFieldArray({
      control,
      name: 'gallery.certificates',
    });

  const { fields: productFields, append: appendGalleryProduct } = useFieldArray(
    {
      control,
      name: 'gallery.products',
    }
  );

  const { fields: sliderFields, append: appendSlider } = useFieldArray({
    control,
    name: 'gallery.slider',
  });

  const { fields: documentFields, append: appendDocument } = useFieldArray({
    control,
    name: 'gallery.documents',
  });

  const handleArrayItemUpload = (
    registerName: string,
    fileServiceType: string
  ) => {
    return async (index: number, files: File[]) => {
      const uploaded = await uploadGalleryFile(fileServiceType, files);
      if (uploaded.length > 0) {
        // For simplicity, assume first uploaded file is used
        const fileId = uploaded[0].id;
        setValue(`${registerName}.${index}.uploadedFileId`, fileId);
        setValue(`${registerName}.${index}.removedFileIds`, []);
      }
    };
  };

  const handleSingleUpload = (
    registerName: string,
    fileServiceType: string
  ) => {
    return async (files: File[]) => {
      const uploaded = await uploadGalleryFile(fileServiceType, files);
      if (uploaded.length > 0) {
        const fileId = uploaded[0].id;
        setValue(`${registerName}.uploadedFileId`, fileId);
        setValue(`${registerName}.removedFileIds`, []);
      }
    };
  };

  return (
    <div>
      <h2 className="text-lg font-medium">گالری</h2>

      <h3 className="mt-4 font-medium">مدیران و مسئولین (contacts)</h3>
      {contactFields.map((field, index) => (
        <div key={field.id}>
          <Input label="نام" {...register(`gallery.contacts.${index}.name`)} />
          <Input
            label="نام خانوادگی"
            {...register(`gallery.contacts.${index}.lastName`)}
          />
          <Input
            label="ایمیل"
            {...register(`gallery.contacts.${index}.email`)}
          />
          <Input
            label="تلفن"
            {...register(`gallery.contacts.${index}.phone`)}
          />
          <Input
            label="موقعیت"
            {...register(`gallery.contacts.${index}.position`)}
          />
          <Input
            label="اولویت"
            type="number"
            {...register(`gallery.contacts.${index}.priority`)}
          />
          <GalleryItemUpload
            registerName="gallery.contacts"
            index={index}
            fileServiceType="COMPANY_CONTACT_PICTURE"
            onUpload={handleArrayItemUpload(
              'gallery.contacts',
              'CONTACT_PICTURE'
            )}
          />
        </div>
      ))}
      <Button
        onClick={() =>
          appendContact({
            name: '',
            lastName: '',
            email: '',
            phone: '',
            position: '',
            priority: 2,
          })
        }
      >
        افزودن عضو جدید
      </Button>

      <h3 className="mt-4 font-medium">
        افتخارات و گواهینامه‌ها (certificates)
      </h3>
      {certificateFields.map((field, index) => (
        <div key={field.id}>
          <Input
            label="نام"
            {...register(`gallery.certificates.${index}.name`)}
          />
          <Textarea
            label="توضیحات"
            {...register(`gallery.certificates.${index}.description`)}
          />
          <Input
            label="اولویت"
            type="number"
            {...register(`gallery.certificates.${index}.priority`)}
          />
          <GalleryItemUpload
            registerName="gallery.certificates"
            index={index}
            fileServiceType="COMPANY_CERTIFICATE"
            onUpload={handleArrayItemUpload(
              'gallery.certificates',
              'CERTIFICATE'
            )}
          />
        </div>
      ))}
      <Button onClick={() => appendCertificate({})}>افزودن گواهینامه</Button>

      <h3 className="mt-4 font-medium">محصولات (products)</h3>
      {productFields.map((field, index) => (
        <div key={field.id}>
          <Input label="نام" {...register(`gallery.products.${index}.name`)} />
          <Textarea
            label="توضیحات"
            {...register(`gallery.products.${index}.description`)}
          />
          <Input
            label="اولویت"
            type="number"
            {...register(`gallery.products.${index}.priority`)}
          />
          <GalleryItemUpload
            registerName="gallery.products"
            index={index}
            fileServiceType="COMPANY_PRODUCT_SLIDER_IMAGE"
            onUpload={handleArrayItemUpload(
              'gallery.products',
              'PRODUCT_PICTURE'
            )}
          />
        </div>
      ))}
      <Button onClick={() => appendGalleryProduct({})}>افزودن محصول</Button>

      <h3 className="mt-4 font-medium">اسلایدر (slider)</h3>
      {sliderFields.map((field, index) => (
        <div key={field.id}>
          <Input label="عنوان" {...register(`gallery.slider.${index}.title`)} />
          <Textarea
            label="توضیحات"
            {...register(`gallery.slider.${index}.description`)}
          />
          <Input
            label="اولویت"
            type="number"
            {...register(`gallery.slider.${index}.priority`)}
          />
          <GalleryItemUpload
            registerName="gallery.slider"
            index={index}
            fileServiceType="COMPANY_BACKGROUND_IMAGE"
            onUpload={handleArrayItemUpload('gallery.slider', 'SLIDER_IMAGE')}
          />
        </div>
      ))}
      <Button onClick={() => appendSlider({})}>افزودن اسلایدر</Button>

      <h3 className="mt-4 font-medium">کاتالوگ (catalog) - single object</h3>
      <Input label="عنوان" {...register(`gallery.catalog.title`)} />
      <Textarea label="توضیحات" {...register(`gallery.catalog.description`)} />
      <Input
        label="اولویت"
        type="number"
        {...register(`gallery.catalog.priority`)}
      />
      <GallerySingleUpload
        registerName="gallery.catalog"
        fileServiceType="COMPANY_CATALOG"
        onUpload={handleSingleUpload('gallery.catalog', 'CATALOG_FILE')}
      />

      <h3 className="mt-4 font-medium">اسناد دیگر (documents)</h3>
      {documentFields.map((field, index) => (
        <div key={field.id}>
          <Input
            label="عنوان"
            {...register(`gallery.documents.${index}.title`)}
          />
          <Textarea
            label="توضیحات"
            {...register(`gallery.documents.${index}.description`)}
          />
          <Input
            label="اولویت"
            type="number"
            {...register(`gallery.documents.${index}.priority`)}
          />
          <GalleryItemUpload
            registerName="gallery.documents"
            index={index}
            fileServiceType="COMPANY_DOCUMENT"
            onUpload={handleArrayItemUpload(
              'gallery.documents',
              'DOCUMENT_FILE'
            )}
          />
        </div>
      ))}
      <Button onClick={() => appendDocument({})}>افزودن سند</Button>
    </div>
  );
}
