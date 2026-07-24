import { z } from 'zod';
import { validationMessages } from '@/utils/form-validators';

export function jsonSchemaToZod(schema: any): z.ZodTypeAny {
    const { type, properties, items, required, format, enum: enumValues } = schema;

    if (enumValues && Array.isArray(enumValues)) {
        return z.enum(enumValues as [string, ...string[]]);
    }

    switch (type) {
        case 'string':
            let stringSchema = z.string();
            if (format === 'uri') {
                stringSchema = stringSchema.url({
                    message: validationMessages.website,
                });
            } else if (format === 'email') {
                stringSchema = stringSchema.email({
                    message: validationMessages.email,
                });
            } else if (format === 'date-time') {
                stringSchema = stringSchema.refine((val) => !isNaN(Date.parse(val)), {
                    message: 'فرمت تاریخ وارد شده صحیح نیست',
                });
            }
            return stringSchema;

        case 'integer':
            return z.number().int();

        case 'boolean':
            return z.boolean();

        case 'object':
            if (!properties) return z.object({});
            const shape: Record<string, z.ZodTypeAny> = {};
            for (const key of Object.keys(properties)) {
                const propSchema = jsonSchemaToZod(properties[key]);
                if (schema.required && schema.required.includes(key)) {
                    shape[key] = propSchema;
                } else {
                    shape[key] = propSchema.optional();
                }
            }
            return z.object(shape);

        case 'array':
            const itemSchema = jsonSchemaToZod(items);
            return z.array(itemSchema);

        default:
            return z.string().optional();
    }
}
