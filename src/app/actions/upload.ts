'use server'

import AWS from 'aws-sdk'
import path from 'path'
import { writeFile } from 'fs/promises'
import { PrismaClient } from '@prisma/client'
import { PutObjectRequest } from 'aws-sdk/clients/s3'

const prisma = new PrismaClient()

export async function uploadFile(formData: FormData): Promise<{
    message: string,
    success: boolean
}> {
    await prisma.$connect().then(() => {
        console.log('Database connected successfully')
    }).catch((error) => {
        console.log(error)
    })

    const file = formData.get('file') as File | null

    if (!file) {
        return { message: 'No files received.', success: false }
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = Date.now() + file.name.replace(/ /g, '_')
    console.log('Uploading file:', filename)

    try {
        const s3 = new AWS.S3()
        const data = await s3.listBuckets().promise()

        const bucketName = process.env.AWS_BUCKET_NAME
        if (!bucketName) {
            return { message: 'Bucket is not defined.', success: false }
        }

        const bucket = data.Buckets?.find(bucket => bucket.Name === process.env.AWS_BUCKET_NAME)
        if (!bucket) {
            return { message: 'Bucket not found.', success: false }
        }

        const params: PutObjectRequest = {
            Bucket: bucket.Name as string,
            Key: filename,
            Body: buffer,
            ContentType: file.type
        }

        await s3.upload(params).promise()
        return { message: 'File uploaded successfully!', success: true }
    } catch (error) {
        console.error('File upload error:', error)
        return { message: 'Failed to upload file.', success: false }
    }
}
