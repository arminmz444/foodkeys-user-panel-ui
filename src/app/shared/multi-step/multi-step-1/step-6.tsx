'use client';

import { z } from 'zod';
import { useAtom } from 'jotai';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  formDataAtom,
  useStepperOne,
} from '@/app/shared/multi-step/multi-step-1';
import FormSummary from '@/app/shared/multi-step/multi-step-1/form-summary';
import { Text } from '@/components/ui/text';
import { AdvancedCheckbox } from '@/components/ui/advanced-checkbox';
import { CheckboxGroup } from '@/components/ui/checkbox-group';
import { PiTelevision, PiWifiHigh } from 'react-icons/pi';
import KitchenIcon from '@/components/icons/kitchen';
import WashingMachineIcon from '@/components/icons/washing-machine';
import CarParkingIcon from '@/components/icons/car-parking';
import AirConditionerIcon from '@/components/icons/air-conditioner';
import WorkplaceIcon from '@/components/icons/workplace';
import MeterIcon from '@/components/icons/meter';
import SwimmingPoolIcon from '@/components/icons/swimming-pool';
import BBQGrillIcon from '@/components/icons/bbq-grill';
import DiningIcon from '@/components/icons/dining';
import PoolTableIcon from '@/components/icons/pool-table';
import GymIcon from '@/components/icons/gym';
import SmokeAlarmIcon from '@/components/icons/smoke-alarm';
import FireExtinguisherIcon from '@/components/icons/fire-extinguisher';
import CCCameraIcon from '@/components/icons/CCCamera';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

type Amenity = {
  value: string;
  name: string;
  icon: React.ReactNode;
};

