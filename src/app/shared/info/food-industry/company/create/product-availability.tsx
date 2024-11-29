import { Controller, useFormContext } from "react-hook-form";
import { RadioGroup } from "@/components/ui/radio-group";
import { AdvancedRadio } from "@/components/ui/advanced-radio";
import { PiCheckCircleFill } from "react-icons/pi";

const availability = [
    {
        value: "1",
        name: "استفاده از محصولات سایت قدیم",
    },
    {
        value: "2",
        name: "استفاده از محصولات سایت جدید",
    },
];

export default function ProductAvailability() {
    const { control, register } = useFormContext();

    return (
        <Controller
            name="productAvailability"
            control={control}
            render={({ field: { value, onChange } }) => (
                <RadioGroup
                    value={value}
                    setValue={onChange}
                    className="grid grid-cols-1 gap-4 lg:grid-cols-2"
                >
                    {availability.map((item) => (
                        <AdvancedRadio
                            key={item.value}
                            value={item.value}
                            {...register('productAvailability')}
                            className="flex justify-between rounded-xl border border-gray-200 p-6 text-gray-600 hover:cursor-pointer hover:border-gray-700"
                            inputClassName="[&:checked:enabled~span]:ring-1 [&:checked:enabled~span]:ring-offset-0 [&:checked:enabled~span]:ring-gray-700 [&:checked:enabled~span]:border-gray-700 [&:checked~span>.icon]:block"
                        >
                            <span>{item.name}</span>
                            <PiCheckCircleFill className="icon hidden h-5 min-w-[1.25rem] text-gray-900" />
                        </AdvancedRadio>
                    ))}
                </RadioGroup>
            )}
        />
    );
}
