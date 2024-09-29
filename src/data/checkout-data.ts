// shipping data
export const shippingMethodData = [
  {
    id: 1,
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/shipping/fedex.webp',
    name: 'FedEx',
    value: 'fedex',
  },
  {
    id: 2,
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/shipping/ups.webp',
    name: 'ups',
    value: 'ups',
  },
  {
    id: 3,
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/shipping/dhl.webp',
    name: 'DHL',
    value: 'dhl',
  },
];

// shipping duration data
export const shippingSpeedData = [
  {
    id: 1,
    speed: 'آروم',
    title: 'تومان7.00 بدون عجله',
    description: 'تحویل در 4 روز',
    checked: false,
  },
  {
    id: 2,
    speed: 'default',
    title: 'تومان8.00 ارسال',
    description: 'ارسال در 3 روز.',
    checked: true,
  },
  {
    id: 3,
    speed: 'quick',
    title: 'تومان20.00 با عجله',
    description: 'ارسال در 2 روز.',
    checked: false,
  },
  {
    id: 4,
    speed: 'fast',
    title: 'تومان40.00 ارسال اظطراری',
    description: 'ارسال در 1 روز.',
    checked: false,
  },
];

// payment method data
export const paymentMethodData = [
  {
    id: 1,
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/payment/paypal.webp',
    name: 'PayPal',
    value: 'paypal',
    description:
      'پرداخت بدون بهره به صورت هر دو هفته یکبار. پس از ثبت سفارش، شما به پیپال منتقل خواهید شد..',
    defaultChecked: false,
  },
  {
    id: 2,
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/payment/stripe.webp',
    name: 'Stripe',
    value: 'stripe',
    description:
      'پرداخت بدون بهره به صورت هر دو هفته یکبار. پس از ثبت سفارش، شما به پیپال منتقل خواهید شد..',
    defaultChecked: false,
  },
  {
    id: 3,
    image:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/payment/master.webp',
    name: 'MasterCard',
    value: 'mastercard',
    description:
      'پرداخت بدون بهره به صورت هر دو هفته یکبار. پس از ثبت سفارش، شما به پیپال منتقل خواهید شد..',
    defaultChecked: false,
  },
];

// ordered company data
export const orderProducts = [
  {
    id: 1,
    product: {
      name: 'مارک جاکوبز',
      image:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/5.webp',
    },
    price: 'تومان175.00',
    subtotal: 'تومان175.00',
    quantity: 1,
  },
  {
    id: 2,
    product: {
      name: 'کفش مشکی',
      image:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/3.webp',
    },
    price: 'تومان160.00',
    subtotal: 'تومان320.00',
    quantity: 2,
  },
  {
    id: 3,
    product: {
      name: 'هدفون بیتز',
      image:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/2.webp',
    },
    price: 'تومان55.00',
    subtotal: 'تومان55.00',
    quantity: 1,
  },
];
