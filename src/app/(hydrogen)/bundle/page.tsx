"use client"
import { routes } from '@/config/routes';
import ProfileSettingsLayout from '@/app/(hydrogen)/bundle/subscription-list/layout'
import ProfileSettingsFormPage from "@/app/(hydrogen)/bundle/subscription-list/page";

const pageHeader = {
  title: 'مدیریت اشتراک',
  breadcrumb: [
    {
      href: routes.info.dashboard,
      name: 'مدیریت اطلاعات',
    },
    {
      name: 'مدیریت اشتراک',
    },
  ],
};

const features = [
  'شامل یک سایت استاندارد ویژه.',
  'دسترسی به تمام ویژگی‌ها.',
  'پشتیبانی ۲۴ ساعته.',
];
const features2 = [
  'شامل یک سایت استاندارد ویژه.',
  'دسترسی به تمام ویژگی‌ها.',
  'پشتیبانی ۲۴ ساعته.',
];
const features3 = [
  'شامل یک سایت استاندارد ویژه.',
  'دسترسی به تمام ویژگی‌ها.',
  'پشتیبانی ۲۴ ساعته.',
  '۳ ماه اشتراک رایگان اضافی.',
  'تخفیف سالیانه.',

];
const items = [
  {
    title: "اشتراک پلن تست رایگان دو ماهه",
    features,
    color: "#22a5dc"
  },
  // {
  //   title: "اشتراک پلن پایه 500,000 تومان ماهیانه",
  //   features: features2,
  //   color: "#22a5dc"
  // },
  // {
  //   title: "اشتراک پلن ویژه 6,000,000 تومان سالیانه",
  //   features: features3,
  //   color: "#22a5dc"
  // },
]
export default function BundleRedirectPage() {
  return <ProfileSettingsLayout><ProfileSettingsFormPage /></ProfileSettingsLayout>
}
