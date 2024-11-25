'use server'

export async function saveRichTextContent(content: string): Promise<{
    message: string
    success: boolean
}> {
    try {
        console.log(content)

        return { message: 'Content saved successfully!', success: true }
    } catch (error) {
        console.error('Error saving content:', error)
        return { message: 'Failed to save content.', success: false }
    }
}
