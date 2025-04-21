'use server'

import { prisma } from "@/prisma"

export async function getPage(route: string): Promise<{
    content: string
    message: string
    success: boolean
}> {
    if (!route) {
        return {
            content: '',
            message: 'Route is required',
            success: false
        }
    }

    const sanitizedRoute = route
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');

    if (sanitizedRoute !== route) {
        return {
            content: '',
            message: 'Invalid route format',
            success: false
        }
    }

    try {
        const result = await prisma.page.findFirst({
            where: {
                route: route
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
