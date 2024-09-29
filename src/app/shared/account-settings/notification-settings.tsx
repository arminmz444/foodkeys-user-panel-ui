'use client';

import { useState } from 'react';
import { Text } from '@/components/ui/text';
import HorizontalFormBlockWrapper from './horiozontal-block';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { CheckboxGroup } from '@/components/ui/checkbox-group';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup } from '@/components/ui/radio-group';
import { Radio } from '@/components/ui/radio';

const generalOptions = [
  {
    title: 'در یک پیام اشاره شده‌ام',
  },
  {
    title: 'کسی به هر پیامی پاسخ می‌دهد',
  },
  {
    title: 'یک وظیفه به من اختصاص داده شده است',
  },
  {
    title: 'یک وظیفه تأخیر افتاده است',
  },
  {
    title: 'وضعیت یک وظیفه به‌روز شده است',
  },
];

const summaryOptions = [
  {
    title: 'خلاصه روزانه',
  },
  {
    title: 'خلاصه هفتگی',
  },
  {
    title: 'خلاصه ماهانه',
  },
  {
    title: 'خلاصه فصلی',
  },
];
export default function NotificationSettingsView() {
  const [values, setValues] = useState<string[]>([]);
  const [value, setValue] = useState('');

  return (
    <>
      <HorizontalFormBlockWrapper
        childrenWrapperClassName="gap-0 @lg:gap-0"
        title="اعلان ها"
        titleClassName="text-xl font-semibold"
        description="انتخاب کنید که کی و چگونه اعلان دریافت کنید."
      />
      <HorizontalFormBlockWrapper
        title="اعلان های عمومی"
        description="انتخاب کنید که هنگام رخدادن تغییرات زیر، مطلع شوید."
        descriptionClassName="max-w-[344px]"
      >
        <div className="col-span-2">
          {generalOptions.map((opt, index) => (
            <div
              key={`generalopt-${index}`}
              className="flex items-center justify-between border-b border-gray-300 py-6 last:border-none last:pb-0"
            >
              <Text className="text-sm font-medium text-gray-900">
                {opt.title}
              </Text>
              <ButtonGroup
                onChange={(option) => console.log(opt.title, option)}
              />
            </div>
          ))}
        </div>
      </HorizontalFormBlockWrapper>
      <HorizontalFormBlockWrapper
        title="خلاصه اعلان ها"
        description="زمانی که خلاصه‌ها یا گزارش‌های زیر آماده شدند، کی مایلید مطلع شوید؟"
        descriptionClassName="max-w-[344px]"
      >
        <div className="col-span-2">
          {summaryOptions.map((opt, index) => (
            <div
              key={`summaryopt-${index}`}
              className="flex items-center justify-between border-b border-gray-300 py-6 last:border-none last:pb-0"
            >
              <Text className="text-sm font-medium text-gray-900">
                {opt.title}
              </Text>
              <ButtonGroup
                onChange={(option) => console.log(opt.title, option)}
              />
            </div>
          ))}
        </div>
      </HorizontalFormBlockWrapper>
      <HorizontalFormBlockWrapper
        title="نظرات"
        description="این اعلان‌ها برای نظرات در پست‌های شما و پاسخ‌ها به نظرات شما استفاده می‌شود."
        descriptionClassName="max-w-[344px]"
      >
        <div className="col-span-2">
          <Switch
            label="بهم خبر بده"
            variant="flat"
            labelClassName="font-medium text-sm text-gray-900"
          />
          <Switch
            label="تنها اشاره"
            variant="flat"
            labelClassName="font-medium text-sm text-gray-900"
          />
          <Switch
            label="همه نظرات"
            variant="flat"
            labelClassName="font-medium text-sm text-gray-900"
          />
        </div>
      </HorizontalFormBlockWrapper>
      <HorizontalFormBlockWrapper
        title="اعلان از طرف ما"
        description="این اعلان‌ها برای زمانی است که کسی شما را در یک نظر، پست یا استوری تگ می‌کند."
        descriptionClassName="max-w-[344px]"
      >
        <div className="col-span-2">
          <CheckboxGroup
            values={values}
            setValues={setValues}
            className="flex flex-col"
          >
            <Checkbox
              name="app_notification"
              label="اخبار و بروزرسانی"
              value="news_updates"
              variant="active"
              className="mb-5"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium !text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
              helperText="اخبار مربوط به به‌روزرسانی‌ها و ویژگی‌های محصول."
            />
            <Checkbox
              name="app_notification"
              label="نکات وآموزش ها"
              value="tips_tutorials"
              variant="active"
              className="mb-5"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
              helperText="راهنمایی‌هایی برای بهره‌برداری بیشتر از (نام نامشخص)."
            />
            <Checkbox
              name="app_notification"
              label="تحقیق کاربر"
              value="user_research"
              variant="active"
              inputClassName="checked:!bg-gray-900 border-gray-300"
              labelClassName="pl-2 text-sm font-medium text-gray-900"
              helperClassName="text-gray-500 text-sm mt-3 ms-8"
              helperText="شرکت در برنامه آزمایشی بتا یا مشارکت در تحقیقات کاربران پرداختی محصول."
            />
          </CheckboxGroup>
        </div>
      </HorizontalFormBlockWrapper>
      <HorizontalFormBlockWrapper
        title="یاد آور ها"
        description="این اعلان‌ها برای یادآوری به شما از به‌روزرسانی‌هایی است که ممکن است از دست داده باشید."
        descriptionClassName="max-w-[344px]"
      >
        <div className="col-span-2">
          <RadioGroup
            value={value}
            setValue={setValue}
            className="justify-center space-x-4 space-y-4"
          >
            <div className="divide-slate-300 flex w-full flex-col md:w-[500px]">
              <Radio
                name="reminders"
                label="بهم خبر بده"
                value="do_not_notify"
                className="mb-5"
                labelClassName="pl-2 text-sm font-medium text-gray-900"
              />
              <Radio
                name="reminders"
                label="فقط یادآورهای مهم"
                value="important_only"
                className="mb-5"
                labelClassName="pl-2 text-sm font-medium text-gray-900"
                helperClassName="text-gray-500 text-sm mt-3 ms-8"
                helperText="تنها زمانی به من اطلاع دهید که یادآور به عنوان مهم تگ شده باشد."
              />
              <Radio
                name="reminders"
                value="all_reminder"
                label="همه یادآور ها"
                labelClassName="pl-2 text-sm font-medium text-gray-900"
                helperClassName="text-gray-500 text-sm mt-3 ms-8"
                helperText="برای همه یادآورها به من اطلاع دهید."
              />
            </div>
          </RadioGroup>
        </div>
      </HorizontalFormBlockWrapper>
      <HorizontalFormBlockWrapper
        title="فعالیت های بیشتر راجب شما"
        description="این اعلان‌ها مربوط به پست‌ها در پروفایل شما، لایک‌ها و واکنش‌های دیگر به پست‌های شما و امور دیگر است."
        descriptionClassName="max-w-[344px]"
        className="border-0 pb-0"
      >
        <div className="col-span-2">
          <RadioGroup
            value={value}
            setValue={setValue}
            className="justify-center space-x-4 space-y-4"
          >
            <div className="divide-slate-300 flex w-full flex-col md:w-[500px]">
              <Radio
                name="activity"
                label="به من اطلاع نده"
                value="do_not_notify_activity"
                className="mb-5"
                labelClassName="pl-2 text-sm font-medium text-gray-900"
              />
              <Radio
                name="activity"
                value="all_reminder_activity"
                label="تمامی اطلاع رسانی ها"
                labelClassName="pl-2 text-sm font-medium text-gray-900"
                helperClassName="text-gray-500 text-sm mt-3 ms-8"
                helperText="برای تمام یادآورها به من اطلاع دهید."
              />
            </div>
          </RadioGroup>
        </div>
      </HorizontalFormBlockWrapper>
    </>
  );
}

const options = ['هیچ کدام', 'در برنامه', 'ایمیل'];

function ButtonGroup({ onChange }: { onChange: (option: string) => void }) {
  const [selected, setSelected] = useState<string>();
  function handleOnClick(option: string) {
    setSelected(option);
    onChange && onChange(option);
  }

  return (
    <div className="inline-flex gap-1">
      {options.map((option) => (
        <Button
          key={option}
          variant={selected === option ? 'solid' : 'outline'}
          onClick={() => handleOnClick(option)}
        >
          {option}
        </Button>
      ))}
    </div>
  );
}
