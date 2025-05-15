// import { z } from 'zod';
//
// export const customFields = [
//   {
//     label: '',
//     value: '',
//   },
// ];
// export const locationShipping = [
//   {
//     name: '',
//     shippingCharge: '',
//   },
// ];
// export const productVariants = [
//   {
//     label: '',
//     value: '',
//   },
// ];
//
// export function defaultValues(product?: CreateProductInput) {
//   return {
//     title: product?.title ?? '',
//     companyName: product?.companyName ?? '',
//     sku: product?.sku ?? '',
//     type: product?.type ?? '',
//     categories: product?.categories ?? '',
//     description: product?.description ?? '',
//     price: product?.price ?? '',
//     costPrice: product?.costPrice ?? '',
//     retailPrice: product?.retailPrice ?? '',
//     salePrice: product?.salePrice ?? '',
//     inventoryTracking: product?.inventoryTracking ?? '',
//     currentStock: product?.currentStock ?? '',
//     lowStock: product?.lowStock ?? '',
//     productAvailability: product?.productAvailability ?? '',
//     tradeNumber: product?.tradeNumber ?? '',
//     manufacturerNumber: product?.manufacturerNumber ?? '',
//     brand: product?.brand ?? '',
//     upcEan: product?.upcEan ?? '',
//     // customFields:
//     //   product?.customFields.length === 0 ? customFields : product?.customFields,
//
//     freeShipping: product?.freeShipping ?? false,
//     shippingPrice: product?.shippingPrice ?? '',
//     locationBasedShipping: product?.locationBasedShipping ?? false,
//     locationShipping:
//       product?.locationShipping.length === 0
//         ? locationShipping
//         : product?.locationShipping,
//     pageTitle: product?.pageTitle ?? '',
//     metaDescription: product?.metaDescription ?? '',
//     metaKeywords: product?.metaKeywords ?? '',
//     productUrl: product?.productUrl ?? '',
//     isPurchaseSpecifyDate: product?.isPurchaseSpecifyDate ?? false,
//     isLimitDate: product?.isLimitDate ?? false,
//     dateFieldName: product?.dateFieldName ?? '',
//     productVariants:
//       product?.productVariants.length === 0
//         ? productVariants
//         : product?.productVariants,
//     tags: product?.tags ?? [],
//   };
// }
//
// export const productFormSchema = z.object({
//   title: z.string().min(1, { message: 'این فیلد اجباری میباشد' }),
//   companyName: z.string().min(3, { message: 'این فیلد اجباری می‌باشد' }),
//   sku: z.string().optional(),
//   type: z.string().min(1, { message: 'این فیلد اجباری میباشد' }),
//   categories: z.string().min(1, { message: 'این فیلد اجباری میباشد' }),
//   subcategory: z.number().min(1, { message: 'این فیلد اجباری است'}),
//   description: z.string().optional(),
//   price: z
//     .number()
//     .min(0, { message: 'این فیلد اجباری میباشد' })
//     .or(z.string().min(1, { message: 'این فیلد اجباری میباشد' })),
//   costPrice: z.number().optional().or(z.string().optional()),
//   retailPrice: z
//     .number()
//     .min(0, { message: 'این فیلد اجباری میباشد' })
//     .or(z.string().min(1, { message: 'این فیلد اجباری میباشد' })),
//   salePrice: z
//     .number()
//     .min(0, { message: 'این فیلد اجباری میباشد' })
//     .or(z.string().min(1, { message: 'این فیلد اجباری میباشد' })),
//   inventoryTracking: z.string().optional(),
//   currentStock: z.number().or(z.string()).optional(),
//   lowStock: z.number().or(z.string()).optional(),
//   productAvailability: z.string().optional(),
//   tradeNumber: z.number().or(z.string()).optional(),
//   manufacturerNumber: z.number().or(z.string()).optional(),
//   brand: z.string().min(1, { message: 'این فیلد اجباری میباشد' }),
//   upcEan: z.number().or(z.string()).optional(),
//   // customFields: z.array(
//   //   z.object({
//   //     label: z.string().optional(),
//   //     value: z.string().optional(),
//   //   })
//   // ),
//
//   freeShipping: z.boolean().optional(),
//   shippingPrice: z
//     .number()
//     .min(0, { message: 'این فیلد اجباری میباشد' })
//     .or(z.string().min(1, { message: 'این فیلد اجباری میباشد' })),
//   locationBasedShipping: z.boolean().optional(),
//   locationShipping: z.array(
//     z.object({
//       name: z.string().optional(),
//       shippingCharge: z.number().or(z.string()).optional(),
//     })
//   ),
//   pageTitle: z.string().min(1, { message: 'این فیلد اجباری میباشد' }),
//   metaDescription: z.string().min(1, { message: 'این فیلد اجباری میباشد' }),
//   metaKeywords: z.string().min(1, { message: 'این فیلد اجباری میباشد' }),
//   productUrl: z.string().min(1, { message: 'این فیلد اجباری میباشد' }),
//   isPurchaseSpecifyDate: z.boolean().optional(),
//   isLimitDate: z.boolean().optional(),
//   dateFieldName: z.string().optional(),
//   availableDate: z.date().min(new Date('1900-01-01')).optional(),
//   endDate: z.date().min(new Date('1900-01-02')).optional(),
//   productVariants: z.array(
//     z.object({
//       name: z.string().optional(),
//       value: z.string().optional(),
//     })
//   ),
//   tags: z.array(z.string()).optional(),
// });
//
// export type CreateProductInput = z.infer<typeof productFormSchema>;
//
// export const menuItems = [
//   {
//     label: 'خلاصه',
//     value: 'summary',
//   },
//   {
//     label: 'عکس و گالری',
//     value: 'images_gallery',
//   },
//   {
//     label: 'قیمت',
//     value: 'pricing_inventory',
//   },
//   {
//     label: 'شخصی سازی فیلد ها',
//     value: 'product_identifiers',
//   },
//   {
//     label: 'حمل و نقل ',
//     value: 'shipping_availability',
//   },
//   {
//     label: 'بازاریابی',
//     value: 'seo',
//   },
//   {
//     label: 'تنظیمات دیگر',
//     value: 'variant_options',
//   },
// ];
//
// // Category option
// export const categoryOption = [
//   {
//     value: 'fruits',
//     name: 'میوه',
//   },
//   {
//     value: 'grocery',
//     name: 'سبزیجات',
//   },
//   {
//     value: 'meat',
//     name: 'گوشت',
//   },
//   {
//     value: 'cat food',
//     name: 'غذای گربه',
//   },
// ];
//
// // Type option
// export const typeOption = [
//   {
//     value: 'digital company',
//     name: 'محصول دیجیتال',
//   },
//   {
//     value: 'physical company',
//     name: 'محصول فیزیکی',
//   },
// ];
//
// // Variant option
// export const variantOption = [
//   {
//     value: 'single',
//     name: 'تک',
//   },
//   {
//     value: 'multiple',
//     name: 'چندتایی',
//   },
// ];
import { Certificate } from 'crypto';
import { z } from 'zod';

