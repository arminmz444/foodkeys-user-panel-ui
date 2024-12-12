// // import FormGroup from '@/app/shared/form-group';
// // import QuillLoader from '@/components/loader/quill-loader';
// // import cn from '@/utils/class-names';
// // import dynamic from 'next/dynamic';
// // import React from 'react';
// // import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
// //
// // const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
// //   ssr: false,
// //   loading: () => <QuillLoader className="col-span-full h-[143px]" />,
// // });
// //
// // const ExhibitionDescription = ({ className }: { className?: string }) => {
// //   const {
// //     register,
// //     control,
// //     formState: { errors },
// //   } = useFormContext();
// //   const { fields, append, remove } = useFieldArray({
// //     control,
// //     name: 'brands',
// //   });
// //   return (
// //     <FormGroup
// //       title="توضیحات دیگر"
// //       description="شامل توضیحات نمایشگاه"
// //       className={cn(className)}
// //     >
// //       <Controller
// //         control={control}
// //         name="description"
// //         render={({ field: { onChange, value } }) => (
// //           <QuillEditor
// //             value={value}
// //             onChange={onChange}
// //             label="توضیحات نمایشگاه*"
// //             className="col-span-full [&_.ql-editor]:min-h-[100px]"
// //             labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
// //           />
// //         )}
// //       />
// //     </FormGroup>
// //   );
// // };
// //
// // export default ExhibitionDescription;
//
// import FormGroup from '@/app/shared/form-group';
// import QuillLoader from '@/components/loader/quill-loader';
// import cn from '@/utils/class-names';
// import dynamic from 'next/dynamic';
// import React from 'react';
// import { Controller, useFormContext } from 'react-hook-form';
//
// const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
//   ssr: false,
//   loading: () => <QuillLoader className="col-span-full h-[143px]" />,
// });
//
// const AdditionalDescription = ({ className }: { className?: string }) => {
//   const { control, formState: { errors } } = useFormContext();
//
//   return (
//       <FormGroup
//           title="توضیحات دیگر"
//           description="شامل توضیحات اضافه نمایشگاه"
//           className={cn(className)}
//       >
//         <Controller
//             control={control}
//             name="additionalDescription"
//             render={({ field: { onChange, value } }) => (
//                 <QuillEditor
//                     value={value}
//                     onChange={onChange}
//                     label="توضیحات اضافه نمایشگاه*"
//                     className="col-span-full [&_.ql-editor]:min-h-[100px]"
//                     labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
//                 />
//             )}
//         />
//         {errors.additionalDescription && (
//             <p className="text-red-500 text-sm">
//               {errors.additionalDescription.message as string}
//             </p>
//         )}
//       </FormGroup>
//   );
// };
//
// export default AdditionalDescription;

import FormGroup from '@/app/shared/form-group';
import QuillLoader from '@/components/loader/quill-loader';
import cn from '@/utils/class-names';
import dynamic from 'next/dynamic';
import { Controller, useFormContext } from 'react-hook-form';

const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
    ssr: false,
    loading: () => <QuillLoader />,
});

export default function ExhibitionDescription({ className }: { className?: string }) {
    const { control, formState: { errors } } = useFormContext();

    return (
        <FormGroup
            title="توضیحات نمایشگاه"
            description="شامل توضیحات نمایشگاه"
            className={cn(className)}
        >
            <Controller
                name="description"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <QuillEditor
                        value={value}
                        onChange={onChange}
                        label="توضیحات نمایشگاه*"
                    />
                )}
            />
            {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
            )}
        </FormGroup>
    );
}
