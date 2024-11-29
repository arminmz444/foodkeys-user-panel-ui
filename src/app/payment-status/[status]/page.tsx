"use client"
import PaymentReject from "@/layouts/payment-reject";
import PaymentSuccess from "@/layouts/payment-success";


export default function PaymentStatus({params: {status}}: { params: { status: string } }) {
    if (status === 'failed')
        return <PaymentReject/> ;
    else if (status === 'success')
        return <PaymentSuccess />;
    else return <></>
}
