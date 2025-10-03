'use server'

import { revalidatePath } from "next/cache"
import prisma from "./prisma"

export async function index() {
    try {
        const res = await prisma.menu.findMany({
            orderBy: {
                created: 'desc'
            }
        })
        
        return {data: res}

    } catch {
        return {error: 'Something went wrong.'}
    }
}

export async function upload(_current: unknown, e: FormData) {
    const image = e.get('image') as File
    const formData = new FormData()
    formData.append('image', image)

    try {
        const res = await fetch('https://madanadra.app.n8n.cloud/webhook/upload', {
            method: 'POST',
            body: formData
        })

        if (!res) return {success: false, message: 'Failed to upload.'}

        revalidatePath('/', 'page')
        return {success: true, message: 'Successfully uploaded.'}
        
    } catch {
        return {success: false, message: 'Something went wrong.'}
    }
}