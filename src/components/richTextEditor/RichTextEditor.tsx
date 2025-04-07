'use client'

import dynamic from 'next/dynamic'
import 'suneditor/dist/css/suneditor.min.css'
import { UploadBeforeHandler, UploadBeforeReturn } from 'suneditor-react/dist/types/upload'
import { uploadFile } from '@/app/actions/admin/home/uploadFile'
import { useRef } from 'react'
import SunEditorCore from 'suneditor/src/lib/core'

const SunEditor = dynamic(() => import('suneditor-react'), {
    ssr: false
})

interface RichTextEditorProps {
    onChange: (content: string) => void
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ onChange }) => {
    const editorRef = useRef<SunEditorCore | null>(null)

    const handleChange = (content: string) => {
        onChange(content)
    }

    const onImageUploadBefore = (files: Array<File>, info: object, uploadHandler: UploadBeforeHandler): UploadBeforeReturn => {
        const maxFileSize = 500 * 1024 // 500 KB
        const allowedFormats = ['image/jpeg', 'image/png', 'image/webp']

        if (!files || !files[0]) {
            uploadHandler('At least one file needs to be uploaded')
            return undefined
        }

        if (files[0].size > maxFileSize) {
            uploadHandler('File size should not exceed 500 KB')
            return undefined
        }

        if (!allowedFormats.includes(files[0].type)) {
            uploadHandler('Only JPEG, PNG, and WebP formats are allowed')
            return undefined
        }

        const formData = new FormData()
        formData.append('file', files[0])

        const uploadImage = async () => {
            try {
                const image: { name: string, size: number, url: string, error: boolean, errorMessage: string } = await sendFileToServer(formData)
                uploadHandler({
                    result: [{
                        name: image.name,
                        size: image.size,
                        url: image.url
                    }]
                })
                return undefined
            } catch (error) {
                return undefined
            }
        }

        uploadImage()
        return undefined
    }

    const sendFileToServer = async (formData: FormData): Promise<{ name: string; size: number; url: string; error: boolean; errorMessage: string }> => {
        try {
            const response = await uploadFile(formData);
            return {
                url: response.url || '',
                error: false,
                errorMessage: '',
                size: 0,
                name: ''
            };
        } catch (error) {
            return {
                url: '',
                error: true,
                errorMessage: '',
                size: 0,
                name: ''
            };
        }
    }

    return (
        <div>
            <SunEditor
                getSunEditorInstance={(sunEditor) => { editorRef.current = sunEditor }}
                onChange={handleChange}
                setOptions={{
                    height: '200',
                    buttonList: [
                        ['undo', 'redo'],
                        ['bold', 'italic', 'underline'],
                        ['list', 'align'],
                        ['link', 'image', 'video'],
                        ['fullScreen', 'showBlocks', 'codeView']
                    ],
                }}
                onImageUploadBefore={onImageUploadBefore}
            />
        </div>
    )
}

export default RichTextEditor
