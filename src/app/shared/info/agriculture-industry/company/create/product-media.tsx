'use client';
import PencilIcon from '@/components/icons/pencil';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import { Radio } from '@/components/ui/radio';
import TrashIcon from '@/components/icons/trash';
import Upload from '@/components/ui/upload';
import { ActionIcon, Button, Checkbox, Modal, Password, Text } from 'rizzui';
import { HiXMark } from 'react-icons/hi2';
import { PiTagBold, PiXBold } from 'react-icons/pi';
import ProductPricing from '@/app/shared/info/food-industry/company/create/product-pricing';
import ProductAvailability from '@/app/shared/info/food-industry/company/create/product-availability';
import { inter } from '@/app/fonts';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ProductMediaProps {
  className?: string;
}

interface ProductSchema {
  name: string;
  description: string;
  categoryType: string;
}

export default function ProductMedia({ className }) {
  const {
    control,
    formState: { errors },
    register,
    getValues,
    watch,
  } = useFormContext();

  //   const {
  //     fields: products,
  //     append,
  //     remove,
  //     update,
  //   } = useFieldArray({
  //     control,
  //     name: 'products',
  //   });

  const {
    fields: products,
    append: appendProduct,
    remove: removeProduct,
    update: updateProduct,
  } = useFieldArray({
    control,
    name: 'products',
  });

  const {
    fields: outSourcedProducts,
    append: appendOutSourcedProduct,
    remove: removeOutSourcedProduct,
    update: updateOutSourcedProduct,
  } = useFieldArray({
    control,
    name: 'outSourcedProducts',
  });

  async function uploadProductPictures(files: File[]): Promise<string[]> {
    const tempUploadFormData = new FormData();
    files.forEach((file) => tempUploadFormData.append('files', file));
    tempUploadFormData.append('fileServiceType', 'PRODUCT_PICTURE');

    const response = await _axios.post(
      'https://back.agfo.ir/api/v1/client/panel/file/temp',
      tempUploadFormData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (response.status === 200 && response.data?.data) {
      const uuids = response.data.data;
      console.log('uuids: ' + JSON.stringify(uuids));
      return uuids;
    }

    return [];
  }

  const handleProductImageSelection = async (
    productIndex: number,
    files: File[]
  ) => {
    const uuids = await uploadProductPictures(files);
    updateProduct(productIndex, {
      ...products[productIndex],
      uploadedFileIds: [
        ...(products[productIndex]?.uploadedFileIds || []),
        ...uuids,
      ]?.map((p) => p.id),
      outsourced: false,
      removedFileIds: [],
      pictures: [...(products[productIndex].pictures || []), ...uuids],
    });
    console.log('products after update: ' + JSON.stringify(products));
    return uuids;
  };

  const handleOutSourcedProductImageSelection = async (
    productIndex: number,
    files: File[]
  ) => {
    const uuids = await uploadProductPictures(files);
    updateOutSourcedProduct(productIndex, {
      ...outSourcedProducts[productIndex],
      uploadedFileIds: [
        ...(outSourcedProducts[productIndex]?.uploadedFileIds || []),
        ...uuids,
      ]?.map((p) => p.id),
      removedFileIds: [],
      outsourced: true,
      pictures: [
        ...(outSourcedProducts[productIndex].pictures || []),
        ...uuids,
      ],
    });
    console.log(
      'Out-Sourced products after update: ' + JSON.stringify(outSourcedProducts)
    );
    return uuids;
  };

  const [modalState, setModalState] = useState({
    isOpen: false,
    size: 'md',
    type: 0,
  });
  const watchedProductAvailability = watch('productAvailability', '2');
  return (
    <FormGroup
      title="مدیریت محصولات و خدمات"
      description="محصولات و خدمات شرکت خود را ثبت کنید"
      className={cn(className)}
    >
      <ProductAvailability />
      {watchedProductAvailability === '1' ? (
        <>
          <Textarea
            label="عنوان محصولات (خدمات)"
            placeholder="عنوان محصولات (خدمات)"
            {...register('productTitles')}
            error={errors.productTitles?.message as string}
            className="col-span-full w-full"
            rows={3}
          />
          <Textarea
            label="توضیحات محصولات (خدمات)"
            placeholder="توضیحات محصولات (خدمات)"
            {...register('productsDescription')}
            error={errors.productsDescription?.message as string}
            className="col-span-full w-full"
            rows={3}
          />
          <Textarea
            label="عنوان محصولات برون‌سپاری"
            placeholder="عنوان محصولات برون‌سپاری"
            {...register('outSourcedProductTitles')}
            error={errors.outSourcedProductTitles?.message as string}
            className="col-span-full w-full"
            rows={3}
          />
          <Textarea
            label="توضیحات محصولات برون‌سپاری"
            placeholder="توضیحات محصولات برون‌سپاری"
            {...register('outSourcedProductsDescription')}
            error={errors.outSourcedProductsDescription?.message as string}
            className="col-span-full w-full"
            rows={3}
          />
        </>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            <div className="flex w-full flex-wrap items-center justify-around gap-2">
              <Button
                variant="outline"
                color="secondary"
                onClick={() =>
                  setModalState((prevState) => ({
                    ...prevState,
                    isOpen: true,
                    size: 'lg',
                    type: 0,
                  }))
                }
              >
                مدیریت محصولات و خدمات
              </Button>
              <Text as="span" className="text-sm text-gray-500">
                ثبت شده: {products.length}
              </Text>
            </div>
            <div className="flex w-full flex-wrap items-center justify-around gap-2">
              <Button
                variant="outline"
                color="secondary"
                onClick={() =>
                  setModalState((prevState) => ({
                    ...prevState,
                    isOpen: true,
                    size: 'lg',
                    type: 1,
                  }))
                }
              >
                مدیریت محصولات برون‌سپاری‌شده
              </Button>
              <Text as="span" className="text-sm text-gray-500">
                ثبت شده: {outSourcedProducts.length}
              </Text>
            </div>
          </div>
        </>
      )}

      <Modal
        isOpen={modalState.isOpen}
        size={modalState.size}
        onClose={() =>
          setModalState((prevState) => ({ ...prevState, isOpen: false }))
        }
      >
        <div className="m-auto max-h-[90vh] overflow-auto px-7 pb-8 pt-6">
          <div className="mb-10 mt-7">
            <ProductAccordion
              products={modalState?.type === 1 ? outSourcedProducts : products}
              append={
                modalState?.type === 1 ? appendOutSourcedProduct : appendProduct
              }
              remove={
                modalState?.type === 1 ? removeOutSourcedProduct : removeProduct
              }
              update={
                modalState?.type === 1 ? updateOutSourcedProduct : updateProduct
              }
              handleImageSelection={
                modalState?.type === 1
                  ? handleOutSourcedProductImageSelection
                  : handleProductImageSelection
              }
              dataObjectName={
                modalState?.type === 1 ? 'outSourcedProducts' : 'products'
              }
            />
          </div>
        </div>
      </Modal>
    </FormGroup>
  );
}

const Swiper = dynamic(() => import('swiper/react').then((mod) => mod.Swiper), {
  ssr: false,
});
const SwiperSlide = dynamic(
  () => import('swiper/react').then((mod) => mod.SwiperSlide),
  { ssr: false }
);

import dynamic from 'next/dynamic';
import { Switch } from '@/components/ui/switch';
import _axios from '@/utils/axios-instance';

export const MultipleFiles = ({
  className,
  label,
  registerName,
  onUpload,
}: {
  className?: string;
  label?: React.ReactNode;
  registerName: string;
  onUpload: Function;
}) => {
  console.log('Register Name: ' + registerName);
  const { register, setValue, watch } = useFormContext();
  const multiRef = useRef<HTMLInputElement>(null);
  const [multiImages, setMultiImages] = useState<Array<File>>(
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
        <>
          <Swiper
            spaceBetween={10}
            slidesPerView={2}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
          >
            {multiImages.map((file, index) => (
              <SwiperSlide
                key={file?.name || file?.id || Math.random().toString()}
              >
                <div className="relative mt-2">
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
                    width={500}
                    height={500}
                    objectFit="contain"
                  />
                  <button
                    onClick={() => handleMultiImageDelete(index)}
                    className="bg-red-500 absolute right-0 top-0 m-2 rounded-full p-1 text-white"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
                {/* <div className="mt-4">
                  <Input placeholder="عنوان جایگزین" />
                </div> */}
              </SwiperSlide>
            ))}
          </Swiper>
          <input type="hidden" {...register(registerName)} />
        </>
      )}
    </div>
  );
};

