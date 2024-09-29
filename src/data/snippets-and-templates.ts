import { avatarIds } from '@/utils/get-avatar';
import { getRandomArrayElement } from '@/utils/get-random-array-element';

export type SnippetType = {
  id: string;
  name: string;
  avatar: string;
  folder: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
};

export const folders = [
  {
    name: 'برداشت ',
    value: 'withdrawal',
  },
  {
    name: 'واریز',
    value: 'invoice',
  },
  {
    name: 'ارسال',
    value: 'deposit',
  },
  {
    name: 'پرداخت',
    value: 'payment',
  },
];

export type SnippetOrTemplate = {
  id: string;
  name: string;
  avatar: string;
  folder: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
};

export const snippetsAndTemplates = [
  {
    id: '5b679ea8-8261-4e0e-a562-e18381bd3175',
    name: 'پگاه جوادی',
    avatar:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-14.webp',
    folder: 'Payment',
    createdBy: 'ترانه علیمرادی',
    createdAt: '2022-09-21T16:33:07.319Z',
    updatedAt: '2022-03-17T06:13:45.761Z',
  },
  {
    id: 'f7a77a4b-76e3-44bd-bd18-660d80751067',
    name: 'علیرضا مجتبی‌زاده',
    avatar:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-10.webp',
    folder: 'Payment',
    createdBy: 'آذرمی علیزاده',
    createdAt: '2021-12-26T22:24:45.898Z',
    updatedAt: '2021-09-04T01:01:04.463Z',
  },
  {
    id: '67426e62-3b78-4c1d-80ff-463fbc78e546',
    name: 'محمد صداقت',
    avatar:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-05.webp',
    folder: 'Withdrawal',
    createdBy: 'سارا قلیچ‌خانی',
    createdAt: '2020-01-15T12:20:44.010Z',
    updatedAt: '2022-12-03T03:21:03.983Z',
  },
  {
    id: 'ba88a5d6-ca86-47a9-b5e1-570ec0af4309',
    name: 'مهران صداقت',
    avatar:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-08.webp',
    folder: 'Payment',
    createdBy: 'آرتین فتحی',
    createdAt: '2021-02-12T08:55:24.055Z',
    updatedAt: '2020-07-04T13:59:16.586Z',
  },
  {
    id: '67426e62-3b7a-4c1d-80ff-463fbc78e546',
    name: 'فرشته صالحی',
    avatar:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-14.webp',
    folder: 'Withdrawal',
    createdBy: 'نیما نصرتی',
    createdAt: '2020-01-15T12:20:44.010Z',
    updatedAt: '2022-12-03T03:21:03.983Z',
  },
  {
    id: 'ba88a5d6-cae6-47a9-b5e1-570ec0af4309',
    name: 'آرش علمداری',
    avatar:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-06.webp',
    folder: 'Payment',
    createdBy: 'یاسمین کاظمی',
    createdAt: '2021-02-12T08:55:24.055Z',
    updatedAt: '2020-07-04T13:59:16.586Z',
  },
  {
    id: '67426e68-3b78-4c1d-80ff-463fbc78e546',
    name: 'مهسا فرمانی',
    avatar:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-15.webp',
    folder: 'Withdrawal',
    createdBy: 'آذر علیمرادی',
    createdAt: '2020-01-15T12:20:44.010Z',
    updatedAt: '2022-12-03T03:21:03.983Z',
  },
];
