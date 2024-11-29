// import BannerCard from '@/components/banners/banner-card';
// import Link from 'next/link';
// import { Text } from '@/components/ui/text';
// import { PiCheckCircleFill } from 'react-icons/pi';
//
// const features = [
//   'امکانات ویژه با امکان سفارشی‌سازی.',
//   'دسترسی چند کاربره.',
//   'آسان برای دسترسی و ویرایش.',
// ];
//
// export default function UpgradeStorage({ className }: { className?: string }) {
//   return (
//     <div className={className}>
//       <BannerCard
//         title="اشتراک پلن یک ماهه"
//         className="min-h-[280px] overflow-hidden rounded-lg"
//       >
//         <div className="my-5">
//           {features.map((feature, index) => (
//             <Text
//               key={`feature-${index}`}
//               className="flex items-center gap-2 py-1 text-sm font-medium text-white"
//             >
//               <PiCheckCircleFill className="h-5 w-5 text-xl text-white" />
//               {feature}
//             </Text>
//           ))}
//         </div>
//         <Link
//           href={'/file'}
//           className="inline-block rounded-md bg-white px-4 py-2.5 text-sm font-medium text-gray-900 dark:bg-gray-100"
//         >
//           مشاهده جزئیات
//         </Link>
//       </BannerCard>
//     </div>
//   );
// }

import BannerCard from '@/components/banners/banner-card';
import Link from 'next/link';
import { Text } from '@/components/ui/text';
import {PiCalendar, PiCheckCircleFill} from 'react-icons/pi';

type FeatureItem = {
    title: string;
    features: string[];
    color: string;
};

export default function UpgradeStorage({
                                           items,
                                           className,
                                       }: {
    items: FeatureItem[];
    className?: string;
}) {
    return (
        <div className={`${className} grid gap-4 sm:grid-cols-2 mt-6`}>
            {items.length > 0 ? (
                items.map((item, index) => (
                    <BannerCard
                        key={`banner-${index}`}
                        title={item.bundleTitle}
                        className={`min-h-[280px] overflow-hidden rounded-lg`}
                        style={{backgroundColor: item.color}}
                    >
                        <div className="my-5">
                            {item.bundleFeatures.map((feature, featureIndex) => (
                                <Text
                                    key={`feature-${index}-${featureIndex}`}
                                    className="flex items-center gap-2 py-1 text-sm font-medium text-white"
                                >
                                    <PiCheckCircleFill className="h-5 w-5 text-xl text-white"/>
                                    {feature}
                                </Text>
                            ))}
                        </div>
                        <div className="my-5">
                            <Text
                                className="flex items-center gap-2 py-1 text-sm font-medium text-white"
                            >
                                <PiCalendar className="h-5 w-5 text-xl text-white"/>
                                تاریخ انقضا: {item.endDateStr}
                            </Text>

                        </div>
                        <Link
                            href={'/bundle/buy'}
                            className="inline-block rounded-md bg-white px-4 py-2.5 text-sm font-medium text-gray-900 dark:bg-gray-100"
                        >
                            تمدید اشتراک
                        </Link>
                    </BannerCard>
                ))
            ) : (
                <h3 className="col-span-full text-sm font-medium text-gray-700 dark:text-gray-300 mt-4">
                    شما اشتراک فعالی ندارید
                </h3>
            )}
        </div>
    );
}
