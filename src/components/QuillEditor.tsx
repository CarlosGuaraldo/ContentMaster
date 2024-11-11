'use client'

import dynamic from 'next/dynamic'
import { useState, useMemo, useRef } from 'react'
import 'react-quill/dist/quill.snow.css'
import axios from 'axios'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const toolbarOptions = [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline'],
    ['link', 'image'],
]

const handleImageUpload = async () => {
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
                const response = await axios.post('/api/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })

                // const imageUrl = response.data.url
                // const quill = (window as any).quillRef.getEditor()
                // const range = quill.getSelection()
                // quill.insertEmbed(range.index, 'image', imageUrl)
            } catch (error) {
                console.error('Error uploading image:', error)
            }
        }
    }
}

const QuillEditor = () => {
    const [content, setContent] = useState<string>('')

    const handleChange = (value: string) => {
        setContent(value)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Editor content:', content)
    }

    const modules = useMemo(() => ({
        toolbar: {
            container: toolbarOptions,
            // TODO: Setup the API to save, then return an URL for the rich text editor

            // handlers: {
            //     image: handleImageUpload,
            // },
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
                    />
                </div>
                <button type='submit'>Save</button>
            </form>
        </>
    )
}

export default QuillEditor