const config = {
    aws: {
        bucketName: process.env.AWS_BUCKET_NAME as string,
        region: process.env.AWS_REGION as string,
        objectUrlPrefix: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/`
    },
    file: {
        allowedTypes: ['image/jpeg', 'image/png', 'image/webp']
    }
}

export default config