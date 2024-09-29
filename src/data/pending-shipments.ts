import { avatarIds } from '@/utils/get-avatar';
import { getRandomArrayElement } from '@/utils/get-random-array-element';
export const pendingShipments = [
  {
    id: 0,
    trackingNumber: 636183422,
    recipient: {
      name: 'آوا بهرامی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-02.webp',
    },
    destination: 'خیابان شهید دستغیب، کوچه 6، پلاک 18',
    date: '2024-06-26T21:21:21.567Z',
    cost: 153188,
    payment: 'درگاه بانکی',
    status: 'In Transit',
    invoiceStatus: 'Paid',
  },
  {
    id: 1,
    trackingNumber: 811169778,
    recipient: {
      name: 'فرزاد کریمی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-09.webp',
    },
    destination: 'خیابان شهید احمدی، کوچه 28، پلاک 40',
    date: '2017-10-10T20:20:20.789Z',
    cost: 373851,
    payment: 'پرداخت اعتباری',
    status: 'Out For Delivery',
    invoiceStatus: 'Pending',
  },
  {
    id: 2,
    trackingNumber: 533344561,
    recipient: {
      name: 'ترانه صالحی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-10.webp',
    },
    destination: 'خیابان شهید مهرانی، کوچه 30، پلاک 42',
    date: '2017-04-30T15:59:59.333Z',
    cost: 809090,
    payment: 'پرداخت اعتباری',
    status: 'Approved',
    invoiceStatus: 'Pending',
  },
  {
    id: 3,
    trackingNumber: 795842693,
    recipient: {
      name: 'آناهیتا کمالی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-08.webp',
    },
    destination: 'خیابان شهید محمدی، کوچه 22، پلاک 37',
    date: '2021-03-03T13:13:13.123Z',
    cost: 230607,
    payment: 'وام',
    status: 'Out For Delivery',
    invoiceStatus: 'Paid',
  },
  {
    id: 4,
    trackingNumber: 202369069,
    recipient: {
      name: 'شادی مومنی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-13.webp',
    },
    destination: 'خیابان شهید مهدیان، کوچه 20، پلاک 32',
    date: '2017-06-06T17:17:17.789Z',
    cost: 190473,
    payment: 'درگاه بانکی',
    status: 'Out For Delivery',
    invoiceStatus: 'Paid',
  },
  {
    id: 5,
    trackingNumber: 685477663,
    recipient: {
      name: 'علیرضا حاجی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-03.webp',
    },
    destination: 'کوچه دل‌آرا، خیابان سهند، پلاک 55',
    date: '2023-04-04T07:07:07.456Z',
    cost: 392481,
    payment: 'کارت به کارت',
    status: 'Delivered',
    invoiceStatus: 'Pending',
  },
  {
    id: 6,
    trackingNumber: 471034649,
    recipient: {
      name: 'مریم فروتن',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-10.webp',
    },
    destination: 'خیابان شهید شریعتی، کوچه 32، پلاک 46',
    date: '2021-12-12T01:01:01.234Z',
    cost: 568343,
    payment: 'درگاه بانکی',
    status: 'Approved',
    invoiceStatus: 'Paid',
  },
  {
    id: 7,
    trackingNumber: 809902225,
    recipient: {
      name: 'علیرضا حقیقت',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-08.webp',
    },
    destination: 'خیابان شهید رجایی، کوچه 2، پلاک 19',
    date: '2019-09-15T12:30:20.567Z',
    cost: 798420,
    payment: 'کارت به کارت',
    status: 'Delivered',
    invoiceStatus: 'Paid',
  },
  {
    id: 8,
    trackingNumber: 581924388,
    recipient: {
      name: 'آتنا نوری‌پور',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-12.webp',
    },
    destination: 'خیابان شهید مطهری، کوچه 11، پلاک 14',
    date: '2016-09-09T01:01:01.789Z',
    cost: 956463,
    payment: 'وام',
    status: 'Out For Delivery',
    invoiceStatus: 'Paid',
  },
  {
    id: 9,
    trackingNumber: 560654204,
    recipient: {
      name: 'نیکو کلانتری',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-01.webp',
    },
    destination: 'خیابان شهید مخبری، کوچه 3، پلاک 15',
    date: '2017-08-08T12:12:12.890Z',
    cost: 774548,
    payment: 'کارت به کارت',
    status: 'Out For Delivery',
    invoiceStatus: 'Pending',
  },
  {
    id: 10,
    trackingNumber: 756988735,
    recipient: {
      name: 'آذرمی کشاورز',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-15.webp',
    },
    destination: 'کوچه بهرام، خیابان پیروزی، پلاک 39',
    date: '2016-05-05T18:18:18.890Z',
    cost: 657786,
    payment: 'پرداخت اعتباری',
    status: 'Delivery Failed',
    invoiceStatus: 'Paid',
  },
  {
    id: 11,
    trackingNumber: 215682356,
    recipient: {
      name: 'سمیرا مظاهری',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-07.webp',
    },
    destination: 'خیابان شهید حسینی، کوچه 34، پلاک 48',
    date: '2016-08-08T12:12:12.234Z',
    cost: 556052,
    payment: 'پرداخت قسطی',
    status: 'Delivery Failed',
    invoiceStatus: 'Paid',
  },
  {
    id: 12,
    trackingNumber: 432981341,
    recipient: {
      name: 'آرمین رشیدی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-14.webp',
    },
    destination: 'خیابان آزادی، خیابان جمهوری، پلاک 22',
    date: '2015-08-08T18:18:18.123Z',
    cost: 30452,
    payment: 'کارت به کارت',
    status: 'Approved',
    invoiceStatus: 'Pending',
  },
  {
    id: 13,
    trackingNumber: 365121493,
    recipient: {
      name: 'بهناز بذرافکن',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-06.webp',
    },
    destination: 'کوچه بهشتی، خیابان نیلوفر، پلاک 81',
    date: '2020-06-26T18:45:30.123Z',
    cost: 129554,
    payment: 'کارت به کارت',
    status: 'Delivery Failed',
    invoiceStatus: 'OverDue',
  },
  {
    id: 14,
    trackingNumber: 566421298,
    recipient: {
      name: 'مهسان عبدی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-13.webp',
    },
    destination: 'خیابان شهید مطهری، کوچه 11، پلاک 14',
    date: '2016-05-28T09:44:56.456Z',
    cost: 857915,
    payment: 'پرداخت قسطی',
    status: 'Approved',
    invoiceStatus: 'Pending',
  },
  {
    id: 15,
    trackingNumber: 883376757,
    recipient: {
      name: 'فاطمه صالحی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-12.webp',
    },
    destination: 'خیابان شهید دستغیب، کوچه 6، پلاک 18',
    date: '2020-09-05T21:07:07.987Z',
    cost: 36638,
    payment: 'درگاه بانکی',
    status: 'Approved',
    invoiceStatus: 'Paid',
  },
  {
    id: 16,
    trackingNumber: 732219458,
    recipient: {
      name: 'مهسان کاظمی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-08.webp',
    },
    destination: 'خیابان شهید روحانی، کوچه 36، پلاک 50',
    date: '2018-02-02T17:17:17.789Z',
    cost: 814948,
    payment: 'پرداخت اعتباری',
    status: 'In Transit',
    invoiceStatus: 'OverDue',
  },
  {
    id: 17,
    trackingNumber: 797764953,
    recipient: {
      name: 'مهدی نوری‌پور',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-11.webp',
    },
    destination: 'خیابان شهید یوسفی، کوچه 16، پلاک 24',
    date: '2020-04-04T15:15:15.456Z',
    cost: 496543,
    payment: 'پرداخت قسطی',
    status: 'Approved',
    invoiceStatus: 'OverDue',
  },
  {
    id: 18,
    trackingNumber: 299025841,
    recipient: {
      name: 'پارسا علمداری',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-07.webp',
    },
    destination: 'خیابان شهید شریعتی، کوچه 32، پلاک 46',
    date: '2019-01-01T11:11:11.789Z',
    cost: 492739,
    payment: 'پرداخت اعتباری',
    status: 'Delivery Failed',
    invoiceStatus: 'OverDue',
  },
  {
    id: 19,
    trackingNumber: 867675595,
    recipient: {
      name: 'فرشته شریفی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-10.webp',
    },
    destination: 'خیابان شهید کشواد، کوچه 5، پلاک 8',
    date: '2020-04-26T11:11:11.789Z',
    cost: 840409,
    payment: 'کارت به کارت',
    status: 'In Transit',
    invoiceStatus: 'Pending',
  },
  {
    id: 20,
    trackingNumber: 185861442,
    recipient: {
      name: 'نگار نصرتی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-14.webp',
    },
    destination: 'کوچه شهید مفتح، خیابان سهروردی، پلاک 33',
    date: '2016-03-18T03:03:03.000Z',
    cost: 714301,
    payment: 'وام',
    status: 'Delivery Failed',
    invoiceStatus: 'Paid',
  },
  {
    id: 21,
    trackingNumber: 193671357,
    recipient: {
      name: 'بهناز اکبری',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-07.webp',
    },
    destination: 'خیابان مدرس، کوچه 8، پلاک 17',
    date: '2021-05-01T19:18:18.123Z',
    cost: 210325,
    payment: 'پرداخت اعتباری',
    status: 'Delivered',
    invoiceStatus: 'Pending',
  },
  {
    id: 22,
    trackingNumber: 488024224,
    recipient: {
      name: 'نادر امانی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-14.webp',
    },
    destination: 'کوچه بهرام، خیابان پیروزی، پلاک 39',
    date: '2014-01-01T18:18:18.123Z',
    cost: 931654,
    payment: 'پرداخت آنلاین ',
    status: 'In Transit',
    invoiceStatus: 'OverDue',
  },
  {
    id: 23,
    trackingNumber: 480479413,
    recipient: {
      name: 'شهرزاد یزدانی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-06.webp',
    },
    destination: 'کوچه مهدوی، خیابان امین، پلاک 57',
    date: '2017-11-11T12:12:12.123Z',
    cost: 110706,
    payment: 'پرداخت آنلاین ',
    status: 'Out For Delivery',
    invoiceStatus: 'OverDue',
  },
  {
    id: 24,
    trackingNumber: 700952684,
    recipient: {
      name: 'سارا مهرعلی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-04.webp',
    },
    destination: 'خیابان شهید شهریاری، کوچه 40، پلاک 58',
    date: '2018-06-06T17:17:17.123Z',
    cost: 154436,
    payment: 'پرداخت آنلاین ',
    status: 'Delivered',
    invoiceStatus: 'Pending',
  },
  {
    id: 25,
    trackingNumber: 642543518,
    recipient: {
      name: 'حسن اسدی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-03.webp',
    },
    destination: 'خیابان شهید مهدیان، کوچه 20، پلاک 32',
    date: '2022-04-11T03:20:59.777Z',
    cost: 272498,
    payment: 'درگاه بانکی',
    status: 'Out For Delivery',
    invoiceStatus: 'OverDue',
  },
  {
    id: 26,
    trackingNumber: 750938899,
    recipient: {
      name: 'نازی یعقوبی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-10.webp',
    },
    destination: 'خیابان شهید روحانی، کوچه 36، پلاک 50',
    date: '2022-04-04T07:07:07.234Z',
    cost: 50599,
    payment: 'پرداخت آنلاین ',
    status: 'Approved',
    invoiceStatus: 'OverDue',
  },
  {
    id: 27,
    trackingNumber: 914547245,
    recipient: {
      name: 'آرتین رئیسی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-09.webp',
    },
    destination: 'کوچه امامت، خیابان بهروز، پلاک 31',
    date: '2014-01-01T18:18:18.123Z',
    cost: 908699,
    payment: 'کارت به کارت',
    status: 'Approved',
    invoiceStatus: 'Pending',
  },
  {
    id: 28,
    trackingNumber: 601264704,
    recipient: {
      name: 'آتیلا آقاجانی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-03.webp',
    },
    destination: 'کوچه امامت، خیابان بهروز، پلاک 31',
    date: '2015-09-09T13:13:13.456Z',
    cost: 468583,
    payment: 'درگاه بانکی',
    status: 'In Transit',
    invoiceStatus: 'OverDue',
  },
  {
    id: 29,
    trackingNumber: 654901296,
    recipient: {
      name: 'سمیرا پورمحمد',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-04.webp',
    },
    destination: 'کوچه بهشتی، خیابان جمهوری، پلاک 13',
    date: '2014-01-01T18:18:18.123Z',
    cost: 699435,
    payment: 'پرداخت اعتباری',
    status: 'Approved',
    invoiceStatus: 'Paid',
  },
  {
    id: 30,
    trackingNumber: 768136261,
    recipient: {
      name: 'حمید مهرانی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-03.webp',
    },
    destination: 'کوچه یاس، خیابان ولیعصر، پلاک 6',
    date: '2023-10-09T01:14:21.987Z',
    cost: 171421,
    payment: 'پرداخت قسطی',
    status: 'Delivery Failed',
    invoiceStatus: 'OverDue',
  },
  {
    id: 31,
    trackingNumber: 966523867,
    recipient: {
      name: 'بابک نظری',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-09.webp',
    },
    destination: 'کوچه شهید علی‌نژاد، خیابان بهارستان، پلاک 28',
    date: '2015-02-02T09:09:09.567Z',
    cost: 40608,
    payment: 'پرداخت آنلاین ',
    status: 'In Transit',
    invoiceStatus: 'Pending',
  },
  {
    id: 32,
    trackingNumber: 648859619,
    recipient: {
      name: 'سمیرا فرجی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-10.webp',
    },
    destination: 'کوچه بهار، خیابان سعدی، پلاک 12',
    date: '2023-01-01T14:14:14.123Z',
    cost: 15975,
    payment: 'کارت به کارت',
    status: 'In Transit',
    invoiceStatus: 'Paid',
  },
  {
    id: 33,
    trackingNumber: 837974380,
    recipient: {
      name: 'آریا مجتبی‌زاده',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-05.webp',
    },
    destination: 'خیابان شهید شهریاری، کوچه 40، پلاک 58',
    date: '2020-12-12T08:08:08.789Z',
    cost: 295759,
    payment: 'کارت به کارت',
    status: 'Delivery Failed',
    invoiceStatus: 'Pending',
  },
  {
    id: 34,
    trackingNumber: 423468355,
    recipient: {
      name: 'کیان بهمنی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-15.webp',
    },
    destination: 'کوچه شهیدان، خیابان شهید باهنر، پلاک 20',
    date: '2017-03-02T00:00:00.789Z',
    cost: 943272,
    payment: 'پرداخت اعتباری',
    status: 'Out For Delivery',
    invoiceStatus: 'Pending',
  },
  {
    id: 35,
    trackingNumber: 708189141,
    recipient: {
      name: 'آرمین قاضی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-06.webp',
    },
    destination: 'کوچه مهدوی، خیابان امین، پلاک 57',
    date: '2019-04-20T21:10:36.222Z',
    cost: 493191,
    payment: 'پرداخت قسطی',
    status: 'Delivered',
    invoiceStatus: 'Paid',
  },
  {
    id: 36,
    trackingNumber: 204515943,
    recipient: {
      name: 'رویا کاظمی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-07.webp',
    },
    destination: 'کوچه یوسفی، خیابان مطهری، پلاک 69',
    date: '2018-01-01T10:10:10.567Z',
    cost: 215875,
    payment: 'کارت به کارت',
    status: 'In Transit',
    invoiceStatus: 'Paid',
  },
  {
    id: 37,
    trackingNumber: 741080743,
    recipient: {
      name: 'پدرام سلطانی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-08.webp',
    },
    destination: 'کوچه شهید مفتح، خیابان سهروردی، پلاک 33',
    date: '2015-01-01T18:18:18.456Z',
    cost: 780984,
    payment: 'وام',
    status: 'In Transit',
    invoiceStatus: 'OverDue',
  },
  {
    id: 38,
    trackingNumber: 747420142,
    recipient: {
      name: 'کیان رضایی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-05.webp',
    },
    destination: 'کوچه حسینی، خیابان مشیری، پلاک 41',
    date: '2014-05-05T13:13:13.123Z',
    cost: 937867,
    payment: 'درگاه بانکی',
    status: 'Approved',
    invoiceStatus: 'Pending',
  },
  {
    id: 39,
    trackingNumber: 502649189,
    recipient: {
      name: 'محمد شمس',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-03.webp',
    },
    destination: 'کوچه نجفی، خیابان معلم، پلاک 36',
    date: '2019-05-07T10:10:10.123Z',
    cost: 899098,
    payment: 'درگاه بانکی',
    status: 'In Transit',
    invoiceStatus: 'Paid',
  },
  {
    id: 40,
    trackingNumber: 326610122,
    recipient: {
      name: 'نازی سیف',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-07.webp',
    },
    destination: 'کوچه قاسمی، خیابان بهمن، پلاک 61',
    date: '2020-10-10T04:04:04.234Z',
    cost: 945452,
    payment: 'وام',
    status: 'Out For Delivery',
    invoiceStatus: 'OverDue',
  },
  {
    id: 41,
    trackingNumber: 690904776,
    recipient: {
      name: 'مهدی آذرمی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-01.webp',
    },
    destination: 'کوچه بهمنی، خیابان جهانبخش، پلاک 51',
    date: '2014-05-05T13:13:13.123Z',
    cost: 195922,
    payment: 'درگاه بانکی',
    status: 'Delivered',
    invoiceStatus: 'Pending',
  },
  {
    id: 42,
    trackingNumber: 868740006,
    recipient: {
      name: 'محمد حسن‌نژاد',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-01.webp',
    },
    destination: 'کوچه یاس، خیابان ولیعصر، پلاک 6',
    date: '2020-12-12T06:06:06.567Z',
    cost: 522385,
    payment: 'پرداخت قسطی',
    status: 'In Transit',
    invoiceStatus: 'Pending',
  },
  {
    id: 43,
    trackingNumber: 558334749,
    recipient: {
      name: 'فرشته صفری',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-14.webp',
    },
    destination: 'خیابان شهید روحانی، کوچه 36، پلاک 50',
    date: '2021-03-03T12:12:12.456Z',
    cost: 632023,
    payment: 'پرداخت قسطی',
    status: 'Out For Delivery',
    invoiceStatus: 'Pending',
  },
  {
    id: 44,
    trackingNumber: 283128923,
    recipient: {
      name: 'مجتبی بهمنی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-05.webp',
    },
    destination: 'خیابان شهید محمدی، کوچه 22، پلاک 37',
    date: '2015-02-02T09:09:09.567Z',
    cost: 228419,
    payment: 'وام',
    status: 'Delivery Failed',
    invoiceStatus: 'Pending',
  },
  {
    id: 45,
    trackingNumber: 255026182,
    recipient: {
      name: 'نیلوفر رستمی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-10.webp',
    },
    destination: 'کوچه مطهری، خیابان انقلاب، پلاک 10',
    date: '2015-04-04T01:01:01.567Z',
    cost: 434198,
    payment: 'وام',
    status: 'Approved',
    invoiceStatus: 'Pending',
  },
  {
    id: 46,
    trackingNumber: 588353865,
    recipient: {
      name: 'آرتین سلیمانی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-05.webp',
    },
    destination: 'خیابان شهید خلج، کوچه 24، پلاک 34',
    date: '2020-04-04T16:16:16.123Z',
    cost: 806226,
    payment: 'درگاه بانکی',
    status: 'Out For Delivery',
    invoiceStatus: 'Paid',
  },
  {
    id: 47,
    trackingNumber: 550179069,
    recipient: {
      name: 'کامبیز پورمحمد',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-14.webp',
    },
    destination: 'خیابان شهید شیرودی، کوچه 18، پلاک 29',
    date: '2014-08-07T12:12:12.888Z',
    cost: 353804,
    payment: 'وام',
    status: 'In Transit',
    invoiceStatus: 'Pending',
  },
  {
    id: 48,
    trackingNumber: 823738432,
    recipient: {
      name: 'سمیرا موسوی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-07.webp',
    },
    destination: 'کوچه یاس، خیابان ولیعصر، پلاک 6',
    date: '2019-07-07T09:09:09.123Z',
    cost: 355860,
    payment: 'کارت به کارت',
    status: 'Delivery Failed',
    invoiceStatus: 'Paid',
  },
  {
    id: 49,
    trackingNumber: 749667157,
    recipient: {
      name: 'پارسا همتی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-02.webp',
    },
    destination: 'کوچه نور، خیابان انقلاب، پلاک 23',
    date: '2020-12-12T07:07:07.123Z',
    cost: 713316,
    payment: 'پرداخت قسطی',
    status: 'Out For Delivery',
    invoiceStatus: 'OverDue',
  },
];
// export const pendingShipments = [
//   {
//     id: '80021',
//     trackingNumber: '2836142156719869',
//     recipient: {
//       name: 'Guillermo McLaughlin',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//     },
//     destination: '384 Coby Light',
//     date: '2018-11-19T08:26:34.288Z',
//     cost: '740.00',
//     payment: 'COD',
//     status: 'Approved',
//     invoiceStatus: 'Pending',
//   },
//   {
//     id: '22219',
//     trackingNumber: '9101855999470240',
//     recipient: {
//       name: 'Orville Kub',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//     },
//     destination: '97562 Jacobs Pines',
//     date: '2018-11-01T01:26:09.596Z',
//     cost: '567.00',
//     payment: 'Paypal',
//     status: 'Out For Delivery',
//     invoiceStatus: 'OverDue',
//   },
//   {
//     id: '17734',
//     trackingNumber: '5730109791363725',
//     recipient: {
//       name: 'Melanie Lehner',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//     },
//     destination: '3049 Fanny Street',
//     date: '2019-04-03T01:54:40.540Z',
//     cost: '260.00',
//     payment: 'Paypal',
//     status: 'Approved',
//     invoiceStatus: 'Paid',
//   },
//   {
//     id: '31951',
//     trackingNumber: '9020589695119416',
//     recipient: {
//       name: 'Diane Feest',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//     },
//     destination: '68446 McDermott Run',
//     date: '2019-06-24T12:38:51.290Z',
//     cost: '759.00',
//     payment: 'COD',
//     status: 'Approved',
//     invoiceStatus: 'Paid',
//   },
//   {
//     id: '49669',
//     trackingNumber: '4354944726670868',
//     recipient: {
//       name: 'Nellie Shields',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//     },
//     destination: '8291 McLaughlin Groves',
//     date: '2018-02-11T14:46:26.195Z',
//     cost: '646.00',
//     payment: 'Credit Card',
//     status: 'Delivery Failed',
//     invoiceStatus: 'Pending',
//   },
//   {
//     id: '71871',
//     trackingNumber: '9570666661812187',
//     recipient: {
//       name: 'Natasha Littel',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//     },
//     destination: '4046 Jailyn Rest',
//     date: '2018-08-19T04:43:53.577Z',
//     cost: '113.00',
//     payment: 'COD',
//     status: 'Out For Delivery',
//     invoiceStatus: 'Paid',
//   },
//   {
//     id: '56727',
//     trackingNumber: '7245042528066667',
//     recipient: {
//       name: 'Janis Daniel',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//     },
//     destination: '6109 Seth Pines',
//     date: '2018-01-26T11:25:12.493Z',
//     cost: '166.00',
//     payment: 'COD',
//     status: 'Delivered',
//     invoiceStatus: 'Pending',
//   },
//   {
//     id: '35560',
//     trackingNumber: '1344996327496556',
//     recipient: {
//       name: 'Garry Kris',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//     },
//     destination: '404 Gutkowski Crescent',
//     date: '2020-11-14T06:40:32.757Z',
//     cost: '535.00',
//     payment: 'COD',
//     status: 'In Transit',
//     invoiceStatus: 'Pending',
//   },
//   {
//     id: '24767',
//     trackingNumber: '2932871000336745',
//     recipient: {
//       name: 'Frankie Altenwerth',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//     },
//     destination: '9074 Breitenberg View',
//     date: '2022-09-20T23:38:03.223Z',
//     cost: '175.00',
//     payment: 'Paypal',
//     status: 'In Transit',
//     invoiceStatus: 'OverDue',
//   },
//   {
//     id: '04515',
//     trackingNumber: '2866736796234601',
//     recipient: {
//       name: 'Alyssa Howell',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//     },
//     destination: '33286 Guadalupe Haven',
//     date: '2020-09-14T20:33:49.901Z',
//     cost: '364.00',
//     payment: 'Paypal',
//     status: 'Out For Delivery',
//     invoiceStatus: 'Paid',
//   },
//   {
//     id: '04052',
//     trackingNumber: '6793116155096416',
//     recipient: {
//       name: 'Miss Emily Swaniawski-Kohler',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//     },
//     destination: '434 Tremblay Pike',
//     date: '2021-07-09T07:05:42.214Z',
//     cost: '221.00',
//     payment: 'COD',
//     status: 'Delivered',
//     invoiceStatus: 'Paid',
//   },
//   {
//     id: '60869',
//     trackingNumber: '7628333446545045',
//     recipient: {
//       name: 'Bryan Larkin',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//     },
//     destination: '13105 Reuben Extensions',
//     date: '2021-11-01T22:29:30.584Z',
//     cost: '991.00',
//     payment: 'COD',
//     status: 'Out For Delivery',
//     invoiceStatus: 'Paid',
//   },
//   {
//     id: '63484',
//     trackingNumber: '6775091255474608',
//     recipient: {
//       name: 'Ms. Jodi Ferry',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//     },
//     destination: '2695 Ruecker Loop',
//     date: '2019-09-21T07:28:55.561Z',
//     cost: '624.00',
//     payment: 'COD',
//     status: 'Delivery Failed',
//     invoiceStatus: 'Paid',
//   },
//   {
//     id: '07234',
//     trackingNumber: '7000633712849244',
//     recipient: {
//       name: 'Bruce Kunde',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//     },
//     destination: '99083 Sammy View',
//     date: '2018-05-09T12:41:02.608Z',
//     cost: '575.00',
//     payment: 'Credit Card',
//     status: 'In Transit',
//     invoiceStatus: 'OverDue',
//   },
//   {
//     id: '08496',
//     trackingNumber: '9027492797713803',
//     recipient: {
//       name: 'Van Rath',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//     },
//     destination: '812 Marjory Ridge',
//     date: '2022-05-27T01:37:00.252Z',
//     cost: '651.00',
//     payment: 'COD',
//     status: 'In Transit',
//     invoiceStatus: 'Paid',
//   },
//   {
//     id: '28306',
//     trackingNumber: '1729936797792926',
//     recipient: {
//       name: 'Terrance Terry',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//     },
//     destination: '257 Elijah Wall',
//     date: '2023-07-06T03:44:02.688Z',
//     cost: '981.00',
//     payment: 'Credit Card',
//     status: 'Approved',
//     invoiceStatus: 'Pending',
//   },
//   {
//     id: '98545',
//     trackingNumber: '1136263014660257',
//     recipient: {
//       name: 'Nathan Luettgen V',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//     },
//     destination: '46839 Mayert Forest',
//     date: '2018-07-23T05:37:09.113Z',
//     cost: '313.00',
//     payment: 'COD',
//     status: 'Approved',
//     invoiceStatus: 'Pending',
//   },
//   {
//     id: '01844',
//     trackingNumber: '6958585054907520',
//     recipient: {
//       name: 'Kristen Thiel',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//     },
//     destination: '2617 Orn Drives',
//     date: '2021-06-08T15:30:53.251Z',
//     cost: '475.00',
//     payment: 'COD',
//     status: 'Approved',
//     invoiceStatus: 'Pending',
//   },
//   {
//     id: '98134',
//     trackingNumber: '1858874799025770',
//     recipient: {
//       name: 'Iris Wolf',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//     },
//     destination: '754 Larue Cliff',
//     date: '2021-05-02T21:20:47.193Z',
//     cost: '623.00',
//     payment: 'Paypal',
//     status: 'Delivered',
//     invoiceStatus: 'Paid',
//   },
//   {
//     id: '89031',
//     trackingNumber: '3718889181897589',
//     recipient: {
//       name: 'Dr. Rosa Olson',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//     },
//     destination: '73783 Flatley Turnpike',
//     date: '2020-01-23T05:44:31.642Z',
//     cost: '466.00',
//     payment: 'Credit Card',
//     status: 'In Transit',
//     invoiceStatus: 'Pending',
//   },
//   {
//     id: '46337',
//     trackingNumber: '5148530734362262',
//     recipient: {
//       name: 'Billie Hintz-Okuneva',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//     },
//     destination: '9317 Mertz Neck',
//     date: '2020-10-08T01:05:22.088Z',
//     cost: '438.00',
//     payment: 'Paypal',
//     status: 'In Transit',
//     invoiceStatus: 'Paid',
//   },
//   {
//     id: '27240',
//     trackingNumber: '5549474711684906',
//     recipient: {
//       name: 'Darin King',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//     },
//     destination: '9610 Dariana Pine',
//     date: '2019-11-25T20:35:15.484Z',
//     cost: '252.00',
//     payment: 'COD',
//     status: 'Delivery Failed',
//     invoiceStatus: 'Paid',
//   },
//   {
//     id: '10126',
//     trackingNumber: '6456021141019555',
//     recipient: {
//       name: 'Elias Watsica',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//     },
//     destination: '2677 Waino Coves',
//     date: '2023-03-29T07:41:44.780Z',
//     cost: '463.00',
//     payment: 'Paypal',
//     status: 'Delivered',
//     invoiceStatus: 'OverDue',
//   },
//   {
//     id: '87546',
//     trackingNumber: '3227450359352529',
//     recipient: {
//       name: 'Billie Bartell',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//     },
//     destination: '889 Victoria Lock',
//     date: '2022-09-11T21:22:59.917Z',
//     cost: '647.00',
//     payment: 'Credit Card',
//     status: 'Delivery Failed',
//     invoiceStatus: 'Pending',
//   },
//   {
//     id: '50534',
//     trackingNumber: '8953668019764301',
//     recipient: {
//       name: 'Erma Will',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//     },
//     destination: '101 Gerard Shoal',
//     date: '2022-10-03T01:41:28.492Z',
//     cost: '306.00',
//     payment: 'Paypal',
//     status: 'Delivered',
//     invoiceStatus: 'Pending',
//   },
//   {
//     id: '76676',
//     trackingNumber: '3167153519406302',
//     recipient: {
//       name: 'Mandy Corwin',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//     },
//     destination: '2897 Zora Circles',
//     date: '2023-02-16T12:48:52.407Z',
//     cost: '460.00',
//     payment: 'Paypal',
//     status: 'Delivered',
//     invoiceStatus: 'Paid',
//   },
//   {
//     id: '49955',
//     trackingNumber: '8997608936179471',
//     recipient: {
//       name: 'Shannon Hoeger',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//     },
//     destination: '1671 Marielle Lights',
//     date: '2020-10-19T21:48:41.935Z',
//     cost: '349.00',
//     payment: 'Credit Card',
//     status: 'Delivery Failed',
//     invoiceStatus: 'Paid',
//   },
//   {
//     id: '10607',
//     trackingNumber: '5636351394327636',
//     recipient: {
//       name: 'Audrey Farrell',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//     },
//     destination: '7243 Scotty Course',
//     date: '2022-05-08T06:41:58.270Z',
//     cost: '632.00',
//     payment: 'Credit Card',
//     status: 'Out For Delivery',
//     invoiceStatus: 'OverDue',
//   },
//   {
//     id: '04752',
//     trackingNumber: '7912007977013719',
//     recipient: {
//       name: 'Mr. Jonathan Schuppe',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//     },
//     destination: '2682 Tiara Forks',
//     date: '2020-05-24T23:10:04.469Z',
//     cost: '477.00',
//     payment: 'COD',
//     status: 'Approved',
//     invoiceStatus: 'OverDue',
//   },
//   {
//     id: '94048',
//     trackingNumber: '4305901430442398',
//     recipient: {
//       name: 'Dr. Teri Fahey',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//     },
//     destination: '121 Curt Alley',
//     date: '2020-08-21T11:50:49.527Z',
//     cost: '509.00',
//     payment: 'COD',
//     status: 'Delivery Failed',
//     invoiceStatus: 'OverDue',
//   },
//   {
//     id: '42305',
//     trackingNumber: '6016245679617827',
//     recipient: {
//       name: 'Ms. Jean Schneider',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//     },
//     destination: '65028 Cruickshank Fords',
//     date: '2018-01-31T09:50:35.591Z',
//     cost: '712.00',
//     payment: 'Paypal',
//     status: 'Out For Delivery',
//     invoiceStatus: 'Paid',
//   },
// ];

// console.log(new Set(pendingShipments.map((test) => test.invoiceStatus)));
