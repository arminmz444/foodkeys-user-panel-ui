import { getRandomArrayElement } from '@/utils/get-random-array-element';

const reviewStatus = ['Approved', 'Rejected', 'Pending'];

import { avatarIds } from '@/utils/get-avatar';

export type Review = {
  id: string;
  product: {
    name: string;
    category: string;
    image: string;
  };
  review: string;
  customer: number;
  status: string;
  rating: number;
  createdAt: Date;
};

export const productReviews = [
  {
    id: '13803',
    product: {
      name: 'کتاب‌های ادبیات فارسی',
      category: 'عشق در جایی دیگر',
      image:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/modern/1.webp',
    },
    review: 'یادگیری بهترین راه برای رشد است.',
    customer: {
      name: 'سوسن فروتن',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-13.webp',
    },
    status: 'Pending',
    rating: 4,
    createdAt: '2022-11-12T13:43:07.334Z',
  },
  {
    id: '60586',
    product: {
      name: 'کریم‌های طبیعی ایرانی',
      category: 'پس از باران',
      image:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/modern/2.webp',
    },
    review: 'از شکست‌ها به عنوان درس‌هایی برای پیشرفت بیاموزید.',
    customer: {
      name: 'یاشار پاشایی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-09.webp',
    },
    status: 'Approved',
    rating: 3,
    createdAt: '2023-03-09T20:11:21.277Z',
  },
  {
    id: '48211',
    product: {
      name: 'قالی‌های دستباف ایرانی',
      category: 'عشق در هوا',
      image:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/modern/3.webp',
    },
    review: 'هیچ راهی به تنهایی قطع نمی‌شود، همیشه کمک بخواهید.',
    customer: {
      name: 'بهار امانی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-15.webp',
    },
    status: 'Approved',
    rating: 5,
    createdAt: '2023-08-05T22:34:06.843Z',
  },
  {
    id: '40681',
    product: {
      name: 'سیب زمینی لرستان',
      category: 'داستان عشق',
      image:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/modern/4.webp',
    },
    review: 'موفقیت نهایی، نتیجه تصمیم‌های کوچک روزانه است.',
    customer: {
      name: 'محمد قلی‌پور',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-06.webp',
    },
    status: 'Rejected',
    rating: 4,
    createdAt: '2023-04-29T23:36:04.580Z',
  },
  {
    id: '64606',
    product: {
      name: 'آبنبات',
      category: 'زیبایی‌های زندگی',
      image:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/modern/5.webp',
    },
    review: 'به عشق و احترام به دیگران ارزش دهید.',
    customer: {
      name: 'یلدا نوری‌پور',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-08.webp',
    },
    status: 'Approved',
    rating: 3,
    createdAt: '2023-04-25T02:18:32.327Z',
  },
  {
    id: '46379',
    product: {
      name: 'سیب زمینی لرستان',
      category: 'شعرهای دلنشین',
      image:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/modern/6.webp',
    },
    review: 'موسیقی بهترین دلنوازهای زندگی است.',
    customer: {
      name: 'یاشار باقری',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-06.webp',
    },
    status: 'Pending',
    rating: 2,
    createdAt: '2022-11-26T06:55:37.822Z',
  },
  {
    id: '42080',
    product: {
      name: 'سنتی‌های گلستان',
      category: 'بهانه‌های آسمانی',
      image:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/modern/7.webp',
    },
    review: 'همیشه از لحظه حال خود لذت ببرید، زیرا زندگی زمان کافی ندارد.',
    customer: {
      name: 'سارا شکوهی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-07.webp',
    },
    status: 'Rejected',
    rating: 4,
    createdAt: '2022-09-08T07:29:49.952Z',
  },
  {
    id: '11926',
    product: {
      name: 'نساجی‌های سنتی',
      category: 'گذر زمان',
      image:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/modern/8.webp',
    },
    review: 'یادگیری یک فرآیند مداوم است، نه نهایی.',
    customer: {
      name: 'کامران نوریان',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-05.webp',
    },
    status: 'Rejected',
    rating: 2,
    createdAt: '2023-02-02T14:34:50.655Z',
  },
  {
    id: '99629',
    product: {
      name: 'سیب زمینی لرستان',
      category: 'تمامیت در عشق',
      image:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/modern/9.webp',
    },
    review: 'یادگیری یک فرآیند مداوم است، نه نهایی.',
    customer: {
      name: 'عباس حاجی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-06.webp',
    },
    status: 'Rejected',
    rating: 5,
    createdAt: '2023-08-14T05:10:13.336Z',
  },
  {
    id: '86933',
    product: {
      name: 'صنایع دستی گلیم بافی',
      category: 'مسیر به خوشبختی',
      image:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/modern/10.webp',
    },
    review: 'یادگیری یک فرآیند مداوم است، نه نهایی.',
    customer: {
      name: 'سمیرا امانی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-04.webp',
    },
    status: 'Approved',
    rating: 5,
    createdAt: '2023-08-16T12:17:10.416Z',
  },
  {
    id: '75429',
    product: {
      name: 'زعفران',
      category: 'خاطرات یک سفر',
      image:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/modern/11.webp',
    },
    review: 'زندگی از لحظه‌های کوچک تشکیل شده است، پس از آنها لذت ببرید.',
    customer: {
      name: 'آرش مهرانی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-10.webp',
    },
    status: 'Approved',
    rating: 2,
    createdAt: '2023-01-09T20:30:19.472Z',
  },
  {
    id: '07643',
    product: {
      name: 'نساجی‌های سنتی',
      category: 'زندگی در زمستان',
      image:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/modern/12.webp',
    },
    review: 'از شکست‌ها به عنوان درس‌هایی برای پیشرفت بیاموزید.',
    customer: {
      name: 'آیناز یعقوبی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-09.webp',
    },
    status: 'Pending',
    rating: 3,
    createdAt: '2023-02-07T18:07:53.234Z',
  },
  {
    id: '61950',
    product: {
      name: 'نباتات دارویی ایرانی',
      category: 'روزگارهای مختلف',
      image:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/modern/13.webp',
    },
    review: 'یادگیری یک فرآیند مداوم است، نه نهایی.',
    customer: {
      name: 'ترانه مجتبی‌زاده',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-06.webp',
    },
    status: 'Pending',
    rating: 5,
    createdAt: '2023-08-14T05:48:39.101Z',
  },
  {
    id: '07857',
    product: {
      name: 'زعفران',
      category: 'عشق در دوران ویروس',
      image:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/modern/14.webp',
    },
    review: 'کتاب‌ها دنیای جدیدی را برای ما باز می‌کنند.',
    customer: {
      name: 'نگار عباس‌زاده',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-03.webp',
    },
    status: 'Rejected',
    rating: 3,
    createdAt: '2022-11-28T22:54:11.147Z',
  },
  {
    id: '79280',
    product: {
      name: 'نقاشی هنرمندان ایرانی',
      category: 'شهر زندگی',
      image:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/modern/15.webp',
    },
    review: 'همیشه به راه حل‌ها و راه‌های جدید برای حل مشکلات فکر کنید.',
    customer: {
      name: 'مجتبی مهرانی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-02.webp',
    },
    status: 'Pending',
    rating: 5,
    createdAt: '2022-11-01T01:05:24.896Z',
  },
  {
    id: '72211',
    product: {
      name: 'پرچمداران هنر ایران',
      category: 'عشق و احساسات',
      image:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/modern/16.webp',
    },
    review: 'زندگی یک مسیر پرماجراست.',
    customer: {
      name: 'پگاه یزدانی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-11.webp',
    },
    status: 'Pending',
    rating: 5,
    createdAt: '2023-07-25T09:53:52.751Z',
  },
  {
    id: '30855',
    product: {
      name: 'پرچمداران هنر ایران',
      category: 'عشق در دیگران',
      image:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/modern/7.webp',
    },
    review: 'خوردن یک تکه شکلات در روز بسیار خوب است.',
    customer: {
      name: 'شادی قاضی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-15.webp',
    },
    status: 'Approved',
    rating: 3,
    createdAt: '2023-01-16T21:53:25.463Z',
  },
  {
    id: '18914',
    product: {
      name: 'قالی‌های دستباف ایرانی',
      category: 'در جستجوی عشق',
      image:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/modern/6.webp',
    },
    review: 'مسیر بهترین دوست ما به قلب ما می‌رسد.',
    customer: {
      name: 'آتیلا کشاورز',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-06.webp',
    },
    status: 'Approved',
    rating: 2,
    createdAt: '2023-01-16T23:50:33.073Z',
  },
  {
    id: '31051',
    product: {
      name: 'کتاب‌های ادبیات فارسی',
      category: 'ملاقات با خود',
      image:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/modern/5.webp',
    },
    review: 'امروز هوا آفتابی و زیباست.',
    customer: {
      name: 'پگاه میرزایی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-11.webp',
    },
    status: 'Rejected',
    rating: 5,
    createdAt: '2023-01-15T00:41:20.987Z',
  },
  {
    id: '40238',
    product: {
      name: 'آشنایی با آداب و رسوم ایران',
      category: 'دنیای غم‌انگیز',
      image:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/modern/4.webp',
    },
    review: 'زندگی چون یک مسابقه است، باید تا پایانش دوام آوریم.',
    customer: {
      name: 'یاسمین مهرعلی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-15.webp',
    },
    status: 'Rejected',
    rating: 5,
    createdAt: '2023-07-08T14:40:13.878Z',
  },
  {
    id: '42822',
    product: {
      name: 'کتابخانه‌های تاریخی ایران',
      category: 'زمین در نور خورشید',
      image:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/modern/3.webp',
    },
    review: 'گل زیبایی خود را نشان می‌دهد، حتی وقتی که خودش را نمی‌بیند.',
    customer: {
      name: 'مهدی علی‌نژاد',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-12.webp',
    },
    status: 'Rejected',
    rating: 5,
    createdAt: '2023-01-06T15:28:20.645Z',
  },
  {
    id: '64537',
    product: {
      name: 'نمد بافی',
      category: 'شاهکارهای زندگی',
      image:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/modern/2.webp',
    },
    review: 'یادگیری یک فرآیند مداوم است، نه نهایی.',
    customer: {
      name: 'سارا خوشبخت',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-15.webp',
    },
    status: 'Rejected',
    rating: 5,
    createdAt: '2022-09-01T22:39:24.001Z',
  },
  {
    id: '34101',
    product: {
      name: 'قهوه‌ای ایرانی',
      category: 'در جستجوی عشق',
      image:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/modern/1.webp',
    },
    review: 'به افکارتان مهمی بپردازید، زیرا آنها به کلمات تبدیل می‌شوند.',
    customer: {
      name: 'سوسن رسولی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-05.webp',
    },
    status: 'Rejected',
    rating: 5,
    createdAt: '2022-11-09T13:51:57.982Z',
  },
  {
    id: '24043',
    product: {
      name: 'دستکش و پوشاک سنتی',
      category: 'سکوت و آرامش',
      image:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/modern/7.webp',
    },
    review: 'هیچ تلاشی بی‌فایده نیست، حتی اگر به نتیجه‌ای نرسد.',
    customer: {
      name: 'پارسا اسماعیلی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-11.webp',
    },
    status: 'Pending',
    rating: 3,
    createdAt: '2023-02-11T12:10:59.935Z',
  },
  {
    id: '80797',
    product: {
      name: 'صنایع آلومینیوم ایرانی',
      category: 'پایان داستان',
      image:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/modern/8.webp',
    },
    review: 'هنگام باران، قطرات آب را بشمارید، نه گلها را.',
    customer: {
      name: 'نیلوفر نوری',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-10.webp',
    },
    status: 'Rejected',
    rating: 4,
    createdAt: '2023-04-30T22:32:51.750Z',
  },
  {
    id: '98504',
    product: {
      name: 'میناکاری',
      category: 'آسمان در شب',
      image:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/modern/9.webp',
    },
    review: 'زندگی از لحظه‌های کوچک تشکیل شده است، پس از آنها لذت ببرید.',
    customer: {
      name: 'نگار اکبری',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-09.webp',
    },
    status: 'Approved',
    rating: 3,
    createdAt: '2023-03-26T16:53:07.336Z',
  },
  {
    id: '23650',
    product: {
      name: 'شیرینی‌های سنتی ایرانی',
      category: 'عشق در جایی دیگر',
      image:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/modern/10.webp',
    },
    review: 'به دنیا زیبایی‌های خود را اضافه کنید.',
    customer: {
      name: 'نیما بهمنی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-12.webp',
    },
    status: 'Rejected',
    rating: 2,
    createdAt: '2023-06-21T15:55:13.465Z',
  },
];
