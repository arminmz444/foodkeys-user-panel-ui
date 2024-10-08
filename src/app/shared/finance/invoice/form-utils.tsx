'use client';

import z from 'zod';
import { Text } from '@/components/ui/text';
import { Badge } from '@/components/ui/badge';
import cn from '@/utils/class-names';

// form zod validation schema
export const invoiceFormSchema = z.object({
  fromName: z.string().min(1, { message: 'این فیلد اجباری میباشد' }),
  fromAddress: z.string().min(1, { message: 'این فیلد اجباری میباشد' }),
  fromPhone: z
    .string()
    .min(1, { message: 'شماره تماس اشتباه میباشد' })
    .optional(),
  toName: z.string().min(1, { message: 'این فیلد اجباری میباشد' }),
  toAddress: z.string().min(1, { message: 'این فیلد اجباری میباشد' }),
  toPhone: z
    .string()
    .min(1, { message: 'شماره تماس اشتباه میباشد' })
    .optional(),
  invoiceNumber: z.string({
    required_error: 'این فیلد اجباری میباشد',
  }),
  createDate: z
    .date()
    .refine((value) => value !== null, 'لطفا یک تاریخ را انتخاب کنید'),
  dueDate: z
    .date({
      required_error: 'این فیلد اجباری میباشد',
    })
    .refine((value) => value !== null, 'لطفا یک تاریخ را انتخاب کنید'),
  status: z.string({
    required_error: 'این فیلد اجباری میباشد',
  }),
  shipping: z
    .number()
    .min(0, { message: 'این فیلد اجباری میباشد' })
    .or(z.string().min(1, { message: 'این فیلد اجباری میباشد' })),
  discount: z
    .number()
    .min(0, { message: 'این فیلد اجباری میباشد' })
    .or(z.string().min(1, { message: 'این فیلد اجباری میباشد' })),
  taxes: z
    .number()
    .min(0, { message: 'این فیلد اجباری میباشد' })
    .or(z.string().min(1, { message: 'این فیلد اجباری میباشد' })),
  items: z.array(
    z.object({
      item: z.string().min(1, { message: 'این فیلد اجباری میباشد' }).nonempty(),
      description: z
        .string()
        .min(1, { message: 'این فیلد اجباری میباشد' })
        .nonempty(),
      quantity: z.number().min(1, { message: 'این فیلد اجباری میباشد' }),
      price: z
        .number()
        .min(1, { message: 'این فیلد اجباری میباشد' })
        .or(z.string().min(1, { message: 'این فیلد اجباری میباشد' })),
    })
  ),
});

// generate form types from zod validation schema
export type InvoiceFormTypes = z.infer<typeof invoiceFormSchema>;

export const statusOptions = [
  {
    value: 'paid',
    name: 'Paid',
    label: (
      <div className="flex items-center">
        <Badge color="success" renderAsDot />
        <Text className="ms-2 font-medium text-green-dark">پرداخت شده</Text>
      </div>
    ),
  },
  {
    value: 'pending',
    name: 'Pending',
    label: (
      <div className="flex items-center">
        <Badge color="warning" renderAsDot />
        <Text className="ms-2 font-medium text-orange-dark">پردازش</Text>
      </div>
    ),
  },
  {
    value: 'overdue',
    name: 'Overdue',
    label: (
      <div className="flex items-center">
        <Badge color="danger" renderAsDot />
        <Text className="ms-2 font-medium text-red-dark">گذشته</Text>
      </div>
    ),
  },
  {
    value: 'draft',
    name: 'Draft',
    label: (
      <div className="flex items-center">
        <Badge className="bg-gray-400" renderAsDot />
        <Text className="ms-2 font-medium text-gray-600">پیش نویس</Text>
      </div>
    ),
  },
];

export function FormBlockWrapper({
  title,
  description,
  children,
  className,
}: React.PropsWithChildren<{
  title: string;
  description?: string;
  className?: string;
}>) {
  return (
    <section className={cn('@5xl:grid @5xl:grid-cols-6', className)}>
      <header className="col-span-2 mb-6 @5xl:mb-0">
        <Text tag="h5" className="font-semibold">
          {title}
        </Text>
        {description ? (
          <Text className="mt-1 text-sm text-gray-500">{description}</Text>
        ) : null}
      </header>
      <div className="col-span-4 grid grid-cols-2 gap-3 @lg:gap-4 @2xl:gap-5">
        {children}
      </div>
    </section>
  );
}
