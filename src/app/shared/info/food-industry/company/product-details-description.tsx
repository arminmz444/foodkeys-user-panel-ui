'use client';

import cn from '@/utils/class-names';
import { Text } from '@/components/ui/text';
import { Collapse } from '@/components/ui/collapse';
import { PiCaretDownBold, PiTagLight } from 'react-icons/pi';

export default function ProductDetailsDescription() {
  return (
    <Collapse
      className="border-t last-of-type:border-t-0"
      defaultOpen={true}
      header={({ open, toggle }) => (
        <div
          role="button"
          onClick={toggle}
          className="font-iransans font-iransans flex w-full cursor-pointer items-center justify-between py-6 text-lg font-semibold text-gray-900"
        >
          جزییات محصول
          <div className="flex shrink-0 items-center justify-center">
            <PiCaretDownBold
              className={cn(
                'h-[18px] w-[18px] transform transition-transform duration-300',
                open && 'rotate-180'
              )}
            />
          </div>
        </div>
      )}
    >
      <div className="-mt-2 pb-7">
        <Text tag="p" className="pb-2 leading-relaxed">
          زیبایی ساده و تک‌رنگ. این شلوارها با ساق پهن و راحت ساخته شده‌اند و از
          پنبه ارگانیک نرم و پایدار با استرچ مکانیکی ساخته شده‌اند که این لباس
          را به راحتی قابل بازیافت می‌کند.
        </Text>
        <ul className="space-y-2.5">
          <li>بالای چرم مصنوعی</li>
          <li>پاشنه فوم دار</li>
          <li>زیره با بافت و الگو</li>
          <li>گارانتی یک ماه</li>
        </ul>
        <Text
          tag="h6"
          className="font-iransans mt-6 font-inter text-sm font-semibold"
        >
          جنس و مراقبت
        </Text>
        <ul className="space-y-2.5 pt-3.5">
          <li>چرم مصنوعی</li>
          <li>به راحتی تمیز میشود</li>
        </ul>
        <div className="mt-6 flex items-start">
          <div className="me-3 mt-1 flex shrink-0 items-center font-medium text-gray-900">
            <PiTagLight className="me-1.5 h-[18px] w-[18px]" /> تگ ها:
          </div>
          <ul className="-m-1 text-gray-900">
            <li className="m-1 inline-flex rounded-xl bg-gray-50 px-2.5 py-1 dark:bg-gray-100">
              کفش
            </li>
            <li className="m-1 inline-flex rounded-xl bg-gray-50 px-2.5 py-1 dark:bg-gray-100">
              فشن
            </li>
            <li className="m-1 inline-flex rounded-xl bg-gray-50 px-2.5 py-1 dark:bg-gray-100">
              مردانه
            </li>
            <li className="m-1 inline-flex rounded-xl bg-gray-50 px-2.5 py-1 dark:bg-gray-100">
              نایکی
            </li>
          </ul>
        </div>
      </div>
    </Collapse>
  );
}
