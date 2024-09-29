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
    name: 'ایکامرس',
    href: routes.eCommerce.dashboard,
  },
  {
    name: 'پشتیبانی',
    href: routes.support.dashboard,
  },
  {
    name: 'لجستیک',
    href: routes.logistics.dashboard,
  },
  {
    name: 'تحلیل',
    href: routes.analytics,
  },
  {
    name: 'فایل',
    href: routes.file.dashboard,
  },
  // label start
  {
    name: 'اپلیکیشن‌ها',
  },
  // label end
  {
    name: 'محصولات',
    href: routes.eCommerce.products,
  },
  {
    name: 'جزییات محصول',
    href: routes.eCommerce.productDetails(DUMMY_ID),
  },
  {
    name: 'ساخت محصول',
    href: routes.eCommerce.createProduct,
  },
  {
    name: 'ویرایش محصول',
    href: routes.eCommerce.ediProduct(DUMMY_ID),
  },
  {
    name: 'دسته بندی',
    href: routes.eCommerce.categories,
  },
  {
    name: 'ساخت دسته بندی',
    href: routes.eCommerce.createCategory,
  },
  {
    name: 'ویرایش دسته بندی',
    href: routes.eCommerce.editCategory(DUMMY_ID),
  },
  {
    name: 'سفارشات',
    href: routes.eCommerce.orders,
  },
  {
    name: 'جزییات سفارش',
    href: routes.eCommerce.orderDetails(DUMMY_ID),
  },
  {
    name: 'ایجاد سفارش',
    href: routes.eCommerce.createOrder,
  },
  {
    name: 'ویرایش سفارش',
    href: routes.eCommerce.editOrder(DUMMY_ID),
  },
  {
    name: 'نظرات',
  },
  {
    name: 'خرید',
  },
  {
    name: 'کارت',
    href: routes.eCommerce.cart,
  },
  {
    name: 'پرداخت و تسویه حساب',
    href: routes.eCommerce.checkout,
  },
  {
    name: 'پشتیبانی صندوق',
    href: routes.support.inbox,
  },
  {
    name: 'پشتیبانی قطعات',
    href: routes.support.snippets,
  },
  {
    name: 'Support Templates',
    href: routes.support.templates,
  },
  {
    name: 'لیست سفارش',
    href: routes.invoice.home,
  },
  {
    name: 'جزییات فاکتور',
    href: routes.invoice.details(DUMMY_ID),
  },
  {
    name: 'ایجاد فاکتور',
    href: routes.invoice.create,
  },
  {
    name: 'ویرایش فاکتور',
    href: routes.invoice.edit(DUMMY_ID),
  },
  {
    name: 'لیست ارسالی ها',
    href: routes.logistics.shipmentList,
  },
  {
    name: 'جزیییات ارسال',
    href: routes.logistics.shipmentDetails,
  },
  {
    name: 'رهگیری',
    href: routes.logistics.tracking(DUMMY_ID),
  },
  {
    name: 'مدیریت فایل',
    href: routes.file.manager,
  },
  // label start
  {
    name: 'ابزارها',
  },
  // label end
  {
    name: 'کارت‌ها',
    href: routes.widgets.cards,
  },
  {
    name: 'آیکون‌ها',
    href: routes.widgets.icons,
  },
  {
    name: 'نمودارها',
    href: routes.widgets.charts,
  },
  // {
  //   name: 'بنرها',
  // },
  {
    name: 'نقشه‌ها',
    href: routes.widgets.maps,
  },
  // label start
  {
    name: 'فرم‌ها',
  },
  // label end
  {
    name: 'تنظیمات پروفایل',
    href: routes.forms.profileSettings,
  },
  {
    name: 'ترجیحات اعلان',
    href: routes.forms.notificationPreference,
  },
  {
    name: 'اطلاعات شخصی',
    href: routes.forms.personalInformation,
  },
  {
    name: 'خبرنامه',
    href: routes.forms.newsletter,
  },
  // {
  //   name: 'چند مرحله‌ای',
  // },
  {
    name: 'پرداخت تسویه حساب',
  },
  // label start
  {
    name: 'جداول',
  },
  // label end
  {
    name: 'پایه',
    href: routes.tables.basic,
  },
  {
    name: 'قابل جمع‌شدن',
    href: routes.tables.collapsible,
  },
  {
    name: 'پیشرفته',
    href: routes.tables.enhanced,
  },
  {
    name: 'سربرگ چسبیده',
    href: routes.tables.stickyHeader,
  },
  {
    name: 'صفحه‌بندی',
    href: routes.tables.pagination,
  },
  {
    name: 'جستجو',
    href: routes.tables.search,
  },
  // label start
  {
    name: 'صفحات',
  },
  // label end
  {
    name: 'پروفایل',
    href: routes.profile,
  },
  {
    name: 'خوش آمدید',
    href: routes.welcome,
  },
  {
    name: 'به زودی',
    href: routes.comingSoon,
  },
  {
    name: 'دسترسی ممنوع',
    href: routes.accessDenied,
  },
  {
    name: 'یافت نشد',
    href: routes.notFound,
  },
  {
    name: 'تعمیر و نگهداری',
    href: routes.maintenance,
  },
  {
    name: 'خالی',
    href: routes.blank,
  },
  // label start
  {
    name: 'احراز هویت',
  },
  // label end
  {
    name: 'ثبت‌نام مدرن',
    href: routes.auth.signUp1,
  },
  {
    name: 'ثبت‌نام سنتی',
    href: routes.auth.signUp2,
  },
  {
    name: 'ثبت‌نام مدرن',
    href: routes.auth.signUp3,
  },
  {
    name: 'ثبت‌نام شیک',
    href: routes.auth.signUp4,
  },
  {
    name: 'ثبت‌نام کلاسیک',
    href: routes.auth.signUp5,
  },
  {
    name: 'ورود مدرن',
    href: routes.auth.signIn1,
  },
  {
    name: 'ورود سنتی',
    href: routes.auth.signIn2,
  },
  {
    name: 'ورود مدرن',
    href: routes.auth.signIn3,
  },
  {
    name: 'ورود شیک',
    href: routes.auth.signIn4,
  },
  {
    name: 'ورود کلاسیک',
    href: routes.auth.signIn5,
  },
  {
    name: 'فراموشی رمز عبور مدرن',
    href: routes.auth.forgotPassword1,
  },
  {
    name: 'فراموشی رمز عبور سنتی',
    href: routes.auth.forgotPassword2,
  },
  {
    name: 'فراموشی رمز عبور مدرن',
    href: routes.auth.forgotPassword3,
  },
  {
    name: 'فراموشی رمز عبور شیک',
    href: routes.auth.forgotPassword4,
  },
  {
    name: 'فراموشی رمز عبور کلاسیک',
    href: routes.auth.forgotPassword5,
  },
  {
    name: 'صفحه OTP مدرن',
    href: routes.auth.otp1,
  },
  {
    name: 'صفحه OTP سنتی',
    href: routes.auth.otp2,
  },
  {
    name: 'صفحه OTP مدرن',
    href: routes.auth.otp3,
  },
  {
    name: 'صفحه OTP شیک',
    href: routes.auth.otp4,
  },
  {
    name: 'صفحه OTP کلاسیک',
    href: routes.auth.otp5,
  },
];