const indoorAmenities: Amenity[] = [
  {
    value: 'wifi',
    name: 'وای-فای',
    icon: <PiWifiHigh className="h-8 w-8" />,
  },
  {
    value: 'tv',
    name: 'تلویزیون',
    icon: <PiTelevision className="h-8 w-8" />,
  },
  {
    value: 'kitchen',
    name: 'آشپزخانه',
    icon: <KitchenIcon className="h-8 w-8" />,
  },
  {
    value: 'washing-machine',
    name: 'ماشین لباسشویی',
    icon: <WashingMachineIcon className="h-8 w-8" />,
  },
  {
    value: 'Parking',
    name: 'پارکینگ',
    icon: <CarParkingIcon className="h-8 w-8" />,
  },
  {
    value: 'Air Conditioning',
    name: 'تهویه هوا',
    icon: <AirConditionerIcon className="h-8 w-8" />,
  },
  {
    value: 'Workplace',
    name: 'محل کار',
    icon: <WorkplaceIcon className="h-8 w-8" />,
  },
  {
    value: 'Water Heating',
    name: 'گرمایش آب',
    icon: <MeterIcon className="h-8 w-8" />,
  },
];
const outdoorAmenities: Amenity[] = [
  {
    value: 'Swimming Pool',
    name: 'استخر',
    icon: <SwimmingPoolIcon className="h-8 w-8" />,
  },
  {
    value: 'BBQ Grill',
    name: 'مرغداری مشاوی',
    icon: <BBQGrillIcon className="h-8 w-8" />,
  },
  {
    value: 'Outdoor Dining',
    name: 'میز و صندلی‌های فضای باز',
    icon: <DiningIcon className="h-8 w-8" />,
  },
  {
    value: 'Pool Table',
    name: 'میز بیلیارد',
    icon: <PoolTableIcon className="h-8 w-8" />,
  },
  {
    value: 'Gym',
    name: 'سالن ورزشی',
    icon: <GymIcon className="h-8 w-8" />,
  },
  {
    value: 'Smoke Alarm',
    name: 'آژیر دود',
    icon: <SmokeAlarmIcon className="h-8 w-8" />,
  },
  {
    value: 'Fire extinguisher',
    name: 'آتش‌نشانی',
    icon: <FireExtinguisherIcon className="h-8 w-8" />,
  },
  {
    value: 'Security Camera',
    name: 'دوربین امنیتی',
    icon: <CCCameraIcon className="h-8 w-8" />,
  },
];
export const formSchema = z.object({
  indoorAmenities: z.string().array().min(1, 'امکانات مورد الزامی میباشد'),
  outdoorAmenities: z.string().array().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

export const placeInfoValues = {
  indoorAmenities: [],
  outdoorAmenities: [],
};

export default function StepTwo() {
  const [formData, setFormData] = useAtom(formDataAtom);
  const { step, gotoNextStep } = useStepperOne();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      indoorAmenities: formData.indoorAmenities,
      outdoorAmenities: formData.outdoorAmenities,
    },
  });

  useEffect(() => {
    if (errors.indoorAmenities) {
      toast.error(errors.indoorAmenities.message as string);
    }
  }, [errors]);

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    console.log('data', data);
    setFormData((prev) => ({
      ...prev,
      indoorAmenities: data.indoorAmenities,
      outdoorAmenities: data.outdoorAmenities,
    }));
    // console.log('formData', formData);
    gotoNextStep();
  };

  return (
    <>
      <div className="col-span-full flex flex-col justify-center @5xl:col-span-4 @6xl:col-span-5">
        <FormSummary
          title="به ما اطلاع دهید که مکان شما چه خدمات و امکاناتی ارائه می‌دهد!"
          description="خانه‌ی شما یک تمدن از شخصیت شماست، یک مکان آرامشی پر از لمس‌ها و سبک منحصر به فرد شما. با به اشتراک گذاری جزئیات، اجازه دهید تا خدمات و توصیه‌های خود را به‌صورت ویژه برای شما تنظیم کنیم."
        />
      </div>

      <div className="col-span-full flex items-center justify-center @5xl:col-span-8 @6xl:col-span-7">
        <form
          id={`rhf-${step.toString()}`}
          onSubmit={handleSubmit(onSubmit)}
          className="grid flex-grow gap-6 rounded-lg bg-white p-5 @4xl:p-7 dark:bg-gray-0"
        >
          <>
            <div className="grid gap-4">
              <Text className="font-semibold text-gray-900">
                به مهمانان بگویید که مکان شما چه خدمات و امکاناتی ارائه می‌دهد!
              </Text>
              <Controller
                name="indoorAmenities"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CheckboxGroup
                    // TODO: needed to be fixed
                    // @ts-ignore
                    values={value}
                    setValues={onChange}
                    className="col-span-full grid grid-cols-2 gap-4 @3xl:grid-cols-3 @4xl:gap-6 @7xl:grid-cols-4"
                  >
                    {indoorAmenities.map((amenity) => (
                      <AdvancedCheckbox
                        key={amenity.value}
                        value={amenity.value}
                        className="grid flex-grow gap-3 rounded-xl border border-gray-200 p-6 text-gray-600 hover:cursor-pointer hover:border-gray-700"
                        inputClassName="[&:checked:enabled~span]:ring-1 [&:checked:enabled~span]:ring-offset-0 [&:checked:enabled~span]:ring-gray-700 [&:checked:enabled~span]:border-gray-700"
                      >
                        <span className="block h-8 w-8">{amenity.icon}</span>
                        <p className="font-semibold">{amenity.name}</p>
                      </AdvancedCheckbox>
                    ))}
                  </CheckboxGroup>
                )}
              />
            </div>
            <div className="grid gap-4">
              <Text className="font-semibold text-gray-900">
                آیا شما هرگونه امکانات ویژه یا منحصر به فرد دارید؟
              </Text>
              <Controller
                name="outdoorAmenities"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CheckboxGroup
                    // TODO: needed to be fixed
                    // @ts-ignore
                    values={value}
                    setValues={onChange}
                    className="col-span-full grid grid-cols-2 gap-4 @3xl:grid-cols-3 @4xl:gap-6 @7xl:grid-cols-4"
                  >
                    {outdoorAmenities.map((amenity) => (
                      <AdvancedCheckbox
                        key={amenity.value}
                        value={amenity.value}
                        className="grid flex-grow gap-3 rounded-xl border border-gray-200 p-6 text-gray-600 hover:cursor-pointer hover:border-gray-700"
                        inputClassName="[&:checked:enabled~span]:ring-1 [&:checked:enabled~span]:ring-offset-0 [&:checked:enabled~span]:ring-gray-700 [&:checked:enabled~span]:border-gray-700"
                      >
                        <span className="block text-gray-900">
                          {amenity.icon}
                        </span>
                        <p className="font-semibold">{amenity.name}</p>
                      </AdvancedCheckbox>
                    ))}
                  </CheckboxGroup>
                )}
              />
            </div>
          </>
        </form>
      </div>
    </>
  );
}
