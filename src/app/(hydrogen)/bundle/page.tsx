"use client"
import { routes } from '@/config/routes';
import UpgradeStorage from "@/app/shared/bundle/upgrade-storage";
import {useEffect, useState} from "react";
import useAxiosPrivate from "@/hooks/use-axios-private";
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
export default function ProfileSettingsFormPage() {
  const [items, setItems] = useState()
  const _axios = useAxiosPrivate()
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await _axios.get(`/subscription`);
        if (response.data.status === 'SUCCESS') {
          setItems(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };
    fetchSubscriptions();
  }, [_axios]);
  return <UpgradeStorage items={items || []}/>
}
