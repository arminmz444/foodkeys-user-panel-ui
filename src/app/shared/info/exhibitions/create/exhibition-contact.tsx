// import FormGroup from '@/app/shared/form-group';
// import TrashIcon from '@/components/icons/trash';
// import cn from '@/utils/class-names';
// import React, { useState } from 'react';
// import { ActionIcon } from '@/components/ui/action-icon';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { PiPlusBold } from 'react-icons/pi';
// import { useFieldArray, useFormContext } from 'react-hook-form';
//
// const ExhibitionContact = ({ className }: { className?: string }) => {
//   const [exhibitionPhone, setExhibitionPhone] = useState<string[]>([]);
//   const [exhibitionFax, setExhibitionFax] = useState<string[]>([]);
//
//   const {
//     register,
//     control,
//     formState: { errors },
//   } = useFormContext();
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: 'brands',
//   });
//
//   return (
//     <FormGroup
//       title="اطلاعات تماس نمایشگاه"
//       description="شامل تلفن ها، سایت و ..."
//       className={cn(className)}
//     >
//       <div className="flex flex-col space-y-2">
//         <label className="font-medium text-gray-700 dark:text-gray-600">
//           تلفن‌های ثابت نمایشگاه
//         </label>
//         {exhibitionPhone.map((phone, index) => (
//           <div key={index} className="flex items-center gap-2 space-x-2">
//             <Input
//               type="number"
//               value={phone}
//               placeholder={`تلفن نمایشگاه ${index + 1}`}
//               onChange={(e) => {
//                 const newPhones = [...exhibitionPhone];
//                 newPhones[index] = e.target.value;
//                 setExhibitionPhone(newPhones);
//               }}
//               className="flex-grow"
//             />
//             <ActionIcon
//               onClick={() =>
//                 setExhibitionPhone(
//                   exhibitionPhone.filter((_, i) => i !== index)
//                 )
//               }
//               variant="flat"
//               color="danger"
//             >
//               <TrashIcon className="h-4 w-4 text-red-light" />
//             </ActionIcon>
//           </div>
//         ))}
//         {exhibitionPhone.length < 3 && (
//           <Button
//             onClick={() => setExhibitionPhone([...exhibitionPhone, ''])}
//             variant="outline"
//           >
//             <PiPlusBold className="me-2 h-4 w-4" /> اضافه کردن تلفن جدید
//           </Button>
//         )}
//       </div>
//       <div className="flex flex-col space-y-2">
//         <label className="font-medium text-gray-700 dark:text-gray-600">
//           فکس های نمایشگاه
//         </label>
//         {exhibitionFax.map((fax, index) => (
//           <div key={index} className="flex items-center gap-2 space-x-2">
//             <Input
//               type="number"
//               value={fax}
//               placeholder={`فکس نمایشگاه ${index + 1}`}
//               onChange={(e) => {
//                 const newFaxes = [...exhibitionFax];
//                 newFaxes[index] = e.target.value;
//                 setExhibitionFax(newFaxes);
//               }}
//               className="flex-grow"
//             />
//             <ActionIcon
//               onClick={() =>
//                 setExhibitionFax(exhibitionFax.filter((_, i) => i !== index))
//               }
//               variant="flat"
//               color="danger"
//             >
//               <TrashIcon className="h-4 w-4 text-red-light" />
//             </ActionIcon>
//           </div>
//         ))}
//         {exhibitionFax.length < 3 && (
//           <Button
//             onClick={() => setExhibitionFax([...exhibitionFax, ''])}
//             variant="outline"
//           >
//             <PiPlusBold className="me-2 h-4 w-4" /> اضافه کردن فکس جدید
//           </Button>
//         )}
//       </div>
//       <Input
//         type="url"
//         label="وبسایت"
//         placeholder="وبسایت"
//         {...register('website')}
//         error={errors.website?.message as string}
//         helperText="(مثال: https://www.foodkeys.com)"
//         className="col-span-full"
//       />
//     </FormGroup>
//   );
// };
//
// export default ExhibitionContact;

