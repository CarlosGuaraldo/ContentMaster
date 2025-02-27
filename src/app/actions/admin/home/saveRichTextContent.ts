'use server'

import { JSDOM } from 'jsdom'
import DOMPurify from 'dompurify'
import { prisma } from '@/prisma'

const { window } = new JSDOM('')
const DOMPurifyInstance = DOMPurify(window)

export async function saveRichTextContent(content: string): Promise<{
    message: string
    success: boolean
}> {
    try {
        const sanitisedContent = DOMPurifyInstance.sanitize(content)
        const newContent = await prisma.richTextContent.create({
            data: {
                title: 'home page content',
                content: sanitisedContent,
                authorId: null,
            },
        })

        console.log(newContent)

        return { message: 'Content saved successfully!', success: true }
    } catch (error) {
        console.error('Error saving content:', error)
        return { message: 'Failed to save content.', success: false }
    }
}
