'use client';
import PaymentReject from '@/layouts/payment-reject';
import PaymentSuccess from '@/layouts/payment-success';
import { useSearchParams } from 'next/navigation';

export default function PaymentStatus({
  params: { status },
}: {
  params: { status: string };
}) {
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount');
  const internalRefId = searchParams.get('irefid');
  const refId = searchParams.get('refId');
  const transactionTime = searchParams.get('transactionTime');
  let data = {
    amount,
    internalRefId,
    refId,
    transactionTime,
  };
  if (status === 'failed') return <PaymentReject query={data} />;
  else if (status === 'success') return <PaymentSuccess query={data} />;
  else return <></>;
}