const pictureSchema = z.object({
  id: z.string().optional(),
  fileName: z.string().optional(),
  filePath: z.string().optional(),
});

const productSchema = z.object({
  id: z.any().optional(),
  name: z.string(),
  type: z.string().optional(),
  description: z.string().optional(),
  pictures: z.array(pictureSchema).optional().nullable(),
  uploadedFileIds: z.array(z.string()).optional().nullable(),
  removedFileIds: z.array(z.string()).optional().nullable(),
  outsourced: z.boolean().optional(),
  machineUsage: z.boolean().optional(),
  showProduct: z.boolean().optional(),
});

const locationSchema = z.object({
  officeLocation: z.string(),
  factoryLocation: z.string(),
  officePoBox: z.string(),
  factoryPoBox: z.string(),
  officeState: z.string(),
  officeCity: z.string(),
  factoryState: z.string(),
  factoryCity: z.string(),
  industrialCity: z.string(),
  country: z.string(),
});

const telSchema = z.object({
  telNumber: z.string(),
  telType: z.string(),
});

const contactSchema = z.object({
  name: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  // isCEO: z.boolean(),
  position: z.string().optional(),
});

const galleryContactSchema = z.object({
  name: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  // isCEO: z.boolean(),
  position: z.string().optional(),
  uploadedFileId: z.array(z.string()).optional(),
  removedFileIds: z.array(z.string()).optional().nullable(),
  priority: z.number().optional(),
});

const galleryCertificateSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  uploadedFileId: z.array(z.string()).optional(),
  removedFileIds: z.array(z.string()).optional().nullable(),
  priority: z.number().optional(),
});

const galleryProductSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  uploadedFileId: z.array(z.string()).optional(),
  removedFileIds: z.array(z.string()).optional().nullable(),
  priority: z.number().optional(),
});

const gallerySliderSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  uploadedFileId: z.array(z.string()).optional(),
  removedFileIds: z.array(z.string()).optional().nullable(),
  priority: z.number().optional(),
});

const galleryCatalogSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  uploadedFileId: z.array(z.string()).optional(),
  removedFileIds: z.array(z.string()).optional().nullable(),
  priority: z.number().optional(),
});

const galleryDocumentSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  uploadedFileId: z.array(z.string()).optional(),
  removedFileIds: z.array(z.string()).optional().nullable(),
  priority: z.number().optional(),
});

const gallerySchema = z.object({
  // contacts: z.array(galleryContactSchema).superRefine((val, ctx) => {
  //   if (new Set(val).size === val.length)
  //     ctx.addIssue({
  //       code: z.ZodIssueCode.custom,
  //       message: `اولویت نباید تکراری باشد`,
  //     });
  // }),
  contacts: z.array(galleryContactSchema).optional(),
  certificates: z.array(galleryCertificateSchema).optional(),
  products: z.array(galleryProductSchema).optional(),
  sliders: z.array(gallerySliderSchema).optional(),
  catalogs: z.array(galleryCatalogSchema).optional(),
  documents: z.array(galleryDocumentSchema).optional(),
});

// const certificateSchema = z
// .object({
//   name: z.string().optional(),
//   description: z.string().optional(),
//   priority: z.number().optional(),
// })
// .array()
// .refine((certificates) => {
//   const priorities = certificates
//     .filter((item) => item.priority !== undefined)
//     .map((item) => item.priority);
//   return new Set(priorities).size === priorities.length; // Check for unique priorities
// }, {
//   message: "Each certificate must have a unique priority.",
// });

// // Schema for validating contacts
// const contactSchema = z
// .object({
//   name: z.string(),
//   lastName: z.string(),
//   email: z.string(),
//   phone: z.string(),
//   priority: z.number().optional(),
//   position: z.string(),
// })
// .array()
// .refine((contacts) => {
//   const priorities = contacts
//     .filter((item) => item.priority !== undefined)
//     .map((item) => item.priority);
//   return new Set(priorities).size === priorities.length; // Check for unique priorities
// }, {
//   message: "Each contact must have a unique priority.",
// });

const subcategorySchema = z.object({
  name: z.string().min(1, { message: 'نام زیرشاخه اجباری می‌باشد.' }),
  value: z.number().min(1, { message: 'مقدار زیرشاخه اجباری می‌باشد.' }),
});

const companyTypeSchema = z
  .object({
    name: z.string().min(1, { message: 'انتخاب الزامی می‌باشد.' }),
    value: z.string().optional(),
  })
  .partial({ value: true });
const companyBrandSchema = z.object({
  name: z.string(),
  nameEn: z.string(),
});

