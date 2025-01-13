'use client'

import { saveRichTextContent } from '@/app/actions/admin/home/saveRichTextContent'
import { uploadFile } from '@/app/actions/admin/home/uploadFile'
import dynamic from 'next/dynamic'
import { useMemo, useRef, useState } from 'react'
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface QuillInstance {
    quill: {
        getSelection: () => { index: number }
        editor: {
            insertEmbed: (index: number, type: string, value: string) => void
        }
    }
}

const toolbarOptions = [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline'],
    ['link', 'image'],
]

async function handleImageUpload(this: QuillInstance) {
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
                const response = await uploadFile(formData)
                if (response.success) {
                    const imageUrl = response.url as string
                    console.log(imageUrl)
                    const quill = this.quill
                    const range = quill.getSelection()

                    quill.editor.insertEmbed(range.index, 'image', imageUrl)
                } else {
                    console.error('Failed to upload image:', response.message)
                }
            } catch (error) {
                console.error('Error uploading image:', error)
            }
        }
    }
}

const save = async (content: string) => {
    saveRichTextContent(content)
}

const RichTextEditor = () => {
    const quillRef = useRef()
    const [content, setContent] = useState<string>('')

    const handleChange = (value: string) => {
        setContent(value)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        save(content)
    }

    const modules = useMemo(
        () => ({
            toolbar: {
                container: toolbarOptions,
                handlers: {
                    image: handleImageUpload,
                },
            },
        }),
        []
    )

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='editor-container'>
                    <ReactQuill
                        value={content}
                        onChange={handleChange}
                        modules={modules}
                    />
                </div>
                <button type='submit'>Save</button>
            </form>
        </>
    )
}

export default RichTextEditor
