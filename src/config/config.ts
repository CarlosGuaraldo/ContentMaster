const config = {
    aws: {
        bucketName: process.env.AWS_BUCKET_NAME!,
        region: process.env.AWS_REGION as string,
        objectUrlPrefix: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/`
    },
    file: {
        allowedTypes: (process.env.FILE_TYPES_ALLOWED as string).split(',') as string[]
    }
}

export default config