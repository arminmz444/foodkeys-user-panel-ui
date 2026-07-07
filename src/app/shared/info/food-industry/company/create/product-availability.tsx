// import { useFormContext } from 'react-hook-form';
// import { Radio } from '@/components/ui/radio';
// import { Controller } from 'react-hook-form';
// import { Text } from 'rizzui';
//
// export default function ProductAvailability() {
//   const { control } = useFormContext();
//
//   return (
//     <div className="mb-6">
//       <Text className="mb-2 block font-medium text-gray-900">وضعیت محصولات</Text>
//       <Controller
//         name="productAvailability"
//         control={control}
//         defaultValue="2"
//         render={({ field: { onChange, value } }) => (
//           <div className="flex flex-col gap-4">
//             <Radio
//               label="فقط عنوان و توضیحات محصولات"
//               value="1"
//               checked={value === '1'}
//               onChange={() => onChange('1')}
//               className="mb-1"
//             />
//             <Radio
//               label="محصولات با جزئیات کامل"
//               value="2"
//               checked={value === '2'}
//               onChange={() => onChange('2')}
//               className="mb-1"
//             />
//           </div>
//         )}
//       />
//     </div>
//   );
// }
import { Controller, useFormContext } from 'react-hook-form';
import { RadioGroup } from '@/components/ui/radio-group';
import { useState, useEffect } from 'react';
import { Text } from 'rizzui';

interface ProductAvailabilityProps {
    className?: string;
}

export default function ProductAvailability({ className }: ProductAvailabilityProps) {
    const { control, watch } = useFormContext();
    const productAvailability = watch('productAvailability');
    const [showInfoMessage, setShowInfoMessage] = useState(false);

    // Show info message when switching between modes
    useEffect(() => {
        if (productAvailability) {
            setShowInfoMessage(true);
            const timer = setTimeout(() => {
                setShowInfoMessage(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [productAvailability]);

    return (
        <div className={`space-y-4 ${className}`}>
            <Controller
                name="productAvailability"
                control={control}
                defaultValue="2"
                render={({ field: { onChange, value } }) => (
                    <RadioGroup
                        value={value}
                        onChange={onChange}
                        label="نحوه ارائه محصولات و خدمات"
                    >
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2">
                            <label
                                htmlFor="detailed-products"
                                className={`flex cursor-pointer flex-col justify-between rounded-lg border p-5 hover:border-primary-dark ${value === '2' ? 'border-2 border-primary-dark bg-primary-lighter' : 'border-gray-200 bg-gray-0 dark:border-gray-300 dark:bg-gray-50'}`}
                            >
                                <div className="flex flex-col">
                                    <div className="mb-3 flex items-center">
                                        <input
                                            type="radio"
                                            id="detailed-products"
                                            value="2"
                                            checked={value === '2'}
                                            onChange={() => onChange('2')}
                                            className="h-5 w-5 border-gray-300 text-primary-dark focus:ring-primary-dark rtl:ml-3 ltr:mr-3"
                                        />
                                        <span className="font-medium text-gray-900">
                      ثبت محصولات و خدمات به صورت تفصیلی
                    </span>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        می‌توانید جزئیات دقیق محصولات و خدمات خود را به همراه تصاویر ثبت کنید
                                    </p>
                                </div>
                                {value === '2' && (
                                    <span className="mt-3 inline-flex items-center rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700">
                    انتخاب شده
                  </span>
                                )}
                            </label>

                            <label
                                htmlFor="simple-products"
                                className={`flex cursor-pointer flex-col justify-between rounded-lg border p-5 hover:border-primary-dark ${value === '1' ? 'border-2 border-primary-dark bg-primary-lighter' : 'border-gray-200 bg-gray-0 dark:border-gray-300 dark:bg-gray-50'}`}
                            >
                                <div className="flex flex-col">
                                    <div className="mb-3 flex items-center">
                                        <input
                                            type="radio"
                                            id="simple-products"
                                            value="1"
                                            checked={value === '1'}
                                            onChange={() => onChange('1')}
                                            className="h-5 w-5 border-gray-300 text-primary-dark focus:ring-primary-dark rtl:ml-3 ltr:mr-3"
                                        />
                                        <span className="font-medium text-gray-900">
                      ثبت محصولات و خدمات به صورت توصیفی
                    </span>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        تنها عناوین و توضیحات کلی محصولات و خدمات خود را وارد می‌کنید
                                    </p>
                                </div>
                                {value === '1' && (
                                    <span className="mt-3 inline-flex items-center rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700">
                    انتخاب شده
                  </span>
                                )}
                            </label>
                        </div>
                    </RadioGroup>
                )}
            />

            {showInfoMessage && (
                <div className={`rounded-lg p-4 ${productAvailability === '2' ? 'bg-blue-50 text-blue-800 dark:bg-blue-lighter/20 dark:text-blue-light' : 'bg-amber-50 text-amber-800 dark:bg-orange-lighter/20 dark:text-orange-light'}`}>
                    <Text className="text-sm">
                        {productAvailability === '2'
                            ? 'با این انتخاب، می‌توانید محصولات خود را به صورت کامل با جزئیات و تصاویر ثبت کنید.'
                            : 'با این انتخاب، تنها توضیحات کلی محصولات را وارد می‌کنید و امکان ثبت تصاویر وجود ندارد.'}
                    </Text>
                </div>
            )}
        </div>
    );
}