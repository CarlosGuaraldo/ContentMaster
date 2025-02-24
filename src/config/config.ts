const config = {
    auth: {
        AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
        AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
    },
    aws: {
        ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID!,
        SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY!,
        BUCKET_NAME: process.env.AWS_BUCKET_NAME!,
        REGION: process.env.AWS_REGION!,
        OBJECT_PREFFIX_URL: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/`
    },
    file: {
        allowedTypes: (process.env.FILE_TYPES_ALLOWED as string).split(',') as string[]
    },
    server: {
        HOST: process.env.HOST!,
        PORT: process.env.PORT!,
        PROTOCOL: process.env.PROTOCOL!,
        BASE_URL: `${process.env.PROTOCOL!}://${process.env.HOST!}:${process.env.PORT!}`
    },
}

export default config