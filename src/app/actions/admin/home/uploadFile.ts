'use server'

import config from '@/config/config'
import { prisma } from '@/prisma'
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

    if (!config.FILE.ALLOWED_TYPES.includes(file.type)) {
        return { errorMessage: 'Invalid file type.', error: false }
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const fileType = file.type.split('/')[1]
    const fileName = `${Date.now()}${file.name.replace(/[^a-zA-Z0-9]/g, '')}.${fileType}`

    try {
        const client = new S3Client({ region: config.AWS.REGION })
        const params: PutObjectCommandInput = {
            Bucket: config.AWS.BUCKET_NAME,
            Key: fileName,
            Body: buffer,
            ContentType: file.type
        }
        const command = new PutObjectCommand(params)
        await client.send(command)
        const s3Url = `${config.AWS.OBJECT_PREFFIX_URL}${fileName}`
        const image = await prisma.file.create({
            data: {
                name: fileName,
                type: file.type,
                s3Url: s3Url,
            }
        })
        const URL = `${config.SERVER.BASE_URL}/api/images/${image.id}/${image.name}`

        return {
            url: URL,
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
