'use server';

import { prisma } from "@/prisma";
import { Page } from "@prisma/client";

export async function getPages(userId: string): Promise<{
    data: Page[];
    message: string;
    success: boolean;
}> {
    try {
        const result = await prisma.page.findMany({
            where: {
                userId: userId
            }
        });

        return {
            data: result || [],
            message: 'Pages retrieved successfully',
            success: true
        };
    } catch (error) {
        return {
            data: [],
            message: 'An error occurred while fetching pages',
            success: false
        };
    }
}