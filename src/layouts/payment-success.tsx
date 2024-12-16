import { useEffect, useState } from 'react';
import {
  Modal,
  Button,
  Text,
  ActionIcon,
  Input,
  Password,
  Checkbox,
} from 'rizzui';
import { RiHandCoinLine } from 'react-icons/ri';
import { HiOutlineCreditCard } from 'react-icons/hi2';
import { LuClock4 } from 'react-icons/lu';
import { PiNewspaperClipping } from 'react-icons/pi';
import { FaCheck } from 'react-icons/fa6';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useAxiosPrivate from '@/hooks/use-axios-private';

export default function PaymentSuccess({ query }) {
  // const router = useRouter();
  // const [query, setQuery] = useState({});
  // useEffect(() => {
  //   if (router.isReady) {
  //     setQuery(router.query);
  //   }
  // }, [router.isReady, router.query]);
  // const [paymentInfo, setPaymentInfo] = useState({});

  const [modalState, setModalState] = useState(true);
  // const _axios = useAxiosPrivate();
  // useEffect(() => {
  //   const fetchSubscriptions = async (subCategoryId: number) => {
  //     try {
  //       const response = await _axios.get(`/subscription/${subCategoryId}`);
  //       if (response.data.status === 'SUCCESS') {
  //         setItems(response.data.data);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching subcategories:', error);
  //     }
  //   };
  //   fetchSubscriptions();
  // }, [_axios]);
  return (
    <>
      <Modal
        isOpen={modalState}
        onClose={() => console.log()}
        overlayClassName="backdrop-blur"
        containerClassName="!max-w-xl !shadow-2xl"
      >
        <div className="relative m-auto flex flex-col items-center justify-center overflow-y-visible px-7 pb-8 pt-6">
          <div className="mb-7 flex flex-col items-center justify-center">
            <FaCheck
              size={40}
              className="mb-5 h-auto w-auto rounded-full bg-green-light p-4 text-white"
            />
            <Text tag="h3" className="font-black">
              پرداخت موفق
            </Text>
            <Text tag="p" className="text-gray-400">
              عملیات پرداخت شما با موفقیت انجام شد.
            </Text>
          </div>
          <div className="w-4/5 border-2 border-dashed border-gray-100" />
          <div className="flex w-full flex-col items-center justify-center gap-5 py-16">
            <div className="flex w-2/3 items-center justify-between">
              <span className="flex items-center justify-center gap-1 text-gray-400">
                <RiHandCoinLine size={20} />
                مبلغ:
              </span>
              <span className="font-extrabold text-green-light">
                {query.amount || 'N/A'} ریال
              </span>
            </div>
            <div className="flex w-2/3 items-center justify-between rounded-xl bg-[#f1f5f9] p-1">
              <span className="flex items-center justify-center gap-1 text-gray-400">
                <HiOutlineCreditCard size={20} />
                مقصد:
              </span>
              <span className="font-extrabold text-black">
                مرجع صنایع غذایی و کشاورزی ایران
              </span>
            </div>
            <div className="flex w-2/3 items-center justify-between rounded-xl">
              <span className="flex items-center justify-center gap-1 text-gray-400">
                <LuClock4 size={20} />
                زمان تراکنش:
              </span>
              <span className="font-extrabold text-black">
                {query.transactionTime || 'N/A'}
              </span>
            </div>
            <div className="flex w-2/3 items-center justify-between rounded-xl bg-[#f1f5f9] p-1">
              <span className="flex items-center justify-center gap-1 text-gray-400">
                <PiNewspaperClipping size={20} />
                کد رهگیری:
              </span>
              <span className="font-extrabold text-black">
                {query.refId || 'N/A'}
              </span>
            </div>
          </div>
          <Link href={'/'}>
            <Button
              color="success"
              variant="outline"
              size="lg"
              className="w-auto whitespace-nowrap"
              rounded="pill"
            >
              بازگشت صفحه اصلی
            </Button>
          </Link>
          {/* <Link href={'/'}>
            <Button color="success" size="lg" className="w-2/3" rounded="pill">
              بازگشت صفحه اصلی
            </Button>
          </Link> */}
        </div>
      </Modal>
    </>
  );
}
