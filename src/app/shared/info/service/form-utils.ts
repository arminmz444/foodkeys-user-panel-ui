import { z } from 'zod';
import {
  optionalEmailSchema,
  optionalMobilePhoneSchema,
  optionalWebsiteSchema,
  validationMessages,
} from '@/utils/form-validators';
import { ServiceDisplaySettingsValues } from './service-display-settings';

export const serviceDisplaySettingsSchema = z.object({
  name: z.string().min(1, { message: validationMessages.serviceName }),
  nameEn: z.string().optional(),
  description: z.string().optional(),
  logo: z.string().optional(),
  backgroundImage: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  currentLogo: z.string().optional(),
  currentBackgroundImage: z.string().optional(),
});

export type ServiceDisplaySettingsInput = z.infer<
  typeof serviceDisplaySettingsSchema
>;

export function validateServiceDisplaySettings(
  values: Partial<ServiceDisplaySettingsValues>
) {
  return serviceDisplaySettingsSchema.safeParse(values);
}

export function getServiceDisplaySettingsErrors(
  values: Partial<ServiceDisplaySettingsValues>
): Partial<Record<keyof ServiceDisplaySettingsValues, string>> {
  const result = validateServiceDisplaySettings(values);

  if (result.success) {
    return {};
  }

  const fieldErrors: Partial<
    Record<keyof ServiceDisplaySettingsValues, string>
  > = {};

  result.error.issues.forEach((issue) => {
    const field = issue.path[0];
    if (typeof field === 'string' && !fieldErrors[field as keyof ServiceDisplaySettingsValues]) {
      fieldErrors[field as keyof ServiceDisplaySettingsValues] = issue.message;
    }
  });

  return fieldErrors;
}

export const serviceDynamicFieldSchemas = {
  email: optionalEmailSchema(),
  tel: optionalMobilePhoneSchema(),
  url: optionalWebsiteSchema(),
};
