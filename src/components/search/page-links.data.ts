import { routes } from '@/config/routes';
import { DUMMY_ID } from '@/config/constants';

// Note: do not add href in the label object, it is rendering as label
export const pageLinks = [
  // label start
  {
    name: 'خانه',
  },
  // label end
  {
    name: 'خانه | داشبورد',
    href: routes.dashboard,
  },
  {
    name: 'حساب کاربری',
    href: routes.profile,
  },
  {
    name: 'مدیریت اشتراک',
    href: routes.subscriptionList,
  },

  // label start
  {
    name: 'بانک‌ها',
  },
  {
    name: 'بانک صنعت غذا',
    href: routes.foodIndustry.dashboard,
  },
  {
    name: 'بانک صنعت کشاورزی',
    href: '/agricultrue',
  },
  {
    name: 'بانک خدمات',
    href: '/services',
  },
  {
    name: 'بانک رسانه ها',
    href: '/medias',
  },
  // label end
  // label start
  {
    name: 'پشتیبانی',
  },
  // label end
  {
    name: 'تیکت‌ها',
    href: routes.support.ticket,
  },

  {
    name: 'مدیریت مالی',
  },

  {
    name: 'لیست پرداخت‌ها',
    href: routes.finance.invoiceList,
  },
];
