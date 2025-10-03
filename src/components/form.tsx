'use client'

import { useFormStatus } from "react-dom"
import { useActionState, useEffect, useState } from "react"
import { upload } from "@/fetch"

export default function Form() {
    const [state, formAction] = useActionState(upload, null)
    const [notif, setNotif] = useState<{success: boolean, message: string} | null>(null)
    const [preview, setPreview] = useState<string | null>(null)

    useEffect(() => {
        setNotif(state)
        state?.success && setPreview(null)
    }, [state])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        
        if (file) {
            const maxSize = 5 * 1024 * 1024
            if (file.size > maxSize) {
                setNotif({success: false, message: 'Image must be smaller than 5MB.'})
            }

            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result as string)
            }
            reader.readAsDataURL(file)

        } else {
            setPreview(null)
        }
    }
    
    const Button = () => {
        const {pending} = useFormStatus()

        useEffect(() => {
            pending && setNotif(null)
        }, [pending])
    
        return (
            <button type="submit" disabled={pending || !preview}
            className="w-max mr-0 ml-auto mt-2 inline-flex items-center justify-center rounded-md bg-neutral-950 px-3 py-2 text-sm font-medium 
            text-neutral-50 shadow hover:bg-neutral-800 disabled:bg-neutral-600 disabled:text-neutral-400 disabled:cursor-auto cursor-pointer">
                {pending ? 'Uploading...' : 'Upload'} 
            </button>
        )
    }
  
    return (
        <form action={formAction} noValidate>
            <label className="text-sm font-medium">Image file</label>
            <input name="image" type="file" accept="image/*" onChange={handleImageChange} required
            className="my-2 block w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm cursor-pointer" />
            <h2 className="text-xs text-neutral-500">
                Accepted: images only. Max size 5MB.
            </h2>

            <div className="flex gap-2 items-center justify-end mt-4">
                {notif &&
                    <span className={`${notif.success ? 'bg-green-200' : 'bg-red-200'} rounded-md px-2 py-1 text-sm`}>
                        {notif.message}
                    </span>
                }
                <Button />
            </div>

            {preview && <img src={preview} alt="Preview" className="mt-8 w-full max-w-sm mx-auto"/>}
        </form>
    );
}