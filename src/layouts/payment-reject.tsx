import {useState} from 'react';
import {
    Modal,
    Button,
    Text,
    ActionIcon,
    Input,
    Password,
    Checkbox,
} from 'rizzui';
import {RiHandCoinLine} from 'react-icons/ri';
import {HiOutlineCreditCard} from 'react-icons/hi2';
import {LuClock4} from 'react-icons/lu';
import {PiNewspaperClipping} from 'react-icons/pi';
import {FaCheck} from 'react-icons/fa6';
import {IoClose} from 'react-icons/io5';
import {SlCallEnd} from 'react-icons/sl';
import Link from "next/link";

export default function PaymentReject() {
    const [modalState, setModalState] = useState(true);
    return (
        <>
            <Button onClick={() => setModalState(true)}>پرداخ</Button>
            <Modal
                isOpen={modalState}
                onClose={() => console.log("Bilakh")}
                overlayClassName="backdrop-blur"
                containerClassName="!max-w-xl !shadow-2xl"
            >
                <div
                    className="relative m-auto flex flex-col items-center justify-center overflow-y-visible px-7 pb-8 pt-6">
                    <div className="mb-7 flex flex-col items-center justify-center">
                        <IoClose
                            size={40}
                            className="mb-5 h-auto w-auto rounded-full bg-red-light p-4 text-white"
                        />
                        <Text tag="h3" className="font-black">
                            پرداخت ناموفق
                        </Text>
                        <Text tag="p" className="text-gray-400">
                            متأسفانه عملیات پرداخت شما ناموفق بود!
                        </Text>
                    </div>
                    <div className="w-4/5 border-2 border-dashed border-gray-100"/>
                    <div className="flex w-full flex-col items-center justify-center gap-5 py-16">
                        <div className="flex w-2/3 items-center justify-between rounded-xl ">
              <span className="flex items-center justify-center gap-1 text-gray-400">
                <SlCallEnd size={20}/>
                پشتیبانی:
              </span>
                            <span className="font-extrabold text-black">32774346 - 026</span>
                        </div>
                        <div className="flex w-2/3 items-center justify-between rounded-xl bg-[#f1f5f9] p-1">
              <span className="flex items-center justify-center gap-1 text-gray-400">
                <HiOutlineCreditCard size={20}/>
                مقصد:
              </span>
                            <span className="font-extrabold text-black">
                مرجع صنایع غذایی و کشاورزی ایران
              </span>
                        </div>
                        <div className="flex w-2/3 items-center justify-between rounded-xl">
              <span className="flex items-center justify-center gap-1 text-gray-400">
                <LuClock4 size={20}/>
                زمان تراکنش:
              </span>
                            <span className="font-extrabold text-black">
                16:15 - 1401/02/11
              </span>
                        </div>
                        <div className="flex w-2/3 items-center justify-between rounded-xl bg-[#f1f5f9] p-1">
              <span className="flex items-center justify-center gap-1 text-gray-400">
                <PiNewspaperClipping size={20}/>
                کد رهگیری:
              </span>
                            <span className="font-extrabold text-black">596847596 </span>
                        </div>
                    </div>
                    <div className="flex w-5/6 items-center justify-center gap-4">
                        <Link href={'/'}>
                            <Button
                                color="info"
                                variant="text"
                                size="lg"
                                className="w-auto whitespace-nowrap"
                                rounded="pill"
                            >
                                بازگشت صفحه اصلی
                            </Button>
                        </Link>
                        <Button
                            color="info"
                            variant="flat"
                            size="lg"
                            className="w-full"
                            rounded="pill"
                        >
                            تکرار تراکنش
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
