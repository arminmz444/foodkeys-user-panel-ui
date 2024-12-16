"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DynamicForm from '../../../../components/DynamicForm';
import { jsonSchemaToZod } from '@/utils/json-schema-to-zod';

interface ServicePageProps {
    schema: any;
    serviceId: string;
}
//
// export const getServerSideProps: GetServerSideProps<ServicePageProps> = async (context) => {
//     const { id } = context.params as { id: string };
//
//     const res = await fetch(`https://foodkeys-api-dev.liara.run/api/services/${id}/schema`);
//     if (!res.ok) {
//         return {
//             notFound: true,
//         };
//     }
//
//     const schema = await res.json();
//
//     return {
//         props: {
//             schema,
//             serviceId: id,
//         },
//     };
// };

// @ts-ignore
const ServicePage = ({ schema, serviceId }) => {
    const zodSchema = jsonSchemaToZod(schema);

    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: zodResolver(zodSchema),
        defaultValues: {},
        mode: 'onSubmit',
    });

    const onSubmit = (data: any) => {
        console.log('Form submitted data:', data);
    };

    return (
        <div>
            <h1>Dynamic Form for Service {serviceId}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DynamicForm schema={schema} register={register} errors={errors} control={control}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ServicePage;
