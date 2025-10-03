import Midtrans from 'midtrans-client'
import { NextResponse } from 'next/server'

const snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: process.env.SECRET
})

export async function POST(request) {
    const {total, items} = await request.json()

    const params = {
        item_details: items,
        transaction_details: {
            order_id: Date.now().toString(),
            gross_amount: total
        },
        callbacks: {
            finish: '/thanks'
        }
    }

    const token = await snap.createTransactionToken(params)
    return NextResponse.json({token})
}