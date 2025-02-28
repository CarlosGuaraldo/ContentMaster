'use client'

import { useState } from 'react'
import RichTextEditor from '@/components/RichTextEditor'

const Page = () => {
    const [editorContent, setEditorContent] = useState('')

    const handleEditorChange = (content: string) => {
        setEditorContent(content)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('Submitted content:', editorContent)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* TODO: Add a new field to be the page title, save it, and store in the database */}
                {/* TODO: Add a new field to be the page route, save it, and store in the database */}
                <RichTextEditor onChange={handleEditorChange} />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default Page
