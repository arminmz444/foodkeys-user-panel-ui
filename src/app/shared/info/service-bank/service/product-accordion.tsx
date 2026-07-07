import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ActionIcon } from "@/components/ui/action-icon";
import PencilIcon from "@/components/icons/pencil";
import TrashIcon from "@/components/icons/trash";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";

const ProductAccordion = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const accordions = [
        { title: "Option A", messageCount: 6, icon: "🔗" },
        { title: "Option B", messageCount: 6, icon: "🌙" },
        { title: "Option C", messageCount: 6, icon: "🌟" },
    ];

    return (
        <div className="w-full max-w-full rounded-lg bg-gray-0 shadow-md dark:bg-gray-50">
            {accordions?.map((item, index) => (
                <div key={index}>
                    {/* Accordion Header */}
                    <button
                        className="flex items-center justify-between w-full p-4 focus:outline-none hover:bg-gray-50 transition"
                        onClick={() => toggleAccordion(index)}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="text-base font-medium">{item.title}</h3>
                                <p className="text-sm text-gray-500">
                                    {item.messageCount} unread messages
                                </p>
                            </div>
                        </div>
                        <span className="text-gray-500">
              {openIndex === index ? "▲" : "▼"}
            </span>
                    </button>

                    {/* Accordion Content with Form */}
                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            openIndex === index ? "max-h-[800px]" : "max-h-0"
                        }`}
                    >
                        <div className="p-4">
                            {/* Form Content */}
                            <div className="px-4 pt-6 pb-8">
                                <div className="grid grid-cols-12 gap-y-6 gap-x-5 [&_label>span]:font-medium">
                                    {/* First two inputs with responsive spans */}
                                    <Input
                                        label="عنوان محصول *"
                                        inputClassName="border-2"
                                        size="lg"
                                        className="col-span-12 lg:col-span-6"
                                    />
                                    {/*<Input*/}
                                    {/*    label="نوع محصول *"*/}
                                    {/*    inputClassName="border-2"*/}
                                    {/*    size="lg"*/}
                                    {/*    className="col-span-12 lg:col-span-6"*/}
                                    {/*/>*/}
                                    {/* Full-width input */}
                                    <Input
                                        label="دسته بندی محصول *"
                                        inputClassName="border-2"
                                        size="lg"
                                        className="col-span-12 lg:col-span-6"
                                    />
                                    <Textarea
                                        label="عنوان محصولات (خدمات)"
                                        placeholder="عنوان محصولات (خدمات)"
                                        {/*{...register('productsTitle')}*/}
                                        // error={errors.productsTitle?.message as string}
                                        className="col-span-full"
                                        rows={3}
                                    />
                                    <Checkbox
                                        size="lg"
                                        inputClassName="border-2"
                                        className="col-span-12"
                                        label={"نمایش محصول"}
                                    />
                                    <div className="col-span-12 mt-2 flex justify-end gap-4">
                                        {/* Edit and Delete buttons */}
                                        {/*<ActionIcon*/}
                                        {/*    variant="flat"*/}
                                        {/*    className="mt-7 shrink-0 text-gray-500"*/}
                                        {/*>*/}
                                        {/*    <PencilIcon className="h-4 w-4" />*/}
                                        {/*</ActionIcon>*/}
                                        {/*<ActionIcon*/}
                                        {/*    variant="flat"*/}
                                        {/*    className="bg-red text-white mt-7 shrink-0"*/}
                                        {/*>*/}
                                        {/*    <TrashIcon className="h-4 w-4" />*/}
                                        {/*</ActionIcon>*/}
                                        <Button
                                            size="lg"
                                            className="col-span-2 mt-2"
                                        >
                                            <PencilIcon className="h-4 w-4 me-1" /> ویرایش
                                        </Button>
                                        <Button
                                            size="lg"
                                            className="bg-red text-white col-span-2 mt-2"
                                        >
                                            <TrashIcon className="h-4 w-4 me-1" />حذف
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {index < accordions.length - 1 && <hr className="border-gray-200" />}
                </div>
            ))}
        </div>
    );
};

export default ProductAccordion;
