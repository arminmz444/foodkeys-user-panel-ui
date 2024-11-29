'use client';
import PencilIcon from "@/components/icons/pencil";
import {Textarea} from "@/components/ui/textarea";
import Image from 'next/image';
import {useEffect, useRef, useState} from 'react';
import {Controller, useFieldArray, useFormContext} from 'react-hook-form';
import {Input} from '@/components/ui/input';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import {Radio} from '@/components/ui/radio';
import TrashIcon from '@/components/icons/trash';
import Upload from '@/components/ui/upload';
import {ActionIcon, Button, Checkbox, Modal, Password, Text} from 'rizzui';
import {HiXMark} from "react-icons/hi2";
import {PiTagBold, PiXBold} from "react-icons/pi";
import ProductPricing from "@/app/shared/info/food-industry/company/create/product-pricing";
import ProductAvailability from "@/app/shared/info/food-industry/company/create/product-availability";
import {inter} from "@/app/fonts";

interface ProductMediaProps {
    className?: string;
}

interface ProductSchema {
    name: string;
    description: string;
    categoryType: string;
}

// export default function ProductMedia({className}: ProductMediaProps) {
//     const {
//         register,
//         control,
//         formState: {errors},
//         watch
//     } = useFormContext();
//     const [modalState, setModalState] = useState({
//         isOpen: false,
//         size: "md",
//     });
//     const [tags, setTags] = useState<string[]>([]);
//     const [keywords, setKeywords] = useState<string[]>([]);
//     const [products, setProducts] = useState<ProductSchema[]>([]);
//
//     const watchedProducts = watch('products', []);
//
//     useEffect(() => {
//         if (watchedProducts && watchedProducts.length) {
//             setProducts(watchedProducts);
//         }
//
//     }, [watchedProducts]);
//
//     return (
//         <FormGroup
//             title="مدیریت محصولات و خدمات"
//             description="محصولات و خدمات شرکت خود را ثبت کنید"
//             className={cn(className)}
//         >
//             <Textarea
//                 label="عنوان محصولات (خدمات)"
//                 placeholder="عنوان محصولات (خدمات)"
//                 {...register('productsTitle')}
//                 error={errors.productsTitle?.message as string}
//                 className="col-span-full"
//                 rows={5}
//             />
//             <div className="flex flex-col gap-4">
//                 <div className="flex items-center justify-around gap-2 flex-wrap w-full">
//                     <Button
//                         variant="outline"
//                         color="secondary"
//                         onClick={() =>
//                             setModalState((prevState) => ({
//                                 ...prevState,
//                                 isOpen: true,
//                                 size: "lg",
//                             }))
//                         }
//                     >
//                         مدیریت محصولات و خدمات
//                     </Button>
//                     <Text as="span" className="text-sm text-gray-500">
//                         ثبت شده: 0
//                     </Text>
//                     {/* Uncomment if needed */}
//                     {/*<Button*/}
//                     {/*    variant="solid"*/}
//                     {/*    color="primary"*/}
//                     {/*    onClick={() =>*/}
//                     {/*        setModalState((prevState) => ({*/}
//                     {/*            ...prevState,*/}
//                     {/*            isOpen: true,*/}
//                     {/*            size: "xl",*/}
//                     {/*        }))*/}
//                     {/*    }*/}
//                     {/*>*/}
//                     {/*    افزودن محصول جدید*/}
//                     {/*</Button>*/}
//                 </div>
//                 <div className="flex items-center justify-around gap-2 flex-wrap w-full">
//                     <Button
//                         variant="outline"
//                         color="secondary"
//                         onClick={() =>
//                             setModalState((prevState) => ({
//                                 ...prevState,
//                                 isOpen: true,
//                                 size: "lg",
//                             }))
//                         }
//                     >
//                         مدیریت محصولات برون‌سپاری شده
//                     </Button>
//                     <Text as="span" className="text-sm text-gray-500">
//                         ثبت شده: 0
//                     </Text>
//                     {/* Uncomment if needed */}
//                     {/*<Button*/}
//                     {/*    variant="solid"*/}
//                     {/*    color="primary"*/}
//                     {/*    onClick={() =>*/}
//                     {/*        setModalState((prevState) => ({*/}
//                     {/*            ...prevState,*/}
//                     {/*            isOpen: true,*/}
//                     {/*            size: "xl",*/}
//                     {/*        }))*/}
//                     {/*    }*/}
//                     {/*>*/}
//                     {/*    افزودن محصول جدید*/}
//                     {/*</Button>*/}
//                 </div>
//             </div>
//             <ProductAvailability />
//             <Modal
//                 isOpen={modalState.isOpen}
//                 size={modalState.size}
//                 onClose={() =>
//                     setModalState((prevState) => ({...prevState, isOpen: false}))
//                 }
//             >
//                 <div className="m-auto px-7 pt-6 pb-8">
//                     <div className="mb-7 flex items-center justify-between">
//                         <h3>محصولات و خدمات شرکت شما</h3>
//                         <ActionIcon
//                             size="sm"
//                             variant="text"
//                             onClick={() =>
//                                 setModalState((prevState) => ({...prevState, isOpen: false}))
//                             }
//                         >
//                             <HiXMark className="h-auto w-6" strokeWidth={1.8}/>
//                         </ActionIcon>
//                     </div>
//                     <div className="mt-7 mb-10">
//                         <ProductAccordion products={products} setProducts={setProducts}/>
//                     </div>
//                     <div className="grid grid-cols-2 gap-y-6 gap-x-5 [&_label>span]:font-medium">
//                         <Input label="عنوان محصول *" inputClassName="border-2 col-span-2" size="lg"/>
//                         {/*<Input label="نوع محصول *" inputClassName="border-2" size="lg"/>*/}
//                         <Input
//                             label="دسته بندی محصول *"
//                             inputClassName="border-2"
//                             size="lg"
//                             // className="col-span-2"
//                         />
//                         <Textarea
//                             label="توضیحات محصول"
//                             // placeholder="عنوان محصولات (خدمات)"
//                             className="col-span-full"
//                             rows={3}
//                         />
//                         <Checkbox
//                             size="lg"
//                             inputClassName="border-2"
//                             className="col-span-2"
//                             label={
//                                 <Text className="text-sm">
//                                     نمایش محصول
//                                     {/*I agree to RizzUI&lsquo;s{" "}*/}
//                                     {/*<a className="underline">Terms of Service</a> and{" "}*/}
//                                     {/*<a className="underline">Privacy Policy</a>*/}
//                                 </Text>
//                             }
//                         />
//                         <div className="col-span-full grid grid-cols-1 gap-4 xl:grid-cols-2">
//                             <ItemCrud name="تگ" items={tags} setItems={setTags} registerName="tags"/>
//                             <ItemCrud name="کلمه کلیدی" items={keywords} setItems={setKeywords}
//                                       registerName="keywords"/>
//                         </div>
//                         <MultipleFiles className="col-span-2" label="تصویر محصول"/>
//
//                         <Button
//                             type="submit"
//                             size="lg"
//                             className="col-span-2 mt-2"
//                             onClick={() =>
//                                 setModalState((prevState) => ({...prevState, isOpen: false}))
//                             }
//                         >
//                             ثبت محصول
//                         </Button>
//                     </div>
//                 </div>
//             </Modal>
//         </FormGroup>
//     );
// }
export default function ProductMedia({className}) {
    const {
        control,
        formState: {errors},
        register,
        getValues,
        watch
    } = useFormContext();

    const {fields: products, append, remove, update} = useFieldArray({
        control,
        name: 'products',
    });

    const [modalState, setModalState] = useState({
        isOpen: false,
        size: 'md',
    });
    const watchedProductAvailability = watch('productAvailability', "2");
    return (
        <FormGroup
            title="مدیریت محصولات و خدمات"
            description="محصولات و خدمات شرکت خود را ثبت کنید"
            className={cn(className)}
        >
            <ProductAvailability/>
            {watchedProductAvailability === "1" ? (
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
                </>) : <>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-around gap-2 flex-wrap w-full">
                        <Button
                            variant="outline"
                            color="secondary"
                            onClick={() =>
                                setModalState((prevState) => ({
                                    ...prevState,
                                    isOpen: true,
                                    size: 'lg',
                                }))
                            }
                        >
                            مدیریت محصولات و خدمات
                        </Button>
                        <Text as="span" className="text-sm text-gray-500">
                            ثبت شده: {products.length}
                        </Text>
                    </div>
                    <div className="flex items-center justify-around gap-2 flex-wrap w-full">
                        <Button
                            variant="outline"
                            color="secondary"
                            onClick={() =>
                                setModalState((prevState) => ({
                                    ...prevState,
                                    isOpen: true,
                                    size: 'lg',
                                }))
                            }
                        >
                            مدیریت محصولات برون‌سپاری‌شده
                        </Button>
                        <Text as="span" className="text-sm text-gray-500">
                            ثبت شده: {products.length}
                        </Text>
                    </div>
                </div>
            </>}


            {/*<Modal*/}
            {/*    isOpen={modalState.isOpen}*/}
            {/*    size={modalState.size}*/}
            {/*    onClose={() =>*/}
            {/*        setModalState((prevState) => ({ ...prevState, isOpen: false }))*/}
            {/*    }*/}
            {/*>*/}
            {/*    <div className="m-auto px-7 pt-6 pb-8">*/}
            {/*        <div className="mb-7 flex items-center justify-between">*/}
            {/*            <h3>محصولات و خدمات شرکت شما</h3>*/}
            {/*            <Button*/}
            {/*                size="sm"*/}
            {/*                variant="text"*/}
            {/*                onClick={() =>*/}
            {/*                    setModalState((prevState) => ({ ...prevState, isOpen: false }))*/}
            {/*                }*/}
            {/*            >*/}
            {/*                <HiXMark className="h-auto w-6" strokeWidth={1.8} />*/}
            {/*            </Button>*/}
            {/*        </div>*/}
            {/*        <div className="mt-7 mb-10">*/}
            {/*            <ProductAccordion*/}
            {/*                products={products}*/}
            {/*                append={append}*/}
            {/*                remove={remove}*/}
            {/*                update={update}*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</Modal>*/}
            <Modal
                isOpen={modalState.isOpen}
                size={modalState.size}
                onClose={() =>
                    setModalState((prevState) => ({...prevState, isOpen: false}))
                }
            >
                <div className="m-auto px-7 pt-6 pb-8 max-h-[90vh] overflow-auto">
                    {/* ... other modal content */}
                    <div className="mt-7 mb-10">
                        <ProductAccordion
                            products={products}
                            append={append}
                            remove={remove}
                            update={update}
                        />
                    </div>
                    {/* ... other modal content */}
                </div>
            </Modal>
        </FormGroup>
    );
}
// export const MultipleFiles = ({
//                                   className,
//                                   label,
//                               }: {
//     className?: string;
//     label?: React.ReactNode;
// }) => {
//     const multiRef = useRef<HTMLInputElement>(null);
//     const [multiImages, setMultiImages] = useState<Array<File>>([]);
//
//     const handleMultiImageUpload = (
//         event: React.ChangeEvent<HTMLInputElement>
//     ) => {
//         const uploadedFiles = (event.target as HTMLInputElement).files;
//         const newFiles = Object.entries(uploadedFiles as object)
//             .map((file) => {
//                 if (file[1].type.includes('image')) return file[1];
//             })
//             .filter((file) => file !== undefined);
//         setMultiImages((prevFiles) => [...prevFiles, ...newFiles]);
//     };
//
//     const handleMultiImageDelete = (index: number) => {
//         const updatedFiles = multiImages.filter((_, i) => i !== index);
//         setMultiImages(updatedFiles);
//         (multiRef.current as HTMLInputElement).value = '';
//     };
//
//     return (
//         <>
//             <div className={className}>
//                 <Upload
//                     label={label}
//                     ref={multiRef}
//                     accept="img"
//                     multiple
//                     onChange={handleMultiImageUpload}
//                 />
//                 <p className="pt-3 text-sm text-gray-500">
//                     عکس محصول خود را اینجا آپلود کنید حجم عکس باید بیشتر از{' '}
//                     <strong className="font-medium text-gray-900">2 مگابایت باشد</strong>
//                 </p>
//
//                 {multiImages.length > 0 && (
//                     <div className="-mb-3 overflow-x-scroll @xl:mb-0 @xl:overflow-x-hidden">
//                         <div className="min-w-[600px] pb-5 @xl:pb-0">
//                             <div className="mt-7 flex items-center rounded-md border border-gray-300 @2xl:mt-10">
//                                 <div
//                                     className="w-[20%] px-4 py-3.5 text-center text-sm font-semibold text-gray-700 @2xl:py-5">
//                                     تصویر
//                                 </div>
//                                 <div className="w-[55%] px-4 py-3.5 text-sm font-semibold text-gray-700 @2xl:py-5">
//                                     عنوان
//                                 </div>
//                                 <div
//                                     className="w-28 px-4 py-3.5 text-center text-sm font-semibold text-gray-700 @2xl:py-5">
//                                     عکس اصلی
//                                 </div>
//                                 <div
//                                     className="w-20 shrink-0 px-4 py-3.5 text-center text-sm font-semibold text-gray-700 @2xl:py-5">
//                                     حذف
//                                 </div>
//                             </div>
//                             <div className="mt-7 flex flex-row flex-wrap gap-5">
//                                 {multiImages?.map((file: File, index: number) => (
//                                     <div className="flex w-full items-center" key={file.name}>
//                                         <div className="w-[20%] px-4">
//                                             <figure
//                                                 className="relative mx-auto aspect-square w-20 overflow-hidden rounded-xl border border-gray-300 @2xl:w-28">
//                                                 <Image
//                                                     src={URL.createObjectURL(file)}
//                                                     alt={file.name}
//                                                     fill
//                                                     priority
//                                                     sizes="(max-width: 768px) 100vw"
//                                                 />
//                                             </figure>
//                                         </div>
//                                         <div className="w-[55%] px-4">
//                                             <Input
//                                                 // label="متن جایگزین"
//                                                 placeholder="عنوان"
//                                                 // {...register('title')}
//                                                 // error={errors.title?.message}
//                                             />
//                                         </div>
//                                         <div className="flex w-28 items-center justify-center px-4">
//                                             <Radio
//                                                 value="NotTrackInventoryProduct"
//                                                 inputClassName="dark:checked:!bg-gray-200 dark:checked:!border-gray-200 dark:focus:ring-gray-200 dark:focus:ring-offset-gray-0"
//                                             />
//                                         </div>
//                                         <div className="flex w-20 shrink-0 items-center justify-center px-4">
//                                             <TrashIcon
//                                                 onClick={() => handleMultiImageDelete(index)}
//                                                 className="h-5 w-5 cursor-pointer transition duration-75"
//                                             />
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </>
//
//     );
// };
const Swiper = dynamic(() =>
        import('swiper/react').then((mod) => mod.Swiper),
    {ssr: false}
);
const SwiperSlide = dynamic(() =>
        import('swiper/react').then((mod) => mod.SwiperSlide),
    {ssr: false}
);

