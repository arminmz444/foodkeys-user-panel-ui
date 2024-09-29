import { avatarIds } from '@/utils/get-avatar';
import { getRandomArrayElement } from '@/utils/get-random-array-element';

export type TopCustomerType = {
  id: string;
  user: {
    name: string;
    avatar: string;
    email: string;
  };
  country: {
    name: string;
    code: string;
  };
  noOfShipment: number;
  cost: string;
};

export const topCustomers = [
  {
    id: 'SE858',
    user: {
      name: 'نیکی باقری',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-12.webp',
      email: 'jared_weimann57@yahoo.com',
    },
    country: { name: 'جمهوری دموکراتیک کنگو', code: 'CD' },
    noOfShipment: 9,
    cost: '689.00',
  },
  {
    id: 'VP325',
    user: {
      name: 'سجاد آقاخانی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-04.webp',
      email: 'gloria_mohr@hotmail.com',
    },
    country: { name: 'لتونی', code: 'LV' },
    noOfShipment: 1,
    cost: '737.00',
  },
  {
    id: 'EC639',
    user: {
      name: 'سهیلا نوری‌پور',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-11.webp',
      email: 'aliza.wiza29@gmail.com',
    },
    country: { name: 'مونتسرات', code: 'MS' },
    noOfShipment: 6,
    cost: '415.00',
  },
  {
    id: 'MZ671',
    user: {
      name: 'کوروش فرجی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-13.webp',
      email: 'lurline.nienow45@yahoo.com',
    },
    country: { name: 'نیکاراگوئه', code: 'NI' },
    noOfShipment: 6,
    cost: '744.00',
  },
  {
    id: 'RG510',
    user: {
      name: 'پریسا قدسی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-14.webp',
      email: 'maiya_bailey@gmail.com',
    },
    country: { name: 'سیشل', code: 'SC' },
    noOfShipment: 3,
    cost: '408.00',
  },
  {
    id: 'QS080',
    user: {
      name: 'امید کیانی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-05.webp',
      email: 'jarred_sipes@hotmail.com',
    },
    country: { name: 'جمهوری دموکراتیک خلق کره', code: 'KP' },
    noOfShipment: 4,
    cost: '746.00',
  },
  {
    id: 'UO154',
    user: {
      name: 'پگاه سلطانی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-05.webp',
      email: 'sigmund_zieme@yahoo.com',
    },
    country: { name: 'اریتره', code: 'ER' },
    noOfShipment: 5,
    cost: '800.00',
  },
  {
    id: 'SO247',
    user: {
      name: 'نادر آقاجانی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-03.webp',
      email: 'mason_macejkovic@gmail.com',
    },
    country: { name: 'جزایر سلیمان', code: 'SB' },
    noOfShipment: 4,
    cost: '501.00',
  },
  {
    id: 'LR832',
    user: {
      name: 'حامد عزیزی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-01.webp',
      email: 'abby.kemmer68@hotmail.com',
    },
    country: { name: 'جمهوری دموکراتیک کنگو', code: 'CD' },
    noOfShipment: 8,
    cost: '153.00',
  },
  {
    id: 'ME262',
    user: {
      name: 'مهسان خوشبخت',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-08.webp',
      email: 'royal.schinner79@hotmail.com',
    },
    country: { name: 'جزیره هرد و جزایر مک‌دونالد', code: 'HM' },
    noOfShipment: 8,
    cost: '994.00',
  },
  {
    id: 'YP369',
    user: {
      name: 'پریسا عبداللهی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-02.webp',
      email: 'doris_parisian@yahoo.com',
    },
    country: { name: 'بوتان', code: 'BT' },
    noOfShipment: 1,
    cost: '172.00',
  },
  {
    id: 'ZK736',
    user: {
      name: 'آرتا خانی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-07.webp',
      email: 'mina_hilpert@yahoo.com',
    },
    country: { name: 'فیجی', code: 'FJ' },
    noOfShipment: 5,
    cost: '103.00',
  },
  {
    id: 'NS479',
    user: {
      name: 'سارا صالحی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-06.webp',
      email: 'evie_deckow@gmail.com',
    },
    country: { name: 'هندوراس', code: 'HN' },
    noOfShipment: 4,
    cost: '568.00',
  },
  {
    id: 'DF799',
    user: {
      name: 'الهام قلیچ‌خانی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-13.webp',
      email: 'clemmie_bergstrom@gmail.com',
    },
    country: { name: 'گینه', code: 'GN' },
    noOfShipment: 9,
    cost: '204.00',
  },
  {
    id: 'AZ892',
    user: {
      name: 'حسن صفایی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-06.webp',
      email: 'keith_herzog57@yahoo.com',
    },
    country: { name: 'جزیره هرد و جزایر مک‌دونالد', code: 'HM' },
    noOfShipment: 5,
    cost: '636.00',
  },
  {
    id: 'GD668',
    user: {
      name: 'آیناز رحیمی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-08.webp',
      email: 'mabel_simonis@yahoo.com',
    },
    country: { name: 'اوکراین', code: 'UA' },
    noOfShipment: 9,
    cost: '920.00',
  },
  {
    id: 'JV552',
    user: {
      name: 'سمانه خوشبخت',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-02.webp',
      email: 'korbin_kilback@gmail.com',
    },
    country: { name: 'سنت کیتس و نویس', code: 'KN' },
    noOfShipment: 6,
    cost: '834.00',
  },
  {
    id: 'XF349',
    user: {
      name: 'شیرین بلوچ',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-03.webp',
      email: 'carolyne89@yahoo.com',
    },
    country: { name: 'اوگاندا', code: 'UG' },
    noOfShipment: 8,
    cost: '397.00',
  },
  {
    id: 'YO167',
    user: {
      name: 'کیان داودی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-10.webp',
      email: 'laurel36@hotmail.com',
    },
    country: { name: 'بنین', code: 'BJ' },
    noOfShipment: 9,
    cost: '998.00',
  },
  {
    id: 'KR634',
    user: {
      name: 'آتیلا یوسفی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-06.webp',
      email: 'diana.toy@yahoo.com',
    },
    country: { name: 'قطر', code: 'QA' },
    noOfShipment: 1,
    cost: '845.00',
  },
  {
    id: 'IO913',
    user: {
      name: 'ندا شمس',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-13.webp',
      email: 'cleveland_krajcik@gmail.com',
    },
    country: { name: 'جامائیکا', code: 'JM' },
    noOfShipment: 4,
    cost: '488.00',
  },
  {
    id: 'ZT806',
    user: {
      name: 'آذرمی کلانتری',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-10.webp',
      email: 'christa35@hotmail.com',
    },
    country: { name: 'دانمارک', code: 'DK' },
    noOfShipment: 1,
    cost: '933.00',
  },
  {
    id: 'XA924',
    user: {
      name: 'سمیرا صمدی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-02.webp',
      email: 'kianna.kirlin@gmail.com',
    },
    country: { name: 'آنتارکتیکا', code: 'AQ' },
    noOfShipment: 2,
    cost: '769.00',
  },
  {
    id: 'ZX753',
    user: {
      name: 'هاله قاسمی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-11.webp',
      email: 'lincoln33@hotmail.com',
    },
    country: { name: 'بنگلادش', code: 'BD' },
    noOfShipment: 9,
    cost: '301.00',
  },
  {
    id: 'ZQ170',
    user: {
      name: 'محمد نوری',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-15.webp',
      email: 'bradford_connelly@hotmail.com',
    },
    country: { name: 'سنت وینسنت و گرنادین‌ها', code: 'VC' },
    noOfShipment: 1,
    cost: '901.00',
  },
  {
    id: 'AT987',
    user: {
      name: 'نیکی مومنی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-01.webp',
      email: 'quentin.crooks95@yahoo.com',
    },
    country: { name: 'سنت کیتس و نویس', code: 'KN' },
    noOfShipment: 9,
    cost: '809.00',
  },
  {
    id: 'YS387',
    user: {
      name: 'نیلوفر اکبری',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-06.webp',
      email: 'trevion_armstrong21@hotmail.com',
    },
    country: { name: 'گویان', code: 'GY' },
    noOfShipment: 8,
    cost: '352.00',
  },
  {
    id: 'XS156',
    user: {
      name: 'فرشته مهدی‌پور',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-03.webp',
      email: 'rupert.senger36@hotmail.com',
    },
    country: { name: 'گرجستان', code: 'GE' },
    noOfShipment: 7,
    cost: '902.00',
  },
  {
    id: 'BB586',
    user: {
      name: 'آتنا رئیسی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-09.webp',
      email: 'ebba.hilpert@hotmail.com',
    },
    country: { name: 'ونزوئلا', code: 'VE' },
    noOfShipment: 9,
    cost: '564.00',
  },
  {
    id: 'MD300',
    user: {
      name: 'پریسا فهیمی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-12.webp',
      email: 'jeanne_mante88@gmail.com',
    },
    country: { name: 'دانمارک', code: 'DK' },
    noOfShipment: 9,
    cost: '639.00',
  },
  {
    id: 'HX568',
    user: {
      name: 'سمانه شمس',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-10.webp',
      email: 'raven.pfeffer85@gmail.com',
    },
    country: { name: 'فنلاند', code: 'FI' },
    noOfShipment: 4,
    cost: '469.00',
  },
  {
    id: 'FW578',
    user: {
      name: 'لیلا قاضی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-11.webp',
      email: 'penelope_daniel46@hotmail.com',
    },
    country: { name: 'کوراسائو', code: 'CW' },
    noOfShipment: 7,
    cost: '351.00',
  },
  {
    id: 'XD917',
    user: {
      name: 'آرتین علیزاده',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-05.webp',
      email: 'xavier97@gmail.com',
    },
    country: { name: 'قزاقستان', code: 'KZ' },
    noOfShipment: 5,
    cost: '213.00',
  },
  {
    id: 'KM192',
    user: {
      name: 'بهنام اشرفی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-03.webp',
      email: 'elena85@yahoo.com',
    },
    country: { name: 'بنگلادش', code: 'BD' },
    noOfShipment: 7,
    cost: '892.00',
  },
  {
    id: 'XG304',
    user: {
      name: 'فرزانه باقری',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-06.webp',
      email: 'neha_bauch@gmail.com',
    },
    country: { name: 'جمهوری دموکراتیک کنگو', code: 'CD' },
    noOfShipment: 4,
    cost: '513.00',
  },
  {
    id: 'DL448',
    user: {
      name: 'مریم پورعلی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-06.webp',
      email: 'mary.kuhic54@hotmail.com',
    },
    country: { name: 'جمهوری آفریقای مرکزی', code: 'CF' },
    noOfShipment: 7,
    cost: '240.00',
  },
  {
    id: 'AG621',
    user: {
      name: 'بهنام آقاخانی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-03.webp',
      email: 'blaze91@yahoo.com',
    },
    country: { name: 'قزاقستان', code: 'KZ' },
    noOfShipment: 5,
    cost: '456.00',
  },
  {
    id: 'KT264',
    user: {
      name: 'آیدا فرشاد',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-06.webp',
      email: 'jana.franecki83@yahoo.com',
    },
    country: { name: 'جامائیکا', code: 'JM' },
    noOfShipment: 4,
    cost: '601.00',
  },
  {
    id: 'GB499',
    user: {
      name: 'بهار توحیدی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-09.webp',
      email: 'sammy68@hotmail.com',
    },
    country: { name: 'چاد', code: 'TD' },
    noOfShipment: 3,
    cost: '212.00',
  },
  {
    id: 'JO416',
    user: {
      name: 'ندا رئیسی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-03.webp',
      email: 'alfonso59@gmail.com',
    },
    country: { name: 'جمهوری آفریقای مرکزی', code: 'CF' },
    noOfShipment: 7,
    cost: '230.00',
  },
  {
    id: 'NV809',
    user: {
      name: 'مهرداد یعقوبی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-11.webp',
      email: 'mable_effertz@hotmail.com',
    },
    country: { name: 'سنت وینسنت و گرنادین‌ها', code: 'VC' },
    noOfShipment: 3,
    cost: '934.00',
  },
  {
    id: 'WI287',
    user: {
      name: 'رویا اسماعیلی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-07.webp',
      email: 'pansy_jacobson20@gmail.com',
    },
    country: { name: 'دانمارک', code: 'DK' },
    noOfShipment: 7,
    cost: '274.00',
  },
  {
    id: 'CY204',
    user: {
      name: 'الهام نوراللهی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-09.webp',
      email: 'jordyn84@gmail.com',
    },
    country: { name: 'سنت وینسنت و گرنادین‌ها', code: 'VC' },
    noOfShipment: 8,
    cost: '100.00',
  },
  {
    id: 'RX059',
    user: {
      name: 'مرجان سلیمانی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-07.webp',
      email: 'pattie_walker@hotmail.com',
    },
    country: { name: 'اوکراین', code: 'UA' },
    noOfShipment: 9,
    cost: '471.00',
  },
  {
    id: 'GM408',
    user: {
      name: 'آیناز بذرافکن',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-05.webp',
      email: 'chelsey29@yahoo.com',
    },
    country: { name: 'جبل‌الطارق', code: 'GI' },
    noOfShipment: 2,
    cost: '553.00',
  },
  {
    id: 'VC997',
    user: {
      name: 'نوید علی‌پور',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-13.webp',
      email: 'paxton_casper6@yahoo.com',
    },
    country: { name: 'لتونی', code: 'LV' },
    noOfShipment: 1,
    cost: '630.00',
  },
  {
    id: 'BJ077',
    user: {
      name: 'نازی خانی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-01.webp',
      email: 'richmond_jacobson@gmail.com',
    },
    country: { name: 'دانمارک', code: 'DK' },
    noOfShipment: 4,
    cost: '741.00',
  },
  {
    id: 'PR635',
    user: {
      name: 'سهیلا میرزایی',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-09.webp',
      email: 'marielle_hessel51@gmail.com',
    },
    country: { name: 'السالوادور', code: 'SV' },
    noOfShipment: 3,
    cost: '597.00',
  },
  {
    id: 'TA962',
    user: {
      name: 'ندا نجاری',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-14.webp',
      email: 'ozella26@hotmail.com',
    },
    country: { name: 'لیختن‌اشتاین', code: 'LI' },
    noOfShipment: 2,
    cost: '883.00',
  },
  {
    id: 'SC719',
    user: {
      name: 'امید حقیقت',
      avatar:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-01.webp',
      email: 'eda.rau48@yahoo.com',
    },
    country: { name: 'بنگلادش', code: 'BD' },
    noOfShipment: 9,
    cost: '141.00',
  },
];
// export const topCustomers = [
//   {
//     id: 'SE858',
//     user: {
//       name: 'Eleanor Tillman',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'jared_weimann57@yahoo.com',
//     },
//     country: {
//       name: 'Central African Republic',
//       code: 'CF',
//     },
//     noOfShipment: 9,
//     cost: '689.00',
//   },
//   {
//     id: 'VP325',
//     user: {
//       name: 'Jack Rath',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'gloria_mohr@hotmail.com',
//     },
//     country: {
//       name: 'Dominica',
//       code: 'DM',
//     },
//     noOfShipment: 1,
//     cost: '737.00',
//   },
//   {
//     id: 'EC639',
//     user: {
//       name: 'Dr. Terri Stracke',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'aliza.wiza29@gmail.com',
//     },
//     country: {
//       name: 'Democratic Republic of the Congo',
//       code: 'CD',
//     },
//     noOfShipment: 6,
//     cost: '415.00',
//   },
//   {
//     id: 'MZ671',
//     user: {
//       name: 'Ms. Doreen Aufderhar',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'lurline.nienow45@yahoo.com',
//     },
//     country: {
//       name: 'Venezuela',
//       code: 'VE',
//     },
//     noOfShipment: 6,
//     cost: '744.00',
//   },
//   {
//     id: 'RG510',
//     user: {
//       name: 'Florence Hoeger',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'maiya_bailey@gmail.com',
//     },
//     country: {
//       name: 'Norway',
//       code: 'NO',
//     },
//     noOfShipment: 3,
//     cost: '408.00',
//   },
//   {
//     id: 'QS080',
//     user: {
//       name: 'Dr. Albert Beer',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'jarred_sipes@hotmail.com',
//     },
//     country: {
//       name: 'Uganda',
//       code: 'UG',
//     },
//     noOfShipment: 4,
//     cost: '746.00',
//   },
//   {
//     id: 'UO154',
//     user: {
//       name: 'Sean Goyette',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'sigmund_zieme@yahoo.com',
//     },
//     country: {
//       name: 'Finland',
//       code: 'FI',
//     },
//     noOfShipment: 5,
//     cost: '800.00',
//   },
//   {
//     id: 'SO247',
//     user: {
//       name: 'Gregg Kling',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'mason_macejkovic@gmail.com',
//     },
//     country: {
//       name: 'Saint Martin',
//       code: 'MF',
//     },
//     noOfShipment: 4,
//     cost: '501.00',
//   },
//   {
//     id: 'LR832',
//     user: {
//       name: 'Chelsea Thiel',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'abby.kemmer68@hotmail.com',
//     },
//     country: {
//       name: 'Republic of Korea',
//       code: 'KR',
//     },
//     noOfShipment: 8,
//     cost: '153.00',
//   },
//   {
//     id: 'ME262',
//     user: {
//       name: 'Virginia Schumm',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'royal.schinner79@hotmail.com',
//     },
//     country: {
//       name: 'Georgia',
//       code: 'GE',
//     },
//     noOfShipment: 8,
//     cost: '994.00',
//   },
//   {
//     id: 'YP369',
//     user: {
//       name: 'Mrs. Opal Kuphal-Crist',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'doris_parisian@yahoo.com',
//     },
//     country: {
//       name: "Democratic People's Republic of Korea",
//       code: 'KP',
//     },
//     noOfShipment: 1,
//     cost: '172.00',
//   },
//   {
//     id: 'ZK736',
//     user: {
//       name: 'Tanya Wintheiser',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'mina_hilpert@yahoo.com',
//     },
//     country: {
//       name: 'Heard Island and McDonald Islands',
//       code: 'HM',
//     },
//     noOfShipment: 5,
//     cost: '103.00',
//   },
//   {
//     id: 'NS479',
//     user: {
//       name: 'Lola Walter V',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'evie_deckow@gmail.com',
//     },
//     country: {
//       name: 'El Salvador',
//       code: 'SV',
//     },
//     noOfShipment: 4,
//     cost: '568.00',
//   },
//   {
//     id: 'DF799',
//     user: {
//       name: 'Ronnie Grant-Ruecker',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'clemmie_bergstrom@gmail.com',
//     },
//     country: {
//       name: 'Guinea',
//       code: 'GN',
//     },
//     noOfShipment: 9,
//     cost: '204.00',
//   },
//   {
//     id: 'AZ892',
//     user: {
//       name: 'Fannie Hartmann',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'keith_herzog57@yahoo.com',
//     },
//     country: {
//       name: 'Montserrat',
//       code: 'MS',
//     },
//     noOfShipment: 5,
//     cost: '636.00',
//   },
//   {
//     id: 'GD668',
//     user: {
//       name: 'Robin Predovic',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'mabel_simonis@yahoo.com',
//     },
//     country: {
//       name: 'Denmark',
//       code: 'DK',
//     },
//     noOfShipment: 9,
//     cost: '920.00',
//   },
//   {
//     id: 'JV552',
//     user: {
//       name: 'Krystal Leannon',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'korbin_kilback@gmail.com',
//     },
//     country: {
//       name: 'Antarctica',
//       code: 'AQ',
//     },
//     noOfShipment: 6,
//     cost: '834.00',
//   },
//   {
//     id: 'XF349',
//     user: {
//       name: 'Rosemarie Ward',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'carolyne89@yahoo.com',
//     },
//     country: {
//       name: 'Curacao',
//       code: 'CW',
//     },
//     noOfShipment: 8,
//     cost: '397.00',
//   },
//   {
//     id: 'YO167',
//     user: {
//       name: 'Hilda Yost',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'laurel36@hotmail.com',
//     },
//     country: {
//       name: 'Seychelles',
//       code: 'SC',
//     },
//     noOfShipment: 9,
//     cost: '998.00',
//   },
//   {
//     id: 'KR634',
//     user: {
//       name: 'Fernando Jacobs',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'diana.toy@yahoo.com',
//     },
//     country: {
//       name: 'Ukraine',
//       code: 'UA',
//     },
//     noOfShipment: 1,
//     cost: '845.00',
//   },
//   {
//     id: 'IO913',
//     user: {
//       name: 'Mr. Rene Tillman',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'cleveland_krajcik@gmail.com',
//     },
//     country: {
//       name: 'Latvia',
//       code: 'LV',
//     },
//     noOfShipment: 4,
//     cost: '488.00',
//   },
//   {
//     id: 'ZT806',
//     user: {
//       name: 'Cesar Boyle',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'christa35@hotmail.com',
//     },
//     country: {
//       name: 'Indonesia',
//       code: 'ID',
//     },
//     noOfShipment: 1,
//     cost: '933.00',
//   },
//   {
//     id: 'XA924',
//     user: {
//       name: 'Louis Konopelski',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'kianna.kirlin@gmail.com',
//     },
//     country: {
//       name: 'Cocos (Keeling) Islands',
//       code: 'CC',
//     },
//     noOfShipment: 2,
//     cost: '769.00',
//   },
//   {
//     id: 'ZX753',
//     user: {
//       name: 'Terrell Gerhold',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'lincoln33@hotmail.com',
//     },
//     country: {
//       name: 'Honduras',
//       code: 'HN',
//     },
//     noOfShipment: 9,
//     cost: '301.00',
//   },
//   {
//     id: 'ZQ170',
//     user: {
//       name: 'Cindy Kautzer',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'bradford_connelly@hotmail.com',
//     },
//     country: {
//       name: 'Niue',
//       code: 'NU',
//     },
//     noOfShipment: 1,
//     cost: '901.00',
//   },
//   {
//     id: 'AT987',
//     user: {
//       name: 'Jeanette Reinger-Heidenreich',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'quentin.crooks95@yahoo.com',
//     },
//     country: {
//       name: 'Nicaragua',
//       code: 'NI',
//     },
//     noOfShipment: 9,
//     cost: '809.00',
//   },
//   {
//     id: 'YS387',
//     user: {
//       name: 'Derrick Quigley',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'trevion_armstrong21@hotmail.com',
//     },
//     country: {
//       name: 'Kazakhstan',
//       code: 'KZ',
//     },
//     noOfShipment: 8,
//     cost: '352.00',
//   },
//   {
//     id: 'XS156',
//     user: {
//       name: 'Antonio Mills',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'rupert.senger36@hotmail.com',
//     },
//     country: {
//       name: 'Saint Martin',
//       code: 'MF',
//     },
//     noOfShipment: 7,
//     cost: '902.00',
//   },
//   {
//     id: 'BB586',
//     user: {
//       name: 'Mike Pollich',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'ebba.hilpert@hotmail.com',
//     },
//     country: {
//       name: 'Eritrea',
//       code: 'ER',
//     },
//     noOfShipment: 9,
//     cost: '564.00',
//   },
//   {
//     id: 'MD300',
//     user: {
//       name: 'Danny Mayer',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'jeanne_mante88@gmail.com',
//     },
//     country: {
//       name: 'Bosnia and Herzegovina',
//       code: 'BA',
//     },
//     noOfShipment: 9,
//     cost: '639.00',
//   },
//   {
//     id: 'HX568',
//     user: {
//       name: 'Darin Zemlak',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'raven.pfeffer85@gmail.com',
//     },
//     country: {
//       name: 'Jordan',
//       code: 'JO',
//     },
//     noOfShipment: 4,
//     cost: '469.00',
//   },
//   {
//     id: 'FW578',
//     user: {
//       name: 'Courtney Kiehn Jr.',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'penelope_daniel46@hotmail.com',
//     },
//     country: {
//       name: 'Kiribati',
//       code: 'KI',
//     },
//     noOfShipment: 7,
//     cost: '351.00',
//   },
//   {
//     id: 'XD917',
//     user: {
//       name: 'Orlando Paucek',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'xavier97@gmail.com',
//     },
//     country: {
//       name: 'Myanmar',
//       code: 'MM',
//     },
//     noOfShipment: 5,
//     cost: '213.00',
//   },
//   {
//     id: 'KM192',
//     user: {
//       name: 'Mr. Bryant Friesen',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'elena85@yahoo.com',
//     },
//     country: {
//       name: 'Saint Vincent and the Grenadines',
//       code: 'VC',
//     },
//     noOfShipment: 7,
//     cost: '892.00',
//   },
//   {
//     id: 'XG304',
//     user: {
//       name: 'Nicolas Braun',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'neha_bauch@gmail.com',
//     },
//     country: {
//       name: 'Qatar',
//       code: 'QA',
//     },
//     noOfShipment: 4,
//     cost: '513.00',
//   },
//   {
//     id: 'DL448',
//     user: {
//       name: 'Dr. Beverly Ruecker',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'mary.kuhic54@hotmail.com',
//     },
//     country: {
//       name: 'Jamaica',
//       code: 'JM',
//     },
//     noOfShipment: 7,
//     cost: '240.00',
//   },
//   {
//     id: 'AG621',
//     user: {
//       name: 'Antonio Schiller',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'blaze91@yahoo.com',
//     },
//     country: {
//       name: 'Benin',
//       code: 'BJ',
//     },
//     noOfShipment: 5,
//     cost: '456.00',
//   },
//   {
//     id: 'KT264',
//     user: {
//       name: 'Delores Kirlin',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'jana.franecki83@yahoo.com',
//     },
//     country: {
//       name: 'Bhutan',
//       code: 'BT',
//     },
//     noOfShipment: 4,
//     cost: '601.00',
//   },
//   {
//     id: 'GB499',
//     user: {
//       name: 'Angela Turner',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'sammy68@hotmail.com',
//     },
//     country: {
//       name: 'Iceland',
//       code: 'IS',
//     },
//     noOfShipment: 3,
//     cost: '212.00',
//   },
//   {
//     id: 'JO416',
//     user: {
//       name: 'Brandon Schowalter Jr.',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'alfonso59@gmail.com',
//     },
//     country: {
//       name: 'Guyana',
//       code: 'GY',
//     },
//     noOfShipment: 7,
//     cost: '230.00',
//   },
//   {
//     id: 'NV809',
//     user: {
//       name: 'Mr. Earl Hickle I',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'mable_effertz@hotmail.com',
//     },
//     country: {
//       name: 'San Marino',
//       code: 'SM',
//     },
//     noOfShipment: 3,
//     cost: '934.00',
//   },
//   {
//     id: 'WI287',
//     user: {
//       name: 'Ruby Carter',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'pansy_jacobson20@gmail.com',
//     },
//     country: {
//       name: 'Gibraltar',
//       code: 'GI',
//     },
//     noOfShipment: 7,
//     cost: '274.00',
//   },
//   {
//     id: 'CY204',
//     user: {
//       name: 'Dr. Dora Robel',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'jordyn84@gmail.com',
//     },
//     country: {
//       name: 'Solomon Islands',
//       code: 'SB',
//     },
//     noOfShipment: 8,
//     cost: '100.00',
//   },
//   {
//     id: 'RX059',
//     user: {
//       name: 'Wade Barrows',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'pattie_walker@hotmail.com',
//     },
//     country: {
//       name: 'Bangladesh',
//       code: 'BD',
//     },
//     noOfShipment: 9,
//     cost: '471.00',
//   },
//   {
//     id: 'GM408',
//     user: {
//       name: 'Guadalupe Monahan-Berge',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'chelsey29@yahoo.com',
//     },
//     country: {
//       name: 'Denmark',
//       code: 'DK',
//     },
//     noOfShipment: 2,
//     cost: '553.00',
//   },
//   {
//     id: 'VC997',
//     user: {
//       name: 'Rogelio Braun',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'paxton_casper6@yahoo.com',
//     },
//     country: {
//       name: 'Saint Kitts and Nevis',
//       code: 'KN',
//     },
//     noOfShipment: 1,
//     cost: '630.00',
//   },
//   {
//     id: 'BJ077',
//     user: {
//       name: 'Kathy Fay',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'richmond_jacobson@gmail.com',
//     },
//     country: {
//       name: 'Bangladesh',
//       code: 'BD',
//     },
//     noOfShipment: 4,
//     cost: '741.00',
//   },
//   {
//     id: 'PR635',
//     user: {
//       name: 'Stacey Smitham',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'marielle_hessel51@gmail.com',
//     },
//     country: {
//       name: 'Chad',
//       code: 'TD',
//     },
//     noOfShipment: 3,
//     cost: '597.00',
//   },
//   {
//     id: 'TA962',
//     user: {
//       name: 'Esther Johns',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'ozella26@hotmail.com',
//     },
//     country: {
//       name: 'Liechtenstein',
//       code: 'LI',
//     },
//     noOfShipment: 2,
//     cost: '883.00',
//   },
//   {
//     id: 'SC719',
//     user: {
//       name: 'Irene Hamill',
//       avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
//         avatarIds
//       )}.webp`,
//       email: 'eda.rau48@yahoo.com',
//     },
//     country: {
//       name: 'Fiji',
//       code: 'FJ',
//     },
//     noOfShipment: 9,
//     cost: '141.00',
//   },
// ];