import FormGroup from '@/app/shared/form-group';
import TrashIcon from '@/components/icons/trash';
import cn from '@/utils/class-names';
import { useCallback, useEffect, useState } from 'react';
import { ActionIcon } from '@/components/ui/action-icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { PiPlusBold } from 'react-icons/pi';

export default function ExhibitionContact({
  className,
  resetAll,
}: {
  className?: string;
}) {
  const {
    register,
    control,
    watch,
    formState: { errors },
    setValue,
  } = useFormContext();
  const [exhibitionPhones, setExhibitionPhones] = useState<string[]>([]);
  const [exhibitionFaxes, setExhibitionFaxes] = useState<string[]>([]);
  const watchedTels = watch('tel', []);

  useEffect(() => {
    setExhibitionFaxes([]);
    setExhibitionPhones([]);
  }, [resetAll]);
  useEffect(() => {
    if (watchedTels && watchedTels?.length) setExhibitionPhones(watchedTels);
  }, [watchedTels]);
  // const { telFields, telAppend, telRemove } = useFieldArray({
  //   control,
  //   name: 'tel',
  // });
  // const addCustomField = useCallback(() => {
  //   if (telFields.length < 3) telAppend([...tel]);
  // }, [telAppend, tel, telFields.length]);
  return (
    <FormGroup
      title="اطلاعات تماس نمایشگاه"
      description="شامل تلفن‌ها، سایت و ..."
      className={cn(className)}
    >
      <div className="flex flex-col space-y-2">
        <label className="font-medium text-gray-700 dark:text-gray-600">
          تلفن‌های نمایشگاه
        </label>
        {exhibitionPhones.map((phone, index) => (
          <div key={index} className="flex items-center gap-2 space-x-2">
            <Input
              value={phone}
              placeholder={`تلفن ${index + 1}`}
              onChange={(e) => {
                const updatedPhones = [...exhibitionPhones];
                updatedPhones[index] = e.target.value;
                setExhibitionPhones(updatedPhones);
                setValue('tel', updatedPhones);
              }}
              className="flex-grow"
            />
            <ActionIcon
              onClick={() => {
                let tmp = exhibitionPhones.filter((_, i) => i !== index);
                setExhibitionPhones(tmp);
                setValue('tel', tmp);
              }}
              variant="flat"
              color="danger"
            >
              <TrashIcon className="h-4 w-4 text-red-light" />
            </ActionIcon>
          </div>
        ))}
        {exhibitionPhones.length < 3 && (
          <Button
            variant="outline"
            onClick={() => setExhibitionPhones([...exhibitionPhones, ''])}
          >
            <PiPlusBold className="me-2 h-4 w-4" /> اضافه کردن تلفن جدید
          </Button>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="font-medium text-gray-700 dark:text-gray-600">
          فکس‌های نمایشگاه
        </label>
        {exhibitionFaxes.map((phone, index) => (
          <div key={index} className="flex items-center gap-2 space-x-2">
            <Input
              value={phone}
              placeholder={`فکس ${index + 1}`}
              onChange={(e) => {
                const updatedFaxes = [...exhibitionFaxes];
                updatedFaxes[index] = e.target.value;
                setExhibitionFaxes(updatedFaxes);
                setValue('fax', updatedFaxes);
              }}
              className="flex-grow"
            />
            <ActionIcon
              onClick={() => {
                let tmp = exhibitionFaxes.filter((_, i) => i !== index);
                setExhibitionFaxes(tmp);
                setValue('fax', tmp);
              }}
              variant="flat"
              color="danger"
            >
              <TrashIcon className="h-4 w-4 text-red-light" />
            </ActionIcon>
          </div>
        ))}
        {exhibitionFaxes.length < 3 && (
          <Button
            variant="outline"
            onClick={() => setExhibitionFaxes([...exhibitionFaxes, ''])}
          >
            <PiPlusBold className="me-2 h-4 w-4" /> اضافه کردن فکس جدید
          </Button>
        )}
      </div>

      <Input
        type="url"
        label="وب‌سایت"
        placeholder="وب‌سایت"
        {...register('website')}
        error={errors.website?.message as string}
      />
    </FormGroup>
  );
}