import dynamic from "next/dynamic";
import {Switch} from "@/components/ui/switch";

export const MultipleFiles = ({
                                  className,
                                  label,
                                  registerName,
                              }: {
    className?: string;
    label?: React.ReactNode;
    registerName: string;
}) => {
    const {register, setValue, watch} = useFormContext();
    const multiRef = useRef<HTMLInputElement>(null);
    const [multiImages, setMultiImages] = useState<Array<File>>(watch(registerName) || []);

    const handleMultiImageUpload = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const uploadedFiles = Array.from(event.target.files || []);
        const imageFiles = uploadedFiles.filter((file) => file.type.includes('image'));
        const newFiles = [...multiImages, ...imageFiles];
        setMultiImages(newFiles);
        setValue(registerName, newFiles);
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
                        slidesPerView={1}
                        onSwiper={(swiper) => console.log(swiper)}
                        onSlideChange={() => console.log('slide change')}
                    >
                        {multiImages.map((file, index) => (
                            <SwiperSlide key={file.name}>
                                <div className="relative mt-2">
                                    <Image
                                        src={URL.createObjectURL(file)}
                                        alt={file.name}
                                        width={500}
                                        height={500}
                                        objectFit="contain"
                                    />
                                    <button
                                        onClick={() => handleMultiImageDelete(index)}
                                        className="absolute top-0 right-0 m-2 text-white bg-red-500 rounded-full p-1"
                                    >
                                        <TrashIcon className="h-5 w-5"/>
                                    </button>
                                </div>
                                <div className="mt-4">
                                    <Input
                                        placeholder="عنوان جایگزین"
                                    />
                                    {/*<div className="mt-2">*/}
                                    {/*    <Radio*/}
                                    {/*        value="NotTrackInventoryProduct"*/}
                                    {/*        inputClassName="dark:checked:!bg-gray-200 dark:checked:!border-gray-200 dark:focus:ring-gray-200 dark:focus:ring-offset-gray-0"*/}
                                    {/*    />*/}
                                    {/*    <label className="ms-2">عکس اصلی</label>*/}
                                    {/*</div>*/}
                                </div>
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

// function ItemCrud({name, items, setItems, registerName}: ItemCrudProps): JSX.Element {
//     const {register, setValue} = useFormContext();
//     const [itemText, setItemText] = useState<string>('');
//
//     function handleItemAdd(): void {
//         if (itemText.trim() !== '') {
//             const newItem: string = itemText;
//
//             setItems([...items, newItem]);
//             setValue(registerName, [...items, newItem]);
//             setItemText('');
//         }
//     }
//
//     function handleItemRemove(text: string): void {
//         const updatedItems = items.filter((item) => item !== text);
//         setItems(updatedItems);
//         setValue(registerName, updatedItems);
//     }
//
//     return (
//         <div>
//             <div className="flex items-center">
//                 <Input
//                     value={itemText}
//                     placeholder={`${name} وارد کنید`}
//                     onChange={(e) => setItemText(e.target.value)}
//                     prefix={<PiTagBold className="h-4 w-4"/>}
//                     className="w-full"
//                 />
//                 <input type="hidden" {...register(registerName, {value: items})} />
//                 <Button
//                     onClick={handleItemAdd}
//                     className="ms-4 shrink-0 text-sm @lg:ms-5 dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
//                 >
//                     افزودن
//                 </Button>
//             </div>
//
//             {items.length > 0 && (
//                 <div className="mt-3 flex flex-wrap gap-2">
//                     {items.map((text, index) => (
//                         <div
//                             key={index}
//                             className="flex items-center rounded-full border border-gray-300 py-1 pe-2.5 ps-3 text-sm font-medium text-gray-700"
//                         >
//                             {text}
//                             <button
//                                 onClick={() => handleItemRemove(text)}
//                                 className="ps-2 text-gray-500 hover:text-gray-900"
//                             >
//                                 <PiXBold className="h-3.5 w-3.5"/>
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }

function ItemCrud({name, items, setItems, registerName}) {
    const {setValue} = useFormContext();
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
                    prefix={<PiTagBold className="h-4 w-4"/>}
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
                                <PiXBold className="h-3.5 w-3.5"/>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// const ProductAccordion = ({ products, setProducts }) => {
//     const [openIndex, setOpenIndex] = useState<number | null>(null);
//
//     const toggleAccordion = (index: number) => {
//         setOpenIndex(openIndex === index ? null : index);
//     };
//
//     const accordions = [
//         { title: "Option A", messageCount: 6, icon: "🔗" },
//         { title: "Option B", messageCount: 6, icon: "🌙" },
//         { title: "Option C", messageCount: 6, icon: "🌟" },
//     ];
//
//     return (
//         <div className="w-full max-w-full bg-white rounded-lg shadow-md">
//             {products?.map((item, index) => (
//                 <div key={index}>
//                     {/* Accordion Header */}
//                     <button
//                         className="flex items-center justify-between w-full p-4 focus:outline-none hover:bg-gray-50 transition"
//                         onClick={() => toggleAccordion(index)}
//                     >
//                         <div className="flex items-center gap-4">
//                             <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
//                                 {item.icon}
//                             </div>
//                             <div>
//                                 <h3 className="text-base font-medium">{item.name}</h3>
//                                 <p className="text-sm text-gray-500">
//                                     {item.categoryType ?? 'سایر'}
//                                 </p>
//                             </div>
//                         </div>
//                         <span className="text-gray-500">
//               {openIndex === index ? "▲" : "▼"}
//             </span>
//                     </button>
//
//                     {/* Accordion Content with Form */}
//                     <div
//                         className={`overflow-hidden transition-all duration-300 ease-in-out ${
//                             openIndex === index ? "max-h-[800px]" : "max-h-0"
//                         }`}
//                     >
//                         <div className="p-4">
//                             {/* Form Content */}
//                             <div className="px-4 pt-6 pb-8">
//                                 <div className="grid grid-cols-12 gap-y-6 gap-x-5 [&_label>span]:font-medium">
//                                     {/* First two inputs with responsive spans */}
//                                     <Input
//                                         label="عنوان محصول *"
//                                         inputClassName="border-2"
//                                         size="lg"
//                                         className="col-span-12 lg:col-span-6"
//                                     />
//                                     {/*<Input*/}
//                                     {/*    label="نوع محصول *"*/}
//                                     {/*    inputClassName="border-2"*/}
//                                     {/*    size="lg"*/}
//                                     {/*    className="col-span-12 lg:col-span-6"*/}
//                                     {/*/>*/}
//                                     {/* Full-width input */}
//                                     <Input
//                                         label="دسته بندی محصول *"
//                                         inputClassName="border-2"
//                                         size="lg"
//                                         className="col-span-12 lg:col-span-6"
//                                     />
//                                     <Textarea
//                                         label="توضیحات محصول"
//                                         // placeholder="عنوان محصولات (خدمات)"
//                                         className="col-span-full"
//                                         rows={3}
//                                     />
//                                     <Checkbox
//                                         size="lg"
//                                         inputClassName="border-2"
//                                         className="col-span-12"
//                                         label={"نمایش محصول"}
//                                     />
//                                     <MultipleFiles className="col-span-12" label="تصویر محصول"/>
//                                     <div className="col-span-12 mt-2 flex justify-end gap-4">
//                                         {/* Edit and Delete buttons */}
//                                         {/*<ActionIcon*/}
//                                         {/*    variant="flat"*/}
//                                         {/*    className="mt-7 shrink-0 text-gray-500"*/}
//                                         {/*>*/}
//                                         {/*    <PencilIcon className="h-4 w-4" />*/}
//                                         {/*</ActionIcon>*/}
//                                         {/*<ActionIcon*/}
//                                         {/*    variant="flat"*/}
//                                         {/*    className="bg-red text-white mt-7 shrink-0"*/}
//                                         {/*>*/}
//                                         {/*    <TrashIcon className="h-4 w-4" />*/}
//                                         {/*</ActionIcon>*/}
//                                         <Button
//                                             size="lg"
//                                             className="col-span-2 mt-2"
//                                         >
//                                             <PencilIcon className="h-4 w-4 me-1" /> ویرایش
//                                         </Button>
//                                         <Button
//                                             size="lg"
//                                             className="bg-red text-white col-span-2 mt-2"
//                                         >
//                                             <TrashIcon className="h-4 w-4 me-1" />حذف
//                                         </Button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//
//                     {index < accordions.length - 1 && <hr className="border-gray-200" />}
//                 </div>
//             ))}
//         </div>
//     );
// };

const ProductAccordion = ({products, append, remove, update}) => {
    const {control, register} = useFormContext();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            <div className="w-full max-w-full bg-white rounded-lg shadow-md">
                {products.map((field, index) => (
                    <div key={field.id}>
                        <button
                            className="flex items-center justify-between w-full p-4 focus:outline-none hover:bg-gray-50 transition"
                            onClick={() => toggleAccordion(index)}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                    {/* Optional icon or image */}
                                </div>
                                <div>
                                    <h3 className="text-base font-medium">
                                        {field.name || 'محصول جدید'}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {field.categoryType ?? 'سایر'}
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
                                <div className="grid grid-cols-12 gap-y-6 gap-x-5">
                                    <Input
                                        label="عنوان محصول *"
                                        inputClassName="border-2"
                                        size="lg"
                                        className="col-span-12 lg:col-span-6"
                                        {...register(`products.${index}.name`)}
                                    />
                                    <Input
                                        label="دسته بندی محصول *"
                                        inputClassName="border-2"
                                        size="lg"
                                        className="col-span-12 lg:col-span-6"
                                        {...register(`products.${index}.categoryType`)}
                                    />
                                    <Textarea
                                        label="توضیحات محصول"
                                        className="col-span-full"
                                        rows={3}
                                        {...register(`products.${index}.description`)}
                                    />
                                    {/*<Checkbox*/}
                                    {/*    size="lg"*/}
                                    {/*    inputClassName="border-2"*/}
                                    {/*    className="col-span-12"*/}
                                    {/*    label="نمایش محصول"*/}
                                    {/*    {...register(`products.${index}.showProduct`)}*/}
                                    {/*/>*/}
                                    <Controller
                                        name="showProduct"
                                        control={control}
                                        render={({ field: { value } }) => (
                                            <Switch
                                                label="نمایش محصول"
                                                className="col-span-full"
                                                switchClassName="dark:border-gray-400 "
                                                handlerClassName="dark:bg-gray-400"
                                                {...register(`products.${index}.showProduct`)}
                                            />
                                        )}
                                    />
                                    {/*<div className="col-span-full grid grid-cols-1 gap-4 xl:grid-cols-2">*/}
                                    {/*    <ItemCrud*/}
                                    {/*        name="تگ"*/}
                                    {/*        items={field.tags || []}*/}
                                    {/*        setItems={(items) => update(index, {...field, tags: items})}*/}
                                    {/*        registerName={`products.${index}.tags`}*/}
                                    {/*    />*/}
                                    {/*    <ItemCrud*/}
                                    {/*        name="کلمه کلیدی"*/}
                                    {/*        items={field.keywords || []}*/}
                                    {/*        setItems={(items) => update(index, {...field, keywords: items})}*/}
                                    {/*        registerName={`products.${index}.keywords`}*/}
                                    {/*    />*/}
                                    {/*</div>*/}
                                    <MultipleFiles
                                        className="col-span-12"
                                        label="تصویر محصول"
                                        registerName={`products.${index}.images`}
                                    />
                                    <div className="col-span-12 mt-2 flex justify-end gap-4">
                                        <Button
                                            size="lg"
                                            className="col-span-2 mt-2"
                                            onClick={() => {
                                            }}
                                        >
                                            <PencilIcon className="h-4 w-4 me-1"/> ویرایش
                                        </Button>
                                        <Button
                                            size="lg"
                                            className="bg-red text-white col-span-2 mt-2"
                                            onClick={() => remove(index)}
                                        >
                                            <TrashIcon className="h-4 w-4 me-1"/>حذف
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {index < products.length - 1 && <hr className="border-gray-200"/>}
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
                        display: false,
                        tags: [],
                        keywords: [],
                        images: [],
                    })
                }
                className="mt-4"
            >
                افزودن محصول جدید
            </Button>
        </>
    );
};