import dynamic from 'next/dynamic';
import PencilIcon from '@/components/icons/pencil';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import { ActionIcon, Button, Text } from 'rizzui';
import { HiXMark } from 'react-icons/hi2';
import ProductAvailability from './product-availability';
import ProductAccordion from './product-accordion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ProductMediaProps {
  className?: string;
}

export default function ProductMedia({ className }: ProductMediaProps) {
  const {
    control,
    formState: { errors },
    register,
    watch,
    getValues,
  } = useFormContext();

  const {
    fields: products,
    append: appendProduct,
    remove: removeProduct,
    update: updateProduct,
  } = useFieldArray({ control, name: 'products' });

  const {
    fields: outSourcedProducts,
    append: appendOutSourcedProduct,
    remove: removeOutSourcedProduct,
    update: updateOutSourcedProduct,
  } = useFieldArray({ control, name: 'outSourcedProducts' });

  const [modalState, setModalState] = useState({ isOpen: false, type: 0 });
  const watchedProductAvailability = watch('productAvailability', '2');

  // Function to handle image selection/upload - would need to be implemented based on your backend
  const handleImageSelection = async (index, files) => {
    // This is a placeholder - implement your actual image upload logic here
    console.log("Uploading files for product index", index, files);
    
    // Return some kind of identifiers for the uploaded files
    // In a real implementation, this would call your upload API and return the file IDs
    return files.map((file, i) => ({
      id: `temp-${Date.now()}-${i}`,
      name: file.name,
      filePath: URL.createObjectURL(file)
    }));
  };

  return (
    <FormGroup
      title="مدیریت محصولات و خدمات"
      description="محصولات و خدمات شرکت خود را ثبت کنید"
      className={cn(className)}
    >
      <ProductAvailability />

      {/* Preview Buttons */}
      {watchedProductAvailability === '1' ? (
        <>
          <Textarea label="عنوان محصولات (خدمات)" {...register('productTitles')} error={errors.productTitles?.message as string} rows={3} />
          <Textarea label="توضیحات محصولات (خدمات)" {...register('productsDescription')} error={errors.productsDescription?.message as string} rows={3} />
          <Textarea label="عنوان محصولات برون‌سپاری" {...register('outSourcedProductTitles')} error={errors.outSourcedProductTitles?.message as string} rows={3} />
        </>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Fixed button 1 - Better padding and height control */}
          <div className="flex flex-col items-stretch p-8 bg-white rounded-lg shadow">
            <Button
              variant="outline"
              color="secondary"
              className="w-full h-auto min-h-16 px-4 py-6 text-base font-medium text-center break-words flex flex-col items-center justify-center"
              onClick={() => setModalState({ isOpen: true, type: 0 })}
            >
              <span className="block">محصولات و خدمات</span>
            </Button>
            <Text className="mt-4 text-sm text-gray-500 text-center">ثبت شده: {products.length}</Text>
          </div>
          
          {/* Fixed button 2 - Better padding and height control */}
          <div className="flex flex-col items-stretch p-8 bg-white rounded-lg shadow">
            <Button
              variant="outline"
              color="secondary"
              className="w-full h-auto min-h-16 px-4 py-6 text-base font-medium text-center break-words flex flex-col items-center justify-center"
              onClick={() => setModalState({ isOpen: true, type: 1 })}
            >
              <span className="block">محصولات برون‌سپاری‌شده</span>
            </Button>
            <Text className="mt-4 text-sm text-gray-500 text-center">ثبت شده: {outSourcedProducts.length}</Text>
          </div>
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        className="flex items-center justify-center p-4"
      >
        <div className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
          <div className="flex justify-between items-center border-b px-6 py-4">
            <Text className="text-lg font-semibold">{modalState.type === 1 ? 'محصولات برون‌سپاری‌شده' : 'محصولات و خدمات'}</Text>
            <ActionIcon size="lg" onClick={() => setModalState({ ...modalState, isOpen: false })}>
              <HiXMark className="h-6 w-6" />
            </ActionIcon>
          </div>
          <div className="px-6 py-5 overflow-auto flex-1">
            <ProductAccordion
              products={modalState.type === 1 ? outSourcedProducts : products}
              append={modalState.type === 1 ? appendOutSourcedProduct : appendProduct}
              remove={modalState.type === 1 ? removeOutSourcedProduct : removeProduct}
              update={modalState.type === 1 ? updateOutSourcedProduct : updateProduct}
              handleImageSelection={handleImageSelection}
              dataObjectName={modalState.type === 1 ? 'outSourcedProducts' : 'products'}
            />
          </div>
        </div>
      </Modal>
    </FormGroup>
  );
}

// You'll need to implement or import Modal component if it's not already available
const Modal = ({ isOpen, onClose, children, className }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" onClick={onClose} />
        <div className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 ${className}`}>
          {children}
        </div>
      </div>
    </div>
  );
};