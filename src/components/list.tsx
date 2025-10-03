'use client'

import { Menu } from "@/type";
import { useEffect, useState } from "react"

declare global {
  interface Window {
    snap: {
      pay: (
        token: string,
        options?: {
          onSuccess?: (result: any) => void
          onPending?: (result: any) => void
          onError?: (result: any) => void
          onClose?: () => void
        }
      ) => void
    }
  }
}

export default function List({data}: {data: Menu}) {
  const [items, setItems] = useState<Pick<Menu[number], "name" | "price">[]>([])
  const total = items.reduce((sum, item) => sum+Number(item.price), 0)

  useEffect(() => {
    const snapScript = 'https://app.sandbox.midtrans.com/snap/snap.js'
    const clientKey = process.env.NEXT_PUBLIC_CLIENT || ''

    const script = document.createElement('script')
    script.src = snapScript
    script.setAttribute('data-client-key', clientKey)
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const checkout = async () => {
    const res = await fetch('/api/tokenizer', {
      method: 'POST',
      body: JSON.stringify({total, items})
    })

    const json = await res.json()
    window.snap.pay(json.token)
  }

  return (<>
    <div className="flex w-full items-center justify-end gap-2 mb-8">
      
      <span className="rounded-md bg-neutral-200 px-2 py-1 text-sm">
        Rp{total}
      </span>
      
      <button onClick={() => checkout()} disabled={!total}
      className="inline-flex items-center justify-center rounded-md bg-neutral-950 px-3 py-2 text-sm font-medium 
      text-neutral-50 shadow hover:bg-neutral-800 disabled:bg-neutral-600 disabled:text-neutral-400 disabled:cursor-auto cursor-pointer">
        Checkout
      </button>

    </div>

    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((item) => (
        <li key={item.id} className="h-full overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100">

          <div className="p-4 pb-2">
            <h3 className="text-pretty text-lg font-medium">{item.name}</h3>
          </div>
            
          <div className="px-4 pb-4">
            <p className="text-sm">{item.desc}</p>
          </div>

          <div className="px-4 pb-4">
            <div className="flex w-full items-center justify-between gap-2">
              <span className="rounded-md bg-neutral-200 px-2 py-1 text-sm">
                Rp{item.price}
              </span>
              <button onClick={() => setItems(prevItems => [...prevItems, {name: item.name, price: item.price, quantity: 1}])}
              className="inline-flex items-center justify-center rounded-md bg-neutral-950 px-3 py-2 text-sm font-medium text-neutral-50 shadow hover:bg-neutral-800 cursor-pointer">
                Add to cart
              </button>
            </div>
          </div>
          
        </li> 
      ))}
    </ul>
  </>)
}