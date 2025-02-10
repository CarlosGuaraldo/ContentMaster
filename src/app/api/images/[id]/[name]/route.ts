import { PrismaClient } from '@prisma/client';
import AWS from 'aws-sdk';
import { validate as isUuid } from 'uuid';
import config from '@/config/config';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    // I didn't like the way that I got the route params
    const url = new URL(req.url)
    const id = url.pathname.split('/').slice(-2, -1)[0]
    const name = url.pathname.split('/').slice(-1)[0]

    if (!id || !isUuid(id)) {
        console.log('Invalid ID:', id);
        return NextResponse.json({ error: 'Invalid image ID' }, { status: 400 });
    }

    if (!name || name.trim().length === 0) {
        console.log('Invalid name:', name);
        return NextResponse.json({ error: 'Invalid image name' }, { status: 400 });
    }

    try {
        const image = await prisma.file.findFirst({
            where: {
                id: id,
                name: name
            },
        });

        if (!image) {
            console.log('Image not found in database');
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }

        AWS.config.update({
            accessKeyId: config.aws.ACCESS_KEY_ID,
            secretAccessKey: config.aws.SECRET_ACCESS_KEY,
            region: config.aws.REGION
        });

        const s3 = new AWS.S3();
        const params = {
            Bucket: config.aws.BUCKET_NAME,
            Key: image.name,
        };
        const data = await s3.getObject(params).promise()

        const headers = new Headers();
        headers.set('Content-Type', data.ContentType!);
        headers.set('Content-Length', data.ContentLength!.toString());

        const buffer = Buffer.from(data.Body as Uint8Array)
        return new NextResponse(buffer, { headers });
    } catch (error) {
        console.log('Error in API handler:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
