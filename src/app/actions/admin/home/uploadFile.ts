'use server'

import config from '@/config/config'
import { S3Client, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3'

export async function uploadFile(formData: FormData): Promise<{
    name?: string,
    size?: number,
    url?: string,
    error: boolean,
    errorMessage: string
}> {
    // TODO: enhance the security validations
    const file = formData.get('file') as File | null
    if (!file) {
        return { errorMessage: 'No files received.', error: false }
    }

    if (!config.file.allowedTypes.includes(file.type)) {
        return { errorMessage: 'Invalid file type.', error: false }
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
            // message: `File uploaded successfully!`,
            // success: true,
            url: url,
            error: false,
            errorMessage: ''
        }
    } catch (error) {
        console.error('File upload error:', error)
        return {
            errorMessage: `Failed to upload file. Error: ${error}`,
            error: true
        }
    }
}