interface ItemCrudProps {
  name: string;
  items: string[];
  setItems: React.Dispatch<React.SetStateAction<string[]>>;
  registerName: string;
}

function ItemCrud({ name, items, setItems, registerName }) {
  const { setValue } = useFormContext();
  const [itemText, setItemText] = useState('');

  function handleItemAdd() {
    if (itemText.trim() !== '') {
      const newItem = itemText.trim();
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      setValue(registerName, updatedItems);
      setItemText('');
    }
  }

  function handleItemRemove(text) {
    const updatedItems = items.filter((item) => item !== text);
    setItems(updatedItems);
    setValue(registerName, updatedItems);
  }

  return (
    <div>
      <div className="flex items-center">
        <Input
          value={itemText}
          placeholder={`${name} وارد کنید`}
          onChange={(e) => setItemText(e.target.value)}
          prefix={<PiTagBold className="h-4 w-4" />}
          className="w-full"
        />
        <Button onClick={handleItemAdd} className="ms-4 shrink-0 text-sm">
          افزودن
        </Button>
      </div>

      {items.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {items.map((text, index) => (
            <div
              key={index}
              className="flex items-center rounded-full border border-gray-300 py-1 pe-2.5 ps-3 text-sm font-medium text-gray-700"
            >
              {text}
              <button
                onClick={() => handleItemRemove(text)}
                className="ps-2 text-gray-500 hover:text-gray-900"
              >
                <PiXBold className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const ProductAccordion = ({
  products,
  append,
  remove,
  update,
  handleImageSelection,
  dataObjectName,
}) => {
  const { control, register } = useFormContext();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [tempProductData, setTempProductData] = useState(
    products.map((product: { pictures: any }) => ({
      ...product,
      uploadedFileIds: [...(product?.uploadedFileIds || [])]?.map((p) => p.id),
      removedFileIds: [],
      pictures: product.pictures || [],
    }))
  );

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleInputChange = (index: number, field: string, value: any) => {
    setTempProductData((prevData: any) => {
      const updatedData = [...prevData];
      updatedData[index] = {
        ...updatedData[index],
        [field]: value,
      };
      return updatedData;
    });
  };

  const handleProductImageSelection = async (index: number, files: File[]) => {
    const uuids = await handleImageSelection(index, files);
    setTempProductData((prevData: any) => {
      const updatedData = [...prevData];
      updatedData[index] = {
        ...updatedData[index],
        uploadedFileIds: [
          ...(updatedData[index]?.uploadedFileIds || []),
          ...uuids,
        ]?.map((p) => p.id),
        removedFileIds: [],
        pictures: [...(updatedData[index].pictures || []), ...uuids],
      };
      return updatedData;
    });
  };

  const handleSaveChanges = (index: number) => {
    const updatedProduct = { ...tempProductData[index] };
    updatedProduct.pictures = tempProductData[index].pictures || [];
    updatedProduct.uploadedFileIds =
      tempProductData[index].uploadedFileIds || [];
    updatedProduct.removedFileIds = tempProductData[index].removedFileIds || [];
    console.log('Temp Product Data: ' + JSON.stringify(tempProductData));
    console.log('Index: ' + index);
    console.log('Updated Product: ' + JSON.stringify(updatedProduct));
    update(index, updatedProduct);
  };

  return (
    <>
      <div className="w-full max-w-full rounded-lg bg-white shadow-md">
        {products.map((field, index) => (
          <div key={field.id}>
            <button
              className="flex w-full items-center justify-between p-4 transition hover:bg-gray-50 focus:outline-none"
              onClick={() => toggleAccordion(index)}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                  {/* Optional icon or image */}
                </div>
                <div>
                  <h3 className="text-base font-medium">
                    {tempProductData[index]?.name || 'محصول جدید'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {tempProductData[index]?.categoryType || 'سایر'}
                  </p>
                </div>
              </div>
              <span className="text-gray-500">
                {openIndex === index ? '▲' : '▼'}
              </span>
            </button>

            <div
              className={`transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-fit' : 'max-h-0 overflow-hidden'
              }`}
            >
              <div className="p-4">
                <div className="grid grid-cols-12 gap-x-5 gap-y-6">
                  <Input
                    label="عنوان محصول *"
                    inputClassName="border-2"
                    size="lg"
                    className="col-span-12 lg:col-span-6"
                    value={tempProductData[index]?.name || ''}
                    onChange={(e) =>
                      handleInputChange(index, 'name', e.target.value)
                    }
                    // {...register(`${dataObjectName}.${index}.name`)}
                  />
                  <Input
                    label="دسته بندی محصول *"
                    inputClassName="border-2"
                    size="lg"
                    className="col-span-12 lg:col-span-6"
                    value={tempProductData[index]?.categoryType || ''}
                    onChange={(e) =>
                      handleInputChange(index, 'categoryType', e.target.value)
                    }
                    // {...register(`${dataObjectName}.${index}.categoryType`)}
                  />
                  <Textarea
                    label="توضیحات محصول"
                    className="col-span-full"
                    rows={3}
                    value={tempProductData[index]?.description || ''}
                    onChange={(e) =>
                      handleInputChange(index, 'description', e.target.value)
                    }
                    // {...register(`${dataObjectName}.${index}.description`)}
                  />
                  <Controller
                    name="showProduct"
                    control={control}
                    render={({ field: { value } }) => (
                      <Switch
                        label="نمایش محصول"
                        className="col-span-full"
                        switchClassName="dark:border-gray-400 "
                        handlerClassName="dark:bg-gray-400"
                        checked={tempProductData[index]?.showProduct || false}
                        onChange={(e) => {
                          handleInputChange(
                            index,
                            'showProduct',
                            e.target.checked
                          );
                        }}
                        // {...register(`${dataObjectName}.${index}.showProduct`)}
                      />
                    )}
                  />
                  <MultipleFiles
                    className="col-span-12"
                    label="تصویر محصول"
                    registerName={`${dataObjectName}.${index}.pictures`}
                    onUpload={
                      (files: any) => handleProductImageSelection(index, files)
                      // handleImageSelection(index, files)
                    }
                  />
                  <div className="col-span-12 mt-2 flex justify-end gap-4">
                    <Button
                      size="lg"
                      className="col-span-2 mt-2"
                      onClick={() => handleSaveChanges(index)}
                    >
                      <PencilIcon className="me-1 h-4 w-4" /> ویرایش
                    </Button>
                    <Button
                      size="lg"
                      className="col-span-2 mt-2 bg-red text-white"
                      onClick={() => remove(index)}
                    >
                      <TrashIcon className="me-1 h-4 w-4" />
                      حذف
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {index < products.length - 1 && <hr className="border-gray-200" />}
          </div>
        ))}
      </div>
      <Button
        variant="solid"
        color="primary"
        onClick={() =>
          append({
            name: '',
            categoryType: '',
            description: '',
            outsourced: dataObjectName === 'outSourcedProducts' ? true : false,
            showProduct: false,
            pictures: [],
          })
        }
        className="mt-4"
      >
        افزودن محصول جدید
      </Button>
    </>
  );
};
