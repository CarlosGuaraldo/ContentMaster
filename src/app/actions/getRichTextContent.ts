'use server'

import { prisma } from "@/prisma"

export async function getRichTextContent(id: string): Promise<{
    content: string
    message: string
    success: boolean
}> {
    try {
        const numberId = Number(id)

        if (isNaN(numberId)) {
            return {
                content: '',
                message: 'Invalid id',
                success: false
            }
        }

        const result = await prisma.richTextContent.findUnique({
            where: {
                id: numberId
            }
        })

        return {
            content: result?.content || '',
            message: '',
            success: true
        }
    } catch (error) {
        console.log(error)
        return {
            content: '',
            message: '',
            success: false
        }
    }
}
