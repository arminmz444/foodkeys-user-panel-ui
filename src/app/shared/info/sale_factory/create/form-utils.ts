import { z } from 'zod';

export const customFields = [
  {
    label: '',
    value: '',
  },
];
export const locationShipping = [
  {
    name: '',
    shippingCharge: '',
  },
];
export const productVariants = [
  {
    label: '',
    value: '',
  },
];

export function defaultValues(product?: CreateProductInput) {
  return {
    title: product?.title ?? '',
    companyName: product?.companyName ?? '',
    sku: product?.sku ?? '',
    type: product?.type ?? '',
    categories: product?.categories ?? '',
    description: product?.description ?? '',
    price: product?.price ?? '',
    costPrice: product?.costPrice ?? '',
    retailPrice: product?.retailPrice ?? '',
    salePrice: product?.salePrice ?? '',
    inventoryTracking: product?.inventoryTracking ?? '',
    currentStock: product?.currentStock ?? '',
    lowStock: product?.lowStock ?? '',
    productAvailability: product?.productAvailability ?? '',
    tradeNumber: product?.tradeNumber ?? '',
    manufacturerNumber: product?.manufacturerNumber ?? '',
    brand: product?.brand ?? '',
    upcEan: product?.upcEan ?? '',
    customFields:
      product?.customFields.length === 0 ? customFields : product?.customFields,

    freeShipping: product?.freeShipping ?? false,
    shippingPrice: product?.shippingPrice ?? '',
    locationBasedShipping: product?.locationBasedShipping ?? false,
    locationShipping:
      product?.locationShipping.length === 0
        ? locationShipping
        : product?.locationShipping,
    pageTitle: product?.pageTitle ?? '',
    metaDescription: product?.metaDescription ?? '',
    metaKeywords: product?.metaKeywords ?? '',
    productUrl: product?.productUrl ?? '',
    isPurchaseSpecifyDate: product?.isPurchaseSpecifyDate ?? false,
    isLimitDate: product?.isLimitDate ?? false,
    dateFieldName: product?.dateFieldName ?? '',
    productVariants:
      product?.productVariants.length === 0
        ? productVariants
        : product?.productVariants,
    tags: product?.tags ?? [],
  };
}

export const productFormSchema = z.object({
  title: z.string().min(1, { message: 'این فیلد اجباری میباشد' }),
  companyName: z.string().min(3, { message: 'این فیلد اجباری می‌باشد' }),
  sku: z.string().optional(),
  type: z.string().min(1, { message: 'این فیلد اجباری میباشد' }),
  categories: z.string().min(1, { message: 'این فیلد اجباری میباشد' }),
  description: z.string().optional(),
  price: z
    .number()
    .min(0, { message: 'این فیلد اجباری میباشد' })
    .or(z.string().min(1, { message: 'این فیلد اجباری میباشد' })),
  costPrice: z.number().optional().or(z.string().optional()),
  retailPrice: z
    .number()
    .min(0, { message: 'این فیلد اجباری میباشد' })
    .or(z.string().min(1, { message: 'این فیلد اجباری میباشد' })),
  salePrice: z
    .number()
    .min(0, { message: 'این فیلد اجباری میباشد' })
    .or(z.string().min(1, { message: 'این فیلد اجباری میباشد' })),
  inventoryTracking: z.string().optional(),
  currentStock: z.number().or(z.string()).optional(),
  lowStock: z.number().or(z.string()).optional(),
  productAvailability: z.string().optional(),
  tradeNumber: z.number().or(z.string()).optional(),
  manufacturerNumber: z.number().or(z.string()).optional(),
  brand: z.string().min(1, { message: 'این فیلد اجباری میباشد' }),
  upcEan: z.number().or(z.string()).optional(),
  customFields: z.array(
    z.object({
      label: z.string().optional(),
      value: z.string().optional(),
    })
  ),

  freeShipping: z.boolean().optional(),
  shippingPrice: z
    .number()
    .min(0, { message: 'این فیلد اجباری میباشد' })
    .or(z.string().min(1, { message: 'این فیلد اجباری میباشد' })),
  locationBasedShipping: z.boolean().optional(),
  locationShipping: z.array(
    z.object({
      name: z.string().optional(),
      shippingCharge: z.number().or(z.string()).optional(),
    })
  ),
  pageTitle: z.string().min(1, { message: 'این فیلد اجباری میباشد' }),
  metaDescription: z.string().min(1, { message: 'این فیلد اجباری میباشد' }),
  metaKeywords: z.string().min(1, { message: 'این فیلد اجباری میباشد' }),
  productUrl: z.string().min(1, { message: 'این فیلد اجباری میباشد' }),
  isPurchaseSpecifyDate: z.boolean().optional(),
  isLimitDate: z.boolean().optional(),
  dateFieldName: z.string().optional(),
  availableDate: z.date().min(new Date('1900-01-01')).optional(),
  endDate: z.date().min(new Date('1900-01-02')).optional(),
  productVariants: z.array(
    z.object({
      name: z.string().optional(),
      value: z.string().optional(),
    })
  ),
  tags: z.array(z.string()).optional(),
});

export type CreateProductInput = z.infer<typeof productFormSchema>;

export const menuItems = [
  {
    label: 'خلاصه',
    value: 'summary',
  },
  {
    label: 'عکس و گالری',
    value: 'images_gallery',
  },
  {
    label: 'قیمت',
    value: 'pricing_inventory',
  },
  {
    label: 'شخصی سازی فیلد ها',
    value: 'product_identifiers',
  },
  {
    label: 'حمل و نقل ',
    value: 'shipping_availability',
  },
  {
    label: 'بازاریابی',
    value: 'seo',
  },
  {
    label: 'تنظیمات دیگر',
    value: 'variant_options',
  },
];

// Category option
export const categoryOption = [
  {
    value: 'fruits',
    name: 'میوه',
  },
  {
    value: 'grocery',
    name: 'سبزیجات',
  },
  {
    value: 'meat',
    name: 'گوشت',
  },
  {
    value: 'cat food',
    name: 'غذای گربه',
  },
];

// Type option
export const typeOption = [
  {
    value: 'digital company',
    name: 'محصول دیجیتال',
  },
  {
    value: 'physical company',
    name: 'محصول فیزیکی',
  },
];

// Variant option
export const variantOption = [
  {
    value: 'single',
    name: 'تک',
  },
  {
    value: 'multiple',
    name: 'چندتایی',
  },
];
