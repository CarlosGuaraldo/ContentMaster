'use server'

import { JSDOM } from 'jsdom'
import { PrismaClient } from "@prisma/client"
import DOMPurify from 'dompurify'

const { window } = new JSDOM('')
const prisma = new PrismaClient()
const DOMPurifyInstance = DOMPurify(window)

export async function getRichTextContent(): Promise<{
    content: string
    message: string
    success: boolean
}> {
    try {

        const richTextContent = await prisma.richTextContent.findFirst({
            orderBy: {
                createdAt: 'desc'
            }
        })

        return {
            content: richTextContent?.content || '',
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

