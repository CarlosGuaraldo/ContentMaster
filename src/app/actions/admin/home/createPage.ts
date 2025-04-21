'use server'

import { JSDOM } from 'jsdom'
import DOMPurify from 'dompurify'
import { prisma } from '@/prisma'

const { window } = new JSDOM('')
const DOMPurifyInstance = DOMPurify(window)

type createPageProps = {
    title: string
    route: string
    content: string
    userId: string
}

export async function createPage(props: createPageProps): Promise<{
    message: string
    success: boolean
}> {
    try {
        const existingPage = await prisma.page.findFirst({
            where: {
                route: props.route,
            },
        })
        if (existingPage) {
            return { message: 'Page with this route already exists.', success: false }
        }

        const sanitisedContent = DOMPurifyInstance.sanitize(props.content)
        const newPage = await prisma.page.create({
            data: {
                title: props.title,
                route: props.route,
                userId: props.userId,
                content: sanitisedContent,
            },
        })

        console.log(newPage);
        return { message: 'Content saved successfully!', success: true }
    } catch (error) {
        console.error('Error saving content:', error)
        return { message: 'Failed to save content.', success: false }
    }
}
