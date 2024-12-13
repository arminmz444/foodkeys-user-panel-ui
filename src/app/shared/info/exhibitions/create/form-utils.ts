import { z } from 'zod';

export function defaultValues(event?: CreateEventInput) {
  return {
    fax: event?.fax ?? [],
    tel: event?.tel ?? [],
    logo: event?.logo ?? '',
    type: event?.type ?? 1,
    title: event?.title ?? '',
    venue: event?.venue ?? '',
    address: event?.address ?? '',
    country: event?.country ?? '',
    endDate: event?.endDate ?? '',
    website: event?.website ?? '',
    category: event?.category ?? null,
    keywords: event?.keywords ?? [],
    organizer: event?.organizer ?? '',
    startDate: event?.startDate ?? '',
    description: event?.description ?? '',
  };
}

const categorySchema = z.object({
  name: z.string(),
  value: z.number(),
});


export const exhibitionFormSchema = z.object({
  fax: z.array(z.string()).optional(),
  tel: z.array(z.string()).optional(),
  logo: z.string(),
  type: z.number().min(1, { message: 'این فیلد اجباری میباشد' }),
  title: z.string().min(1, { message: 'این فیلد اجباری میباشد' }),
  venue: z.string().min(1, { message: 'این فیلد اجباری میباشد' }),
  address: z.string().min(1, { message: 'این فیلد اجباری میباشد' }),
  country: z.string().min(1, { message: 'این فیلد اجباری میباشد' }),
  endDate: z.string().min(1, { message: 'این فیلد اجباری میباشد' }), 
  website: z.string().url({ message: 'آدرس وبسایت باید معتبر باشد' }),
  category: categorySchema.optional(),
  keywords: z.array(z.string()).optional(),
  organizer: z.string().min(1, { message: 'این فیلد اجباری میباشد' }),
  startDate: z.string().min(1, { message: 'این فیلد اجباری میباشد' }),
  description: z.string().optional(),
  dataFileIds: z.array(z.string()).optional(),
});

export type CreateEventInput = z.infer<typeof exhibitionFormSchema>;
