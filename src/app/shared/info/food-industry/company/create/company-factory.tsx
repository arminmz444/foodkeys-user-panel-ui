import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import QuillLoader from '@/components/loader/quill-loader';
import { PiPlusBold, PiXBold } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { ActionIcon } from "@/components/ui/action-icon";
import TrashIcon from "@/components/icons/trash";
import { useCallback, useEffect, useState } from "react";
import useAxiosPrivate from '../../../../../../hooks/use-axios-private';

const Select = dynamic(() => import('@/components/ui/select'), {
    ssr: false,
    loading: () => <SelectLoader />,
});
const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
    ssr: false,
    loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});

export default function CompanyFactory({ className }: { className?: string }) {
    const _axios = useAxiosPrivate();
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [factoryPhones, setFactoryPhones] = useState<string[]>([]);
    const [contacts, setContacts] = useState<{ name: string, lastName: string, position: string, phoneNumber: string }[]>([]);

    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    // Fetch provinces
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await _axios.get('/province');
                if (response.data.status === 'SUCCESS') {
                    setProvinces(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };
        fetchProvinces();
    }, [_axios]);

    useEffect(() => {
        if (selectedProvince) {
            const fetchCities = async () => {
                try {
                    // @ts-ignore
                    const response = await _axios.get(`/province/${selectedProvince.value}/city`);
                    if (response.data.status === 'SUCCESS') {
                        setCities(response.data.data);
                    }
                } catch (error) {
                    console.error('Error fetching cities:', error);
                }
            };
            fetchCities();
        }
    }, [selectedProvince, _axios]);

    return (
        <FormGroup
            title="اطلاعات تماس کارخانه"
            description="شامل نام دسته‌بندی، تجاری و ..."
            className={cn(className)}
        >
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                <div className="flex flex-col space-y-2">
                    <label className="font-medium text-gray-700 dark:text-gray-600">استان کارخانه</label>
                    <Controller
                        name="factoryProvince"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Select
                                // @ts-ignore
                                options={provinces.map((province) => ({ value: province.id, name: province.name }))}
                                value={value}
                                onChange={(e) => {
                                    onChange(e);
                                    // @ts-ignore
                                    setSelectedProvince(e);
                                }}
                                placeholder="انتخاب استان"
                                error={errors?.factoryProvince?.message as string}
                            />
                        )}
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="font-medium text-gray-700 dark:text-gray-600">شهر کارخانه</label>
                    <Controller
                        name="factoryCity"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Select
                                // @ts-ignore
                                options={cities.map((city) => ({ value: city.id, name: city.nameFa }))}
                                value={value}
                                onChange={onChange}
                                placeholder="انتخاب شهر"
                                error={errors?.factoryCity?.message as string}
                            />
                        )}
                    />
                </div>
            </div>

            <Input
                label="نام شهرک صنعتی"
                placeholder="نام شهرک صنعتی"
                {...register('industrialCityName')}
                error={errors.industrialCityName?.message as string}
            />
            <Input
                label="کد پستی کارخانه"
                type="number"
                placeholder="کد پستی کارخانه"
                {...register('factoryPoBox')}
                error={errors.factoryPoBox?.message as string}
            />

            <div className="flex flex-col space-y-2">
                <label className="font-medium text-gray-700 dark:text-gray-600">تلفن‌های کارخانه</label>
                {factoryPhones.map((phone, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <Input
                            type="number"
                            value={phone}
                            placeholder={`تلفن کارخانه ${index + 1}`}
                            onChange={(e) => {
                                const newPhones = [...factoryPhones];
                                newPhones[index] = e.target.value;
                                setFactoryPhones(newPhones);
                            }}
                            className="flex-grow"
                        />
                        <ActionIcon onClick={() => setFactoryPhones(factoryPhones.filter((_, i) => i !== index))} variant="flat">
                            <TrashIcon className="h-4 w-4" />
                        </ActionIcon>
                    </div>
                ))}
                {factoryPhones.length < 3 && (
                    <Button onClick={() => setFactoryPhones([...factoryPhones, ''])} variant="outline">
                        <PiPlusBold className="me-2 h-4 w-4" /> اضافه کردن تلفن جدید
                    </Button>
                )}
            </div>

            <div className="flex flex-col space-y-4">
                <label className="font-medium text-gray-700 dark:text-gray-600">اطلاعات تماس‌ها</label>
                {contacts.map((contact, index) => (
                    <div key={index} className="grid grid-cols-1 gap-4 xl:grid-cols-4 items-center">
                        <Input
                            label="نام"
                            placeholder="نام"
                            value={contact.name}
                            onChange={(e) => {
                                const newContacts = [...contacts];
                                newContacts[index].name = e.target.value;
                                setContacts(newContacts);
                            }}
                            className="flex-grow"
                        />
                        <Input
                            label="نام خانوادگی"
                            placeholder="نام خانوادگی"
                            value={contact.lastName}
                            onChange={(e) => {
                                const newContacts = [...contacts];
                                newContacts[index].lastName = e.target.value;
                                setContacts(newContacts);
                            }}
                            className="flex-grow"
                        />
                        <Input
                            label="سمت"
                            placeholder="سمت"
                            value={contact.position}
                            onChange={(e) => {
                                const newContacts = [...contacts];
                                newContacts[index].position = e.target.value;
                                setContacts(newContacts);
                            }}
                            className="flex-grow"
                        />
                        <Input
                            label="شماره تلفن"
                            type="number"
                            placeholder="شماره تلفن"
                            value={contact.phoneNumber}
                            onChange={(e) => {
                                const newContacts = [...contacts];
                                newContacts[index].phoneNumber = e.target.value;
                                setContacts(newContacts);
                            }}
                            className="flex-grow"
                        />
                        <ActionIcon onClick={() => setContacts(contacts.filter((_, i) => i !== index))} variant="flat">
                            <TrashIcon className="h-4 w-4" />
                        </ActionIcon>
                    </div>
                ))}
                {contacts.length < 3 && (
                    <Button onClick={() => setContacts([...contacts, { name: '', lastName: '', position: '', phoneNumber: '' }])} variant="outline">
                        <PiPlusBold className="me-2 h-4 w-4" /> اضافه کردن تماس جدید
                    </Button>
                )}
            </div>

            {/* Factory Address */}
            <Controller
                control={control}
                name="factoryAddress"
                render={({ field: { onChange, value } }) => (
                    <QuillEditor
                        value={value}
                        onChange={onChange}
                        label="آدرس کارخانه"
                        className="col-span-full [&_.ql-editor]:min-h-[100px]"
                        labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                    />
                )}
            />
        </FormGroup>
    );
}
