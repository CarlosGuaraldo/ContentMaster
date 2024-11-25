'use server'

import path from 'path'
import { writeFile } from 'fs/promises'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function uploadFile(formData: FormData): Promise<{
    message: string,
    success: boolean
}> {
    await prisma.$connect().then(() => {
        console.log('Database connected successfully')
    }).catch((error) => {
        console.log(error)
    })

    const file = formData.get('file') as File | null

    if (!file) {
        return { message: 'No files received.', success: false }
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = Date.now() + file.name.replace(/ /g, '_')
    console.log('Saving file:', filename)

    try {
        const uploadPath = path.join(process.cwd(), 'public/uploads', filename)

        await writeFile(uploadPath, buffer)

        return { message: 'File uploaded successfully!', success: true }
    } catch (error) {
        console.error('File upload error:', error)
        return { message: 'Failed to upload file.', success: false }
    }
}
