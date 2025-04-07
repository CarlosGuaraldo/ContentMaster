'use server'

import { JSDOM } from 'jsdom'
import DOMPurify from 'dompurify'
import { prisma } from '@/prisma'
import { User } from '@prisma/client'

const { window } = new JSDOM('')
const DOMPurifyInstance = DOMPurify(window)

type createPageProps = {
    title: string
    route: string
    content: string
    userId?: string
    user?: User
}

export async function createPage(props: createPageProps): Promise<{
    message: string
    success: boolean
}> {
    try {
        console.log(props);
        
        const sanitisedContent = DOMPurifyInstance.sanitize(props.content)
        // const newContent = await prisma.page.create({
        //     data: {
        //         title: props.title,
        //         route: props.route,
        //         content: sanitisedContent,
        //         userId: props.userId,
        //     },
        // })

        return { message: 'Content saved successfully!', success: true }
    } catch (error) {
        console.error('Error saving content:', error)
        return { message: 'Failed to save content.', success: false }
    }
}
