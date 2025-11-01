'use client';

import Link from 'next/link';
import { PiOrangeDuotone, PiPlantDuotone } from 'react-icons/pi';
import cn from '@/utils/class-names';

export default function InfoSelectorPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            لیست شرکت‌های ثبت شده
          </h1>
          <p className="text-base md:text-lg text-gray-600">
            لطفاً یکی از بانک‌های اطلاعاتی را برای مشاهده انتخاب کنید
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Food Industry Card */}
          <Link href="/info/food-industry">
            <div
              className={cn(
                'group relative overflow-hidden rounded-2xl',
                'bg-gradient-to-br from-orange-50 to-orange-100',
                'border-2 border-orange-200 hover:border-orange-400',
                'shadow-lg hover:shadow-2xl',
                'transition-all duration-300 cursor-pointer',
                'backdrop-blur-sm',
                'h-[300px] md:h-[350px] lg:h-[400px]',
                'hover:scale-[1.02] hover:-translate-y-2',
                'active:scale-[0.98]'
              )}
            >
              {/* Background blur effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-orange-600/10 backdrop-blur-[2px] group-hover:backdrop-blur-[1px] transition-all duration-300" />
              
              {/* Animated background circles */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-orange-300/30 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-orange-400/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              
              {/* Content */}
              <div className="relative h-full flex flex-col items-center justify-center p-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-full p-6 md:p-8 mb-6 shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                  <PiOrangeDuotone className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-orange-600 transition-transform duration-300 group-hover:rotate-12" />
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                  بانک صنعت غذا
                </h2>
                <p className="text-sm md:text-base text-gray-700 text-center mb-4">
                  مشاهده و مدیریت شرکت‌های صنعت غذایی
                </p>
                <div className="flex items-center gap-2 text-orange-600 font-semibold group-hover:gap-4 transition-all duration-300">
                  <span>مشاهده لیست</span>
                  <svg 
                    className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Agriculture Industry Card */}
          <Link href="/info/agriculture-industry">
            <div
              className={cn(
                'group relative overflow-hidden rounded-2xl',
                'bg-gradient-to-br from-green-50 to-green-100',
                'border-2 border-green-200 hover:border-green-400',
                'shadow-lg hover:shadow-2xl',
                'transition-all duration-300 cursor-pointer',
                'backdrop-blur-sm',
                'h-[300px] md:h-[350px] lg:h-[400px]',
                'hover:scale-[1.02] hover:-translate-y-2',
                'active:scale-[0.98]'
              )}
            >
              {/* Background blur effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-green-600/10 backdrop-blur-[2px] group-hover:backdrop-blur-[1px] transition-all duration-300" />
              
              {/* Animated background circles */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-green-300/30 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-green-400/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              
              {/* Content */}
              <div className="relative h-full flex flex-col items-center justify-center p-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-full p-6 md:p-8 mb-6 shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                  <PiPlantDuotone className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-green-600 transition-transform duration-300 group-hover:rotate-12" />
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                  بانک صنعت کشاورزی
                </h2>
                <p className="text-sm md:text-base text-gray-700 text-center mb-4">
                  مشاهده و مدیریت شرکت‌های صنعت کشاورزی
                </p>
                <div className="flex items-center gap-2 text-green-600 font-semibold group-hover:gap-4 transition-all duration-300">
                  <span>مشاهده لیست</span>
                  <svg 
                    className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