export const companyFormSchema = z.object({
  subcategory: subcategorySchema.nullable().refine((val) => val !== null, {
    message: 'زیرشاخه اجباری می‌باشد.',
    path: ['subcategory'],
  }),
  companyName: z.string().min(1, { message: 'نام شرکت اجباری می‌باشد.' }),
  companyNameEn: z
    .string()
    .min(1, { message: 'نام شرکت به انگلیسی اجباری می‌باشد.' }),
  mainBrandEn: z
    .string()
    .min(1, { message: 'نام تجاری به انگلیسی اجباری می‌باشد.' }),
  primaryBrand: z.string().min(1, { message: 'نام تجاری اجباری می‌باشد.' }),
  ceo: z.string().min(1, { message: 'نام مدیرعامل اجباری می‌باشد.' }),
  factoryCity: z
    .string()
    .min(1, { message: 'شهر محل کارخانه الزامی می‌باشد.' }),
  factoryState: z
    .string()
    .min(1, { message: 'استان محل کارخانه الزامی می‌باشد.' }),
  industrialCity: z
    .string()
    .min(1, { message: 'شهرک صنعتی کارخانه الزامی می‌باشد.' }),

  brands: z.array(companyBrandSchema).optional(),
  ceoPhoneNumber: z.string().optional(),
  companyStakeHolders: z.string().optional(),
  // ceo: z.string().min(1, { message: 'این فیلد اجباری میباشد' }),
  // ceoPhoneNumber: z.string().min(1, { message: "این فیلد اجباری می‌باشد" }),
  // owner: z.string().min(1, { message: 'این فیلد اجباری میباشد' }),
  // answerName: z.string().min(1, { message: 'این فیلد اجباری میباشد' }),
  owner: z.string().optional(),
  answerName: z.string().optional(),
  history: z.string().optional(),
  visit: z.number().optional(),
  buildingArea: z.string().optional(),
  landArea: z.string().optional(),
  holding: z.string().optional(),
  description: z.string().optional(),
  advertisingSlogan: z.string().optional(),
  employeesCount: z.string().optional(),
  companyType: companyTypeSchema.optional(),
  companyTypeOther: z.string().optional(),
  // backgroundImage: z.array(z.instanceof(File)).optional(),
  logo: z
    .instanceof(File)
    .refine((file) => file?.size <= 20 * 1024 * 1024, {
      message: 'حداکثر حجم فایل باید ۲۰ مگابایت باشد',
    })
    .nullable()
    .optional(),
  subjectOfActivity: z.string().optional(),
  establishDate: z
    .string()
    .max(4, { message: 'تاریخ تاسیس اشتباه است.' })
    .optional(),
  rawMaterialsOrigin: z.string().optional(),
  keyWords: z.string().optional(),
  tags: z.string().optional(),
  companyKeyWords: z.array(z.string()).optional(),
  companyTags: z.array(z.string()).optional(),
  products: z.array(productSchema).optional(),
  outSourcedProducts: z.array(productSchema).optional(),

  companyBrands: z.array(z.string()).optional(),
  location: locationSchema.optional(),
  factoryTels: z.array(telSchema).optional(),
  factoryFaxes: z.array(telSchema).optional(),
  officeTels: z.array(telSchema).optional(),
  officeFaxes: z.array(telSchema).optional(),
  telegramId: z.string().optional(),
  telegramPhoneNo: z.string().optional(),
  smsNumber: z.string().optional(),
  hotlineNumber: z.string().optional(),
  whatsAppId: z.string().optional(),
  whatsAppPhoneNo: z.string().optional(),
  instagramId: z.string().optional(),
  linkedInId: z.string().optional(),
  eitaaPhoneNo: z.string().optional(),
  rubikaPhoneNo: z.string().optional(),
  skypeId: z.string().optional(),
  website: z.string().optional(),
  contacts: z.array(contactSchema).optional(),
  emails: z.array(z.string()).optional(),
  productAvailability: z.string().optional(),

  productTitles: z.string().optional(),
  outSourcedProductTitles: z.string().optional(),
  productsDescription: z.string().optional(),
  outSourcedProductsDescription: z.string().optional(),
  currentLogo: z.string().optional(),
  currentBackgroundImages: z.array(z.string()).optional(),

  factoryPoBox: z.string().optional(),
  officePoBox: z.string().optional(),
  factoryLocation: z.string().optional(),
  officeLocation: z.string().optional(),
  officeCity: z.string().optional(),
  officeState: z.string().optional(),
  gallery: gallerySchema.optional(),
});

