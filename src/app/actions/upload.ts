'use server'

import { S3Client, PutObjectCommand, PutObjectCommandInput, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export async function uploadFile(formData: FormData): Promise<{
    message: string,
    success: boolean,
    url?: string
}> {
    const file = formData.get('file') as File | null
    if (!file) {
        return { message: 'No files received.', success: false }
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = Date.now() + file.name.replace(/ /g, '_')
    console.log('Uploading file:', filename)

    try {
        const client = new S3Client({ region: process.env.AWS_REGION })

        const params: PutObjectCommandInput = {
            Bucket: process.env.AWS_BUCKET_NAME as string,
            Key: filename,
            Body: buffer,
            ContentType: file.type
        }

        const command = new PutObjectCommand(params)
        const upload = await client.send(command)
        console.log('Upload Success', upload)

        const getObjectParams = { Bucket: process.env.AWS_BUCKET_NAME, Key: filename }
        const getObjectCommand = new GetObjectCommand(getObjectParams)
        const url = await getSignedUrl(client, getObjectCommand, { expiresIn: 3600 })

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
