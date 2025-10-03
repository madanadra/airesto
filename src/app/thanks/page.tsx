'use client'

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Finish() {
    const status = useSearchParams().get('transaction_status')

    return (
        <div className="grid gap-y-2 h-screen justify-items-center content-center p-4 font-medium">
            <h1 className="text-lg">
                {status === 'settlement' ? 'Your payment has been completed.' : status === 'pending' ? 'Your payment is pending.' : 'Your payment went wrong.'}
            </h1>
            <h2 className="text-slate-600">
                {status === 'settlement' ? 'Thank you for ordering' : status === 'pending' ? 'Please complete the payment' : 'Please try again'}
            </h2>
            <Link href='/' className="text-sm text-blue-700 underline mt-4">Back to page</Link>
        </div>
    )
}