export type CreateCompanyInput = z.infer<typeof companyFormSchema>;

export function defaultValues(company?: CreateCompanyInput | null) {
  return {
    brands: company?.companyBrands ?? [],
    companyName: company?.companyName ?? '',
    companyNameEn: company?.companyNameEn ?? '',
    companyStakeHolders: company?.companyStakeHolders ?? '',
    ceo: company?.ceo ?? '',
    ceoPhoneNumber: company?.ceoPhoneNumber ?? '',
    owner: company?.owner ?? '',
    answerName: company?.answerName ?? '',
    history: company?.history ?? '',
    buildingArea: company?.buildingArea ?? '',
    landArea: company?.landArea ?? '',
    holding: company?.holding ?? '',
    description: company?.description ?? '',
    advertisingSlogan: company?.advertisingSlogan ?? '',
    employeesCount: company?.employeesCount ?? '',
    companyType: company?.companyType ?? '',
    companyTypeOther: company?.companyTypeOther ?? '',
    // backgroundImage: company?.backgroundImage ?? '',
    // logo: company?.logo ?? '',
    subjectOfActivity: company?.subjectOfActivity ?? '',
    establishDate: company?.establishDate ?? '',
    rawMaterialsOrigin: company?.rawMaterialsOrigin ?? '',
    keyWords: company?.keyWords ?? '',
    tags: company?.tags ?? '',
    companyKeyWords: company?.companyKeyWords ?? [],
    companyTags: company?.companyTags ?? [],
    products: company?.products ?? [],
    outSourcedProducts: company?.outSourcedProducts ?? [],
    primaryBrand: company?.primaryBrand ?? '',
    mainBrandEn: company?.mainBrandEn ?? '',
    factoryCity: company?.location?.factoryCity ?? '',
    factoryState: company?.location?.factoryState ?? '',
    industrialCity: company?.location?.industrialCity ?? '',
    factoryPoBox: company?.location?.factoryPoBox ?? '',
    officePoBox: company?.location?.officePoBox ?? '',
    factoryLocation: company?.location?.factoryLocation ?? '',
    officeLocation: company?.location?.officeLocation ?? '',
    officeCity: company?.location?.officeCity ?? '',
    officeState: company?.location?.officeState ?? '',
    factoryTels: company?.factoryTels ?? [],
    factoryFaxes: company?.factoryFaxes ?? [],
    officeTels: company?.officeTels ?? [],
    officeFaxes: company?.officeFaxes ?? [],
    telegramId: company?.telegramId ?? '',
    telegramPhoneNo: company?.telegramPhoneNo ?? '',
    smsNumber: company?.smsNumber ?? '',
    hotlineNumber: company?.hotlineNumber ?? '',
    whatsAppId: company?.whatsAppId ?? '',
    whatsAppPhoneNo: company?.whatsAppPhoneNo ?? '',
    instagramId: company?.instagramId ?? '',
    linkedInId: company?.linkedInId ?? '',
    eitaaPhoneNo: company?.eitaaPhoneNo ?? '',
    rubikaPhoneNo: company?.rubikaPhoneNo ?? '',
    skypeId: company?.skypeId ?? '',
    website: company?.website ?? '',
    contacts: company?.contacts ?? [],
    emails: company?.emails ?? [],
    productAvailability: company?.productAvailability ?? '2',
    subcategory: company?.subcategory ?? null,
    productTitles: company?.productTitles ?? '',
    outSourcedProductTitles: company?.outSourcedProductTitles ?? '',
    productsDescription: company?.productsDescription ?? '',
    outSourcedProductsDescription: company?.outSourcedProductsDescription ?? '',
    currentLogo: company?.logo ?? '',
    currentBackgroundImages: company?.currentBackgroundImages ?? [],
    gallery: company?.gallery ?? {
      contacts: [],
      certificates: [],
      products: [],
      slider: [],
      catalog: {},
      documents: [],
    },
  };
}
