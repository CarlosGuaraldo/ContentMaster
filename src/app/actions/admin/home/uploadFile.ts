'use server'

import config from '@/config/config'
import { S3Client, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3'

export async function uploadFile(formData: FormData): Promise<{
    message: string,
    success: boolean,
    url?: string
}> {
    const file = formData.get('file') as File | null
    if (!file) {
        return { message: 'No files received.', success: false }
    }

    if (!config.file.allowedTypes.includes(file.type)) {
        return { message: 'Invalid file type.', success: false }
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const fileType = file.type.split('/')[1]
    const filename = `${Date.now()}${file.name.replace(/[^a-zA-Z0-9]/g, '')}.${fileType}`

    try {
        const client = new S3Client({ region: config.aws.region })
        const params: PutObjectCommandInput = {
            Bucket: config.aws.bucketName,
            Key: filename,
            Body: buffer,
            ContentType: file.type
        }
        const command = new PutObjectCommand(params)
        await client.send(command)
        const url = `${config.aws.objectUrlPrefix}${filename}`

        return {
            message: `File uploaded successfully!`,
            success: true,
            url: url
        }
    } catch (error) {
        console.error('File upload error:', error)
        return {
            message: `Failed to upload file. Error: ${error}`,
            success: false
        }
    }
}
