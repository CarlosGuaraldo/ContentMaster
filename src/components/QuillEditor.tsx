'use client'

import dynamic from 'next/dynamic'
import { useState, useMemo, useRef } from 'react'
import 'react-quill/dist/quill.snow.css'
import { uploadFile } from '@/app/actions/upload'
import { saveRichTextContent } from '@/app/actions/save'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const toolbarOptions = [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline'],
    ['link', 'image'],
]

async function handleImageUpload() {

    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = async () => {
        const file = input.files ? input.files[0] : null
        if (file) {
            const formData = new FormData()
            formData.append('file', file)

            try {
                console.log(file)
                const response = await uploadFile(formData)
                if (response.success) {
                    const imageUrl = `/uploads/${file.name.replace(/ /g, '_')}`
                    const quill = (window as any).quillRef.getEditor()
                    const range = quill.getSelection()

                    quill.insertEmbed(range.index, 'image', imageUrl)
                } else {
                    console.error('Failed to upload image:', response.message)
                }
            } catch (error) {
                console.error('Error uploading image:', error)
            }
        }
    }
}

const sanitiseContent = (content: string): string => {
    return content.replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

const save = async (content: string) => {
    console.log(sanitiseContent(content))
    saveRichTextContent(content)
}

const QuillEditor = () => {
    const quillRef = useRef()
    const [content, setContent] = useState<string>('')

    const handleChange = (value: string) => {
        setContent(value)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(content)
        save(content)
    }

    const modules = useMemo(() => ({
        toolbar: {
            container: toolbarOptions,
            handlers: {
                image: handleImageUpload,
            },
        },
    }), [])

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='editor-container'>
                    <ReactQuill
                        value={content}
                        onChange={handleChange}
                        modules={modules}
                        ref={quillRef}
                    />
                </div>
                <button type='submit'>Save</button>
            </form>
        </>
    )
}

export default QuillEditor