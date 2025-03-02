import AWS from 'aws-sdk';
import { validate as isUuid } from 'uuid';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma';
import CONFIG from '@/config/config';

/*
TO DO: Handle this warning:
(node:23164) NOTE: The AWS SDK for JavaScript (v2) is in maintenance mode.
 SDK releases are limited to address critical bug fixes and security issues only.

Please migrate your code to use AWS SDK for JavaScript (v3).
For more information, check the blog post at https://a.co/cUPnyil
(Use `node --trace-warnings ...` to show where the warning was created)
(node:12872) NOTE: The AWS SDK for JavaScript (v2) is in maintenance mode.
 SDK releases are limited to address critical bug fixes and security issues only.

Please migrate your code to use AWS SDK for JavaScript (v3).
For more information, check the blog post at https://a.co/cUPnyil
(Use `node --trace-warnings ...` to show where the warning was created)
*/

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string, name: string }> }
) {
    const { id, name } = await params

    if (!id || !isUuid(id)) {
        return NextResponse.json({ error: 'Image not found' }, { status: 400 });
    }

    if (!name || name.trim().length === 0) {
        return NextResponse.json({ error: 'Image not found' }, { status: 400 });
    }

    try {
        const image = await prisma.file.findFirst({
            where: {
                id: id,
                name: name
            },
        });

        if (!image) {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }

        AWS.config.update({
            accessKeyId: CONFIG.AWS.ACCESS_KEY_ID,
            secretAccessKey: CONFIG.AWS.SECRET_ACCESS_KEY,
            region: CONFIG.AWS.REGION
        });

        const s3 = new AWS.S3();
        const params = {
            Bucket: CONFIG.AWS.BUCKET_NAME,
            Key: image.name,
        };
        const data = await s3.getObject(params).promise()

        const headers = new Headers();
        headers.set('Content-Type', data.ContentType!);
        headers.set('Cache-Control', 'immutable, public');
        headers.set('Content-Length', data.ContentLength!.toString());

        const buffer = Buffer.from(data.Body as Uint8Array)
        return new NextResponse(buffer, { headers });
    } catch (error) {
        console.log('Error in API handler:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
