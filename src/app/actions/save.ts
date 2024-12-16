'use server'

import { JSDOM } from 'jsdom'
import DOMPurify from 'dompurify'

const { window } = new JSDOM('')
const DOMPurifyInstance = DOMPurify(window)

export async function saveRichTextContent(content: string): Promise<{
    message: string
    success: boolean
}> {
    try {
        const test = `<p>my content <strong><em><u>customised </u></em></strong><script>alert('hey')</script>  </p>`
        console.log(test)

        const sanitizedContent = DOMPurifyInstance.sanitize(test)
        console.log(sanitizedContent)

        return { message: 'Content saved successfully!', success: true }
    } catch (error) {
        console.error('Error saving content:', error)
        return { message: 'Failed to save content.', success: false }
    }
}
